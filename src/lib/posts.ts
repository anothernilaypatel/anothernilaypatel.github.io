import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** All published posts, newest first. Drafts show up only in `npm run dev`. */
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (p: Post) => `/blog/${p.id}/`;

function plainText(body = '') {
  return body
    .replace(/^(import|export)\s.*$/gm, '')
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

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
