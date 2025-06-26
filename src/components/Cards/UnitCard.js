export function createUnitCard(data) {
  return data
    .filter((unit) => unit.status === "Approved")
    .map((unit) => {
      const imageUrl =
        `https://easyrentapi0.runasp.net/${unit.photoUrls.$values[0]}` ||
        "images/default.jpg";
      const price = unit.priceForMonth.toLocaleString(); // e.g., 7,600
      const address = unit.address || "No address available";

      return `
        <div
          onclick="window.location.href='room2.html?id=${unit.id}'"
          class="group cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div class="relative">
            <img 
              src="${imageUrl}" 
              alt="${unit.title}" 
              class="w-full h-56 object-cover group-hover:scale-105 transition duration-300 ease-in-out"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span class="text-white bg-indigo-600 px-4 py-2 rounded-md text-sm">View Details</span>
            </div>
          </div>
          <div class="p-4 flex flex-col justify-between space-y-4">
            <div>
              <h4 class="text-lg font-semibold text-gray-800 dark:text-white">${unit.title}</h4>
              <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                <span><i class="ri-map-pin-line align-middle"></i> ${address}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Listed by <strong>${unit.ownerName}</strong></p>
            </div>
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400">EGP ${price}<span class="text-sm font-medium">/month</span></h3>
              <button
                onclick="event.stopPropagation(); window.location.href='./student/payment.html?id=${unit.id}';"
                class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md shadow-md transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join(""); // Combine all cards into a single HTML string
}
