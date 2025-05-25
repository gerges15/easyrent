// js/navigation.js - النسخة المعدلة
export function initNavigation() {
  const navLinks = document.getElementById("nav__links");

  if (!navLinks) {
    console.warn("عناصر التنقل مش موجودة في الصفحة");
    return;
  }

  // إضافة كلاس active للرابط الحالي
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.querySelectorAll("a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "#home")
    ) {
      link.classList.add("active");
    }
  });

  // أي وظائف إضافية تريدين إضافتها للتنقل
  console.log("تم تهيئة التنقل بنجاح (النسخة المبسطة)");
}
