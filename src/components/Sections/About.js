export default function About() {
  return `
  <section id="about-us" class="py-20 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-6">
          <!-- Grid Section -->
          <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
            <!-- Card 1: Strong Team -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center flex flex-col items-center gap-4">
              <div class="text-indigo-500 text-4xl">
                <i class="ri-team-line"></i>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Strong Team</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Unlocking Hospitality Excellence And Ensures Your Perfect Stay
              </p>
            </div>
      
            <!-- Image 1 -->
            <div class="overflow-hidden rounded-lg shadow-md">
              <img src="./images/table-4222263_1280.jpg" alt="Luxury apartment interior" loading="lazy" class="w-full h-full object-cover" />
            </div>
      
            <!-- Card 2: Luxury Room -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center flex flex-col items-center gap-4">
              <div class="text-indigo-500 text-4xl">
                <i class="ri-hotel-bed-line"></i>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Luxury Room</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Experience Unrivaled Luxury at our Exquisite Rooms
              </p>
            </div>
      
            <!-- Image 2 -->
            <div class="overflow-hidden rounded-lg shadow-md">
              <img src="images/brick-wall.jpg" alt="Underground hotel architecture" loading="lazy" class="w-full h-full object-cover" />
            </div>
          </div>
      
          <!-- Text Content -->
          <div class="text-center max-w-3xl mx-auto">
            <p class="text-sm font-medium text-indigo-500 uppercase tracking-wide mb-2">About Us</p>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Discover Our Dorms</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-6">
              Welcome to our realm of extraordinary accommodation where Comfort, Affordability and Availability
              offer an unparalleled escape from the ordinary, helping you to find your most suitable Stay.
            </p>
            <button
              onclick="window.location.href='./student/payment.html'"
              class="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition font-semibold"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
  
  
  `;
}
