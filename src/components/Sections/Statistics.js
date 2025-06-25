export default function Statistics() {
  return `
  
     <section class="py-16 bg-white dark:bg-gray-900">
        <div class="max-w-6xl mx-auto px-4">
          <ul class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            
            <li class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
              <span class="text-3xl text-indigo-600 dark:text-indigo-400">
                <i class="ri-file-text-line"></i>
              </span>
              <h4 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">250</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">Units are available</p>
            </li>
            
            <li class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
              <span class="text-3xl text-indigo-600 dark:text-indigo-400">
                <i class="ri-user-line"></i>
              </span>
              <h4 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">600</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">Active locations around Minya</p>
            </li>
            
            <li class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
              <span class="text-3xl text-indigo-600 dark:text-indigo-400">
                <i class="ri-function-line"></i>
              </span>
              <h4 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">2K</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">Categories served</p>
            </li>
            
            <li class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
              <span class="text-3xl text-indigo-600 dark:text-indigo-400">
                <i class="ri-lightbulb-flash-line"></i>
              </span>
              <h4 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">100</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">New clients each month</p>
            </li>
      
          </ul>
        </div>
      </section>
  `;
}
