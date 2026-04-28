// ================================
// initTimelineLine.js  (works for all screen sizes)
// Uses getBoundingClientRect() to position the vertical line so it
// passes exactly through the centre of the first and last marker.
// ================================
export function initMobileTimelineLine() {
  const timelines = document.querySelectorAll('.timeline');
  if (!timelines.length) return;

  const updateTimeline = (timeline) => {
    const markers = timeline.querySelectorAll('.timeline-marker');
    if (markers.length < 2) return;

    const first = markers[0];
    const last  = markers[markers.length - 1];
    const box   = timeline.getBoundingClientRect();

    const firstBox = first.getBoundingClientRect();
    const lastBox  = last.getBoundingClientRect();

    // Vertical: from centre of first marker to centre of last marker
    const lineTop    = firstBox.top  - box.top  + firstBox.height / 2;
    const lineBottom = lastBox.top   - box.top  + lastBox.height  / 2;

    // Horizontal: centre of the marker column (same for all markers)
    const lineX = firstBox.left - box.left + firstBox.width / 2;

    timeline.style.setProperty('--line-top',    `${lineTop}px`);
    timeline.style.setProperty('--line-height', `${lineBottom - lineTop}px`);
    timeline.style.setProperty('--line-x',      `${lineX}px`);
  };

  // Initial calculation (called after sections are injected into DOM)
  timelines.forEach(updateTimeline);

  // Recalculate whenever layout changes (font load, images, resize)
  const observer = new ResizeObserver(entries => {
    entries.forEach(entry => updateTimeline(entry.target));
  });
  timelines.forEach(t => observer.observe(t));

  window.addEventListener('resize', () => timelines.forEach(updateTimeline), { passive: true });
}
