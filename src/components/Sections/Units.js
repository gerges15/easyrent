export default function Units()
{
  return `
  
     <section id="units" class="py-16 bg-white dark:bg-gray-900">
        <div class="max-w-6xl mx-auto px-4">
          <p class="text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-300 text-center mb-2">Units</p>
          <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">Hand Picked Units</h2>
      
          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Room Card Template -->
            <div
              onclick="window.location.href='room2.html'"
              class="group cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <!-- Image -->
              <div class="relative">
                <img
                  src="images/1,hrud.jpg"
                  alt="Modern single bedroom"
                  class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <!-- Overlay -->
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span class="text-white bg-indigo-600 px-4 py-2 rounded-md text-sm">View Details</span>
                </div>
              </div>
      
              <!-- Details -->
              <div class="p-4 flex flex-col justify-between space-y-4">
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 dark:text-white">Single Room</h4>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-4 mt-1">
                    <span><i class="ri-user-line align-middle"></i> 1 Guest</span>
                    <span><i class="ri-ruler-line align-middle"></i> 25 ft²</span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Well-appointed rooms with modern amenities and relaxing decor
                  </p>
                </div>
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400">€15,000<span class="text-sm font-medium">/year</span></h3>
                  <button
                    onclick="event.stopPropagation(); window.location.href='./student/payment.html';"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md shadow-md transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
      
            <!-- 🔁 Repeat the card for other rooms, updating content -->
            <div
              onclick="window.location.href='room2.html'"
              class="group cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div class="relative">
                <img src="images/K2S115.webp" alt="Luxury double bedroom" class="w-full h-56 object-cover group-hover:scale-105 transition" loading="lazy" />
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span class="text-white bg-indigo-600 px-4 py-2 rounded-md text-sm">View Details</span>
                </div>
              </div>
              <div class="p-4 flex flex-col justify-between space-y-4">
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 dark:text-white">Double Room</h4>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-4 mt-1">
                    <span><i class="ri-user-line align-middle"></i> 2 Guests</span>
                    <span><i class="ri-ruler-line align-middle"></i> 35 ft²</span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Spacious room with premium amenities</p>
                </div>
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400">€7,500<span class="text-sm font-medium">/day</span></h3>
                  <button
                    onclick="event.stopPropagation(); window.location.href='./student/payment.html';"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md shadow-md transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
      
            <!-- Triple Room -->
            <div
              onclick="window.location.href='room2.html'"
              class="group cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div class="relative">
                <img src="images/SZC08-2.webp" alt="Comfortable triple bedroom" class="w-full h-56 object-cover group-hover:scale-105 transition" loading="lazy" />
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span class="text-white bg-indigo-600 px-4 py-2 rounded-md text-sm">View Details</span>
                </div>
              </div>
              <div class="p-4 flex flex-col justify-between space-y-4">
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 dark:text-white">Triple Room</h4>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-4 mt-1">
                    <span><i class="ri-user-line align-middle"></i> 3 Guests</span>
                    <span><i class="ri-ruler-line align-middle"></i> 45 m²</span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Perfect for small groups with three single beds</p>
                </div>
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400">€5,000<span class="text-sm font-medium">/year</span></h3>
                  <button
                    onclick="event.stopPropagation(); window.location.href='./student/payment.html';"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md shadow-md transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
      
          </div>
        </div>
      </section>
      
  `;
}