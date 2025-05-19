// js/navigation.js

export function initNavigation() {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav__links");

  if (!menuBtn || !navLinks) {
    console.warn("عناصر التنقل مش موجودة في الصفحة");
    return;
  }

  const menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    if (navLinks.classList.contains("open")) {
      menuBtnIcon.className = "ri-close-line";
    } else {
      menuBtnIcon.className = "ri-menu-line";
    }
  });

  // يقفل المينيو لما نضغط على أي رابط
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      menuBtnIcon.className = "ri-menu-line";
    }
  });
}
