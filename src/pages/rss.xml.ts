import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, describe, postUrl } from '../lib/posts';
import { site } from '../site.config';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} — research log`,
    description: site.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: describe(p),
      link: postUrl(p),
    })),
  });
}
