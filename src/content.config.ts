import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // Files starting with "_" are ignored, so they can be used for scratch drafts.
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      cover: image().optional(),
      series: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
