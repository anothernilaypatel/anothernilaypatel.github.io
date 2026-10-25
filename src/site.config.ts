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
  title: 'Nilay Patel: Failure is not falling down, but refusing to get up.',
  description: 'Failure is not falling down, but refusing to get up.',

  /** Big line under the name in the hero. */
  tagline: 'Failure is not falling down, but refusing to get up.',

  /** Optional "Currently: …" line in the hero. '' hides it. */
  currently: '',

  /** Résumé PDF: put the file in public/ (e.g. public/resume.pdf) and set '/resume.pdf'. '' hides the buttons. */
  resume: '',

  /** About: 1–2 short paragraphs. [] hides the section. */
  about: [
    'I am a Computer Science graduate with plenty of ambitions for my future education and career.',
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
          value: 'Top 1',
          label: 'Super Auto Pets',
          detail: 'Monthly leaderboard.',
          href: '/projects/super-auto-pets/',
        },
        {
          value: 'Top 1%',
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
  education: [],

  /** Experience, newest first. [] hides it. `href` is optional. */
  experience: [
    {
      role: 'Jaguar Health',
      org: 'In person',
      period: 'May 2023 – October 2023',
      detail: 'Launched Centage Maestro for finance planning, reconciled $1.4 million, and tracked $700 thousand in prepaid balances.',
      href: '',
    },
  ],

  /** Startup projects from the résumé, newest first. */
  startups: [
    {
      role: 'HackPrinceton',
      org: 'ReliefChain',
      period: 'November 2024',
      detail: 'Team of four. A funding platform for people in natural disasters, with OnChainKit wallets and Solidity contracts.',
      href: '',
    },
    {
      role: 'HackHarvard',
      org: 'DocScribe',
      period: 'October 2024',
      detail: 'Team of four. A medical assistant that transcribes visits in real time and flags errors.',
      href: '',
    },
    {
      role: "Techstars' Startup Weekend",
      org: 'My Little Adventure',
      period: 'October 2023',
      detail: 'Team of eleven. A tourism product with JavaScript geolocation and a Python montage tool. Launched an alpha.',
      href: '',
    },
  ],

  /** Competitions from the résumé, newest first. */
  competitions: [
    {
      role: 'CyberStart America',
      org: 'Scholar, top 1,000',
      period: '2020–2024',
      detail: 'Highest prestige. Cybersecurity.',
      href: '',
    },
    {
      role: 'USACO',
      org: 'Gold, top 2,000',
      period: '2018–2022',
      detail: 'Data structures and algorithms.',
      href: '',
    },
  ],

  /** Skills, grouped. [] hides the Toolkit section. */
  skills: [],

  /**
   * Interests, shown as a scroll-driven strip. `post` is an optional project slug
   * (src/content/projects/<slug>.mdx); the card links to it once that post is published.
   */
  interests: [
    { name: 'Coffee', blurb: 'Usually with a coffee in hand.', post: 'coffee' },
    { name: 'Jazz', blurb: 'Usually with jazz on.', post: 'jazz' },
    { name: 'F1', blurb: 'Formula 1.', post: 'f1' },
    { name: 'Coding', blurb: 'Coding.', post: 'coding' },
    { name: 'Poker', blurb: 'Poker.', post: 'poker' },
    { name: 'Golf', blurb: 'Golf.', post: 'golf' },
  ],

  /** Contact links. Entries with an empty `href` are hidden. */
  links: [
    { label: 'Email', href: '' }, // e.g. 'mailto:you@example.com'
    { label: 'GitHub', href: '' }, // https://github.com/anothernilaypatel — footer still links here. Empty href hides Say hello.
    { label: 'LinkedIn', href: '' }, // e.g. 'https://www.linkedin.com/in/your-handle'
  ],

  projectsIntro: 'Hobbies, short sprints, and the rankings and wins worth writing down.',
  dailyIntro: 'A short daily log: a quote I keep thinking about, a track on repeat, and a line or two.',
};

export const isPlaceholder = (value: string | undefined) => !!value && value.includes('PLACEHOLDER');

export const visibleLinks = site.links.filter((l) => l.href);
