/**
 * SAIT Website — Centralized Events & Activities Data
 *
 * Mock/sample data for prototype presentation.
 * Replace URLs in `eventImages` and event metadata below with official
 * SAIT/CUSAT scheduled events without modifying layout code.
 */

export const eventImages = {
  featured: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  flagships: {
    techfest: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    codecraft: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    summit: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
  },
};

export const featuredEvent = {
  badge: 'FLAGSHIP UPCOMING EVENT',
  title: 'SAIT TECHFEST 2026',
  tagline: 'Annual National Technology Symposium',
  description: 'The premier annual gathering of technologists, engineers, and creators. Featuring 48-hour competitive hackathons, robotics challenges, high-impact keynote talks, and student project exhibitions.',
  date: '12 OCT 2026',
  dateBadge: { day: '12', month: 'OCT' },
  time: '10:00 AM IST',
  venue: 'SOE Campus & Seminar Complex',
  category: 'COMPETITIONS',
  status: 'Open for Registration',
  ctaText: 'Register for Techfest',
  link: '#register-techfest',
  image: eventImages.featured,
  stats: [
    { label: 'Expected Teams', value: '120+' },
    { label: 'Prize Pool', value: '₹1.5 Lakhs' },
    { label: 'Workshops', value: '6 Tracks' },
  ],
};

export const eventCategories = [
  'ALL',
  'TECH',
  'WORKSHOPS',
  'EVENTS',
  'COMPETITIONS',
  'TALKS',
];

export const upcomingEvents = [
  {
    id: 'ev-1',
    date: '18 OCT',
    day: '18',
    month: 'OCT',
    title: 'Modern Web Architecture & Edge Computing',
    category: 'TECH',
    time: '2:00 PM',
    venue: 'IT Software Lab 1',
    status: 'Registrations Open',
    link: '#register-web-arch',
  },
  {
    id: 'ev-2',
    date: '22 OCT',
    day: '22',
    month: 'OCT',
    title: 'Design Sprint: Human-Centered Interfaces',
    category: 'WORKSHOPS',
    time: '10:30 AM',
    venue: 'Multimedia Seminar Hall',
    status: 'Limited Seats',
    link: '#register-design-sprint',
  },
  {
    id: 'ev-3',
    date: '28 OCT',
    day: '28',
    month: 'OCT',
    title: 'CodeSprint: 12-Hour Algorithmic Hackathon',
    category: 'COMPETITIONS',
    time: '8:00 AM',
    venue: 'Computing Centre Hall A',
    status: 'Team Registration',
    link: '#register-codesprint',
  },
  {
    id: 'ev-4',
    date: '04 NOV',
    day: '04',
    month: 'NOV',
    title: 'Distributed Systems & Cloud Orchestration',
    category: 'TALKS',
    time: '3:00 PM',
    venue: 'Main Auditorium',
    status: 'Open to All',
    link: '#register-dist-systems',
  },
  {
    id: 'ev-5',
    date: '11 NOV',
    day: '11',
    month: 'NOV',
    title: 'SAIT Open Source Contribution Sprint',
    category: 'TECH',
    time: '1:30 PM',
    venue: 'IT Open Lab',
    status: 'Open to All',
    link: '#register-oss-sprint',
  },
  {
    id: 'ev-6',
    date: '18 NOV',
    day: '18',
    month: 'NOV',
    title: 'Annual Department Sports & Community Meet',
    category: 'EVENTS',
    time: '9:00 AM',
    venue: 'University Grounds',
    status: 'Open for All',
    link: '#register-sports-meet',
  },
];

export const flagshipEvents = [
  {
    id: 'flag-1',
    tag: '01',
    name: 'TECHFEST',
    subtitle: 'Annual Technical Festival',
    description: 'The defining technological celebration of the IT Division, uniting college teams across Kerala for competitive coding, robotic warfare, technical paper presentations, and venture pitches.',
    image: eventImages.flagships.techfest,
    highlight: 'Flagship Symposium · 1000+ Participants',
  },
  {
    id: 'flag-2',
    tag: '02',
    name: 'CODECRAFT',
    subtitle: 'Competitive Coding & Dev Sprint',
    description: 'An intensive, weekend-long development and competitive algorithmic battleground designed to challenge and elevate core programming, debugging, and system implementation skills.',
    image: eventImages.flagships.codecraft,
    highlight: 'Annual Sprint · 48-Hour Coding Marathon',
  },
  {
    id: 'flag-3',
    tag: '03',
    name: 'SAIT SUMMIT',
    subtitle: 'Technology & Community Conference',
    description: 'A dedicated confluence of distinguished alumni, tech leaders, faculty mentors, and aspiring student engineers discussing artificial intelligence, enterprise architectures, and career frontiers.',
    image: eventImages.flagships.summit,
    highlight: 'Leadership Conference · Keynotes & Panels',
  },
];

export const pastEvents = [
  {
    id: 'past-1',
    year: '2026',
    title: 'HackSprint SOE',
    category: 'Competition',
    highlight: '48 collegiate teams completed prototype builds in 24 hours',
  },
  {
    id: 'past-2',
    year: '2025',
    title: 'CodeCraft Winter Edition',
    category: 'Workshop',
    highlight: 'Full-stack development bootcamp with 150+ attendees',
  },
  {
    id: 'past-3',
    year: '2025',
    title: 'Cloud DevOps Workshop',
    category: 'Workshop',
    highlight: 'Hands-on Kubernetes and CI/CD pipelines laboratory session',
  },
  {
    id: 'past-4',
    year: '2025',
    title: 'CyberSec CTF Challenge',
    category: 'Competition',
    highlight: 'Capture-the-flag tournament with 32 competitive cybersecurity squads',
  },
  {
    id: 'past-5',
    year: '2024',
    title: 'SAIT Alumni Tech Panel',
    category: 'Talks',
    highlight: 'Global engineering leaders sharing insights from Silicon Valley & Bengaluru',
  },
  {
    id: 'past-6',
    year: '2024',
    title: 'AI & Data Engineering Summit',
    category: 'Events',
    highlight: 'Keynotes on foundation models and scalable data pipelines',
  },
];
