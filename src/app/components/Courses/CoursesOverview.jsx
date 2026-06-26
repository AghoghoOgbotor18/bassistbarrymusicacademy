import { FaBookOpen, FaVideo, FaEnvelope, FaLock } from "react-icons/fa";

const included = [
    {
        icon: <FaBookOpen className="text-maple text-2xl" />,
        title: "Exclusive Ebook",
        description: "Every tier comes with a professionally written ebook delivered straight to your email after payment — yours to keep forever.",
    },
    {
        icon: <FaVideo className="text-maple text-2xl" />,
        title: "Video Lessons",
        description: "Tier-specific video lessons unlocked on your dashboard. Watch Barry break down every technique in real time.",
    },
    {
        icon: <FaEnvelope className="text-maple text-2xl" />,
        title: "Instant Delivery",
        description: "No waiting. Your ebook is delivered to your inbox the moment your payment is confirmed via Paystack.",
    },
    {
        icon: <FaLock className="text-maple text-2xl" />,
        title: "Lifetime Access",
        description: "Once you enroll, your dashboard materials never expire. Learn at your own pace, revisit content anytime.",
    },
];

export default function CoursesOverview() {
    return (
        <section className="bg-parchment py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase text-center mb-3">
                    What's Included
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-ebony text-center mb-4">
                    Every Course Comes With
                </h2>
                <p className="text-ebony/55 text-center max-w-xl mx-auto mb-16 leading-relaxed">
                    Regardless of which tier you choose, here's what every
                    BBMA student gets access to.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {included.map((item, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl p-7 border border-brass/15 hover:border-maple/40 hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl bg-ebony flex items-center justify-center group-hover:bg-rosewood transition-colors duration-300">
                                {item.icon}
                            </div>
                            <h3 className="font-display text-lg font-bold text-ebony">
                                {item.title}
                            </h3>
                            <p className="text-ebony/55 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}