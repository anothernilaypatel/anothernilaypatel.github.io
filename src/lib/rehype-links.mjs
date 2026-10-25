/**
 * Prefixes root-relative links in post Markdown with the site base,
 * so `[Coffee](/projects/coffee/)` works locally and on GitHub Pages.
 * External URLs and links that already include the base are left alone.
 */
export default function rehypeLinks(basePath = '/') {
  const prefix = String(basePath).replace(/\/$/, '');
  const rewrite = (href) => {
    if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return href;
    if (!prefix || href === prefix || href.startsWith(`${prefix}/`)) return href;
    return `${prefix}${href}`;
  };
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'element' && node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
      node.properties.href = rewrite(node.properties.href);
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  return () => (tree) => walk(tree);
}
