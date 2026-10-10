/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT: the one file to edit for the home page.
 *
 *  - `site`: name and links used across the site.
 *  - `sections`: the home page, top to bottom. Reorder, remove, or duplicate
 *    entries freely. `type` picks a component from src/sections/ (see README,
 *    "Customizing the site"); every other field is that section's content.
 *  - Empty lists hide their section (and its nav link). Values containing
 *    "PLACEHOLDER" are shown with a dashed outline.
 *  - Posts are not listed here: they live in src/content/<collection>/.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Résumé PDF: put the file in public/ (e.g. public/resume.pdf) and set '/resume.pdf'. '' hides the links. */
const resume = '';

export const site = {
  name: 'Nilay Patel',
  handle: 'anothernilaypatel',
  title: 'Nilay Patel: student, builder, competitor',
  description:
    'Nilay Patel: student, builder, and competitive gamer. Projects, ideas, and accolades, plus a daily log of quotes and music.',

  /** Contact links, used by the contact section. Entries with an empty `href` are hidden. */
  links: [
    { label: 'Email', href: '' }, // e.g. 'mailto:you@example.com'
    { label: 'GitHub', href: 'https://github.com/anothernilaypatel' },
    { label: 'LinkedIn', href: '' }, // e.g. 'https://www.linkedin.com/in/your-handle'
  ],
};

export const sections = [
  {
    type: 'hero',
    animate: true,
    tagline: 'Student, builder, and competitor. Usually with a coffee in hand and jazz on.',
    currently: '', // optional "Currently: …" line
    buttons: [
      { label: 'Projects & ideas', href: '/projects/', primary: true },
      { label: 'Daily log', href: '/daily/' },
      { label: 'Résumé (PDF)', href: resume, icon: '↓' },
    ],
  },
  {
    type: 'prose',
    id: 'about',
    nav: 'About',
    animate: true,
    kicker: 'About',
    title: "Hi, I'm Nilay.",
    paragraphs: ['PLACEHOLDER: who you are in two sentences: where you study, what you build, and what drives you.'],
  },
  {
    type: 'stats',
    id: 'highlights',
    animate: true,
    kicker: 'Highlights',
    items: [
      {
        value: 'Top 50',
        label: 'Brawl Stars',
        detail: 'PLACEHOLDER: ranked among the top 50 players (season, region, or leaderboard).',
      },
    ],
  },
  {
    type: 'timeline',
    id: 'path',
    nav: 'Experience',
    animate: true,
    kicker: 'Path',
    title: "Where I've been.",
    groups: [
      {
        label: 'Experience',
        items: [
          {
            title: 'Independent research',
            sub: 'Hedge fund from scratch',
            period: 'Jan 2025 – present',
            detail: 'Building and backtesting systematic FX strategies in Python, with Professor Weijie Pang as a guide. Written up in the projects log.',
            href: '/projects/the-beginning/',
          },
          {
            title: 'PLACEHOLDER role',
            sub: 'PLACEHOLDER organization',
            period: 'PLACEHOLDER',
            detail: 'PLACEHOLDER: one line on what you did and the result.',
          },
        ],
      },
      {
        label: 'Education',
        items: [{ title: 'PLACEHOLDER university', sub: 'PLACEHOLDER degree, major', period: 'PLACEHOLDER – PLACEHOLDER' }],
      },
    ],
  },
  {
    type: 'chips',
    id: 'skills',
    animate: true,
    kicker: 'Skills',
    title: 'The toolkit.',
    groups: [
      { label: 'Code & data', items: ['Python', 'pandas', 'matplotlib', 'seaborn', 'FRED API', 'yfinance'] },
      { label: 'Learning next', items: ['q', 'Julia'] },
      { label: 'Other', items: ['PLACEHOLDER'] },
    ],
  },
  {
    type: 'card-grid',
    id: 'interests',
    animate: true,
    layout: 'strip',
    kicker: 'Interests',
    title: 'Off the clock.',
    // `ref` links a card to a post once that post is published.
    items: [
      { title: 'Coffee', text: 'PLACEHOLDER: brew method, favorite beans, or the café you work from.', ref: 'projects/coffee' },
      { title: 'Jazz', text: 'PLACEHOLDER: what you listen to (or play) and the record on repeat.', ref: 'projects/jazz' },
      { title: 'Brawl Stars', text: 'Competitive play, good enough for the global top 50.', badge: 'Top 50', ref: 'projects/brawl-stars-top-50' },
      { title: 'Super Auto Pets', text: 'PLACEHOLDER: favorite pack, team comps, or a bot idea.', ref: 'projects/super-auto-pets' },
      { title: 'Magic: The Gathering', text: 'PLACEHOLDER: paper and MTG Arena. Formats, decks, and the draft you are proudest of.', ref: 'projects/mtg' },
      { title: 'Markets & quant', text: 'Building a hedge fund from scratch, one backtest at a time.', ref: 'projects/the-beginning' },
    ],
  },
  {
    type: 'collection-feed',
    id: 'latest',
    animate: true,
    kicker: 'Latest',
    title: 'Lately.',
    feeds: [
      { collection: 'daily', limit: 1, label: 'From the daily log' },
      { collection: 'projects', limit: 3, label: 'Projects, ideas & accolades' },
    ],
  },
  {
    type: 'bands',
    animate: true,
    items: [{ collection: 'projects' }, { collection: 'daily' }],
  },
  {
    type: 'links',
    id: 'contact',
    nav: 'Contact',
    animate: true,
    kicker: 'Contact',
    title: 'Say hello.',
    items: [...site.links, { label: 'Résumé (PDF)', href: resume, icon: '↓' }],
  },
  // More section types you can drop in (see README): 'media' (Spotify/YouTube/images), a 'card-grid'
  // with layout: 'grid', another 'prose' block, or a 'collection-feed' for any collection.
];
