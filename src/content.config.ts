import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { collections as configured } from './collections.mjs';

// Files starting with "_" are ignored, so they can be used for scratch notes.
const loader = (name: string) => glob({ pattern: '**/[^_]*.{md,mdx}', base: `./src/content/${name}` });

/** Longer posts. One <slug>.mdx file each, images in an optional <slug>/ folder. */
const article = (name: string) =>
  defineCollection({
    loader: loader(name),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        date: z.coerce.date(),
        description: z.string().optional(),
        kind: z.string().optional(),
        cover: image().optional(),
        series: z.string().optional(),
        draft: z.boolean().default(false),
      }),
  });

const quote = z.union([
  z.string().transform((text) => ({ text, author: undefined as string | undefined })),
  z.object({ text: z.string(), author: z.string().optional() }),
]);

const spotify = z
  .url()
  .refine((u) => /^https:\/\/open\.spotify\.com\/(intl-[a-z-]+\/)?(track|album|playlist|episode|show)\/[A-Za-z0-9]+/.test(u), {
    message: 'Use a Spotify share link like https://open.spotify.com/track/…',
  });

/**
 * Short dated entries. One <YYYY-MM-DD>.md file each.
 * Known fields get custom rendering; any other simple field you add to the
 * frontmatter (e.g. `mood: focused`) is accepted and shown as a small label.
 */
const journal = (name: string) =>
  defineCollection({
    loader: loader(name),
    schema: z
      .object({
        date: z.coerce.date(),
        quote: quote.optional(),
        spotify: spotify.optional(),
        note: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .catchall(z.union([z.string(), z.number(), z.boolean()])),
  });

const layouts = { article, journal };

export const collections = Object.fromEntries(configured.map((c) => [c.name, layouts[c.layout](c.name)]));
