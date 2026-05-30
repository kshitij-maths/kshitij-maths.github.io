// ================================
// initTimelineLine.js  (works for all screen sizes)
// Uses getBoundingClientRect() to position the vertical line so it
// passes exactly through the centre of the first and last marker.
// ================================
export function initMobileTimelineLine() {
  const timelines = document.querySelectorAll('.timeline');
  if (!timelines.length) return;
  const snapToDevicePixel = (value) => {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(value * dpr) / dpr;
  };

  const updateTimeline = (timeline) => {
    const markers = timeline.querySelectorAll('.timeline-marker');
    if (markers.length < 2) return;

    const first = markers[0];
    const last  = markers[markers.length - 1];
    const box   = timeline.getBoundingClientRect();

    const firstBox = first.getBoundingClientRect();
    const lastBox  = last.getBoundingClientRect();

    // Vertical: from bottom edge of top marker to top edge of bottom marker
    const lineTop = snapToDevicePixel(firstBox.bottom - box.top);
    const lineBottom = snapToDevicePixel(lastBox.top - box.top);
    const lineHeight = Math.max(0, lineBottom - lineTop);

    // Horizontal: centre of the marker column (same for all markers)
    const lineX = snapToDevicePixel(firstBox.left - box.left + firstBox.width / 2);

    timeline.style.setProperty('--line-top', `${lineTop}px`);
    timeline.style.setProperty('--line-height', `${lineHeight}px`);
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
