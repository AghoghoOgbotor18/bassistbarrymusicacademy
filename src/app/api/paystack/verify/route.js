import { createAdminClient } from "@/app/lib/supabase.admin";
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

        // 1. verify the transaction with Paystack server-side
        const paystackResponse = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const paystackData = await paystackResponse.json();

        // use admin client for ALL db operations — bypasses RLS
        const adminSupabase = createAdminClient();

        // 2. check Paystack confirms it was successful
        if (
            !paystackData.status ||
            paystackData.data.status !== "success"
        ) {
            await adminSupabase
                .from("payments")
                .update({ status: "failed" })
                .eq("paystack_reference", reference);

            return NextResponse.redirect(
                new URL("/courses?payment=failed", request.url)
            );
        }

        const metadata = paystackData.data.metadata;
        const userId = metadata.user_id;
        const tierId = metadata.tier_id;

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

        // 6. redirect to dashboard
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