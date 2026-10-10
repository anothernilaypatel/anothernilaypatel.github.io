/**
 * Scroll reveal: elements with `data-reveal` fade up when they enter the viewport
 * (CSS in global.css; `style="--d:2"` staggers them). Use reveal(animate, delay)
 * from src/lib/section-utils.ts to add the attribute only when a section animates.
 * Loaded once by the Base layout.
 */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
