import { defineSection, strictObject, z, text } from '../lib/section-kit';

export default defineSection({
  groups: z.array(strictObject({ label: text, items: z.array(text) })),
});
