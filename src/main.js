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
import Units from "./components/Sections/Units.js"; // <-- Make sure this is default async Units()

function navigate(path) {
  history.pushState({}, "", path);
  render(path);
}

window.onpopstate = () => {
  render(window.location.pathname);
};

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
});

async function render(path) {
  const Page = routes[path] || Home;

  // Render navbar
  const header = document.getElementById("navbar");
  header.innerHTML = Navbar();

  // Render main page
  document.getElementById("main").innerHTML = Page();

  // Render dynamic unit cards if on Home page
  if (path === "/" || path === "#units") {
    try {
      const unitsHtml = await Units(); // Wait for unit cards to be fetched and created
      const unitContainer = document.getElementById("unitCards");
      if (unitContainer) {
        unitContainer.innerHTML = unitsHtml;
      }
    } catch (err) {
      console.error("Failed to load units:", err);
    }
  }

  // Render footer
  const footer = document.getElementById("footer");
  footer.innerHTML = Footer();

  // Re-attach theme toggle if needed
  const mountPoint = document.querySelector("#theme-toggle");
  if (mountPoint) mountPoint.appendChild(createThemeToggle());

  // Extra logic for specific routes
  if (path === "/signUp") {
    initSignUpEvents();
  }

  if (path === "/login") {
    const form = document.querySelector("#loginForm");
    if (form) {
      const fields = ["username", "password"];
      const validator = new Login(form, fields);
    }
  }

  if (path === "/admin") {
    footer.innerHTML = "";
    header.innerHTML = "";
    const mountPoint = document.querySelector("#theme-toggle");
    if (mountPoint) mountPoint.appendChild(createThemeToggle());
  }
}

// Handle scroll-to-top button
window.addEventListener("DOMContentLoaded", () => {
  render(window.location.pathname);
  initCookieConsent();

  const scrollBtn = document.getElementById("scrollToTopBtn");

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

// Expose cookie methods globally
window.acceptCookies = acceptCookies;
window.rejectCookies = rejectCookies;
