import API from "./api.js";

const api = new API("http://easyrentapi0.runasp.net/api/v1", {
  authToken: localStorage.getItem("token"),
});

async function checkUserType() {
  try {
    const user = await api.get("/auth/me");
    const role = user.role;

    if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else if (role === "owner") {
      window.location.href = "owner-dashboard.html";
    } else if (role === "student") {
      window.location.href = "student-dashboard.html";
    } else {
      alert("نوع المستخدم غير معروف!");
      // ممكن توجه لمكان تسجيل الدخول أو صفحة خطأ
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error("فشل التحقق من نوع المستخدم:", error);
    alert("حدث خطأ في التحقق من بيانات المستخدم. الرجاء تسجيل الدخول مجدداً.");
    window.location.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", checkUserType);
