import { _get } from "./apiClint.js";

async function displayRooms() {
  try {
    const roomsContainer = document.getElementById("rooms-container");
    if (!roomsContainer) {
      console.error("Rooms container not found");
      return;
    }

    roomsContainer.innerHTML = `<div class="loading">Loading rooms...</div>`;

    const response = await _get("/api/Unit/GetAllUnits");
    const rooms = response?.$values || [];

    if (rooms.length === 0) {
      roomsContainer.innerHTML = `<div class="no-results">No rooms available</div>`;
      return;
    }

    const roomsHTML = rooms
      .map((room) => {
        const imageUrl =
          room?.photoUrls?.$values?.[0] && room.photoUrls.$values[0] !== ""
            ? `https://easyrentapi0.runasp.net/${room.photoUrls.$values[0]}`
            : "images/default-room.jpg";

        const photoUrls = room?.photoUrls?.$values || [];

        return `
          <div class="room-card"
            data-id="${room.id}"
            data-title="${room.title}"
            data-address="${room.address}"
            data-price="${room.priceForMonth}"
            data-status="${room.status}"
            data-photos='${JSON.stringify(photoUrls)}'>
            
            <img class="room-image" src="${imageUrl}" alt="${room.title}"
              onerror="this.onerror=null; this.src='images/default-room.jpg';"/>
            
            <div class="room-details">
              <h3 class="room-title">${room.title}</h3>
              <p class="room-location"><i class="fas fa-map-marker-alt"></i> ${
                room.address
              }</p>
              <p class="room-price">${
                room.priceForMonth
              } EGP <span class="price-period">/month</span></p>
              <div class="booking-status ${
                room.status === "Available" ? "available" : "booked"
              }">
                ${room.status}
              </div>
              <div class="room-actions">
                <button class="btn-book" onclick="openBookingModal(${
                  room.id
                })">Book</button>
                <button class="btn-view" onclick="viewRoomDetails(${
                  room.id
                })">View Details</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    roomsContainer.innerHTML = roomsHTML;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    document.getElementById("rooms-container").innerHTML = `
      <div class="error">Error loading rooms. Please try again later.</div>`;
  }
}

// Handle room detail modal
window.viewRoomDetails = function (roomId) {
  const roomCard = document.querySelector(`.room-card[data-id='${roomId}']`);
  if (!roomCard) return;

  const title = roomCard.dataset.title;
  const address = roomCard.dataset.address;
  const price = roomCard.dataset.price;
  const status = roomCard.dataset.status;
  const photos = JSON.parse(roomCard.dataset.photos || "[]");

  // Modal elements
  document.getElementById("modalRoomTitle").innerText = title;
  document.getElementById("modalRoomLocation").innerText = address;
  document.getElementById("modalRoomPrice").innerText = `${price} EGP`;
  document.getElementById("modalRoomDescription").innerText =
    "Modern and secure room. Details will be dynamically filled later.";

  const gallery = document.querySelector(".room-gallery");
  gallery.innerHTML = photos
    .map(
      (photo) => `
      <img class="gallery-img"
        src="https://easyrentapi0.runasp.net/${photo}"
        alt="Room image"
        onerror="this.onerror=null; this.src='images/default-room.jpg';"
      />`
    )
    .join("");

  const features = document.getElementById("modalRoomFeatures");
  features.innerHTML = `
    <div class="feature"><i class="fas fa-wifi"></i> Free Wi-Fi</div>
    <div class="feature"><i class="fas fa-bed"></i> 1 Bed</div>
    <div class="feature"><i class="fas fa-bath"></i> Private Bathroom</div>
  `;

  document.getElementById("roomDetailsModal").style.display = "flex";
};

// Handle booking modal
window.openBookingModal = function (roomId) {
  const bookingModal = document.getElementById("bookingModal");
  const titleEl = document.getElementById("bookingRoomTitle");
  const priceEl = document.getElementById("bookingRoomPrice");
  const idInput = document.getElementById("roomId");

  const selectedRoom = document.querySelector(
    `.room-card[data-id='${roomId}']`
  );

  titleEl.innerText = selectedRoom?.dataset.title || "Room";
  priceEl.innerText = `${selectedRoom?.dataset.price || "EGP"}/month`;
  idInput.value = roomId;

  bookingModal.style.display = "flex";
};

// Close any modal by ID
window.closeModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "none";
};

// Init display
document.addEventListener("DOMContentLoaded", displayRooms);
