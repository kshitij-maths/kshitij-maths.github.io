// =============================
// initScrollSpy.js
// =============================
export function initScrollSpy() {
  const navLinks = document.querySelectorAll("nav a.top-link");
  
  // 1. Map links to their corresponding sections
  // We filter out any links that don't match a real section on the page
  const targets = Array.from(navLinks).map(link => {
    const href = link.getAttribute("href");
    const section = href && href.startsWith("#") ? document.querySelector(href) : null;
    return { link, section };
  }).filter(item => item.section);

  if (!targets.length) return;

  function onScroll() {
    // Disable logic on mobile to prevent conflict with initMobileNavbar.js
    if (window.innerWidth <= 768) return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // A. Bottom Check (Force last link immediately when hitting bottom)
    if ((scrollY + viewportHeight) >= (docHeight - 50)) {
      activate(targets[targets.length - 1].link);
      return;
    }

    // B. "Reading Line" Logic
    // We define a line 30% down the screen. The section crossing this line is "active".
    const triggerPoint = scrollY + (viewportHeight * 0.3);

    // Default to the first link
    let activeLink = targets[0].link;

    // Loop through sections to find the last one that has passed the trigger point
    for (let i = 0; i < targets.length; i++) {
      const { link, section } = targets[i];
      
      // If the top of this section is above the trigger line, it's a candidate
      if (section.offsetTop <= triggerPoint) {
        activeLink = link;
      } else {
        // Since sections are in order, if we find one below the line, we stop.
        // The previous one (stored in activeLink) is the winner.
        break;
      }
    }

    activate(activeLink);
  }

  function activate(link) {
    // Only update DOM if necessary to improve performance
    if (!link.classList.contains("active")) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  }

  // Use passive listener for performance
  window.addEventListener("scroll", onScroll, { passive: true });
  
  // Update on resize too (in case layout shifts)
  window.addEventListener("resize", onScroll, { passive: true });

  // Initial check on load
  onScroll();
}