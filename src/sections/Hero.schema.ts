import { defineSection, strictObject, z, text, link } from '../lib/section-kit';

export default defineSection({
  tagline: text.optional(),
  currently: z.string().optional(), // '' hides the "Currently:" line
  buttons: z
    .array(strictObject({ label: text, href: link, primary: z.boolean().optional(), icon: z.string().optional() }))
    .default([]),
  note: z.string().optional(),
});
