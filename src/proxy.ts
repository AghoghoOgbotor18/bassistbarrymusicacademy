import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const response = NextResponse.next();

    try {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            response.cookies.set(name, value, options);
                        });
                    },
                },
            }
        );

        const { data: { user } } = await supabase.auth.getUser();

        if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/", request.url));
        }

    } catch (error) {
        console.error("Proxy auth check failed:", error);
        // don't block the request if auth check fails
    }

    return response;
}

export const config = {
    matcher: [
        // only run on dashboard routes
        // explicitly skip API routes, static files, images
        "/dashboard/:path*",
    ],
};