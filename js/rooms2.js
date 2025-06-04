// Add API base URL at the top of the file
const API_BASE_URL = "https://easyrentapi0.runasp.net/api";

// التحقق من تسجيل الدخول
function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// التحقق من تسجيل الدخول وتوجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن مسجلاً
function checkAuthAndRedirect() {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// بيانات الوحدات يتم جلبها من API بدلاً من البيانات الثابتة
let units = [
  {
    id: 1,
    title: "Single Room - Private (Female Only)",
    description: `Modern and fully furnished single room in a secure female-only student residence. Located in Taha Hussein district, just 5 minutes walk from Minia University.

Features include:
- Comfortable Single Bed with Storage
- Study Desk and Chair
- Built-in Wardrobe
- Private Bathroom
- Shared Kitchen Access
- High-Speed Internet
- 24/7 Female Security Staff
- Weekly Room Cleaning
- Laundry Service Available
- Common Study Area
- Female-Only Building Access`,
    location: "Taha Hussein Street, Minia - 500m from Minia University",
    price: 1200,
    type: "single",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
      "https://images.unsplash.com/photo-1617104666169-33656b7952b3",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
    ],
    features: [
      "Single Bed",
      "12 m²",
      "Free WiFi",
      "Private Bathroom",
      "Study Desk",
      "Wardrobe",
      "24/7 Security",
      "Female Only",
    ],
    availability: {
      availableFrom: "2024-09-01",
      minimumStay: "Academic Year",
    },
  },
  {
    id: 2,
    title: "Shared Twin Room (Female Only)",
    description: `Comfortable shared room in a modern female student residence. Perfect for students who prefer companionship while studying.

Features include:
- Two Single Beds with Storage
- Two Study Desks and Chairs
- Individual Wardrobes
- Shared Bathroom (2 students)
- Common Kitchen Facilities
- Free High-Speed WiFi
- 24/7 Female Security
- Weekly Cleaning Service
- Shared Study Lounge
- Female-Only Floor`,
    location:
      "Minia Gardens, Near Faculty of Engineering - 800m from Minia University",
    price: 800,
    type: "shared",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
      "https://images.unsplash.com/photo-1617104666169-33656b7952b3",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    ],
    features: [
      "Twin Beds",
      "18 m²",
      "Free WiFi",
      "Shared Bathroom",
      "Study Area",
      "Individual Wardrobes",
      "24/7 Security",
      "Female Only",
    ],
    availability: {
      availableFrom: "2024-09-01",
      minimumStay: "Academic Year",
    },
  },
  {
    id: 3,
    title: "Triple Room (Female Only)",
    description: `Spacious triple room perfect for students who enjoy a social atmosphere. Located in a secure female-only building.

Features include:
- Three Single Beds with Storage
- Individual Study Areas
- Shared Bathroom
- Common Kitchen Access
- High-Speed WiFi
- Individual Wardrobes
- 24/7 Security
- Weekly Cleaning
- Common Room Access
- Female-Only Floor`,
    location: "University District, Minia - 400m from Minia University",
    price: 600,
    type: "triple",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
    ],
    features: [
      "Three Beds",
      "25 m²",
      "Free WiFi",
      "Shared Bathroom",
      "Study Areas",
      "Individual Wardrobes",
      "24/7 Security",
      "Female Only",
    ],
    availability: {
      availableFrom: "2024-09-01",
      minimumStay: "Academic Year",
    },
  },
  {
    id: 4,
    title: "Studio Apartment (Female Only)",
    description: `Modern studio apartment with private facilities. Perfect for students seeking independence and privacy.

Features include:
- Large Single Bed
- Private Bathroom
- Kitchenette
- Study Area
- Built-in Wardrobe
- High-Speed Internet
- 24/7 Security
- Weekly Cleaning
- Balcony
- Female-Only Building`,
    location: "City Center, Minia - 1km from Minia University",
    price: 1500,
    type: "studio",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
    ],
    features: [
      "Single Bed",
      "30 m²",
      "Private Kitchen",
      "Private Bathroom",
      "Study Area",
      "Balcony",
      "24/7 Security",
      "Female Only",
    ],
    availability: {
      availableFrom: "2024-09-01",
      minimumStay: "Academic Year",
    },
  },
  {
    id: 5,
    title: "Premium Suite (Female Only)",
    description: `Luxury suite with premium amenities and services. Ideal for students seeking the highest level of comfort.

Features include:
- Queen Size Bed
- En-suite Bathroom
- Full Kitchen
- Living Area
- Study Room
- Walk-in Wardrobe
- High-Speed Internet
- Daily Cleaning
- Private Balcony
- Premium Services`,
    location: "Taha Hussein Street, Minia - 300m from Minia University",
    price: 2000,
    type: "suite",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
    ],
    features: [
      "Queen Bed",
      "40 m²",
      "Full Kitchen",
      "Private Bathroom",
      "Study Room",
      "Walk-in Wardrobe",
      "24/7 Security",
      "Female Only",
    ],
    availability: {
      availableFrom: "2024-09-01",
      minimumStay: "Academic Year",
    },
  },
];

// جلب الوحدات من API
async function fetchUnits() {
  try {
    // في حالة نجاح الاتصال بال API، سنضيف الوحدات الجديدة إلى المصفوفة
    const res = await fetch("https://easyrentapi0.runasp.net/api/Unit");
    if (res.ok) {
      const apiUnits = await res.json();
      units = [...units, ...apiUnits]; // دمج الوحدات المحلية مع وحدات API
    }
    renderRooms(units);
  } catch (error) {
    console.error(error);
    // في حالة فشل الاتصال بال API، سنعرض الوحدات المحلية على الأقل
    renderRooms(units);
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
window.openRoomDetails = function (roomId) {
  const room = units.find((r) => r.id === roomId);
  if (!room) return;

  document.getElementById("modalRoomTitle").textContent = room.title;
  document.getElementById("modalRoomLocation").textContent = room.location;
  document.getElementById("modalRoomPrice").textContent = `${Number(
    room.price
  ).toLocaleString()} EGP`;
  document.getElementById("modalRoomDescription").textContent =
    room.description;

  // Update gallery
  const galleryContainer = document.querySelector(".room-gallery");
  galleryContainer.innerHTML = "";

  if (room.images && room.images.length > 0) {
    room.images.forEach((image, index) => {
      const img = document.createElement("img");
      img.src = image;
      img.alt = `${room.title} - Image ${index + 1}`;
      img.className = "gallery-img";
      img.onclick = () => openGallery(room.images, index);
      galleryContainer.appendChild(img);
    });
  }

  // Update features
  const featuresContainer = document.getElementById("modalRoomFeatures");
  featuresContainer.innerHTML = "";
  (room.features || []).forEach((feature) => {
    const icon = getFeatureIcon(feature);
    const featureElement = document.createElement("span");
    featureElement.className = "feature";
    featureElement.innerHTML = `<i class="fas ${icon}"></i> ${feature}`;
    featuresContainer.appendChild(featureElement);
  });

  // Update availability
  if (room.availability) {
    // Find the availability paragraphs by their content
    const availabilityParagraphs = document.querySelectorAll(
      "#roomDetailsModal p"
    );
    availabilityParagraphs.forEach((p) => {
      if (p.textContent.includes("Available from")) {
        p.innerHTML = `Available from: <strong>${room.availability.availableFrom}</strong>`;
      } else if (p.textContent.includes("Minimum stay")) {
        p.innerHTML = `Minimum stay: <strong>${room.availability.minimumStay}</strong>`;
      }
    });
  }

  // Load reviews
  loadFeedbacks(roomId);

  document.getElementById("roomDetailsModal").style.display = "flex";
};

// دالة مساعدة للحصول على أيقونة الميزة
function getFeatureIcon(feature) {
  if (feature.includes("غرف نوم")) return "fa-bed";
  if (feature.includes("m²")) return "fa-ruler-combined";
  if (feature.includes("WiFi")) return "fa-wifi";
  if (feature.includes("مطبخ")) return "fa-utensils";
  if (feature.includes("تكييف")) return "fa-snowflake";
  if (feature.includes("غسالة")) return "fa-tshirt";
  if (feature.includes("ثلاجة")) return "fa-refrigerator";
  if (feature.includes("تلفاز")) return "fa-tv";
  if (feature.includes("شرفة")) return "fa-door-open";
  if (feature.includes("أمن")) return "fa-shield-alt";
  return "fa-check";
}

// فتح نافذة الحجز
function openBookingModal(roomId) {
  if (!checkAuthAndRedirect()) return;
  bookRoom(roomId);
}

// إغلاق النوافذ المنبثقة
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// معالجة إرسال نموذج الحجز
document
  .querySelector(".booking-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!checkAuthAndRedirect()) return;

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

    try {
      const response = await fetch(
        "https://easyrentapi0.runasp.net/api/Booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error("فشل في إرسال طلب الحجز");
      }

      alert("تم إرسال طلب الحجز بنجاح!");
      closeModal("bookingModal");
    } catch (error) {
      console.error("خطأ في إرسال طلب الحجز:", error);
      alert("حدث خطأ في إرسال طلب الحجز. يرجى المحاولة مرة أخرى.");
    }
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

// إرسال التعليق
async function sendFeedback(comment, rating, unitId) {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const userData = getUserData();

    const feedbackData = {
      comment: comment || "",
      rating: rating || 1,
      userId: userData?.id,
      unitId: unitId,
    };

    const response = await fetch(`${API_BASE_URL}/Feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    // Clear form
    document.getElementById("rating").value = "1";
    document.getElementById("commentInput").value = "";
    document
      .querySelectorAll(".star")
      .forEach((star) => star.classList.remove("active"));

    // Show success message
    alert("Thank you for your review!");

    // Refresh feedback list
    await loadFeedbacks(unitId);
  } catch (error) {
    console.error("Error submitting review:", error);
    alert("Unable to submit review. Please try again later.");
  }
}

// جلب التعليقات
async function fetchFeedback() {
  try {
    const response = await fetch(
      "https://easyrentapi0.runasp.net/api/Feedbacks",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("فشل في جلب التعليقات");
    }

    return await response.json();
  } catch (error) {
    console.error("خطأ في جلب التعليقات:", error);
    return [];
  }
}

// معالجة إضافة التعليق
document
  .getElementById("feedbackForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!checkAuthAndRedirect()) return;

    const comment = document.getElementById("commentInput").value.trim();
    const rating = parseInt(document.getElementById("rating").value) || 1;
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
      alert("يرجى تسجيل الدخول أولاً");
      window.location.href = "login.html";
      return;
    }

    if (!comment) {
      alert("يرجى إدخال تعليق");
      return;
    }

    const currentRoomId = getCurrentRoomId();
    const studentId = userData.id || 0;

    try {
      const response = await fetch(
        "https://easyrentapi0.runasp.net/api/Feedbacks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            comment: comment,
            rating: rating,
            studentId: studentId,
            unitId: currentRoomId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("فشل في إرسال التعليق");
      }

      alert("تم إرسال تعليقك بنجاح!");

      // إعادة تعيين النموذج
      document.getElementById("commentInput").value = "";
      document.getElementById("rating").value = "1";
      document
        .querySelectorAll(".star")
        .forEach((s) => s.classList.remove("active"));

      // تحديث قائمة التعليقات
      await loadFeedbacks(currentRoomId);
    } catch (error) {
      console.error("خطأ في إرسال التعليق:", error);
      alert("حدث خطأ في إرسال التعليق. يرجى المحاولة مرة أخرى.");
    }
  });

// تحميل التعليقات للوحدة
async function loadFeedbacks(unitId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      document.getElementById("feedbackContainer").innerHTML =
        '<p style="text-align: center; color: #666;">Please login to view reviews</p>';
      return;
    }

    if (!unitId) {
      console.warn("No unit ID provided for feedback loading");
      document.getElementById("feedbackContainer").innerHTML =
        '<p style="text-align: center; color: #666;">No reviews available</p>';
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/Feedbacks/GetByUnitId/${unitId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const feedbacks = await response.json();
    const container = document.getElementById("feedbackContainer");

    if (!feedbacks || feedbacks.length === 0) {
      container.innerHTML =
        '<p style="text-align: center; color: #666;">No reviews yet</p>';
      return;
    }

    container.innerHTML = feedbacks
      .map(
        (feedback) => `
      <div class="feedback-item">
        <div class="feedback-header">
          <div class="feedback-rating">
            ${Array(5)
              .fill("★")
              .map(
                (star, index) =>
                  `<span style="color: ${
                    index < feedback.rating ? "#ffd700" : "#ddd"
                  }">${star}</span>`
              )
              .join("")}
          </div>
          <div class="feedback-date">${new Date(
            feedback.createdAt || feedback.date || new Date()
          ).toLocaleDateString()}</div>
        </div>
        <div class="feedback-comment">${feedback.comment || ""}</div>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading feedbacks:", error);
    document.getElementById("feedbackContainer").innerHTML =
      '<p style="text-align: center; color: #666;">Unable to load reviews at this time. Please try again later.</p>';
  }
}

// تفعيل النجوم
document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");

  stars.forEach((star) => {
    // عند تحريك الماوس فوق النجمة
    star.addEventListener("mouseover", function () {
      const value = parseInt(this.getAttribute("data-value"));
      highlightStars(value);
    });

    // عند إزالة الماوس من النجمة
    star.addEventListener("mouseout", function () {
      const currentRating = parseInt(document.getElementById("rating").value);
      highlightStars(currentRating);
    });

    // عند النقر على النجمة
    star.addEventListener("click", function () {
      const value = parseInt(this.getAttribute("data-value"));
      document.getElementById("rating").value = value;
      highlightStars(value);
    });
  });

  // دالة لتحديث لون النجوم
  function highlightStars(rating) {
    stars.forEach((star) => {
      const starValue = parseInt(star.getAttribute("data-value"));
      if (starValue <= rating) {
        star.style.color = "#ffd700"; // لون ذهبي للنجوم المحددة
      } else {
        star.style.color = "#ddd"; // لون رمادي للنجوم غير المحددة
      }
    });
  }
});

// Function to handle room details button click
function viewRoomDetails(roomId) {
  window.location.href = `student/details.html?id=${roomId}`;
}

// Function to handle booking button click
function bookRoom(roomId) {
  if (!isAuthenticated()) {
    alert("Please login to book a room");
    window.location.href = "login.html";
    return;
  }
  window.location.href = `student/payment.html?id=${roomId}`;
}

// Make functions globally accessible
window.viewRoomDetails = function (roomId) {
  window.location.href = `student/details.html?id=${roomId}`;
};

window.closeModal = function (modalId) {
  document.getElementById(modalId).style.display = "none";
};

// Add getCurrentRoomId function
function getCurrentRoomId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id") || urlParams.get("roomId") || "0";
}

// Update the feedback submission function
async function submitFeedback(event) {
  event.preventDefault();

  if (!isAuthenticated()) {
    alert("Please login to submit a review");
    window.location.href = "login.html";
    return;
  }

  const rating = parseInt(document.getElementById("rating").value);
  const comment = document.getElementById("commentInput").value;
  const userData = getUserData();
  const unitId = parseInt(getCurrentRoomId());

  if (!rating || !comment) {
    alert("Please provide both rating and comment");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    // Create the feedback object exactly as required by the API
    const feedbackData = {
      comment: comment,
      rating: rating,
      studentId: userData?.id || 0,
      unitId: unitId || 0,
    };

    const response = await fetch(`${API_BASE_URL}/Feedbacks/Add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Feedback submission error:", errorData);
      throw new Error("Failed to submit review");
    }

    // Clear form
    document.getElementById("rating").value = "1";
    document.getElementById("commentInput").value = "";
    document
      .querySelectorAll(".star")
      .forEach((star) => star.classList.remove("active"));

    alert("Thank you for your review!");

    // Refresh feedback list
    await loadFeedbacks(unitId);
  } catch (error) {
    console.error("Error submitting review:", error);
    alert("Unable to submit review. Please try again later.");
  }
}

// Make functions globally accessible
window.submitFeedback = submitFeedback;
window.getCurrentRoomId = getCurrentRoomId;
window.loadFeedbacks = loadFeedbacks;
