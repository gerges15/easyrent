// js/property-filter.js

export function initPropertyFilter() {
  document.addEventListener("DOMContentLoaded", () => {
    const forRentSelect = document.getElementById("forRent");
    const currencySelect = document.getElementById("currency");
    const areaUnitSelect = document.getElementById("areaUnit");
    const bathroomSelect = document.getElementById("bathroomCount");
    const bedroomSelect = document.getElementById("bedroomCount");
    const kitchenSelect = document.getElementById("kitchenCount");
    const resetBtn = document.getElementById("resetFilter");
    const applyBtn = document.getElementById("applyFilter");

    if (
      !forRentSelect ||
      !currencySelect ||
      !areaUnitSelect ||
      !bathroomSelect ||
      !bedroomSelect ||
      !kitchenSelect ||
      !resetBtn ||
      !applyBtn
    ) {
      console.warn("بعض عناصر الفلتر مش موجودة في الصفحة");
      return;
    }

    // Reset button
    resetBtn.addEventListener("click", () => {
      forRentSelect.value = "rent";
      currencySelect.value = "euro";
      areaUnitSelect.value = "sqft";
      bathroomSelect.value = "";
      bedroomSelect.value = "";
      kitchenSelect.value = "";
    });

    // Apply button
    applyBtn.addEventListener("click", () => {
      const filters = {
        purpose: forRentSelect.value,
        currency: currencySelect.value,
        areaUnit: areaUnitSelect.value,
        bathroomCount: bathroomSelect.value,
        bedroomCount: bedroomSelect.value,
        kitchenCount: kitchenSelect.value,
      };

      console.log("Filters applied:", filters);
      alert("تم تطبيق الفلاتر! (شوف الكونسول)");
      // في التطبيق الحقيقي، هنا ترسل الفلاتر للسيرفر أو تطبقها على العقارات المعروضة
    });
  });
}
// property-filter.js
export function initFilter() {
  // ... منطق الفلتر هنا
}
