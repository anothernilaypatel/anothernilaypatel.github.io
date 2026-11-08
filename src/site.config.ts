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

/**
 * Contact details, used by the Contact links and the "Save contact" vCard (/contact.vcf).
 * Empty values are left out of both. Anything filled in here is public: the vCard is a
 * plain file on the site that anyone can download.
 */
export const contact = {
  title: 'Quantitative Developer & Researcher',
  org: 'Golden Egg Labs',
  email: 'nilay.patel.mail@gmail.com',
  phone: '+1-862-485-0945', // only goes in the vCard, never shown on the page
  linkedin: 'https://www.linkedin.com/in/nilay-patel-777735240',
};

/** Public pages that back up the hero fact chips. An empty URL shows the chip as plain text. */
export const proof = {
  // USACO doesn't publish Gold promotions by name; the public record is the January 2019
  // Bronze-to-Silver promotion. Keep the labels to what each page shows.
  usacoNote: 'Public record: promoted Bronze to Silver, January 2019 (score 750, cutoff 750).',
  usaco: [
    { label: 'Promotion results', href: 'http://www.usaco.org/index.php?page=jan19results' },
    { label: 'Bronze results list', href: 'http://www.usaco.org/current/data/jan19_bronze_results.html' },
  ],
  // 2022 Scholars tier, New Jersey (archived NCSF winners page).
  nationalCyberScholar: 'https://web.archive.org/web/2024/https://www.nationalcyberscholarship.org/winners-2022',
  // Roles and the degree have no public page of their own; LinkedIn lists them.
  linkedinExperience: `${contact.linkedin}/details/experience/`,
  linkedinEducation: `${contact.linkedin}/details/education/`,
};

const positioning =
  'Quant developer and researcher. I build risk, forecasting, and trading models in Python, and write up the math behind them.';

export const site = {
  name: 'Nilay Patel',
  handle: 'anothernilaypatel',
  title: 'Nilay Patel: Quantitative Developer & Researcher',
  description: positioning,

  /** Big line under the name in the hero. */
  tagline: positioning,

  /**
   * Fact chips under the tagline: a résumé in one row. `href` links the chip; empty renders a plain chip.
   * `links` (with an optional `note`) turns the chip into a small popover listing several proof pages.
   */
  facts: <{ label: string; href?: string; note?: string; links?: { label: string; href: string }[] }[]>[
    { label: 'Quant Developer @ Golden Egg Labs' },
    { label: "B.S. CS, Wentworth '25" },
    { label: 'FINRA SIE', href: '/projects/passing-the-sie/' },
    { label: 'USACO Gold', note: proof.usacoNote, links: proof.usaco },
    { label: 'National Cyber Scholar', href: proof.nationalCyberScholar },
  ],

  /** Personal motto, shown as a pull quote under About. '' hides it. */
  motto: 'Failure is not falling down, but refusing to get up.',

  /** Optional "Currently: …" line in the hero. '' hides it. */
  currently: '',

  /**
   * Résumé link. '/resume/' is the viewer page, built from this file; the deploy also prints it to
   * /resume.pdf. '' hides the buttons.
   */
  resume: '/resume/',

  /** About: 1–2 short paragraphs. [] hides the section. */
  about: [
    "I'm a quantitative developer and researcher at Golden Egg Labs, where I build 0DTE options algorithms in Python that trade sub-second, backtest them against realistic latency and Monte Carlo paths, and pick stocks from technicals, fundamentals, EDGAR filings, and earnings. I graduated from Wentworth Institute of Technology with a B.S. in Computer Science.",
    "Outside of work, I write up probability, expected-value, and optimization problems, from sizing a Magic: The Gathering deck like a portfolio to mapping a Pareto frontier of dark chocolate. I've also passed FINRA's SIE exam.",
  ],

  /**
   * Highlight rows. `value` is the headline (any number counts in on scroll).
   * [] hides the section. A row with no cards is skipped.
   */
  highlights: <
    {
      label: string;
      items: {
        value: string;
        label?: string;
        project?: string;
        detail?: string;
        href?: string;
        wide?: boolean;
        countUp?: boolean;
        steps?: string[];
      }[];
    }[]
  >[
    {
      label: 'Work',
      items: [
        {
          value: 'Golden Egg Labs',
          label: 'Quantitative Developer & Researcher',
          detail: 'August 2025 to present. 0DTE options algorithms in Python, from scraped market-flow signals to sub-second execution under live risk limits.',
          steps: ['Scrape HIRO, TRACE & TickStrike', 'Backtest with real latency & Monte Carlo', 'Trade sub-second', 'Watch Greeks & max loss live'],
          id: 'golden-egg-labs',
          wide: true,
        },
        {
          value: '$1.4M',
          label: 'Reconciled',
          detail: 'Balances reconciled as a finance intern at Jaguar Health, May to October 2023.',
          countUp: true,
        },
        {
          value: '$700K',
          label: 'Found',
          detail: 'Untracked prepaid assets surfaced during those reconciliations.',
          countUp: true,
        },
        {
          value: '3',
          label: 'Workflows automated',
          detail: 'Journal entries, amortization schedules, and reconciliations in Excel VBA. Then led the Centage Maestro rollout and trained the whole finance department.',
          countUp: true,
        },
      ],
    },
    {
      label: 'Licenses',
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
  education: [
    {
      school: 'Wentworth Institute of Technology',
      credential: 'B.S. Computer Science',
      period: 'September 2022 – December 2025',
      detail: 'Coursework: data science, machine learning, databases, algorithms, data structures, parallel computing, enterprise computing, software engineering, and operating systems.',
      href: proof.linkedinEducation,
    },
  ],

  /**
   * Experience, newest first. [] hides it. `href` is optional. `detail` is the home-page summary;
   * `points` are the résumé bullets (the résumé falls back to `detail`, split by sentence).
   */
  experience: [
    {
      role: 'Golden Egg Labs',
      org: 'Quantitative Developer & Researcher',
      period: 'August 2025 – Present',
      detail: 'Build 0DTE options algorithms that trade sub-second on signals scraped from HIRO, TRACE, and TickStrike. Backtest them on latency-mimicking paper trades and Monte Carlo simulations, track Greeks and multi-position max loss in real time, and pick stocks from technicals, fundamentals, EDGAR filings, and earnings.',
      points: [
        'Build 0DTE options algorithms that trade sub-second on signals scraped from HIRO, TRACE, and TickStrike',
        'Backtest with latency-mimicking paper trades and Monte Carlo simulations for realistic fills and P&L',
        'Monitor positions in real time with Greeks and multi-position max-loss limits to cap downside',
        'Pick stocks by pairing technicals and fundamentals with EDGAR filings and earnings analysis',
        'Write research memos on assumptions, limitations, and results, coordinating deliverables with leadership',
      ],
      href: '/#golden-egg-labs',
    },
    {
      role: 'Jaguar Health',
      org: 'Finance Intern',
      period: 'May 2023 – October 2023',
      detail: 'Reconciled $1.4 million in balances and found $700 thousand in untracked prepaid assets. Automated journal entries, amortization schedules, and reconciliations in Excel VBA, and led the rollout of Centage Maestro, training the full finance department.',
      points: [
        'Reconciled $1.4 million in balances and identified $700 thousand of previously untracked prepaid assets',
        'Automated monthly journal entries, amortization schedules, and reconciliations in Excel VBA',
        'Led implementation of Centage Maestro, a cloud-based financial planning and budgeting platform',
        'Trained the full finance department on Maestro through tailored presentations and live demonstrations',
      ],
      href: proof.linkedinExperience,
    },
  ],

  /** Portfolio: résumé only (the home page shows these as highlight cards). */
  projects: [
    {
      role: 'anothernilaypatel.github.io',
      org: 'Personal portfolio & journey',
      period: 'Ongoing',
      detail: '',
      points: [
        'Modeled concurrent games as leverage on Elo cash-ins to reach #1 on a monthly Super Auto Pets leaderboard',
        'Sized positions under a 4-copy limit using hypergeometric variance to reach top 1% in MTG: Arena',
        'Built a Markov chain expected-value model of tiered payouts to rank top 50 nationally in Brawl Stars',
        'Mapped a 3D Pareto frontier of dark chocolate, trading flavanols per dollar against lead and cadmium',
        'Passed the SIE in 13 hours of study by using AI to build targeted, score-weighted review guides',
      ],
      href: '/',
    },
  ],

  /** Hackathons, newest first. `points` are the résumé bullets, as for experience. */
  startups: [
    {
      role: 'HackPrinceton',
      org: 'ReliefChain',
      period: 'November 2024',
      detail: "Team of four. 2nd in Coinbase's OnChainKit track. Built the Solidity smart contracts, settled in stablecoins, that enforce donor terms on-chain.",
      points: [
        "2nd place, Coinbase's Best Use of OnChainKit",
        "Built a disaster-relief funding platform with a team of 4 using Coinbase's OnChainKit wallets",
        'Developed Solidity smart contracts settled in stablecoins to enforce contractual obligations on-chain',
      ],
      href: '/projects/hackprinceton/',
    },
    {
      role: 'HackHarvard',
      org: 'DocScribe',
      period: 'October 2024',
      detail: "Unofficial project manager for a friend's team; not a registered competitor, and wrote none of the code. Designed the file-in, file-out audit flow and taught a teammate to build its backend on a whiteboard at 1 a.m.",
      points: ['Unofficial PM; designed the audit pipeline’s file-in, file-out flow and taught a teammate to build it'],
      href: '/projects/hackharvard/',
    },
    {
      role: 'Techstars Startup Weekend',
      org: 'My Not So Little Adventure',
      period: 'October 2023',
      detail: 'Team of eleven. 2nd place. A locally curated travel map with JavaScript geolocation and a Python montage tool. Launched an alpha and secured initial funding and workspace.',
      points: ['2nd place', 'Pitched and launched an alpha tourism product with a team of 11, securing initial funding and workspace'],
      href: '/projects/techstars-startup-weekend/',
    },
  ],

  /** Competitions from the résumé, newest first. */
  competitions: [
    {
      role: 'National Cyber Scholarship Foundation',
      org: 'National Cyber Scholar, top 1,152 nationally',
      period: '2022',
      detail: 'Scholars tier, New Jersey. Cybersecurity.',
      href: proof.nationalCyberScholar,
    },
    {
      role: 'USACO',
      org: 'Gold, top 2,000',
      period: '2018–2022',
      detail: 'Data structures and algorithms.',
      href: proof.usaco[0].href,
    },
  ],

  /** Skills, grouped. Résumé only. */
  skills: [
    {
      group: 'Programming',
      items: ['Python', 'SQL', 'R', 'q/KDB+', 'VBA', 'MATLAB', 'C', 'Java', 'bash', 'LaTeX', 'HTML/CSS', 'Flutter/Dart'],
    },
    {
      group: 'Finance',
      items: ['Margin & leverage', 'Options Greeks', 'Securities regulation', 'Reconciliations'],
    },
    {
      group: 'Analytical',
      items: ['Risk modeling', 'Monte Carlo simulation', 'Stress testing', 'Backtesting', 'Statistical analysis', 'Excel/VBA'],
    },
    { group: 'Licenses', items: ['Securities Industry Essentials (SIE), FINRA: passed'] },
  ],

  /**
   * Interests, shown as a scroll-driven strip. `post` is an optional project slug
   * (src/content/projects/<slug>.mdx); the card links to it once that post is published.
   */
  interests: <{ name: string; blurb: string; post?: string }[]>[
    { name: 'Coffee', blurb: 'Usually with a coffee in hand.' },
    { name: 'Jazz', blurb: 'Usually with jazz on.' },
    { name: 'F1', blurb: 'Formula 1.' },
    { name: 'Coding', blurb: 'Coding.' },
    { name: 'Poker', blurb: 'Poker.' },
    { name: 'Golf', blurb: 'Golf.' },
  ],

  /** Contact links, filled from `contact` above. Entries with an empty `href` are hidden. */
  links: [
    { label: 'Email', href: contact.email ? `mailto:${contact.email}` : '' },
    { label: 'LinkedIn', href: contact.linkedin },
  ],

  projectsIntro: 'Hobbies, short sprints, and the rankings and wins worth writing down.',
  dailyIntro: 'A short daily log: a quote I keep thinking about, a track on repeat, and a line or two.',
};

export const isPlaceholder = (value: string | undefined) => !!value && value.includes('PLACEHOLDER');

export const visibleLinks = site.links.filter((l) => l.href);
