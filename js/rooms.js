import API from "./api.js";

const api = new API("http://easyrentapi0.runasp.net");

async function displayRooms() {
  try {
    const roomsContainer = document.getElementById("rooms-container");
    if (!roomsContainer) {
      console.error("Rooms container not found");
      return;
    }

    roomsContainer.innerHTML = '<div class="loading">Loading rooms...</div>';

    const response = await api.get("/api/Unit/GetAllUnits");
    const rooms = response.$values || [];

    if (!rooms || rooms.length === 0) {
      roomsContainer.innerHTML =
        '<div class="no-rooms">No rooms available</div>';
      return;
    }

    const roomsHTML = rooms
      .map(
        (room) => `
      <div class="room-card">
        <img src="${
          room.photoUrls.$values[0] || "images/default-room.jpg"
        }" alt="${room.title}">
        <div class="room-details">
          <h3>${room.title}</h3>
          <p class="address">${room.address}</p>
          <p class="owner">Owner: ${room.ownerName}</p>
          <p class="price">$${room.priceForMonth}/month</p>
          <p class="status">Status: ${room.status}</p>
          <button onclick="viewRoomDetails(${room.id})">View Details</button>
        </div>
      </div>
    `
      )
      .join("");

    roomsContainer.innerHTML = roomsHTML;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    document.getElementById("rooms-container").innerHTML =
      '<div class="error">Error loading rooms. Please try again later.</div>';
  }
}

window.viewRoomDetails = function (roomId) {
  window.location.href = `/room-details.html?id=${roomId}`;
};

// Initialize when the DOM is loaded
document.addEventListener("DOMContentLoaded", displayRooms);
