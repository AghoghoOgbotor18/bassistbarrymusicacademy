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