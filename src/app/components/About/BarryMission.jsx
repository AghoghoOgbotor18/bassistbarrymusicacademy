import { FaBullseye, FaHeart, FaEye } from "react-icons/fa";

const pillars = [
    {
        icon: <FaEye className="text-maple text-xl" />,
        heading: "Our Vision",
        text: "To be the leading bass guitar education platform in Nigeria — producing confident, skilled, and musically intelligent bassists who transform every band they join.",
    },
    {
        icon: <FaBullseye className="text-maple text-xl" />,
        heading: "Our Mission",
        text: "To make world-class bass education accessible to every Nigerian, regardless of background — through structured courses, real-world techniques, and genuine mentorship.",
    },
    {
        icon: <FaHeart className="text-maple text-xl" />,
        heading: "Our Values",
        text: "Excellence, consistency, and community. We believe great musicians are made through repetition and encouragement — and BBMA is built to provide both.",
    },
];

export default function BarryMission() {
    return (
        <section className="bg-parchment py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left block */}
                    <div className="relative">
                        <div className="relative bg-ebony rounded-3xl p-10 overflow-hidden">
                            {/* Decorative rings */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-maple/20" />
                            <div className="absolute -top-5 -right-5 w-40 h-40 rounded-full border border-maple/10" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full border border-brass/20" />

                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-maple via-brass to-transparent" />

                            <p className="font-mono text-brass text-xs tracking-widest uppercase mb-6">
                                The BBMA Promise
                            </p>

                            <h3 className="font-display text-3xl font-bold text-parchment mb-6 leading-snug">
                                Every Student Leaves{" "}
                                <span className="text-maple">Better Than They Arrived.</span>
                            </h3>

                            <p className="text-parchment/60 leading-relaxed text-sm mb-8">
                                That's not marketing language — it's a commitment baked into how 
                                every lesson, every ebook, and every video at BBMA is structured. 
                                Progress is the product.
                            </p>

                            {/* board divider */}
                            <div className="flex items-center">
                                <div className="flex-1 h-px bg-brass/30" />
                                {[0,1,2,3].map((i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-brass/50 mx-4" />
                                ))}
                                <div className="flex-1 h-px bg-brass/30" />
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {[
                                    { label: "Structured", sub: "Not random tips" },
                                    { label: "Practical", sub: "Real playing skills" },
                                    { label: "Progressive", sub: "Level by level" },
                                    { label: "Supportive", sub: "You're not alone" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 rounded-xl px-4 py-3">
                                        <p className="text-maple text-sm font-bold">{item.label}</p>
                                        <p className="text-parchment/40 text-xs">{item.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Offset brass border */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brass/25 rounded-3xl -z-10" />
                    </div>

                    {/* Right pillars */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase mb-3">
                                What Drives Us
                            </p>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-ebony leading-tight">
                                Vision, Mission{" "}
                                <span className="text-rosewood">&amp; Values</span>
                            </h2>
                        </div>

                        {pillars.map((pillar, i) => (
                            <div
                                key={i}
                                className="flex gap-5 items-start group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-ebony flex items-center justify-center flex-shrink-0 group-hover:bg-rosewood transition-colors duration-300">
                                    {pillar.icon}
                                </div>
                                <div>
                                    <h3 className="font-display text-lg font-bold text-ebony mb-1">
                                        {pillar.heading}
                                    </h3>
                                    <p className="text-ebony/60 text-sm leading-relaxed">
                                        {pillar.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}