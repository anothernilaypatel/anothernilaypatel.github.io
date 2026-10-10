/**
 * Building blocks for section schema files (src/sections/<Name>.schema.ts).
 *
 *   import { defineSection, z, text, link } from '../lib/section-kit';
 *   export default defineSection({ text, author: z.string().optional() });
 *
 * The common fields (type, id, nav, animate, hidden, kicker, title, intro) are added for you.
 */
import { z } from 'astro/zod';
import { collectionNames } from './collection-config';

export { z };
export { text, link, requiredLink, strictObject } from './validate';

export interface SectionDefinition {
  shape: z.ZodRawShape;
  refine?: (value: Record<string, unknown>, ctx: z.RefinementCtx) => void;
}

export const defineSection = (shape: z.ZodRawShape, refine?: SectionDefinition['refine']): SectionDefinition => ({ shape, refine });

/** A collection name from src/collections.mjs. */
export const collectionName = z.string().refine((n) => collectionNames.includes(n), {
  message: `must be one of the collections in src/collections.mjs: ${collectionNames.join(', ')}`,
});

/** A post reference like 'projects/coffee'. */
export const postRef = z.string().refine((r) => collectionNames.includes(r.split('/')[0]) && r.split('/').length >= 2, {
  message: `must look like '<collection>/<file-name>', e.g. '${collectionNames[0]}/my-post'`,
});
