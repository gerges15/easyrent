// Mobile Menu Toggle - This part is correct and works well
const menuBtn = document.getElementById("menu-btn");
const navlinks = document.getElementById("nav__links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navlinks.classList.toggle("open");
  const isOpen = navlinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navlinks.addEventListener("click", (e) => {
  navlinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

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

// تحديث مصفوفة العقارات بإضافة تاريخ الإضافة
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
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/474x/ef/ac/10/efac10e6ffab391d8840a603e4f12d5e.jpg",
    price: "€ 1300",
    title: "Unit no. 409 Admiral Elite Premium Residence",
    location: "medan balas, Minya, Egypt",
    type: "APARTMENTS",
    size: "473 sq feet",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/474x/30/b2/57/30b25726e795a88c92ebbf1d0941463f.jpg",
    price: "€ 10,000",
    title: "Unit no. 411 Admiral Elite Premium Residence",
    location: "Taha-Heseen, Minya, Egypt",
    type: "APARTMENTS material-symbols-outlined",
    size: "899 sq feet",
  },
  {
    id: 5,
    image:
      "https://i.pinimg.com/474x/8d/c3/78/8dc378a1bb88a143b66c250b1ad23a5f.jpg",
    price: "€8,000",
    title: "Unit no. 410 Admiral Elite Premium Residence",
    location: "New Minya City,the first neighburhood, Egypt",
    type: "APARTMENTS",
    size: "120 m2 ",
  },
  {
    id: 6,
    image:
      "https://i.pinimg.com/474x/cf/58/65/cf58652fb2d68e7e044adbb615eb4362.jpg",
    price: "€400",
    title: "Unit no. 410 Admiral Elite Premium Residence",
    location: ", Minya City, Egypt",
    type: "APARTMENTS",
    size: "900 sq feet ",
  },
];

// دالة لعرض العقارات
function displayProperties() {
  const propertyGrid = document.getElementById("property-grid");
  propertyGrid.innerHTML = ""; // مسح المحتوى الحالي

  properties.forEach((property) => {
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
        <div class="property-type">${property.type}</div>
        <div class="property-size">${property.size}</div>
      </div>
    `;
    propertyGrid.appendChild(propertyCard);
  });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", displayProperties);

// حفظ البيانات في localStorage لتكون متاحة بعد تحديث الصفحة
localStorage.setItem("propertyData", JSON.stringify(properties));
// عند تحميل الصفحة، تحقق من وجود بيانات محفوظة
window.addEventListener("load", function () {
  const savedData = localStorage.getItem("propertyData");
  if (savedData) {
    displayProperties(JSON.parse(savedData));
  } else {
    displayProperties();
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // جعل كل بطاقة Feature قابلة للنقر
  const featureCards = document.querySelectorAll(".feature__card");

  featureCards.forEach((card) => {
    card.style.cursor = "pointer"; // تغيير شكل المؤشر

    card.addEventListener("click", function () {
      const pageUrl = this.getAttribute("data-page");
      if (pageUrl) {
        window.location.href = pageUrl;
      }
    });

    // إضافة تأثير عند التحويم
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.03)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
});
// تفعيل زر الترجمة
const languageBtn = document.getElementById("languageBtn");
const languageDropdown = document.getElementById("languageDropdown");
const languageOptions = document.querySelectorAll(".language-option");

// تبديل عرض قائمة اللغات
languageBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  languageDropdown.classList.toggle("active");
});
