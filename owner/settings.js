// استرجاع بيانات المستخدم عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  // استرجاع بيانات المستخدم من localStorage
  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  // ملء النموذج بالبيانات المحفوظة
  document.getElementById("fullName").value = userData.fullName || "";
  document.getElementById("email").value = userData.email || "";
  document.getElementById("phone").value = userData.phone || "";
  document.getElementById("address").value = userData.address || "";

  // معالجة تقديم النموذج
  document
    .getElementById("settingsForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // جمع البيانات من النموذج
      const updatedData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
      };

      // حفظ البيانات في localStorage
      localStorage.setItem("userData", JSON.stringify(updatedData));

      // عرض رسالة نجاح
      alert("تم حفظ التغييرات بنجاح!");
    });
});
