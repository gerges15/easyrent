export function initNavigation() {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav__links");

  if (menuBtn && navLinks) {
    const menuBtnIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtnIcon.className = navLinks.classList.contains("open")
        ? "ri-close-line"
        : "ri-menu-line";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtnIcon.className = "ri-menu-line";
      });
    });
  }
}

// Function to update navigation based on authentication state
export function updateNavigation() {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const navLinks = document.getElementById("nav__links");

  if (navLinks) {
    const loginLink = navLinks.querySelector('[data-action="login"]');
    const signupLink = navLinks.querySelector('[data-action="signup"]');
    const logoutLink = navLinks.querySelector('[onclick*="handleLogout"]');
    const userMenuItems = navLinks.querySelectorAll(".user-menu-item");

    // Always show login and signup links when not logged in
    if (loginLink) loginLink.style.display = isLoggedIn ? "none" : "block";
    if (signupLink) signupLink.style.display = isLoggedIn ? "none" : "block";
    if (logoutLink) logoutLink.style.display = isLoggedIn ? "block" : "none";

    userMenuItems.forEach((item) => {
      // Always show Contact link
      if (item.querySelector('a[href="#contact"]')) {
        item.style.display = "block";
      }
      // Show Add Property link before login, hide after login
      else if (item.querySelector('a[href="./owner/choses.html"]')) {
        item.style.display = isLoggedIn ? "none" : "block";
      }
      // Show other user menu items only when logged in
      else {
        item.style.display = isLoggedIn ? "block" : "none";
      }
    });
  }
}

// Call updateNavigation when the page loads
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  updateNavigation();
});

// Update navigation when login state changes
window.addEventListener("storage", (e) => {
  if (e.key === "token") {
    updateNavigation();
  }
});
