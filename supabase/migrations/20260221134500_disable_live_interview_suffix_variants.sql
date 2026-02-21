-- Ensure flag exists
ALTER TABLE public.interviews
ADD COLUMN IF NOT EXISTS live_interview_enabled boolean DEFAULT true;

-- Titles to disable
DO $$
DECLARE
  t TEXT[];
BEGIN
  t := ARRAY[
    'Talent Acquisition Specialist',
    'Banking Operations',
    'Banking Compliance & AML',
    'Sales Fundamentals & CRM',
    'B2B Sales & Enterprise Selling',
    'Financial Risk Management',
    'Investment Analysis & Portfolio Management',
    'Healthcare Administration',
    'Customer Support Excellence',
    'Finance Fundamentals',
    'Clinical Operations Management',
    'Pharmacy Technician Essentials',
    'Pharmacy Management & Compliance',
    'Accounting Fundamentals',
    'Advanced Accounting & Taxation',
    'HR Manager - Generalist',
    'HR Manager – Generalist',
    'HR Executive - Recruitment',
    'HR Executive – Recruitment'
  ];

  -- Disable exact titles
  UPDATE public.interviews
  SET live_interview_enabled = false
  WHERE title = ANY (t);

  -- Disable titles with suffix ' — Live Interview' (em dash)
  UPDATE public.interviews
  SET live_interview_enabled = false
  WHERE title = ANY (SELECT unnest(t) || ' — Live Interview');

  -- Disable titles with suffix ' - Live Interview' (hyphen) to cover variants
  UPDATE public.interviews
  SET live_interview_enabled = false
  WHERE title = ANY (SELECT unnest(t) || ' - Live Interview');
END
$$;
