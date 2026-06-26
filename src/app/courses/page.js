import CoursesHero from "../components/Courses/CoursesHero";
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