"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../lib/supabase";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaLock,
    FaPlay,
    FaBookOpen,
    FaSpinner,
} from "react-icons/fa";
import LogoutButton from "../components/LogoutButton";
import Link from "next/link";

// ---- separate component for the part that uses useSearchParams ----
function PaymentBanner() {
    const searchParams = useSearchParams();
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const payment = searchParams.get("payment");
        if (payment === "success") {
            setBanner("success");
            setTimeout(() => setBanner(null), 6000);
        } else if (payment === "failed") {
            setBanner("failed");
            setTimeout(() => setBanner(null), 6000);
        } else if (payment === "already_processed") {
            setBanner("already_processed");
            setTimeout(() => setBanner(null), 4000);
        }
    }, [searchParams]);

    if (!banner) return null;

    return (
        <>
            {banner === "success" && (
                <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 text-green-800">
                    <FaCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-sm">Payment successful!</p>
                        <p className="text-xs text-green-700 mt-0.5">
                            Your enrollment is confirmed and your ebook
                            is on its way to your email. Check your inbox!
                        </p>
                    </div>
                </div>
            )}
            {banner === "failed" && (
                <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-800">
                    <FaTimesCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-sm">
                            Payment failed or was cancelled
                        </p>
                        <p className="text-xs text-red-700 mt-0.5">
                            Please try again. If the issue persists,{" "}
                            <Link href="/contact" className="underline">
                                contact us
                            </Link>.
                        </p>
                    </div>
                </div>
            )}
            {banner === "already_processed" && (
                <div className="mb-6 flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 text-blue-800">
                    <FaCheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-sm">You're already enrolled!</p>
                        <p className="text-xs text-blue-700 mt-0.5">
                            This payment was already processed.
                            Your content is available below.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

// ---- main dashboard component ----
export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function loadDashboard() {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    window.location.href = "/";
                    return;
                }

                setUser(user);

                const { data: enrollmentData } = await supabase
                    .from("enrollments")
                    .select(`
                        *,
                        tiers (
                            id,
                            name,
                            slug,
                            rank
                        )
                    `)
                    .eq("user_id", user.id)
                    .eq("status", "active")
                    .order("enrolled_at", { ascending: false })
                    .limit(1)
                    .single();

                setEnrollment(enrollmentData);

                const { data: materialsData, error } = await supabase
                    .from("materials")
                    .select("*")
                    .order("sort_order", { ascending: true });

                if (error) console.error("Materials fetch error:", error);
                setMaterials(materialsData || []);

            } catch (error) {
                console.error("Dashboard load error:", error);
                window.location.href = "/";
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "Student";
    const freeMaterials = materials.filter((m) => m.is_free);
    const paidMaterials = materials.filter((m) => !m.is_free);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-parchment">
                <div className="flex flex-col items-center gap-3">
                    <FaSpinner className="text-maple text-3xl animate-spin" />
                    <p className="text-ebony/50 text-sm font-mono tracking-widest">
                        Loading your dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-parchment">
            <div className="max-w-6xl mx-auto px-4 py-12">

                {/* Suspense wraps the useSearchParams component */}
                <Suspense fallback={null}>
                    <PaymentBanner />
                </Suspense>

                {/* Header */}
                <div className="flex items-start justify-between mb-10 gap-4">
                    <div>
                        <p className="font-mono text-brass text-xs tracking-widest uppercase mb-1">
                            Welcome back
                        </p>
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-ebony">
                            Hey, {firstName} 👋
                        </h1>
                    </div>
                    <LogoutButton />
                </div>

                {/* Enrollment status card */}
                <div className={`rounded-2xl p-6 mb-10 border-2 ${
                    enrollment
                        ? "bg-ebony border-maple/30"
                        : "bg-white border-brass/20"
                }`}>
                    {enrollment ? (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-mono text-maple text-xs tracking-widest uppercase mb-1">
                                    Active Enrollment
                                </p>
                                <h2 className="font-display text-2xl font-bold text-parchment">
                                    {enrollment.tiers?.name} Course
                                </h2>
                                <p className="text-parchment/50 text-sm mt-1">
                                    Enrolled on{" "}
                                    {new Date(enrollment.enrolled_at).toLocaleDateString("en-NG", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 bg-maple/20 px-4 py-2 rounded-full w-fit">
                                <FaCheckCircle className="text-maple text-sm" />
                                <span className="text-maple text-sm font-medium">
                                    Active
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-mono text-brass text-xs tracking-widest uppercase mb-1">
                                    No Active Enrollment
                                </p>
                                <h2 className="font-display text-xl font-bold text-ebony">
                                    You haven't enrolled in a course yet
                                </h2>
                                <p className="text-ebony/50 text-sm mt-1">
                                    Pick a tier to unlock exclusive videos and your ebook
                                </p>
                            </div>
                            <Link
                                href="/courses"
                                className="bg-maple text-ebony font-medium px-5 py-2.5 rounded-lg hover:bg-maple/90 transition text-sm w-fit flex-shrink-0"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    )}
                </div>

                {/* Free materials */}
                {freeMaterials.length > 0 && (
                    <div className="mb-12">
                        <div className="mb-6">
                            <p className="font-mono text-brass text-xs tracking-widest uppercase mb-1">
                                Free For All Members
                            </p>
                            <h2 className="font-display text-2xl font-bold text-ebony">
                                Welcome Video
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {freeMaterials.map((material) => (
                                <MaterialCard key={material.id} material={material} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Paid materials */}
                <div>
                    <div className="mb-6">
                        <p className="font-mono text-brass text-xs tracking-widest uppercase mb-1">
                            {enrollment ? "Your Course Materials" : "Exclusive Content"}
                        </p>
                        <h2 className="font-display text-2xl font-bold text-ebony">
                            {enrollment
                                ? `${enrollment.tiers?.name} Content`
                                : "Unlock Your Content"
                            }
                        </h2>
                    </div>

                    {enrollment ? (
                        paidMaterials.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {paidMaterials.map((material) => (
                                    <MaterialCard key={material.id} material={material} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border border-brass/20 rounded-2xl p-12 text-center">
                                <FaBookOpen className="text-brass/20 text-5xl mx-auto mb-4" />
                                <p className="font-display text-lg font-bold text-ebony mb-2">
                                    Materials Coming Soon
                                </p>
                                <p className="text-ebony/50 text-sm max-w-xs mx-auto">
                                    Barry is preparing your course materials.
                                    Check back soon!
                                </p>
                            </div>
                        )
                    ) : (
                        <div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                                {[1, 2, 3].map((i) => (
                                    <LockedCard key={i} />
                                ))}
                            </div>
                            <div className="bg-ebony rounded-2xl p-8 text-center">
                                <p className="font-display text-xl font-bold text-parchment mb-2">
                                    Ready to unlock your content?
                                </p>
                                <p className="text-parchment/55 text-sm mb-6 max-w-sm mx-auto">
                                    Enroll in any tier to get instant access to
                                    exclusive videos and your ebook delivered by email.
                                </p>
                                <Link
                                    href="/courses"
                                    className="bg-maple text-ebony font-medium px-6 py-3 rounded-lg hover:bg-maple/90 transition inline-block"
                                >
                                    View Courses & Enroll
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}