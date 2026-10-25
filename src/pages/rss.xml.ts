import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, describe, postUrl, kindLabel } from '../lib/posts';
import { site } from '../site.config';
import { absoluteUrl } from '../lib/url';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  const items = posts
    .map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: describe(p),
      link: new URL(postUrl(p), context.site).href,
      categories: [kindLabel[p.data.kind]],
    }))
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: site.name,
    description: site.description,
    site: absoluteUrl('/', context.site!),
    items,
  });
}
