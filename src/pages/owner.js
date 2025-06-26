import dashboardView from "../components/views/dashboardView.js";
import addPropertyView from "../components/views/addPropertyView.js";
import myPropertiesView from "../components/views/myPropertiesView.js";

// ownerDashboard.js
import "../output.css";

import { createThemeToggle } from "../components/themeToggle.js";

export default function OwnerDashboard() {
  return `
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <!-- Sidebar -->
      <aside class="sidebar w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between shadow-md">
        <div>
          <div class="p-6 border-b border-gray-200 dark:border-gray-700 text-center">
            <h1 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex justify-center items-center gap-2">
              <i class="fas fa-building"></i> Easy Rent
            </h1>
            <p class="text-xs mt-1 text-gray-500 dark:text-gray-400">Owner Panel</p>
          </div>

          <ul class="mt-6 space-y-2 px-4">
             <li class="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
              <i class="fas fa-chart-line"></i> <span>Dashboard</span>
            </li>
            <li class="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
              <i class="fas fa-plus"></i> <span>Add Property</span>
            </li>
            <li class="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
              <i class="fas fa-building"></i> <span>My Properties</span>
            </li>
            <li class="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
              <i class="fas fa-envelope"></i> <span>Inbox</span>
            </li>
            <li class="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
              <i class="fas fa-user"></i> <span>Profile Settings</span>
            </li>
          </ul>
        </div>

        <div class="px-4 py-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
          <div id="theme-toggle" class="flex flex-col items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-600 shadow-md"></div>

          <button  id="logout-btn"  class="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-100 dark:bg-red-800 text-red-600 dark:text-white hover:bg-red-200 dark:hover:bg-red-700 rounded-lg transition-all font-medium">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      <!-- Main View Area -->
      <main id="main-content" class="flex-1 p-6 space-y-6 overflow-y-auto">
        <!-- View content will be injected here dynamically -->
      </main>
    </div>
  `;
}
