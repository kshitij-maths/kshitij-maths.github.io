export function initHeroTicker() {
  const ticker = document.getElementById("nameTicker");
  if (!ticker) return;

  const names = ["Kshitij Kumar Pandey", "क्षितिज कुमार पाण्डेय"];
  let idx = 0;

  // Initial text
  ticker.textContent = names[idx];
  ticker.style.transition = "opacity 0.4s ease"; // Smooth fade

  function cycleName() {
    // Fade out
    ticker.style.opacity = 0;

    setTimeout(() => {
      // Change text after fade out
      idx = (idx + 1) % names.length;
      ticker.textContent = names[idx];

      // Fade in
      ticker.style.opacity = 1;

      // Schedule next cycle
      setTimeout(cycleName, 1600); // 2000ms total - 400ms fade out
    }, 400); // Match CSS fade duration
  }

  // Start cycling after first interval
  setTimeout(cycleName, 2000);
}
