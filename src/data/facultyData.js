/**
 * SAIT Website — Centralized Faculty & Administration Directory Data
 * 
 * Mock/sample data for prototype presentation.
 * Replace URLs in `facultyImages` or details below with official CUSAT/IT Division
 * faculty profiles and photography without altering component structure.
 */

export const facultyImages = {
  hod: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  coordinators: [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  ],
  faculty: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  ],
};

export const hodData = {
  label: 'HEAD OF DEPARTMENT',
  name: 'Dr. Arjun Menon',
  designation: 'Professor & Head',
  image: facultyImages.hod,
  bio: 'Guiding the Division of Information Technology with over two decades of academic dedication and research leadership. He champions a forward-thinking pedagogical environment that bridges foundational theoretical computing with emerging technological architectures, research discovery, and student initiative.',
  meta: [
    { label: 'Department', value: 'Information Technology' },
    { label: 'Role', value: 'Head of Division' },
    { label: 'Academic Focus', value: 'Distributed Systems & Network Architectures' },
    { label: 'Institution', value: 'School of Engineering, CUSAT' },
  ],
};

export const coordinatorsData = [
  {
    id: 'staff-coord',
    name: 'Prof. Rajesh K. V.',
    role: 'Staff Coordinator',
    description: 'Coordinates laboratory infrastructure, departmental administration, and operational workflows.',
    image: facultyImages.coordinators[0],
  },
  {
    id: 'faculty-coord',
    name: 'Dr. Ananya S. Rao',
    role: 'Faculty Coordinator',
    description: 'Facilitates student mentoring frameworks, academic forums, and research colloquia.',
    image: facultyImages.coordinators[1],
  },
  {
    id: 'academic-coord',
    name: 'Prof. Suresh Kumar P.',
    role: 'Academic Coordinator',
    description: 'Manages curricular pathways, semester assessments, and student academic advisement.',
    image: facultyImages.coordinators[2],
  },
  {
    id: 'association-coord',
    name: 'Prof. Deepa Varma',
    role: 'Association Coordinator',
    description: 'Advises SAIT student leadership on technical symposiums, hackathons, and industry engagements.',
    image: facultyImages.coordinators[3],
  },
];

export const facultyMembers = [
  {
    id: 'fac-1',
    name: 'Dr. Meera Nair',
    designation: 'Associate Professor',
    specialization: 'Artificial Intelligence & Data Analytics',
    image: facultyImages.faculty[0],
  },
  {
    id: 'fac-2',
    name: 'Dr. Harikrishnan G.',
    designation: 'Assistant Professor',
    specialization: 'Cloud Computing & Distributed Systems',
    image: facultyImages.faculty[1],
  },
  {
    id: 'fac-3',
    name: 'Dr. Lakshmi Priya',
    designation: 'Associate Professor',
    specialization: 'Cyber Security & Cryptographic Protocols',
    image: facultyImages.faculty[2],
  },
  {
    id: 'fac-4',
    name: 'Prof. Anand R. Shenoy',
    designation: 'Assistant Professor',
    specialization: 'Human-Computer Interaction & Systems Design',
    image: facultyImages.faculty[3],
  },
  {
    id: 'fac-5',
    name: 'Dr. Kavitha Balakrishnan',
    designation: 'Assistant Professor',
    specialization: 'Machine Learning & Natural Language Processing',
    image: facultyImages.faculty[4],
  },
  {
    id: 'fac-6',
    name: 'Prof. Vinod M. George',
    designation: 'Assistant Professor',
    specialization: 'Database Engineering & Information Retrieval',
    image: facultyImages.faculty[5],
  },
  {
    id: 'fac-7',
    name: 'Dr. Sandeep Nambiar',
    designation: 'Associate Professor',
    specialization: 'High-Performance Computing & Parallel Architecture',
    image: facultyImages.faculty[6],
  },
  {
    id: 'fac-8',
    name: 'Prof. Pooja S. Pillai',
    designation: 'Assistant Professor',
    specialization: 'Software Engineering & Formal Verification',
    image: facultyImages.faculty[7],
  },
];
