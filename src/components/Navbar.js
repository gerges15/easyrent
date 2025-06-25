import { menuIcon } from "../utils/icons";
import NavigationLinks from "./NavigationLinks";

export default function Navbar() {
  return `

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

      ${NavigationLinks()}
    </nav>
  
  `;
}
