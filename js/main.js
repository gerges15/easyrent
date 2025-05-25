import API from "./api.js";
import { initCookieConsent } from "./cookie-consent.js";
import { initNavigation } from "./navigation.js";
import { initFilter } from "./property-filter.js";

// إنشاء نسخة من API class مع التوكن لو موجود
const api = new API("https://easyrentapi0.runasp.net", {
  authToken: localStorage.getItem("token"),
});

// التحقق من نوع المستخدم وتوجيهه للصفحة المناسبة
async function checkUserType() {
  try {
    const user = await api.get("/auth/me");
    console.log("نوع المستخدم:", user.role);

    if (user.role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else if (user.role === "owner") {
      window.location.href = "owner-dashboard.html";
    } else if (user.role === "student") {
      window.location.href = "student-dashboard.html";
    } else {
      alert("نوع المستخدم غير معروف، سيتم تسجيل الخروج");
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }
  } catch (err) {
    console.error("فشل في التحقق من نوع المستخدم", err);
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
}

// استدعاء تهيئة الإضافات
initCookieConsent();
initNavigation();
initFilter();

document.addEventListener("DOMContentLoaded", () => {
  // ---- Mobile Menu Toggle ----
  const menuBtn = document.getElementById("menu-btn");
  const navlinks = document.getElementById("nav__links");

  if (menuBtn && navlinks) {
    const menuBtnIcon = menuBtn.querySelector(".ri-menu-line");
    if (menuBtnIcon) {
      menuBtn.addEventListener("click", () => {
        navlinks.classList.toggle("open");
        const isOpen = navlinks.classList.contains("open");
        menuBtnIcon.setAttribute(
          "class",
          isOpen ? "ri-close-line" : "ri-menu-line"
        );
      });

      navlinks.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          navlinks.classList.remove("open");
          menuBtnIcon.setAttribute("class", "ri-menu-line");
        }
      });
    } else {
      console.warn("Menu button icon not found");
    }
  } else {
    console.warn("Menu button or nav links element not found");
  }

  // ---- ScrollReveal Animations ----
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    });

    sr.reveal(".header__container h1", { delay: 500 });
    sr.reveal(".header__container .section__subheader", { delay: 250 });
    sr.reveal(".header__container .btn", { delay: 1000 });
    sr.reveal(".room__card", { interval: 500 });
    sr.reveal(".feature__card", { interval: 500 });
  } else {
    console.warn("ScrollReveal library not loaded - animations disabled");
  }

  // ---- بيانات العقارات ----
  const properties = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/474x/4a/5d/ec/4a5dec2b4b5449645d1ec94c21c7b13e.jpg",
      price: "€ 2,850",
      title: "Unit no. 411 Admiral Elite Premium Residence",
      location: "Adnan, Minya, Egypt",
      type: "APARTMENTS",
      size: "899 sq feet",
      beds: 2,
      added: "2 days ago",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/474x/61/79/2b/61792b67866bf092917ea64fbace6f10.jpg",
      price: "€ 9,000",
      title: "Unit no. 410 Admiral Elite Premium Residence",
      location: "New Minya City, Egypt",
      type: "APARTMENTS",
      size: "1237 sq feet",
      beds: 3,
      added: "1 week ago",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/474x/ef/ac/10/efac10e6ffab391d8840a603e4f12d5e.jpg",
      price: "€ 1,300",
      title: "Unit no. 409 Admiral Elite Premium Residence",
      location: "medan balas, Minya, Egypt",
      type: "APARTMENTS",
      size: "473 sq feet",
      beds: 1,
      added: "3 days ago",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/474x/30/b2/57/30b25726e795a88c92ebbf1d0941463f.jpg",
      price: "€ 10,000",
      title: "Unit no. 411 Admiral Elite Premium Residence",
      location: "Taha-Heseen, Minya, Egypt",
      type: "APARTMENTS",
      size: "899 sq feet",
      beds: 2,
      added: "Just added",
    },
    {
      id: 5,
      image:
        "https://i.pinimg.com/474x/8d/c3/78/8dc378a1bb88a143b66c250b1ad23a5f.jpg",
      price: "€8,000",
      title: "Unit no. 410 Admiral Elite Premium Residence",
      location: "New Minya City,the first neighburhood, Egypt",
      type: "APARTMENTS",
      size: "120 m²",
      beds: 3,
      added: "1 day ago",
    },
    {
      id: 6,
      image:
        "https://i.pinimg.com/474x/cf/58/65/cf58652fb2d68e7e044adbb615eb4362.jpg",
      price: "€400",
      title: "Unit no. 410 Admiral Elite Premium Residence",
      location: "Minya City, Egypt",
      type: "APARTMENTS",
      size: "900 sq feet",
      beds: 1,
      added: "2 weeks ago",
    },
  ];

  // حفظ بيانات العقارات في localStorage
  try {
    localStorage.setItem("propertyData", JSON.stringify(properties));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }

  // دالة عرض العقارات
  function displayProperties(propertiesToShow = properties) {
    const propertyGrid = document.getElementById("property-grid");
    if (!propertyGrid) {
      console.warn("Property grid element not found");
      return;
    }

    propertyGrid.innerHTML = "";

    propertiesToShow.forEach((property) => {
      const propertyCard = document.createElement("div");
      propertyCard.className = "property-card";
      propertyCard.innerHTML = `
        <div class="property-image" style="background-image: url('${property.image}')"></div>
        <div class="property-price">${property.price}</div>
        <div class="property-details">
          <h3>${property.title}</h3>
          <p class="property-location">
            <i class="ri-map-pin-line"></i> ${property.location}
          </p>
          <div class="property-features">
            <span class="feature-item">
              <i class="ri-hotel-bed-line"></i>
              <span class="feature-value">${property.beds}</span>
            </span>
            <span class="property-size">
              <i class="ri-ruler-line"></i> ${property.size}
            </span>
          </div>
          <div class="property-type">${property.type}</div>
          <div class="property-added">${property.added}</div>
        </div>
      `;
      propertyGrid.appendChild(propertyCard);
    });
  }

  // تحميل وعرض بيانات العقارات من localStorage
  try {
    const savedData = localStorage.getItem("propertyData");
    if (savedData) {
      displayProperties(JSON.parse(savedData));
    } else {
      displayProperties();
    }
  } catch (e) {
    console.warn("Could not load from localStorage:", e);
    displayProperties();
  }

  // ---- Feature Cards: clickable with hover effect ----
  const featureCards = document.querySelectorAll(".feature__card");
  featureCards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", function () {
      const pageUrl = this.dataset.page;
      if (pageUrl) {
        window.location.href = pageUrl;
      }
    });

    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.03)";
      this.style.transition = "transform 0.2s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // ---- Theme Switcher ----
  const themeSwitch = document.querySelector('.switch input[type="checkbox"]');
  if (themeSwitch) {
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    }

    themeSwitch.addEventListener("change", switchTheme, false);

    // تحميل تفضيل الثيم من التخزين أو نظام الجهاز
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
      if (currentTheme === "dark") {
        themeSwitch.checked = true;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
      themeSwitch.checked = true;
    }
  }

  // ---- Toggle filter sections ----
  function toggleSection(header) {
    const section = header.parentElement;
    const content = section.querySelector(".filter-content");
    header.classList.toggle("collapsed");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove("collapsed");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("collapsed");
    }
  }

  // فتح جميع الأقسام بشكل افتراضي
  document.querySelectorAll(".filter-content").forEach((content) => {
    content.style.maxHeight = content.scrollHeight + "px";
  });

  // ---- Filter Controls ----
  const forRentSelect = document.getElementById("forRent");
  const currencySelect = document.getElementById("currency");
  const areaUnitSelect = document.getElementById("areaUnit");
  const bathroomSelect = document.getElementById("bathroomCount");
  const bedroomSelect = document.getElementById("bedroomCount");
  const kitchenSelect = document.getElementById("kitchenCount");
  const resetBtn = document.getElementById("resetFilter");
  const applyBtn = document.getElementById("applyFilter");

  // إعادة تعيين الفلاتر
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (forRentSelect) forRentSelect.value = "rent";
      if (currencySelect) currencySelect.value = "euro";
      if (areaUnitSelect) areaUnitSelect.value = "sqft";
      if (bathroomSelect) bathroomSelect.value = "";
      if (bedroomSelect) bedroomSelect.value = "";
      if (kitchenSelect) kitchenSelect.value = "";
    });
  }

  // تطبيق الفلاتر
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const filters = {
        purpose: forRentSelect ? forRentSelect.value : "",
        currency: currencySelect ? currencySelect.value : "",
        areaUnit: areaUnitSelect ? areaUnitSelect.value : "",
        bathroomCount: bathroomSelect ? bathroomSelect.value : "",
        bedroomCount: bedroomSelect ? bedroomSelect.value : "",
        kitchenCount: kitchenSelect ? kitchenSelect.value : "",
      };
      console.log("تطبيق الفلاتر:", filters);
      // هنا تضيف منطق تصفية البيانات حسب الفلاتر
    });
  }

  // ---- Toggle filter section on header click ----
  document.querySelectorAll(".filter-header").forEach((header) => {
    header.addEventListener("click", () => toggleSection(header));
  });
});
