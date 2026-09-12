/**
 * Placements & Careers Mock Data
 *
 * NOTE: The values and recruiter identities below are sample prototype data
 * for demonstration purposes as specified by the challenge requirements.
 * They do not represent official placement statistics or partnerships.
 */

export const placementDisclaimer = "Sample prototype data for illustration • Not official university statistics";

export const placementStats = [
  {
    id: 'rate',
    value: '92%',
    numericValue: 92,
    suffix: '%',
    label: 'Placement Rate',
    context: 'Eligible students successfully placed across tech roles',
  },
  {
    id: 'recruiters',
    value: '45+',
    numericValue: 45,
    suffix: '+',
    label: 'Recruiters',
    context: 'Hiring partners participating in campus drives',
  },
  {
    id: 'offers',
    value: '120+',
    numericValue: 120,
    suffix: '+',
    label: 'Offers',
    context: 'Total recruitment offers extended across cohorts',
  },
  {
    id: 'package',
    value: '12 LPA',
    numericValue: 12,
    suffix: ' LPA',
    label: 'Highest Package',
    context: 'Peak compensation package secured in placement drive',
  },
];

export const placementTrends = [
  { year: '2023', rate: 85, offers: 98, label: '85%' },
  { year: '2024', rate: 89, offers: 108, label: '89%' },
  { year: '2025', rate: 91, offers: 115, label: '91%' },
  { year: '2026', rate: 92, offers: 120, label: '92%' },
];

export const mockRecruiters = [
  { id: 'rec-1', name: 'Meridian Labs', domain: 'Cloud & Distributed Systems' },
  { id: 'rec-2', name: 'Apex Dynamics', domain: 'Enterprise Software' },
  { id: 'rec-3', name: 'NexaTech Systems', domain: 'Fintech & Security' },
  { id: 'rec-4', name: 'Horizon Software', domain: 'AI & Data Platforms' },
  { id: 'rec-5', name: 'Solis Cloud', domain: 'DevOps & Infrastructure' },
  { id: 'rec-6', name: 'Vertex Digital', domain: 'Web & Mobile Engineering' },
];

export const careerResources = [
  {
    id: 'res-1',
    title: 'Placement Preparation',
    description: 'Structured roadmap covering core computer science subjects, problem-solving, and aptitude prep.',
    link: '#',
  },
  {
    id: 'res-2',
    title: 'Resume & Portfolio',
    description: 'Editorial guides, project presentation strategies, and curated portfolio templates for engineering candidates.',
    link: '#',
  },
  {
    id: 'res-3',
    title: 'Interview Preparation',
    description: 'System design walkthroughs, live coding patterns, and peer-to-peer technical mock interview archives.',
    link: '#',
  },
  {
    id: 'res-4',
    title: 'Internship Opportunities',
    description: 'Direct summer and winter internship listings, stipend benchmarks, and pre-placement guidelines.',
    link: '#',
  },
  {
    id: 'res-5',
    title: 'Technical Skill Development',
    description: 'Specialized tracks in full-stack web, cloud architecture, system programming, and cybersecurity fundamentals.',
    link: '#',
  },
];
