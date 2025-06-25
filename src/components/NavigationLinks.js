import { navLinks } from "../../public/data/navLinks.js";

import { renderLink } from "../utils/rendering.js";

export default function NavigationLinks() {
  const linksHTML = navLinks.map(renderLink).join("");

  return `
    <ul
      id="nav__links"
      class="w-full mt-4 md:mt-0 md:w-auto md:flex md:items-center hidden md:flex flex-col md:flex-row gap-4 md:gap-6 text-sm font-medium"
    >
      ${linksHTML}
      <li><div id="theme-toggle"></div></li>
    </ul>
  `;
}
