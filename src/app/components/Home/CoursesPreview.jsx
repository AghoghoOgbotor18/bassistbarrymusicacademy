"use client";
import { FaCheck, FaCheckCircle, FaSpinner, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "../ui/animations";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { createClient } from "@/app/lib/supabase";

const tiers = [
    {
        level: "Beginner",
        slug: "beginner",
        price: "₦7,000",
        description: "Perfect if you've never touched a bass before. Build a rock-solid foundation from day one.",
        color: "border-brass/40",
        badge: "bg-brass/10 text-brass",
        features: [
            "Understanding the bass guitar",
            "Proper posture & hand technique",
            "Reading basic tablature",
            "Your first 5 grooves",
            "Beginner ebook + practice guide",
            "2 exclusive video lessons",
        ],
    },
    {
        level: "Intermediate",
        slug: "intermediate",
        price: "₦14,000",
        description: "You know the basics. Now it's time to develop your sound, speed, and musicality.",
        color: "border-maple",
        badge: "bg-maple/10 text-maple",
        popular: true,
        features: [
            "Everything in Beginner",
            "Scales, modes & music theory",
            "Slap & pop techniques",
            "Playing with a band context",
            "Intermediate ebook + exercises",
            "3 Exclusive video lessons",
        ],
    },
    {
        level: "Advanced",
        slug: "advanced",
        price: "₦50,000",
        description: "For serious players ready to go professional and command any stage or studio.",
        color: "border-rosewood/60",
        badge: "bg-rosewood/10 text-rosewood",
        features: [
            "Everything in Intermediate",
            "Advanced gospel bass techniques",
            "Studio session skills",
            "Advanced ebook + masterclasses",
            "4 exclusive video lessons",
            "Private class with Bassist Barry",
        ],
    },
];

export default function CoursesPreview() {
    const { openModal } = useAuthModal();
    const [loadingTier, setLoadingTier] = useState(null);
    const [error, setError] = useState(null);
    const supabase = createClient();
    const [isOpen, setIsOpen] = useState(false);

    const handleGetStarted = async (tierSlug) => {
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            openModal("signup");
            return;
        }

        setLoadingTier(tierSlug);

        try {
            const response = await fetch("/api/paystack/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tierSlug }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to initialize payment");
            }

            window.location.href = data.authorization_url;
        } catch (err) {
            setError(err.message);
            setLoadingTier(null);
            setIsOpen(true);
        }
    };

    return (
        <section className="bg-ebony py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <p className="font-mono text-maple text-sm tracking-[0.2em] uppercase text-center mb-3">
                        Choose Your Path
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment text-center mb-4">
                        What You'll Learn
                    </h2>
                    <p className="text-parchment/60 text-center max-w-xl mx-auto mb-16 leading-relaxed">
                        Three structured tiers designed to take you from your very first note
                        to commanding any stage or studio in Nigeria and beyond.
                    </p>
                </motion.div>

                {isOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-ebony/30 backdrop-blur-sm px-4">
                        <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-center flex flex-col justify-center items-center">
                            <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute right-4 top-4 text-ebony/50 hover:text-ebony transition"
                                        aria-label="Close modal"
                                    >
                                        <FaTimes className="text-lg" />
                                    </button>
                                    <FaCheckCircle className="text-blue-500 text-5xl" />
                                    <p className="py-6">{error}</p>
                                    <button
                                        onClick={()  => setIsOpen(false)}
                                        className="w-full rounded-xl bg-rosewood py-3 text-white font-medium hover:opacity-90 transition"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                )}

                <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            variants={staggerItem}
                            className={`relative bg-white/2 rounded-2xl border-2 ${tier.color} bg-ebony p-7 flex flex-col gap-5 hover:scale-[1.02] transition-transform duration-300`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-maple text-ebony text-xs font-bold px-4 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <div>
                                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${tier.badge}`}>
                                    {tier.level}
                                </span>
                                <p className="font-display text-3xl font-bold text-parchment mt-4">{tier.price}</p>
                                <p className="text-parchment/55 text-sm mt-2 leading-relaxed">{tier.description}</p>
                            </div>
                            <div className="flex-1 flex flex-col gap-3">
                                {tier.features.map((feature, j) => (
                                    <div key={j} className="flex items-start gap-3">
                                        <FaCheck className="text-maple mt-0.5 flex-shrink-0 text-sm" />
                                        <span className="text-parchment/75 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => handleGetStarted(tier.slug)}
                                disabled={loadingTier !== null}
                                className="mt-2 text-center py-3 rounded-lg font-medium transition text-sm bg-maple text-ebony hover:bg-maple/90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loadingTier === tier.slug ? (
                                    <><FaSpinner className="animate-spin text-sm" />Redirecting...</>
                                ) : (
                                    "Get Started"
                                )}
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center text-parchment/40 text-sm mt-10"
                >
                    All tiers include a digital ebook delivered to your email after payment.
                </motion.p>
            </div>
        </section>
    );
}