/**
 * The validated site config. Import `site` and `sections` from here (not from
 * src/site.config.ts directly) so a mistake in the config fails the build with a clear message.
 */
import { site as rawSite, sections as rawSections } from '../site.config';
import { strictObject, text, link, formatIssues, ConfigError } from './validate';
import { z } from 'astro/zod';
import { validateSections } from './section-schemas';

const siteSchema = strictObject({
  name: text,
  handle: text,
  title: text,
  description: text,
  links: z.array(strictObject({ label: text, href: link })),
});

const parsedSite = siteSchema.safeParse(rawSite);
if (!parsedSite.success) {
  throw new ConfigError(
    'src/site.config.ts (site)',
    formatIssues(parsedSite.error.issues, (p) => `site.${p.join('.')}`),
    'Fields: name, handle, title, description, links. See AGENTS.md → "Update résumé info".',
  );
}

export const site = parsedSite.data;
export const sections = validateSections(rawSections);

/** Text containing PLACEHOLDER is shown with a dashed outline until it's filled in. */
export const isPlaceholder = (value: string | undefined) => !!value && value.includes('PLACEHOLDER');
