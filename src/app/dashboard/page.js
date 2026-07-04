"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import LogoutButton from "../components/LogoutButton";

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const payment = searchParams.get("payment");
        if (payment === "success") {
            setBanner("success");
            // auto-dismiss after 6 seconds
            setTimeout(() => setBanner(null), 6000);
        } else if (payment === "failed") {
            setBanner("failed");
            setTimeout(() => setBanner(null), 6000);
        }
    }, [searchParams]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Payment banner */}
            {banner === "success" && (
                <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 text-green-800">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-sm">Payment successful!</p>
                        <p className="text-xs text-green-700 mt-0.5">
                            Your enrollment is confirmed and your ebook is on its way to your email.
                        </p>
                    </div>
                </div>
            )}

            {banner === "failed" && (
                <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-800">
                    <FaTimesCircle className="text-red-500 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-sm">Payment failed or was cancelled</p>
                        <p className="text-xs text-red-700 mt-0.5">
                            Please try again. If the issue persists, contact us.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-3xl font-bold text-ebony">
                    Dashboard
                </h1>
                <LogoutButton />
            </div>
            <p className="text-ebony/70">
                Welcome back! Your content will appear here.
            </p>
        </div>
    );
}