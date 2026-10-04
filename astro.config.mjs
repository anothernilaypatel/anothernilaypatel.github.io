import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
import rehypeFigure from './src/lib/rehype-figure.mjs';

export default defineConfig({
  site: 'https://anothernilaypatel.github.io',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex, rehypeFigure] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'vesper' },
      defaultColor: false,
      wrap: false,
    },
  },
});
