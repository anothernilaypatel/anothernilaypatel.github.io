# AGENTS.md: how to change this site

This is Nilay Patel's personal site (Astro, static, deployed to GitHub Pages). Most tasks only need **content and config** edits. Read this file first. Read [STYLE.md](STYLE.md) before touching any styling.

## Golden rules

1. **Edit only what the task needs.** The usual files are `src/site.config.ts` (home page), `src/content/**` (posts), and `public/` (images, résumé PDF). Don't touch `src/lib/`, `src/layouts/`, `src/pages/`, `scripts/`, or `src/styles/` unless the task explicitly asks.
2. **Use an existing section type first.** Ten are built in (see the [recipe](#3-add-reorder-hide-or-remove-a-home-section)). Make a new type only if none fits.
3. **Never hardcode design values.** No hex colors, no px, no font names: use `var(--token)` from `src/styles/tokens.css`. In `.astro` markup, never write `href="/…"`; use `href={url('/…')}`.
4. **Never invent facts about Nilay.** If information is missing, leave the `PLACEHOLDER: …` text (it shows with a dashed outline) and say what's needed.
5. **Don't rename or delete existing post files** (the file name is the URL) unless asked.
6. **Always finish with `npm run check`.** It must end with `[build] Complete!` and no `✖`. If it fails, the message names the file, the field, and the fix. Fix it; don't work around it.

## Site map

| Path | What it is | Edit? |
|---|---|---|
| `src/site.config.ts` | Site name and links, plus the home page `sections` list (order = page order) | **Yes**, for home page changes |
| `src/content/projects/<slug>.mdx` | Project, idea, or accolade posts (`/projects/<slug>/`). Images go in `src/content/projects/<slug>/` | **Yes** |
| `src/content/daily/<YYYY-MM-DD>.md` | Daily entries (`/daily/`) | **Yes** |
| `src/content/templates/` | Templates used by `npm run new-post` (every field explained) | Rarely |
| `src/collections.mjs` | The list of post types (projects, daily, …) | Only to add a post type |
| `src/sections/<Name>.astro` + `<Name>.schema.ts` | One home section type: component plus allowed fields | Only to add a section type |
| `src/styles/tokens.css` | All colors, fonts, sizes, motion values | Only if asked to change the design |
| `public/` | Files served as-is (e.g. `public/resume.pdf` → `/resume.pdf`) | Yes, for images and the résumé |
| `src/lib/`, `src/layouts/`, `src/pages/`, `src/components/`, `src/scripts/` | Plumbing | No |
| `docs/prompts/` | Copy-paste prompts for common tasks | No |

## Commands

```bash
npm run dev                          # preview at http://localhost:4321
npm run new-post daily [YYYY-MM-DD]  # new daily entry (defaults to today)
npm run new-post projects "Title"    # new project/idea/accolade post
npm run check                        # style lint + typecheck + build. Run before finishing.
```

## Recipes

### 1. Add a daily entry

1. Run `npm run new-post daily 2026-10-12` (use the right date; leave it out for today).
2. Open the new file `src/content/daily/2026-10-12.md` and fill in only what you were given:
   - `quote:` with `text:` and `author:` (indented two spaces), or a single line: `quote: Stay curious.`
   - `spotify:` a full `https://open.spotify.com/track/…` link
   - `note:` one or two sentences
3. Delete fields you weren't given, and delete the `draft: true` line.
4. Run `npm run check`.

```md
---
date: 2026-10-12
quote:
  text: Simplicity is the ultimate sophistication.
  author: Leonardo da Vinci
spotify: https://open.spotify.com/track/1YQWosTIljIvxAgHWTp7KP
note: Rebuilt the data loader today.
---
```

### 2. Add a project, idea, or accolade post

1. Run `npm run new-post projects "Building a Super Auto Pets bot"`. This creates `src/content/projects/building-a-super-auto-pets-bot.mdx`.
2. Set `kind:` to `project`, `idea`, or `accolade`. Optionally uncomment `description:`.
3. Replace the sample body with the post in Markdown. Use `##` for headings.
4. Images: put them in `src/content/projects/building-a-super-auto-pets-bot/`, then on their own line write `![alt text](./building-a-super-auto-pets-bot/chart.png "Caption")`.
5. Delete the `draft: true` line to publish, then run `npm run check`.

To finish one of the existing drafts (coffee, jazz, brawl-stars-top-50, super-auto-pets, mtg): edit that file, replace every `PLACEHOLDER`, and delete `draft: true`.

### 3. Add, reorder, hide, or remove a home section

The home page is the `sections` array in `src/site.config.ts`, rendered top to bottom.
- **Reorder:** move a whole `{ … }` entry up or down.
- **Hide:** add `hidden: true`.
- **Remove:** delete the entry.
- **Add:** insert an entry with one of these `type`s. Its allowed fields are listed in `src/sections/<Type>.schema.ts`.

| `type` | Main fields | Use for |
|---|---|---|
| `hero` | `tagline`, `currently`, `buttons` | Top of page |
| `prose` | `paragraphs: ['…']`, `layout: 'side' \| 'stack'` | Text blocks, about |
| `stats` | `items: [{ value, label, detail?, href? }]` | Big numbers / accolades |
| `timeline` | `groups: [{ label, items: [{ title, sub?, period?, detail?, href? }] }]` | Experience, education |
| `chips` | `groups: [{ label, items: ['…'] }]` | Skills |
| `card-grid` | `items: [{ title, text?, badge?, href?, ref? }]`, `layout: 'grid' \| 'strip'` | Interests, cards |
| `links` | `items: [{ label, href }]` | Contact |
| `media` | `items: [{ kind, src, alt?, caption? }]`, `columns` | Spotify, YouTube, images |
| `collection-feed` | `feeds: [{ collection, limit?, label? }]` | Latest posts |
| `bands` | `items: [{ collection }]` | Big links to post lists |

Fields every section accepts: `id` (anchor, lowercase-with-dashes), `nav` (adds a top-nav link), `animate: true` (scroll animations), `kicker`, `title`, `intro`, `hidden`.

Example: add a "Now playing" block right after the about section:

```ts
{
  type: 'media',
  id: 'now-playing',
  animate: true,
  kicker: 'Now playing',
  items: [{ kind: 'spotify', src: 'https://open.spotify.com/track/1YQWosTIljIvxAgHWTp7KP' }],
},
```

Run `npm run check`. Section numbers (01, 02, …) and nav links update automatically.

### 4. Create a new section type

Only if no existing type fits.
1. Copy `src/sections/_Example.astro` to `src/sections/<Name>.astro`, and `src/sections/_Example.schema.ts` to `src/sections/<Name>.schema.ts`. Use PascalCase for `<Name>`, e.g. `Quote`. The type is the kebab-case name: `quote`.
2. In the schema file, list every field the section takes, using `text`, `link`, `z.string().optional()`, `z.array(…)`, and so on.
3. In the component:
   - use the same fields in `Props`;
   - keep `<section class="sec sec-pad">` and `<SectionHead …/>`;
   - add `{...reveal(animate, i)}` to elements that should fade in;
   - style only with tokens.
4. Reuse before you write: components and motion scripts are listed in [STYLE.md](STYLE.md#reuse-these).
5. Add an entry with `type: '<name>'` to `sections` and run `npm run check`.

### 5. Add a post type (collection)

1. Add an entry to `src/collections.mjs`:

   ```js
   { name: 'notes', layout: 'article', title: 'Notes', intro: 'Short technical notes.', nav: 'Notes' },
   ```

   Use `layout: 'article'` for posts with titles, or `'journal'` for dated entries like Daily.
2. Run `npm run new-post notes "First note"`, write it, and delete `draft: true`.
3. Optionally add `{ collection: 'notes' }` to the home page's `collection-feed` or `bands` section.
4. Run `npm run check`. Pages, nav, RSS, and the sitemap update automatically.

### 6. Update résumé info

Everything is in `src/site.config.ts`. Replace `PLACEHOLDER` text only with facts you were given.
- **About:** the `prose` section with `id: 'about'` → `paragraphs`.
- **Highlights / accolades:** the `stats` section → `items` (`value` like `'Top 50'`, `label`, `detail`).
- **Experience and education:** the `timeline` section → `groups` → `items` (`title`, `sub`, `period`, `detail`, optional `href`). Newest first.
- **Skills:** the `chips` section → `groups`.
- **Interests:** the `card-grid` section with `id: 'interests'` → `items`.
- **Email, LinkedIn:** `site.links` at the top. An empty `href` hides the link. Email looks like `mailto:name@example.com`.
- **Résumé PDF:** save it as `public/resume.pdf`, then set `const resume = '/resume.pdf';` near the top of the file. Buttons and links appear automatically.

## When `npm run check` fails

| Message | Fix |
|---|---|
| `unknown field "tittle" (did you mean "title"?)` | Rename the field to the suggestion. |
| `unknown type "timline" (did you mean "timeline"?)` | Use one of the listed types. |
| `must be a site path like '/projects/'…` | Links start with `/`, `https://`, or `mailto:`. Use `''` to hide. |
| `id "…" is already used` | Give each section a unique `id`. |
| `hardcoded color #…` / `hardcoded 40px` | Use a token from `src/styles/tokens.css` (see STYLE.md). |
| `internal link written as href="/…"` | Use `href={url('/…')}` and import `url` from `src/lib/url`. |
| `… data does not match collection schema` | The frontmatter line named under it is wrong. Fix the spelling or format (dates are `YYYY-MM-DD`). |
| `has a component but no schema` | Add the matching `<Name>.schema.ts` (copy `_Example.schema.ts`). |
