document.addEventListener("DOMContentLoaded", () => {
  const stripe = Stripe("pk_test_your_publishable_key_here");
  let elements, cardElement;
  let currentPaymentMethod = "card";
  const exchangeRates = { USD: 1.0, EGP: 30.9, SAR: 3.75 };

  // تهيئة Stripe Elements
  function initializeStripe() {
    elements = stripe.elements();
    const cardOptions = {
      style: {
        base: {
          fontSize: "16px",
          color: "#495057",
          "::placeholder": { color: "#aab7c4" },
        },
        invalid: { color: "#dc3545" },
      },
    };

    cardElement = elements.create("card", cardOptions);
    cardElement.mount("#card-element");

    cardElement.on("change", (event) => {
      const displayError = document.getElementById("card-errors");
      displayError.textContent = event.error?.message || "";
    });
  }

  // إدارة طرق الدفع
  document.querySelectorAll(".payment-card").forEach((card) => {
    card.addEventListener("click", () => {
      document
        .querySelectorAll(".payment-card")
        .forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      currentPaymentMethod = card.dataset.method;

      document.querySelectorAll(".method-section").forEach((section) => {
        section.style.display =
          section.dataset.method === currentPaymentMethod ? "block" : "none";
      });

      if (currentPaymentMethod === "card") initializeStripe();
    });
  });

  // تحديث المبلغ
  function updateAmount() {
    const currency = document.getElementById("currency").value;
    const amount = (1250 * exchangeRates[currency]).toFixed(2);
    document.getElementById("submit-btn").innerHTML = `
      <i class="fas fa-lock"></i> Secure Payment (${currency} ${amount})
    `;
  }

  // التحقق من الحقول
  function validateField(field) {
    const errorElement = field.parentElement.querySelector(".error");
    if (!field.checkValidity()) {
      errorElement.textContent = field.validationMessage;
      return false;
    }
    errorElement.textContent = "";
    return true;
  }

  // معالجة الإرسال
  document
    .getElementById("paymentForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      showLoading(true);

      try {
        // التحقق من جميع الحقول
        const isValid = Array.from(e.target.elements).every((element) => {
          return element.tagName === "INPUT" ? validateField(element) : true;
        });
        if (!isValid) throw new Error("Please fill all required fields");

        let paymentResult;
        switch (currentPaymentMethod) {
          case "card":
            const { paymentMethod, error } = await stripe.createPaymentMethod({
              type: "card",
              card: cardElement,
            });
            if (error) throw error;
            paymentResult = await processPayment(paymentMethod.id);
            break;

          case "instapay":
            paymentResult = await processInstapay();
            break;

          case "feza":
            paymentResult = await processFeza();
            break;
        }

        showReceipt(paymentResult);
      } catch (error) {
        document.getElementById("payment-errors").textContent = error.message;
      } finally {
        showLoading(false);
      }
    });

  // وظائف مساعدة
  async function processPayment(paymentMethodId) {
    const response = await fetch("/process-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethodId,
        amount: 1250 * exchangeRates[document.getElementById("currency").value],
        currency: document.getElementById("currency").value,
      }),
    });

    if (!response.ok) throw new Error("Payment processing failed");
    return await response.json();
  }

  function showLoading(show) {
    const btn = document.getElementById("submit-btn");
    btn.disabled = show;
    btn.innerHTML = show
      ? '<div class="spinner"></div> Processing...'
      : `<i class="fas fa-lock"></i> Secure Payment (${
          document.getElementById("currency").value
        } ${(
          1250 * exchangeRates[document.getElementById("currency").value]
        ).toFixed(2)})`;
  }

  // التهيئة الأولية
  initializeStripe();
  document.getElementById("currency").addEventListener("change", updateAmount);
  updateAmount();
});

function showLoading(show) {
  const btn = document.getElementById("submit-btn");
  btn.disabled = show;
  btn.innerHTML = show
    ? '<div class="spinner"></div> Processing...'
    : "Secure Payment";
}
function downloadReceipt() {
  const content = document.getElementById("receiptContent").innerText;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt-${Date.now()}.txt`;
  a.click();
}
