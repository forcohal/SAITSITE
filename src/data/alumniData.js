import { images } from './images';

/**
 * Alumni Mock Data
 *
 * NOTE: All alumni profiles, names, roles, and achievements listed here
 * are mock/prototype examples for design demonstration purposes.
 * They do not represent actual graduates or real department records.
 */

export const alumniDisclaimer = "Fictional prototype profiles • Designed to demonstrate layout and narrative hierarchy";

export const alumniSpotlight = {
  id: 'spotlight-1',
  name: 'Arjun Menon',
  role: 'Software Engineer',
  organization: 'Meridian Labs',
  graduationYear: 'Class of 2022',
  story: 'From organizing SAIT’s student-led technical workshops to architecting high-availability cloud systems, the rigorous foundation and peer collaboration fostered within the department helped shape every step of my engineering career. The open culture of sharing knowledge gave us the confidence to tackle production challenges early on.',
  quote: 'SAIT taught us that great engineering is as much about community and clear communication as it is about building scalable systems.',
  image: images.alumniSpotlight,
  skills: ['Distributed Systems', 'Cloud Architecture', 'Go & Kubernetes'],
};

export const alumniProfiles = [
  {
    id: 'alum-1',
    name: 'Ananya Sharma',
    graduationYear: 'Class of 2021',
    currentRole: 'Product Architect',
    organization: 'Apex Dynamics',
    achievement: 'Spearheaded modern web infrastructure migrations and instituted open-source code reviews across student cohorts.',
    image: images.alumniProfiles[0],
    focus: 'Enterprise Systems & Web Standards',
  },
  {
    id: 'alum-2',
    name: 'Rohan Varma',
    graduationYear: 'Class of 2023',
    currentRole: 'ML Infrastructure Engineer',
    organization: 'Horizon Labs',
    achievement: 'Designed high-throughput data pipelines and automated benchmark verification workflows for generative systems.',
    image: images.alumniProfiles[1],
    focus: 'Data Pipelines & Distributed ML',
  },
  {
    id: 'alum-3',
    name: 'Devika Krishnan',
    graduationYear: 'Class of 2020',
    currentRole: 'Engineering Manager',
    organization: 'NexaTech Core',
    achievement: 'Built resilient mobile payment platforms and founded departmental mock interview clinics for graduating seniors.',
    image: images.alumniProfiles[2],
    focus: 'Platform Reliability & Mentorship',
  },
  {
    id: 'alum-4',
    name: 'Nikhil Thomas',
    graduationYear: 'Class of 2024',
    currentRole: 'Security Operations Analyst',
    organization: 'Solis Security',
    achievement: 'Conducted zero-trust cloud auditing frameworks and led student CTF cybersecurity initiatives during undergraduate years.',
    image: images.alumniProfiles[3],
    focus: 'Cloud Security & Compliance',
  },
];
