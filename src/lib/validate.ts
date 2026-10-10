/**
 * Shared validation helpers so mistakes fail loudly with a readable message
 * ("unknown field 'tittle' — did you mean 'title'?") instead of silently rendering wrong.
 */
import { z } from 'astro/zod';

function distance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

/** Closest candidate within 2 edits (case-insensitive), if any. */
export function suggest(key: string, candidates: string[]) {
  let best: string | undefined;
  let bestD = 3;
  for (const c of candidates) {
    const dist = distance(key.toLowerCase(), c.toLowerCase());
    if (dist < bestD) [best, bestD] = [c, dist];
  }
  return best;
}

export const unknownKeyMessage = (key: string, allowed: string[]) => {
  const hint = suggest(key, allowed);
  return `unknown field "${key}"${hint ? ` (did you mean "${hint}"?)` : ''}. Allowed: ${allowed.join(', ')}`;
};

/** Like z.object, but unknown keys are errors that name the closest allowed key. */
export function strictObject<T extends z.ZodRawShape>(shape: T) {
  const allowed = Object.keys(shape);
  return z.looseObject(shape).superRefine((value, ctx) => {
    for (const key of Object.keys(value as object)) {
      if (!allowed.includes(key)) ctx.addIssue({ code: 'custom', path: [key], message: unknownKeyMessage(key, allowed) });
    }
  });
}

/** Non-empty text. */
export const text = z.string({ error: 'must be text in quotes' }).trim().min(1, 'cannot be empty');

const LINK = /^(\/|https?:\/\/|mailto:|tel:)/;
const linkMessage = "must be a site path like '/projects/', a full URL like 'https://…', or mailto:/tel:";

/** A link; '' is allowed and means "hide this". */
export const link = z.string().refine((v) => v === '' || LINK.test(v), { message: `${linkMessage} (or '' to hide)` });

/** A link that must be filled in. */
export const requiredLink = z.string().refine((v) => LINK.test(v), { message: linkMessage });

/** Turn zod issues into one readable error. */
export function formatIssues(issues: z.core.$ZodIssue[], where: (path: PropertyKey[]) => string) {
  return issues.map((i) => `  • ${where(i.path)}: ${i.message}`).join('\n');
}

export class ConfigError extends Error {
  constructor(file: string, details: string, help: string) {
    super(`\n\n✖ Invalid ${file}\n${details}\n\n${help}\n`);
    this.name = 'ConfigError';
  }
}
