import { defineSection, strictObject, z, text, link } from '../lib/section-kit';

export default defineSection({
  items: z.array(strictObject({ value: text, label: text, detail: z.string().optional(), href: link.optional() })),
});
