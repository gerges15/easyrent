import { createThemeToggle } from "../components/themeToggle";

import { getAllUnits } from "../services/lib/unit";
export default function Admin() {
  return `
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
    <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between shadow-md">
      <div>
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 text-center">
          <h1 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex justify-center items-center gap-2">
            <i class="fas fa-building"></i>
            Easy Rent
          </h1>
          <p class="text-xs mt-1 text-gray-500 dark:text-gray-400">Admin Panel</p>
        </div>

        <ul class="mt-6 space-y-2 px-4">
          <li class="nav-item group flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-medium cursor-pointer transition-all" data-target="dashboard">
            <i class="fas fa-chart-pie text-indigo-600 dark:text-indigo-300"></i>
            <span class="truncate">Dashboard</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer transition-all" data-target="units">
            <i class="fas fa-layer-group"></i>
            <span class="truncate">Units</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer transition-all" data-target="students">
            <i class="fas fa-user-graduate"></i>
            <span class="truncate">Students</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer transition-all" data-target="bookings">
            <i class="fas fa-calendar-check"></i>
            <span class="truncate">Bookings</span>
          </li>
        </ul>
      </div>

      <div class="px-4 py-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
        <div id="theme-toggle" class="flex flex-col items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-600 shadow-md"></div>

        <button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-100 dark:bg-red-800 text-red-600 dark:text-white hover:bg-red-200 dark:hover:bg-red-700 rounded-lg transition-all font-medium">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 p-6 space-y-6 overflow-y-auto">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Dashboard Overview</h1>
        <div class="flex items-center gap-4">
          <div class="relative group">
            <i class="fas fa-bell text-xl cursor-pointer"></i>
            <span class="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1.5">3</span>
          </div>

          <div class="relative">
            <button id="profileMenuBtn" class="flex items-center gap-2 focus:outline-none">
              <img src="https://via.placeholder.com/36" class="w-9 h-9 rounded-full border-2 border-indigo-600 dark:border-indigo-400" alt="User Profile" />
              <span class="font-medium">Admin</span>
            </button>
            <div id="profileDropdown" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 ring-1 ring-gray-200 dark:ring-gray-600 hidden z-50">
              <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <span class="text-sm text-gray-700 dark:text-gray-300">Settings</span>
              </div>
              <div id="theme-toggle" class="px-4 py-2"></div>
              <button class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">Total Units</h2>
            <i class="fas fa-home text-indigo-500 text-2xl"></i>
          </div>
          <div class="text-3xl font-bold mt-4" id="totalUnitsCount">0</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2"><i class="fas fa-sync-alt fa-spin mr-1"></i> Loading...</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">Pending Approval</h2>
            <i class="fas fa-clock text-yellow-500 text-2xl"></i>
          </div>
          <div class="text-3xl font-bold mt-4" id="pendingUnitsCount">0</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2"><i class="fas fa-sync-alt fa-spin mr-1"></i> Loading...</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">Available Units</h2>
            <i class="fas fa-check-circle text-green-500 text-2xl"></i>
          </div>
          <div class="text-3xl font-bold mt-4" id="availableUnitsCount">0</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2"><i class="fas fa-sync-alt fa-spin mr-1"></i> Loading...</p>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Recent Bookings</h2>
          <a href="#" class="text-indigo-600 hover:underline">View All</a>
        </div>
        <div class="flex items-center justify-center h-40 text-gray-400 dark:text-gray-500">
          <i class="fas fa-info-circle text-2xl mr-2"></i>
          No data available
        </div>
      </div>

      <div id="admin-units-section" class="space-y-4 hidden">
  <!-- Units will be rendered here -->
</div>
    </main>
  </div>
  `;
}

export async function initAdminDashboard() {
  // Mount theme toggles
  const sidebarToggleMount = document.querySelectorAll("#theme-toggle")[0];
  if (sidebarToggleMount) sidebarToggleMount.appendChild(createThemeToggle());

  const dropdownToggleMount = document.querySelectorAll("#theme-toggle")[1];
  if (dropdownToggleMount) dropdownToggleMount.appendChild(createThemeToggle());

  // Fetch dashboard data
  //const allUnits = getAllUnits();
  //const data = allUnits.data["$values"];
  console.log("hello I'm Inside this ");
  fetch("/api/units")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("totalUnitsCount").textContent = data.total || 20;
      document.getElementById("pendingUnitsCount").textContent =
        data.pending || 5;
      document.getElementById("availableUnitsCount").textContent =
        data.available || 15;
      document
        .querySelectorAll(".fa-sync-alt")
        .forEach((el) => el.classList.add("hidden"));
    })
    .catch((err) => {
      console.error("Failed to fetch unit data:", err);
    });

  // Profile dropdown toggle
  document.addEventListener("click", (e) => {
    const profileBtn = document.querySelector("#profileMenuBtn");
    const dropdown = document.querySelector("#profileDropdown");
    if (profileBtn && dropdown) {
      if (profileBtn.contains(e.target)) {
        dropdown.classList.toggle("hidden");
      } else if (!dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    }
  });

  // Handle navigation between admin tabs
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", async () => {
      navItems.forEach((el) =>
        el.classList.remove(
          "bg-indigo-100",
          "dark:bg-indigo-900",
          "text-indigo-700",
          "dark:text-indigo-300"
        )
      );
      item.classList.add(
        "bg-indigo-100",
        "dark:bg-indigo-900",
        "text-indigo-700",
        "dark:text-indigo-300"
      );

      const target = item.getAttribute("data-target");

      // 🔽 PUT YOUR API CALL HERE
      console.log(`Switched to ${target} tab.`);
      console.log(`target === "units"`);
      if (target === "units") {
        const section = document.getElementById("admin-units-section");
        section?.classList.remove("hidden");

        try {
          const allUnits = await getAllUnits();
          const data = allUnits.data["$values"];

          renderAdminUnits(data);
        } catch (err) {
          console.error("Failed to fetch units:", err);
        }
      } else {
        // hide units section
        document.getElementById("admin-units-section")?.classList.add("hidden");
      }
    });
  });
}
