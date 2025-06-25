import HeroSection from "./components/Sections/Hero";
import Booking from "./components/Sections/Booking";
export default function Home() {
  return `
    <main id="home" class="mt-6">
    
    ${HeroSection()} 
    ${Booking()}
    </main>
  `;
}
