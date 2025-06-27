// utils/logout.js
export function logoutUser() {
  // Remove specific localStorage keys
  localStorage.removeItem("authToken");
  localStorage.removeItem("ownerId");
  localStorage.removeItem("userType");

  // Remove all cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  // Redirect or reload to login
  window.location.href = "/login"; // Adjust route if needed
}
