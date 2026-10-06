# nilaypatel.github.io

Personal site for Nilay Patel, built with [Astro](https://astro.build) + MDX and deployed to GitHub Pages by GitHub Actions.

- `/`: an interactive résumé. A hero with a generative "signal from noise" animation, then about, highlights, experience and education, skills, interests, the latest posts, and contact. Each section renders from `src/site.config.ts` and disappears when its config is empty.
- `/projects/`: longer posts about projects, ideas, and accolades, from `src/content/projects/`.
- `/daily/`: a feed of short daily entries (a quote, an optional Spotify track, a note), from `src/content/daily/`.
- `/rss.xml` covers both collections, and the sitemap is generated automatically.

## Run it locally

Requires Node 22+.

```bash
npm install
npm run dev       # http://localhost:4321/nilaypatel.github.io/, live reload
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
npm run check     # type-check .astro/.ts files
```

## Edit the home page

Everything on the home page lives in **`src/site.config.ts`**: tagline, about, highlights, experience, education, skills, interests, contact links, and the résumé PDF.
- An empty value (`''` or `[]`) hides that section, along with its nav link.
- A value containing `PLACEHOLDER` is shown with a dashed outline so it's obvious what's left to fill in.
- **Résumé:** put the PDF at `public/resume.pdf` and set `resume: '/resume.pdf'`.
- **Interests:** each interest can name a project post (`post: 'coffee'`). The card links to that post once it's published.
- **Site paths in config** (like `href: '/projects/the-beginning/'`) get the base path automatically.

## Add a project, idea, or accolade (3 steps)

1. **Create the file:** `npm run new-post project "Pairs trading with cointegration"`. This creates `src/content/projects/pairs-trading-with-cointegration.mdx` from `src/content/templates/project.mdx`. The file name becomes the URL: `/projects/pairs-trading-with-cointegration/`.
2. **Write it.** Only `title` and `date` are required:

   ```mdx
   ---
   title: Pairs trading with cointegration
   date: 2026-10-01
   description: Optional teaser for the index, RSS, and link previews (defaults to the opening of the post).
   kind: project                                         # project | idea | accolade (default: project)
   cover: ./pairs-trading-with-cointegration/cover.png   # optional
   series: Hedge fund from scratch                       # optional, adds "part n of N" navigation
   draft: true                                           # optional, only visible in `npm run dev`
   ---
   ```

   Then write Markdown.
   - **Images:** put them in a folder named after the post (`src/content/projects/pairs-trading-with-cointegration/`). An image on its own line becomes a numbered figure you can click to enlarge, and the quoted text becomes its caption: `![What the chart shows](./pairs-trading-with-cointegration/spread.png "Caption.")`.
   - **Code and math:** fenced code gets highlighting and a copy button, and `$...$` / `$$...$$` render as math.

3. **Publish:** preview with `npm run dev`, then commit and push to `main`.

There are draft stubs for coffee, jazz, Brawl Stars, Super Auto Pets, and MTG. Write them up and delete `draft: true` to publish.

## Add a daily entry (3 steps)

1. **Create the file:** `npm run new-post daily`. This creates `src/content/daily/<today>.md`; pass a date (`npm run new-post daily 2026-10-05`) to pick another day.
2. **Fill in what you want.** Every field except `date` is optional:

   ```md
   ---
   date: 2026-10-05
   quote:
     text: Do not fear mistakes. There are none.
     author: Miles Davis
   spotify: https://open.spotify.com/track/1YQWosTIljIvxAgHWTp7KP   # any Spotify share link → embedded player
   note: A line or two about the day.
   mood: focused                                                    # any extra field shows up as a small label
   ---
   ```

   `quote` can also be a plain string. Anything below the frontmatter is rendered as a longer note.

   **New fields:** any simple field you add (text, number, or yes/no) appears on the entry as a label without code changes. To give a field its own design, add it to the `daily` schema in `src/content.config.ts` and render it in `src/components/DailyCard.astro`.

3. **Publish:** commit and push to `main`.

The two dated entries in `src/content/daily/` are samples (`sample: true`). Delete them once you have your own.

Nothing else needs editing for either type. The home page, the indexes, series navigation, RSS, and the sitemap all update from the folders. Files whose names start with `_` are ignored.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it with `actions/deploy-pages` on every push to `main`.

**Where the site lives is one value: `SITE_URL`.** Its origin becomes Astro's `site` and its path becomes `base`. Every link, asset, image, the RSS feed, the sitemap, robots.txt, and the canonical and Open Graph URLs follow it. In the workflow, `SITE_URL` comes from the repo's actual Pages URL (`actions/configure-pages`):
- For a project site such as this repo (`nilaypatel.github.io` under the `anothernilaypatel` account), it's `https://anothernilaypatel.github.io/nilaypatel.github.io/`.
- If the repo is renamed to `anothernilaypatel.github.io`, or a custom domain is added, it becomes the domain root automatically.
- To force a value, set a repository variable named `SITE_URL` (Settings → Secrets and variables → Actions → Variables).
- Locally, `astro.config.mjs` falls back to the project-site URL. To build for a root domain instead, run `SITE_URL=https://example.com/ npm run build`.

In code, always build internal links with `url('/path/')` from `src/lib/url.ts` (and `postUrl(post)` for posts), never a bare `/path`. Old `/blog/...` URLs redirect to `/projects/...`. Markdown images and CSS assets are handled by Astro automatically.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**. With "Deploy from a branch", GitHub also runs a Jekyll build of the raw source, which fails.

The old site was a Flutter web app with a service worker. Every page removes any registered `flutter_service_worker.js` and its caches, wherever it was registered. `public/flutter_service_worker.js` also replaces the old worker when the site is served from a domain root.

## Project layout

```
src/
  site.config.ts        home page content (edit me)
  content/projects/     projects/ideas/accolades: <slug>.mdx, plus an optional <slug>/ image folder
  content/daily/        daily entries: <YYYY-MM-DD>.md
  content/templates/    templates used by `npm run new-post`
  content.config.ts     frontmatter schemas for both collections
  pages/                home, projects (index + post), daily (feed + entry), rss, robots, 404, /blog redirects
  components/           MarketField (hero canvas), DailyCard, Spotify, Sparkline, Nav, Footer, home/* sections
  layouts/Base.astro    <head>, SEO/Open Graph tags, theme handling
  styles/               global.css (tokens, light/dark), prose.css (post typography)
  lib/                  url() base-path helpers, post helpers, seeded random walks, rehype figure plugin
scripts/new-post.mjs    `npm run new-post project "Title"` / `npm run new-post daily [date]`
public/                 favicon, og.jpg, Flutter service-worker cleanup
```

Motion respects `prefers-reduced-motion`: the canvas renders a single static frame, marquees stop, and reveal animations are skipped. All text is real HTML, so the site works without JavaScript.
