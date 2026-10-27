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
  bio: 'Passionate Full-Stack Developer specializing in scalable web technologies, robust microservices, and modern, high-performance user experiences.',
  email: 'pranavgawande59@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  location: 'Pune, Maharashtra, India',
};

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    period: '2022 - Present',
    description: [
      'Engineered scalable web applications using Next.js and Node.js, improving load times by 40%.',
      'Engineered RESTful APIs and asynchronous data pipelines to streamline application workflows.',
    ],
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'PostgreSQL'],
  },
  {
    id: 'exp-2',
    role: 'Web Developer & Open-Source Contributor',
    company: 'Independent Projects',
    period: '2021 - 2022',
    description: [
      'Built responsive frontend interfaces and reusable components using JavaScript, React, and modern CSS.',
      'Developed backend scripts, utility tooling, and contributed to open-source developer repositories.',
    ],
    technologies: ['JavaScript', 'Python', 'React', 'HTML5/CSS3', 'Git', 'SQL'],
  },
];

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
    proficiency: 95,
    level: 'Expert',
    experienceYears: '4+ yrs',
    highlight: 'Data structures, Backend scripting, Automation & Clean code',
  },
  {
    name: 'Java',
    category: 'language',
    proficiency: 90,
    level: 'Expert',
    experienceYears: '3+ yrs',
    highlight: 'Core Java, OOP, Multithreading, JVM & Enterprise backend architecture',
  },
  {
    name: 'JavaScript',
    category: 'language',
    proficiency: 92,
    level: 'Expert',
    experienceYears: '4+ yrs',
    highlight: 'Modern ES6+, Asynchronous programming, Event-driven architecture',
  },
  {
    name: 'SQL',
    category: 'language',
    proficiency: 89,
    level: 'Advanced',
    experienceYears: '3+ yrs',
    highlight: 'Relational data modeling, Complex queries & Schema design',
  },
  // Frameworks & Libraries
  {
    name: 'React 18',
    category: 'framework',
    proficiency: 94,
    level: 'Expert',
    experienceYears: '3+ yrs',
    highlight: 'Hooks, State management, Component architecture & Performance',
  },
  {
    name: 'Node.js',
    category: 'framework',
    proficiency: 91,
    level: 'Expert',
    experienceYears: '3+ yrs',
    highlight: 'RESTful API services, Server-side logic & Express integration',
  },
  // Cloud & DevOps
  {
    name: 'Docker',
    category: 'cloud-devops',
    proficiency: 88,
    level: 'Advanced',
    experienceYears: '3 yrs',
    highlight: 'Containerization, Multi-stage builds & Consistent environments',
  },
  {
    name: 'AWS Cloud',
    category: 'cloud-devops',
    proficiency: 86,
    level: 'Advanced',
    experienceYears: '3 yrs',
    highlight: 'Cloud deployment, EC2, S3, IAM & Managed cloud infrastructure',
  },
];

export const certificatesData: CertificateItem[] = [];

export const projectsData: ProjectItem[] = [];


export const researchData: ResearchItem[] = [];

export const reviewsData: TestimonialItem[] = [];



