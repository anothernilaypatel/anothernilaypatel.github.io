import { defineSection, strictObject, z, text, link } from '../lib/section-kit';

export default defineSection({
  items: z.array(strictObject({ label: text, href: link, icon: z.string().optional() })),
});
