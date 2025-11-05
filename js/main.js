// ================================
// main.js (final stable version with address-profiles-card)
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
    "address-profiles.html",
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

      // Footer goes in footerContainer
      if (file === "footer.html") {
        footerContainer.innerHTML = html;
      } else {
        // All other sections go inside mainContent
        main.insertAdjacentHTML("beforeend", html);
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log("🚀 Initializing dynamic features...");
  requestAnimationFrame(() => initializeDynamicContent());
}

function initializeDynamicContent() {
  // Hero ticker
  if (typeof window.initHeroTicker === "function") {
    console.log("🎞️ Running Hero Ticker...");
    window.initHeroTicker();
  }

  // Scroll spy
  if (typeof window.initScrollSpy === "function") window.initScrollSpy();

  // Research filters
  if (typeof window.initResearchFilters === "function") window.initResearchFilters();

  // Dark mode
  if (typeof window.initDarkMode === "function") window.initDarkMode();

  // Navigation
  if (typeof window.initNavigation === "function") window.initNavigation();

  // Contact form
  if (typeof window.initContactForm === "function") {
    console.log("📬 Initializing Contact Form...");
    window.initContactForm();
  }

  // Animate fade-ins
  document.querySelectorAll(".animate-fadeIn").forEach(el => {
    el.classList.add("fade-in-start");
  });

  // Optional: Add any custom JS for address-profiles-card if needed
  const addressCard = document.getElementById("address-profiles-card");
  if (addressCard) {
    console.log("🏠 Address & Profiles card loaded.");
    // e.g., custom hover effects for profile icons can go here
  }
}
