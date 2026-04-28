// ================================
// initResearchFilters.js
// Year filter buttons are generated automatically from publication data,
// so adding a new <li data-year="XXXX"> entry is all that's needed.
// ================================
export function initResearchFilters() {
  const typeButtons  = document.querySelectorAll('.type-filter-btn');
  const yearContainer = document.getElementById('yearFilterContainer');
  const items         = document.querySelectorAll('#pubList .pub-item');

  if (!typeButtons.length || !yearContainer || !items.length) return;

  // --- Build year buttons from the actual data -------------------------
  const years = [
    ...new Set(
      [...items]
        .map(item => item.dataset.year)
        .filter(Boolean)
    )
  ].sort((a, b) => Number(b) - Number(a));   // newest first

  years.forEach(year => {
    const btn = document.createElement('button');
    btn.className   = 'year-filter-btn';
    btn.dataset.year = year;
    btn.textContent  = year;
    yearContainer.appendChild(btn);
  });

  const yearButtons = yearContainer.querySelectorAll('.year-filter-btn');

  // --- Filter state ----------------------------------------------------
  let activeType = 'all';
  let activeYear = 'all';

  function applyFilters() {
    items.forEach(item => {
      const matchType = activeType === 'all' || item.dataset.type === activeType;
      const matchYear = activeYear === 'all' || item.dataset.year === activeYear;
      item.style.display = (matchType && matchYear) ? 'list-item' : 'none';
    });
  }

  // --- Wire up type buttons -------------------------------------------
  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
      btn.classList.add('bg-blue-600', 'text-white');
      activeType = btn.dataset.type;
      applyFilters();
    });
  });

  // --- Wire up year buttons -------------------------------------------
  yearButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      yearButtons.forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
      btn.classList.add('bg-blue-600', 'text-white');
      activeYear = btn.dataset.year;
      applyFilters();
    });
  });

  // --- Defaults --------------------------------------------------------
  typeButtons[0].classList.add('bg-blue-600', 'text-white');
  yearButtons[0].classList.add('bg-blue-600', 'text-white');
  applyFilters();
}
