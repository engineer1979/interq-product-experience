-- Create interview_questions table for storing generated questions
CREATE TABLE IF NOT EXISTS public.interview_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
  question_type text NOT NULL CHECK (question_type IN ('mcq', 'coding', 'system_design')),
  question_text text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points integer NOT NULL DEFAULT 10,
  order_index integer NOT NULL,
  
  -- MCQ specific fields
  options jsonb,
  correct_answer text,
  
  -- Coding specific fields
  starter_code text,
  test_cases jsonb,
  time_limit_minutes integer,
  language_options text[],
  
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create interview_responses table for candidate submissions
CREATE TABLE IF NOT EXISTS public.interview_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.interview_questions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  
  -- Response data
  answer_text text,
  code_submission text,
  language_used text,
  time_taken_seconds integer,
  
  -- Evaluation
  is_correct boolean,
  points_earned integer DEFAULT 0,
  ai_feedback jsonb,
  
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  evaluated_at timestamp with time zone,
  
  UNIQUE(interview_id, question_id, user_id)
);

-- Enable RLS
ALTER TABLE public.interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for interview_questions
CREATE POLICY "Anyone can view questions for published interviews"
  ON public.interview_questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.interviews
      WHERE interviews.id = interview_questions.interview_id
      AND (interviews.is_published = true OR interviews.created_by = auth.uid())
    )
  );

CREATE POLICY "Interview creators can manage questions"
  ON public.interview_questions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.interviews
      WHERE interviews.id = interview_questions.interview_id
      AND interviews.created_by = auth.uid()
    )
  );

-- RLS Policies for interview_responses
CREATE POLICY "Users can insert their own responses"
  ON public.interview_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own responses"
  ON public.interview_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Interview creators can view all responses"
  ON public.interview_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.interviews
      WHERE interviews.id = interview_responses.interview_id
      AND interviews.created_by = auth.uid()
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_interview_questions_updated_at
  BEFORE UPDATE ON public.interview_questions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for performance
CREATE INDEX idx_interview_questions_interview_id ON public.interview_questions(interview_id);
CREATE INDEX idx_interview_questions_order ON public.interview_questions(interview_id, order_index);
CREATE INDEX idx_interview_responses_interview_user ON public.interview_responses(interview_id, user_id);
CREATE INDEX idx_interview_responses_question ON public.interview_responses(question_id);