"use client"
import Image from "next/image";
import Link from "next/link";
import { FaMusic, FaChalkboardTeacher, FaGuitar } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "../ui/animations";

const stats = [
    { icon: <FaGuitar className="text-maple text-xl" />, value: "10+", label: "Years Playing Bass" },
    { icon: <FaMusic className="text-maple text-xl" />, value: "50+", label: "Gospel Artists Worked With" },
    { icon: <FaChalkboardTeacher className="text-maple text-xl" />, value: "2+", label: "Years Teaching" },
];

export default function MeetBarry() {
    return (
        <section className="bg-parchment py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase text-center mb-3">
                        The Man Behind The Bass
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-ebony text-center mb-16">
                        Meet Your Instructor
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image — slides in from left */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                            <Image
                                src="/images/hero1.jpg"
                                alt="Bassist Barry — your instructor"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ebony/60 to-transparent" />
                        </div>
                        <div className="absolute -bottom-5 -right-4 bg-ebony text-parchment px-5 py-3 rounded-xl shadow-lg border border-brass/30">
                            <p className="font-display text-2xl font-bold text-maple">10+</p>
                            <p className="text-xs text-parchment/70">Years of Experience</p>
                        </div>
                    </motion.div>

                    {/* Text — slides in from right */}
                    <motion.div
                        className="flex flex-col gap-6"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <h3 className="font-display text-3xl font-bold text-ebony">
                            Fortune Baridoge Barizasi
                        </h3>
                        <div className="flex flex-col gap-4 text-ebony/75 leading-relaxed">
                            <p>
                                Barry is a professional bassist with over a decade of experience
                                playing across Nigeria's vibrant gospel music scene. Having shared
                                the stage and studio with more than 50 gospel artists, he brings
                                a wealth of real-world musical knowledge that goes far beyond
                                what any textbook can teach.
                            </p>
                            <p>
                                His playing style blends technical precision with deep musical
                                feel — the kind of foundation that makes every band sound tighter,
                                every song hit harder, and every performance feel complete.
                            </p>
                            <p>
                                For the past two years, Barry has channelled that experience into
                                teaching — breaking down the bass into clear, structured lessons
                                that meet students exactly where they are.
                            </p>
                        </div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-3 gap-4 py-6 border-t border-b border-brass/20"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {stats.map((stat, i) => (
                                <motion.div key={i} variants={staggerItem} className="flex flex-col items-center text-center gap-1">
                                    {stat.icon}
                                    <p className="font-display text-2xl font-bold text-ebony">{stat.value}</p>
                                    <p className="text-xs text-ebony/60 leading-tight">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="flex items-center gap-4">
                            <Link href="/about" className="bg-ebony text-parchment font-medium px-6 py-3 rounded-lg hover:bg-rosewood transition">
                                Full Story →
                            </Link>
                            <Link href="/courses" className="text-maple font-medium hover:underline">
                                View Courses
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}