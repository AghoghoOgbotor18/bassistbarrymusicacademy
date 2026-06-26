"use client";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { FaCheck, FaStar } from "react-icons/fa";

const tiers = [
    {
        id: "beginner",
        level: "Beginner",
        tag: "Start Here",
        price: "₦15,000",
        duration: "4 weeks",
        tagColor: "bg-brass/15 text-brass border border-brass/30",
        accentColor: "border-brass/70",
        badgeColor: "bg-brass/10 text-brass",
        buttonStyle: "bg-maple/80 text-ebony hover:bg-maple/70",
        description: "Built for absolute beginners who want to start strong. No prior experience needed — just curiosity and commitment.",
        whatYouGet: [
            "Bass guitar fundamentals & anatomy",
            "Proper posture, grip & hand position",
            "Reading tabs & basic music notation",
            "5 foundational bass grooves",
            "Finger independence exercises",
            "Beginner ebook (PDF, delivered by email)",
            "1 free welcome video on dashboard",
        ],
        outcome: "By the end, you'll confidently hold your instrument, read tabs, and play your first real grooves.",
    },
    {
        id: "intermediate",
        level: "Intermediate",
        tag: "Most Popular",
        price: "₦25,000",
        duration: "8 weeks",
        tagColor: "bg-maple/15 text-maple border border-maple/30",
        accentColor: "border-maple",
        badgeColor: "bg-maple/10 text-maple",
        buttonStyle: "bg-maple text-ebony hover:bg-maple/90",
        popular: true,
        description: "You know the basics. Now it's time to develop real technique, musical feel, and the skills that get you on stage.",
        whatYouGet: [
            "Everything in Beginner",
            "Scales, modes & music theory for bass",
            "Slap, pop & percussive techniques",
            "Playing in a band context",
            "Gospel bass grooves & patterns",
            "Intermediate ebook (PDF, delivered by email)",
            "Exclusive video lesson library",
        ],
        outcome: "By the end, you'll be ready to play with a worship team, hold down complex grooves, and understand music theory.",
    },
    {
        id: "advanced",
        level: "Advanced",
        tag: "Professional",
        price: "₦40,000",
        duration: "12 weeks",
        tagColor: "bg-rosewood/25 text-rosewood border border-rosewood/30",
        accentColor: "border-rosewood",
        badgeColor: "bg-rosewood/10 text-rosewood",
        buttonStyle: "bg-maple/80 text-ebony hover:bg-maple/70",
        description: "For serious players ready to go professional. Studio session skills, improvisation, and advanced gospel technique.",
        whatYouGet: [
            "Everything in Intermediate",
            "Advanced gospel bass techniques",
            "Studio session skills & etiquette",
            "Soloing, improvisation & ear training",
            "Walking bass lines & jazz influence",
            "Advanced ebook (PDF, delivered by email)",
            "Full video masterclass library",
        ],
        outcome: "By the end, you'll be equipped to work as a session bassist, lead worship musically, and play at a professional level.",
    },
];

export default function CoursesTiers() {
    const { openModal } = useAuthModal();

    return (
        <section className="bg-ebony py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-maple text-sm tracking-[0.2em] uppercase text-center mb-3">
                    The Three Tiers
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment text-center mb-4">
                    Choose Your Path
                </h2>
                <p className="text-parchment/50 text-center max-w-xl mx-auto mb-16 leading-relaxed">
                    Not sure which tier fits you? Start with Beginner — you can
                    always level up. Every tier builds on the last.
                </p>

                <div className="flex flex-col gap-8">
                    {tiers.map((tier, i) => (
                        <div
                            key={i}
                            id={tier.id}
                            className={`relative rounded-2xl border-2 ${tier.accentColor} bg-white/5 overflow-hidden`}
                        >
                            {/* Popular banner */}
                            {tier.popular && (
                                <div className="bg-maple text-ebony text-xs font-bold px-6 py-1.5 text-center font-mono tracking-widest uppercase flex items-center justify-center gap-2">
                                    <FaStar className="text-xs" />
                                    Most Popular Choice
                                    <FaStar className="text-xs" />
                                </div>
                            )}

                            <div className="p-8 md:p-10 grid md:grid-cols-3 gap-8">
                                {/* Left tier info */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className={`font-mono text-xs px-3 py-1 rounded-full ${tier.tagColor}`}>
                                            {tier.tag}
                                        </span>
                                    </div>

                                    <h3 className="font-display text-3xl font-bold text-parchment">
                                        {tier.level}
                                    </h3>

                                    <p className="text-parchment/55 text-sm leading-relaxed">
                                        {tier.description}
                                    </p>

                                    <div className="mt-auto">
                                        <p className="font-display text-4xl font-bold text-parchment">
                                            {tier.price}
                                        </p>
                                        <p className="text-parchment/40 text-xs font-mono mt-1">
                                            One-time payment · {tier.duration} curriculum
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => openModal("signup")}
                                        className={`mt-2 py-3 px-6 rounded-lg font-medium text-sm transition ${tier.buttonStyle}`}
                                    >
                                        Enroll in {tier.level}
                                    </button>
                                </div>

                                {/* Middle — what you get */}
                                <div>
                                    <p className="font-mono text-xs tracking-widest uppercase text-parchment/40 mb-4">
                                        What's Included
                                    </p>
                                    <ul className="flex flex-col gap-3">
                                        {tier.whatYouGet.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <FaCheck className="text-maple text-xs mt-1 flex-shrink-0" />
                                                <span className="text-parchment/70 text-sm leading-snug">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right — outcome card */}
                                <div className="flex flex-col justify-between gap-6">
                                    <div className="bg-white/5 border border-parchment/10 rounded-xl p-6 flex flex-col gap-3">
                                        <p className="font-mono text-xs tracking-widest uppercase text-parchment/40">
                                            Your Outcome
                                        </p>
                                        <p className="text-parchment/75 text-sm leading-relaxed">
                                            {tier.outcome}
                                        </p>
                                    </div>

                                    <div className="bg-white/5 border border-parchment/10 rounded-xl p-6 flex flex-col gap-3">
                                        <p className="font-mono text-xs tracking-widest uppercase text-parchment/40">
                                            Delivered To You
                                        </p>
                                        <ul className="flex flex-col gap-2">
                                            {["Ebook via email", "Dashboard video access", "Lifetime access"].map((d, k) => (
                                                <li key={k} className="flex items-center gap-2 text-parchment/60 text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-maple flex-shrink-0" />
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}