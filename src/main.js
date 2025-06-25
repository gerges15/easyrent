import "./output.css";
import Header from "./components/Header.js";
import Home from "./Home.js";
import { createThemeToggle } from "./components/themeToggle.js";

const app = document.querySelector("#app");
app.innerHTML = `
${Header()}
<main class="p-4">${Home()}</main>
`;

const mountPoint = document.querySelector("#theme-toggle");
mountPoint.appendChild(createThemeToggle());

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
