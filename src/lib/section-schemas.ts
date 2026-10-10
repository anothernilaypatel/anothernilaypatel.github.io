/**
 * Validates the home page `sections` list against each section type's schema
 * (src/sections/<Name>.schema.ts, auto-discovered like the components).
 */
import { z } from 'astro/zod';
import type { SectionDefinition } from './section-kit';
import { strictObject, suggest, formatIssues, ConfigError } from './validate';

export const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
export const typeFromFile = (file: string) => kebab(file.split('/').pop()!.replace(/\.(astro|schema\.ts)$/, ''));

const modules = import.meta.glob<{ default: SectionDefinition }>(['../sections/*.schema.ts', '!../sections/_*.schema.ts'], { eager: true });
export const definitions: Record<string, SectionDefinition> = Object.fromEntries(
  Object.entries(modules).map(([file, mod]) => [typeFromFile(file), mod.default]),
);
export const sectionTypes = Object.keys(definitions).sort();

const common = {
  type: z.string(),
  id: z.string().regex(/^[a-z][a-z0-9-]*$/, 'id must be lowercase letters, numbers, and dashes, e.g. "about"').optional(),
  nav: z.string().optional(),
  animate: z.boolean({ error: 'animate must be true or false' }).optional(),
  hidden: z.boolean().optional(),
  kicker: z.string().optional(),
  title: z.string().optional(),
  intro: z.string().optional(),
};

const schemaFor = (def: SectionDefinition) => {
  const s = strictObject({ ...common, ...def.shape });
  return def.refine ? s.superRefine(def.refine) : s;
};

export type ParsedSection = { type: string; id: string; nav?: string; hidden?: boolean; [k: string]: unknown };

export function validateSections(raw: unknown): ParsedSection[] {
  if (!Array.isArray(raw)) throw new ConfigError('src/site.config.ts', '  • `sections` must be a list: export const sections = [ … ]', 'See AGENTS.md, recipe 3 (home sections).');
  const problems: string[] = [];
  const ids = new Map<string, number>();
  const out: ParsedSection[] = [];

  raw.forEach((entry, i) => {
    const label = `sections[${i}]${entry?.type ? ` (type '${entry.type}'${entry?.id ? `, id '${entry.id}'` : ''})` : ''}`;
    const def = definitions[entry?.type];
    if (!def) {
      const hint = typeof entry?.type === 'string' ? suggest(entry.type, sectionTypes) : undefined;
      problems.push(`  • ${label}: unknown type "${entry?.type}"${hint ? ` (did you mean "${hint}"?)` : ''}. Available: ${sectionTypes.join(', ')}`);
      return;
    }
    const result = schemaFor(def).safeParse(entry);
    if (!result.success) {
      problems.push(formatIssues(result.error.issues, (p) => `${label} → ${p.length ? p.join('.') : '(entry)'}`));
      return;
    }
    const id = (result.data.id as string | undefined) ?? `${entry.type}-${i + 1}`;
    if (ids.has(id)) problems.push(`  • ${label}: id "${id}" is already used by sections[${ids.get(id)}]; give each section a different id`);
    ids.set(id, i);
    out.push({ ...(result.data as object), type: entry.type, id } as ParsedSection);
  });

  if (problems.length) {
    throw new ConfigError(
      'src/site.config.ts (sections)',
      problems.join('\n'),
      `Each section's fields are defined in src/sections/<Type>.schema.ts. See AGENTS.md, recipe 3 (home sections).`,
    );
  }
  return out;
}
