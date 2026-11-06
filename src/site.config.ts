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
      label: '',
      items: [
        {
          value: 'S13: Passing the SIE in 13 Hours',
          detail: "Passed FINRA's Securities Industry Essentials exam on the first attempt, with no finance degree, using a study pipeline I built with AI. Typical prep is 50 to 75 hours.",
          href: '/projects/passing-the-sie/',
          wide: true,
        },
      ],
    },
    {
      label: 'Hackathons',
      items: [
        {
          value: '2nd',
          label: 'HackPrinceton',
          project: 'ReliefChain',
          detail: "2nd in Coinbase's Best Use of OnChainKit track. Disaster-relief payments through Solidity smart contracts, with spending conditions set by the donor. November 2024.",
          href: '/projects/hackprinceton/',
        },
        {
          value: ':)',
          label: 'HackHarvard',
          project: 'DocScribe',
          detail: "Unofficial project manager for a friend's team. Designed the file-in, file-out audit flow and taught it on a whiteboard at 1 a.m. October 2024.",
          href: '/projects/hackharvard/',
        },
        {
          value: '2nd',
          label: 'Techstars Startup Weekend',
          project: 'My Not So Little Adventure',
          detail: 'Team of eleven. A locally curated travel map; I built the JavaScript geolocation map and a Python montage tool. October 2023.',
          href: '/projects/techstars-startup-weekend/',
        },
      ],
    },
    {
      label: 'Applied probability',
      items: [
        {
          value: 'Top 1%',
          label: 'Magic: The Gathering Arena',
          detail: 'Seasonal leaderboard. Deck building as position sizing: hypergeometric odds for 1 to 4 copies in a 60-card list.',
          href: '/projects/mtg/',
        },
        {
          value: '#1',
          label: 'Super Auto Pets',
          detail: 'Monthly leaderboard. Modeled how the ranked Elo payout and its 5-point floor price a win.',
          href: '/projects/super-auto-pets/',
        },
        {
          value: 'Top 50',
          label: 'Brawl Stars',
          detail: 'National leaderboard. Modeled the expected trophy value of a game in every bracket from 1,000 to 2,000, with and without the win streak.',
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
      detail: "Team of four. 2nd in Coinbase's OnChainKit track. Disaster-relief payments through Solidity smart contracts.",
      href: '',
    },
    {
      role: 'Techstars Startup Weekend',
      org: 'My Not So Little Adventure',
      period: 'October 2023',
      detail: 'Team of eleven. 2nd place. A locally curated travel map with JavaScript geolocation and a Python montage tool. Launched an alpha.',
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
    { name: 'Coffee', blurb: 'Usually with a coffee in hand.' },
    { name: 'Jazz', blurb: 'Usually with jazz on.' },
    { name: 'F1', blurb: 'Formula 1.' },
    { name: 'Coding', blurb: 'Coding.' },
    { name: 'Poker', blurb: 'Poker.' },
    { name: 'Golf', blurb: 'Golf.' },
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
