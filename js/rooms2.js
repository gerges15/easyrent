// بيانات الوحدات يتم جلبها من API بدلاً من البيانات الثابتة
let units = [];

// جلب الوحدات من API
async function fetchUnits() {
  try {
    const res = await fetch("https://easyrentapi0.runasp.net/api/Unit");
    if (!res.ok) throw new Error("فشل في جلب بيانات الوحدات");
    units = await res.json();
    renderRooms(units);
  } catch (error) {
    console.error(error);
    document.getElementById("roomsContainer").innerHTML =
      '<div class="no-results">حدث خطأ في تحميل الوحدات. يرجى المحاولة لاحقًا.</div>';
  }
}

// دالة عرض الوحدات (الغرف) في الصفحة
function renderRooms(roomsToRender) {
  const container = document.getElementById("roomsContainer");
  container.innerHTML = "";

  if (roomsToRender.length === 0) {
    container.innerHTML =
      '<div class="no-results">لا توجد وحدات تطابق معايير البحث. يرجى تعديل الفلاتر.</div>';
    return;
  }

  roomsToRender.forEach((room) => {
    const roomCard = document.createElement("div");
    roomCard.className = "room-card";

    // تأكد من وجود صور، استخدم صورة افتراضية إذا لم توجد
    const imageSrc =
      room.images && room.images.length > 0
        ? room.images[0]
        : "./images/default-room.jpg";

    // استخدم بيانات من API (تعديل على الحقول حسب استجابة API الحقيقية)
    roomCard.innerHTML = `
      <img src="${imageSrc}" alt="${room.title || "Unit"}" class="room-image" />
      <div class="room-details">
        <h3 class="room-title">${room.title || "وحدة سكنية"}</h3>
        <p class="room-location"><i class="fas fa-map-marker-alt"></i> ${
          room.location || ""
        }</p>
        <p class="room-price">${Number(
          room.price
        ).toLocaleString()} EGP <span class="price-period">/شهر</span></p>
        <div class="room-features">
          ${renderFeatures(room.features || [])}
        </div>
        <div class="room-actions">
          <button class="btn-view" onclick="openRoomDetails(${
            room.id
          })">تفاصيل الوحدة</button>
          <button class="btn-book" onclick="openBookingModal(${
            room.id
          })">حجز الآن</button>
        </div>
      </div>
    `;

    container.appendChild(roomCard);
  });
}

// دالة مساعدة لترجمة الميزات إلى أيقونات مع نص
function renderFeatures(features) {
  return features
    .slice(0, 4)
    .map((feature) => {
      const icon = feature.includes("bed")
        ? "fa-bed"
        : feature.includes("m²")
        ? "fa-ruler-combined"
        : feature.includes("WiFi")
        ? "fa-wifi"
        : feature.includes("kitchen")
        ? "fa-utensils"
        : feature.includes("TV")
        ? "fa-tv"
        : feature.includes("bathroom")
        ? "fa-bath"
        : feature.includes("laundry")
        ? "fa-tshirt"
        : feature.includes("bike")
        ? "fa-bicycle"
        : "fa-check";
      return `<span class="feature"><i class="fas ${icon}"></i> ${feature}</span>`;
    })
    .join("");
}

// دالة تصفية الوحدات بناءً على الفلاتر
function filterRooms() {
  const location = document.getElementById("location").value.toLowerCase();
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;
  const maxPrice =
    parseInt(document.getElementById("max-price").value) || Infinity;
  const roomType = document.getElementById("room-type").value.toLowerCase();

  const filteredRooms = units.filter((room) => {
    const locationMatch =
      !location ||
      (room.location && room.location.toLowerCase().includes(location));

    const priceMatch = room.price >= minPrice && room.price <= maxPrice;

    const typeMatch =
      !roomType || (room.type && room.type.toLowerCase() === roomType);

    return locationMatch && priceMatch && typeMatch;
  });

  renderRooms(filteredRooms);
}

// فتح نافذة تفاصيل الوحدة
function openRoomDetails(roomId) {
  const room = units.find((r) => r.id === roomId);
  if (!room) return;

  document.getElementById("modalRoomTitle").textContent =
    room.title || "وحدة سكنية";
  document.getElementById("modalRoomLocation").textContent =
    room.location || "";
  document.getElementById("modalRoomPrice").textContent = `${Number(
    room.price
  ).toLocaleString()} EGP`;
  document.getElementById("modalRoomDescription").textContent =
    room.description || "";

  const featuresContainer = document.getElementById("modalRoomFeatures");
  featuresContainer.innerHTML = "";
  (room.features || []).forEach((feature) => {
    const icon = feature.includes("bed")
      ? "fa-bed"
      : feature.includes("m²")
      ? "fa-ruler-combined"
      : feature.includes("WiFi")
      ? "fa-wifi"
      : feature.includes("kitchen")
      ? "fa-utensils"
      : feature.includes("TV")
      ? "fa-tv"
      : feature.includes("bathroom")
      ? "fa-bath"
      : feature.includes("laundry")
      ? "fa-tshirt"
      : feature.includes("bike")
      ? "fa-bicycle"
      : "fa-check";

    const featureElement = document.createElement("span");
    featureElement.className = "feature";
    featureElement.innerHTML = `<i class="fas ${icon}"></i> ${feature}`;
    featuresContainer.appendChild(featureElement);
  });

  document.getElementById("roomDetailsModal").style.display = "flex";
}

// فتح نافذة الحجز
function openBookingModal(roomId) {
  const room = units.find((r) => r.id === roomId);
  if (!room) return;

  document.getElementById("bookingRoomTitle").textContent =
    room.title || "وحدة سكنية";
  document.getElementById("bookingRoomPrice").textContent = `${Number(
    room.price
  ).toLocaleString()} EGP /شهر`;
  document.getElementById("roomId").value = room.id;

  // تعيين تاريخ الحد الأدنى للحجز إلى اليوم
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("moveInDate").min = today;

  document.getElementById("bookingModal").style.display = "flex";
  closeModal("roomDetailsModal");
}

// إغلاق النوافذ المنبثقة
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// معالجة إرسال نموذج الحجز
document
  .querySelector(".booking-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const bookingData = {
      roomId: document.getElementById("roomId").value,
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      studentId: document.getElementById("studentId").value,
      university: document.getElementById("university").value,
      moveInDate: document.getElementById("moveInDate").value,
      duration: document.getElementById("duration").value,
      specialRequests: document.getElementById("specialRequests").value,
    };

    console.log("تم إرسال الحجز:", bookingData);
    alert("تم إرسال طلب الحجز بنجاح! سوف نتواصل معك قريبًا لتأكيد الحجز.");
    closeModal("bookingModal");

    this.reset();
  });

// معالجة نموذج البحث
document.getElementById("searchform").addEventListener("submit", function (e) {
  e.preventDefault();
  filterRooms();
});

// إغلاق النوافذ عند النقر خارجها
window.addEventListener("click", function (e) {
  if (e.target === document.getElementById("roomDetailsModal")) {
    closeModal("roomDetailsModal");
  }
  if (e.target === document.getElementById("bookingModal")) {
    closeModal("bookingModal");
  }
});

// جلب بيانات الطالب من localStorage وملء الحقول
const student = JSON.parse(localStorage.getItem("student"));
if (student) {
  document.getElementById("fullName").value = student.name || "";
  document.getElementById("email").value = student.email || "";
  document.getElementById("university").value = student.universityName || "";
  // يمكنك إضافة المزيد حسب الحقول المتوفرة لديك
}

// تحميل الوحدات عند تحميل الصفحة
fetchUnits();

// ********* جزء التعليقات (Feedback) **********

// دالة إرسال التعليقات إلى API
function sendFeedback(comment, rating, studentId, unitId) {
  if (!studentId) {
    alert("يرجى تسجيل الدخول أولاً.");
    return;
  }

  const feedbackData = {
    comment,
    rating,
    studentId,
    unitId,
  };

  fetch("https://easyrentapi0.runasp.net/api/Feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("حدث خطأ في إرسال التعليق");
      return response.json();
    })
    .then((data) => {
      console.log("تم إرسال التعليق بنجاح:", data);
      alert("تم إرسال التعليق بنجاح ✅");
      fetchFeedback(); // تحديث عرض التعليقات بعد الإرسال
    })
    .catch((error) => {
      console.error("خطأ:", error);
      alert("فشل في إرسال التعليق ❌");
    });
}

// جلب وعرض التعليقات
function fetchFeedback() {
  fetch("https://easyrentapi0.runasp.net/api/Feedback")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("feedbackContainer");
      container.innerHTML = "";
      data.forEach((fb) => {
        container.innerHTML += `
          <div class="feedback-item">
            <strong>${fb.rating}⭐</strong> - ${fb.comment}
          </div>
        `;
      });
    });
}

// استدعاء جلب التعليقات عند تحميل الصفحة
fetchFeedback();

// نموذج إرسال التعليق
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const comment = document.getElementById("commentInput").value.trim();
    const rating = parseInt(document.getElementById("rating").value);
    const student = JSON.parse(localStorage.getItem("student"));
    const studentId = student ? student.id : 0;
    const unitId = 1; // حدد رقم الوحدة الفعلي أو اجعله ديناميكي

    if (!comment || rating === 0) {
      alert("يرجى إدخال تعليق واختيار تقييم.");
      return;
    }

    sendFeedback(comment, rating, studentId, unitId);

    this.reset();
    document.querySelectorAll(".star").forEach((s) => (s.style.color = "gray"));
    document.getElementById("rating").value = 0;
  });

// نجوم التقييم - تفعيل التفاعل على النجوم
document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", function () {
    const rating = this.getAttribute("data-value");
    document.getElementById("rating").value = rating;

    document.querySelectorAll(".star").forEach((s) => {
      s.style.color = s.getAttribute("data-value") <= rating ? "gold" : "gray";
    });
  });
});
