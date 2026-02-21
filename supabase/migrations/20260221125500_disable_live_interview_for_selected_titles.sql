-- Add live_interview_enabled flag to interviews if missing
ALTER TABLE public.interviews
ADD COLUMN IF NOT EXISTS live_interview_enabled boolean DEFAULT true;

-- Disable live interview availability for specified assessments (by interview title)
UPDATE public.interviews
SET live_interview_enabled = false
WHERE title IN (
  'Talent Acquisition Specialist',
  'Banking Operations',
  'Banking Compliance & AML',
  'Sales Fundamentals & CRM',
  'B2B Sales & Enterprise Selling',
  'Data Analyst Assessment'
);
