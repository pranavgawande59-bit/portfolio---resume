export type TabType = 'home' | 'about' | 'projects' | 'research' | 'resume' | 'contact';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type?: string;
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
  variant: 'primary' | 'secondary' | 'accent';
}

export interface TechnicalSkill {
  name: string;
  category: 'language' | 'framework' | 'ai-data' | 'cloud-devops';
  proficiency: number; // 0 to 100
  level: 'Expert' | 'Advanced' | 'Proficient';
  experienceYears?: string;
  highlight?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  skills: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  companyOrOrg: string;
  relationship: string;
  avatarUrl?: string;
  content: string;
  highlightMetric?: string;
  tags: string[];
  date: string;
  rating?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend & APIs' | 'Cloud Architecture';
  tagline: string;
  description: string;
  metrics: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  architectureHighlights: string[];
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'research';
  progressPercentage?: number;
  expectedCompletion?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  conferenceOrVenue: string;
  year: string;
  abstract: string;
  keyFindings: string[];
  tags: string[];
  doiOrUrl?: string;
  bibtex?: string;
  status?: 'published' | 'in-progress' | 'under-review';
  stage?: string;
  progressPercentage?: number;
  expectedVenueOrDate?: string;
  collaborators?: string[];
}

export interface UserProfile {
  name: string;
  title: string;
  avatarUrl: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  location: string;
}
