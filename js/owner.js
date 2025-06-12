import { _get, _put, _post } from "./apiClint.js";
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  const response = await _post("/api/Owner/register", data);
});

// إظهار وإخفاء كلمة السر
togglePasswordBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePasswordBtn.textContent = isPassword ? "Hide" : "Show";
});

// تحقق من صحة الإيميل
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// تحقق من صحة رقم الهاتف (بسيط)
function isValidPhone(phone) {
  const re = /^\+?\d{7,15}$/;
  return re.test(phone);
}
// دالة توليد كلمة مرور عشوائية
function generateRandomPassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// ربط زر توليد كلمة المرور
const generatePasswordBtn = document.getElementById("generatePasswordBtn");

generatePasswordBtn.addEventListener("click", () => {
  const newPassword = generateRandomPassword(12); // طول 12 حرف مثلاً
  passwordInput.value = newPassword;
  // غير نوع الحقل عشان يشوف المستخدم الباسورد الجديد (اختياري)
  passwordInput.type = "text";
  togglePasswordBtn.textContent = "Hide";
  updateSubmitButtonState();
});

// تحقق بسيط لتفعيل زر الإرسال
function canEnableSubmit() {
  const legalName = document.getElementById("legalName").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();

  return (
    legalName !== "" &&
    username !== "" &&
    isValidEmail(email) &&
    password.length >= 6 &&
    isValidPhone(phone) &&
    location !== ""
  );
}

function updateSubmitButtonState() {
  submitBtn.disabled = !canEnableSubmit();
}

// ربط التحقق على المدخلات
["legalName", "username", "email", "password", "phone", "location"].forEach(
  (id) => {
    document
      .getElementById(id)
      .addEventListener("input", updateSubmitButtonState);
  }
);

updateSubmitButtonState(); // تفعيل أولي

// التحقق من صحة النموذج وعرض رسائل الخطأ
function validateForm() {
  let isValid = true;
  document.querySelectorAll(".error-message").forEach((el) => {
    el.style.display = "none";
  });

  const legalName = document.getElementById("legalName").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();

  if (legalName === "") {
    document.getElementById("legalNameError").style.display = "block";
    isValid = false;
  }
  if (username === "") {
    document.getElementById("usernameError").style.display = "block";
    isValid = false;
  }
  if (!isValidEmail(email)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  }
  if (password.length < 6) {
    document.getElementById("passwordError").style.display = "block";
    isValid = false;
  }
  if (!isValidPhone(phone)) {
    document.getElementById("phoneError").style.display = "block";
    isValid = false;
  }
  if (location === "") {
    document.getElementById("locationError").style.display = "block";
    isValid = false;
  }

  return isValid;
}
