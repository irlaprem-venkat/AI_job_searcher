-- SUPABASE SCHEMA FOR NOVA JOBS

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  email text UNIQUE,
  phone text, -- Added for auto form filling
  resume_url text,
  skills text[],
  experience_years int,
  created_at timestamp with time zone DEFAULT now()
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  company text NOT NULL,
  description text,
  salary_range text,
  location text,
  type text CHECK (type IN ('Remote', 'On-site', 'Hybrid')),
  experience_level text NOT NULL,
  tags text[],
  embedding vector(1536), -- For AI Matching
  created_at timestamp with time zone DEFAULT now()
);

-- Job Preferences Table
CREATE TABLE IF NOT EXISTS job_preferences (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  desired_salary text,
  locations text[],
  job_types text[],
  experience_level text,
  auto_apply_enabled boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Saved Jobs Table (Jobs queued or matched for user)
CREATE TABLE IF NOT EXISTS saved_jobs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  match_score numeric,
  platform text,
  status text DEFAULT 'queued' CHECK (status IN ('queued', 'applying', 'applied', 'failed')),
  created_at timestamp with time zone DEFAULT now()
);

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  cover_letter_text text,
  applied_platform text,
  applied_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- PROFILES: Users can only read/write their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- JOBS: Everyone can read jobs, only admins can write (simplified)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Everyone can view jobs" ON jobs;
CREATE POLICY "Everyone can view jobs" ON jobs FOR SELECT USING (true);

-- APPLICATIONS: Users can view their own applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own applications" ON applications;
CREATE POLICY "Users can view own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can apply" ON applications;
CREATE POLICY "Users can apply" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AUTOMATIC PROFILE CREATION TRIGGER
/**
 * This function creates a profile entry automatically when a new user signs up.
 * It handles both Email and OAuth (Google/GitHub) sign-ups.
 */
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function on every new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
