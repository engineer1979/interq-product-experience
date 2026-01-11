-- Add timer and proctoring fields to assessments table
ALTER TABLE public.assessments
ADD COLUMN IF NOT EXISTS timer_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS grace_period_minutes integer DEFAULT 5,
ADD COLUMN IF NOT EXISTS auto_submit_on_timeout boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS allow_pause boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS proctoring_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS face_detection_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tab_switch_detection boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS max_tab_switches integer DEFAULT 3,
ADD COLUMN IF NOT EXISTS question_randomization boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_results_immediately boolean DEFAULT false;

-- Add proctoring data to assessment_results
ALTER TABLE public.assessment_results
ADD COLUMN IF NOT EXISTS started_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS tab_switches_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS proctoring_flags jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS ip_address text,
ADD COLUMN IF NOT EXISTS user_agent text,
ADD COLUMN IF NOT EXISTS timezone text;

-- Create assessment_sessions table for real-time tracking
CREATE TABLE IF NOT EXISTS public.assessment_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  started_at timestamp with time zone DEFAULT now(),
  last_activity_at timestamp with time zone DEFAULT now(),
  time_remaining_seconds integer NOT NULL,
  is_paused boolean DEFAULT false,
  pause_reason text,
  paused_at timestamp with time zone,
  current_question_index integer DEFAULT 0,
  completed boolean DEFAULT false,
  submitted_at timestamp with time zone,
  tab_switches integer DEFAULT 0,
  proctoring_violations jsonb DEFAULT '[]'::jsonb,
  UNIQUE(assessment_id, user_id)
);

-- Enable RLS on assessment_sessions
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for assessment_sessions
CREATE POLICY "Users can view their own sessions"
  ON public.assessment_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions"
  ON public.assessment_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON public.assessment_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Assessment creators can view all sessions"
  ON public.assessment_sessions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = assessment_sessions.assessment_id
      AND assessments.created_by = auth.uid()
    )
  );

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_user_id ON public.assessment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_assessment_id ON public.assessment_sessions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_started_at ON public.assessment_results(started_at);

-- Create function to update last activity
CREATE OR REPLACE FUNCTION update_session_activity()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_activity_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for session activity updates
DROP TRIGGER IF EXISTS update_session_activity_trigger ON public.assessment_sessions;
CREATE TRIGGER update_session_activity_trigger
  BEFORE UPDATE ON public.assessment_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_session_activity();