// ================================
// main.js (final stable version)
// ================================
export async function loadSections() {
  const sections = [
    "hero.html",
    "about.html",
    "timeline.html",
    "research.html",
    "teaching.html",
    "honours.html",
    "events.html",
    "contact.html",
    "quote.html",
    "footer.html"
  ];

  const main = document.getElementById("mainContent");
  const footerContainer = document.getElementById("footerContainer");

  for (let file of sections) {
    try {
      const response = await fetch(`sections/${file}`);
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      const html = await response.text();

      if (file === "footer.html") {
        footerContainer.innerHTML = html;
      } else {
        main.insertAdjacentHTML("beforeend", html);
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log("🚀 Initializing dynamic features...");
  // Wait for DOM to fully reflect new content
  requestAnimationFrame(() => initializeDynamicContent());
}

function initializeDynamicContent() {
  // Initialize all features only if present
  if (typeof window.initHeroTicker === "function") {
    console.log("🎞️ Running Hero Ticker...");
    window.initHeroTicker();
  }

  if (typeof window.initScrollSpy === "function") window.initScrollSpy();
  if (typeof window.initResearchFilters === "function") window.initResearchFilters();
  if (typeof window.initDarkMode === "function") window.initDarkMode();
  if (typeof window.initNavigation === "function") window.initNavigation();
  if (typeof window.initContactForm === "function") {
    console.log("📬 Initializing Contact Form...");
    window.initContactForm();
  }

  // Fade-ins
  document.querySelectorAll(".animate-fadeIn").forEach(el => {
    el.classList.add("fade-in-start");
  });
}
