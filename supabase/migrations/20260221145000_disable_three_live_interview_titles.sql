ALTER TABLE public.interviews
ADD COLUMN IF NOT EXISTS live_interview_enabled boolean DEFAULT true;

UPDATE public.interviews
SET live_interview_enabled = false
WHERE title IN (
  'Talent Acquisition Specialist',
  'Banking Operations',
  'Banking Compliance & AML'
);

UPDATE public.interviews
SET live_interview_enabled = false
WHERE title IN (
  'Talent Acquisition Specialist — Live Interview',
  'Banking Operations — Live Interview',
  'Banking Compliance & AML — Live Interview',
  'Talent Acquisition Specialist - Live Interview',
  'Banking Operations - Live Interview',
  'Banking Compliance & AML - Live Interview'
);
