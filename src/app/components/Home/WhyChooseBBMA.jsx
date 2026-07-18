"use client"
import { FaShieldAlt, FaBookOpen, FaHeadphones, FaCertificate, FaUserCheck, FaMobileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "../ui/animations";

const reasons = [
    { icon: <FaUserCheck className="text-2xl text-maple" />, title: "Learn From a Real Professional", description: "Barry has spent 10+ years on stages and in studios across Nigeria. You're not learning from theory — you're learning from lived experience." },
    { icon: <FaBookOpen className="text-2xl text-maple" />, title: "Structured Curriculum", description: "Every tier follows a clear, progressive structure. No guessing what to learn next — just follow the path and watch yourself grow." },
    { icon: <FaHeadphones className="text-2xl text-maple" />, title: "Gospel-Focused Training", description: "Techniques and grooves rooted in the gospel music scene — the style that demands the most from a bassist and produces the best players." },
    { icon: <FaShieldAlt className="text-2xl text-maple" />, title: "Exclusive Materials", description: "Every paid tier comes with exclusive ebooks, video lessons, and practice exercises you won't find anywhere else." },
    { icon: <FaMobileAlt className="text-2xl text-maple" />, title: "Learn At Your Own Pace", description: "Access your materials anytime, anywhere. Your dashboard is available 24/7 so you can learn on your schedule, not ours." },
    { icon: <FaCertificate className="text-2xl text-maple" />, title: "Real Results", description: "Students leave BBMA with the technique, confidence, and musical vocabulary to join bands, lead worship, and hold down any gig." },
];

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
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            variants={staggerItem}
                            className="group bg-white rounded-2xl p-7 border border-brass/15 hover:border-maple/40 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-ebony flex items-center justify-center mb-5 group-hover:bg-rosewood transition-colors duration-300">
                                {reason.icon}
                            </div>
                            <h3 className="font-display text-lg font-bold text-ebony mb-2">{reason.title}</h3>
                            <p className="text-ebony/60 text-sm leading-relaxed">{reason.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}