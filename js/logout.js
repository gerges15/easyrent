// Logout functionality
export function handleLogout() {
  // Show confirmation dialog
  Swal.fire({
    title: "تأكيد تسجيل الخروج",
    text: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#7c4dff",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم",
    cancelButtonText: "لا",
  }).then((result) => {
    if (result.isConfirmed) {
      // Clear local storage
      localStorage.clear();

      // Show success message
      Swal.fire({
        title: "تم تسجيل الخروج!",
        text: "تم تسجيل خروجك بنجاح.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Redirect to login page
        window.location.href = "loginowner.html";
      });
    }
  });
}
