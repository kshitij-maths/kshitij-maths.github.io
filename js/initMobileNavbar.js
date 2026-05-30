// ================================
// initMobileNavbar.js
// ================================
export function initMobileNavbar() {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelectorAll("#mainNav a.top-link");
  const navItems = document.querySelectorAll("#mainNav li");

  if (!navbar || !menuBtn) return;

  // --- 1. Toggle Expand/Collapse ---
  // Clone to ensure clean event binding
  const newMenuBtn = menuBtn.cloneNode(true);
  menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);

  newMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navbar.classList.toggle("expanded");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("expanded");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && navbar.classList.contains("expanded")) {
      navbar.classList.remove("expanded");
    }
  });

  // --- 2. Mobile Scroll Logic ---
  const sections = Array.from(navLinks).map(link => {
    const hash = link.getAttribute("href");
    return hash && hash.startsWith("#") ? document.querySelector(hash) : null;
  });

  function onScroll() {
    if (window.innerWidth > 768) return;

    let activeIndex = -1;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // A. Bottom Check: If near bottom, force last link
    if ((scrollY + viewportHeight) >= (docHeight - 100)) {
      activeIndex = sections.length - 1;
    } 
    // B. Top Check: If at very top, force first link
    else if (scrollY < 50) {
      activeIndex = 0;
    } 
    // C. Standard Reading Line Check
    else {
      const triggerLine = viewportHeight * 0.35; 
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        // Active if the section covers the 35% line
        if (rect.top <= triggerLine && rect.bottom > triggerLine) {
          activeIndex = i;
          break;
        }
      }
    }

    // D. Fallback: Find closest section top
    // (Crucial for "tail" content like Address/Quote that follows Contact)
    if (activeIndex === -1) {
      let closestDist = Infinity;
      sections.forEach((sec, i) => {
        if (!sec) return;
        // We look for the section whose top is closest to the trigger line
        // Typically this means the section we just passed or are currently inside
        const dist = Math.abs(sec.getBoundingClientRect().top);
        if (dist < closestDist) {
          closestDist = dist;
          activeIndex = i;
        }
      });
    }

    updateNavbarState(activeIndex);
  }

  function updateNavbarState(activeIndex) {
    if (activeIndex < 0) activeIndex = 0;

    // 1. Update Layout (3 Visible Links)
    const total = navItems.length;
    let start = activeIndex - 1;

    if (start < 0) start = 0;
    if (start > total - 3) start = total - 3;
    if (start < 0) start = 0;

    const end = start + 3;

    navItems.forEach((item, index) => {
      if (index >= start && index < end) {
        item.classList.add("mobile-visible");
      } else {
        item.classList.remove("mobile-visible");
      }
    });

    // 2. Update Active Class
    navLinks.forEach((link, i) => {
      if (i === activeIndex) link.classList.add("active");
      else link.classList.remove("active");
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      onScroll();
    } else {
      navbar.classList.remove("expanded");
    }
  });

  // Initial Check
  requestAnimationFrame(onScroll);
}