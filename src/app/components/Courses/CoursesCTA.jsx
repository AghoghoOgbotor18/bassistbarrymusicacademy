"use client";
import { useAuthModal } from "../../context/AuthModalContext";
import { FaArrowRight } from "react-icons/fa";

export default function CoursesCTA() {
    const { openModal } = useAuthModal();

    return (
        <section className="bg-parchment py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="relative bg-ebony rounded-3xl px-8 py-16 md:px-16 text-center overflow-hidden">

                    {/* Decorative rings */}
                    <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border border-brass/15" />
                    <div className="absolute -top-8 -right-8 w-56 h-56 rounded-full border border-brass/8" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-maple/15" />

                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-maple/60 to-transparent" />

                    <div className="relative z-10">
                        <p className="font-mono text-maple text-sm tracking-[0.2em] uppercase mb-4">
                            No More Waiting
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment mb-6 leading-tight">
                            The Best Time to Start{" "}
                            <span className="text-maple">Was Yesterday.</span>
                            <br />
                            The Next Best Time is Now.
                        </h2>
                        <p className="text-parchment/55 max-w-xl mx-auto mb-10 leading-relaxed">
                            Pick your tier, complete payment, and have your ebook
                            in your inbox today. Your dashboard unlocks immediately.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => openModal("signup")}
                                className="group flex items-center justify-center gap-2 bg-maple text-ebony font-medium px-8 py-4 rounded-lg hover:bg-maple/90 transition text-lg w-full sm:w-auto"
                            >
                                Enroll Now
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a
                                href="/contact"
                                className="text-parchment/60 hover:text-maple transition text-sm underline underline-offset-4"
                            >
                                Have a question first?
                            </a>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                            {[
                                "Secure payment via Paystack",
                                "Ebook delivered instantly",
                                "Lifetime dashboard access",
                                "No hidden fees",
                            ].map((point, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-maple" />
                                    <span className="text-parchment/35 text-xs font-mono">
                                        {point}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}