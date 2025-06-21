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

    if (isLoggedIn) {
      // Hide login/signup and Add Property, show logout
      if (loginLink) loginLink.style.display = 'none';
      if (signupLink) signupLink.style.display = 'none';
      if (logoutLink) logoutLink.style.display = 'block';
      userMenuItems.forEach(item => {
        // Always show Contact link
        if (item.querySelector('a[href="#contact"]')) {
          item.style.display = 'block';
        }
        // Hide Add Property link after login
        else if (item.querySelector('a[href="./owner/choses.html"]')) {
          item.style.display = 'none';
        } else {
          item.style.display = 'block';
        }
      });
    } else {
      // Show login/signup and Add Property, hide logout
      if (loginLink) loginLink.style.display = 'block';
      if (signupLink) signupLink.style.display = 'block';
      if (logoutLink) logoutLink.style.display = 'none';
      userMenuItems.forEach(item => {
        // Always show Contact link
        if (item.querySelector('a[href="#contact"]')) {
          item.style.display = 'block';
        }
        // Show Add Property link before login
        else if (item.querySelector('a[href="./owner/choses.html"]')) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
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
