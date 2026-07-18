"use client";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "../ui/animations";

export default function FinalCTA() {
    const { openModal } = useAuthModal();

    return (
        <section className="bg-parchment py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative bg-ebony rounded-3xl px-8 py-16 md:px-16 text-center overflow-hidden"
                >
                    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border border-brass/20" />
                    <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full border border-brass/10" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-brass/20" />
                    <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full border border-brass/10" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-maple/60 to-transparent" />

                    <motion.div
                        className="relative z-10"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.p variants={staggerItem} className="font-mono text-maple text-sm tracking-[0.2em] uppercase mb-4">
                            Your Journey Starts Here
                        </motion.p>
                        <motion.h2 variants={staggerItem} className="font-display text-4xl md:text-5xl font-bold text-parchment mb-6 leading-tight">
                            Ready to Play Bass{" "}
                            <span className="text-maple">Like You Mean It?</span>
                        </motion.h2>
                        <motion.p variants={staggerItem} className="text-parchment/60 max-w-xl mx-auto mb-10 leading-relaxed">
                            Join hundreds of students across Nigeria who are building real
                            bass skills with Bassist Barry. Pick your tier, make payment,
                            and get your ebook delivered straight to your inbox today.
                        </motion.p>
                        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => openModal("signup")}
                                className="group flex items-center gap-2 bg-maple text-ebony font-medium px-8 py-3.5 rounded-lg hover:bg-maple/90 transition text-lg w-full sm:w-auto justify-center"
                            >
                                Start Today
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a href="/courses" className="text-parchment/70 hover:text-maple transition text-sm underline underline-offset-4">
                                Browse courses first
                            </a>
                        </motion.div>
                        <motion.p variants={staggerItem} className="text-parchment/30 text-xs mt-8">
                            Secure payment via Paystack · Ebook delivered instantly · No hidden fees
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}