// 1. استيراد الدوال من ملف apiclient.js
import { _get } from "./apiclient.js";

console.log("Login Page");

// 2. بيانات افتراضية للطوارئ
const FALLBACK_DATA = [
  {
    id: "1",
    name: "غرفة فردية",
    location: "طه حسين، المنيا",
    price: 1200,
    description: "غرفة مريحة بحمام خاص",
    features: ["واي فاي", "تكييف", "حمام خاص"],
    images: ["https://via.placeholder.com/300x200"],
    bedrooms: 1,
    size: 25,
    type: "single",
  },
];
// 3. المتغيرات العامة
let currentRoomId = null;

// 4. وظائف API
async function fetchUnits() {
  try {
    units = await _get("/api/Colleges");
    console.log(units);
    renderUnits(units);
  } catch (error) {
    console.error("خطأ في جلب البيانات:", error);
    units = FALLBACK_DATA;
    renderUnits(units);
    showErrorMessage(
      "يتم استخدام بيانات تجريبية، البيانات الحقيقية غير متوفرة"
    );
  }
}

// 5. عرض الوحدات
function renderUnits(unitsToRender) {
  const container = document.getElementById("roomsContainer");
  if (!container) return;

  container.innerHTML = unitsToRender
    .map(
      (unit) => `
    <div class="room-card">
      <img src="${unit.images?.[0] || "https://via.placeholder.com/300x200"}" 
           alt="${unit.name}" class="room-image">
      <div class="room-details">
        <h3 class="room-title">${unit.name}</h3>
        <p class="room-location">
          <i class="fas fa-map-marker-alt"></i> ${unit.location}
        </p>
        <p class="room-price">${unit.price} جنيه 
          <span class="price-period">/شهر</span>
        </p>
        <button class="btn-book" onclick="openRoomDetails('${unit.id}')">
          عرض التفاصيل
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// 6. فتح تفاصيل الغرفة
function openRoomDetails(unitId) {
  const unit = units.find((u) => u.id === unitId);
  if (!unit) return;

  currentRoomId = unitId;

  document.getElementById("modalRoomTitle").textContent = unit.name;
  document.getElementById("modalRoomLocation").textContent = unit.location;
  document.getElementById("modalRoomPrice").textContent = unit.price;

  document.getElementById("roomDetailsModal").style.display = "flex";
}

// 7. إغلاق النافذة المنبثقة
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// 8. تصفية النتائج
function filterUnits() {
  const location = document.getElementById("location").value;
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;
  const maxPrice =
    parseInt(document.getElementById("max-price").value) || 10000;
  const roomType = document.getElementById("room-type").value;

  const filtered = units.filter((unit) => {
    return (
      (!location || unit.location.includes(location)) &&
      unit.price >= minPrice &&
      unit.price <= maxPrice &&
      (!roomType || unit.type.includes(roomType))
    );
  });

  renderUnits(filtered);
}

// 9. عرض رسائل الخطأ
function showErrorMessage(message) {
  const container = document.getElementById("roomsContainer");
  if (!container) return;

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <p>${message}</p>
  `;
  container.appendChild(errorDiv);
}

// 10. تهيئة الصفحة
function initializePage() {
  fetchUnits();

  // إعداد مستمعي الأحداث
  document
    .getElementById("searchform")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      filterUnits();
    });
}

// 11. جعل الدوال متاحة عالمياً
window.openRoomDetails = openRoomDetails;
window.closeModal = closeModal;
window.filterUnits = filterUnits;
window.initializePage = initializePage;

// بدء التطبيق عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", initializePage);
