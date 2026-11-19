import {
  UserProfile,
  ExperienceItem,
  EducationItem,
  SkillGroup,
  TechnicalSkill,
  CertificateItem,
  TestimonialItem,
  ProjectItem,
  ResearchItem,
} from '../types';

export const profileData: UserProfile = {
  name: 'Pranav Gawande',
  title: 'FULL-STACK DEVELOPER',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida/AEtjO1WfafmBFG3GveA05tmTjP8UNu-KyZBcjzvKPh1v1uHYzP_0uQX_uHj6I9TQB7mKGbSN4hYn-e5-_CjV5F8QPvdAP01s8FxQWIQOJPrU3rddkHPg9vajqzfU90Qzcx_9D_8oosZlEfB3w5sjHhBxmxzehNNEx8_yAvyJoB9HjCpz6tuWWEFuqQKYeZg4WbnKTOYi-_UqkGmOcjiTQmYnHin-ecxnJxv7WCv89zrOSnQnHhx6EvZI4ozoN4o',
  tagline: '',
  bio: 'Passionate Full-Stack Developer with strong foundations in React, Node.js, Python, Java, and modern web architectures. Eager to engineer high-performance applications and contribute to real-world products.',
  email: 'pranavgawande59@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  location: 'Pune, Maharashtra, India',
};

export const experienceData: ExperienceItem[] = [];

export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'College Of Management and Computer Science, Yavatmal',
    period: 'June 2023 - May 2025',
    description:
      'Comprehensive coursework in Software Engineering, Web Development, Object-Oriented Programming, Database Management Systems, and Data Structures with strong academic performance.',
    highlights: [
      'Core Computer Science & Software Engineering',
      'Database Management Systems & Object-Oriented Design',
      'Cumulative CGPA Academic Distinction',
    ],
  },
  {
    id: 'edu-2',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Savitribai Phule Pune University',
    period: 'Graduating 2027',
    description:
      'Focusing on advanced distributed computing architectures, cloud infrastructure, and modern software engineering practices.',
    highlights: [
      'Distributed Systems & Cloud Computing Specialization',
      'Thesis: High-Throughput Distributed Microservices and Cloud Orchestration',
      'Department Rank Top 5%',
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'CORE STACK',
    skills: ['Python', 'Java', 'JavaScript', 'React 18', 'Node.js', 'SQL', 'Docker', 'AWS Cloud'],
    variant: 'primary',
  },
  {
    title: 'LANGUAGES & FRAMEWORKS',
    skills: ['Python', 'Java', 'JavaScript', 'React 18', 'Node.js', 'SQL'],
    variant: 'secondary',
  },
  {
    title: 'CLOUD & INFRASTRUCTURE',
    skills: ['Docker', 'AWS Cloud', 'SQL Database Systems'],
    variant: 'accent',
  },
];

export const technicalSkillsData: TechnicalSkill[] = [
  // Languages
  {
    name: 'Python',
    category: 'language',
    proficiency: 90,
    level: 'Proficient',
    experienceYears: 'Academic & Projects',
    highlight: 'Data structures, Backend scripting, Automation & Clean code',
  },
  {
    name: 'Java',
    category: 'language',
    proficiency: 88,
    level: 'Proficient',
    experienceYears: 'Academic & Projects',
    highlight: 'Core Java, OOP, Multithreading & Software engineering fundamentals',
  },
  {
    name: 'JavaScript',
    category: 'language',
    proficiency: 89,
    level: 'Proficient',
    experienceYears: 'Academic & Projects',
    highlight: 'Modern ES6+, Asynchronous programming, DOM manipulation',
  },
  {
    name: 'SQL',
    category: 'language',
    proficiency: 86,
    level: 'Proficient',
    experienceYears: 'Academic & Projects',
    highlight: 'Relational data modeling, Complex queries & Schema design',
  },
  // Frameworks & Libraries
  {
    name: 'React 18',
    category: 'framework',
    proficiency: 88,
    level: 'Proficient',
    experienceYears: 'Academic & Projects',
    highlight: 'Hooks, State management, Component architecture & Responsive UI',
  },
  {
    name: 'Node.js',
    category: 'framework',
    proficiency: 85,
    level: 'Proficient',
    experienceYears: 'Academic & Projects',
    highlight: 'RESTful API services, Server-side logic & Express integration',
  },
  // Cloud & DevOps
  {
    name: 'Docker',
    category: 'cloud-devops',
    proficiency: 80,
    level: 'Proficient',
    experienceYears: 'Labs & Practice',
    highlight: 'Containerization basics, Dockerfile setup & Environment consistency',
  },
  {
    name: 'AWS Cloud',
    category: 'cloud-devops',
    proficiency: 78,
    level: 'Proficient',
    experienceYears: 'Labs & Practice',
    highlight: 'Cloud deployment foundations, EC2 & S3 storage',
  },
];

export const certificatesData: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Full-Stack Web Development Specialization',
    issuer: 'Meta / Coursera Professional Certification',
    issueDate: '2024',
    credentialId: 'META-FS-2024-8841',
    verifyUrl: 'https://coursera.org/verify',
    skills: ['React 18', 'Node.js', 'Express', 'RESTful APIs', 'SQL'],
  },
  {
    id: 'cert-2',
    title: 'Python Certified Associate Programmer (PCAP)',
    issuer: 'Python Institute',
    issueDate: '2024',
    credentialId: 'PCAP-31-03-90218',
    verifyUrl: 'https://pythoninstitute.org',
    skills: ['Python', 'Object-Oriented Programming', 'Data Structures', 'Algorithms'],
  },
  {
    id: 'cert-3',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2024',
    credentialId: 'AWS-CCP-77490-PG',
    verifyUrl: 'https://aws.amazon.com/verification',
    skills: ['AWS Cloud', 'EC2', 'S3', 'Cloud Fundamentals', 'IAM'],
  },
  {
    id: 'cert-4',
    title: 'Java SE & Software Architecture Fundamentals',
    issuer: 'HackerRank & Oracle Training',
    issueDate: '2023',
    credentialId: 'JAVA-SE-4120-HR',
    verifyUrl: 'https://hackerrank.com/certificates',
    skills: ['Core Java', 'Multithreading', 'OOP Design', 'Collections Framework'],
  },
];

export const projectsData: ProjectItem[] = [];


export const researchData: ResearchItem[] = [];

export const reviewsData: TestimonialItem[] = [];



