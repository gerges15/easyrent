import { _post } from "../../js/apiClint";
import { getAllColleges } from "../services/lib/colleges";
import { getAllUniversities } from "../services/lib/university";
import { navigate } from "../main";
import { registerOwner } from "../services/lib/owner";
import { registerStudent } from "../services/lib/student";
export default function SignUp() {
  return `
<main class="min-h-screen py-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
  <div class="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl space-y-6">
    <!-- Header -->
    <div class="text-center">
      <img src="/icon.png" alt="Logo" class="w-12 h-12 mx-auto rounded-full" />
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white mt-4">Create Account</h1>
    </div>

    <!-- Role Selection -->
    <div class="grid grid-cols-2 gap-4">
      <button id="selectStudent" class="bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 p-4 rounded-lg text-center">
        <i class="ri-graduation-cap-line text-2xl text-indigo-600 dark:text-indigo-300"></i>
        <p class="mt-2 text-indigo-700 dark:text-white font-semibold">Student</p>
      </button>
      <button id="selectOwner" class="bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 p-4 rounded-lg text-center">
        <i class="ri-building-line text-2xl text-yellow-600 dark:text-yellow-300"></i>
        <p class="mt-2 text-yellow-700 dark:text-white font-semibold">Owner</p>
      </button>
    </div>

    <!-- Student Form -->
   <form id="studentForm" class="space-y-4 hidden">
  <div>
    <label for="studentFullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
    <input type="text" id="studentFullName" class="w-full input" placeholder="Enter your full name" required />
  </div>

  <div>
    <label for="studentEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
    <input type="email" id="studentEmail" class="w-full input" placeholder="Enter your email" required />
  </div>

  <div>
    <label for="studentUserName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
    <input type="text" id="studentUserName" class="w-full input" placeholder="Choose a username" required />
  </div>

  <div class="relative">
    <label for="studentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
    <input type="password" id="studentPassword" class="w-full input pr-16" placeholder="Create a strong password" required />
    <button type="button" id="toggleStudentPassword" class="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500">
      <i class="fas fa-eye-slash"></i>
    </button>
    <button type="button" id="generateStudentPass" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 text-sm">
      Generate
    </button>
  </div>

  <div>
    <label for="studentPhone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
    <input type="tel" id="studentPhone" class="w-full input" placeholder="Enter phone number" required />
  </div>

  <div>
    <label for="studentAddress" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
    <input type="text" id="studentAddress" class="w-full input" placeholder="Enter your address" required />
  </div>

<div>
  <label for="universityId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">University</label>
  <select id="universityId" class="w-full input" required>
    <option disabled selected value="">Select your university</option>
  </select>
</div>

<div>
  <label for="collegeId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Faculty</label>
  <select id="collegeId" class="w-full input" required>
    <option disabled selected value="">Select your faculty</option>
  </select>
</div>

  <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
    Create Student Account
  </button>
</form>

    <!-- Owner Form -->
    <form id="ownerForm" class="space-y-4 hidden">
      <div>
        <label for="ownerLegalName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Legal Name</label>
        <input type="text" id="ownerLegalName" class="w-full input" placeholder="Full Name on ID" required />
      </div>
      <div>
        <label for="ownerUsername" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
        <input type="text" id="ownerUsername" class="w-full input" placeholder="Choose a username" required />
      </div>
      <div>
        <label for="ownerEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input type="email" id="ownerEmail" class="w-full input" placeholder="you@example.com" required />
      </div>
      <div>
        <label for="ownerPhone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
        <input type="tel" id="ownerPhone" class="w-full input" placeholder="Enter phone number" required />
      </div>
      <div>
        <label for="ownerLocation" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
        <input type="text" id="ownerLocation" class="w-full input" placeholder="City, Area" required />
      </div>
      <div class="relative">
        <label for="ownerPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <input type="password" id="ownerPassword" class="w-full input pr-16" placeholder="Enter your password" required />
        <button type="button" id="toggleOwnerPassword" class="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500">
          <i class="fas fa-eye-slash"></i>
        </button>
        <button type="button" id="generateOwnerPass" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 text-sm">
          Generate
        </button>
      </div>
      <button type="submit" class="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600">Create Owner Account</button>
    </form>
  </div>
</main>
`;
}

export function initSignUpEvents() {
  const studentBtn = document.getElementById("selectStudent");
  const ownerBtn = document.getElementById("selectOwner");
  const studentForm = document.getElementById("studentForm");
  const ownerForm = document.getElementById("ownerForm");

  const uniSelect = document.getElementById("universityId");
  const collegeSelect = document.getElementById("collegeId");

  let allColleges = [];

  // 1. Fetch and populate universities and colleges
  async function loadUniversitiesAndColleges() {
    const universitiesRes = await getAllUniversities();
    const collegesRes = await getAllColleges();

    const universities = universitiesRes.data["$values"];
    allColleges = collegesRes.data["$values"];

    // Populate university options
    universities.forEach((u) => {
      const option = document.createElement("option");
      option.value = u.id;
      option.textContent = u.name;
      uniSelect.appendChild(option);
    });
  }

  // 2. Filter colleges by selected university
  uniSelect?.addEventListener("change", () => {
    const selectedUniId = parseInt(uniSelect.value);
    collegeSelect.innerHTML = `<option disabled selected>Select your faculty</option>`;

    const filteredColleges = allColleges.filter(
      (c) =>
        c.universityName === uniSelect.options[uniSelect.selectedIndex].text
    );

    filteredColleges.forEach((c) => {
      const option = document.createElement("option");
      option.value = c.id;
      option.textContent = c.name;
      collegeSelect.appendChild(option);
    });
  });

  // 3. Handle student form submission
  studentForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentData = {
      name: document.getElementById("studentFullName").value,
      email: document.getElementById("studentEmail").value,
      userName: document.getElementById("studentUserName").value,
      password: document.getElementById("studentPassword").value,
      phoneNumber: document.getElementById("studentPhone").value,
      address: document.getElementById("studentAddress").value,
      universityId: parseInt(document.getElementById("universityId").value),
      collegeId: parseInt(document.getElementById("collegeId").value),
    };

    try {
      const response = await registerStudent(studentData);

      if (response.status === 200 || response.status === 201) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  });

  ownerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ownerData = {
      name: document.getElementById("ownerLegalName").value,
      email: document.getElementById("ownerEmail").value,
      userName: document.getElementById("ownerUsername").value,
      password: document.getElementById("ownerPassword").value,
      phoneNumber: document.getElementById("ownerPhone").value,
      address: document.getElementById("ownerLocation").value,
    };

    try {
      await registerOwner(ownerData);
      alert("Owner registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Owner registration failed:", err);
      alert(
        err?.response?.data?.message ||
          "Registration failed. Please check your input and try again."
      );
    }
  });

  // UI role switching
  const toggle = (formToShow, formToHide, activeBtn, inactiveBtn, color) => {
    formToShow.classList.remove("hidden");
    formToHide.classList.add("hidden");
    activeBtn.classList.add("ring-2", `ring-${color}-500`);
    inactiveBtn.classList.remove(
      "ring-2",
      `ring-${color === "indigo" ? "yellow" : "indigo"}-500`
    );
  };

  studentBtn?.addEventListener("click", () =>
    toggle(studentForm, ownerForm, studentBtn, ownerBtn, "indigo")
  );
  ownerBtn?.addEventListener("click", () =>
    toggle(ownerForm, studentForm, ownerBtn, studentBtn, "yellow")
  );

  // Password toggle and generator
  const setupToggle = (inputId, toggleBtnId) => {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(toggleBtnId);
    btn?.addEventListener("click", () => {
      if (!input) return;
      const icon = btn.querySelector("i");
      const type = input.type === "password" ? "text" : "password";
      input.type = type;
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  };

  setupToggle("studentPassword", "toggleStudentPassword");

  document
    .getElementById("generateStudentPass")
    ?.addEventListener("click", () => {
      const input = document.getElementById("studentPassword");
      if (input) input.value = generatePassword();
    });

  function generatePassword() {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    return Array.from(
      { length: 12 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }

  studentBtn?.click();
  loadUniversitiesAndColleges();
}
