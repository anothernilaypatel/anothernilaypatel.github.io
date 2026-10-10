// Schema for the example section in _Example.astro. Copy both files together.
// Every field the config entry can have (besides the common ones) must be listed here.
import { defineSection, z, text } from '../lib/section-kit';

export default defineSection({
  text, // required, non-empty
  author: z.string().optional(),
});
