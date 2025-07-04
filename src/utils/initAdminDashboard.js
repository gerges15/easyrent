import Toastify from "toastify-js";
import { getAllUnits, approveUnit, deleteUnit } from "../services/lib/unit";
import { getAllBookUnits, deleteBookUnits } from "../services/lib/booking";
import { getAllStudents } from "../services/lib/student";
import { getAllUniversities } from "../services/lib/university.js";
import { getAllColleges } from "../services/lib/colleges.js";
import { getAllAdmins } from "../services/lib/admin.js";
import { getAllFeedback, deleteFeedback } from "../services/lib/feedback.js";
import { getUnit } from "../services/lib/unit";
import { createThemeToggle } from "../components/themeToggle.js";
import Cookies from "js-cookie";

// Placeholder service functions (to be implemented in backend)
async function editUnit(id, data) {
  console.log(`Editing unit ${id} with data:`, data);
  // Replace with actual API call
  return { success: true };
}

async function deleteStudent(id) {
  console.log(`Deleting student ${id}`);
  // Replace with actual API call
  return { success: true };
}

async function editStudent(id, data) {
  console.log(`Editing student ${id} with data:`, data);
  // Replace with actual API call
  return { success: true };
}

async function editUniversity(id, data) {
  console.log(`Editing university ${id} with data:`, data);
  // Replace with actual API call
  return { success: true };
}

async function deleteUniversity(id) {
  console.log(`Deleting university ${id}`);
  // Replace with actual API call
  return { success: true };
}

async function editCollege(id, data) {
  console.log(`Editing college ${id} with data:`, data);
  // Replace with actual API call
  return { success: true };
}

async function deleteCollege(id) {
  console.log(`Deleting college ${id}`);
  // Replace with actual API call
  return { success: true };
}

async function editAdmin(id, data) {
  console.log(`Editing admin ${id} with data:`, data);
  // Replace with actual API call
  return { success: true };
}

async function deleteAdmin(id) {
  console.log(`Deleting admin ${id}`);
  // Replace with actual API call
  return { success: true };
}

function showToast(message, type = "info") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor:
      type === "error" ? "#dc2626" : type === "success" ? "#16a34a" : "#2563eb",
  }).showToast();
}

function createEditModal(id, data, type, onSave) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 flex items-center justify-center z-50";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", `edit-${type}-title`);
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-md w-full">
      <h2 id="edit-${type}-title" class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Edit ${type}</h2>
      <form id="edit-${type}-form">
        ${Object.keys(data)
          .map(
            (key) => `
          <div class="mb-4">
            <label for="${key}-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300">${key}</label>
            <input type="text" id="${key}-input" name="${key}" value="${
              data[key] || ""
            }" class="mt-1 w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" required>
          </div>
        `
          )
          .join("")}
        <div class="flex justify-end gap-2">
          <button type="button" id="cancel-btn" class="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600">Cancel</button>
          <button type="submit" id="save-btn" class="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed">Save</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.classList.add("overflow-hidden");

  // Focus the first input for accessibility
  const firstInput = modal.querySelector("input");
  if (firstInput) firstInput.focus();

  // Close modal on click outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
      document.body.classList.remove("overflow-hidden");
    }
  });

  // Close modal on cancel button
  const cancelBtn = modal.querySelector("#cancel-btn");
  cancelBtn.addEventListener("click", () => {
    modal.remove();
    document.body.classList.remove("overflow-hidden");
  });

  // Handle form submission with validation and loading state
  const form = modal.querySelector(`#edit-${type}-form`);
  const saveBtn = modal.querySelector("#save-btn");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);

    // Validate non-empty fields
    const isValid = Object.values(updatedData).every(
      (value) => value.trim() !== ""
    );
    if (!isValid) {
      showToast("All fields are required", "error");
      return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";

    try {
      await onSave(id, updatedData);
      showToast(`${type} updated`, "success");
      modal.remove();
      document.body.classList.remove("overflow-hidden");
      initAdminDashboard();
    } catch (err) {
      showToast(`Error updating ${type.toLowerCase()}`, "error");
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = "Save";
    }
  });
}

function createViewModal(data, type) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 flex items-center justify-center z-50";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", `view-${type}-title`);
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-md w-full">
      <h2 id="view-${type}-title" class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">View ${type}</h2>
      <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        ${Object.entries(data)
          .map(
            ([key, value]) => `
            <div class="flex items-center gap-2">
              <strong>${key}:</strong> ${value || "N/A"}
            </div>
          `
          )
          .join("")}
      </div>
      <div class="mt-4 flex justify-end">
        <button传来:button id="close-btn" class="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.classList.add("overflow-hidden");

  // Focus the close button for accessibility
  const closeBtn = modal.querySelector("#close-btn");
  closeBtn.focus();

  // Close modal on click outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
      document.body.classList.remove("overflow-hidden");
    }
  });

  // Close modal on close button
  closeBtn.addEventListener("click", () => {
    modal.remove();
    document.body.classList.remove("overflow-hidden");
  });
}

export async function initAdminDashboard() {
  const token = localStorage.getItem("token");
  const userData = Cookies.get("userData");

  if (!token || !userData) {
    showToast("You must be logged in.", "error");
    window.location.href = "/";
    return;
  }

  // Mount theme toggles
  document
    .querySelectorAll("#theme-toggle")
    .forEach((area) => area.appendChild(createThemeToggle()));

  // Sidebar toggle for mobile
  document.getElementById("sidebar-toggle")?.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("-translate-x-full");
    sidebar.classList.toggle("translate-x-0");
  });

  try {
    // Fetch and display unit statistics
    const unitsRes = await getAllUnits();
    const units = unitsRes?.data?.["$values"] || [];
    document.getElementById("totalUnitsCount").textContent = units.length;
    document.getElementById("pendingUnitsCount").textContent = units.filter(
      (u) => u.status === "Pending"
    ).length;
    document.getElementById("availableUnitsCount").textContent = units.filter(
      (u) => u.status === "Available"
    ).length;

    // Hide loading spinners
    document
      .querySelectorAll(".fa-sync-alt")
      .forEach((el) => el.classList.add("hidden"));

    // Fetch and display recent feedback
    const feedbackRes = await getAllFeedback();
    const feedback = feedbackRes?.data?.["$values"] || [];
    renderRecentFeedback(feedback.slice(0, 5), "recent-feedback-content");
  } catch (err) {
    console.error("Failed to fetch dashboard data:", err);
    showToast("Failed to load dashboard data", "error");
  }

  // Handle tab navigation
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", async () => {
      navItems.forEach((el) =>
        el.classList.remove(
          "bg-indigo-100",
          "dark:bg-indigo-800",
          "text-indigo-700",
          "dark:text-indigo-200"
        )
      );
      item.classList.add(
        "bg-indigo-100",
        "dark:bg-indigo-800",
        "text-indigo-700",
        "dark:text-indigo-200"
      );

      const target = item.getAttribute("data-target");
      const section = document.getElementById("admin-units-section");

      try {
        if (target === "dashboard") {
          section?.classList.add("hidden");
        } else if (target === "units") {
          section?.classList.remove("hidden");
          const res = await getAllUnits();
          renderAdminUnits(res?.data?.["$values"] || []);
        } else if (target === "students") {
          section?.classList.remove("hidden");
          const res = await getAllStudents();
          renderStudents(res?.data?.["$values"] || []);
        } else if (target === "bookings") {
          section?.classList.remove("hidden");
          const res = await getAllBookUnits();
          // const res = await getAllUnits(); // Replace with getAllBookUnits when booking data is provided
          console.log(await res);
          renderUnitsForBookings(
            res?.data?.["$values"] || [],
            "admin-units-section"
          );

          renderBookings(res?.data?.["$values"] || [], "admin-units-section");
        } else if (target === "feedback") {
          section?.classList.remove("hidden");
          const res = await getAllFeedback();
          renderRecentFeedback(
            res?.data?.["$values"] || [],
            "admin-units-section"
          );
        } else if (target === "universities") {
          section?.classList.remove("hidden");
          const res = await getAllUniversities();
          renderUniversities(res?.data?.["$values"] || []);
        } else if (target === "colleges") {
          section?.classList.remove("hidden");
          const res = await getAllColleges();
          renderColleges(res?.data?.["$values"] || []);
        } else if (target === "admins") {
          section?.classList.remove("hidden");
          const res = await getAllAdmins();
          renderAdmins(res?.data?.["$values"] || []);
        }
      } catch (err) {
        console.error(`Failed to fetch ${target} data:`, err);
        showToast(`Error loading ${target}`, "error");
      }
    });
  });
}

function renderAdminUnits(units) {
  const section = document.getElementById("admin-units-section");
  section.innerHTML = units
    .map(
      (u) => `
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">${
            u.title
          }</h3>
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">${
            u.status
          }</span>
        </div>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span><strong>Address:</strong> ${u.address}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span><strong>Status:</strong> <span class="${
              u.status === "Available"
                ? "text-green-600 dark:text-green-400"
                : u.status === "Pending"
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400"
            }">${u.status}</span></span>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button data-id="${
            u.id
          }" class="view-unit-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            View
          </button>
          <button data-id="${
            u.id
          }" class="edit-unit-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            Edit
          </button>
          <button data-id="${u.id}" class="toggle-approve-btn px-3 py-1 ${
        u.status === "Pending"
          ? "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          : "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600"
      } text-white rounded-md transition-colors text-sm">
            ${u.status === "Pending" ? "Approve" : "Disapprove"}
          </button>
          <button data-id="${
            u.id
          }" class="delete-unit-btn px-3 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md transition-colors text-sm">
            Delete
          </button>
        </div>
      </div>
    `
    )
    .join("");

  section.querySelectorAll(".toggle-approve-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        await approveUnit(id);
        showToast("Unit status updated", "success");
        initAdminDashboard();
      } catch (err) {
        console.error("Failed to toggle approval", err);
        showToast("Error updating unit status", "error");
      }
    });
  });

  section.querySelectorAll(".delete-unit-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        await deleteUnit(id);
        showToast("Unit deleted", "success");
        initAdminDashboard();
      } catch (err) {
        console.error("Failed to delete unit", err);
        showToast("Error deleting unit", "error");
      }
    });
  });

  section.querySelectorAll(".edit-unit-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getUnit(id);
        const unit = res.data;
        createEditModal(
          id,
          { title: unit.title, address: unit.address, status: unit.status },
          "Unit",
          editUnit
        );
      } catch (err) {
        console.error("Failed to fetch unit for editing", err);
        showToast("Error loading unit data", "error");
      }
    });
  });

  section.querySelectorAll(".view-unit-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getUnit(id);
        const unit = res.data;
        createViewModal(
          {
            title: unit.title,
            address: unit.address,
            status: unit.status,
            priceForMonth: unit.priceForMonth,
            ownerName: unit.ownerName,
          },
          "Unit"
        );
      } catch (err) {
        console.error("Failed to view unit", err);
        showToast("Error viewing unit", "error");
      }
    });
  });
}

function renderBookings(bookings, targetId = "admin-units-section") {
  const section = document.getElementById(targetId);
  section.innerHTML =
    bookings.length > 0
      ? bookings
          .map(
            (b) => `
          <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">Booking ID: ${
                b.id
              }</h3>
              <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Booking</span>
            </div>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span><strong>Student ID:</strong> ${
                  b.studentId_FK || "N/A"
                }</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4" />
                </svg>
                <span><strong>Unit ID:</strong> ${b.unitId_FK || "N/A"}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span><strong>Booked On:</strong> ${
                  b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : "N/A"
                }</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Status:</strong> <span class="${
                  b.status === "Confirmed"
                    ? "text-green-600 dark:text-green-400"
                    : b.status === "Pending"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }">${b.status || "N/A"}</span></span>
              </div>
            </div>
            <div class="mt-4 flex justify-end gap-2">
              <button data-id="${
                b.id
              }" class="view-booking-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
                View
              </button>
              <button data-id="${
                b.id
              }" class="delete-booking-btn px-3 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md transition-colors text-sm">
                Delete
              </button>
            </div>
          </div>
        `
          )
          .join("")
      : `
      <div class="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        No bookings available
      </div>
    `;

  section.querySelectorAll(".delete-booking-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await deleteBookUnits(btn.dataset.id);
        showToast("Booking deleted", "success");
        initAdminDashboard();
      } catch (err) {
        console.error("Failed to delete booking:", err);
        showToast("Error deleting booking", "error");
      }
    });
  });

  section.querySelectorAll(".view-booking-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getAllBookUnits();
        const booking = res.data["$values"].find((b) => b.id == id);
        createViewModal(
          {
            id: booking.id,
            studentId_FK: booking.studentId_FK,
            unitId_FK: booking.unitId_FK,
            createdAt: booking.createdAt
              ? new Date(booking.createdAt).toLocaleDateString()
              : "N/A",
            status: booking.status,
          },
          "Booking"
        );
      } catch (err) {
        console.error("Failed to view booking", err);
        showToast("Error viewing booking", "error");
      }
    });
  });
}

function renderStudents(students) {
  const section = document.getElementById("admin-units-section");
  section.innerHTML = students
    .map(
      (s) => `
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">${
            s.name
          }</h3>
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Student</span>
        </div>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span><strong>Email:</strong> ${s.email}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span><strong>Phone:</strong> ${s.phoneNumber}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span><strong>Username:</strong> ${s.userName}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span><strong>Address:</strong> ${s.address}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span><strong>University:</strong> ${s.universityName}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span><strong>College:</strong> ${s.collegeName}</span>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
            <strong>Booked Units:</strong> ${
              s.bookedUnits?.["$values"]?.length > 0
                ? s.bookedUnits["$values"]
                    .map(
                      (unit) =>
                        `<span class="inline-block bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full mr-1">${unit}</span>`
                    )
                    .join("")
                : '<span class="text-gray-500 dark:text-gray-400">No units booked</span>'
            }
          </p>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button data-id="${
            s.id
          }" class="view-student-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            View
          </button>
          <button data-id="${
            s.id
          }" class="edit-student-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            Edit
          </button>
          <button data-id="${
            s.id
          }" class="delete-student-btn px-3 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md transition-colors text-sm">
            Delete
          </button>
        </div>
      </div>
    `
    )
    .join("");

  section.querySelectorAll(".delete-student-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        await deleteStudent(id);
        showToast("Student deleted", "success");
        initAdminDashboard();
      } catch (err) {
        console.error("Failed to delete student", err);
        showToast("Error deleting student", "error");
      }
    });
  });

  section.querySelectorAll(".edit-student-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getAllStudents();
        const student = res.data["$values"].find((s) => s.id == id);
        createEditModal(
          id,
          {
            name: student.name,
            email: student.email,
            phoneNumber: student.phoneNumber,
            userName: student.userName,
            address: student.address,
            universityName: student.universityName,
            collegeName: student.collegeName,
          },
          "Student",
          editStudent
        );
      } catch (err) {
        console.error("Failed to fetch student for editing", err);
        showToast("Error loading student data", "error");
      }
    });
  });

  section.querySelectorAll(".view-student-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getAllStudents();
        const student = res.data["$values"].find((s) => s.id == id);
        createViewModal(
          {
            name: student.name,
            email: student.email,
            phoneNumber: student.phoneNumber,
            userName: student.userName,
            address: student.address,
            universityName: student.universityName,
            collegeName: student.collegeName,
            bookedUnits: student.bookedUnits?.["$values"]?.join(", ") || "None",
          },
          "Student"
        );
      } catch (err) {
        console.error("Failed to view student", err);
        showToast("Error viewing student", "error");
      }
    });
  });
}

function renderRecentFeedback(feedback, targetId = "admin-units-section") {
  const section = document.getElementById(targetId);
  section.innerHTML =
    feedback.length > 0
      ? feedback
          .map(
            (f) => `
          <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">Feedback ID: ${
                f.id
              }</h2>
              <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Feedback</span>
            </div>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span><strong>Comment:</strong> ${
                  f.comment || "No comment provided"
                }</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Submitted:</strong> ${
                  f.createdAt
                    ? new Date(f.createdAt).toLocaleDateString()
                    : "N/A"
                }</span>
              </div>
            </div>
            <div class="mt-4 flex justify-end gap-2">
              <button data-id="${
                f.id
              }" class="view-feedback-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
                View
              </button>
              <button data-id="${
                f.id
              }" class="delete-feedback-btn px-3 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md transition-colors text-sm">
                Delete
              </button>
            </div>
          </div>
        `
          )
          .join("")
      : `
      <div class="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        No feedback available
      </div>
    `;

  section.querySelectorAll(".delete-feedback-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await deleteFeedback(btn.dataset.id);
        showToast("Feedback deleted", "success");
        initAdminDashboard();
      } catch (err) {
        console.error("Failed to delete feedback:", err);
        showToast("Error deleting feedback", "error");
      }
    });
  });

  section.querySelectorAll(".view-feedback-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getAllFeedback();
        const feedback = res.data["$values"].find((f) => f.id == id);
        createViewModal(
          {
            id: feedback.id,
            comment: feedback.comment,
            createdAt: feedback.createdAt
              ? new Date(feedback.createdAt).toLocaleDateString()
              : "N/A",
          },
          "Feedback"
        );
      } catch (err) {
        console.error("Failed to view feedback", err);
        showToast("Error viewing feedback", "error");
      }
    });
  });
}

function renderUniversities(universities) {
  const section = document.getElementById("admin-units-section");
  section.innerHTML = universities
    .map(
      (u) => `
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">${
            u.name || u.id
          }</h3>
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">University</span>
        </div>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span><strong>Name:</strong> ${u.name || "N/A"}</span>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button data-id="${
            u.id
          }" class="view-university-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            View
          </button>
          <button data-id="${
            u.id
          }" class="edit-university-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            Edit
          </button>
          <button data-id="${
            u.id
          }" class="delete-university-btn px-3 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md transition-colors text-sm">
            Delete
          </button>
        </div>
      </div>
    `
    )
    .join("");

  section.querySelectorAll(".delete-university-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await deleteUniversity(btn.dataset.id);
        showToast("University deleted", "success");
        initAdminDashboard();
      } catch (err) {
        console.error("Failed to delete university:", err);
        showToast("Error deleting university", "error");
      }
    });
  });

  section.querySelectorAll(".edit-university-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getAllUniversities();
        const university = res.data["$values"].find((u) => u.id == id);
        createEditModal(
          id,
          { name: university.name },
          "University",
          editUniversity
        );
      } catch (err) {
        console.error("Failed to fetch university for editing", err);
        showToast("Error loading university data", "error");
      }
    });
  });

  section.querySelectorAll(".view-university-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getAllUniversities();
        const university = res.data["$values"].find((u) => u.id == id);
        createViewModal({ name: university.name }, "University");
      } catch (err) {
        console.error("Failed to view university", err);
        showToast("Error viewing university", "error");
      }
    });
  });
}

function renderColleges(colleges) {
  const section = document.getElementById("admin-units-section");
  section.innerHTML = colleges
    .map(
      (c) => `
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">${
            c.name || c.id
          }</h3>
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">College</span>
        </div>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span><strong>Name:</strong> ${c.name || "N/A"}</span>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button data-id="${
            c.id
          }" class="view-college-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            View
          </button>
          <button data-id="${
            c.id
          }" class="edit-college-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            Edit
          </button>
          <button data-id="${
            c.id
          }" class="delete-college-btn px-3 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md transition-colors text-sm">
            Delete
          </button>
        </div>
      </div>
    `
    )
    .join("");

  section.querySelectorAll(".delete-college-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await deleteCollege(btn.dataset.id);
        showToast("College deleted", "success");
        initAdminDashboard();
      } catch (err) {
        console.error("Failed to delete college:", err);
        showToast("Error deleting college", "error");
      }
    });
  });

  section.querySelectorAll(".edit-college-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getAllColleges();
        const college = res.data["$values"].find((c) => c.id == id);
        createEditModal(id, { name: college.name }, "College", editCollege);
      } catch (err) {
        console.error("Failed to fetch college for editing", err);
        showToast("Error loading college data", "error");
      }
    });
  });

  section.querySelectorAll(".view-college-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      try {
        const res = await getAllColleges();
        const college = res.data["$values"].find((c) => c.id == id);
        createViewModal({ name: college.name }, "College");
      } catch (err) {
        console.error("Failed to view college", err);
        showToast("Error viewing college", "error");
      }
    });
  });
}

function renderAdmins(admins) {
  const section = document.getElementById("admin-units-section");
  section.innerHTML = admins
    .map(
      (a) => `
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">${
            a.name || a.id
          }</h3>
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Admin</span>
        </div>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span><strong>Email:</strong> ${a.email || "N/A"}</span>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button data-id="${
            a.id
          }" class="edit-admin-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            Edit
          </button>
          <button data-id="${
            a.id
          }" class="delete-admin-btn px-3 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md transition-colors text-sm">
            Delete
          </button>
        </div>
      </div>
    `
    )
    .join("");

  section.querySelectorAll(".delete-admin-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await deleteAdmin(btn.dataset.id);
        showToast("Admin deleted", "success");
        initAdminDashboard();
      } catch (err) {
        console.error("Failed to delete admin:", err);
        showToast("Error deleting admin", "error");
      }
    });
  });
}

function renderPayments(payments) {
  const section = document.getElementById("admin-units-section");
  section.innerHTML = payments
    .map(
      (p) => `
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">Payment ID: ${
            p.id
          }</h3>
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Payment</span>
        </div>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span><strong>Booking ID:</strong> ${p.bookingId || "N/A"}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span><strong>Amount:</strong> ${p.amount || "N/A"}</span>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button data-id="${
            p.id
          }" class="view-payment-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
            View
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

function renderUnitsForBookings(units, targetId = "admin-units-section") {
  const section = document.getElementById(targetId);
  section.innerHTML =
    units.length > 0
      ? units
          .map(
            (u) => `
          <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">${
                u.title
              }</h3>
              <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Unit</span>
            </div>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span><strong>Address:</strong> ${u.address || "N/A"}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span><strong>Price/Month:</strong> ${
                  u.priceForMonth || "N/A"
                } EGP</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Status:</strong> <span class="${
                  u.status === "Approved"
                    ? "text-green-600 dark:text-green-400"
                    : u.status === "Pending"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }">${u.status || "N/A"}</span></span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span><strong>Owner:</strong> ${u.ownerName || "N/A"}</span>
              </div>
            </div>
            <div class="mt-4 flex justify-end gap-2">
              <button data-id="${
                u.id
              }" class="view-unit-btn px-3 py-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors text-sm">
                View
              </button>
              <button data-id="${
                u.id
              }" class="delete-unit-btn px-3 py-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md transition-colors text-sm">
                Delete
              </button>
            </div>
          </div>
        `
          )
          .join("")
      : `
      <div class="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        No units available
      </div>
    `;

  section.querySelectorAll(".delete-unit-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await deleteUnit(btn.dataset.id);
        showToast("Unit deleted", "success");
        initAdminDashboard();
      } catch (err) {
        console.error("Failed to delete unit:", err);
        showToast("Error deleting unit", "error");
      }
    });
  });

  section.querySelectorAll(".view-unit-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const res = await getUnit(btn.dataset.id);
        showToast(`Viewing unit ${res.data.title}`, "info");
        // Placeholder for detailed view (e.g., modal)
      } catch (err) {
        console.error("Failed to view unit:", err);
        showToast("Error viewing unit", "error");
      }
    });
  });
}
