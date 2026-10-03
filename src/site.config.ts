/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — the one file to edit for bio, projects, and links.
 *
 *  Anything still containing "PLACEHOLDER" is shown on the site with a
 *  dashed "placeholder" marker so it's obvious what still needs filling in.
 *  Search this file for PLACEHOLDER to find every spot.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Nilay Patel',
  handle: 'anothernilaypatel',
  url: 'https://anothernilaypatel.github.io',
  title: 'Nilay Patel — building a hedge fund from scratch',
  description:
    'Nilay Patel is a university student building systematic trading strategies in public: FX backtests, momentum signals, and a research log of everything that breaks along the way.',

  /** Big line under the name in the hero. */
  tagline: 'Student. Building a hedge fund from scratch, one backtest at a time.',

  /** Small status line ("Currently: …") shown in the hero and the ticker. */
  currently: 'PLACEHOLDER — e.g. "rebuilding my data pipeline after the yfinance crash"',

  /** About section. Each string is one paragraph. */
  bio: [
    'PLACEHOLDER — 2–3 sentences: who you are, university, program, and graduation year.',
    'PLACEHOLDER — what pulled you into quantitative finance and what you want to do next (internship, full-time, grad school…).',
  ],

  /** Quick facts shown as a grid next to the bio. */
  facts: [
    { label: 'Based in', value: 'PLACEHOLDER city' },
    { label: 'Studying', value: 'PLACEHOLDER university · major' },
    { label: 'Class of', value: 'PLACEHOLDER year' },
    { label: 'Tooling', value: 'Python · pandas · FRED · next: q & Julia' },
  ],

  /** Featured projects. `href` is optional; omit or leave '' to hide the link. */
  projects: [
    {
      title: 'FX trend-following backtester',
      blurb:
        'PLACEHOLDER — EUR/USD trend-following with volatility sizing and a 100-day moving average, data from FRED back to 1999.',
      stack: ['Python', 'pandas', 'FRED API'],
      href: '',
      seed: 3,
    },
    {
      title: 'Tech-stock MACD with z-score normalisation',
      blurb: 'PLACEHOLDER — one or two lines on the idea, the universe, and the result.',
      stack: ['Python', 'yfinance'],
      href: '',
      seed: 11,
    },
    {
      title: 'Overnight options strategy',
      blurb: 'PLACEHOLDER — intraday vs. overnight direction study and what it led to.',
      stack: ['Python', 'seaborn'],
      href: '',
      seed: 27,
    },
  ],

  /** Contact links. Set `href` to '' to hide one. */
  links: [
    { label: 'Email', href: 'mailto:PLACEHOLDER@example.com', placeholder: true },
    { label: 'GitHub', href: 'https://github.com/anothernilaypatel', placeholder: false },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/PLACEHOLDER', placeholder: true },
    { label: 'Résumé (PDF)', href: '', placeholder: true },
  ],
};

export const isPlaceholder = (value: string | undefined) => !!value && value.includes('PLACEHOLDER');
