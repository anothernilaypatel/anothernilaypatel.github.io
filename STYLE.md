# STYLE.md: the "market tape" look

The site should feel like a quiet trading desk at night: a near-black page and warm off-white type, with **one amber accent** used sparingly, like a live price line. The motion is calm and purposeful (lines drawing, numbers counting, things sliding into place), never bouncy or flashy. Text is real HTML and reads fine with motion off.

## The system in one file

Every design value lives in **`src/styles/tokens.css`**. Use `var(--name)`. `npm run check` fails on raw hex colors, px values, or font names anywhere else.

| Group | Tokens | Use |
|---|---|---|
| Color | `--bg`, `--bg-2`, `--surface`, `--line`, `--ink`, `--ink-2`, `--muted`, `--accent`, `--accent-ink`, `--up`, `--down`, `--paper` | Page, alternate bands, cards, borders, text levels, the accent, chart green/red, the paper behind charts |
| Type | `--serif` (Fraunces: headings, big numbers, quotes), `--sans` (Inter: body), `--mono` (JetBrains Mono: kickers, labels, code) | Pick by role, never by look |
| Lines | `--hairline` (all borders), `--rule` (accent bars, focus) | `border: var(--hairline) solid var(--line)` |
| Radius | `--radius-tag`, `--radius-block`, `--radius-panel`, `--radius-card`, `--radius-feature`, `--radius-pill`, … | Match the element type |
| Size | `--wrap`, `--measure`, `--dot-*`, `--card-min` | Page width, reading width, dots, grid cards |
| Effects | `--glow-*`, `--shadow-*`, `--blur-*`, `--spotlight*` | Glows take a color: `box-shadow: var(--glow) var(--accent)` |
| Motion | `--ease`, `--lift`, `--lift-lg`, `--nudge`, `--reveal*` | The one easing curve, hover moves, reveal distances |

Spacing uses `rem` (and `clamp()` for fluid section padding, like the existing sections). Breakpoints are the literals listed at the top of `tokens.css`, since CSS variables can't be used inside `@media`.

Light mode is automatic: tokens switch under `:root[data-theme='light']`. Never write theme-specific styles in components.

## Do / don't

```css
/* Do */
.card {
  border: var(--hairline) solid var(--line);
  border-radius: var(--radius-card);
  background: var(--surface);
  transition: transform 0.4s var(--ease);
}
.card:hover { transform: translateY(var(--lift-lg)); border-color: color-mix(in srgb, var(--accent) 50%, var(--line)); }
.label { font-family: var(--mono); color: var(--muted); }

/* Don't */
.card { border: 1px solid #222; border-radius: 15px; font-family: 'Inter'; }   /* raw values: the check fails */
.card:hover { transform: scale(1.1) rotate(5deg); }                            /* loud, off-brand motion */
.title { color: #ff00aa; }                                                      /* a second accent color */
```

- **Accent:** one per view, for the thing that matters (primary button, active state, the signal line). Use `--up` and `--down` only for data.
- **Type:** big serif headlines with tight tracking, small uppercase mono kickers (`class="kicker"`), sans body text.
- **Layout:** generous whitespace, hairline dividers, cards with `--surface` backgrounds. Content sits inside `.wrap`.
- **Copy:** short and plain. No emoji.

## Reuse these

**Classes** (global.css):

| Class | What it gives you |
|---|---|
| `.wrap` | Page width |
| `.kicker` | Amber mono label; inside `.sec` it gets an automatic number like "03 / " |
| `.mono` | Mono label text |
| `.muted` | Muted text color |
| `.btn` / `.btn-primary` | Buttons |
| `.ph` | Dashed outline for placeholder text |
| `.sec` / `.sec-pad` | Section wrapper / standard section padding |
| `.sr-only` | Visible to screen readers only |

**Components:**

| Component | Use |
|---|---|
| `components/section/SectionHead.astro` | Kicker, title, and intro for any section |
| `components/Sparkline.astro` | Small deterministic price line (`seed`, `width`, `height`; class `draw` draws it immediately) |
| `components/MarketField.astro` | The hero's animated canvas of random-walk lines |
| `components/JournalCard.astro` | One daily entry |
| `components/Spotify.astro` | Lazy-loaded Spotify embed with a fallback link |

**Motion kit** (`src/scripts/motion/`): import it in a `<script>`, add the data attribute.

| Script | Attribute | Effect |
|---|---|---|
| `reveal` (always loaded) | `data-reveal` (use `reveal(animate, i)`) | Fade up on scroll, staggered |
| `spotlight` | `data-spotlight` | Cursor glow (`--mx`, `--my`) for `radial-gradient(var(--spotlight) circle at var(--mx) var(--my), …)` |
| `tilt` | `data-tilt` | Gentle 3D tilt on hover |
| `scroll-fill` | `data-fill-track` + child `data-fill` | Rail that fills as you scroll (timeline, daily feed) |
| `countdown` | `data-countdown="Top 50"` | Number counts in when visible |
| `pinned-strip` | `data-hs` (see `CardGrid.astro`) | Horizontal strip pinned to vertical scroll |
| `hero-parallax` | `data-hero` | Hero text drifts as you scroll away |

Every motion script respects `prefers-reduced-motion`. Sections only animate when their config entry has `animate: true`.
