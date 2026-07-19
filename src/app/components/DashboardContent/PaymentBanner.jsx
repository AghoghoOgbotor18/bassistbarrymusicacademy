"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function PaymentBanner() {
    const searchParams = useSearchParams();
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const payment = searchParams.get("payment");

        if (payment === "success") {
            setBanner("success");
        } else if (payment === "failed") {
            setBanner("failed");
        } else if (payment === "already_processed") {
            setBanner("already_processed");
        }
    }, [searchParams]);

    const closeModal = () => setBanner(null);

    if (!banner) return null;

    const modalContent = {
        success: {
            icon: <FaCheckCircle className="text-green-500 text-5xl" />,
            title: "Payment Successful!",
            message:
                "Your enrollment is confirmed and your ebook is on its way to your email. Please check your inbox or spam folder.",
        },
        failed: {
            icon: <FaTimesCircle className="text-red-500 text-5xl" />,
            title: "Payment Failed",
            message:
                "Your payment was cancelled or could not be completed. Please try again. If the issue persists, contact us.",
        },
        already_processed: {
            icon: <FaCheckCircle className="text-blue-500 text-5xl" />,
            title: "Already Enrolled",
            message:
                "This payment has already been processed and your course content is available below.",
        },
    };

    const current = modalContent[banner];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-ebony/30 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 text-ebony/50 hover:text-ebony transition"
                    aria-label="Close modal"
                >
                    <FaTimes className="text-lg" />
                </button>

                <div className="flex justify-center mb-4">
                    {current.icon}
                </div>
                <h3 className="text-center text-xl font-bold text-ebony mb-2">
                    {current.title}
                </h3>
                <p className="text-center text-sm text-ebony/70 leading-relaxed mb-6">
                    {current.message}
                </p>

                {banner === "failed" && (
                    <div className="text-center mb-5">
                        <Link
                            href="/contact"
                            className="text-sm text-rosewood underline hover:opacity-80"
                        >
                            Contact Support
                        </Link>
                    </div>
                )}
                <button
                    onClick={closeModal}
                    className="w-full rounded-xl bg-rosewood py-3 text-white font-medium hover:opacity-90 transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
}