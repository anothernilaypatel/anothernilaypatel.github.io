/** True when the visitor asked for less motion. Every motion script checks this. */
export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Run `fn` at most once per animation frame while scrolling (passive listener). */
export function onScrollFrame(fn: () => void) {
  let ticking = false;
  addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        fn();
      });
    },
    { passive: true },
  );
  fn();
}
