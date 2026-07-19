"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../ui/animations";

const timeline = [
    { year: "2014", title: "First Bass Guitar", description: "Barry picked up his first bass guitar at 18 with no formal training — just raw curiosity and a deep love for gospel music." },
    { year: "2016", title: "First Stage Performance", description: "Two years of self-teaching paid off. Barry stepped onto his first major stage, playing for a gospel concert in Port Harcourt." },
    { year: "2018", title: "Going Professional", description: "Barry began touring and recording with gospel artists across the world, building a reputation for reliability, feel, and technical skill." },
    { year: "2022", title: "BBMA is Born", description: "After years of being asked by fellow musicians 'how do you play like that?', Barry launched Bassist Barry Music Academy to share everything he'd learned." },
    { year: "2024", title: "Growing The Community", description: "BBMA now serves students across the world at every skill level, with structured courses, exclusive materials, and a growing community of bass players." },
];

export default function BarryStory() {
    return (
        <section className="bg-parchment py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left — slides in from left */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase mb-3">
                            His Journey
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-ebony mb-8 leading-tight">
                            From Self-Taught{" "}
                            <span className="text-rosewood">to Stage Ready</span>
                        </h2>

                        <div className="flex flex-col gap-5 text-ebony/70 leading-relaxed">
                            <p>
                                Barry didn't grow up with music lessons or a formal conservatory
                                education. He grew up with a burning passion for gospel music and
                                the stubbornness to figure things out for himself. That combination
                                — raw drive paired with a genuine love for the craft — is what
                                shaped him into the musician he is today.
                            </p>
                            <p>
                                Over a decade spent in rehearsal rooms, on church stages, and in
                                recording studios across Nigeria taught Barry something no textbook
                                could: that great bass playing isn't just about technique, it's
                                about feel, timing, and understanding how to serve the music.
                                Those lessons are baked into every course at BBMA.
                            </p>
                            <p>
                                Today, Barry is on a mission to make world-class bass education
                                accessible to every Nigerian who picks up the instrument —
                                regardless of background, prior experience, or musical knowledge.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="mt-10 border-l-4 border-maple pl-6 py-2"
                        >
                            <p className="font-display text-xl text-ebony italic leading-snug">
                                "I want every student who comes through BBMA to leave not just
                                knowing how to play — but knowing how to think like a musician."
                            </p>
                            <p className="text-brass text-sm mt-3 font-mono">— Barry, Founder of BBMA</p>
                        </motion.div>
                    </motion.div>

                    {/* Right timeline — staggered items */}
                    <motion.div
                        className="relative"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <div className="absolute left-4 top-2 bottom-2 w-px bg-brass/25" />
                        <div className="flex flex-col gap-8">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={staggerItem}
                                    className="flex gap-6 items-start"
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-8 h-8 rounded-full bg-ebony border-2 border-maple flex items-center justify-center z-10 relative">
                                            <div className="w-2 h-2 rounded-full bg-maple" />
                                        </div>
                                    </div>
                                    <div className="pb-2">
                                        <span className="font-mono text-xs text-brass tracking-widest">
                                            {item.year}
                                        </span>
                                        <h3 className="font-display text-lg font-bold text-ebony mt-1 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-ebony/60 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}