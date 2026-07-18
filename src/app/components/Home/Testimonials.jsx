"use client";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../ui/animations";

const testimonials = [
    {
        name: "Chukwuemeka Eze",
        role: "Worship Bassist, Lagos",
        initials: "CE",
        rating: 5,
        text: "Before BBMA I was just copying YouTube videos with no real direction. Barry's structured approach completely changed how I think about the bass. Within 3 months I was playing for my church's main service.",
    },
    {
        name: "Amaka Okafor",
        role: "Beginner Student, Abuja",
        initials: "AO",
        rating: 5,
        text: "I had zero musical background and was honestly nervous to start. The beginner course broke everything down so clearly — I never felt lost. Now I actually understand music, not just bass.",
    },
    {
        name: "Tunde Adeyemi",
        role: "Intermediate Student, Port Harcourt",
        initials: "TA",
        rating: 5,
        text: "The slap and pop module alone was worth every kobo. Barry explains the technique in a way that finally made it click for me after months of struggling with other resources.",
    },
    {
        name: "Blessing Nwosu",
        role: "Advanced Student, Enugu",
        initials: "BN",
        rating: 5,
        text: "I've been playing for 4 years but the advanced course showed me how much I didn't know. The gospel technique breakdowns are unlike anything available online. Barry is the real deal.",
    },
    {
        name: "Segun Martins",
        role: "Studio Musician, Lagos",
        initials: "SM",
        rating: 5,
        text: "I was already gigging regularly but Barry's advanced materials helped me level up my studio session game. The ebook alone is a masterclass. Highly recommend to any serious bassist.",
    },
    {
        name: "Chidinma Obi",
        role: "Beginner Student, Benin City",
        initials: "CO",
        rating: 5,
        text: "The ebook that came with my enrollment is so detailed and well-organised. I keep going back to it. Barry clearly put real thought into making this accessible for complete beginners.",
    },
];

function getVisibleCount() {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
}

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState("right");
    const autoPlayRef = useRef(null);

    useEffect(() => {
        setVisibleCount(getVisibleCount());

        function handleResize() {
            setVisibleCount(getVisibleCount());
            setCurrent(0);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // auto advance every 5 seconds
    useEffect(() => {
        autoPlayRef.current = setInterval(() => {
            goNext();
        }, 5000);
        return () => clearInterval(autoPlayRef.current);
    }, [current, visibleCount]);

    const totalSlides = testimonials.length - visibleCount + 1;

    const goNext = () => {
        if (isAnimating) return;
        setDirection("right");
        setIsAnimating(true);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % totalSlides);
            setIsAnimating(false);
        }, 400);
    };

    const goPrev = () => {
        if (isAnimating) return;
        setDirection("left");
        setIsAnimating(true);
        setTimeout(() => {
            setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
            setIsAnimating(false);
        }, 400);
    };

    const goTo = (index) => {
        if (isAnimating || index === current) return;
        setDirection(index > current ? "right" : "left");
        setIsAnimating(true);
        setTimeout(() => {
            setCurrent(index);
            setIsAnimating(false);
        }, 400);
    };

    const visibleTestimonials = testimonials.slice(current, current + visibleCount);

    return (
        <section className="bg-ebony py-20 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <p className="font-mono text-maple text-sm tracking-[0.2em] uppercase text-center mb-3">
                        Student Stories
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment text-center mb-4">
                        What Our Students Say
                    </h2>
                    <p className="text-parchment/55 text-center max-w-xl mx-auto mb-16 leading-relaxed">
                        Real feedback from real students across Nigeria who have gone
                        through the BBMA programme.
                    </p>
                </motion.div>
                {/* Carousel wrapper */}
                <div className="relative">

                    {/* Cards */}
                    <div
                        className="grid gap-6 transition-all duration-400"
                        style={{
                            gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
                            opacity: isAnimating ? 0 : 1,
                            transform: isAnimating
                                ? `translateX(${direction === "right" ? "-20px" : "20px"})`
                                : "translateX(0)",
                            transition: "opacity 0.4s ease, transform 0.4s ease",
                        }}
                    >
                        {visibleTestimonials.map((t, i) => (
                            <div
                                key={`${current}-${i}`}
                                className="bg-white/5 border border-parchment/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-brass/40 transition-colors duration-300"
                            >
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {Array.from({ length: t.rating }).map((_, s) => (
                                        <FaStar key={s} className="text-maple text-sm" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <div className="relative">
                                    <FaQuoteLeft className="text-maple/20 text-4xl absolute -top-1 -left-1" />
                                    <p className="text-parchment/75 text-sm leading-relaxed pl-4">
                                        {t.text}
                                    </p>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-parchment/10">
                                    <div className="w-9 h-9 rounded-full bg-maple flex items-center justify-center text-ebony text-xs font-bold flex-shrink-0">
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-parchment font-medium text-sm">{t.name}</p>
                                        <p className="text-parchment/45 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Left arrow */}
                    <button
                        onClick={goPrev}
                        disabled={isAnimating}
                        className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-parchment/10 border border-parchment/20 flex items-center justify-center text-parchment hover:bg-maple hover:border-maple hover:text-ebony transition disabled:opacity-30 disabled:cursor-not-allowed z-10"
                        aria-label="Previous"
                    >
                        <FaChevronLeft className="text-sm" />
                    </button>

                    {/* Right arrow */}
                    <button
                        onClick={goNext}
                        disabled={isAnimating}
                        className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-parchment/10 border border-parchment/20 flex items-center justify-center text-parchment hover:bg-maple hover:border-maple hover:text-ebony transition disabled:opacity-30 disabled:cursor-not-allowed z-10"
                        aria-label="Next"
                    >
                        <FaChevronRight className="text-sm" />
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-2 mt-10">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`transition-all duration-300 rounded-full ${
                                current === i
                                    ? "bg-maple w-6 h-2"
                                    : "bg-parchment/20 w-2 h-2 hover:bg-parchment/40"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Slide counter */}
                <p className="text-center text-parchment/30 font-mono text-xs mt-4 tracking-widest">
                    {current + 1} / {totalSlides}
                </p>
            </div>
        </section>
    );
}