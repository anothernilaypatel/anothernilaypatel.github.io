/**
 * Count-in numbers: the first number inside a `data-countdown="Top 50"` element animates when
 * it scrolls into view (bigger values count down, e.g. 2,000 → 50). The final text is in the
 * HTML, so it reads correctly without JavaScript or with reduced motion.
 */
import { prefersReducedMotion } from './reduced-motion';

const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    io.unobserve(e.target);
    const el = e.target as HTMLElement;
    const text = el.dataset.countdown ?? '';
    const m = text.match(/\d[\d,]*/);
    if (!m) continue;
    const target = Number(m[0].replace(/,/g, ''));
    const from = Math.max(target * 40, 1000);
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 1600);
      const eased = 1 - Math.pow(1 - k, 4);
      el.textContent = text.replace(m[0], Math.round(from + (target - from) * eased).toLocaleString('en-US'));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
});
if (!prefersReducedMotion()) document.querySelectorAll('[data-countdown]').forEach((el) => io.observe(el));
