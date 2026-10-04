import type { APIContext } from 'astro';
import { absoluteUrl } from '../lib/url';

export function GET(context: APIContext) {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap-index.xml', context.site!)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
