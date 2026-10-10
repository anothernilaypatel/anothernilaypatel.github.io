/**
 * Helpers for section components (src/sections/*.astro).
 */

/** Props every section receives (validated in src/lib/section-schemas.ts). */
export interface SectionProps {
  id: string;
  animate?: boolean;
  kicker?: string;
  title?: string;
  intro?: string;
}

/** Spread onto an element to give it the scroll-reveal animation when the section has `animate` on. */
export const reveal = (animate: boolean | undefined, delay = 0) =>
  animate ? { 'data-reveal': '', style: `--d:${delay}` } : {};
