import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

/**
 * One entry in the home page's `sections` list (src/site.config.ts).
 * `type` is the file name of a component in src/sections/, in kebab-case:
 * src/sections/CardGrid.astro -> type: 'card-grid'. Every other field is passed
 * to that component as a prop.
 */
export interface SectionEntry {
  type: string;
  /** Anchor id (#about). Defaults to `<type>-<position>`. */
  id?: string;
  /** Adds a link to this section in the top nav with this label. */
  nav?: string;
  /** Turns on scroll animations (reveals, counters, pinned strips, drawn lines). */
  animate?: boolean;
  /** Keep the entry in the list but don't render it. */
  hidden?: boolean;
  [prop: string]: unknown;
}

/** Common props every section component receives. */
export interface SectionProps {
  id: string;
  animate?: boolean;
  kicker?: string;
  title?: string;
  intro?: string;
}

const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const modules = import.meta.glob<{ default: AstroComponentFactory }>(['../sections/*.astro', '!../sections/_*.astro'], {
  eager: true,
});

/** Auto-discovered section types: every src/sections/*.astro file (except ones starting with "_"). */
export const registry: Record<string, AstroComponentFactory> = Object.fromEntries(
  Object.entries(modules).map(([file, mod]) => [kebab(file.split('/').pop()!.replace(/\.astro$/, '')), mod.default]),
);

export function componentFor(entry: SectionEntry) {
  const c = registry[entry.type];
  if (!c) {
    throw new Error(
      `Unknown section type "${entry.type}". Available: ${Object.keys(registry).sort().join(', ')}. ` +
        `Add src/sections/<Name>.astro to create a new one.`,
    );
  }
  return c;
}

const LIST_KEYS = ['items', 'groups', 'paragraphs', 'feeds'];

/** Hidden if `hidden: true`, or if every list it has (items/groups/paragraphs/feeds) is empty. */
export function isVisible(entry: SectionEntry) {
  if (entry.hidden) return false;
  const lists = LIST_KEYS.filter((k) => Array.isArray(entry[k])).map((k) => entry[k] as unknown[]);
  if (lists.length === 0) return true;
  return lists.some((list) =>
    list.some((item) => {
      if (item && typeof item === 'object' && Array.isArray((item as { items?: unknown[] }).items)) {
        return (item as { items: unknown[] }).items.length > 0;
      }
      return !!item;
    }),
  );
}

export const sectionId = (entry: SectionEntry, index: number) => entry.id ?? `${entry.type}-${index + 1}`;

/** Spread onto an element to give it the scroll-reveal animation when the section has `animate` on. */
export const reveal = (animate: boolean | undefined, delay = 0) =>
  animate ? { 'data-reveal': '', style: `--d:${delay}` } : {};
