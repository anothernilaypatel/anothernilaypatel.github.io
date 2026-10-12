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

  /**
   * Highlight rows. `value` is the headline (any number counts in on scroll).
   * [] hides the section. A row with no cards is skipped.
   */
  highlights: [
    {
      label: 'Hackathons',
      items: [
        {
          value: 'HackHarvard',
          label: 'DocScribe',
          detail: 'Medical assistant AI with a team of four: realtime transcription that flags errors in doctor-patient visits. October 2024.',
          href: '',
        },
        {
          value: '2nd',
          label: 'HackPrinceton',
          detail: "Coinbase's Best Use of OnChainKit. ReliefChain, a funding platform for people in natural disasters, with OnChainKit wallets and Solidity contracts. November 2024.",
          href: '',
        },
        {
          value: '2nd',
          label: "TechStars' Startup Weekend",
          detail: 'My Little Adventure, with a team of eleven: a tourism product with JavaScript geolocation and a Python montage tool. October 2023.',
          href: '',
        },
      ],
    },
    {
      label: 'Quant x Games',
      items: [
        {
          value: 'Leaderboard',
          label: 'Super Auto Pets',
          detail: '',
          href: '/projects/super-auto-pets/',
        },
        {
          value: 'Top 2%',
          label: 'Magic the Gathering: Arena',
          detail: '',
          href: '/projects/mtg/',
        },
        {
          value: 'Top 50',
          label: 'Brawl Stars',
          detail: '',
          href: '/projects/brawl-stars-top-50/',
        },
      ],
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
    { name: 'Coffee', blurb: 'Usually with a coffee in hand.', post: 'coffee' },
    { name: 'Jazz', blurb: 'Usually with jazz on.', post: 'jazz' },
    { name: 'F1', blurb: 'Formula 1.', post: 'f1' },
  ],

  /** Contact links. Entries with an empty `href` are hidden. */
  links: [
    { label: 'Email', href: '' }, // e.g. 'mailto:you@example.com'
    { label: 'GitHub', href: '' }, // https://github.com/anothernilaypatel — footer still links here. Empty href hides Say hello.
    { label: 'LinkedIn', href: '' }, // e.g. 'https://www.linkedin.com/in/your-handle'
  ],

  projectsIntro: 'Longer write-ups on the things I build, chase, and win: projects, half-formed ideas, and accolades.',
  dailyIntro: 'A short daily log: a quote I keep thinking about, a track on repeat, and a line or two.',
};

export const isPlaceholder = (value: string | undefined) => !!value && value.includes('PLACEHOLDER');

export const visibleLinks = site.links.filter((l) => l.href);
