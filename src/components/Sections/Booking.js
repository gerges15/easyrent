export default function Booking() {
  return `
<!-- Booking Section -->
<section class="py-20 bg-gray-50 dark:bg-gray-900">
  <div class="max-w-4xl mx-auto px-6">
    <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
      Check Property Availability
    </h2>
    
    <form class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      
      <!-- Arrival Date -->
      <div class="flex flex-col gap-2">
        <label for="arrival" class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <i class="ri-calendar-line text-lg text-indigo-500"></i> Arrival Date
        </label>
        <input
          id="arrival"
          type="date"
          class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Departure Date -->
      <div class="flex flex-col gap-2">
        <label for="departure" class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <i class="ri-calendar-check-line text-lg text-indigo-500"></i> Departure Date
        </label>
        <input
          id="departure"
          type="date"
          class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Guests -->
      <div class="flex flex-col gap-2">
        <label for="guests" class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <i class="ri-user-line text-lg text-indigo-500"></i> Guests
        </label>
        <input
          id="guests"
          type="number"
          min="1"
          placeholder="Number of guests"
          class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Submit Button -->
      <div class="sm:col-span-2 md:col-span-3">
        <button
          class="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-800 transition"
        >
          <i class="ri-search-line align-middle mr-2"></i>
          Check Availability
        </button>
      </div>
    </form>
  </div>
</section>
`;
}
