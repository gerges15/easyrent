import { searchIcon } from "../../utils/icons";

export default function HeroSection() {
  return `
<!-- Hero Section -->
<section id="home" class="relative flex flex-col justify-center w-full text-white h-[600px] sm:h-[700px] lg:h-[750px] overflow-hidden">

  <!-- Background Image -->
  <img
    src="./../../../public/images/home.webp"
    alt="Modern apartment background"
    class="absolute inset-0 w-full h-full object-cover z-0"
    loading="lazy"
  />

  <!-- Overlay -->
  <div class="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-10"></div>

  <!-- Content -->
  <div class="relative z-20 max-w-6xl mx-auto px-6 text-center animate-fade-in">
    <p class="uppercase tracking-widest text-sm text-white/70 dark:text-indigo-200 mb-3">Your rental journey begins</p>
    
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white dark:text-white drop-shadow">
      Find the <span class="text-indigo-300 dark:text-indigo-200">Perfect Place</span><br class="hidden sm:block"/> For Your Stay
    </h1>

    <!-- Search Bar -->
    <div class="flex justify-center mb-6">
      <div class="flex w-full max-w-lg bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <input
          type="search"
          placeholder="Search by city, property, or area..."
          class="flex-grow px-5 py-3 text-gray-800 dark:text-white dark:bg-gray-800 placeholder:text-gray-400 focus:outline-none"
          aria-label="Search properties"
        />
        <button
          aria-label="Search"
          class="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white px-5 flex items-center justify-center"
        >
          ${searchIcon}
        </button>
      </div>
    </div>

    <button class="bg-white dark:bg-gray-100 text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-200 transition duration-300">
      Browse Units
    </button>
  </div>
</section>
  `;
}
