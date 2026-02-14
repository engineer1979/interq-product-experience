
-- Add job seeker profile fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS skills text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS resume_url text,
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS timezone text,
ADD COLUMN IF NOT EXISTS work_experience jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS education jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS profile_visibility boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS visibility_settings jsonb DEFAULT '{"show_certificates": true, "show_test_scores": true, "show_interview_results": true, "hide_contact_info": true}'::jsonb;

-- Create job_seeker_certificates table for certificate tracking
CREATE TABLE IF NOT EXISTS public.job_seeker_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  assessment_id uuid REFERENCES public.assessments(id),
  interview_id uuid REFERENCES public.interviews(id),
  certificate_name text NOT NULL,
  score numeric,
  grade text, -- 'Completed', 'Distinction', 'Excellence'
  unique_code text NOT NULL DEFAULT encode(gen_random_bytes(8), 'hex'),
  issued_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'
);

ALTER TABLE public.job_seeker_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own certificates"
ON public.job_seeker_certificates FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own certificates"
ON public.job_seeker_certificates FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create job_seeker_notifications table
CREATE TABLE IF NOT EXISTS public.job_seeker_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info', -- 'info', 'assessment', 'interview', 'result', 'certificate'
  is_read boolean DEFAULT false,
  link text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.job_seeker_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
ON public.job_seeker_notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.job_seeker_notifications FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert notifications"
ON public.job_seeker_notifications FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.job_seeker_notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.job_seeker_certificates(user_id);
