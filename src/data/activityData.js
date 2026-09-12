/**
 * Student Activity Logger Mock Data
 *
 * NOTE: All activities, metrics, student names, and point totals
 * are prototype demonstration data. No backend or database is used.
 */

export const activityDisclaimer =
  "Frontend interactive prototype • Sample data for challenge exhibition";

export const activityDashboardStats = [
  { id: 'stat-act', label: 'Activities', value: '12', sublabel: 'Total recorded events' },
  { id: 'stat-ver', label: 'Verified', value: '8', sublabel: 'Faculty & coordinator confirmed' },
  { id: 'stat-ach', label: 'Achievements', value: '5', sublabel: 'Recognized awards & certificates' },
  { id: 'stat-pts', label: 'Points', value: '840', sublabel: 'Cumulative activity score' },
];

export const activityFilterCategories = [
  'ALL',
  'EVENTS',
  'WORKSHOPS',
  'COMPETITIONS',
  'ACADEMIC',
  'PROJECTS',
];

export const initialActivities = [
  {
    id: 'act-1',
    title: 'Smart City Hackathon 2026',
    date: 'Mar 10, 2026',
    category: 'COMPETITIONS',
    role: 'Team Lead',
    status: 'Verified',
    points: '+150 pts',
    proofLink: 'https://github.com/sample/smart-city-mesh',
  },
  {
    id: 'act-2',
    title: 'Modern Web Architecture Workshop',
    date: 'Feb 24, 2026',
    category: 'WORKSHOPS',
    role: 'Participant',
    status: 'Verified',
    points: '+60 pts',
    proofLink: 'https://cert.sample.org/web-arch-2026',
  },
  {
    id: 'act-3',
    title: 'Technical Paper Presentation',
    date: 'Jan 18, 2026',
    category: 'ACADEMIC',
    role: 'Presenter',
    status: 'Pending',
    points: '100 pts (Pending)',
    proofLink: 'https://arxiv.org/sample-paper-id',
  },
  {
    id: 'act-4',
    title: 'SAIT Open Source Tooling Project',
    date: 'Dec 15, 2025',
    category: 'PROJECTS',
    role: 'Core Contributor',
    status: 'Verified',
    points: '+140 pts',
    proofLink: 'https://github.com/sait-sample/tooling',
  },
  {
    id: 'act-5',
    title: 'Annual IT Technical Symposium',
    date: 'Nov 20, 2025',
    category: 'EVENTS',
    role: 'Coordinator',
    status: 'Verified',
    points: '+120 pts',
    proofLink: 'https://symposium.sample.edu/badge',
  },
  {
    id: 'act-6',
    title: 'Inter-College CTF Cybersecurity Challenge',
    date: 'Oct 14, 2025',
    category: 'COMPETITIONS',
    role: 'Participant',
    status: 'Verified',
    points: '+80 pts',
    proofLink: 'https://ctf.sample.org/team-zero',
  },
];

export const leaderboardData = [
  { rank: '01', name: 'Student A', studentId: '2022-IT-014', points: '980 pts', verifiedCount: 14 },
  { rank: '02', name: 'Student B', studentId: '2023-IT-038', points: '920 pts', verifiedCount: 12 },
  { rank: '03', name: 'Student C', studentId: '2022-IT-055', points: '840 pts', verifiedCount: 10 },
  { rank: '04', name: 'Student D', studentId: '2024-IT-021', points: '760 pts', verifiedCount: 9 },
  { rank: '05', name: 'Student E', studentId: '2023-IT-049', points: '710 pts', verifiedCount: 8 },
];
