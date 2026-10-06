/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT: the one file to edit for the home page (an interactive résumé).
 *
 *  - Empty values ('' or []) hide their section, and its nav link.
 *  - Values containing "PLACEHOLDER" are shown with a dashed outline so it's
 *    obvious what still needs filling in.
 *  - Posts are NOT listed here: projects live in src/content/projects/,
 *    daily entries in src/content/daily/. Use `npm run new-post`.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Nilay Patel',
  handle: 'anothernilaypatel',
  title: 'Nilay Patel: student, builder, competitor',
  description:
    'Nilay Patel: student, builder, and competitive gamer. Projects, ideas, and accolades, plus a daily log of quotes and music.',

  /** Big line under the name in the hero. */
  tagline: 'Student, builder, and competitor. Usually with a coffee in hand and jazz on.',

  /** Optional "Currently: …" line in the hero. '' hides it. */
  currently: '',

  /** Résumé PDF: put the file in public/ (e.g. public/resume.pdf) and set '/resume.pdf'. '' hides the buttons. */
  resume: '',

  /** About: 1–2 short paragraphs. [] hides the section. */
  about: [
    'PLACEHOLDER: who you are in two sentences: where you study, what you build, and what drives you.',
  ],

  /** Big highlight cards. `value` is the headline (numbers count in on scroll). [] hides the section. */
  highlights: [
    {
      value: 'Top 50',
      label: 'Brawl Stars',
      detail: 'PLACEHOLDER: ranked among the top 50 players (season, region, or leaderboard).',
      href: '',
    },
  ],

  /** Education, newest first. [] hides it. */
  education: [
    {
      school: 'PLACEHOLDER university',
      credential: 'PLACEHOLDER degree, major',
      period: 'PLACEHOLDER – PLACEHOLDER',
      detail: '',
    },
  ],

  /** Experience, newest first. [] hides it. `href` is optional. */
  experience: [
    {
      role: 'Independent research',
      org: 'Hedge fund from scratch',
      period: 'Jan 2025 – present',
      detail: 'Building and backtesting systematic FX strategies in Python, with Professor Weijie Pang as a guide. Written up in the projects log.',
      href: '/projects/the-beginning/',
    },
    {
      role: 'PLACEHOLDER role',
      org: 'PLACEHOLDER organization',
      period: 'PLACEHOLDER',
      detail: 'PLACEHOLDER: one line on what you did and the result.',
      href: '',
    },
  ],

  /** Skills, grouped. [] hides the section. */
  skills: [
    { group: 'Code & data', items: ['Python', 'pandas', 'matplotlib', 'seaborn', 'FRED API', 'yfinance'] },
    { group: 'Learning next', items: ['q', 'Julia'] },
    { group: 'Other', items: ['PLACEHOLDER'] },
  ],

  /**
   * Interests, shown as a scroll-driven strip. `post` is an optional project slug
   * (src/content/projects/<slug>.mdx); the card links to it once that post is published.
   */
  interests: [
    { name: 'Coffee', blurb: 'PLACEHOLDER: brew method, favorite beans, or the café you work from.', post: 'coffee' },
    { name: 'Jazz', blurb: 'PLACEHOLDER: what you listen to (or play) and the record on repeat.', post: 'jazz' },
    { name: 'Brawl Stars', blurb: 'Competitive play, good enough for the global top 50.', badge: 'Top 50', post: 'brawl-stars-top-50' },
    { name: 'Super Auto Pets', blurb: 'PLACEHOLDER: favorite pack, team comps, or a bot idea.', post: 'super-auto-pets' },
    { name: 'Magic: The Gathering', blurb: 'PLACEHOLDER: paper and MTG Arena. Formats, decks, and the draft you are proudest of.', post: 'mtg' },
    { name: 'Markets & quant', blurb: 'Building a hedge fund from scratch, one backtest at a time.', post: 'the-beginning' },
  ],

  /** Contact links. Entries with an empty `href` are hidden. */
  links: [
    { label: 'Email', href: '' }, // e.g. 'mailto:you@example.com'
    { label: 'GitHub', href: 'https://github.com/anothernilaypatel' },
    { label: 'LinkedIn', href: '' }, // e.g. 'https://www.linkedin.com/in/your-handle'
  ],

  projectsIntro: 'Longer write-ups on the things I build, chase, and win: projects, half-formed ideas, and accolades.',
  dailyIntro: 'A short daily log: a quote I keep thinking about, a track on repeat, and a line or two.',
};

export const isPlaceholder = (value: string | undefined) => !!value && value.includes('PLACEHOLDER');

export const visibleLinks = site.links.filter((l) => l.href);
