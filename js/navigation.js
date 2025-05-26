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
