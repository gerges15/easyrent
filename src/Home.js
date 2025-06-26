import { UnitsSectionSkeleton } from "./components/Sections/Units";
import HeroSection from "./components/Sections/Hero";
import Booking from "./components/Sections/Booking";
import About from "./components/Sections/About";
import CoreFeatures from "./components/Sections/CoreFeatures";
import Intro from "./components/Sections/Intro";
import Statistics from "./components/Sections/Statistics";
import Contact from "./components/Sections/Contact";

export default function Home() {
  return `
    <main id="home" class="mt-6">
    ${HeroSection()} 
    ${Booking()}
    ${About()}
    ${UnitsSectionSkeleton()}
    ${Intro()}
    ${CoreFeatures()}
    ${Statistics()}
    ${Contact()}
    </main>
  `;
}
