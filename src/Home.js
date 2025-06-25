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
import CookiesModal from "./components/Modals/CookiesModal";
import ScrollTopBtn from "./components/Buttons/ScrollTopBtn";
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
    ${CookiesModal()}
    ${ScrollTopBtn()}
    </main>
  `;
}
