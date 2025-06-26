import "./output.css";
import { createThemeToggle } from "./components/themeToggle.js";
import { initSignUpEvents } from "./pages/signUp.js";
import {
  initCookieConsent,
  acceptCookies,
  rejectCookies,
} from "./utils/cookie.js";
import Footer from "./components/Footer.js";
import Home from "./Home.js";
import Navbar from "./components/Navbar.js";
import routes from "./routes.js";
import Login from "./pages/login.js";
import Units from "./components/Sections/Units.js";
import { getAllColleges } from "./services/lib/colleges.js";
import { getAllUniversities } from "./services/lib/university.js";

// ---- Navigation ----
export function navigate(path) {
  history.pushState({}, "", path);
  render(path);
}
window.navigate = navigate; // Make it accessible globally

// ---- Routing Logic ----
window.onpopstate = () => render(window.location.pathname);

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
});

// ---- Page Rendering ----
async function render(path) {
  const Page = routes[path] || Home;

  // Navbar
  const header = document.getElementById("navbar");
  header.innerHTML = Navbar();

  // Render Page (sync or async)
  const main = document.getElementById("main");
  const result = Page();
  main.innerHTML = result instanceof Promise ? await result : result;

  // Render dynamic units if on home page
  if (path === "/" || path === "#units") {
    try {
      const unitsHtml = await Units();
      const unitContainer = document.getElementById("unitCards");
      if (unitContainer) {
        unitContainer.innerHTML = unitsHtml;
      }
    } catch (err) {
      console.error("Failed to load units:", err);
    }
  }

  // Footer
  const footer = document.getElementById("footer");
  footer.innerHTML = Footer();

  // Theme toggle
  const mountPoint = document.querySelector("#theme-toggle");
  if (mountPoint) mountPoint.appendChild(createThemeToggle());

  // Route-specific scripts
  if (path === "/signUp") initSignUpEvents();

  if (path === "/login") {
    const form = document.querySelector("#loginForm");
    if (form) {
      const fields = ["username", "password"];
      new Login(form, fields);
    }
  }

  if (path === "/admin") {
    footer.innerHTML = "";
    header.innerHTML = "";
    const mountPoint = document.querySelector("#theme-toggle");
    if (mountPoint) mountPoint.appendChild(createThemeToggle());
  }
}

// ---- DOM Ready ----
window.addEventListener("DOMContentLoaded", () => {
  render(window.location.pathname);
  initCookieConsent();

  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove("opacity-0", "pointer-events-none");
      scrollBtn.classList.add("opacity-100");
    } else {
      scrollBtn.classList.add("opacity-0", "pointer-events-none");
      scrollBtn.classList.remove("opacity-100");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ---- Expose cookie handlers globally ----
window.acceptCookies = acceptCookies;
window.rejectCookies = rejectCookies;

console.log(await getAllColleges());
console.log(await getAllUniversities());
