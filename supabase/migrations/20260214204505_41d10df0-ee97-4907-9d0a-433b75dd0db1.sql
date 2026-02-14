
-- 1. Drop the existing question_type check constraint
ALTER TABLE public.interview_questions DROP CONSTRAINT IF EXISTS interview_questions_question_type_check;

-- 2. Add expanded question_type constraint
ALTER TABLE public.interview_questions ADD CONSTRAINT interview_questions_question_type_check 
  CHECK (question_type IN ('mcq', 'coding', 'system_design', 'open_ended', 'scenario', 'case', 'behavioral', 'situational'));

-- 3. Drop the existing difficulty check constraint  
ALTER TABLE public.interview_questions DROP CONSTRAINT IF EXISTS interview_questions_difficulty_check;

-- 4. Re-add difficulty constraint (lowercase, plus mixed case support)
ALTER TABLE public.interview_questions ADD CONSTRAINT interview_questions_difficulty_check 
  CHECK (difficulty IN ('easy', 'medium', 'hard'));

-- 5. Add a topic column to interviews for category-based banks
ALTER TABLE public.interviews ADD COLUMN IF NOT EXISTS topic text;

-- 6. Add an index on topic for fast lookups
CREATE INDEX IF NOT EXISTS idx_interviews_topic ON public.interviews(topic);
