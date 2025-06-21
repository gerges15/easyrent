// js/cookie-consent.js
// js/cookie-consent.js

export function initCookieConsent() {
  if (localStorage.getItem("cookieConsent") === "true") return;

  const consentBox = document.createElement("div");
  consentBox.className = "cookie-consent";
  consentBox.innerHTML = `
    <p>We use cookies to enhance your experience. By using our site, you agree to our use of cookies.</p>
    <button id="acceptCookies">Accept</button>
  `;

  document.body.appendChild(consentBox);

  document.getElementById("acceptCookies").addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "true");
    consentBox.remove();
  });
}
