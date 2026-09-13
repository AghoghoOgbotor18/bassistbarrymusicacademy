import { createAdminClient } from "@/app/lib/supabase.admin";
import { sendEbookEmail } from "@/app/lib/sendEbookEmail";
import { sendBarryNotification } from "@/app/lib/sendBarryNotification";
import { NextResponse } from "next/server";

// simple in-memory rate limit — tracks IPs
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // max 10 verify attempts per minute per IP

function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, start: now };
    if (now - entry.start > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, start: now });
        return false;
    }
    if (entry.count >= RATE_LIMIT_MAX) return true;
    rateLimitMap.set(ip, { count: entry.count + 1, start: entry.start });
    return false;
}

export async function GET(request) {
    try {
        // rate limiting
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
        if (isRateLimited(ip)) {
            console.warn("Rate limit hit on verify route for IP:", ip);
            return NextResponse.redirect(new URL("/courses?payment=failed", request.url));
        }

        const { searchParams } = new URL(request.url);
        const reference = searchParams.get("reference");

        if (!reference) {
            return NextResponse.redirect(new URL("/courses?payment=failed", request.url));
        }

        //verify with Paystack
        const paystackResponse = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
        );

        const paystackData = await paystackResponse.json();
        const adminSupabase = createAdminClient();

        if (!paystackData.status || paystackData.data.status !== "success") {
            await adminSupabase
                .from("payments")
                .update({ status: "failed" })
                .eq("paystack_reference", reference);
            return NextResponse.redirect(new URL("/courses?payment=failed", request.url));
        }

        const metadata = paystackData.data.metadata;
        const userId = metadata.user_id;
        const tierId = metadata.tier_id;
        const tierName = metadata.tier_name;
        const userEmail = paystackData.data.customer?.email;

        // idempotency check — if already success, still show success to student
        // (webhook may have processed it first — that's fine, student still paid)
        const { data: existingPayment } = await adminSupabase
            .from("payments")
            .select("status")
            .eq("paystack_reference", reference)
            .single();

        if (existingPayment?.status === "success") {
            console.log("Verify: payment already processed by webhook, redirecting to success");
            // redirect to success NOT already_processed — student legitimately paid
            return NextResponse.redirect(new URL("/dashboard?payment=success", request.url));
        }

        //update payment to success
        const { error: paymentError } = await adminSupabase
            .from("payments")
            .update({ status: "success" })
            .eq("paystack_reference", reference);

        if (paymentError) {
            console.error("Payment update error:", paymentError);
            return NextResponse.redirect(new URL("/courses?payment=failed", request.url));
        }

        //idempotent enrollment — check before inserting
        const { data: existingEnrollment } = await adminSupabase
            .from("enrollments")
            .select("id")
            .eq("user_id", userId)
            .eq("tier_id", parseInt(tierId))
            .single();

        if (!existingEnrollment) {
            const { error: enrollmentError } = await adminSupabase
                .from("enrollments")
                .insert({
                    user_id: userId,
                    tier_id: parseInt(tierId),
                    status: "active",
                });

            if (enrollmentError) {
                console.error("Enrollment error:", enrollmentError);
                return NextResponse.redirect(new URL("/courses?payment=failed", request.url));
            }
        }

        //get profile
        const { data: profile } = await adminSupabase
            .from("profiles")
            .select("full_name")
            .eq("id", userId)
            .single();

        //send emails — AWAITED so Vercel doesn't kill before they complete
        try {
            await sendEbookEmail({
                email: userEmail,
                fullName: profile?.full_name,
                tierId: parseInt(tierId),
                tierName,
            });
            console.log("Ebook email sent in verify route");
        } catch (emailErr) {
            console.error("Ebook email error in verify:", emailErr.message);
        }

        try {
            await sendBarryNotification({
                studentName: profile?.full_name,
                studentEmail: userEmail,
                tierName,
                enrolledAt: new Date().toISOString(),
            });
            console.log("Barry notification sent in verify route");
        } catch (notifyErr) {
            console.error("Barry notification error in verify:", notifyErr.message);
        }

        return NextResponse.redirect(new URL("/dashboard?payment=success", request.url));

    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.redirect(new URL("/courses?payment=failed", request.url));
    }
}