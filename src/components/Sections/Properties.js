export default function Properties() {
  return `
  
  
   <section id="Properties" class="py-16 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4">
          
          <!-- Section Header -->
          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-gray-800 dark:text-white">Explore Property</h2>
          </div>
      
          <!-- Filters -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <!-- Location -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <select class="w-full p-2 rounded-md bg-white dark:bg-gray-700 border dark:border-gray-600">
                <option>All Locations</option>
                <option>Minya Taha_Hessen</option>
                <option>Adnan St</option>
                <option>Alhseny St</option>
                <option>New Minya City</option>
                <option>Abo-Helal St</option>
                <option>Shalby Square</option>
                <option>ElAmery</option>
              </select>
            </div>
      
            <!-- Price -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
              <select class="w-full p-2 rounded-md bg-white dark:bg-gray-700 border dark:border-gray-600">
                <option>Any Price</option>
                <option>€2000 - €3000</option>
                <option>€10000 - €13000</option>
                <option>€13000+</option>
              </select>
            </div>
      
            <!-- Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Property Type</label>
              <select class="w-full p-2 rounded-md bg-white dark:bg-gray-700 border dark:border-gray-600">
                <option>All Types</option>
                <option>Single</option>
                <option>Double</option>
                <option>Triple</option>
              </select>
            </div>
      
            <!-- Search Button -->
            <div class="flex items-end">
              <button class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                <i class="ri-search-line mr-1"></i> Search
              </button>
            </div>
          </div>
      
          <!-- Properties Grid -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Property Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <div class="h-48 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80');"></div>
              <div class="p-5">
                <h3 class="font-semibold text-lg text-gray-800 dark:text-white mb-1">Unit no. 411 Admiral Elite</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                  <i class="ri-map-pin-line"></i> Adnan, Minya, Egypt
                </p>
                <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <span><i class="ri-hotel-bed-line mr-1"></i>1 Bed</span>
                  <span><i class="ri-ruler-line mr-1"></i>899 ft²</span>
                </div>
                <div class="text-indigo-600 font-bold text-lg">€2,850</div>
              </div>
            </div>
      
            <!-- Property Card 2 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <div class="h-48 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80');"></div>
              <div class="p-5">
                <h3 class="font-semibold text-lg text-gray-800 dark:text-white mb-1">Unit no. 410 Admiral Elite</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                  <i class="ri-map-pin-line"></i> New Minya City, Egypt
                </p>
                <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <span><i class="ri-hotel-bed-line mr-1"></i>2 Bed</span>
                  <span><i class="ri-ruler-line mr-1"></i>1237 ft²</span>
                </div>
                <div class="text-indigo-600 font-bold text-lg">€9,000</div>
              </div>
            </div>
      
            <!-- Property Card 3 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <div class="h-48 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80');"></div>
              <div class="p-5">
                <h3 class="font-semibold text-lg text-gray-800 dark:text-white mb-1">Unit no. 409 Admiral Elite</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                  <i class="ri-map-pin-line"></i> Palace Square, Minya
                </p>
                <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <span><i class="ri-hotel-bed-line mr-1"></i>1 Bed</span>
                  <span><i class="ri-ruler-line mr-1"></i>473 ft²</span>
                </div>
                <div class="text-indigo-600 font-bold text-lg">€900</div>
              </div>
            </div>
          </div>
      
        </div>
      </section>
  `;
}
