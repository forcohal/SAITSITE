import { images } from './images';

/**
 * Hall of Fame Mock Data
 *
 * NOTE: All achievements, project titles, and accolades listed here
 * are mock/prototype examples for challenge demonstration purposes.
 * They do not represent official records or claims of the institution.
 */

export const hallOfFameDisclaimer =
  "Sample prototype records • Created to demonstrate layout hierarchy and interaction";

export const hallOfFameCategories = [
  'ALL',
  'HACKATHONS',
  'RESEARCH',
  'TECHNICAL',
  'ACADEMIC',
];

export const featuredAchievement = {
  id: 'feat-1',
  tag: 'FEATURED',
  year: '2026',
  category: 'HACKATHONS',
  title: 'National Smart Mobility Hackathon — Grand Champions',
  team: 'Team SAIT Synthetix (Prototype Cohort)',
  description:
    'Engineered a fault-tolerant edge telemetry mesh for municipal public transit fleets, achieving top honors and best engineering implementation among 140+ collegiate finalist teams.',
  image: images.hallOfFameFeatured,
  metrics: [
    { label: 'Ranking', value: '1st / 140+' },
    { label: 'Sprint', value: '36 Hours' },
    { label: 'Track', value: 'Edge Computing' },
  ],
};

export const achievementTimeline = [
  {
    id: 'ach-1',
    year: '2026',
    category: 'HACKATHONS',
    title: 'National Hackathon Finalist',
    team: 'Team MeshCore',
    description:
      'Engineered an offline-first decentralized emergency logistics platform designed for remote communications during severe infrastructure outages.',
    highlight: 'Top 5 National Finalist',
  },
  {
    id: 'ach-2',
    year: '2025',
    category: 'TECHNICAL',
    title: '1st Place — Prototype Challenge',
    team: 'Hardware & IoT Lab',
    description:
      'Awarded first prize in the inter-university engineering showcase for creating an ultra-low power sensor gateway for environmental monitoring.',
    highlight: 'Best Technical Architecture',
  },
  {
    id: 'ach-3',
    year: '2025',
    category: 'RESEARCH',
    title: 'Paper Publication — IEEE Distributed Systems',
    team: 'Student Research Group',
    description:
      'Co-authored and published peer-reviewed research analyzing dynamic load-balancing heuristics across hybrid edge-cloud microservices.',
    highlight: 'Peer-Reviewed Acceptance',
  },
  {
    id: 'ach-4',
    year: '2025',
    category: 'HACKATHONS',
    title: 'All-India Hackathon Runners-Up',
    team: 'Team ZeroProof',
    description:
      'Built an automated institutional credential verification pipeline leveraging zero-knowledge proofs to safeguard student data privacy.',
    highlight: '2nd Place & Grant Winner',
  },
  {
    id: 'ach-5',
    year: '2024',
    category: 'ACADEMIC',
    title: 'University-Level Academic Excellence Award',
    team: 'Undergraduate Scholars',
    description:
      'Recognized for exceptional academic consistency across engineering semester evaluations with top cohort ranking and academic honors.',
    highlight: 'Department Gold Medalist',
  },
  {
    id: 'ach-6',
    year: '2024',
    category: 'TECHNICAL',
    title: 'Open Source Innovation Award',
    team: 'DevOps & Tooling Circle',
    description:
      'Developed a lightweight developer environment orchestrator adopted by over 800+ student developers across university coding circles.',
    highlight: 'Regional Developer Award',
  },
];
