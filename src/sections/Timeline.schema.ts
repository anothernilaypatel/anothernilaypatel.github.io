import { defineSection, strictObject, z, text, link } from '../lib/section-kit';

const item = strictObject({
  title: text,
  sub: z.string().optional(),
  period: z.string().optional(),
  detail: z.string().optional(),
  href: link.optional(),
});

export default defineSection({
  groups: z.array(strictObject({ label: z.string().optional(), items: z.array(item) })),
});
