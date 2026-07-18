import CoursesPreview from "./components/Home/CoursesPreview";
import FinalCTA from "./components/Home/FinalCTA";
import HeroSection from "./components/Home/HeroSection";
import IntroVideo from "./components/Home/IntroVideo";
import MeetBarry from "./components/Home/MeetBarry";
import Testimonials from "./components/Home/Testimonials";
import WhyChooseBBMA from "./components/Home/WhyChooseBBMA";

export default function Home(){
  return(
    <main>
      <HeroSection />
      <MeetBarry />
      <IntroVideo />
      <CoursesPreview />
      <WhyChooseBBMA />
      <Testimonials />
      <FinalCTA />
    </main>
    
  )
}