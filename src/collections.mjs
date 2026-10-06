/**
 * Content collections ("post types"). Order here is the order in the nav and RSS.
 *
 * Each collection gets, with no other code:
 *   - a folder: src/content/<name>/
 *   - an index page at /<name>/ and a page per entry at /<name>/<file-name>/
 *   - a nav pill (if `nav` is set), RSS items, sitemap entries
 *   (`title`/`accent` form the index heading; `kicker` is the small line above it)
 *   - `npm run new-post <name> ...`
 *
 * `layout` picks the frontmatter schema, page design, and template:
 *   - 'article': longer posts (title, date, optional description/cover/series/kind)
 *                template: src/content/templates/article.mdx
 *   - 'journal': short dated entries (date, optional quote/spotify/note, plus any extra field)
 *                template: src/content/templates/journal.md
 *
 * @typedef {{
 *   name: string,
 *   layout: 'article' | 'journal',
 *   title: string,
 *   accent?: string,
 *   intro: string,
 *   kicker?: string,
 *   nav?: string,
 *   defaultKind?: string,
 * }} CollectionConfig
 */

/** @type {CollectionConfig[]} */
export const collections = [
  {
    name: 'projects',
    layout: 'article',
    title: 'Projects',
    accent: '& ideas',
    intro: 'Longer write-ups on the things I build, chase, and win: projects, half-formed ideas, and accolades.',
    kicker: 'projects · ideas · accolades',
    nav: 'Projects',
    defaultKind: 'project',
  },
  {
    name: 'daily',
    layout: 'journal',
    title: 'Daily',
    accent: 'log',
    intro: 'A short daily log: a quote I keep thinking about, a track on repeat, and a line or two.',
    nav: 'Daily',
  },
];

export const getCollectionConfig = (name) => {
  const c = collections.find((c) => c.name === name);
  if (!c) throw new Error(`Unknown collection "${name}". Add it to src/collections.mjs.`);
  return c;
};
