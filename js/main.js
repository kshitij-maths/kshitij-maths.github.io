// ================================
// main.js
// ================================
import { initMobileNavbar } from "./initMobileNavbar.js";
import { initMobileTimelineLine } from "./initMobileTimelineLine.js";
import { initEmailProtection } from "./initEmailProtection.js";

export async function loadSections() {
  // Sections loaded in parallel for better performance.
  // Note: address-profiles.html, quote.html, and footer.html are
  // hardcoded in index.html for fixed layout reasons.
  const sections = [
    "hero.html",
    "about.html",
    "timeline.html",
    "research.html",
    "teaching.html",
    "honours.html",
    "events.html"
  ];

  const main = document.getElementById("mainContent");

  // Fetch all sections in parallel instead of sequentially
  const responses = await Promise.all(
    sections.map(file => fetch(`sections/${file}`))
  );

  for (let i = 0; i < sections.length; i++) {
    const response = responses[i];
    if (!response.ok) {
      console.error(`Failed to load ${sections[i]}`);
      continue;
    }
    const html = await response.text();
    main.insertAdjacentHTML("beforeend", html);
  }

  const loader = document.getElementById("loadingIndicator");
  if (loader) loader.remove();

  console.log("🚀 Initializing dynamic features...");
  // Use requestAnimationFrame to ensure DOM is ready before init
  requestAnimationFrame(() => initializeDynamicContent());

  // Adjust body padding to account for fixed footer height
  adjustFooterPadding();
  window.addEventListener("resize", adjustFooterPadding);
}

function adjustFooterPadding() {
  const footer = document.getElementById("fixed-footer");
  if (footer) {
    document.body.style.paddingBottom = (footer.offsetHeight + 20) + "px";
  }
}

function initializeDynamicContent() {
  // 1. Text & Scroll Effects
  if (typeof window.initHeroTicker === "function") window.initHeroTicker();
  if (typeof window.initScrollSpy === "function") window.initScrollSpy();
  if (typeof window.initPopAnimations === "function") window.initPopAnimations();

  // 2. Functional Modules
  if (typeof window.initResearchFilters === "function") window.initResearchFilters();

  // 3. UI/UX Modules
  if (typeof window.initDarkMode === "function") window.initDarkMode();
  if (typeof window.initNavigation === "function") window.initNavigation();

  // 4. Mobile Specifics
  if (typeof window.initMobileNavbar === "function") window.initMobileNavbar();
  if (typeof window.initMobileTimelineLine === "function") window.initMobileTimelineLine();

  // 5. Security Features
  initEmailProtection();

  // 6. Global Animations
  document.querySelectorAll(".animate-fadeIn").forEach(el => {
    el.classList.add("fade-in-start");
  });
}
