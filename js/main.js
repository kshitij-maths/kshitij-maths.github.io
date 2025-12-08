// ================================
// main.js
// ================================
import { initMobileNavbar } from "./initMobileNavbar.js";
import { initMobileTimelineLine } from "./initMobileTimelineLine.js";
import { initEmailProtection } from "./initEmailProtection.js";

export async function loadSections() {
  // List of sections to load dynamically
  // Note: address-profiles.html, quote.html, and footer.html are now 
  // hardcoded in index.html for fixed layout reasons.
  const sections = [
    "hero.html",
    "about.html",
    "timeline.html",
    "research.html",
    "teaching.html",
    "honours.html",
    "events.html",
    "contact.html" 
  ];

  const main = document.getElementById("mainContent");

  for (let file of sections) {
    try {
      const response = await fetch(`sections/${file}`);
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      const html = await response.text();
      main.insertAdjacentHTML("beforeend", html);
    } catch (err) {
      console.error(err);
    }
  }

  console.log("🚀 Initializing dynamic features...");
  // Use requestAnimationFrame to ensure DOM is ready before init
  requestAnimationFrame(() => initializeDynamicContent());
  
  // Adjust body padding to account for fixed footer height
  adjustFooterPadding();
  window.addEventListener('resize', adjustFooterPadding);
}

function adjustFooterPadding() {
  const footer = document.getElementById("fixed-footer");
  if (footer) {
    // Add extra padding to body so footer doesn't cover content
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
  if (typeof window.initContactForm === "function") window.initContactForm();
  
  // 3. UI/UX Modules
  if (typeof window.initDarkMode === "function") window.initDarkMode();
  if (typeof window.initNavigation === "function") window.initNavigation();

  // 4. Mobile Specifics
  if (typeof window.initMobileNavbar === "function") {
    window.initMobileNavbar();
  }
  if (typeof window.initMobileTimelineLine === "function") {
    window.initMobileTimelineLine();
  }

  // 5. Security Features
  initEmailProtection();

  // 6. Global Animations
  document.querySelectorAll(".animate-fadeIn").forEach(el => {
    el.classList.add("fade-in-start");
  });
}