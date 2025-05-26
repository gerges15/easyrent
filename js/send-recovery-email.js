import API from "./api.js";

const api = new API("http://easyrentapi0.runasp.net/api/v1");

class PasswordRecovery {
  constructor() {
    this.elements = {
      form: document.getElementById("verificationForm"),
      codeInput: document.getElementById("verificationCode"),
      nextBtn: document.getElementById("nextBtn"),
      errorMessage: document.getElementById("errorMessage"),
      resendButton: document.getElementById("resendButton"),
      countdown: document.getElementById("countdown"),
      loader: document.getElementById("loader"),
      displayEmail: document.getElementById("displayEmail"),
    };

    this.timeoutDuration = 60;
    this.remainingTime = 0;
    this.countdownInterval = null;
    this.maxRetries = 3;
    this.retryDelay = 1000;

    // محاولة استرداد البريد الإلكتروني من عدة مصادر
    this.email = this.getEmailFromMultipleSources();

    if (this.email) {
      // عرض البريد الإلكتروني في الواجهة
      this.displayEmailInUI(this.email);
      this.checkPreviousVerification();
    } else {
      // إذا لم يتم العثور على بريد إلكتروني، نعود للصفحة السابقة
      this.redirectToForgetPassword();
    }

    this.setupEventListeners();
    this.startInitialCountdown();
  }

  getEmailFromMultipleSources() {
    // 1. محاولة الحصول على البريد من URL
    const urlEmail = this.getEmailFromURL();
    if (urlEmail) return urlEmail;

    // 2. محاولة الحصول على البريد من localStorage
    const storedEmail = localStorage.getItem("recoveryEmail");
    if (storedEmail) return storedEmail;

    // 3. محاولة الحصول على البريد من sessionStorage
    const sessionEmail = sessionStorage.getItem("recoveryEmail");
    if (sessionEmail) return sessionEmail;

    return null;
  }

  displayEmailInUI(email) {
    if (!email) return;

    // حفظ البريد في localStorage للاستخدام لاحقاً
    localStorage.setItem("recoveryEmail", email);

    // عرض البريد المقنع في الواجهة
    const maskedEmail = this.maskEmail(email);
    this.elements.displayEmail.textContent = maskedEmail;

    // إضافة عنوان توضيحي
    const emailLabel = document.createElement("div");
    emailLabel.className = "email-label";
    emailLabel.textContent = "سيتم إرسال رمز التحقق إلى:";
    this.elements.displayEmail.parentNode.insertBefore(
      emailLabel,
      this.elements.displayEmail
    );
  }

  redirectToForgetPassword() {
    // تنظيف أي بيانات قديمة
    localStorage.removeItem("recoveryEmail");
    sessionStorage.removeItem("recoveryEmail");
    localStorage.removeItem("lastVerificationAttempt");
    localStorage.removeItem("lastCodeSentAt");

    // إعادة التوجيه مع رسالة توضيحية
    alert("الرجاء إدخال بريدك الإلكتروني أولاً");
    window.location.href = "forgetpass.html";
  }

  async checkPreviousVerification() {
    const lastAttempt = localStorage.getItem("lastVerificationAttempt");
    if (lastAttempt) {
      const { timestamp, email } = JSON.parse(lastAttempt);
      // التحقق مما إذا كان آخر محاولة منذ أقل من دقيقة ولنفس البريد الإلكتروني
      if (Date.now() - timestamp < 60000 && email === this.email) {
        this.startCountdown(60 - Math.floor((Date.now() - timestamp) / 1000));
      } else {
        localStorage.removeItem("lastVerificationAttempt");
      }
    }
  }

  setupEventListeners() {
    this.elements.codeInput.addEventListener("input", (e) => {
      const value = e.target.value;
      if (!/^\d*$/.test(value)) {
        e.target.value = value.replace(/[^\d]/g, "");
        return;
      }
      this.updateNextButtonState(value);
      if (value.length === 6) {
        this.verifyCode();
      }
    });

    this.elements.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.elements.nextBtn.disabled) {
        this.verifyCode();
      }
    });

    this.elements.resendButton.addEventListener("click", () => {
      if (this.remainingTime === 0) {
        this.resendCode();
      }
    });

    this.updateNextButtonState(this.elements.codeInput.value);
  }

  async retryOperation(operation, retries = this.maxRetries) {
    for (let i = 0; i < retries; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise((resolve) =>
          setTimeout(resolve, this.retryDelay * (i + 1))
        );
      }
    }
  }

  async verifyCode() {
    const code = this.elements.codeInput.value;

    if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
      this.showError("الرجاء إدخال رمز صحيح مكون من 6 أرقام");
      return;
    }

    try {
      this.setLoading(true);
      this.hideError();

      const response = await this.retryOperation(async () => {
        const result = await api.post("/auth/verify-recovery-code", {
          email: this.email,
          code: code,
        });

        if (!result || !result.success) {
          throw new Error(result?.message || "فشل التحقق من الرمز");
        }

        return result;
      });

      localStorage.setItem("recoveryToken", response.token);
      this.showSuccess("تم التحقق بنجاح! جاري تحويلك...");

      // تخزين معلومات النجاح
      localStorage.setItem(
        "verificationSuccess",
        JSON.stringify({
          email: this.email,
          timestamp: Date.now(),
        })
      );

      setTimeout(() => {
        window.location.href = "reset-password.html";
      }, 1500);
    } catch (error) {
      console.error("Verification error:", error);

      if (
        error.message.includes("network") ||
        error.message.includes("timeout")
      ) {
        this.showError(
          "خطأ في الاتصال. الرجاء التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى."
        );
      } else if (error.message.includes("expired")) {
        this.showError("انتهت صلاحية الرمز. الرجاء طلب رمز جديد.");
        this.enableResend();
      } else {
        this.showError(
          error.message || "رمز التحقق غير صحيح. الرجاء المحاولة مرة أخرى."
        );
      }
    } finally {
      this.setLoading(false);
    }
  }

  async resendCode() {
    try {
      this.setLoading(true);
      this.hideError();

      const response = await this.retryOperation(async () => {
        const result = await api.post("/auth/resend-recovery-code", {
          email: this.email,
        });

        if (!result || !result.success) {
          throw new Error(result?.message || "فشل إرسال الرمز");
        }

        return result;
      });

      // تخزين معلومات المحاولة
      localStorage.setItem(
        "lastVerificationAttempt",
        JSON.stringify({
          email: this.email,
          timestamp: Date.now(),
        })
      );

      this.startCountdown();
      this.showSuccess("تم إرسال رمز جديد إلى بريدك الإلكتروني");
      this.elements.codeInput.value = "";
      this.updateNextButtonState("");
    } catch (error) {
      console.error("Resend error:", error);

      if (
        error.message.includes("network") ||
        error.message.includes("timeout")
      ) {
        this.showError(
          "خطأ في الاتصال. الرجاء التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى."
        );
      } else if (error.message.includes("too many")) {
        this.showError(
          "تم تجاوز الحد الأقصى للمحاولات. الرجاء المحاولة لاحقاً."
        );
      } else {
        this.showError(
          error.message || "فشل إرسال الرمز. الرجاء المحاولة مرة أخرى."
        );
      }
    } finally {
      this.setLoading(false);
    }
  }

  updateNextButtonState(value) {
    const isValid = value.length === 6 && /^\d{6}$/.test(value);
    this.elements.nextBtn.disabled = !isValid;

    if (isValid) {
      this.elements.nextBtn.classList.add("active");
    } else {
      this.elements.nextBtn.classList.remove("active");
    }
  }

  maskEmail(email) {
    if (!email) return "";
    const [username, domain] = email.split("@");
    if (!username || !domain) return email;

    // تحسين طريقة إخفاء البريد الإلكتروني
    let maskedUsername;
    if (username.length <= 2) {
      maskedUsername = username.charAt(0) + "*";
    } else if (username.length <= 4) {
      maskedUsername =
        username.charAt(0) +
        "*".repeat(username.length - 2) +
        username.charAt(username.length - 1);
    } else {
      maskedUsername = username.charAt(0) + "*".repeat(3) + username.slice(-2);
    }

    return `${maskedUsername}@${domain}`;
  }

  startInitialCountdown() {
    const storedTimestamp = localStorage.getItem("lastCodeSentAt");
    if (storedTimestamp) {
      const elapsedSeconds = Math.floor(
        (Date.now() - parseInt(storedTimestamp)) / 1000
      );
      if (elapsedSeconds < this.timeoutDuration) {
        this.startCountdown(this.timeoutDuration - elapsedSeconds);
        return;
      }
    }
    this.enableResend();
  }

  startCountdown(duration = this.timeoutDuration) {
    this.remainingTime = duration;
    this.elements.resendButton.disabled = true;
    localStorage.setItem("lastCodeSentAt", Date.now().toString());

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.updateCountdownDisplay();
    this.countdownInterval = setInterval(() => {
      this.remainingTime--;
      this.updateCountdownDisplay();

      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval);
        this.enableResend();
      }
    }, 1000);
  }

  updateCountdownDisplay() {
    if (this.remainingTime > 0) {
      this.elements.countdown.textContent = `(${this.remainingTime} ثانية)`;
      this.elements.countdown.style.display = "inline";
    } else {
      this.elements.countdown.style.display = "none";
    }
  }

  enableResend() {
    this.elements.resendButton.disabled = false;
    this.elements.countdown.style.display = "none";
  }

  setLoading(isLoading) {
    this.elements.loader.style.display = isLoading ? "block" : "none";
    this.elements.nextBtn.disabled =
      isLoading || this.elements.codeInput.value.length !== 6;
    this.elements.codeInput.disabled = isLoading;
    this.elements.resendButton.disabled = isLoading || this.remainingTime > 0;
  }

  showError(message) {
    this.elements.errorMessage.textContent = message;
    this.elements.errorMessage.style.display = "block";
    this.elements.codeInput.classList.add("error");
  }

  hideError() {
    this.elements.errorMessage.style.display = "none";
    this.elements.codeInput.classList.remove("error");
  }

  showSuccess(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.textContent = message;
    this.elements.form.insertBefore(successDiv, this.elements.errorMessage);
    setTimeout(() => successDiv.remove(), 3000);
  }

  getEmailFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("email") || "";
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PasswordRecovery();
});
