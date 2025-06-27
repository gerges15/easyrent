import Cookies from "js-cookie";
import { addNewUnit } from "../../services/lib/unit.js"; // adjust path if needed

export default function addPropertyView() {
  const user = JSON.parse(Cookies.get("userData") || "{}");

  return `
    <div class="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-[#0d0d0d] rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Property</h2>
      <form id="addPropertyForm" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input type="text" id="title" name="title" required class="w-full mt-1 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00FF85]" />
        </div>

        <div>
          <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price (EGP/month)</label>
          <input type="number" id="price" name="priceForMonth" required class="w-full mt-1 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00FF85]" />
        </div>

        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
          <textarea id="address" name="address" rows="3" required class="w-full mt-1 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00FF85]"></textarea>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select id="status" name="status" required class="w-full mt-1 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-white">
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        <div>
          <label for="photoUrls" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
          <input type="text" id="photoUrls" name="photoUrls" placeholder="photo.jpg" required class="w-full mt-1 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-white" />
        </div>

        <div class="text-right">
          <button type="submit" class="bg-[#00FF85] hover:bg-[#00e676] text-black font-semibold px-6 py-3 rounded-md transition duration-300">Submit</button>
        </div>
      </form>

     
    </div>
  `;
}
