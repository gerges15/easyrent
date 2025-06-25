import CookiesModal from "../components/Modals/CookiesModal";

export function initCookieConsent() {
  const alreadyAccepted = localStorage.getItem("cookiesAccepted");
  if (!alreadyAccepted) {
    // Append the modal only once to the DOM
    const modalWrapper = document.createElement("div");
    modalWrapper.innerHTML = CookiesModal();
    document.body.appendChild(modalWrapper);

    // Optional: animate entry
    setTimeout(() => {
      document.getElementById("cookieConsent").style.display = "block";
    }, 500);
  }
}

export function acceptCookies() {
  localStorage.setItem("cookiesAccepted", "true");
  const modal = document.getElementById("cookieConsent");
  if (modal) modal.remove();
}

export function rejectCookies() {
  localStorage.setItem("cookiesAccepted", "false");
  const modal = document.getElementById("cookieConsent");
  if (modal) modal.remove();
}
