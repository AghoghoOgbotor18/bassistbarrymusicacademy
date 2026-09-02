"use client";
import Link from "next/link";
import { FaArrowRight, FaStar } from "react-icons/fa";

const upgradeMap = {
    1: {
        from: "Beginner",
        to: "Intermediate",
        price: "₦14,000",
        perks: [
            "Scales, modes & music theory",
            "Slap & pop techniques",
            "Gospel bass grooves",
            "Exclusive intermediate video lessons",
        ],
        color: "border-maple/40",
        badge: "bg-maple/10 text-maple",
    },
    2: {
        from: "Intermediate",
        to: "Advanced",
        price: "₦50,000",
        perks: [
            "Advanced gospel techniques",
            "Studio session skills",
            "Personal 1-on-1 class with Barry",
            "Full video masterclass library",
        ],
        color: "border-rosewood/40",
        badge: "bg-rosewood/10 text-rosewood",
    },
};

export default function UpgradeCTA({ currentTier }) {
    const upgrade = upgradeMap[currentTier?.rank];
    if (!upgrade) return null;

    return (
        <div className={`rounded-2xl border-2 ${upgrade.color} bg-white p-6 mb-10`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                {/* Left */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <FaStar className="text-maple text-sm" />
                        <span className={`font-mono text-xs px-3 py-1 rounded-full ${upgrade.badge}`}>
                            Upgrade Available
                        </span>
                    </div>
                    <div>
                        <h3 className="font-display text-xl font-bold text-ebony">
                            Ready to level up to{" "}
                            <span className="text-maple">{upgrade.to}?</span>
                        </h3>
                        <p className="text-ebony/55 text-sm mt-1">
                            You've started your journey as a {upgrade.from} student.
                            Here's what unlocks when you upgrade:
                        </p>
                    </div>

                    <ul className="grid sm:grid-cols-2 gap-1.5">
                        {upgrade.perks.map((perk, i) => (
                            <li key={i} className="flex items-center gap-2 text-ebony/70 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-maple flex-shrink-0" />
                                {perk}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right */}
                <div className="flex flex-col items-start sm:items-end gap-3 flex-shrink-0">
                    <div>
                        <p className="font-display text-3xl font-bold text-ebony">
                            {upgrade.price}
                        </p>
                        <p className="text-ebony/40 text-xs font-mono">
                            One-time · Lifetime access
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="group flex items-center gap-2 bg-ebony text-parchment font-medium px-5 py-2.5 rounded-lg hover:bg-rosewood transition text-sm"
                    >
                        Upgrade to {upgrade.to}
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
                    </Link>
                    <p className="text-ebony/30 text-xs">
                        Redirects to courses page to complete payment
                    </p>
                </div>
            </div>
        </div>
    );
}