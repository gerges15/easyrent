// Add API base URL at the top of the file
const API_BASE_URL = "https://easyrentapi0.runasp.net/api";

// التحقق من تسجيل الدخول وصلاحية التوكن
function isAuthenticated() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return !!(token && user);
}

// التحقق من تسجيل الدخول وتوجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن مسجلاً
function checkAuthAndRedirect() {
  if (!isAuthenticated()) {
    alert("يرجى تسجيل الدخول أولاً");
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// الحصول على بيانات المستخدم
function getUserData() {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
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
    price: 3500,
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
      "Male Only",
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

// تحديث دالة جلب الوحدات لتستخدم البيانات المحلية فقط
function fetchUnits() {
  // استخدام البيانات المحلية مباشرة
  renderRooms(units);
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

    const imageSrc =
      room.images && room.images.length > 0
        ? room.images[0]
        : "./images/default-room.jpg";

    // التحقق من حالة الغرفة (محجوزة أم لا)
    const isBooked = room.isBooked || false;
    const bookingPeriod = room.bookingPeriod || {};
    const bookingStatus = isBooked
      ? `<div class="booking-status booked">
           محجوزة من ${new Date(bookingPeriod.startDate).toLocaleDateString()} 
           إلى ${new Date(bookingPeriod.endDate).toLocaleDateString()}
         </div>`
      : '<div class="booking-status available">متاحة للحجز</div>';

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
        ${bookingStatus}
        <div class="room-features">
          ${renderFeatures(room.features || [])}
        </div>
        <div class="room-actions">
          <button class="btn-view" onclick="openRoomDetails(${
            room.id
          })">تفاصيل الوحدة</button>
          ${
            !isBooked
              ? `<button class="btn-book" onclick="openBookingModal(${room.id})">حجز الآن</button>`
              : ""
          }
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
      const icon = getFeatureIcon(feature);
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

  // تحديث المعرض
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

  // تحديث المميزات
  const featuresContainer = document.getElementById("modalRoomFeatures");
  featuresContainer.innerHTML = "";
  (room.features || []).forEach((feature) => {
    const icon = getFeatureIcon(feature);
    const featureElement = document.createElement("span");
    featureElement.className = "feature";
    featureElement.innerHTML = `<i class="fas ${icon}"></i> ${feature}`;
    featuresContainer.appendChild(featureElement);
  });

  // إضافة زر الحذف للغرف المحجوزة
  const actionsContainer = document.querySelector(
    "#roomDetailsModal .room-actions"
  );
  if (actionsContainer) {
    actionsContainer.innerHTML = `
      <button class="btn-book" onclick="openBookingModal(${room.id})">
        ${room.isBooked ? "تم الحجز" : "حجز الآن"}
      </button>
      ${
        room.isBooked
          ? `
        <button class="btn-danger" onclick="deleteUnit(${room.id})">
          حذف الغرفة
        </button>
      `
          : ""
      }
    `;
  }

  // تحديث حالة الحجز
  if (room.availability) {
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

  // تحميل التعليقات
  loadFeedbacks(roomId);

  document.getElementById("roomDetailsModal").style.display = "flex";
};

// دالة مساعدة للحصول على أيقونة الميزة
function getFeatureIcon(feature) {
  if (feature.includes("bed")) return "fa-bed";
  if (feature.includes("m²")) return "fa-ruler-combined";
  if (feature.includes("WiFi")) return "fa-wifi";
  if (feature.includes("kitchen")) return "fa-utensils";
  if (feature.includes("TV")) return "fa-tv";
  if (feature.includes("bathroom")) return "fa-bath";
  if (feature.includes("laundry")) return "fa-tshirt";
  if (feature.includes("security")) return "fa-shield-alt";
  if (feature.includes("balcony")) return "fa-door-open";
  return "fa-check";
}

// إغلاق النوافذ المنبثقة
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

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
}

// تحميل الوحدات عند تحميل الصفحة
fetchUnits();

// ********* جزء التعليقات (Feedback) **********

// دالة لجلب تفاصيل تعليق معين
async function getFeedbackDetails(feedbackId) {
  try {
    const response = await fetch(`${API_BASE_URL}/Feedback/${feedbackId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get feedback details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting feedback details:", error);
    return null;
  }
}

// دالة لحذف تعليق
async function deleteFeedback(feedbackId) {
  try {
    const response = await fetch(`${API_BASE_URL}/Feedback/${feedbackId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete feedback");
    }

    return true;
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return false;
  }
}

// تحديث دالة تحميل التعليقات لتشمل زر الحذف للمستخدم صاحب التعليق
async function loadFeedbacks(unitId) {
  try {
    const response = await fetch(`${API_BASE_URL}/Feedback?unitId=${unitId}`);

    if (!response.ok) {
      throw new Error("Failed to load feedbacks");
    }

    const feedbacks = await response.json();
    const container = document.getElementById("feedbackContainer");

    if (!feedbacks || feedbacks.length === 0) {
      container.innerHTML =
        '<p style="text-align: center; color: #666;">لا توجد تعليقات بعد</p>';
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
                feedback.createdAt || feedback.date
              ).toLocaleDateString()}</div>
            </div>
            <div class="feedback-content">
              <div class="feedback-comment">${feedback.comment || ""}</div>
            </div>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading feedbacks:", error);
    const container = document.getElementById("feedbackContainer");
    container.innerHTML =
      '<p style="text-align: center; color: #666;">تعذر تحميل التعليقات حالياً.</p>';
  }
}

// دالة معالجة حذف التعليق
window.handleDeleteFeedback = async function (feedbackId) {
  if (!confirm("هل أنت متأكد من حذف هذا التعليق؟")) {
    return;
  }

  const deleted = await deleteFeedback(feedbackId);
  if (deleted) {
    // حذف التعليق من واجهة المستخدم
    const feedbackElement = document.getElementById(`feedback-${feedbackId}`);
    if (feedbackElement) {
      feedbackElement.remove();
    }
    alert("تم حذف التعليق بنجاح");
  } else {
    alert("فشل في حذف التعليق");
  }
};

// جعل الدوال متاحة عالمياً
window.getFeedbackDetails = getFeedbackDetails;
window.deleteFeedback = deleteFeedback;
window.loadFeedbacks = loadFeedbacks;

// إرسال التعليق
async function submitFeedback(event) {
  event.preventDefault();

  const comment = document.getElementById("commentInput").value.trim();
  const rating = parseInt(document.getElementById("rating").value) || 1;
  const currentRoomId = getCurrentRoomId();

  if (!comment) {
    alert("يرجى كتابة تعليق");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        rating,
        unitId: currentRoomId,
      }),
    });

    if (!response.ok) {
      throw new Error("فشل في إرسال التعليق");
    }

    alert("✅ تم إرسال تعليقك بنجاح!");

    // إعادة تعيين النموذج
    document.getElementById("feedbackForm").reset();
    document
      .querySelectorAll(".star")
      .forEach((s) => s.classList.remove("active"));

    // تحديث قائمة التعليقات
    await loadFeedbacks(currentRoomId);
  } catch (error) {
    console.error("❌ خطأ في إرسال التعليق:", error);
    alert("حدث خطأ في إرسال التعليق. يرجى المحاولة مرة أخرى.");
  }
}

// تهيئة نظام التقييم بالنجوم
function initializeStarRating() {
  const stars = document.querySelectorAll(".star");
  if (!stars.length) return;

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      document.getElementById("rating").value = value;

      // تحديث شكل النجوم
      stars.forEach((s) => {
        const starValue = parseInt(s.getAttribute("data-value"));
        if (starValue <= parseInt(value)) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });

    // إضافة تأثيرات التحويم
    star.addEventListener("mouseover", function () {
      const value = this.getAttribute("data-value");
      highlightStars(parseInt(value));
    });

    star.addEventListener("mouseout", function () {
      const currentRating = document.getElementById("rating").value;
      highlightStars(parseInt(currentRating));
    });
  });
}

// دالة تظليل النجوم
function highlightStars(rating) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    const starValue = parseInt(star.getAttribute("data-value"));
    if (starValue <= rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

// تحديث إضافة مستمع الأحداث عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  // تهيئة النجوم
  initializeStarRating();

  // تحميل التعليقات إذا كان هناك معرف للوحدة
  const unitId = getCurrentRoomId();
  if (unitId !== "0") {
    loadFeedbacks(unitId);
  }
});

// جعل الدوال متاحة عالمياً
window.initializeStarRating = initializeStarRating;
window.highlightStars = highlightStars;

// Function to handle room details button click
function viewRoomDetails(roomId) {
  window.location.href = `student/details.html?id=${roomId}`;
}

// Function to handle booking button click
function bookRoom(roomId) {
  if (!checkAuthAndRedirect()) {
    return;
  }
  window.location.href = `student/payment.html?id=${roomId}`;
}

// Make functions globally accessible
window.viewRoomDetails = viewRoomDetails;
window.bookRoom = bookRoom;
window.closeModal = function (modalId) {
  document.getElementById(modalId).style.display = "none";
};

// Add getCurrentRoomId function
function getCurrentRoomId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id") || urlParams.get("roomId") || "0";
}

// تحديث حالة الغرفة بعد الحجز
async function updateRoomBookingStatus(roomId, bookingData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const response = await fetch(
      `${API_BASE_URL}/Unit/${roomId}/booking-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isBooked: true,
          bookingPeriod: {
            startDate: bookingData.startDate,
            endDate: bookingData.endDate,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update room status");
    }

    // تحديث حالة الغرفة في المصفوفة المحلية
    const roomIndex = units.findIndex((unit) => unit.id === roomId);
    if (roomIndex !== -1) {
      units[roomIndex] = {
        ...units[roomIndex],
        isBooked: true,
        bookingPeriod: {
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
        },
      };
    }

    // تحديث عرض الغرف
    renderRooms(units);

    return true;
  } catch (error) {
    console.error("Error updating room status:", error);
    return false;
  }
}

// تحديث دالة فتح نافذة الحجز
window.openBookingModal = function (roomId) {
  const room = units.find((r) => r.id === roomId);

  if (room.isBooked) {
    alert("هذه الغرفة محجوزة بالفعل");
    return;
  }

  if (!isAuthenticated()) {
    if (
      confirm(
        "يجب تسجيل الدخول أولاً للحجز. هل تريد الانتقال إلى صفحة تسجيل الدخول؟"
      )
    ) {
      window.location.href = "login.html";
    }
    return;
  }

  const modal = document.getElementById("bookingModal");
  if (room && modal) {
    document.getElementById("bookingRoomTitle").textContent = room.title;
    document.getElementById("bookingRoomPrice").textContent = `${Number(
      room.price
    ).toLocaleString()} EGP/month`;
    document.getElementById("roomId").value = roomId;
    modal.style.display = "flex";
  }
};

// دالة حذف الغرفة
async function deleteUnit(roomId) {
  if (!confirm("هل أنت متأكد من حذف هذه الغرفة؟")) {
    return false;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const response = await fetch(`${API_BASE_URL}/Unit/${roomId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete unit");
    }

    // حذف الغرفة من المصفوفة المحلية
    units = units.filter((unit) => unit.id !== roomId);

    // تحديث عرض الغرف
    renderRooms(units);

    alert("تم حذف الغرفة بنجاح");
    return true;
  } catch (error) {
    console.error("Error deleting unit:", error);
    alert("حدث خطأ أثناء حذف الغرفة");
    return false;
  }
}
