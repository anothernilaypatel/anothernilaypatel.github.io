import { defineSection, strictObject, z, text, requiredLink, collectionName } from '../lib/section-kit';

const band = z.union(
  [
    strictObject({ collection: collectionName, title: z.string().optional(), kicker: z.string().optional() }),
    strictObject({ href: requiredLink, title: text, kicker: z.string().optional() }),
  ],
  { error: "each band needs either { collection: 'projects' } or { href: '/…', title: '…' }" },
);

export default defineSection({ items: z.array(band) });
