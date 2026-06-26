"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthModal } from "@/app/context/AuthModalContext";

const slides = [
    { src: "/images/hero1.jpg", alt: "Barry playing bass on stage", position: "center center" },
    { src: "/images/hero3.jpg", alt: "Bass guitar close up", position: "top center" },
    { src: "/images/hero2.jpg", alt: "Barry teaching a student", position: "center center" },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const { openModal } = useAuthModal();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center  py-10 overflow-hidden">

            {/* All images stacked — only the active one is visible */}
            {slides.map((slide, index) => (
                <div
                    key={slide.src}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{ opacity: index === current ? 1 : 0 }}
                >
                    <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        className="object-cover"
                        style={{ objectPosition: slide.position }}
                        sizes="100vw"
                    />
                </div>
            ))}

            {/* Dark overlay — sits above all images */}
            <div className="absolute inset-0 bg-ebony/80 z-10" />

            {/* Content */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
                <p className="font-mono text-maple text-xs tracking-[0.2em] uppercase mb-4">
                    Bassist Barry Music Academy
                </p>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-parchment leading-tight mb-6">
                    Learn Bass From{" "}
                    <span className="text-maple">The Ground Up</span>
                </h1>
                <p className="text-parchment/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Whether you're picking up a bass for the first time or ready to go
                    professional, Bassist Barry Music Academy gives you the skills,
                    structure, and support to get there.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => openModal("signup")}
                        className="bg-maple text-ebony font-medium px-8 py-3 rounded-lg hover:bg-maple/90 transition text-lg w-full sm:w-auto"
                    >
                        Start Learning Today
                    </button>
                    <a
                        href="/courses"
                        className="border border-parchment/40 text-parchment px-8 py-3 rounded-lg hover:border-maple hover:text-maple transition text-lg w-full sm:w-auto text-center"
                    >
                        View Courses
                    </a>
                </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`transition-all duration-300 rounded-full ${
                            current === index
                                ? "bg-maple w-6 h-2"
                                : "bg-parchment/40 w-2 h-2 hover:bg-parchment/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Fretboard divider bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center">
                <div className="flex-1 h-px bg-brass/30" />
                {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-brass/50 mx-6" />
                ))}
                <div className="flex-1 h-px bg-brass/30" />
            </div>
        </section>
    );
}