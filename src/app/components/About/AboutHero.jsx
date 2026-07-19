"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutHero() {
    return (
        <section className="relative bg-ebony min-h-[70vh] flex items-end overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/hero1.jpg"
                    alt="Bassist Barry"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-r from-ebony/95 via-ebony/70 to-ebony/30" />
                <div className="absolute inset-0 bg-linear-to-t from-ebony via-transparent to-ebony/40" />
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-maple to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20 pt-32">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-mono text-maple text-sm tracking-[0.25em] uppercase mb-4"
                >
                    The Story Behind The Sound
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="font-display text-5xl md:text-7xl font-bold text-parchment leading-tight mb-6 max-w-2xl"
                >
                    More Than a{" "}
                    <span className="text-maple">Bassist.</span>
                    <br />A Teacher.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-parchment/65 text-lg max-w-xl leading-relaxed"
                >
                    Ten years of stages, studios, and gospel services — distilled
                    into a learning experience built for every aspiring bassist in Nigeria.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="flex items-center gap-0 mt-12 max-w-xs"
                >
                    <div className="flex-1 h-px bg-brass/40" />
                    {[0,1,2].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-brass/60 mx-4" />
                    ))}
                    <div className="flex-1 h-px bg-brass/40" />
                </motion.div>
            </div>
        </section>
    );
}