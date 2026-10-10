/** Hero drift: a `data-hero` element gets --hp (0→1) as it scrolls out of view. */
import { prefersReducedMotion, onScrollFrame } from './reduced-motion';

const hero = document.querySelector<HTMLElement>('[data-hero]');
if (hero && !prefersReducedMotion()) {
  onScrollFrame(() => hero.style.setProperty('--hp', Math.min(1, Math.max(0, scrollY / hero.offsetHeight)).toFixed(3)));
}
