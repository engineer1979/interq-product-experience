
-- Candidates table for the hiring pipeline
CREATE TABLE public.candidates (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    resume_url TEXT,
    resume_text TEXT,
    location TEXT,
    work_eligibility TEXT,
    years_experience INTEGER DEFAULT 0,
    education_level TEXT,
    skills TEXT[] DEFAULT '{}',
    industry TEXT,
    current_title TEXT,
    status TEXT NOT NULL DEFAULT 'applied',
    is_blind_screening BOOLEAN DEFAULT true,
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view candidates for their jobs" ON public.candidates
FOR SELECT USING (
    created_by = auth.uid() OR
    EXISTS (SELECT 1 FROM public.jobs WHERE jobs.id = candidates.job_id AND jobs.created_by = auth.uid())
);

CREATE POLICY "Users can create candidates" ON public.candidates
FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their candidates" ON public.candidates
FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Users can delete their candidates" ON public.candidates
FOR DELETE USING (created_by = auth.uid());

-- ATS Screening scores
CREATE TABLE public.ats_screenings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
    job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
    screened_by UUID NOT NULL,
    skills_score NUMERIC(5,2) DEFAULT 0 CHECK (skills_score >= 0 AND skills_score <= 30),
    experience_score NUMERIC(5,2) DEFAULT 0 CHECK (experience_score >= 0 AND experience_score <= 25),
    industry_score NUMERIC(5,2) DEFAULT 0 CHECK (industry_score >= 0 AND industry_score <= 15),
    education_score NUMERIC(5,2) DEFAULT 0 CHECK (education_score >= 0 AND education_score <= 10),
    progression_score NUMERIC(5,2) DEFAULT 0 CHECK (progression_score >= 0 AND progression_score <= 10),
    bonus_score NUMERIC(5,2) DEFAULT 0 CHECK (bonus_score >= 0 AND bonus_score <= 10),
    total_score NUMERIC(5,2) GENERATED ALWAYS AS (
        skills_score + experience_score + industry_score + education_score + progression_score + bonus_score
    ) STORED,
    decision TEXT NOT NULL DEFAULT 'pending',
    decision_reason TEXT,
    knockout_failed BOOLEAN DEFAULT false,
    knockout_details JSONB DEFAULT '[]'::jsonb,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ats_screenings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view screenings" ON public.ats_screenings
FOR SELECT USING (
    screened_by = auth.uid() OR
    EXISTS (SELECT 1 FROM public.jobs WHERE jobs.id = ats_screenings.job_id AND jobs.created_by = auth.uid())
);

CREATE POLICY "Users can create screenings" ON public.ats_screenings
FOR INSERT WITH CHECK (auth.uid() = screened_by);

CREATE POLICY "Users can update their screenings" ON public.ats_screenings
FOR UPDATE USING (screened_by = auth.uid());

CREATE POLICY "Users can delete their screenings" ON public.ats_screenings
FOR DELETE USING (screened_by = auth.uid());

-- Knockout questions template per job
CREATE TABLE public.knockout_questions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    expected_answer TEXT NOT NULL DEFAULT 'yes',
    is_eliminating BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.knockout_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Job creators can manage knockout questions" ON public.knockout_questions
FOR ALL USING (
    EXISTS (SELECT 1 FROM public.jobs WHERE jobs.id = knockout_questions.job_id AND jobs.created_by = auth.uid())
);

CREATE POLICY "Authenticated users can view knockout questions" ON public.knockout_questions
FOR SELECT USING (auth.uid() IS NOT NULL);

-- Triggers for updated_at
CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON public.candidates
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_ats_screenings_updated_at BEFORE UPDATE ON public.ats_screenings
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
