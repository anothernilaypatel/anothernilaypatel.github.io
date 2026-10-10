/**
 * Cursor spotlight: elements with `data-spotlight` get --mx/--my (px) set to the pointer
 * position, for a CSS radial-gradient(var(--spotlight) circle at var(--mx) var(--my), …).
 */
document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});
