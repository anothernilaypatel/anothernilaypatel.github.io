/**
 * Pinned horizontal strip: a `data-hs` section stays pinned while vertical scrolling slides its
 * `data-hs-track` sideways (`data-hs-bar` shows progress). Turns itself off on narrow screens,
 * for reduced motion, or when the cards already fit. Needs the .hs-on CSS from CardGrid.astro.
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('[data-hs]').forEach((section) => {
  const track = section.querySelector<HTMLElement>('[data-hs-track]')!;
  const viewport = section.querySelector<HTMLElement>('[data-hs-viewport]')!;
  const bar = section.querySelector<HTMLElement>('[data-hs-bar]');
  let overflow = 0;
  let on = false;

  const progress = () => {
    const r = section.getBoundingClientRect();
    const span = r.height - innerHeight;
    return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
  };
  const paint = () => {
    if (!on) return;
    const p = progress();
    track.style.setProperty('--x', `${(-p * overflow).toFixed(1)}px`);
    bar?.style.setProperty('--p', p.toFixed(3));
  };
  const layout = () => {
    section.classList.remove('hs-on');
    section.style.height = '';
    overflow = track.offsetWidth - viewport.clientWidth;
    on = !reduce.matches && innerWidth >= 900 && overflow > 40;
    if (on) {
      section.classList.add('hs-on');
      section.style.height = `${innerHeight + overflow}px`;
    }
    paint();
  };

  let ticking = false;
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          paint();
        });
      }
    },
    { passive: true },
  );
  addEventListener('resize', layout);
  reduce.addEventListener('change', layout);
  document.fonts?.ready.then(layout);
  layout();

  // Keep keyboard focus visible: scroll the page so the focused card is on screen.
  track.addEventListener('focusin', (e) => {
    if (!on) return;
    const card = (e.target as HTMLElement).closest<HTMLElement>('[data-hs-track] > *');
    if (!card) return;
    const p = Math.min(1, Math.max(0, (card.offsetLeft - viewport.clientWidth / 2 + card.offsetWidth / 2) / overflow));
    const top = section.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + p * (section.offsetHeight - innerHeight), behavior: 'instant' as ScrollBehavior });
  });
});

