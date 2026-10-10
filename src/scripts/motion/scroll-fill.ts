/**
 * Scroll-linked fill: a `data-fill-track` element sets --p (0→1) on its `data-fill` child as it
 * scrolls past. CSS: height: calc(var(--p) * 100%). `data-fill-start="0.6"` is where in the
 * viewport (0 = top, 1 = bottom) the fill starts. Used by the timeline and daily-feed rails.
 */
import { prefersReducedMotion, onScrollFrame } from './reduced-motion';

const tracks = [...document.querySelectorAll<HTMLElement>('[data-fill-track]')];
if (tracks.length && !prefersReducedMotion()) {
  onScrollFrame(() => {
    for (const track of tracks) {
      const fill = track.querySelector<HTMLElement>('[data-fill]');
      if (!fill) continue;
      const start = Number(track.dataset.fillStart ?? 0.65);
      const r = track.getBoundingClientRect();
      fill.style.setProperty('--p', Math.min(1, Math.max(0, (innerHeight * start - r.top) / r.height)).toFixed(3));
    }
  });
}
