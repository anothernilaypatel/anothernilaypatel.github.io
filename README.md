# anothernilaypatel.github.io

Personal site and research log for Nilay Patel, built with [Astro](https://astro.build) + MDX and deployed to GitHub Pages by GitHub Actions.

- `/`: hero with a generative "market tape" animation, then short about, projects, latest posts, a research-log entry band, and contact. Each section renders from `src/site.config.ts` and disappears when its config is empty.
- `/blog/`: the research log, with series navigation, RSS (`/rss.xml`), and a sitemap. All of it is generated from the files in `src/content/blog/`.

## Run it locally

Requires Node 22+.

```bash
npm install
npm run dev       # http://localhost:4321/nilaypatel.github.io/, live reload
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
npm run check     # type-check .astro/.ts files
```

## Edit your bio, projects, and links

Everything personal lives in **`src/site.config.ts`**: tagline, optional "Currently:" line, a short about, projects, and contact links.
- An empty value (`''` or `[]`) hides that section, along with its nav link.
- A value containing `PLACEHOLDER` is shown with a dashed outline so it's obvious what's left to fill in.

## Write a blog post (3 steps)

1. **Create the file.** Run

   ```bash
   npm run new-post "Pairs trading with cointegration"
   ```

   This creates `src/content/blog/pairs-trading-with-cointegration.mdx` from `src/content/post-template.mdx`, with the title and today's date filled in. You can also copy the template by hand; the file name becomes the URL (`/blog/pairs-trading-with-cointegration/`).

2. **Write it.** Only `title` and `date` are required:

   ```mdx
   ---
   title: Pairs trading with cointegration
   date: 2026-10-01
   description: Optional teaser for the blog index, RSS, and link previews (defaults to the opening of the post).
   cover: ./pairs-trading-with-cointegration/cover.png   # optional
   series: Hedge fund from scratch                       # optional, adds "part n of N" navigation
   draft: true                                           # optional, only visible in `npm run dev`
   ---
   ```

   Then write Markdown. Images go in a folder named after the post (`src/content/blog/pairs-trading-with-cointegration/`). Put an image on its own line, and the quoted text becomes a numbered, click-to-enlarge figure:

   ```md
   ![What the chart shows](./pairs-trading-with-cointegration/spread.png "Caption under the figure.")
   ```

   Fenced code blocks get syntax highlighting and a copy button. `$...$` and `$$...$$` render as math.

3. **Publish.** Preview with `npm run dev`, then commit and push to `main`.

Nothing else needs editing. The home page's latest posts, the blog index, series navigation, RSS, and sitemap all update from the posts folder. Files whose names start with `_` are ignored.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it with `actions/deploy-pages` on every push to `main`.

**Where the site lives is one value: `SITE_URL`.** Its origin becomes Astro's `site` and its path becomes `base`. Every link, asset, image, the RSS feed, the sitemap, robots.txt, and the canonical and Open Graph URLs follow it. In the workflow, `SITE_URL` comes from the repo's actual Pages URL (`actions/configure-pages`):
- For a project site such as this repo (`nilaypatel.github.io` under the `anothernilaypatel` account), it's `https://anothernilaypatel.github.io/nilaypatel.github.io/`.
- If the repo is renamed to `anothernilaypatel.github.io`, or a custom domain is added, it becomes the domain root automatically.
- To force a value, set a repository variable named `SITE_URL` (Settings → Secrets and variables → Actions → Variables).
- Locally, `astro.config.mjs` falls back to the project-site URL. To build for a root domain instead, run `SITE_URL=https://example.com/ npm run build`.

In code, always build internal links with `url('/path/')` from `src/lib/url.ts` (and `postUrl(post)` for posts), never a bare `/path`. Markdown images and CSS assets are handled by Astro automatically.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**. With "Deploy from a branch", GitHub also runs a Jekyll build of the raw source, which fails.

The old site was a Flutter web app with a service worker. Every page removes any registered `flutter_service_worker.js` and its caches, wherever it was registered. `public/flutter_service_worker.js` also replaces the old worker when the site is served from a domain root.

## Project layout

```
src/
  site.config.ts        tagline, about, projects, links (edit me)
  content/blog/         posts: <slug>.mdx, plus an optional <slug>/ folder for images
  content/post-template.mdx
  pages/                home, blog index, post page, rss, 404
  components/           MarketField (hero canvas), Sparkline, Nav, Footer
  layouts/Base.astro    <head>, SEO/Open Graph tags, theme handling
  styles/               global.css (tokens, light/dark), prose.css (post typography)
  lib/                  url() base-path helper, seeded random walks, post helpers, rehype figure plugin
scripts/new-post.mjs    `npm run new-post "Title"`
public/                 favicon, og.jpg, robots.txt, Flutter service-worker cleanup
```

Motion respects `prefers-reduced-motion`: the canvas renders a single static frame, marquees stop, and reveal animations are skipped. All text is real HTML, so the site works without JavaScript.
