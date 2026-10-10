import { defineSection, strictObject, z, collectionName } from '../lib/section-kit';

export default defineSection({
  feeds: z.array(
    strictObject({
      collection: collectionName,
      limit: z.number().int().min(1).max(20).default(3),
      label: z.string().optional(),
    }),
  ),
});
