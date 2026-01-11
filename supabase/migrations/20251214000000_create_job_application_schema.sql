-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  department TEXT,
  location TEXT,
  employment_type TEXT, -- 'full-time', 'contract', etc.
  status TEXT DEFAULT 'draft', -- 'draft', 'published', 'closed'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Link assessments (interviews) to jobs
CREATE TABLE IF NOT EXISTS job_assessments (
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  interview_id UUID REFERENCES interviews(id) ON DELETE CASCADE,
  stage TEXT DEFAULT 'screening', -- 'screening', 'technical', 'behavioral'
  PRIMARY KEY (job_id, interview_id)
);

-- Create applications table (Candidates applying to jobs)
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES auth.users(id), -- If candidate is logged in
  candidate_email TEXT NOT NULL,
  candidate_name TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'screening', 'interview', 'offer', 'rejected'
  overall_score NUMERIC, -- Aggregated score from all assessments
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create submissions table (The actual answers provided by candidates)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  question_id UUID REFERENCES interview_questions(id),
  audio_url TEXT, -- Path to storage
  video_url TEXT, -- Path to storage
  transcript TEXT,
  code_content TEXT, -- For coding questions
  duration_seconds INTEGER,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create evaluations table (AI or Human grading of a submission)
CREATE TABLE IF NOT EXISTS evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  grader_type TEXT DEFAULT 'ai', -- 'ai' or 'human'
  grader_id UUID REFERENCES auth.users(id), -- Null if AI
  score INTEGER, -- 1-10 or 1-100
  feedback TEXT, -- Detailed breakdown
  rubric_matches JSONB, -- specific criteria met/missed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

-- Recruiter Access: Can view all data
CREATE POLICY "Recruiters can view all jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Recruiters can insert jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Recruiters can update jobs" ON jobs FOR UPDATE USING (auth.uid() = created_by);

-- Candidate Access: Can view published jobs
CREATE POLICY "Public can view published jobs" ON jobs FOR SELECT USING (status = 'published');

