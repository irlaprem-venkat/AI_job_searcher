import { z } from 'zod';

export const JobSearchSchema = z.object({
  query: z.string().max(100).optional(),
  category: z.enum(['All', 'Freshers', '1 Year', '2-3 Years', '4-6 Years', '7-10 Years']),
});

export const ApplicationSchema = z.object({
  jobId: z.string().uuid(),
  userId: z.string().uuid(),
  resumeUrl: z.string().url(),
});

export const ProfileSchema = z.object({
  fullName: z.string().min(2).max(50),
  skills: z.array(z.string()).min(1),
  experienceYears: z.number().min(0).max(50),
});
