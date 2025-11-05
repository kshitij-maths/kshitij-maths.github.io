// ================================
// initDarkMode.js — simple cycling toggle (Auto → Light → Dark)
// ================================
export function initDarkMode() {
  const button = document.getElementById("themeButton");

  // Available modes
  const modes = ["auto", "light", "dark"];
  const icons = {
    auto: "🌓",
    light: "☀️",
    dark: "🌙",
  };

  // Load last mode or default
  let mode = localStorage.getItem("theme") || "auto";
  applyTheme(mode);
  button.textContent = icons[mode];

  // Cycle modes on click
  button.addEventListener("click", () => {
    const currentIndex = modes.indexOf(mode);
    mode = modes[(currentIndex + 1) % modes.length];
    localStorage.setItem("theme", mode);
    applyTheme(mode);
    button.textContent = icons[mode];
  });
}

// Apply chosen theme
function applyTheme(mode) {
  const html = document.documentElement;
  html.classList.remove("dark");

  if (mode === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.classList.toggle("dark", prefersDark);
  } else if (mode === "dark") {
    html.classList.add("dark");
  }
}
