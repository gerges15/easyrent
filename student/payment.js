document.addEventListener("DOMContentLoaded", () => {
  let currentPaymentMethod = "vodafone";
  const exchangeRates = { USD: 1.0, EGP: 30.9, SAR: 3.75 };

  // Handle payment method selection
  document.querySelectorAll(".payment-card").forEach((card) => {
    card.addEventListener("click", () => {
      document
        .querySelectorAll(".payment-card")
        .forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      currentPaymentMethod = card.dataset.method;
      updatePaymentForm(currentPaymentMethod);
    });
  });

  // Update payment form based on selected method
  function updatePaymentForm(method) {
    document.querySelectorAll(".method-section").forEach((section) => {
      section.style.display =
        section.dataset.method === method ? "block" : "none";
    });
    updateSubmitButtonText(method);
  }

  // API Endpoints
  const API_BASE_URL = "https://easyrentapi0.runasp.net/api";
  const API_ENDPOINTS = {
    BOOK_UNIT: `${API_BASE_URL}/Booking/BookUnit`,
    GET_BOOKING: `${API_BASE_URL}/Booking/GetBooking`,
    UPDATE_BOOKING: `${API_BASE_URL}/Booking/UpdateBooking`,
    CREATE_PAYMENT: `${API_BASE_URL}/Payment/CreatePayment`,
    PROCESS_PAYMENT: `${API_BASE_URL}/Payment/ProcessPayment`,
    GET_PAYMENT_STATUS: `${API_BASE_URL}/Payment/GetPaymentStatus`,
    VERIFY_PAYMENT: `${API_BASE_URL}/Payment/VerifyPayment`,
  };

  // API Functions
  async function createBooking(bookingData) {
    try {
      const response = await fetch(API_ENDPOINTS.BOOK_UNIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Booking request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  async function getBookingStatus(bookingId) {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_BOOKING}/${bookingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get booking status");
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting booking status:", error);
      throw error;
    }
  }

  async function updateBookingStatus(bookingId, status) {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.UPDATE_BOOKING}/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  }

  // Payment Functions
  async function createPayment(paymentData) {
    try {
      const response = await fetch(API_ENDPOINTS.CREATE_PAYMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: paymentData.bookingId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          paymentMethod: paymentData.paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment creation failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  }

  async function processPayment(paymentId, paymentDetails) {
    try {
      const response = await fetch(API_ENDPOINTS.PROCESS_PAYMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: paymentId,
          ...paymentDetails,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment processing failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error processing payment:", error);
      throw error;
    }
  }

  async function getPaymentStatus(paymentId) {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_PAYMENT_STATUS}/${paymentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get payment status");
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting payment status:", error);
      throw error;
    }
  }

  async function verifyPayment(paymentId, verificationData) {
    try {
      const response = await fetch(API_ENDPOINTS.VERIFY_PAYMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: paymentId,
          ...verificationData,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment verification failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  }

  // Update form submission to use new payment flow
  document
    .getElementById("paymentForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitButton = document.getElementById("submit-btn");
      submitButton.disabled = true;
      submitButton.innerHTML = '<div class="spinner"></div> Processing...';

      try {
        // Get form data
        const formData = {
          studentId: getCurrentStudentId(),
          unitId: getSelectedUnitId(),
          startDate: document.getElementById("startDate").value,
          endDate: document.getElementById("endDate").value,
          paymentMethod: currentPaymentMethod,
          amount: calculateAmount(),
          currency: document.getElementById("currency").value,
        };

        // Create booking
        const bookingResult = await createBooking(formData);

        if (bookingResult.success) {
          // Create payment
          const paymentResult = await createPayment({
            bookingId: bookingResult.bookingId,
            amount: formData.amount,
            currency: formData.currency,
            paymentMethod: formData.paymentMethod,
          });

          if (paymentResult.success) {
            // Handle different payment methods
            switch (currentPaymentMethod) {
              case "vodafone":
              case "etisalat":
              case "orange":
              case "fawry":
              case "aman":
                const processResult = await processPayment(
                  paymentResult.paymentId,
                  {
                    phoneNumber: document.getElementById(
                      `${currentPaymentMethod}Number`
                    ).value,
                  }
                );

                if (processResult.success) {
                  showSuccess(`
                  Payment code generated successfully!<br>
                  Code: ${processResult.code}<br>
                  Please use this code to complete your payment through your mobile wallet.
                `);
                }
                break;

              case "bank":
                const receiptFile =
                  document.getElementById("transferReceipt").files[0];
                if (receiptFile) {
                  const base64Receipt = await convertFileToBase64(receiptFile);
                  await verifyPayment(paymentResult.paymentId, {
                    receiptFile: base64Receipt,
                  });
                  showSuccess("Bank transfer receipt uploaded successfully!");
                }
                break;

              case "instapay":
                if (await handleInstapayPayment(paymentResult.paymentId)) {
                  currentPaymentId = paymentResult.paymentId;
                }
                break;
            }

            // Start polling payment status
            startPaymentStatusPolling(paymentResult.paymentId);
          }
        }
      } catch (error) {
        console.error("Payment error:", error);
        showError(error.message || "Payment failed. Please try again.");
      } finally {
        submitButton.disabled = false;
        updateSubmitButtonText(currentPaymentMethod);
      }
    });

  // Poll payment status
  function startPaymentStatusPolling(paymentId) {
    const pollInterval = setInterval(async () => {
      try {
        const statusResult = await getPaymentStatus(paymentId);
        if (statusResult.status === "COMPLETED") {
          clearInterval(pollInterval);
          showSuccess("Payment completed successfully!");
          generateReceipt(statusResult);
        } else if (statusResult.status === "FAILED") {
          clearInterval(pollInterval);
          showError("Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Error polling payment status:", error);
        clearInterval(pollInterval);
      }
    }, 5000); // Poll every 5 seconds

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 300000);
  }

  // Helper function to convert file to base64
  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // Generate receipt
  function generateReceipt(paymentData) {
    const receiptSection = document.getElementById("receiptSection");
    const receiptContent = document.getElementById("receiptContent");

    const receiptHTML = `
      <div class="receipt-details">
        <p><strong>Payment Method:</strong> ${paymentData.paymentMethod}</p>
        <p><strong>Amount:</strong> ${paymentData.currency} ${
      paymentData.amount
    }</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Booking Period:</strong> ${paymentData.startDate} to ${
      paymentData.endDate
    }</p>
        <p><strong>Reference Number:</strong> ${Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()}</p>
      </div>
    `;

    receiptContent.innerHTML = receiptHTML;
    receiptSection.style.display = "block";
  }

  // Update amount display
  function updateAmount() {
    const currency = document.getElementById("currency").value;
    const amount = calculateAmount();
    updateSubmitButtonText(currentPaymentMethod, amount, currency);
  }

  // Calculate amount
  function calculateAmount() {
    const baseAmount = 1250;
    const currency = document.getElementById("currency").value;
    return (baseAmount * exchangeRates[currency]).toFixed(2);
  }

  // Update submit button text
  function updateSubmitButtonText(method, amount, currency) {
    const submitBtn = document.getElementById("submit-btn");
    if (!submitBtn) return;

    const amt = amount || calculateAmount();
    const curr = currency || document.getElementById("currency").value;

    const buttonTexts = {
      vodafone: "Pay with Vodafone Cash",
      etisalat: "Pay with Etisalat Cash",
      orange: "Pay with Orange Cash",
      fawry: "Generate Fawry Code",
      aman: "Generate Aman Reference",
      meeza: "Pay with Meeza",
      bank: "Proceed with Bank Transfer",
      instapay: "Pay with InstaPay",
    };

    submitBtn.innerHTML = `
      <i class="fas fa-lock"></i> 
      ${buttonTexts[method] || "Proceed with Payment"} (${curr} ${amt})
    `;
  }

  // Show success message
  function showSuccess(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "alert alert-success";
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.querySelector(".payment-container").prepend(successDiv);

    // Remove after 5 seconds
    setTimeout(() => successDiv.remove(), 5000);
  }

  // Show error message
  function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    document.querySelector(".payment-container").prepend(errorDiv);

    // Remove after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
  }

  // Get current student ID
  function getCurrentStudentId() {
    return localStorage.getItem("studentId") || "0";
  }

  // Get selected unit ID
  function getSelectedUnitId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("unitId") || "0";
  }

  // Initialize the form
  document.getElementById("currency").addEventListener("change", updateAmount);
  updateAmount();
  updatePaymentForm(currentPaymentMethod);

  // Handle InstaPay specific functionality
  const otpContainer = document.getElementById("otpContainer");
  const otpInputs = document.querySelectorAll(".otp-input");
  const verifyOtpBtn = document.getElementById("verifyOtpBtn");
  const resendOtpBtn = document.getElementById("resendOtp");
  let otpResendTimer;

  // Handle OTP input behavior
  otpInputs.forEach((input, index) => {
    input.addEventListener("keyup", (e) => {
      if (e.key >= 0 && e.key <= 9) {
        if (index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
        validateOtpInputs();
      } else if (e.key === "Backspace") {
        if (index > 0) {
          otpInputs[index - 1].focus();
        }
      }
    });

    input.addEventListener("keypress", (e) => {
      if (e.key < "0" || e.key > "9") {
        e.preventDefault();
      }
    });
  });

  // Validate OTP inputs
  function validateOtpInputs() {
    const isComplete = Array.from(otpInputs).every(
      (input) => input.value.length === 1
    );
    verifyOtpBtn.disabled = !isComplete;
  }

  // Handle InstaPay payment
  async function handleInstapayPayment(paymentId) {
    const mobileNumber = document.getElementById("instapayNumber").value;
    const nationalId = document.getElementById("instapayNationalId").value;

    try {
      // First step: Initialize InstaPay payment
      const initResult = await processPayment(paymentId, {
        phoneNumber: mobileNumber,
        nationalId: nationalId,
        method: "instapay",
      });

      if (initResult.success) {
        // Show OTP verification modal
        showOtpVerification();
        startResendTimer();
        return true;
      }
      return false;
    } catch (error) {
      console.error("InstaPay payment error:", error);
      showError("InstaPay payment initialization failed. Please try again.");
      return false;
    }
  }

  // Show OTP verification modal
  function showOtpVerification() {
    otpContainer.style.display = "flex";
    otpInputs[0].focus();
    verifyOtpBtn.disabled = true;
  }

  // Hide OTP verification modal
  function hideOtpVerification() {
    otpContainer.style.display = "none";
    otpInputs.forEach((input) => (input.value = ""));
  }

  // Start resend timer
  function startResendTimer() {
    let timeLeft = 30;
    resendOtpBtn.style.pointerEvents = "none";
    resendOtpBtn.style.opacity = "0.5";

    otpResendTimer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(otpResendTimer);
        resendOtpBtn.textContent = "Resend Code";
        resendOtpBtn.style.pointerEvents = "auto";
        resendOtpBtn.style.opacity = "1";
      } else {
        resendOtpBtn.textContent = `Resend Code (${timeLeft}s)`;
        timeLeft--;
      }
    }, 1000);
  }

  // Handle OTP verification
  verifyOtpBtn.addEventListener("click", async () => {
    const otp = Array.from(otpInputs)
      .map((input) => input.value)
      .join("");
    verifyOtpBtn.disabled = true;
    verifyOtpBtn.innerHTML = '<div class="spinner"></div> Verifying...';

    try {
      const verificationResult = await verifyPayment(currentPaymentId, {
        otp: otp,
        method: "instapay",
      });

      if (verificationResult.success) {
        hideOtpVerification();
        showSuccess("InstaPay payment verified successfully!");
        // Start polling for payment status
        startPaymentStatusPolling(currentPaymentId);
      } else {
        showError("Invalid verification code. Please try again.");
        otpInputs.forEach((input) => (input.value = ""));
        otpInputs[0].focus();
      }
    } catch (error) {
      showError("Verification failed. Please try again.");
    } finally {
      verifyOtpBtn.disabled = false;
      verifyOtpBtn.innerHTML =
        '<i class="fas fa-check-circle"></i> Verify Code';
    }
  });

  // Handle resend OTP
  resendOtpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const resendResult = await processPayment(currentPaymentId, {
        phoneNumber: document.getElementById("instapayNumber").value,
        method: "instapay_resend",
      });

      if (resendResult.success) {
        showSuccess("Verification code resent successfully!");
        startResendTimer();
        otpInputs.forEach((input) => (input.value = ""));
        otpInputs[0].focus();
      }
    } catch (error) {
      showError("Failed to resend verification code. Please try again.");
    }
  });
});

// Download receipt
function downloadReceipt() {
  const content = document.getElementById("receiptContent").innerText;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
