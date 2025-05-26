import API from "./api.js";

const api = new API("http://easyrentapi0.runasp.net/api/v1", {
  authToken: localStorage.getItem("token"),
});

// عناصر واجهة المستخدم
const elements = {
  statusMessage: document.getElementById("statusMessage"),
  subMessage: document.getElementById("subMessage"),
  errorContainer: document.getElementById("errorContainer"),
  errorMessage: document.getElementById("errorMessage"),
};

// تحديث رسائل الحالة
function updateStatus(message, subMessage = "") {
  elements.statusMessage.textContent = message;
  elements.subMessage.textContent = subMessage;
}

// عرض رسالة خطأ
function showError(message) {
  elements.errorContainer.style.display = "block";
  elements.errorMessage.textContent = message;
}

async function checkUserType() {
  try {
    // التحقق من وجود توكن
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("لم يتم تسجيل الدخول");
    }

    updateStatus("جاري التحقق من بياناتك...", "يرجى الانتظار");

    // التحقق من صلاحية التوكن وجلب بيانات المستخدم
    const user = await api.get("/auth/me");

    if (!user) {
      throw new Error("لم يتم العثور على بيانات المستخدم");
    }

    updateStatus("تم التحقق بنجاح", "جاري توجيهك للصفحة المناسبة");

    // حفظ بيانات المستخدم
    localStorage.setItem("userData", JSON.stringify(user));

    // تأخير قصير قبل التوجيه
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // توجيه المستخدم حسب نوعه
    switch (user.role?.toLowerCase()) {
      case "admin":
        window.location.href = "admin-dashboard.html";
        break;
      case "owner":
        window.location.href = "owner-dashboard.html";
        break;
      case "student":
        window.location.href = "student-dashboard.html";
        break;
      default:
        throw new Error("نوع المستخدم غير معروف");
    }
  } catch (error) {
    console.error("خطأ في التحقق:", error);

    // تنظيف البيانات في حالة الخطأ
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    // عرض رسالة الخطأ المناسبة
    if (error.message === "لم يتم تسجيل الدخول") {
      showError("الرجاء تسجيل الدخول أولاً");
    } else if (error.response?.status === 401) {
      showError("انتهت صلاحية الجلسة. الرجاء تسجيل الدخول مرة أخرى");
    } else {
      showError("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى");
    }

    // تأخير قصير قبل التوجيه لصفحة تسجيل الدخول
    setTimeout(() => {
      window.location.href = "login.html";
    }, 3000);
  }
}

// بدء التحقق عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", checkUserType);
