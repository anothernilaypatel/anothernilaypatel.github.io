/**
 * 3D tilt on hover: elements with `data-tilt` get --rx/--ry (deg) and --mx/--my (%).
 * CSS: transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); inside a parent with
 * perspective: var(--perspective). Skipped for touch screens and reduced motion.
 */
import { prefersReducedMotion } from './reduced-motion';

if (!prefersReducedMotion() && matchMedia('(hover: hover)').matches) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}
