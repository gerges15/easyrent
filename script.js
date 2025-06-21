document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const menuBtn = document.querySelector("#menu-btn");
  const navLinks = document.querySelector("#nav-links");
  const navLinksItems = document.querySelectorAll(".nav__links a");

  // Toggle mobile menu
  menuBtn?.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest("#menu-btn") &&
      !event.target.closest("#nav-links")
    ) {
      navLinks.classList.remove("open");
    }
  });

  // Handle navigation links
  navLinksItems.forEach((link) => {
    link.addEventListener("click", function (e) {
      const action = this.dataset.action;
      const section = this.dataset.section;

      // Remove active class from all links
      navLinksItems.forEach((item) => item.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Handle section navigation
      if (section) {
        e.preventDefault();
        const targetSection = document.querySelector(`#${section}`);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Handle special actions
      if (action) {
        switch (action) {
          case "login":
            // Let the default link behavior work (navigate to login.html)
            break;
          case "signup":
            // Let the default link behavior work (navigate to signup.html)
            break;
          case "add-property":
            // Let the default link behavior work (navigate to add property page)
            break;
        }
      }

      // Close mobile menu
      navLinks.classList.remove("open");
    });
  });

  // Set active link based on current section
  function setActiveLink() {
    const scrollPosition = window.scrollY;

    // Check each section
    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinksItems.forEach((link) => {
          link.classList.remove("active");
          if (link.dataset.section === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Update active link on scroll
  window.addEventListener("scroll", setActiveLink);

  // Set initial active link
  setActiveLink();

  // Function to handle login
  function handleLogin() {
    // Create modal container
    const modalHtml = `
      <div class="modal" id="loginModal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2>Login</h2>
          <form id="loginForm">
            <div class="form-group">
              <input type="email" id="loginEmail" placeholder="Email" required>
            </div>
            <div class="form-group">
              <input type="password" id="loginPassword" placeholder="Password" required>
            </div>
            <button type="submit" class="btn">Login</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    const modal = document.getElementById("loginModal");
    const closeBtn = modal.querySelector(".close-modal");

    modal.style.display = "block";

    closeBtn.onclick = function () {
      modal.remove();
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.remove();
      }
    };

    const loginForm = document.getElementById("loginForm");
    loginForm.onsubmit = function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      // Add your login logic here
      console.log("Login attempt:", { email, password });
      modal.remove();
    };
  }

  // Function to handle signup
  function handleSignup() {
    const modalHtml = `
      <div class="modal" id="signupModal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2>Sign Up</h2>
          <form id="signupForm">
            <div class="form-group">
              <input type="text" id="signupName" placeholder="Full Name" required>
            </div>
            <div class="form-group">
              <input type="email" id="signupEmail" placeholder="Email" required>
            </div>
            <div class="form-group">
              <input type="password" id="signupPassword" placeholder="Password" required>
            </div>
            <div class="form-group">
              <input type="password" id="signupConfirmPassword" placeholder="Confirm Password" required>
            </div>
            <button type="submit" class="btn">Sign Up</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    const modal = document.getElementById("signupModal");
    const closeBtn = modal.querySelector(".close-modal");

    modal.style.display = "block";

    closeBtn.onclick = function () {
      modal.remove();
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.remove();
      }
    };

    const signupForm = document.getElementById("signupForm");
    signupForm.onsubmit = function (e) {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById(
        "signupConfirmPassword"
      ).value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Add your signup logic here
      console.log("Signup attempt:", { name, email, password });
      modal.remove();
    };
  }

  // Function to handle add property
  function handleAddProperty() {
    const modalHtml = `
      <div class="modal" id="propertyModal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2>Add Property</h2>
          <form id="propertyForm">
            <div class="form-group">
              <input type="text" id="propertyTitle" placeholder="Property Title" required>
            </div>
            <div class="form-group">
              <input type="text" id="propertyLocation" placeholder="Location" required>
            </div>
            <div class="form-group">
              <input type="number" id="propertyPrice" placeholder="Price" required>
            </div>
            <div class="form-group">
              <select id="propertyType" required>
                <option value="">Select Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div class="form-group">
              <textarea id="propertyDescription" placeholder="Description" required></textarea>
            </div>
            <button type="submit" class="btn">Add Property</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    const modal = document.getElementById("propertyModal");
    const closeBtn = modal.querySelector(".close-modal");

    modal.style.display = "block";

    closeBtn.onclick = function () {
      modal.remove();
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.remove();
      }
    };

    const propertyForm = document.getElementById("propertyForm");
    propertyForm.onsubmit = function (e) {
      e.preventDefault();
      const title = document.getElementById("propertyTitle").value;
      const location = document.getElementById("propertyLocation").value;
      const price = document.getElementById("propertyPrice").value;
      const type = document.getElementById("propertyType").value;
      const description = document.getElementById("propertyDescription").value;

      // Add your property submission logic here
      console.log("Property submission:", {
        title,
        location,
        price,
        type,
        description,
      });
      modal.remove();
    };
  }
});
// اجعلها متاحة عالميًا
window.handleLogout = async function () {
  const studentId = localStorage.getItem("studentId");
  
  const result = await showConfirmDialog({
    title: "Logout Confirmation",
    message: "Would you like to delete your account permanently?",
    confirmText: "Yes, Delete My Account",
    cancelText: "No, Just Logout"
  });

  if (result === "delete") {
    try {
      const response = await fetch(`https://easyrentapi0.runasp.net/api/Student/${studentId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      alert("Your account has been successfully deleted");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account");
    }
  }

  localStorage.clear();
  window.location.href = "login.html";
};

function showConfirmDialog({ title, message, confirmText, cancelText }) {
  return new Promise((resolve) => {
    const dialogHTML = `
      <div class="confirm-dialog" id="logoutDialog">
        <div class="confirm-dialog-content">
          <h3>${title}</h3>
          <p>${message}</p>
          <div class="confirm-dialog-buttons">
            <button class="delete-btn" onclick="document.getElementById('logoutDialog').remove(); window.confirmDialogCallback('delete')">
              ${confirmText}
            </button>
            <button class="cancel-btn" onclick="document.getElementById('logoutDialog').remove(); window.confirmDialogCallback('logout')">
              ${cancelText}
            </button>
          </div>
        </div>
      </div>
    `;

    const styleSheet = `
      <style>
        .confirm-dialog {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .confirm-dialog-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 400px;
          width: 90%;
          text-align: center;
        }
        .confirm-dialog h3 {
          margin: 0 0 15px;
          color: #333;
        }
        .confirm-dialog p {
          margin: 0 0 20px;
          color: #666;
        }
        .confirm-dialog-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .delete-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-btn:hover {
          background: #c82333;
        }
        .cancel-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .cancel-btn:hover {
          background: #5a6268;
        }
      </style>
    `;

    document.body.insertAdjacentHTML('beforeend', dialogHTML + styleSheet);
    window.confirmDialogCallback = resolve;
  });
}
window.handleSignup = handleSignup;
