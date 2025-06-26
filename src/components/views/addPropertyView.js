export default function addPropertyView() {
  return `
    <div>
      <h2 class="text-xl font-bold mb-4">Add New Property</h2>
      <!-- your form goes here -->
      <form class="space-y-4">
        <input type="text" placeholder="Title" class="w-full p-2 border rounded" />
        <input type="number" placeholder="Price" class="w-full p-2 border rounded" />
        <textarea placeholder="Address" class="w-full p-2 border rounded"></textarea>
        <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded">Submit</button>
      </form>
    </div>
  `;
}
