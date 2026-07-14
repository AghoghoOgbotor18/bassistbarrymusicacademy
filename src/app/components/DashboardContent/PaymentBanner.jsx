import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function PaymentBanner() {
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