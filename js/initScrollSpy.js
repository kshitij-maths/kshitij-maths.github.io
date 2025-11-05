// =============================
// initScrollSpy.js (fixed)
// =============================
export function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a.top-link");

  if (!sections.length || !navLinks.length) return;

  // Use IntersectionObserver to track which section is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`nav a[href="#${id}"]`);

        if (entry.isIntersecting) {
          // remove active class from all
          navLinks.forEach((l) => l.classList.remove("active"));
          // add to current
          if (link) link.classList.add("active");
        }
      });
    },
    {
      root: null,
      threshold: 0.35,     // triggers when 35% of section is visible
      rootMargin: "0px 0px -30% 0px", // ensures bottom sections still trigger
    }
  );

  sections.forEach((section) => observer.observe(section));

  // --- Extra handling for last section ---
  // If you scroll all the way to bottom, make sure last link stays active
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    if (Math.abs(scrollPosition - pageHeight) < 10) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const lastLink = navLinks[navLinks.length - 1];
      if (lastLink) lastLink.classList.add("active");
    }
  });
}
