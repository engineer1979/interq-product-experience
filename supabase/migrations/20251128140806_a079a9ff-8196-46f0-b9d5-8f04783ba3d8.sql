-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT NOT NULL,
  company_name TEXT,
  phone_number TEXT,
  role TEXT DEFAULT 'candidate',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create assessments table
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  passing_score INTEGER NOT NULL DEFAULT 70,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view published assessments"
  ON public.assessments FOR SELECT
  USING (is_published = true OR created_by = auth.uid());

CREATE POLICY "Users can create assessments"
  ON public.assessments FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own assessments"
  ON public.assessments FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own assessments"
  ON public.assessments FOR DELETE
  USING (auth.uid() = created_by);

-- Create assessment questions table
CREATE TABLE public.assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice',
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 1,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view questions for accessible assessments"
  ON public.assessment_questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.assessments
      WHERE id = assessment_questions.assessment_id
      AND (is_published = true OR created_by = auth.uid())
    )
  );

CREATE POLICY "Users can manage questions for their assessments"
  ON public.assessment_questions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.assessments
      WHERE id = assessment_questions.assessment_id
      AND created_by = auth.uid()
    )
  );

-- Create assessment results table
CREATE TABLE public.assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  percentage DECIMAL NOT NULL,
  passed BOOLEAN NOT NULL,
  time_taken_minutes INTEGER,
  answers JSONB NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own results"
  ON public.assessment_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Assessment creators can view results"
  ON public.assessment_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.assessments
      WHERE id = assessment_results.assessment_id
      AND created_by = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own results"
  ON public.assessment_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create interviews table
CREATE TABLE public.interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  job_role TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view published interviews"
  ON public.interviews FOR SELECT
  USING (is_published = true OR created_by = auth.uid());

CREATE POLICY "Users can create interviews"
  ON public.interviews FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own interviews"
  ON public.interviews FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own interviews"
  ON public.interviews FOR DELETE
  USING (auth.uid() = created_by);

-- Create interview results table
CREATE TABLE public.interview_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_score DECIMAL NOT NULL,
  communication_score DECIMAL NOT NULL,
  technical_score DECIMAL NOT NULL,
  confidence_score DECIMAL NOT NULL,
  fraud_detected BOOLEAN DEFAULT false,
  ai_feedback JSONB NOT NULL,
  video_url TEXT,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.interview_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own interview results"
  ON public.interview_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Interview creators can view results"
  ON public.interview_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.interviews
      WHERE id = interview_results.interview_id
      AND created_by = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own interview results"
  ON public.interview_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_assessments_updated_at
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_interviews_updated_at
  BEFORE UPDATE ON public.interviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();