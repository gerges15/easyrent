export default function Admin() {
  return `
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <aside class="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between shadow-lg transition-all duration-300 lg:sticky lg:top-0 lg:w-64 lg:h-screen fixed h-screen z-20 transform lg:transform-none -translate-x-full lg:translate-x-0 overflow-y-auto" id="sidebar">
      <div>
        <div class="p-6 border-b border-gray-200 dark:border-gray-800 text-center">
          <h1 class="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 flex justify-center items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4" />
            </svg>
            Easy Rent
          </h1>
          <p class="text-xs mt-2 text-gray-500 dark:text-gray-400">Admin Panel</p>
        </div>

        <ul class="mt-6 space-y-1 px-4">
          <li class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-100 text-indigo-700 dark:text-indigo-200 font-semibold cursor-pointer transition-all hover:bg-indigo-200 dark:hover:bg-indigo-700" data-target="dashboard">
            <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V15h5.488" />
            </svg>
            <span class="truncate">Dashboard</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold cursor-pointer transition-all" data-target="units">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span class="truncate">Units</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold cursor-pointer transition-all" data-target="students">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span class="truncate">Students</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold cursor-pointer transition-all" data-target="bookings">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="truncate">Bookings</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold cursor-pointer transition-all" data-target="feedback">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span class="truncate">Feedback</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold cursor-pointer transition-all" data-target="universities">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span class="truncate">Universities</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold cursor-pointer transition-all" data-target="colleges">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span class="truncate">Colleges</span>
          </li>
          <li class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold cursor-pointer transition-all" data-target="admins">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="truncate">Admins</span>
          </li>
        </ul>
      </div>

      <div class="px-4 py-6 space-y-4 border-t border-gray-200 dark:border-gray-800">
        <div id="theme-toggle" class="flex items-center justify-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 shadow-sm hover:ring-indigo-300 dark:hover:ring-indigo-600 transition-all">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Toggle Theme</span>
        </div>

        <button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 rounded-xl transition-all font-semibold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8 space-y-8 overflow-y-auto lg:ml-0">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <button id="sidebar-toggle" class="lg:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative w-full max-w-md">
            <input type="text" id="search-bar" placeholder="Search units, students, bookings..." class="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
            <svg class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div class="relative group">
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-2 py-0.5 font-medium">3</span>
          </div>
          <div class="relative">
            <button id="profileMenuBtn" class="flex items-center gap-3 focus:outline-none">
              <img src="https://via.placeholder.com/40" class="w-10 h-10 rounded-full border-2 border-indigo-600 dark:border-indigo-400" alt="User Profile" />
              <span class="font-semibold text-gray-700 dark:text-gray-300">Admin</span>
            </button>
            <div id="profileDropdown" class="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 shadow-xl rounded-xl py-2 ring-1 ring-gray-200 dark:ring-gray-800 hidden z-50">
              <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</span>
              </div>
              <button class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-xl">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Total Units</h2>
            <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4" />
            </svg>
          </div>
          <div class="text-4xl font-extrabold mt-4 text-indigo-600 dark:text-indigo-400" id="totalUnitsCount">0</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2"><svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>Loading...</p>
        </div>
        <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Pending Approval</h2>
            <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="text-4xl font-extrabold mt-4 text-yellow-600 dark:text-yellow-400" id="pendingUnitsCount">0</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2"><svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>Loading...</p>
        </div>
        <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Available Units</h2>
            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="text-4xl font-extrabold mt-4 text-green-600 dark:text-green-400" id="availableUnitsCount">0</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2"><svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>Loading...</p>
        </div>
      </div>

      <div id="recent-feedback-section" class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
  
        <div class="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400" id="recent-feedback-content">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          No feedback available
        </div>
      </div>

      <div id="admin-units-section" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Units, Students, Bookings, Feedback, Universities, Colleges, Admins will be rendered here -->
      </div>
    </main>
  </div>
  `;
}
