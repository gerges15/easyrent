import { createThemeToggle } from "../components/themeToggle";

export default function Admin() {
  return `
 <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
 <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between shadow-md">
  <!-- Brand -->
  <div>
    <div class="p-6 border-b border-gray-200 dark:border-gray-700 text-center">
      <h1 class="text-2xl font-bold flex items-center justify-center gap-3 text-indigo-600 dark:text-indigo-400">
        <i class="fas fa-building"></i>
        Easy Rent
      </h1>
      <p class="text-xs mt-1 text-gray-500 dark:text-gray-400">Admin Panel</p>
    </div>

    <!-- Navigation -->
    <ul class="mt-6 px-4 space-y-2">
      <li class="nav-item group flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-medium cursor-pointer transition-all" data-target="dashboard">
        <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-300 group-hover:scale-110 transition" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"></path></svg>
        <span class="truncate">Dashboard</span>
      </li>

      <li class="nav-item group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer transition-all" data-target="units">
        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h7"></path></svg>
        <span class="truncate">Units</span>
      </li>

      <li class="nav-item group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer transition-all" data-target="students">
        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
          d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z"></path></svg>
        <span class="truncate">Students</span>
      </li>

      <li class="nav-item group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer transition-all" data-target="bookings">
        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        <span class="truncate">Bookings</span>
      </li>
    </ul>
  </div>

  <!-- Bottom Section -->
  <div class="px-4 py-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
    <!-- Theme Toggle Mount -->
<div
  id="theme-toggle"
  class="flex flex-col items-center gap-3 px-2 py-2 rounded-xl bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-800 shadow-md ring-1 ring-gray-200 dark:ring-gray-600 transition-all duration-300"
>


</div>



    <!-- Logout Button -->
    <button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-100 dark:bg-red-800 text-red-600 dark:text-white hover:bg-red-200 dark:hover:bg-red-700 rounded-lg transition-all font-medium">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
        viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"></path></svg>
      Logout
    </button>
  </div>
</aside>



  <!-- Main Content -->
  <main class="flex-1 p-6 space-y-6 overflow-y-auto">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Dashboard Overview</h1>
      <div class="flex items-center gap-4">
        <div class="relative group">
          <i class="fas fa-bell text-xl cursor-pointer"></i>
          <span class="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1.5">3</span>
        </div>
        <div class="flex items-center gap-2">
          <img src="https://via.placeholder.com/36" class="w-9 h-9 rounded-full" alt="User Profile" />
          <span class="font-medium">Admin</span>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Total Units</h2>
          <i class="fas fa-home text-indigo-500 text-2xl"></i>
        </div>
        <div class="text-3xl font-bold mt-4" id="totalUnitsCount">0</div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2"><i class="fas fa-sync-alt fa-spin mr-1"></i> Loading...</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Pending Approval</h2>
          <i class="fas fa-clock text-yellow-500 text-2xl"></i>
        </div>
        <div class="text-3xl font-bold mt-4" id="pendingUnitsCount">0</div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2"><i class="fas fa-sync-alt fa-spin mr-1"></i> Loading...</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Available Units</h2>
          <i class="fas fa-check-circle text-green-500 text-2xl"></i>
        </div>
        <div class="text-3xl font-bold mt-4" id="availableUnitsCount">0</div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2"><i class="fas fa-sync-alt fa-spin mr-1"></i> Loading...</p>
      </div>
    </div>

    <!-- Recent Bookings -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Recent Bookings</h2>
        <a href="#" class="text-indigo-600 hover:underline">View All</a>
      </div>
      <div class="flex items-center justify-center h-40 text-gray-400 dark:text-gray-500">
        <i class="material-icons text-4xl mr-2">info</i>
        No data available
      </div>
    </div>
    
  </main>
</div>

  `;
}

function isDark() {
  return localStorage.getItem("theme") == "dark";
}
