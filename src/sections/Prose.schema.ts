import { defineSection, z, text } from '../lib/section-kit';

export default defineSection({
  paragraphs: z.array(text, { error: 'paragraphs must be a list of strings: [\'First.\', \'Second.\']' }),
  layout: z.enum(['side', 'stack']).default('side'),
});
