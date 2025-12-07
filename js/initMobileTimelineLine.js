// ================================
// initMobileTimelineLine.js
// ================================

export function initMobileTimelineLine() {
  const timelines = document.querySelectorAll('.timeline');
  if (!timelines.length) return;

  // Function to calculate and apply line positions
  const updateTimeline = (timeline) => {
    // Only run on mobile
    if (window.innerWidth > 768) {
        timeline.style.removeProperty('--line-top');
        timeline.style.removeProperty('--line-bottom');
        return;
    }

    const markers = timeline.querySelectorAll('.timeline-marker');
    if (markers.length < 2) return;

    // Get reference positions
    const first = markers[0].getBoundingClientRect();
    const container = timeline.getBoundingClientRect();
    
    // Get the last item's bounding box (to encompass the text content)
    const items = timeline.querySelectorAll('.timeline-item');
    const lastItem = items[items.length - 1];
    const lastRect = lastItem.getBoundingClientRect();

    // Calculate Offsets
    // Start: Center of first marker
    const topOffset = first.top - container.top + (first.height / 2);
    
    // End: Bottom of the last content item (matches "Institute" level)
    const bottomOffset = lastRect.bottom - container.top;

    timeline.style.setProperty('--line-top', `${topOffset}px`);
    timeline.style.setProperty('--line-bottom', `${bottomOffset}px`);
  };

  // 1. Initial Calculation
  timelines.forEach(updateTimeline);

  // 2. Observe for layout changes (fixes "First Load" issue)
  const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => updateTimeline(entry.target));
  });
  
  timelines.forEach(timeline => observer.observe(timeline));

  // 3. Window Resize Fallback
  window.addEventListener("resize", () => {
    timelines.forEach(updateTimeline);
  });
}