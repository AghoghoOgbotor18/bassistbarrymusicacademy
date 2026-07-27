"use client";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../ui/animations";
import CoursesTiers from "./CoursesTiers";

export default function CoursesHero() {
    return (
        <section className="relative bg-ebony pt-32 pb-24 px-4 overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-maple/10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full border border-maple/10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full border border-brass/10 -translate-x-1/2 translate-y-1/2" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-maple/50 to-transparent" />

            <motion.div
                className="max-w-6xl mx-auto relative z-10"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-3xl">
                    <motion.p variants={staggerItem} className="font-mono text-maple text-sm tracking-[0.25em] uppercase mb-4">
                        Your Learning Path
                    </motion.p>
                    <motion.h1 variants={staggerItem} className="font-display text-5xl md:text-7xl font-bold text-parchment leading-tight mb-6">
                        Find Your{" "}
                        <span className="text-maple">Level.</span>
                        <br />
                        Start Your{" "}
                        <span className="relative inline-block">
                            Journey.
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-maple to-brass rounded-full" />
                        </span>
                    </motion.h1>
                    <motion.p variants={staggerItem} className="text-parchment/60 text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
                        Three carefully structured tiers designed to take you from your
                        very first note all the way to commanding any stage or studio.
                        Pick where you are — we'll take you where you want to be.
                    </motion.p>
                    <motion.p variants={staggerItem} className="text-parchment/60 text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
                        Choose your path with our three tier. Not sure which tier fits you? Start with Beginner, you can always level up. Every tier builds on the last.
                    </motion.p>

                    <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mt-10">
                        {[
                            { label: "Beginner", color: "border-brass/50 text-brass" },
                            { label: "Intermediate", color: "border-maple/50 text-maple" },
                            { label: "Advanced", color: "border-rosewood/50 text-rosewood" },
                        ].map((tier) => (
                            <a
                                key={tier.label}
                                href={`#${tier.label.toLowerCase()}`}
                                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border ${tier.color} hover:bg-white/5 transition`}
                            >
                                {tier.label}
                            </a>
                        ))}
                    </motion.div>
                </div>

                <motion.div variants={staggerItem} className="flex items-center gap-3 mt-16">
                    <div className="flex flex-col items-center gap-1 text-parchment/30 animate-bounce">
                        <FaArrowDown className="text-sm" />
                    </div>
                    <p className="text-parchment/30 font-mono text-xs tracking-widest uppercase">
                        Explore courses
                    </p>
                </motion.div>
                <CoursesTiers />
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center">
                <div className="flex-1 h-px bg-brass/20" />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-brass/40 mx-6" />
                ))}
                <div className="flex-1 h-px bg-brass/20" />
            </div>
        </section>
    );
}