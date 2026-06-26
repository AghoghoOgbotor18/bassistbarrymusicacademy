import AboutHero from "../components/about/AboutHero";
import BarryStory from "../components/about/BarryStory";
import BarryCredentials from "../components/about/BarryCredentials";
import BarryMission from "../components/about/BarryMission";
import AboutCTA from "../components/about/AboutCTA";

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