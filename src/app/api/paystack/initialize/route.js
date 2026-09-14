import { createServerSupabaseClient } from "@/app/lib/supabase.server";
import { createAdminClient } from "@/app/lib/supabase.admin";
import { NextResponse } from "next/server";

// rate limit — max 5 payment attempts per user per minute
const initRateLimitMap = new Map();

function isInitRateLimited(userId) {
    const now = Date.now();
    const entry = initRateLimitMap.get(userId) || { count: 0, start: now };
    if (now - entry.start > 60000) {
        initRateLimitMap.set(userId, { count: 1, start: now });
        return false;
    }
    if (entry.count >= 5) return true;
    initRateLimitMap.set(userId, { count: entry.count + 1, start: entry.start });
    return false;
}

export async function POST(request) {
    try {
        const { tierSlug } = await request.json();

        const supabase = await createServerSupabaseClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "You must be logged in to enroll" }, { status: 401 });
        }

        // rate limit per user
        if (isInitRateLimited(user.id)) {
            console.warn("Rate limit hit on initialize for user:", user.id);
            return NextResponse.json(
                { error: "Too many payment attempts. Please wait a minute and try again." },
                { status: 429 }
            );
        }

        const adminSupabase = createAdminClient();

        const { data: tier, error: tierError } = await adminSupabase
            .from("tiers")
            .select("*")
            .eq("slug", tierSlug)
            .single();

        if (tierError || !tier) {
            return NextResponse.json({ error: "Course tier not found" }, { status: 404 });
        }

        // idempotency — check for existing pending payment for same user+tier
        // prevents double-clicking creating two Paystack sessions
        const { data: pendingPayment } = await adminSupabase
            .from("payments")
            .select("paystack_reference, status")
            .eq("user_id", user.id)
            .eq("tier_id", tier.id)
            .eq("status", "pending")
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

        // check existing active enrollment
        const { data: existingEnrollment } = await adminSupabase
            .from("enrollments")
            .select("id")
            .eq("user_id", user.id)
            .eq("tier_id", tier.id)
            .eq("status", "active")
            .single();

        if (existingEnrollment) {
            return NextResponse.json(
                { error: "You are already enrolled in this course. Check your dashboard for your materials" },
                { status: 400 }
            );
        }

        // generate idempotency key — same user + tier + day = same key
        // prevents duplicate Paystack sessions on same day
        const today = new Date().toISOString().split("T")[0];
        const idempotencyKey = `bbma_${user.id}_${tier.id}_${today}`;

        const paystackResponse = await fetch(
            "https://api.paystack.co/transaction/initialize",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                    "Idempotency-Key": idempotencyKey,
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
            return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
        }

        await adminSupabase
            .from("payments")
            .insert({
                user_id: user.id,
                tier_id: tier.id,
                paystack_reference: paystackData.data.reference,
                amount: tier.price,
                status: "pending",
            });

        return NextResponse.json({
            authorization_url: paystackData.data.authorization_url,
            reference: paystackData.data.reference,
        });

    } catch (error) {
        console.error("Payment initialization error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}