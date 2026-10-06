import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
import rehypeFigure from './src/lib/rehype-figure.mjs';

// Where the site is served from. The deploy workflow sets SITE_URL from the repo's
// GitHub Pages URL, so a project-site subpath and a root/custom domain both work.
// Its origin becomes `site`; its path becomes `base`.
const siteUrl = new URL(process.env.SITE_URL || 'https://anothernilaypatel.github.io/nilaypatel.github.io/');

export default defineConfig({
  site: siteUrl.origin,
  base: siteUrl.pathname,
  integrations: [mdx(), sitemap({ filter: (page) => !/\/blog\//.test(page) })],
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex, rehypeFigure] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'vesper' },
      defaultColor: false,
      wrap: false,
    },
  },
});
