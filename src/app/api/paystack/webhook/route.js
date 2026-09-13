import { createAdminClient } from "@/app/lib/supabase.admin";
import { sendEbookEmail } from "@/app/lib/sendEbookEmail";
import { sendBarryNotification } from "@/app/lib/sendBarryNotification";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
    try {
        const body = await request.text();
        const signature = request.headers.get("x-paystack-signature");

        const expectedSignature = crypto
            .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
            .update(body)
            .digest("hex");

        if (signature !== expectedSignature) {
            console.error("Invalid webhook signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const event = JSON.parse(body);

        if (event.event !== "charge.success") {
            return NextResponse.json({ received: true });
        }

        const data = event.data;
        const reference = data.reference;
        const metadata = data.metadata;
        const userId = metadata?.user_id;
        const tierId = metadata?.tier_id;
        const tierName = metadata?.tier_name;
        const userEmail = data.customer?.email;

        if (!userId || !tierId || !reference) {
            console.error("Webhook missing metadata:", metadata);
            return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
        }

        const adminSupabase = createAdminClient();

        // idempotency — check if already processed
        const { data: existingPayment } = await adminSupabase
            .from("payments")
            .select("status")
            .eq("paystack_reference", reference)
            .single();

        if (existingPayment?.status === "success") {
            console.log("Webhook: already processed by verify route:", reference);
            return NextResponse.json({ received: true });
        }

        // update payment
        const { error: paymentError } = await adminSupabase
            .from("payments")
            .update({ status: "success" })
            .eq("paystack_reference", reference);

        if (paymentError) {
            console.error("Webhook payment update error:", paymentError);
            return NextResponse.json({ received: true }); // still 200
        }

        // idempotent enrollment check
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
                console.error("Webhook enrollment error:", enrollmentError);
                return NextResponse.json({ received: true });
            }

            const { data: profile } = await adminSupabase
                .from("profiles")
                .select("full_name")
                .eq("id", userId)
                .single();

            // await both so they complete before function returns
            try {
                await sendEbookEmail({
                    email: userEmail,
                    fullName: profile?.full_name,
                    tierId: parseInt(tierId),
                    tierName,
                });
                console.log("Ebook email sent in webhook");
            } catch (emailErr) {
                console.error("Ebook email error in webhook:", emailErr.message);
            }

            try {
                await sendBarryNotification({
                    studentName: profile?.full_name,
                    studentEmail: userEmail,
                    tierName,
                    enrolledAt: new Date().toISOString(),
                });
                console.log("Barry notification sent in webhook");
            } catch (notifyErr) {
                console.error("Barry notification error in webhook:", notifyErr.message);
            }

            console.log("Webhook: enrollment created for user:", userId);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ received: true });
    }
}