// ================================
// main.js
// ================================
import { initMobileNavbar } from "./initMobileNavbar.js";
import { initMobileTimelineLine } from "./initMobileTimelineLine.js";

export async function loadSections() {
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
  requestAnimationFrame(() => initializeDynamicContent());
  
  adjustFooterPadding();
  window.addEventListener('resize', adjustFooterPadding);
}

function adjustFooterPadding() {
  const footer = document.getElementById("fixed-footer");
  if (footer) {
    document.body.style.paddingBottom = footer.offsetHeight + "px";
  }
}

function initializeDynamicContent() {
  if (typeof window.initHeroTicker === "function") window.initHeroTicker();
  if (typeof window.initScrollSpy === "function") window.initScrollSpy();
  if (typeof window.initResearchFilters === "function") window.initResearchFilters();
  if (typeof window.initDarkMode === "function") window.initDarkMode();
  if (typeof window.initNavigation === "function") window.initNavigation();
  if (typeof window.initContactForm === "function") window.initContactForm();
  
  if (typeof window.initPopAnimations === "function") {
    window.initPopAnimations();
  }

  document.querySelectorAll(".animate-fadeIn").forEach(el => {
    el.classList.add("fade-in-start");
  });

  if (typeof window.initMobileNavbar === "function") {
    window.initMobileNavbar();
  }

  // FIXED: Restored this call so the vertical line appears
  initMobileTimelineLine();
}