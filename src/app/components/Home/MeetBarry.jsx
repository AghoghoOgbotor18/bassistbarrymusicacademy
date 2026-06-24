import Image from "next/image";
import Link from "next/link";
import { FaMusic, FaChalkboardTeacher, FaGuitar, FaArrowRight } from "react-icons/fa";

const stats = [
    {
        icon: <FaGuitar className="text-maple text-xl" />,
        value: "10+",
        label: "Years Playing Bass",
    },
    {
        icon: <FaMusic className="text-maple text-xl" />,
        value: "50+",
        label: "Gospel Artists Worked With",
    },
    {
        icon: <FaChalkboardTeacher className="text-maple text-xl" />,
        value: "2+",
        label: "Years Teaching",
    },
];

export default function MeetBarry() {
    return (
        <section className="bg-parchment py-20 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Section label */}
                <p className="font-mono text-brass text-sm tracking-[0.2em] uppercase text-center mb-3">
                    The Man Behind The Bass
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-ebony text-center mb-16">
                    Meet Your Instructor
                </h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Image side */}
                    <div className="relative">
                        {/* Decorative brass border offset behind image */}
                        <div className="absolute w-full h-full border-2 border-brass/40 rounded-2xl" />
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                            <Image
                                src="/images/hero1.jpg"
                                alt="Bassist Barry — your instructor"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* subtle gradient at bottom of image */}
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ebony/60 to-transparent" />
                        </div>

                        {/* Floating experience badge */}
                        <div className="absolute -bottom-5 -right-3 md:-right-4 bg-ebony text-parchment px-5 py-3 rounded-xl shadow-lg border border-brass/30">
                            <p className="font-display text-2xl font-bold text-maple">10+</p>
                            <p className="text-xs text-parchment/70">Years of Experience</p>
                        </div>
                    </div>

                    {/* Text side */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-display text-3xl font-bold text-ebony">
                            Barry Barridoge
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
                                Whether it's holding down a groove or navigating complex chord 
                                progressions, Barry makes it look effortless.
                            </p>
                            <p>
                                For the past two years, Barry has channelled that experience into 
                                teaching — breaking down the bass into clear, structured lessons 
                                that meet students exactly where they are, from complete beginners 
                                to those ready to go professional.
                            </p>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-brass/20">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-1">
                                    {stat.icon}
                                    <p className="font-display text-2xl font-bold text-ebony">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-ebony/60 leading-tight">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/about"
                                className="bg-ebony text-parchment font-medium flex items-center gap-1.5 px-6 py-3 rounded-lg hover:bg-rosewood transition"
                            >
                                Full Story <FaArrowRight />
                            </Link>
                            <Link
                                href="/courses"
                                className="text-maple font-medium hover:underline"
                            >
                                View Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}