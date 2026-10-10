import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { collections, getCollectionConfig, type CollectionConfig } from './collection-config';
import { url } from './url';

export { collections, getCollectionConfig, type CollectionConfig };

export interface ArticleData {
  title: string;
  date: Date;
  description?: string;
  kind?: string;
  cover?: ImageMetadata;
  series?: string;
  draft: boolean;
}
export interface JournalData {
  date: Date;
  quote?: { text: string; author?: string };
  spotify?: string;
  note?: string;
  draft: boolean;
  [extra: string]: unknown;
}

type AnyEntry = CollectionEntry<CollectionKey>;
export type Entry<D = ArticleData | JournalData> = Omit<AnyEntry, 'data'> & { data: D };
export type Article = Entry<ArticleData>;
export type Journal = Entry<JournalData>;

const visible = ({ data }: { data: { draft?: boolean } }) => import.meta.env.DEV || !data.draft;

/** Published entries of a collection, newest first. Drafts show up only in `npm run dev`. */
export async function getEntries<D = ArticleData | JournalData>(name: string): Promise<Entry<D>[]> {
  getCollectionConfig(name);
  const entries = (await getCollection(name as CollectionKey, visible)) as unknown as Entry<D>[];
  return entries.sort((a, b) => (b.data as { date: Date }).date.valueOf() - (a.data as { date: Date }).date.valueOf());
}

export const indexUrl = (name: string) => url(`/${name}/`);
export const entryUrl = (e: { collection: string; id: string }) => url(`/${e.collection}/${e.id}/`);
export const layoutOf = (e: { collection: string }) => getCollectionConfig(e.collection).layout;

/** "projects/coffee" -> URL of that entry if it exists and is published, else undefined. */
export async function resolveRef(ref?: string) {
  if (!ref) return undefined;
  const [name, ...rest] = ref.split('/');
  const id = rest.join('/');
  if (!collections.some((c) => c.name === name)) return undefined;
  const entries = await getEntries(name);
  const hit = entries.find((e) => e.id === id);
  return hit ? entryUrl(hit) : undefined;
}

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

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export const fmtDay = (d: Date) => ({
  weekday: d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }),
  day: d.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'UTC' }),
  month: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }),
});

/** Display title for any entry. Journal entries are titled by collection and date. */
export function titleOf(e: Entry) {
  if (layoutOf(e) === 'article') return (e.data as ArticleData).title;
  return `${getCollectionConfig(e.collection).title} · ${fmtDate(e.data.date)}`;
}

/** Short text for indexes, RSS, and link previews. */
export function describe(e: Entry) {
  if (layoutOf(e) === 'journal') {
    const { quote, note } = e.data as JournalData;
    const q = quote ? `“${quote.text}”${quote.author ? ` — ${quote.author}` : ''}` : '';
    return [q, note].filter(Boolean).join(' ') || plainText(e.body).slice(0, 160);
  }
  const d = e.data as ArticleData;
  if (d.description) return d.description;
  const text = plainText(e.body);
  if (text.length <= 160) return text;
  return text.slice(0, text.lastIndexOf(' ', 157)) + '…';
}

export function readingTime(body = '') {
  return Math.max(1, Math.round(plainText(body).split(' ').filter(Boolean).length / 220));
}

/** "accolade" -> "Accolade"; falls back to the collection's defaultKind. */
export function kindOf(e: Article) {
  const k = e.data.kind ?? getCollectionConfig(e.collection).defaultKind;
  return k ? k.charAt(0).toUpperCase() + k.slice(1) : undefined;
}

/** Entries sharing this entry's `series`, oldest first, plus this entry's 1-based position. */
export function seriesOf(post: Article, posts: Article[]) {
  if (!post.data.series) return { parts: [] as Article[], index: 0 };
  const parts = posts.filter((p) => p.data.series === post.data.series).sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  return { parts, index: parts.findIndex((p) => p.id === post.id) + 1 };
}

/** Journal frontmatter fields without custom rendering, shown as small labels. */
export function extraFields(e: Journal) {
  const known = new Set(['date', 'quote', 'spotify', 'note', 'draft']);
  return Object.entries(e.data)
    .filter(([k, v]) => !known.has(k) && v !== '' && v !== undefined && v !== null)
    .map(([k, v]) => ({ label: k.replace(/[-_]/g, ' '), value: typeof v === 'boolean' ? (v ? 'yes' : 'no') : String(v) }));
}
