import { createServerSupabaseClient } from "@/app/lib/supabase.server";
import { createAdminClient } from "@/app/lib/supabase.admin";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { tierSlug } = await request.json();

        // use server client ONLY for auth check — respects user session
        const supabase = await createServerSupabaseClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: "You must be logged in to enroll" },
                { status: 401 }
            );
        }

        // use admin client for all DB operations — bypasses RLS
        const adminSupabase = createAdminClient();

        // get the tier from the database
        const { data: tier, error: tierError } = await adminSupabase
            .from("tiers")
            .select("*")
            .eq("slug", tierSlug)
            .single();

        if (tierError || !tier) {
            return NextResponse.json(
                { error: "Course tier not found" },
                { status: 404 }
            );
        }

        // check if user is already enrolled in this tier
        const { data: existingEnrollment } = await adminSupabase
            .from("enrollments")
            .select("id")
            .eq("user_id", user.id)
            .eq("tier_id", tier.id)
            .eq("status", "active")
            .single();

        if (existingEnrollment) {
            return NextResponse.json(
                { error: "You are already enrolled in this course" },
                { status: 400 }
            );
        }

        // initialize transaction with Paystack
        const paystackResponse = await fetch(
            "https://api.paystack.co/transaction/initialize",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    amount: tier.price * 100,
                    currency: "NGN",
                    reference: `bbma_${user.id}_${tier.id}_${Date.now()}`,
                    callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paystack/verify`,
                    metadata: {
                        user_id: user.id,
                        tier_id: tier.id,
                        tier_name: tier.name,
                        cancel_action: `${process.env.NEXT_PUBLIC_APP_URL}/courses`,
                    },
                }),
            }
        );

        const paystackData = await paystackResponse.json();

        if (!paystackData.status) {
            return NextResponse.json(
                { error: "Failed to initialize payment" },
                { status: 500 }
            );
        }

        // create pending payment record using admin client
        const { error: paymentError } = await adminSupabase
            .from("payments")
            .insert({
                user_id: user.id,
                tier_id: tier.id,
                paystack_reference: paystackData.data.reference,
                amount: tier.price,
                status: "pending",
            });

        if (paymentError) {
            console.error("Payment insert error FULL:", JSON.stringify(paymentError));
            return NextResponse.json(
                { error: "Failed to create payment record" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            authorization_url: paystackData.data.authorization_url,
            reference: paystackData.data.reference,
        });

    } catch (error) {
        console.error("Payment initialization error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}