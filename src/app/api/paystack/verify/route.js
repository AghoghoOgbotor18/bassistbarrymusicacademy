import { createAdminClient } from "@/app/lib/supabase.admin";
import { sendEbookEmail } from "@/app/lib/sendEbookEmail";
import { sendBarryNotification } from "@/app/lib/sendBarryNotification";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get("reference");

        if (!reference) {
            return NextResponse.redirect(
                new URL("/courses?payment=failed", request.url)
            );
        }

        // 1. verify with Paystack server-side
        const paystackResponse = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const paystackData = await paystackResponse.json();
        const adminSupabase = createAdminClient();

        // 2. check Paystack confirms success
        if (!paystackData.status || paystackData.data.status !== "success") {
            await adminSupabase
                .from("payments")
                .update({ status: "failed" })
                .eq("paystack_reference", reference);

            return NextResponse.redirect(
                new URL("/courses?payment=failed", request.url)
            );
        }

        // extract all needed fields from Paystack response
        const metadata = paystackData.data.metadata;
        const userId = metadata.user_id;
        const tierId = metadata.tier_id;
        const tierName = metadata.tier_name;
        const userEmail = paystackData.data.customer?.email;

        // 3. replay attack check
        const { data: existingPayment } = await adminSupabase
            .from("payments")
            .select("status")
            .eq("paystack_reference", reference)
            .single();

        if (existingPayment?.status === "success") {
            return NextResponse.redirect(
                new URL("/dashboard?payment=already_processed", request.url)
            );
        }

        // 4. update payment to success
        const { error: paymentError } = await adminSupabase
            .from("payments")
            .update({ status: "success" })
            .eq("paystack_reference", reference);

        if (paymentError) {
            console.error("Payment update error:", paymentError);
            return NextResponse.redirect(
                new URL("/courses?payment=failed", request.url)
            );
        }

        // 5. create enrollment
        const { error: enrollmentError } = await adminSupabase
            .from("enrollments")
            .insert({
                user_id: userId,
                tier_id: parseInt(tierId),
                status: "active",
            });

        if (enrollmentError) {
            console.error("Enrollment error:", enrollmentError);
            return NextResponse.redirect(
                new URL("/courses?payment=failed", request.url)
            );
        }

        // 6. get student profile
        const { data: profile } = await adminSupabase
            .from("profiles")
            .select("full_name")
            .eq("id", userId)
            .single();

        // 7. send ebook email — non-blocking
        sendEbookEmail({
            email: userEmail,
            fullName: profile?.full_name,
            tierId: parseInt(tierId),
            tierName,
        }).catch(console.error);

        // 8. notify Barry — non-blocking
        sendBarryNotification({
            studentName: profile?.full_name,
            studentEmail: userEmail,
            tierName,
            enrolledAt: new Date().toISOString(),
        }).catch(console.error);

        // 9. redirect to dashboard
        return NextResponse.redirect(
            new URL("/dashboard?payment=success", request.url)
        );

    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.redirect(
            new URL("/courses?payment=failed", request.url)
        );
    }
}