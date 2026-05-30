// ================================
// initTimelineLine.js  (works for all screen sizes)
// Draws one segment per gap between adjacent markers so the line just
// touches the bottom of the upper circle and the top of the lower one.
// ================================

function snapToPixel(value) {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}

export function initMobileTimelineLine() {
  const timelines = document.querySelectorAll('.timeline');
  if (!timelines.length) return;

  const updateTimeline = (timeline) => {
    timeline.querySelectorAll('.timeline-segment').forEach(el => el.remove());

    const markers = [...timeline.querySelectorAll('.timeline-marker')];
    if (markers.length < 2) return;

    const box = timeline.getBoundingClientRect();
    const lineWidth = parseFloat(
      getComputedStyle(timeline).getPropertyValue('--timeline-line-width')
    ) || 3;

    const firstBox = markers[0].getBoundingClientRect();
    const lineX = snapToPixel(firstBox.left - box.left + firstBox.width / 2);

    for (let i = 0; i < markers.length - 1; i++) {
      const curr = markers[i].getBoundingClientRect();
      const next = markers[i + 1].getBoundingClientRect();

      const top = snapToPixel(curr.bottom - box.top);
      const height = Math.max(0, next.top - curr.bottom);

      if (height <= 0) continue;

      const seg = document.createElement('span');
      seg.className = 'timeline-segment';
      seg.setAttribute('aria-hidden', 'true');
      seg.style.setProperty('--segment-left', `${lineX - lineWidth / 2}px`);
      seg.style.setProperty('--segment-top', `${top}px`);
      seg.style.setProperty('--segment-height', `${height}px`);
      timeline.appendChild(seg);
    }
  };

  const refreshAll = () => timelines.forEach(updateTimeline);

  refreshAll();

  const observer = new ResizeObserver(entries => {
    entries.forEach(entry => updateTimeline(entry.target));
  });
  timelines.forEach(t => observer.observe(t));

  window.addEventListener('resize', refreshAll, { passive: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(refreshAll);
  }

  // Recalculate after fade-in animations on timeline rows (transform shifts markers).
  document.querySelectorAll('.timeline-item.animate-fadeIn').forEach(item => {
    item.addEventListener('animationend', refreshAll, { once: true });
  });

  const fadeSec = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--fade-duration')
  );
  if (!Number.isNaN(fadeSec)) {
    setTimeout(refreshAll, fadeSec * 1000 + 50);
  }
}
