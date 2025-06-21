// Base API URL
const API_BASE_URL = "https://easyrentapi0.runasp.net/api";

// Global variables
let units = [];
let currentRoomId = null;

// Fetch all units from API
export async function fetchUnits() {
  try {
    const response = await fetch(`${API_BASE_URL}/Unit`);
    if (!response.ok) {
      throw new Error("Failed to fetch units");
    }
    units = await response.json();
    renderUnits(units);
  } catch (error) {
    console.error("Error fetching units:", error);
    showErrorMessage("Failed to load rooms. Please try again later.");
  }
}

// Render units to the page
function renderUnits(unitsToRender) {
  const container = document.getElementById("roomsContainer");
  if (!container) return;

  container.innerHTML = "";

  if (unitsToRender.length === 0) {
    container.innerHTML =
      '<div class="no-results">No rooms found matching your criteria</div>';
    return;
  }

  unitsToRender.forEach((unit) => {
    const card = document.createElement("div");
    card.className = "room-card";
    card.innerHTML = `
            <img src="${
              unit.imageUrl || "https://via.placeholder.com/300x200"
            }" alt="${unit.name}" class="room-image">
            <div class="room-details">
                <h3 class="room-title">${unit.name}</h3>
                <p class="room-location"><i class="fas fa-map-marker-alt"></i> ${
                  unit.location
                }</p>
                <p class="room-price">${
                  unit.price
                } EGP <span class="price-period">/month</span></p>
                <div class="room-features">
                    <span class="feature"><i class="fas fa-bed"></i> ${
                      unit.bedrooms
                    } Bed</span>
                    <span class="feature"><i class="fas fa-ruler-combined"></i> ${
                      unit.size
                    } sqm</span>
                </div>
                <div class="room-actions">
                    <button class="btn-book" onclick="openRoomDetails('${
                      unit.id
                    }')">View Details</button>
                </div>
            </div>
        `;
    container.appendChild(card);
  });
}

// Filter units based on search criteria
export function filterUnits() {
  const location = document.getElementById("location").value.toLowerCase();
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;
  const maxPrice =
    parseInt(document.getElementById("max-price").value) || Infinity;
  const roomType = document.getElementById("room-type").value.toLowerCase();

  const filtered = units.filter((unit) => {
    const matchesLocation =
      !location || unit.location.toLowerCase().includes(location);
    const matchesPrice = unit.price >= minPrice && unit.price <= maxPrice;
    const matchesType = !roomType || unit.type.toLowerCase().includes(roomType);

    return matchesLocation && matchesPrice && matchesType;
  });

  renderUnits(filtered);
}

// Open room details modal
export function openRoomDetails(unitId) {
  const unit = units.find((u) => u.id === unitId);
  if (!unit) return;

  currentRoomId = unitId;

  document.getElementById("modalRoomTitle").textContent = unit.name;
  document.getElementById("modalRoomLocation").textContent = unit.location;
  document.getElementById("modalRoomPrice").textContent = unit.price;
  document.getElementById("modalRoomDescription").textContent =
    unit.description;

  // Update features
  const featuresContainer = document.getElementById("modalRoomFeatures");
  featuresContainer.innerHTML = "";
  if (unit.features && unit.features.length > 0) {
    unit.features.forEach((feature) => {
      const featureElement = document.createElement("span");
      featureElement.className = "feature";
      featureElement.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
      featuresContainer.appendChild(featureElement);
    });
  }

  // Update gallery images
  const galleryContainer = document.querySelector(
    "#roomDetailsModal .room-gallery"
  );
  galleryContainer.innerHTML = "";
  if (unit.images && unit.images.length > 0) {
    unit.images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image;
      img.className = "gallery-img";
      galleryContainer.appendChild(img);
    });
  } else {
    galleryContainer.innerHTML = "<p>No images available</p>";
  }

  // Load feedbacks
  loadFeedbacks(unitId);

  // Show modal
  document.getElementById("roomDetailsModal").style.display = "flex";
}

// Close modal
export function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Get current user data from localStorage
function getUserData() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Get student data from API
async function getStudentData(studentId) {
  try {
    const response = await fetch(`${API_BASE_URL}/Student/${studentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch student data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
}

// Display student info
function displayStudentInfo(student) {
  const container = document.getElementById("studentInfoContainer");
  if (!container) return;

  container.innerHTML = `
        <div class="student-info">
            <div class="student-header">
                <h3>Student Information</h3>
            </div>
            <div class="student-details">
                <p><strong>Name:</strong> ${student.fullName}</p>
                <p><strong>University:</strong> ${student.university}</p>
                <p><strong>Faculty:</strong> ${student.faculty}</p>
                <p><strong>Academic Year:</strong> ${student.academicYear}</p>
            </div>
        </div>
    `;
}

// Setup star rating functionality
function setupStarRating() {
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
      const value = parseInt(this.getAttribute("data-value"));
      highlightStars(value);
      document.getElementById("rating").value = value;
    });
  });
}

// Highlight stars based on rating
function highlightStars(rating) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    const value = parseInt(star.getAttribute("data-value"));
    star.classList.toggle("active", value <= rating);
  });
}

// Submit feedback
export async function submitFeedback(event) {
  event.preventDefault();
  const comment = document.getElementById("commentInput").value;
  const rating = document.getElementById("rating").value || 1;

  if (!comment) {
    alert("Please enter a comment");
    return;
  }

  try {
    const user = getUserData();
    if (!user?.id) {
      alert("Please login first");
      window.location.href = "login.html";
      return;
    }

    const response = await fetch(`${API_BASE_URL}/Feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        comment,
        rating: parseInt(rating),
        studentId: user.id,
        unitId: currentRoomId,
      }),
    });

    if (!response.ok) throw new Error("Failed to submit feedback");

    alert("Feedback submitted successfully!");
    event.target.reset();
    await loadFeedbacks(currentRoomId);
  } catch (error) {
    console.error("Feedback error:", error);
    alert(error.message || "Error submitting feedback");
  }
}

// Load feedbacks for a unit
async function loadFeedbacks(unitId) {
  try {
    const response = await fetch(`${API_BASE_URL}/Feedback/unit/${unitId}`);
    if (!response.ok) throw new Error("Failed to load feedbacks");
    const feedbacks = await response.json();

    const container = document.getElementById("feedbackContainer");
    if (!container) return;

    container.innerHTML = "";

    if (feedbacks.length === 0) {
      container.innerHTML = "<p>No reviews yet. Be the first to review!</p>";
      return;
    }

    feedbacks.forEach((feedback) => {
      const feedbackItem = document.createElement("div");
      feedbackItem.className = "feedback-item";
      feedbackItem.innerHTML = `
                <div class="feedback-header">
                    <div class="feedback-rating">${"★".repeat(
                      feedback.rating
                    )}${"☆".repeat(5 - feedback.rating)}</div>
                    <div class="feedback-date">${new Date(
                      feedback.date
                    ).toLocaleDateString()}</div>
                </div>
                <div class="feedback-comment">${feedback.comment}</div>
            `;
      container.appendChild(feedbackItem);
    });
  } catch (error) {
    console.error("Error loading feedbacks:", error);
  }
}

// Book a unit
export async function bookUnit(unitId) {
  try {
    const user = getUserData();
    if (!user?.id) {
      alert("Please login first");
      window.location.href = "login.html";
      return;
    }

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const studentId = document.getElementById("studentId").value;
    const university = document.getElementById("university").value;
    const moveInDate = document.getElementById("moveInDate").value;
    const duration = document.getElementById("duration").value;
    const specialRequests = document.getElementById("specialRequests").value;

    if (
      !fullName ||
      !email ||
      !phone ||
      !studentId ||
      !university ||
      !moveInDate ||
      !duration
    ) {
      alert("Please fill all required fields");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/Booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        unitId,
        studentId: user.id,
        fullName,
        email,
        phone,
        universityId: studentId,
        university,
        moveInDate,
        duration,
        specialRequests,
        status: "Pending",
      }),
    });

    if (!response.ok) throw new Error("Failed to submit booking");

    alert("Booking submitted successfully!");
    closeModal("bookingModal");
  } catch (error) {
    console.error("Booking error:", error);
    alert(error.message || "Error submitting booking");
  }
}

// Check if user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// Open booking modal
export function openBookingModal(unitId) {
  if (!isAuthenticated()) {
    alert("Please login to book a room");
    window.location.href = "login.html";
    return;
  }

  const unit = units.find((u) => u.id === unitId);
  if (!unit) return;

  document.getElementById("bookingRoomTitle").textContent = unit.name;
  document.getElementById(
    "bookingRoomPrice"
  ).textContent = `${unit.price} EGP/month`;
  document.getElementById("roomId").value = unitId;

  // Pre-fill user data if available
  const user = getUserData();
  if (user) {
    document.getElementById("fullName").value = user.fullName || "";
    document.getElementById("email").value = user.email || "";
  }

  document.getElementById("bookingModal").style.display = "flex";
}

// Get current room ID
export function getCurrentRoomId() {
  return currentRoomId;
}

// Show error message
function showErrorMessage(message) {
  const container = document.getElementById("roomsContainer");
  if (!container) return;

  container.innerHTML = `
        <div class="no-results">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
}

// Initialize the page
export async function initializePage() {
  try {
    await fetchUnits();

    const userData = getUserData();
    if (userData && userData.id) {
      const studentData = await getStudentData(userData.id);
      if (studentData) {
        displayStudentInfo(studentData);
      }
    }

    setupStarRating();
    setupEventListeners();
  } catch (error) {
    console.error("Error initializing page:", error);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Search form
  document
    .getElementById("searchform")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      filterUnits();
    });

  // Modal close buttons
  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", function () {
      const modalId = this.closest(".modal").id;
      closeModal(modalId);
    });
  });

  // Star rating
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
      const value = parseInt(this.getAttribute("data-value"));
      highlightStars(value);
      document.getElementById("rating").value = value;
    });
  });
}
