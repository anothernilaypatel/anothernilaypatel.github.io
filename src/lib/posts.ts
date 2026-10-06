import { getCollection, type CollectionEntry } from 'astro:content';
import { url } from './url';

export type Post = CollectionEntry<'projects'>;
export type Daily = CollectionEntry<'daily'>;

const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;
const newestFirst = (a: { data: { date: Date } }, b: { data: { date: Date } }) => b.data.date.valueOf() - a.data.date.valueOf();

/** Published projects/ideas/accolades, newest first. Drafts show up only in `npm run dev`. */
export async function getPosts() {
  return (await getCollection('projects', visible)).sort(newestFirst);
}

/** Published daily entries, newest first. */
export async function getDaily() {
  return (await getCollection('daily', visible)).sort(newestFirst);
}

export const postUrl = (p: Post) => url(`/projects/${p.id}/`);
export const dailyAnchor = (d: Daily) => `d-${d.id}`;
export const dailyUrl = (d: Daily) => url(`/daily/#${dailyAnchor(d)}`);

export const kindLabel = { project: 'Project', idea: 'Idea', accolade: 'Accolade' } as const;

function plainText(body = '') {
  return body
    .replace(/^(import|export)\s.*$/gm, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~$]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Frontmatter `description`, or the first ~160 characters of the post. */
export function describe(p: Post) {
  if (p.data.description) return p.data.description;
  const text = plainText(p.body);
  if (text.length <= 160) return text;
  return text.slice(0, text.lastIndexOf(' ', 157)) + '…';
}

export function readingTime(body = '') {
  return Math.max(1, Math.round(plainText(body).split(' ').filter(Boolean).length / 220));
}

/** Posts sharing this post's `series`, oldest first, plus this post's 1-based position. */
export function seriesOf(post: Post, posts: Post[]) {
  if (!post.data.series) return { parts: [] as Post[], index: 0 };
  const parts = posts.filter((p) => p.data.series === post.data.series).sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  return { parts, index: parts.findIndex((p) => p.id === post.id) + 1 };
}

/** Daily frontmatter fields without custom rendering, shown as small labels. */
export function extraFields(d: Daily) {
  const known = new Set(['date', 'quote', 'spotify', 'note', 'draft']);
  return Object.entries(d.data)
    .filter(([k, v]) => !known.has(k) && v !== '' && v !== undefined && v !== null)
    .map(([k, v]) => ({ label: k.replace(/[-_]/g, ' '), value: typeof v === 'boolean' ? (v ? 'yes' : 'no') : String(v) }));
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export const fmtDay = (d: Date) => ({
  weekday: d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }),
  day: d.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'UTC' }),
  month: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }),
});
