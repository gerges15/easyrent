export default function CookiesModal() {
  return `
  
  
   <!-- Cookie Consent Banner -->
<div id="cookieConsent" dir="rtl" class="fixed bottom-6 right-6 z-50 max-w-md w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-6 space-y-4 transition transform animate-fade-in">
  <!-- Header -->
  <div class="flex items-center gap-3">
    <i class="ri-shield-check-line text-indigo-600 text-2xl"></i>
    <h3 class="text-lg font-semibold">إعدادات الخصوصية</h3>
  </div>

  <!-- Description -->
  <p class="text-sm leading-relaxed">
    نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتخصيص المحتوى وتحليل حركة المرور. باختيارك "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.
    <a href="privacypolicy.html" class="text-indigo-600 underline hover:text-indigo-800 transition">سياسة الخصوصية</a>
  </p>

  <!-- Buttons -->
  <div class="flex flex-col sm:flex-row gap-3">
    <button
      onclick="acceptCookies()"
      class="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
    >
      <i class="ri-check-line text-lg"></i>
      قبول الكل
    </button>
    <button
      onclick="rejectCookies()"
      class="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition"
    >
      <i class="ri-close-line text-lg"></i>
      رفض الكل
    </button>
  </div>
</div>

  
  `;
}
