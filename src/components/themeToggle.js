import { sunIcon, moonIcon } from "../utils/icons";
export function createThemeToggle() {
  const button = document.createElement("button");
  button.setAttribute("aria-label", "Toggle theme");
  button.className =
    "rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition";

  let isDark = null;

  function shouldUseDark() {
    const stored = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return stored === "dark" || (!stored && systemPrefersDark);
  }

  function applyTheme(dark) {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    button.innerHTML = dark ? sunIcon : moonIcon;
    isDark = dark;
  }

  function toggleTheme() {
    applyTheme(!isDark);
  }

  // Initialize
  isDark = shouldUseDark();
  applyTheme(isDark);
  button.addEventListener("click", toggleTheme);

  return button;
}
