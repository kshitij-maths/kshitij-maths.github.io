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
    const firstStyle = window.getComputedStyle(first);
    const lastStyle = window.getComputedStyle(last);

    // Horizontal: centre of the marker column (same for all markers)
    const lineX = snapToDevicePixel(firstBox.left - box.left + firstBox.width / 2);

    timeline.style.setProperty('--line-top', `${lineTop}px`);
    timeline.style.setProperty('--line-height', `${lineHeight}px`);
    timeline.style.setProperty('--line-x',      `${lineX}px`);

    // #region agent log
    fetch('http://127.0.0.1:7887/ingest/050c80fe-e65a-4489-88a6-32daed476443',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'04b5bd'},body:JSON.stringify({sessionId:'04b5bd',runId:'timeline-endpoint-debug',hypothesisId:'H1',location:'js/initMobileTimelineLine.js:31',message:'Timeline endpoint geometry comparison',data:{itemCount:markers.length,viewportWidth:window.innerWidth,firstTop:firstBox.top-box.top,firstBottom:firstBox.bottom-box.top,lastTop:lastBox.top-box.top,lastBottom:lastBox.bottom-box.top,lineTop,lineBottom,lineHeight,lineEndFromHeight:lineTop+lineHeight,deltaEndVsLastTop:(lineTop+lineHeight)-(lastBox.top-box.top),firstBorder:firstStyle.borderWidth,lastBorder:lastStyle.borderWidth,firstBoxShadow:firstStyle.boxShadow,lastBoxShadow:lastStyle.boxShadow,firstTransform:firstStyle.transform,lastTransform:lastStyle.transform},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    // #region agent log
    const lineStyle = window.getComputedStyle(timeline, "::before");
    fetch('http://127.0.0.1:7887/ingest/050c80fe-e65a-4489-88a6-32daed476443',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'04b5bd'},body:JSON.stringify({sessionId:'04b5bd',runId:'timeline-render-debug',hypothesisId:'H3',location:'js/initMobileTimelineLine.js:38',message:'Timeline pseudo-element render metrics',data:{devicePixelRatio:window.devicePixelRatio,beforeTop:lineStyle.top,beforeHeight:lineStyle.height,beforeLeft:lineStyle.left,beforeWidth:lineStyle.width,beforeTransform:lineStyle.transform,beforeBorderRadius:lineStyle.borderRadius,markerCenterX:lineX},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

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
