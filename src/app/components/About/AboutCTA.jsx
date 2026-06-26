"use client";
import { useAuthModal } from "@/app/context/AuthModalContext";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function AboutCTA() {
    const { openModal } = useAuthModal();

    return (
        <section className="bg-ebony py-24 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <p className="font-mono text-maple text-sm tracking-[0.2em] uppercase mb-4">
                    Ready to Begin?
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-bold text-parchment mb-6 leading-tight">
                    Your Bass Journey{" "}
                    <span className="text-maple">Starts With One Step.</span>
                </h2>
                <p className="text-parchment/55 max-w-xl mx-auto mb-10 leading-relaxed">
                    Whether you're a complete beginner or a player looking to level up,
                    BBMA has a structured path built for exactly where you are right now.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => openModal("signup")}
                        className="group flex items-center justify-center gap-2 bg-maple text-ebony font-medium px-8 py-4 rounded-lg hover:bg-maple/90 transition text-lg w-full sm:w-auto"
                    >
                        Join BBMA Today
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <Link
                        href="/courses"
                        className="border border-parchment/25 text-parchment px-8 py-4 rounded-lg hover:border-maple hover:text-maple transition text-lg w-full sm:w-auto text-center"
                    >
                        Browse Courses
                    </Link>
                </div>

                <div className="flex items-center mt-16 max-w-sm mx-auto">
                    <div className="flex-1 h-px bg-brass/25" />
                    {[0,1,2,3,4].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-brass/40 mx-4" />
                    ))}
                    <div className="flex-1 h-px bg-brass/25" />
                </div>
            </div>
        </section>
    );
}