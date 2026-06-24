import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
    {
        name: "Chukwuemeka Eze",
        role: "Worship Bassist, Lagos",
        initials: "CE",
        rating: 5,
        text: "Before BBMA I was just copying YouTube videos with no real direction. Barry's structured approach completely changed how I think about the bass. Within 3 months I was playing for my church's main service.",
    },
    {
        name: "Amaka Okafor",
        role: "Beginner Student, Abuja",
        initials: "AO",
        rating: 5,
        text: "I had zero musical background and was honestly nervous to start. The beginner course broke everything down so clearly — I never felt lost. Now I actually understand music, not just bass.",
    },
    {
        name: "Tunde Adeyemi",
        role: "Intermediate Student, Port Harcourt",
        initials: "TA",
        rating: 5,
        text: "The slap and pop module alone was worth every kobo. Barry explains the technique in a way that finally made it click for me after months of struggling with other resources.",
    },
    {
        name: "Blessing Nwosu",
        role: "Advanced Student, Enugu",
        initials: "BN",
        rating: 5,
        text: "I've been playing for 4 years but the advanced course showed me how much I didn't know. The gospel technique breakdowns are unlike anything available online. Barry is the real deal.",
    },
    {
        name: "Segun Martins",
        role: "Studio Musician, Lagos",
        initials: "SM",
        rating: 5,
        text: "I was already gigging regularly but Barry's advanced materials helped me level up my studio session game. The ebook alone is a masterclass. Highly recommend to any serious bassist.",
    },
    {
        name: "Chidinma Obi",
        role: "Beginner Student, Benin City",
        initials: "CO",
        rating: 5,
        text: "The ebook that came with my enrollment is so detailed and well-organised. I keep going back to it. Barry clearly put real thought into making this accessible for complete beginners.",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-ebony py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-maple text-sm tracking-[0.2em] uppercase text-center mb-3">
                    Student Stories
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment text-center mb-4">
                    What Our Students Say
                </h2>
                <p className="text-parchment/55 text-center max-w-xl mx-auto mb-16 leading-relaxed">
                    Real feedback from real students across Nigeria who have gone through
                    the BBMA programme.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-parchment/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-brass/40 transition-colors duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-1">
                                {Array.from({ length: t.rating }).map((_, s) => (
                                    <FaStar key={s} className="text-maple text-sm" />
                                ))}
                            </div>

                            {/* Quote */}
                            <div className="relative">
                                <FaQuoteLeft className="text-maple/20 text-4xl absolute -top-1 -left-1" />
                                <p className="text-parchment/75 text-sm leading-relaxed pl-4">
                                    {t.text}
                                </p>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-parchment/10">
                                <div className="w-9 h-9 rounded-full bg-maple flex items-center justify-center text-ebony text-xs font-bold flex-shrink-0">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-parchment font-medium text-sm">{t.name}</p>
                                    <p className="text-parchment/45 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}