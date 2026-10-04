/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT: the one file to edit for bio, projects, and links.
 *
 *  - Empty values ('' or []) hide their section entirely.
 *  - Values containing "PLACEHOLDER" are shown with a dashed outline so
 *    it's obvious what still needs filling in.
 *  - Blog posts are NOT listed here; they're picked up from src/content/blog/.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Nilay Patel',
  handle: 'anothernilaypatel',
  title: 'Nilay Patel: building a hedge fund from scratch',
  description:
    'Nilay Patel is a university student building systematic trading strategies in public: FX backtests, momentum signals, and a research log of everything that breaks along the way.',

  /** Big line under the name in the hero. */
  tagline: 'Student. Building a hedge fund from scratch, one backtest at a time.',

  /** Optional "Currently: …" line in the hero. '' hides it. */
  currently: '',

  /** Short about section (1–2 sentences). '' hides the section. */
  about: 'PLACEHOLDER: one or two sentences on who you are (university, program, class year) and what you want to do next.',

  /** Intro line on the blog page. */
  blogIntro:
    'Notes from building a hedge fund from scratch as a student: data sources, backtests, signals that worked, and the things that broke.',

  /** Small projects section. [] hides it. `href` is optional. */
  projects: [
    {
      title: 'FX trend-following backtester',
      blurb: 'EUR/USD trend-following with volatility sizing and moving-average and momentum signals, on FRED data back to 1999.',
      stack: ['Python', 'pandas', 'FRED'],
      href: '',
    },
    {
      title: 'Intraday vs. overnight study',
      blurb: 'How intraday moves relate to the next overnight move, bucketed by standard deviation.',
      stack: ['Python', 'yfinance', 'seaborn'],
      href: '',
    },
  ],

  /** Contact links. Entries with an empty `href` are hidden. */
  links: [
    { label: 'Email', href: '' }, // e.g. 'mailto:you@example.com'
    { label: 'GitHub', href: 'https://github.com/anothernilaypatel' },
    { label: 'LinkedIn', href: '' }, // e.g. 'https://www.linkedin.com/in/your-handle'
    { label: 'Résumé', href: '' }, // e.g. '/resume.pdf' (put the file in public/)
  ],
};

export const isPlaceholder = (value: string | undefined) => !!value && value.includes('PLACEHOLDER');

export const visibleLinks = site.links.filter((l) => l.href);
