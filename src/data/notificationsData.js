/**
 * Notifications & Announcements Mock Data
 *
 * NOTE: All notifications and notices below are mock/prototype examples
 * for the website redesign challenge. They do not represent real official notices.
 */

export const notificationsDisclaimer =
  "Sample prototype announcements • Curated for challenge demonstration";

export const notificationCategories = ['ALL', 'EVENTS', 'DEADLINES', 'ANNOUNCEMENTS'];

export const mockNotifications = [
  {
    id: 'notif-1',
    category: 'EVENTS',
    title: 'SAIT Technical Workshop Series',
    description:
      'Registrations open for hands-on sessions in distributed systems, modern web tools, and cloud deployment fundamentals.',
    date: '12 SEP 2026',
    urgent: false,
    link: '#',
  },
  {
    id: 'notif-2',
    category: 'DEADLINES',
    title: 'Student Activity Submission Deadline',
    description:
      'Submit verification proofs for semester hackathon achievements, certifications, and technical projects before cutoff.',
    date: '15 SEP 2026',
    urgent: true,
    link: '#',
  },
  {
    id: 'notif-3',
    category: 'ANNOUNCEMENTS',
    title: 'Annual Student Community Initiative',
    description:
      'SAIT launches open mentorship pods pairing junior cohorts with senior engineers and alumni working across tech verticals.',
    date: '18 SEP 2026',
    urgent: false,
    link: '#',
  },
  {
    id: 'notif-4',
    category: 'EVENTS',
    title: 'Inter-College HackSprint 2026 Announced',
    description:
      'Team registrations and problem statement tracks for the upcoming 36-hour flagship hackathon will be released shortly.',
    date: '22 SEP 2026',
    urgent: false,
    link: '#',
  },
  {
    id: 'notif-5',
    category: 'DEADLINES',
    title: 'Pre-Placement Drive Resume Verification',
    description:
      'Final cohort review for technical resumes and portfolio repositories with the department career placement cell.',
    date: '28 SEP 2026',
    urgent: true,
    link: '#',
  },
  {
    id: 'notif-6',
    category: 'ANNOUNCEMENTS',
    title: 'Open Source Contribution Sprint',
    description:
      'Join department maintainers this weekend to contribute to official student utilities, event portals, and documentation repos.',
    date: '02 OCT 2026',
    urgent: false,
    link: '#',
  },
];
