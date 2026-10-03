# anothernilaypatel.github.io

Personal site and research log for Nilay Patel, built with [Astro](https://astro.build) + MDX and deployed to GitHub Pages by GitHub Actions.

- `/`: a scroll-driven story (hero with a generative "market tape", a sticky chart that evolves chapter by chapter, about, projects, contact).
- `/blog/`: the research log, with tag filters, series navigation, RSS (`/rss.xml`), and a sitemap.

## Run it locally

Requires Node 22+.

```bash
npm install
npm run dev       # http://localhost:4321, live reload
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
npm run check     # type-check .astro/.ts files
```

## Edit your bio, projects, and links

Everything personal lives in **`src/site.config.ts`**: tagline, "Currently:" status, bio paragraphs, quick facts, projects, and contact links. Any value containing `PLACEHOLDER` is shown on the site with a dashed outline so it's obvious what's left to fill in. Search the file for `PLACEHOLDER`.

The five story chapters on the home page are in `src/pages/index.astro` (the `chapters` array).

## Write a blog post

1. Create a folder in `src/content/blog/` named after the URL you want, with an `index.mdx` inside:

   ```
   src/content/blog/my-new-post/index.mdx   ->  /blog/my-new-post/
   ```

2. Start the file with frontmatter:

   ```mdx
   ---
   title: Pairs trading with cointegration
   date: 2026-10-01
   summary: One-sentence teaser shown on the blog index and in link previews.
   tags: [stat-arb, backtesting]
   series: Hedge fund from scratch   # optional
   seriesPart: 5                     # optional, orders the series nav
   draft: false                      # true = visible in `npm run dev` only
   ---
   ```

3. Write Markdown below it. Extras that work out of the box:
   - **Code**: fenced blocks with a language (` ```python `) get syntax highlighting and a copy button.
   - **Math**: `$\sigma\sqrt{t}$` inline, or `$$ ... $$` on its own lines (KaTeX).
   - **Charts and images**: put the file next to `index.mdx` and use the `Figure` component, which optimises the image, numbers it, and adds click-to-enlarge:

     ```mdx
     import Figure from '../../../components/Figure.astro';
     import equity from './equity-curve.png';

     <Figure src={equity} alt="Describe what the chart shows" caption="Caption under the figure." />
     ```

4. Preview with `npm run dev`, then commit and push to `main`. The deploy workflow builds and publishes the site in a couple of minutes.

## Deployment

`.github/workflows/deploy.yml` builds with `withastro/action` and publishes with `actions/deploy-pages` on every push to `main`.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

The old site was a Flutter web app with a service worker. `public/flutter_service_worker.js` replaces it with a worker that clears its caches and unregisters itself, so returning visitors get the new site instead of the cached Flutter build.

## Project layout

```
src/
  site.config.ts        bio, projects, links (edit me)
  content/blog/         posts, one folder each (index.mdx + images)
  pages/                index, blog index, post template, rss, 404
  components/           MarketField (hero canvas), Story (sticky chart), Ticker, Sparkline, Figure, Nav, Footer
  layouts/Base.astro    <head>, SEO/Open Graph tags, theme handling
  styles/               global.css (tokens, light/dark), prose.css (post typography)
  lib/                  seeded random walks for the visuals, post helpers
public/                 favicon, og.jpg, robots.txt, Flutter service-worker cleanup
```

Motion respects `prefers-reduced-motion`: the canvas renders a single static frame, marquees stop, and reveal animations are skipped. All text is real HTML, so the site works without JavaScript.
