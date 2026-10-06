import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Files starting with "_" are ignored by both collections, so they can be used for scratch notes.

/** Longer posts: projects, ideas, and accolades. One <slug>.mdx file each. */
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      kind: z.enum(['project', 'idea', 'accolade']).default('project'),
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
 * Short daily entries. One <YYYY-MM-DD>.md file each.
 * Known fields get custom rendering; any other simple field you add to the
 * frontmatter (e.g. `mood: focused`) is accepted and shown as a small label.
 */
const daily = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/daily' }),
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

export const collections = { projects, daily };
