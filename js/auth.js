import { _post } from "./apiClint.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const userTypeSelect = document.getElementById("userType");
  const userType = userTypeSelect.value;

  // Show error if no user type selected
  if (!userType) {
    document.getElementById("userTypeError").style.display = "block";
    userTypeSelect.classList.add("input-error");
    return;
  } else {
    document.getElementById("userTypeError").style.display = "none";
    userTypeSelect.classList.remove("input-error");
  }

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  console.log("Login data:", data);

  // Example request
  const response = await _post(`/api/${userType}/login`, data);

  if (response.ok) {
    // redirect or show success message
    document.getElementById("successMessage").style.display = "block";

    ////////////////////////////////////////////////////////////////
    // Redirect based on role
    ////////////////////////////////////////////////////////////////
    switch (data.userType) {
      case "Admin":
        window.location.href = "/admin-dashboard.html";
        break;
      case "Owner":
        window.location.href = "../owner/dashbord.html";
        break;
      case "Student":
        window.location.href = "../index.html";
        break;
    }
  } else {
    alert(response || "Login failed");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const loginForm = document.getElementById("loginForm");

  togglePasswordBtn.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePasswordBtn.textContent = type === "password" ? "Show" : "Hide";
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = document.getElementById("phone").value.trim();
    const password = passwordInput.value;

    if (!input || !password) {
      alert("Please fill in all fields");
      return;
    }
  });
});
function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";

  // Automatically hide the message after 5 seconds
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 5000);
}
