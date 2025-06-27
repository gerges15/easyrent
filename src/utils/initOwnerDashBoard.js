import dashboardView from "../components/views/dashboardView.js";
import addPropertyView from "../components/views/addPropertyView.js";
import myPropertiesView from "../components/views/myPropertiesView.js";
import OwnerDashboard from "../pages/owner.js";
import { createThemeToggle } from "../components/themeToggle.js";
import Cookies from "js-cookie";
import { logoutUser } from "./logout.js";
import { addNewUnit, getAllUnits } from "../services/lib/unit.js";

export function initOwnerDashboard() {
  // Render the base layout first
  document.body.innerHTML = OwnerDashboard();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
    });
  }
  const userData = JSON.parse(Cookies.get("userData"));
  const token = localStorage.getItem("token");
  const ownerId = userData.id;

  const main = document.querySelector("main");
  const authStatus = document.getElementById("auth-status");
  const themeMount = document.querySelector("#theme-toggle");
  // Mount theme toggle
  if (themeMount) themeMount.appendChild(createThemeToggle());

  // Simple view router
  const routes = {
    dashboard: () => {
      main.innerHTML = dashboardView();
      if (token && ownerId) {
        loadOwnerData(ownerId, token);
      }
    },
    add: () => {
      main.innerHTML = addPropertyView();

      const form = document.getElementById("addPropertyForm");
      if (form) {
        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const data = {
            title: document.getElementById("title").value,
            priceForMonth: Number(document.getElementById("price").value),
            address: document.getElementById("address").value,
            status: document.getElementById("status").value,
            photoUrls: [document.getElementById("photoUrls").value],
            ownerName: userData.name,
            ownerId_FK: ownerId,
          };

          try {
            await addNewUnit(data);
            alert("✅ Property added successfully!");
            form.reset();
            console.log(getAllUnits());
          } catch (error) {
            console.error("❌ Error adding property:", error);
            alert("Error adding property. Please try again.");
          }
        });
      }
    },
    myprops: () => {
      main.innerHTML = myPropertiesView();
      if (token && ownerId) {
        loadOwnerProperties(ownerId, token);
      }
    },
  };

  // Setup sidebar click handlers
  const sidebarItems = document.querySelectorAll(".sidebar li");

  sidebarItems.forEach((el, index) => {
    el.addEventListener("click", () => {
      // Remove active from all, add to clicked
      sidebarItems.forEach((li) => li.classList.remove("active"));
      el.classList.add("active");

      // Switch views
      switch (index) {
        case 0:
          routes.dashboard();
          break;
        case 1:
          routes.add();
          break;
        case 2:
          routes.myprops();
          break;
        default:
          main.innerHTML = "<p class='text-red-600'>Unknown route</p>";
      }
    });
  });

  // Default view
  routes.dashboard();

  // Auth indicator
  /*if (token && ownerId) {
    authStatus.innerHTML = `
      <span class='flex items-center gap-2 text-green-700 dark:text-green-400'>
        <i class="fas fa-user-check"></i> Owner ID: ${ownerId}
      </span>
    `;
  } else {
    authStatus.innerHTML = `
      <span class='flex items-center gap-2 text-yellow-600'>
        <i class="fas fa-user-slash"></i> Not Authenticated
      </span>
    `;
  }*/
  // ========== Dashboard Data ==========
  async function loadOwnerData(ownerId, token) {
    try {
      const res = await getAllUnits();
      const data = res;
      const units = res.data["$values"].filter(
        (property) => property.id == ownerId
      );
      document.getElementById("total-property").textContent = units.length;
      document.getElementById("to-rent").textContent = units.filter(
        (u) => u.status === "Pending"
      ).length;
      document.getElementById("booked-units").textContent = units.filter(
        (u) => u.status === "Rented"
      ).length;
    } catch (err) {
      console.error("Error loading real data", err);
    }
  }

  document.querySelector("button").addEventListener("click", logoutUser);
  // ========== My Properties ==========
  async function loadOwnerProperties(ownerId, token) {
    try {
      const res = await fetch(
        "https://easyrentapi0.runasp.net/api/Unit/GetAllUnits",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      const units =
        data["$values"]?.filter((u) => u.ownerId_FK == ownerId) || [];
      const container = document.getElementById("properties-list");

      container.innerHTML = units
        .map(
          (u) => `
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <img src="${
            u.photoUrls?.$values[0] || ""
          }" class="w-full h-40 object-cover rounded" />
          <h3 class="mt-3 text-lg font-semibold">${u.title}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">${u.address}</p>
          <p class="text-indigo-600 font-bold mt-2">${
            u.priceForMonth
          } EGP/month</p>
        </div>
      `
        )
        .join("");
    } catch (e) {
      console.error("Failed to load properties", e);
    }
  }
}
