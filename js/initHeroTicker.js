export function initHeroTicker() {
  const ticker = document.querySelector("#nameTicker .name-inner");
  const wrapper = document.getElementById("nameTicker");

  if (!ticker || !wrapper) return;

  const names = [
    { text: "Kshitij Kumar Pandey", cls: "english" },
    { text: "क्षितिज कुमार पाण्डेय", cls: "hindi" }
  ];

  let idx = 0;

  // Initial display
  ticker.textContent = names[idx].text;
  wrapper.classList.add(names[idx].cls);  // class applied to the wrapper
  ticker.style.transition = "opacity 0.4s ease";

  function cycleName() {
    ticker.style.opacity = 0;

    setTimeout(() => {
      // Update index
      idx = (idx + 1) % names.length;

      // Update content
      ticker.textContent = names[idx].text;

      // Update scaling class
      wrapper.classList.remove("english", "hindi");
      wrapper.classList.add(names[idx].cls);

      // Fade back in
      ticker.style.opacity = 1;

      setTimeout(cycleName, 1600);
    }, 400);
  }

  setTimeout(cycleName, 2000);
}
