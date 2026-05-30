// ================================
// main.js
// ================================
import { initDarkMode } from "./initDarkMode.js";
import { initNavigation } from "./initNavigation.js";
import { initScrollSpy } from "./initScrollSpy.js";
import { initResearchFilters } from "./initResearchFilters.js";
import { initPopAnimations } from "./initPopAnimations.js";
import { initMobileNavbar } from "./initMobileNavbar.js";
import { initMobileTimelineLine } from "./initMobileTimelineLine.js";
import { initEmailProtection } from "./initEmailProtection.js";

export async function loadSections() {
  // Sections loaded in parallel for better performance.
  // Note: address-profiles.html, quote.html, and footer.html are
  // hardcoded in index.html for fixed layout reasons.
  const sections = [
    "home.html",
    "research.html",
    "cv.html"
  ];

  const main = document.getElementById("mainContent");
  const failedSections = [];

  // Fetch all sections in parallel instead of sequentially
  const base = import.meta.env.BASE_URL;
  const responses = await Promise.all(
    sections.map(file => fetch(`${base}sections/${file}`).catch(err => ({
      status: 0,
      ok: false,
      file,
      error: err
    })))
  );

  for (let i = 0; i < sections.length; i++) {
    const response = responses[i];
    if (!response.ok) {
      failedSections.push(sections[i]);
      console.error(`Failed to load ${sections[i]}`);
      continue;
    }
    try {
      const html = await response.text();
      main.insertAdjacentHTML("beforeend", html);
    } catch (err) {
      failedSections.push(sections[i]);
      console.error(`Error processing ${sections[i]}:`, err);
    }
  }

  // Handle failures gracefully
  if (failedSections.length > 0) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-notification";
    errorDiv.setAttribute("role", "alert");
    errorDiv.innerHTML = `
      <p style="color: #dc2626; padding: 1rem; text-align: center;">
        ⚠️ Some content failed to load: ${failedSections.join(", ")}. 
        Please refresh the page if sections are missing.
      </p>
    `;
    main.insertAdjacentElement("beforeend", errorDiv);
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
  // 1. Scroll Effects

  try {
    initScrollSpy();
  } catch (err) {
    console.error("Error initializing scroll spy:", err);
  }

  try {
    initPopAnimations();
  } catch (err) {
    console.error("Error initializing pop animations:", err);
  }

  // 2. Functional Modules
  try {
    initResearchFilters();
  } catch (err) {
    console.error("Error initializing research filters:", err);
  }

  // 3. UI/UX Modules
  try {
    initDarkMode();
  } catch (err) {
    console.error("Error initializing dark mode:", err);
  }

  try {
    initNavigation();
  } catch (err) {
    console.error("Error initializing navigation:", err);
  }

  // 4. Mobile Specifics
  try {
    initMobileNavbar();
  } catch (err) {
    console.error("Error initializing mobile navbar:", err);
  }

  try {
    initMobileTimelineLine();
  } catch (err) {
    console.error("Error initializing mobile timeline line:", err);
  }

  // 5. Security Features
  try {
    initEmailProtection();
  } catch (err) {
    console.error("Error initializing email protection:", err);
  }

  // 6. Global Animations
  document.querySelectorAll(".animate-fadeIn").forEach(el => {
    el.classList.add("fade-in-start");
  });
}
