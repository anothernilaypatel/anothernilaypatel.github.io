import { defineSection, strictObject, z, text, link, postRef } from '../lib/section-kit';

const card = strictObject({
  title: text,
  text: z.string().optional(),
  badge: z.string().optional(),
  href: link.optional(),
  ref: postRef.optional(), // links to a post once it's published, e.g. 'projects/coffee'
  linkLabel: z.string().optional(),
});

export default defineSection({
  items: z.array(card),
  layout: z.enum(['grid', 'strip']).default('grid'),
  sparkline: z.boolean().default(true),
  hint: z.string().optional(),
});
