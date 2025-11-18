// ============================================
// MDR EDUCATION™ - TYPY TYPESCRIPT
// ============================================

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  readTime: number; // minutes
  excerpt: string;
  content: string;
  practicalExamples: string[];
  author: TeamMember;
  date: string; // ISO date
  slug: string;
}

export interface Webinar {
  id: string;
  title: string;
  type: 'Live Webinar' | 'Workshop' | 'Masterclass';
  date: string; // ISO date
  time: string; // e.g., "18:00 - 19:30"
  instructor: TeamMember;
  registrations: number;
  maxParticipants?: number;
  description: string;
  topics: string[];
}

export interface MentorshipProgram {
  id: string;
  name: string;
  level: 'Początkujący' | 'Zaawansowany';
  price: number; // PLN
  duration: string;
  maxParticipants: number;
  features: string[];
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  specialization: string;
  bio: string;
  qualifications: string[];
  experience: string;
  email: string;
  phone: string;
  linkedin?: string;
  avatar?: string;
}

export interface PracticalExample {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  examples: string[];
  ctaText: string;
  ctaAction: string;
}

export interface CommunityStats {
  totalMembers: number;
  activeThisMonth: number;
  expertsOnline: number;
  questionsAnswered: number;
}

export interface LegalDocument {
  title: string;
  regulation: string;
  description: string;
  link?: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  placeholder: string;
  action: string;
}
