import "./output.css";

import { createThemeToggle } from "./components/themeToggle.js";
import { initSignUpEvents } from "./pages/signUp.js";
import {
  initCookieConsent,
  acceptCookies,
  rejectCookies,
} from "./utils/cookie.js";
import { loginOwner } from "./services/lib/owner.js";
import { loginAdmin } from "./services/lib/admin.js";
import { loginStudent } from "./services/lib/student.js";
import Footer from "./components/Footer.js";
import Home from "./Home.js";
import Navbar from "./components/Navbar.js";
import routes from "./routes.js";
import Login from "./pages/login.js";
import Units from "./components/Sections/Units.js";
import { initOwnerDashboard } from "./utils/initOwnerDashBoard.js";
import cookies from "js-cookie";
import { getAllUnits } from "./services/lib/unit.js";
import { initAdminDashboard } from "./utils/initAdminDashboard.js";

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
  if (path === "/" || path === "/units") {
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

  if (path === "/admin/dashboard") {
    console.log("I'm Inside admin");
    footer.innerHTML = "";
    header.innerHTML = "";
    await initAdminDashboard();
  }
  if (path === "/owner/dashboard") {
    console.log("I'm Inside owner");
    footer.innerHTML = "";
    header.innerHTML = "";
    initOwnerDashboard();
  }
  if (path === "/student/dashboard") {
    console.log("I'm Inside owner");
    footer.innerHTML = "";
    header.innerHTML = "";
  }

  if (path === "/login") {
    const form = document.querySelector("#loginForm");

    if (form) {
      const fields = ["phone", "password"];
      new Login(form, fields); // reuse validation

      // Handle login submission
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const role = form.querySelector(
          'input[name="userType"]:checked'
        )?.value;
        const identifier = document.getElementById("phone").value;
        const password = document.getElementById("password").value;

        if (!role) return alert("Please select a role.");

        const credentials = { emailOrPhone: identifier, password };

        try {
          let res;
          const userData = {};

          // Call correct endpoint based on role
          if (role === "student") {
            res = await loginStudent(credentials);
          } else if (role === "owner") {
            res = await loginOwner(credentials);
            userData.id = res.data.ownerId;
            userData.name = res.data.ownerName;
          } else if (role === "admin") {
            res = await loginAdmin(credentials);
          }

          localStorage.setItem("auth", "1");
          userData.email = res.data.email;
          userData.role = res.data.role;
          localStorage.setItem("userData", userData);
          localStorage.setItem("token", res.data.token); // optional
          localStorage.setItem("role", role);
          cookies.set("userData", JSON.stringify(userData));
          // Show success message
          const msg = document.getElementById("successMessage");
          if (msg) msg.classList.remove("hidden");

          // Redirect after short delay
          setTimeout(() => {
            if (role === "student") navigate("/student/dashboard");
            if (role === "owner") navigate("/owner/dashboard");
            if (role === "admin") navigate("/admin/dashboard");
          }, 800);
        } catch (err) {
          console.error("Login failed:", err);
          alert("Invalid credentials or login error.");
        }
      });

      // Toggle password visibility
      const toggleBtn = document.getElementById("togglePasswordBtn");
      const passwordInput = document.getElementById("password");
      toggleBtn?.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        toggleBtn.textContent = isPassword ? "Hide" : "Show";
      });

      // 🔵 Highlight selected role visually
      const roleInputs = form.querySelectorAll('input[name="userType"]');
      roleInputs.forEach((input) => {
        input.addEventListener("change", () => {
          roleInputs.forEach((el) =>
            el
              .closest("label")
              .classList.remove("ring-2", "ring-indigo-500", "bg-indigo-100")
          );
          input
            .closest("label")
            .classList.add("ring-2", "ring-indigo-500", "bg-indigo-100");
        });
      });
    }
  }

  console.log(await getAllUnits());
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
