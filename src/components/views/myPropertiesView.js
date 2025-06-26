// components/views/myPropertiesView.js
export default function myPropertiesView() {
  return `
    <div>
      <h2 class="text-xl font-bold mb-6 flex gap-2 items-center">
        <i class="fas fa-list"></i> My Properties
      </h2>

      <div id="properties-list" class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <!-- Properties will be loaded here -->
      </div>
    </div>
  `;
}
