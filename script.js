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
