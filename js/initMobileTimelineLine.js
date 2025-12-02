// ================================
// initMobileTimelineLine.js
// ================================

export function initMobileTimelineLine() {
  if (window.innerWidth > 768) return;

  // Select ALL timelines, not just the first one
  const timelines = document.querySelectorAll('.timeline');
  if (!timelines.length) return;

  timelines.forEach(timeline => {
    const markers = timeline.querySelectorAll('.timeline-marker');
    if (markers.length < 2) return;

    const first = markers[0].getBoundingClientRect();
    const last = markers[markers.length - 1].getBoundingClientRect();
    const container = timeline.getBoundingClientRect();

    const topOffset = first.top - container.top + first.height / 2;
    const bottomOffset = last.bottom - container.top - last.height / 2;

    // Apply CSS variables **to each timeline block independently**
    timeline.style.setProperty('--line-top', `${topOffset}px`);
    timeline.style.setProperty('--line-bottom', `${bottomOffset}px`);
  });
}

// Recalculate on resize
window.addEventListener("resize", initMobileTimelineLine);
