import Image from "next/image";

export default function AboutHero() {
    return (
        <section className="relative bg-ebony min-h-[70vh] flex items-end overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/hero1.jpg"
                    alt="Bassist Barry"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                {/* Multi-layer overlay for depth */}
                <div className="absolute inset-0 bg-linear-to-r from-ebony/95 via-ebony/70 to-ebony/30" />
                <div className="absolute inset-0 bg-linear-to-t from-ebony via-transparent to-ebony/40" />
            </div>

            {/* Decorative vertical brass line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-maple to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20 pt-32">
                <p className="font-mono text-maple text-sm tracking-[0.25em] uppercase mb-4">
                    The Story Behind The Sound
                </p>
                <h1 className="font-display text-5xl md:text-7xl font-bold text-parchment leading-tight mb-6 max-w-2xl">
                    More Than a{" "}
                    <span className="text-maple">Bassist.</span>
                    <br />A Teacher.
                </h1>
                <p className="text-parchment/65 text-lg max-w-xl leading-relaxed">
                    Ten years of stages, studios, and gospel services — distilled
                    into a learning experience built for every aspiring bassist in Nigeria.
                </p>

                {/*board divider */}
                <div className="flex items-center gap-0 mt-12 max-w-xs">
                    <div className="flex-1 h-px bg-brass/40" />
                    {[0,1,2].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-brass/60 mx-4" />
                    ))}
                    <div className="flex-1 h-px bg-brass/40" />
                </div>
            </div>
        </section>
    );

}


/*import CoursesHero from "../components/Courses/CoursesHero";
import CoursesOverview from "../components/Courses/CoursesOverview";
import CoursesTiers from "../components/Courses/CoursesTiers";
import CoursesProcess from "../components/Courses/CoursesProcess";
import CoursesFAQ from "../components/Courses/CoursesFAQ";
import CoursesCTA from "../components/Courses/CoursesCTA";

export const metadata = {
    title: "Courses | Bassist Barry Music Academy",
    description: "Choose your bass learning path — Beginner, Intermediate, or Advanced. Structured courses with ebooks and video lessons.",
};

export default function CoursesPage() {
    return (
        <>
            <CoursesHero />
            <CoursesOverview />
            <CoursesTiers />
            <CoursesProcess />
            <CoursesFAQ />
            <CoursesCTA />
        </>
    );
} 
 
import AboutHero from "../components/About/AboutHero";
import BarryStory from "../components/About/BarryStory";
import BarryCredentials from "../components/About/BarryCredentials";
import BarryMission from "../components/About/BarryMission";
import AboutCTA from "../components/About/AboutCTA";

export const metadata = {
    title: "About Barry | Bassist Barry Music Academy",
    description: "Meet Bassist Barry — professional bassist, gospel musician, and your instructor at BBMA.",
};

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <BarryStory />
            <BarryCredentials />
            <BarryMission />
            <AboutCTA />
        </>
    );
}
*/