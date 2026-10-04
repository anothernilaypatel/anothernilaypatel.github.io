import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, describe, postUrl } from '../lib/posts';
import { site } from '../site.config';
import { absoluteUrl } from '../lib/url';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} — research log`,
    description: site.description,
    site: absoluteUrl('/', context.site!),
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: describe(p),
      link: new URL(postUrl(p), context.site).href,
    })),
  });
}
