// js/main.js
import API from "./api.js";

// إنشاء نسخة من API class
const api = new API("http://easyrentapi0.runasp.net", {
  authToken: localStorage.getItem("token"), // التوكن لو موجود
});

// مثال على استخدامه بعد تسجيل الدخول
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

// Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle with null checks
  const menuBtn = document.getElementById("menu-btn");
  const navlinks = document.getElementById("nav__links");

  if (menuBtn && navlinks) {
    const menuBtnIcon = menuBtn.querySelector(".ri-menu-line"); // More specific selector

    if (menuBtnIcon) {
      menuBtn.addEventListener("click", (e) => {
        navlinks.classList.toggle("open");
        const isOpen = navlinks.classList.contains("open");
        menuBtnIcon.setAttribute(
          "class",
          isOpen ? "ri-close-line" : "ri-menu-line"
        );
      });

      navlinks.addEventListener("click", (e) => {
        // Only close if clicking on a link (not the container itself)
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

  // ScrollReveal animations
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    });

    // Header animations
    sr.reveal(".header__container h1", {
      delay: 500,
    });

    sr.reveal(".header__container .section__subheader", {
      delay: 250,
    });

    sr.reveal(".header__container .btn", {
      delay: 1000,
    });

    sr.reveal(".room__card", {
      interval: 500,
    });

    sr.reveal(".feature__card", {
      interval: 500,
    });
  } else {
    console.warn("ScrollReveal library not loaded - animations disabled");
  }

  // Property data and display functions
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

  // Save properties to localStorage
  try {
    localStorage.setItem("propertyData", JSON.stringify(properties));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }

  // Display properties function
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

  // Load and display properties
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

  // Make feature cards clickable
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

  // Theme switcher functionality
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

    // Check for saved theme preference
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
      // Check for system preference
      document.documentElement.setAttribute("data-theme", "dark");
      themeSwitch.checked = true;
    }
  }
});

function toggleSection(header) {
  const section = header.parentElement;
  const content = section.querySelector(".filter-content");
  const arrow = section.querySelector(".arrow");

  header.classList.toggle("collapsed");

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    content.classList.remove("collapsed");
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    content.classList.add("collapsed");
  }
}

// Initialize all sections as expanded
document.querySelectorAll(".filter-content").forEach((content) => {
  content.style.maxHeight = content.scrollHeight + "px";
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all filter elements
  const forRentSelect = document.getElementById("forRent");
  const currencySelect = document.getElementById("currency");
  const areaUnitSelect = document.getElementById("areaUnit");
  const bathroomSelect = document.getElementById("bathroomCount");
  const bedroomSelect = document.getElementById("bedroomCount");
  const kitchenSelect = document.getElementById("kitchenCount");
  const resetBtn = document.getElementById("resetFilter");
  const applyBtn = document.getElementById("applyFilter");

  // Reset button functionality
  document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        forRentSelect.value = "rent";
        currencySelect.value = "euro";
        areaUnitSelect.value = "sqft";
        bathroomSelect.value = "";
        bedroomSelect.value = "";
        kitchenSelect.value = "";
      });
    }
  });

  // Apply button functionality
  applyBtn.addEventListener("click", function () {
    const filters = {
      purpose: forRentSelect.value,
      currency: currencySelect.value,
      areaUnit: areaUnitSelect.value,
      bathroomCount: bathroomSelect.value,
      bedroomCount: bedroomSelect.value,
      kitchenCount: kitchenSelect.value,
      minSize: 150,
      maxSize: 250,
    };

    console.log("Applied Filters:", filters);
    alert("Filters applied! Check console for details.");
    // Here you would typically send these filters to your backend
    // or use them to filter properties on the frontend
  });

  // Size option selection
  const sizeOptions = document.querySelectorAll(".size-option");
  sizeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      this.querySelector(".checkmark").style.display =
        this.querySelector(".checkmark").style.display === "none"
          ? "flex"
          : "none";
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    const clickedInside =
      e.target.closest(".more-content") || e.target.closest(".more-label");

    if (!clickedInside) {
      const toggle = document.getElementById("more-toggle");
      if (toggle) toggle.checked = false;
    }
  });
});
