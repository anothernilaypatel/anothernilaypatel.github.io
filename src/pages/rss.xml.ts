import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, getDaily, describe, postUrl, fmtDate, kindLabel } from '../lib/posts';
import { site } from '../site.config';
import { absoluteUrl, url } from '../lib/url';

export async function GET(context: APIContext) {
  const [posts, daily] = await Promise.all([getPosts(), getDaily()]);
  const items = [
    ...posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: describe(p),
      link: new URL(postUrl(p), context.site).href,
      categories: [kindLabel[p.data.kind]],
    })),
    ...daily.map((d) => {
      const { quote, note } = d.data;
      const quoteText = quote ? `“${quote.text}”${quote.author ? ` — ${quote.author}` : ''}` : '';
      return {
        title: `Daily · ${fmtDate(d.data.date)}`,
        pubDate: d.data.date,
        description: [quoteText, note].filter(Boolean).join('\n\n'),
        link: new URL(url(`/daily/${d.id}/`), context.site).href,
        categories: ['Daily'],
      };
    }),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: site.name,
    description: site.description,
    site: absoluteUrl('/', context.site!),
    items,
  });
}
