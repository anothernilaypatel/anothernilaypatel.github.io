/**
 * Validates src/collections.mjs (the list of post types) at build time.
 */
import { z } from 'astro/zod';
import { collections as raw } from '../collections.mjs';
import { strictObject, text, formatIssues, ConfigError } from './validate';

const RESERVED = ['blog', 'rss.xml', 'robots.txt', '404', 'index', '_astro'];

const collectionSchema = strictObject({
  name: z
    .string()
    .regex(/^[a-z][a-z0-9-]*$/, 'must be lowercase letters, numbers, and dashes (it becomes the URL /<name>/)')
    .refine((n) => !RESERVED.includes(n), { message: `can't be one of: ${RESERVED.join(', ')}` }),
  layout: z.enum(['article', 'journal'], { error: "must be 'article' (longer posts) or 'journal' (short dated entries)" }),
  title: text,
  accent: z.string().optional(),
  intro: text,
  kicker: z.string().optional(),
  nav: z.string().optional(),
  defaultKind: z.string().optional(),
});

const parsed = z
  .array(collectionSchema)
  .min(1, 'add at least one collection')
  .superRefine((list, ctx) => {
    const seen = new Set<string>();
    list.forEach((c, i) => {
      if (seen.has(c.name)) ctx.addIssue({ code: 'custom', path: [i, 'name'], message: `"${c.name}" is used twice` });
      seen.add(c.name);
    });
  })
  .safeParse(raw);

if (!parsed.success) {
  throw new ConfigError(
    'src/collections.mjs',
    formatIssues(parsed.error.issues, (p) => (typeof p[0] === 'number' ? `collections[${p[0]}]${p.length > 1 ? '.' + p.slice(1).join('.') : ''}` : p.join('.'))),
    'Each entry needs name, layout, title, and intro. See AGENTS.md → "Add a post type".',
  );
}

export type CollectionConfig = z.output<typeof collectionSchema>;
export const collections: CollectionConfig[] = parsed.data;
export const collectionNames = collections.map((c) => c.name);

export const getCollectionConfig = (name: string) => {
  const c = collections.find((c) => c.name === name);
  if (!c) throw new Error(`Unknown collection "${name}". Known: ${collectionNames.join(', ')}. Add it to src/collections.mjs.`);
  return c;
};
