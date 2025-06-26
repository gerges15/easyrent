export default function dashboardView() {
  return `
    <div class="space-y-6">
      <div id="auth-status"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-xl shadow-md">
          <h2 class="text-lg font-semibold flex gap-2 items-center">
            <i class="fas fa-home"></i> Total Properties
          </h2>
          <div class="text-3xl font-bold mt-4" id="total-property">0</div>
        </div>
        <div class="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-xl shadow-md">
          <h2 class="text-lg font-semibold flex gap-2 items-center">
            <i class="fas fa-key"></i> Available for Rent
          </h2>
          <div class="text-3xl font-bold mt-4" id="to-rent">0</div>
        </div>
        <div class="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-xl shadow-md">
          <h2 class="text-lg font-semibold flex gap-2 items-center">
            <i class="fas fa-lock"></i> Booked Units
          </h2>
          <div class="text-3xl font-bold mt-4" id="booked-units">0</div>
        </div>
      </div>
    </div>
  `;
}
