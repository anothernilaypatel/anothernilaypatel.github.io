import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { collections, getEntries, titleOf, describe, entryUrl, layoutOf, kindOf, type Article } from '../lib/collections';
import { site } from '../site.config';
import { absoluteUrl } from '../lib/url';

export async function GET(context: APIContext) {
  const items = [];
  for (const c of collections) {
    for (const e of await getEntries(c.name)) {
      items.push({
        title: titleOf(e),
        pubDate: e.data.date,
        description: describe(e),
        link: new URL(entryUrl(e), context.site).href,
        categories: [layoutOf(e) === 'article' ? (kindOf(e as Article) ?? c.title) : c.title],
      });
    }
  }
  items.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: site.name,
    description: site.description,
    site: absoluteUrl('/', context.site!),
    items,
  });
}
