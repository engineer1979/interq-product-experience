-- Assessment Workflow Database Schema
-- This migration creates tables for the comprehensive 5-step assessment workflow

-- Create assessment_results table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  score integer NOT NULL,
  total_points integer NOT NULL,
  percentage integer NOT NULL,
  passed boolean NOT NULL,
  time_taken_seconds integer NOT NULL,
  completed_at timestamp with time zone DEFAULT now(),
  answers jsonb NOT NULL DEFAULT '{}',
  question_results jsonb NOT NULL DEFAULT '[]',
  created_at timestamp with time zone DEFAULT now()
);

-- Create assessment_answers table for storing individual answers
CREATE TABLE IF NOT EXISTS public.assessment_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
  question_id uuid NOT NULL,
  answer text NOT NULL,
  is_correct boolean,
  points_earned integer DEFAULT 0,
  time_taken_seconds integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(session_id, question_id)
);

-- Create assessment_attempts table for tracking user attempts
CREATE TABLE IF NOT EXISTS public.assessment_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  attempt_number integer NOT NULL DEFAULT 1,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  status text NOT NULL DEFAULT 'in_progress',
  final_score integer,
  final_percentage integer,
  passed boolean,
  time_taken_seconds integer,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(assessment_id, user_id, attempt_number)
);

-- Create assessment_analytics table for storing detailed analytics
CREATE TABLE IF NOT EXISTS public.assessment_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  result_id uuid NOT NULL REFERENCES public.assessment_results(id) ON DELETE CASCADE,
  question_type_performance jsonb NOT NULL DEFAULT '{}',
  difficulty_performance jsonb NOT NULL DEFAULT '{}',
  category_performance jsonb NOT NULL DEFAULT '{}',
  time_analysis jsonb NOT NULL DEFAULT '{}',
  improvement_suggestions text[],
  strengths text[],
  weaknesses text[],
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON public.assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_assessment_id ON public.assessment_results(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_completed_at ON public.assessment_results(completed_at);

CREATE INDEX IF NOT EXISTS idx_assessment_answers_session_id ON public.assessment_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_assessment_answers_question_id ON public.assessment_answers(question_id);

CREATE INDEX IF NOT EXISTS idx_assessment_attempts_user_id ON public.assessment_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_assessment_id ON public.assessment_attempts(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_status ON public.assessment_attempts(status);

CREATE INDEX IF NOT EXISTS idx_assessment_analytics_result_id ON public.assessment_analytics(result_id);

-- Enable RLS on all new tables
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessment_results
CREATE POLICY "Users can view their own results"
  ON public.assessment_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
  ON public.assessment_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for assessment_answers
CREATE POLICY "Users can view their own answers"
  ON public.assessment_answers
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.assessment_sessions
      WHERE public.assessment_sessions.id = assessment_answers.session_id
      AND public.assessment_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own answers"
  ON public.assessment_answers
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.assessment_sessions
      WHERE public.assessment_sessions.id = assessment_answers.session_id
      AND public.assessment_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own answers"
  ON public.assessment_answers
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.assessment_sessions
      WHERE public.assessment_sessions.id = assessment_answers.session_id
      AND public.assessment_sessions.user_id = auth.uid()
    )
  );

-- RLS Policies for assessment_attempts
CREATE POLICY "Users can view their own attempts"
  ON public.assessment_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own attempts"
  ON public.assessment_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own attempts"
  ON public.assessment_attempts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for assessment_analytics
CREATE POLICY "Users can view their own analytics"
  ON public.assessment_analytics
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.assessment_results
      WHERE public.assessment_results.id = assessment_analytics.result_id
      AND public.assessment_results.user_id = auth.uid()
    )
  );

-- Create function to calculate assessment analytics
CREATE OR REPLACE FUNCTION public.calculate_assessment_analytics(result_id uuid)
RETURNS jsonb AS $$
DECLARE
  result_record record;
  analytics_data jsonb;
BEGIN
  SELECT * INTO result_record FROM public.assessment_results WHERE id = result_id;
  
  IF NOT FOUND THEN
    RETURN '{}'::jsonb;
  END IF;
  
  analytics_data := jsonb_build_object(
    'total_questions', jsonb_array_length(result_record.question_results),
    'correct_answers', (SELECT COUNT(*) FROM jsonb_array_elements(result_record.question_results) WHERE elem->>'isCorrect' = 'true'),
    'incorrect_answers', (SELECT COUNT(*) FROM jsonb_array_elements(result_record.question_results) WHERE elem->>'isCorrect' = 'false'),
    'score_percentage', result_record.percentage,
    'time_taken', result_record.time_taken_seconds,
    'passed', result_record.passed
  );
  
  RETURN analytics_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;