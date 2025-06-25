import {
  homeIcon,
  infoIcon,
  unitsIcon,
  propertiesIcon,
  loginIcon,
  signupIcon,
  contactIcon,
  addPropertyIcon,
  logoutIcon,
  menuIcon,
} from "../utils/icons";

export default function Navbar() {
  return `
  <header class="bg-white dark:bg-gray-900 shadow-md w-full">
    <nav class="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
      <!-- Logo + Menu -->
      <div class="flex items-center gap-4">

      <a
      href="#"
      class="flex items-center gap-3 z-10 m-1.5 hover:opacity-90 transition-opacity"
      aria-label="EasyRent Home"
    >
      <img
        src="/icon.png"
        width="48"
        height="48"
        alt="EasyRent Logo"
        class="rounded-full"
      />
      <span class="text-xl font-bold text-primary-700 dark:text-primary-200">
        EasyRent
      </span>
    </a>
    

        <!-- Mobile Menu Button -->
        <button id="menu-btn" class="md:hidden text-gray-700 dark:text-gray-300">
          ${menuIcon}
        </button>
      </div>

      <!-- Navigation Links -->
      <ul id="nav__links" class="w-full mt-4 md:mt-0 md:w-auto md:flex md:items-center hidden md:flex flex-col md:flex-row gap-4 md:gap-6 text-sm font-medium">
        <li><a href="#home" class="flex items-center gap-1 hover:text-indigo-500">${homeIcon} Home</a></li>
        <li><a href="#AboutUS" class="flex items-center gap-1 hover:text-indigo-500">${infoIcon} About Us</a></li>
        <li><a href="#units" class="flex items-center gap-1 hover:text-indigo-500">${unitsIcon} Units</a></li>
        <li><a href="#Properties" class="flex items-center gap-1 hover:text-indigo-500">${propertiesIcon} Properties</a></li>
        <li><a href="./login.html" data-action="login" class="flex items-center gap-1 hover:text-indigo-500">${loginIcon} Login</a></li>
        <li><a href="./singnupst.html" data-action="signup" class="flex items-center gap-1 hover:text-indigo-500">${signupIcon} Sign Up</a></li>

        <!-- Auth-only links -->
        <li class="user-menu-item hidden"><a href="#contact" class="flex items-center gap-1 hover:text-indigo-500">${contactIcon} Contact Us</a></li>
        <li class="user-menu-item hidden"><a href="./owner/choses.html" class="flex items-center gap-1 hover:text-indigo-500">${addPropertyIcon} Add Property</a></li>
        <li class="user-menu-item hidden">
          <a href="#" onclick="handleLogout(); return false;" class="flex items-center gap-1 hover:text-red-500">
            ${logoutIcon} Logout
          </a>
        </li>

        <!-- Theme toggle placeholder -->
        <li><div id="theme-toggle"></div></li>
      </ul>
    </nav>
  </header>
  `;
}
