import { defineSection, strictObject, z, requiredLink } from '../lib/section-kit';

const item = strictObject({
  kind: z.enum(['spotify', 'youtube', 'image', 'video', 'iframe'], {
    error: "kind must be 'spotify', 'youtube', 'image', 'video', or 'iframe'",
  }),
  src: requiredLink,
  alt: z.string().optional(),
  caption: z.string().optional(),
});

export default defineSection(
  {
    items: z.array(item),
    columns: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(2),
  },
  (value, ctx) => {
    (value.items as { kind: string; alt?: string }[] | undefined)?.forEach((m, i) => {
      if ((m.kind === 'image' || m.kind === 'iframe') && !m.alt?.trim())
        ctx.addIssue({ code: 'custom', path: ['items', i, 'alt'], message: `a ${m.kind} needs alt text describing it` });
    });
  },
);
