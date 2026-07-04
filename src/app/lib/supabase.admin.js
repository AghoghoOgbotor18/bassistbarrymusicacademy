import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log("Admin client - URL exists:", !!url, "KEY exists:", !!key);

    if (!url || !key) {
        throw new Error(
            `Missing Supabase admin credentials. URL: ${!!url}, KEY: ${!!key}`
        );
    }

    return createClient(url, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}