import HeroSection from "./components/Sections/Hero";
import Booking from "./components/Sections/Booking";
import About from "./components/Sections/About";
import Units from "./components/Sections/Units";
import CoreFeatures from "./components/Sections/CoreFeatures";
import Intro from "./components/Sections/Intro";
import Statistics from "./components/Sections/Statistics";
import Properties from "./components/Sections/Properties";
import Contact from "./components/Sections/Contact";
import Footer from "./components/Footer";
export default function Home() {
  return `
    <main id="home" class="mt-6">
    ${HeroSection()} 
    ${Booking()}
    ${About()}
    ${Units()}
    ${Intro()}
    ${CoreFeatures()}
    ${Statistics()}
    ${Properties()}
    ${Contact()}
    ${Footer()}
    </main>
  `;
}
