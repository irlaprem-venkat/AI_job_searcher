export type ExperienceLevel = 'Freshers' | '1 Year' | '2-3 Years' | '4-6 Years' | '7-10 Years';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range: string;
  experience_level: ExperienceLevel;
  type: 'Remote' | 'On-site' | 'Hybrid';
  description: string;
  posted_at: string;
  logo_url?: string;
  tags: string[];
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  resume_url?: string;
  skills: string[];
  experience_years: number;
  saved_jobs: string[];
}
