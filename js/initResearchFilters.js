// ================================
// initResearchFilters.js (Fixed + Enhanced)
// ================================
export function initResearchFilters() {
  const typeButtons = document.querySelectorAll(".type-filter-btn");
  const yearButtons = document.querySelectorAll(".year-filter-btn");
  const items = document.querySelectorAll("#pubList .pub-item");

  if (!typeButtons.length || !yearButtons.length || !items.length) return;

  let activeType = "all";
  let activeYear = "all";

  function applyFilters() {
    items.forEach(item => {
      const matchesType = activeType === "all" || item.dataset.type === activeType;
      const matchesYear = activeYear === "all" || item.dataset.year === activeYear;

      if (matchesType && matchesYear) {
        item.style.display = "list-item";
        item.classList.add("animate-fadeIn");
      } else {
        item.style.display = "none";
        item.classList.remove("animate-fadeIn");
      }
    });
  }

  // === Type buttons ===
  typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      typeButtons.forEach(b => b.classList.remove("bg-blue-600", "text-white"));
      btn.classList.add("bg-blue-600", "text-white");
      activeType = btn.dataset.type;
      applyFilters();
    });
  });

  // === Year buttons ===
  yearButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      yearButtons.forEach(b => b.classList.remove("bg-blue-600", "text-white"));
      btn.classList.add("bg-blue-600", "text-white");
      activeYear = btn.dataset.year;
      applyFilters();
    });
  });

  // Default selection
  typeButtons[0].classList.add("bg-blue-600", "text-white");
  yearButtons[0].classList.add("bg-blue-600", "text-white");
  applyFilters();
}
