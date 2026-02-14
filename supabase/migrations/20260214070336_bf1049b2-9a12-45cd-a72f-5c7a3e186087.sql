
-- Create hiring_decisions table to store final combined scores and decisions
CREATE TABLE public.hiring_decisions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
  ats_score numeric DEFAULT 0,
  assessment_score numeric DEFAULT 0,
  interview_score numeric DEFAULT 0,
  ats_weight numeric DEFAULT 0.20,
  assessment_weight numeric DEFAULT 0.40,
  interview_weight numeric DEFAULT 0.40,
  final_weighted_score numeric DEFAULT 0,
  rank integer,
  decision text NOT NULL DEFAULT 'pending',
  risk_level text DEFAULT 'low',
  salary_band_fit text,
  key_strengths text[] DEFAULT '{}',
  key_gaps text[] DEFAULT '{}',
  culture_fit_notes text,
  justification text,
  decided_by uuid NOT NULL,
  approved_by uuid,
  approved_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(candidate_id, job_id)
);

-- Enable RLS
ALTER TABLE public.hiring_decisions ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view decisions they created or for their jobs"
ON public.hiring_decisions FOR SELECT
USING (
  decided_by = auth.uid() OR
  EXISTS (SELECT 1 FROM jobs WHERE jobs.id = hiring_decisions.job_id AND jobs.created_by = auth.uid())
);

CREATE POLICY "Users can create decisions"
ON public.hiring_decisions FOR INSERT
WITH CHECK (auth.uid() = decided_by);

CREATE POLICY "Users can update their decisions"
ON public.hiring_decisions FOR UPDATE
USING (decided_by = auth.uid());

CREATE POLICY "Users can delete their decisions"
ON public.hiring_decisions FOR DELETE
USING (decided_by = auth.uid());

-- Updated_at trigger
CREATE TRIGGER update_hiring_decisions_updated_at
BEFORE UPDATE ON public.hiring_decisions
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
