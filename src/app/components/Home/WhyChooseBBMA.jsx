"use client"
import { fadeUp, staggerContainer } from "../ui/animations";
import { features } from "./whyChooseUs/WhyChooseData";
import { motion } from "framer-motion";

export default function WhyChooseBBMA() {
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
                        Why Students Choose Us
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-ebony text-center mb-4">
                        Why Choose BBMA
                    </h2>
                    <p className="text-ebony/55 text-center max-w-xl mx-auto mb-16 leading-relaxed">
                        There are plenty of ways to learn bass online. Here's what makes
                        Bassist Barry Music Academy different.
                    </p>
                </motion.div>

                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >

                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="group relative h-72 overflow-hidden rounded-md shadow-md"
                        >
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-active:scale-110"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-ebony via-ebony/60 to-ebony/20 transition-all duration-500 group-hover:from-ebony/95 group-hover:via-ebony/90" />

                            <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-maple bg-ebony/70 text-lg text-maple backdrop-blur-sm transition-colors duration-300 group-hover:bg-maple group-hover:text-ebony group-active:bg-maple group-active:text-ebony">
                                {feature.icon}
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-6">
                                <h3 className="font-display text-lg font-medium text-white">
                                    {feature.title}
                                </h3>
                                <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-active:grid-rows-[1fr]">
                                    <p className="overflow-hidden font-sans text-sm leading-relaxed text-white">
                                        {feature.desc}
                                    </p>
                                </div>

                                <span className="mt-3 block h-px w-8 bg-maple transition-all duration-300 group-hover:w-full group-active:w-full" />
                            </div>
                        </div>
                    ))}
        
                </motion.div>
            </div>
        </section>
    );
}