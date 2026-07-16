import { createAdminClient } from "@/app/lib/supabase.admin";
import { createServerSupabaseClient } from "@/app/lib/supabase.server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // verify user is logged in
        const supabase = await createServerSupabaseClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const path = searchParams.get("path");

        if (!path) {
            return NextResponse.json({ error: "Path required" }, { status: 400 });
        }

        // generate signed URL using admin client
        const adminSupabase = createAdminClient();
        const { data, error } = await adminSupabase
            .storage
            .from("ebook")
            .createSignedUrl(path, 60 * 60 * 2); // 2 hours for dashboard access

        if (error || !data?.signedUrl) {
            console.error("Signed URL error:", error);
            return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });
        }

        return NextResponse.json({ url: data.signedUrl });

    } catch (err) {
        console.error("Signed URL route error:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}