import { createAdminClient } from "@/app/lib/supabase.admin";
import { sendEbookEmail } from "@/app/lib/sendEbookEmail";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
    try {
        // 1. verify the webhook is actually from Paystack
        // Paystack signs every webhook with your secret key
        const body = await request.text();
        const signature = request.headers.get("x-paystack-signature");

        const expectedSignature = crypto
            .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
            .update(body)
            .digest("hex");

        if (signature !== expectedSignature) {
            console.error("Invalid webhook signature — possible spoofed request");
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 401 }
            );
        }

        const event = JSON.parse(body);

        // 2. only handle successful charge events
        if (event.event !== "charge.success") {
            // acknowledge other events so Paystack stops retrying them
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
            console.error("Webhook missing required metadata:", metadata);
            return NextResponse.json(
                { error: "Missing metadata" },
                { status: 400 }
            );
        }

        const adminSupabase = createAdminClient();

        // 3. replay protection - check if already processed
        const { data: existingPayment } = await adminSupabase
            .from("payments")
            .select("status")
            .eq("paystack_reference", reference)
            .single();

        if (existingPayment?.status === "success") {
            // already handled by the redirect route, acknowledge and exit
            console.log("Webhook: payment already processed:", reference);
            return NextResponse.json({ received: true });
        }

        // 4. update payment to success
        const { error: paymentError } = await adminSupabase
            .from("payments")
            .update({ status: "success" })
            .eq("paystack_reference", reference);

        if (paymentError) {
            console.error("Webhook payment update error:", paymentError);
            return NextResponse.json(
                { error: "Payment update failed" },
                { status: 500 }
            );
        }

        // 5. check enrollment doesn't already exist
        const { data: existingEnrollment } = await adminSupabase
            .from("enrollments")
            .select("id")
            .eq("user_id", userId)
            .eq("tier_id", parseInt(tierId))
            .single();

        if (!existingEnrollment) {
            // create enrollment only if it doesn't exist yet
            const { error: enrollmentError } = await adminSupabase
                .from("enrollments")
                .insert({
                    user_id: userId,
                    tier_id: parseInt(tierId),
                    status: "active",
                });

            if (enrollmentError) {
                console.error("Webhook enrollment error:", enrollmentError);
                return NextResponse.json(
                    { error: "Enrollment failed" },
                    { status: 500 }
                );
            }

            // 6. get profile and send ebook email
            const { data: profile } = await adminSupabase
                .from("profiles")
                .select("full_name")
                .eq("id", userId)
                .single();

            sendEbookEmail({
                email: userEmail,
                fullName: profile?.full_name,
                tierId: parseInt(tierId),
                tierName,
            }).catch(console.error);

            console.log("Webhook: enrollment created for user:", userId);
        }

        // always return 200 to Paystack so they stop retrying
        return NextResponse.json({ received: true });

    } catch (error) {
        console.error("Webhook error:", error);
        // still return 200 so Paystack doesn't keep retrying
        // log the error for investigation
        return NextResponse.json({ received: true });
    }
}