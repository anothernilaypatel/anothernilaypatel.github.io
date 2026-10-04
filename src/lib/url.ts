const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix a site path with the configured base, e.g. url('/blog/') -> '/nilaypatel.github.io/blog/'. */
export const url = (path = '/') => `${BASE}/${path.replace(/^\/+/, '')}`;

/** Absolute URL for a site path, for canonical/Open Graph/RSS/sitemap use. */
export const absoluteUrl = (path: string, site: URL | string) => new URL(url(path), site).href;

/** Strip the base from a pathname, so '/nilaypatel.github.io/blog/x/' -> '/blog/x/'. */
export const withoutBase = (pathname: string) =>
  BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;
