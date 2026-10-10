# nilaypatel.github.io

Personal site for Nilay Patel, built with [Astro](https://astro.build) + MDX and deployed to GitHub Pages by GitHub Actions.

- `/`: an interactive résumé built from an ordered list of sections in `src/site.config.ts`: a hero with a generative "signal from noise" animation, then about, highlights, experience and education, skills, interests, the latest posts, and contact. See [Customizing the site](#customizing-the-site).
- `/projects/`: longer posts about projects, ideas, and accolades, from `src/content/projects/`.
- `/daily/`: a feed of short daily entries (a quote, an optional Spotify track, a note), from `src/content/daily/`.
- `/rss.xml` covers both collections, and the sitemap is generated automatically.

## Run it locally

Requires Node 22+.

```bash
npm install
npm run dev       # http://localhost:4321, live reload
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
npm run check     # style lint + typecheck + build. Run before every commit.
```

## Working with AI assistants

The repo is set up so simpler AI models can make changes without breaking the look:
- **[AGENTS.md](AGENTS.md):** the site map, the golden rules, and step-by-step recipes (daily entry, project post, home sections, new section type, new post type, résumé info). `CLAUDE.md` and `.cursor/rules/site.mdc` point models to it automatically.
- **[STYLE.md](STYLE.md):** the "market tape" look, design tokens, do/don't examples, and the components and animations to reuse.
- **[docs/prompts/](docs/prompts/):** copy-paste prompts for common tasks. Fill in the brackets and hand one to a model.
- **Guardrails:** `npm run check` fails loudly, saying which file and field is wrong and what to do, when:
  - a config, section, or frontmatter field is misspelled, missing, or the wrong type;
  - a link is malformed;
  - a color, px value, or font is hardcoded outside `src/styles/tokens.css`;
  - an internal link skips the base path.

  The same checks run on every pull request (`.github/workflows/check.yml`), and the style lint also runs before each deploy.

## Edit the home page

The home page is the `sections` list in **`src/site.config.ts`**, rendered top to bottom. Each entry's `type` picks a section design, and the other fields are its content.
- Empty lists (`[]`) and empty links (`''`) hide themselves, so a section with nothing to show disappears along with its nav link.
- Text containing `PLACEHOLDER` is shown with a dashed outline so it's obvious what's left to fill in.
- **Résumé:** put the PDF at `public/resume.pdf` and set `const resume = '/resume.pdf'` at the top of the file.
- **Cards that link to posts:** a card can point at a post with `ref: 'projects/coffee'`. It links only once that post is published.

To add, move, or design sections, see [Customizing the site](#customizing-the-site).

## Add a project, idea, or accolade (3 steps)

1. **Create the file:** `npm run new-post projects "Pairs trading with cointegration"`. This creates `src/content/projects/pairs-trading-with-cointegration.mdx` from `src/content/templates/article.mdx`. The file name becomes the URL: `/projects/pairs-trading-with-cointegration/`.
2. **Write it.** Only `title` and `date` are required:

   ```mdx
   ---
   title: Pairs trading with cointegration
   date: 2026-10-01
   description: Optional teaser for the index, RSS, and link previews (defaults to the opening of the post).
   kind: idea                                            # optional label: project | idea | accolade (default: project)
   cover: ./pairs-trading-with-cointegration/cover.png   # optional
   series: Hedge fund from scratch                       # optional, adds "part n of N" navigation
   draft: true                                           # optional, only visible in `npm run dev`
   ---
   ```

   Then write Markdown.
   - **Images:** put them in a folder named after the post (`src/content/projects/pairs-trading-with-cointegration/`). An image on its own line becomes a numbered figure you can click to enlarge, and the quoted text becomes its caption: `![What the chart shows](./pairs-trading-with-cointegration/spread.png "Caption.")`.
   - **Code and math:** fenced code gets highlighting and a copy button, and `$...$` / `$$...$$` render as math.

3. **Publish:** new posts start with `draft: true`. Delete that line, preview with `npm run dev`, run `npm run check`, then commit and push to `main`.

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

   **New fields:** any simple field you add (text, number, or yes/no) appears on the entry as a label without code changes. To give a field its own design, add it to the `journal` schema in `src/content.config.ts` and render it in `src/components/JournalCard.astro`.

3. **Publish:** delete the `draft: true` line, run `npm run check`, then commit and push to `main`.

The two dated entries in `src/content/daily/` are samples (`sample: true`). Delete them once you have your own.

Nothing else needs editing for either type. The home page, the indexes, series navigation, RSS, and the sitemap all update from the folders. Files whose names start with `_` are ignored.

## Customizing the site

### Add, reorder, remove, or duplicate a section

Edit the `sections` array in `src/site.config.ts`:
- **Reorder:** move an entry up or down.
- **Remove:** delete the entry. To keep it for later, add `hidden: true` instead.
- **Duplicate:** copy an entry and give it a different `id`.
- **Add:** add an entry using one of the built-in types below.

Section kickers are numbered automatically (01, 02, …) in page order, skipping hidden sections. Fields every section accepts:

| Field | Meaning |
|---|---|
| `type` | Which design to use (table below). |
| `id` | The anchor, e.g. `about` gives `/#about`. |
| `nav` | Adds a top-nav link with this label. |
| `animate` | `true` turns on scroll animations: fade-ins, counters, the pinned strip, timeline fill. Leave it out for a static section. |
| `kicker`, `title`, `intro` | Small label, heading, and lead sentence. |
| `hidden` | `true` keeps the entry but doesn't render it. |

Built-in types, one file each in `src/sections/`:

| `type` | Content fields | Good for |
|---|---|---|
| `hero` | `tagline`, `currently`, `buttons: [{ label, href, primary?, icon? }]` | The top of the page (uses the site name) |
| `prose` | `paragraphs: string[]`, `layout: 'side' \| 'stack'` | About text, any text block |
| `stats` | `items: [{ value, label, detail?, href? }]` | Big headline numbers ("Top 50") |
| `timeline` | `groups: [{ label, items: [{ title, sub?, period?, detail?, href? }] }]` | Experience, education, milestones |
| `chips` | `groups: [{ label, items: string[] }]` | Skills, tools, languages |
| `card-grid` | `items: [{ title, text?, badge?, href?, ref?, linkLabel? }]`, `layout: 'grid' \| 'strip'`, `sparkline` | Interests, projects, anything card-shaped |
| `links` | `items: [{ label, href, icon? }]` | Contact, social links |
| `media` | `items: [{ kind: 'spotify' \| 'youtube' \| 'image' \| 'video' \| 'iframe', src, alt?, caption? }]`, `columns` | Embeds, photos, videos |
| `collection-feed` | `feeds: [{ collection, limit?, label? }]` | Latest N entries from any collection, side by side |
| `bands` | `items: [{ collection } \| { href, title, kicker? }]` | Big full-width entry links |

Example: add a music-and-photo block after the about section:

```ts
{
  type: 'media',
  id: 'listening',
  animate: true,
  kicker: 'On repeat',
  items: [
    { kind: 'spotify', src: 'https://open.spotify.com/track/1YQWosTIljIvxAgHWTp7KP' },
    { kind: 'image', src: '/media/setup.jpg', alt: 'My desk setup', caption: 'Where the backtests happen.' },
  ],
},
```

Site paths like `/projects/` or `/media/setup.jpg` (files in `public/`) get the base path automatically. Full URLs pass through unchanged.

### Create a new section type

A section type is two files with the same name in `src/sections/`: the component (`Quote.astro`) and its schema (`Quote.schema.ts`), which lists the allowed fields. Both are picked up automatically, with no registry or page edits.

1. Copy `src/sections/_Example.astro` to `src/sections/Quote.astro`, and `src/sections/_Example.schema.ts` to `src/sections/Quote.schema.ts`. The file name becomes the type in kebab-case: `Quote` is `'quote'`, and `CardGrid` is `'card-grid'`. Files starting with `_` are ignored, which is why the example itself isn't registered.
2. List the fields in the schema file, then use them in the component's `Props` and markup. Every field of the config entry arrives as a prop.
3. Add it to `sections`: `{ type: 'quote', id: 'motto', animate: true, kicker: 'Motto', text: 'Stay curious.', author: 'Me' }`, then run `npm run check`.

The schema file:

```ts
import { defineSection, z, text } from '../lib/section-kit';

export default defineSection({
  text, // required, non-empty
  author: z.string().optional(),
});
```

The example file, trimmed:

```astro
---
import SectionHead from '../components/section/SectionHead.astro';
import { reveal, type SectionProps } from '../lib/section-utils';

// SectionProps gives you id, animate, kicker, title, and intro. Add your own fields here.
interface Props extends SectionProps {
  text: string;
  author?: string;
}
const { id, kicker, title, intro, text, author, animate } = Astro.props;
---

<section id={id} class="sec sec-pad quote" aria-labelledby={title ? `${id}-h` : undefined}>
  <div class="wrap">
    <SectionHead id={id} kicker={kicker} title={title} intro={intro} animate={animate} />
    <figure {...reveal(animate, 1)}>
      <blockquote>{text}</blockquote>
      {author && <figcaption class="mono muted">— {author}</figcaption>}
    </figure>
  </div>
</section>

<style>
  blockquote {
    margin: 0;
    font-family: var(--serif);
    font-size: clamp(1.8rem, 4vw, 3rem);
    border-left: var(--rule) solid var(--accent);
    padding-left: 1.2rem;
  }
</style>
```

Building blocks to use:
- `class="sec sec-pad"` gives standard section spacing and makes the kicker numbered.
- `SectionHead` renders the kicker, title, and intro.
- `reveal(animate, delay)` adds the scroll fade-in only when `animate` is on.
- `.wrap` is the page width.
- All design values are tokens in `src/styles/tokens.css` (`--ink`, `--accent`, `--surface`, `--line`, `--serif`, `--mono`, `--radius-card`, …). See [STYLE.md](STYLE.md) for the reusable motion scripts (`src/scripts/motion/`).
- **Render nothing when empty:** wrap the markup in `{items.length > 0 && (...)}` so an empty section disappears.

### Add a new collection (post type)

A collection is a folder of posts with its own index page, post pages, nav pill, RSS items, and `new-post` support. Two layouts are built in: `article` (like Projects) and `journal` (like Daily).

1. Add an entry to `src/collections.mjs`:

   ```js
   { name: 'notes', layout: 'article', title: 'Notes', intro: 'Short technical notes.', nav: 'Notes' },
   ```

2. Create the first post: `npm run new-post notes "My first note"`. This makes `src/content/notes/my-first-note.mdx`.
3. Run `npm run dev` and open `/notes/`. To show it on the home page, add `{ collection: 'notes' }` to a `collection-feed` or `bands` section.

Frontmatter is the same as for the built-in collection with that layout. For a different set of fields, add a schema next to `article` and `journal` in `src/content.config.ts`, plus matching page layouts in `src/layouts/collection/`.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it with `actions/deploy-pages` on every push to `main`.

**Where the site lives is one value: `SITE_URL`.** Its origin becomes Astro's `site` and its path becomes `base`. Every link, asset, image, the RSS feed, the sitemap, robots.txt, and the canonical and Open Graph URLs follow it. In the workflow, `SITE_URL` comes from the repo's actual Pages URL (`actions/configure-pages`):
- Today GitHub serves this repo at the domain root, `https://anothernilaypatel.github.io/`.
- If GitHub serves it as a project site (`https://anothernilaypatel.github.io/nilaypatel.github.io/`) or a custom domain is added, the build follows automatically.
- To force a value, set a repository variable named `SITE_URL` (Settings → Secrets and variables → Actions → Variables).
- Locally, `astro.config.mjs` falls back to the root URL. To test a subpath, run `SITE_URL=https://example.com/sub/ npm run build`.

In code, always build internal links with `url('/path/')` from `src/lib/url.ts` (and `entryUrl(entry)` for posts), never a bare `/path`. Old `/blog/...` URLs redirect to `/projects/...`. Markdown images and CSS assets are handled by Astro automatically.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**. With "Deploy from a branch", GitHub also runs a Jekyll build of the raw source, which fails.

The old site was a Flutter web app with a service worker. Every page removes any registered `flutter_service_worker.js` and its caches, wherever it was registered. `public/flutter_service_worker.js` also replaces the old worker when the site is served from a domain root.

## Project layout

```
AGENTS.md, STYLE.md     how to change the site / how it should look (start here)
docs/prompts/           copy-paste prompts for AI assistants
src/
  site.config.ts        site name, links, and the home page `sections` list (edit me)
  collections.mjs       collections (post types): name, layout, titles, nav
  sections/             <Name>.astro + <Name>.schema.ts per home section type (auto-discovered)
  content/<collection>/ posts: <slug>.mdx (+ optional <slug>/ image folder), or <date>.md for journals
  content/templates/    commented templates used by `npm run new-post`
  content.config.ts     frontmatter schemas, built from collections.mjs
  styles/               tokens.css (every design value), global.css (base + utilities), prose.css (posts)
  scripts/motion/       reusable animations, one per file (reveal, tilt, spotlight, scroll-fill, …)
  pages/                home, [collection] index + entry routes, rss, robots, 404, /blog redirects
  layouts/              Base (<head>, SEO, theme), collection/ (article + journal pages)
  components/           MarketField (hero canvas), JournalCard, Spotify, Sparkline, Nav, Footer, section/SectionHead
  lib/                  config validation, section registry and schemas, collection helpers, url() helpers
scripts/                new-post.mjs (`npm run new-post`), lint-style.mjs (design guardrails)
public/                 favicon, og.jpg, Flutter service-worker cleanup
```

Motion respects `prefers-reduced-motion`: the canvas renders a single static frame, marquees stop, and reveal animations are skipped. All text is real HTML, so the site works without JavaScript.
