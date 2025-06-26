import { getAllUnits } from "../../services/lib/unit";
import { createUnitCard } from "../Cards/UnitCard";

export default async function Units() {
  try {
    const allUnits = await getAllUnits();
    const data = allUnits.data["$values"];
    const unitCards = createUnitCard(data);

    return unitCards;
  } catch (error) {
    console.error("Failed to load units:", error);
    return `<p class="text-red-500 text-center">Failed to load units.</p>`;
  }
}

export function UnitsSectionSkeleton() {
  return `
    <section id="units" class="py-16 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4">
      <div id="unitCards" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <p class="text-center text-gray-500">Loading available units...</p>
      </div>
    </section>
  `;
}
