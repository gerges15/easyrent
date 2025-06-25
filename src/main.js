import "./output.css";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./Home.js";

import { createThemeToggle } from "./components/themeToggle.js";
import {
  initCookieConsent,
  acceptCookies,
  rejectCookies,
} from "./utils/cookie.js";

import routes from "./routes.js";
import { initSignUpEvents } from "./pages/signUp.js";

function render(path) {
  const Page = routes[path] || Home;

  // Render navbar
  const header = document.getElementById("navbar");
  header.innerHTML = Navbar();

  // Render page
  document.getElementById("main").innerHTML = Page();
  const footer = document.getElementById("footer");
  footer.innerHTML = Footer();

  // Re-attach theme toggle if needed
  const mountPoint = document.querySelector("#theme-toggle");
  if (mountPoint) mountPoint.appendChild(createThemeToggle());

  if (path === "/signUp") {
    initSignUpEvents();
  }
  if (path === "/admin") {
    footer.innerHTML = "";
    header.innerHTML = "";

    const mountPoint = document.querySelector("#theme-toggle");
    if (mountPoint) mountPoint.appendChild(createThemeToggle());
  }
}

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

window.addEventListener("DOMContentLoaded", () => {
  render(window.location.pathname);
});

window.addEventListener("DOMContentLoaded", () => {
  render(window.location.pathname);

  const scrollBtn = document.getElementById("scrollToTopBtn");

  // Show/hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove("opacity-0", "pointer-events-none");
      scrollBtn.classList.add("opacity-100");
    } else {
      scrollBtn.classList.add("opacity-0", "pointer-events-none");
      scrollBtn.classList.remove("opacity-100");
    }
  });

  // Scroll to top on click
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

window.addEventListener("DOMContentLoaded", () => {
  render(window.location.pathname);
  initCookieConsent(); // <- Show modal only once
});

// Expose accept/reject to global for the buttons
window.acceptCookies = acceptCookies;
window.rejectCookies = rejectCookies;
