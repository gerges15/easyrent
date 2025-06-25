export default function CoreFeatures() {
  return `
 
      <section id="feature" class="py-20 bg-gray-100 dark:bg-gray-900">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <p class="text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-300 mb-2">Facilities</p>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-10">Core Features</h2>
      
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Feature Card -->
            <div onclick="location.href='feature1.html'" class="cursor-pointer group p-6 rounded-lg shadow hover:shadow-xl bg-white dark:bg-gray-800 transition">
              <span class="text-indigo-600 dark:text-indigo-400 text-3xl mb-4 inline-block">
                <i class="ri-thumb-up-line"></i>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600">High Ratings</h4>
              <p class="text-gray-600 dark:text-gray-300 mt-2">Curated rooms that consistently receive high ratings and positive reviews.</p>
            </div>
      
            <div onclick="location.href='feature2.html'" class="cursor-pointer group p-6 rounded-lg shadow hover:shadow-xl bg-white dark:bg-gray-800 transition">
              <span class="text-indigo-600 dark:text-indigo-400 text-3xl mb-4 inline-block">
                <i class="ri-time-line"></i>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600">Quiet Hours</h4>
              <p class="text-gray-600 dark:text-gray-300 mt-2">Peace and uninterrupted time are essential for a fulfilling stay.</p>
            </div>
      
            <div onclick="location.href='feature3.html'" class="cursor-pointer group p-6 rounded-lg shadow hover:shadow-xl bg-white dark:bg-gray-800 transition">
              <span class="text-indigo-600 dark:text-indigo-400 text-3xl mb-4 inline-block">
                <i class="ri-map-pin-line"></i>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600">Prime Location</h4>
              <p class="text-gray-600 dark:text-gray-300 mt-2">Stay in top-tier, highly sought-after locations around the city.</p>
            </div>
      
            <div onclick="location.href='feature4.html'" class="cursor-pointer group p-6 rounded-lg shadow hover:shadow-xl bg-white dark:bg-gray-800 transition">
              <span class="text-indigo-600 dark:text-indigo-400 text-3xl mb-4 inline-block">
                <i class="ri-close-circle-line"></i>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600">Free Cancellation</h4>
              <p class="text-gray-600 dark:text-gray-300 mt-2">Plans change—cancel freely without extra charges.</p>
            </div>
      
            <div onclick="location.href='feature5.html'" class="cursor-pointer group p-6 rounded-lg shadow hover:shadow-xl bg-white dark:bg-gray-800 transition">
              <span class="text-indigo-600 dark:text-indigo-400 text-3xl mb-4 inline-block">
                <i class="ri-wallet-line"></i>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600">Payment Options</h4>
              <p class="text-gray-600 dark:text-gray-300 mt-2">Choose from multiple convenient payment methods.</p>
            </div>
      
            <div onclick="location.href='feature6.html'" class="cursor-pointer group p-6 rounded-lg shadow hover:shadow-xl bg-white dark:bg-gray-800 transition">
              <span class="text-indigo-600 dark:text-indigo-400 text-3xl mb-4 inline-block">
                <i class="ri-coupon-line"></i>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600">Advanced Search</h4>
              <p class="text-gray-600 dark:text-gray-300 mt-2">Refine your results using filters like location or keywords.</p>
            </div>
          </div>
        </div>
      </section>
    `;
}
