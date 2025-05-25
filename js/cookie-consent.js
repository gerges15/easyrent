// js/cookie-consent.js
// js/cookie-consent.js

export function initCookieConsent() {
  if (localStorage.getItem("cookieConsent") === "true") return;

  const consentBox = document.createElement("div");
  consentBox.className = "cookie-consent";
  consentBox.innerHTML = `
    <p>نحن نستخدم ملفات تعريف الارتباط (كوكيز) لتحسين تجربتك. باستخدامك للموقع، فأنت توافق على استخدامنا للكوكيز.</p>
    <button id="acceptCookies">Accept</button>
  `;

  document.body.appendChild(consentBox);

  document.getElementById("acceptCookies").addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "true");
    consentBox.remove();
  });
}
