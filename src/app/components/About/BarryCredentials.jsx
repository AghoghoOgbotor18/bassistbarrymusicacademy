"use client";
import { FaGuitar, FaMusic, FaChalkboardTeacher, FaUsers, FaStar, FaMicrophone } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "../ui/animations";

const stats = [
    { icon: <FaGuitar className="text-maple text-3xl" />, value: "10+", label: "Years Playing Bass", description: "A decade of professional experience on stages and in studios" },
    { icon: <FaMicrophone className="text-maple text-3xl" />, value: "10+", label: "Gospel Artists", description: "Played and recorded with artists across Nigeria's gospel scene" },
    { icon: <FaChalkboardTeacher className="text-maple text-3xl" />, value: "6+", label: "Years Teaching", description: "Dedicated to structured, results-driven bass education" },
    { icon: <FaUsers className="text-maple text-3xl" />, value: "50+", label: "Students Trained", description: "A growing community of bassists at every skill level" },
    { icon: <FaStar className="text-maple text-3xl" />, value: "3", label: "Course Tiers", description: "Beginner, Intermediate and Advanced — a path for everyone" },
    { icon: <FaMusic className="text-maple text-3xl" />, value: "100%", label: "Gospel-Focused", description: "Techniques and styles rooted in Nigeria's richest musical tradition" },
];

export default function BarryCredentials() {
    return (
        <section className="bg-ebony py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <p className="font-mono text-maple text-sm tracking-[0.2em] uppercase text-center mb-3">
                        By The Numbers
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment text-center mb-4">
                        Experience You Can Trust
                    </h2>
                    <p className="text-parchment/50 text-center max-w-xl mx-auto mb-16 leading-relaxed">
                        Numbers don't tell the whole story — but they give you a sense
                        of the depth behind what Barry teaches.
                    </p>
                </motion.div>

                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={staggerItem}
                            className="group relative bg-white/5 border border-parchment/10 rounded-2xl p-7 hover:border-maple/50 hover:bg-white/8 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-maple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className="mb-4">{stat.icon}</div>
                                <p className="font-display text-4xl font-bold text-parchment mb-1">{stat.value}</p>
                                <p className="text-maple font-mono text-xs tracking-widest uppercase mb-2">{stat.label}</p>
                                <p className="text-parchment/45 text-sm leading-relaxed">{stat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}