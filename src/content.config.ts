/**
 * Frontmatter schemas for every collection (built from src/collections.mjs).
 * A typo or a missing field fails the build with a message saying what to fix.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { collections as configured } from './lib/collection-config';
import { suggest, unknownKeyMessage } from './lib/validate';

// Files starting with "_" are ignored, so they can be used for scratch notes.
const loader = (name: string) => glob({ pattern: '**/[^_]*.{md,mdx}', base: `./src/content/${name}` });

const date = z.coerce.date({ error: 'date must look like 2026-10-05' });

/** Longer posts. One <slug>.mdx file each, images in an optional <slug>/ folder. */
const ARTICLE_FIELDS = ['title', 'date', 'description', 'kind', 'cover', 'series', 'draft'];
const article = (name: string) =>
  defineCollection({
    loader: loader(name),
    schema: ({ image }) =>
      z
        .looseObject({
          title: z.string({ error: 'title is required, e.g. title: "My post"' }).trim().min(1, 'title cannot be empty'),
          date,
          description: z.string().optional(),
          kind: z.string().optional(),
          cover: image().optional(),
          series: z.string().optional(),
          draft: z.boolean({ error: 'draft must be true or false' }).default(false),
        })
        .superRefine((value, ctx) => {
          for (const key of Object.keys(value)) {
            if (!ARTICLE_FIELDS.includes(key)) ctx.addIssue({ code: 'custom', path: [key], message: unknownKeyMessage(key, ARTICLE_FIELDS) });
          }
        }),
  });

const quote = z.union(
  [
    z.string().transform((text) => ({ text, author: undefined as string | undefined })),
    z.object({ text: z.string().trim().min(1, 'quote text cannot be empty'), author: z.string().optional() }),
  ],
  { error: 'quote must be text, or text + author on two indented lines' },
);

const spotify = z
  .url({ error: 'spotify must be a link like https://open.spotify.com/track/…' })
  .refine((u) => /^https:\/\/open\.spotify\.com\/(intl-[a-z-]+\/)?(track|album|playlist|episode|show)\/[A-Za-z0-9]+/.test(u), {
    message: 'spotify must be a share link like https://open.spotify.com/track/…',
  });

/**
 * Short dated entries. One <YYYY-MM-DD>.md file each.
 * Known fields get custom rendering. Any other simple field (e.g. `mood: focused`) is shown as a
 * small label, but a near-miss of a known field (e.g. `qoute`) is treated as a typo.
 */
const JOURNAL_FIELDS = ['date', 'quote', 'spotify', 'note', 'draft'];
const journal = (name: string) =>
  defineCollection({
    loader: loader(name),
    schema: z
      .object({
        date,
        quote: quote.optional(),
        spotify: spotify.optional(),
        note: z.string().optional(),
        draft: z.boolean({ error: 'draft must be true or false' }).default(false),
      })
      .catchall(z.union([z.string(), z.number(), z.boolean()], { error: 'extra fields must be a single value (text, number, true/false)' }))
      .superRefine((value, ctx) => {
        for (const key of Object.keys(value)) {
          if (JOURNAL_FIELDS.includes(key)) continue;
          const hint = suggest(key, JOURNAL_FIELDS);
          if (hint) ctx.addIssue({ code: 'custom', path: [key], message: `"${key}" looks like a typo of "${hint}"` });
        }
      }),
  });

const layouts = { article, journal };

export const collections = Object.fromEntries(configured.map((c) => [c.name, layouts[c.layout](c.name)]));
