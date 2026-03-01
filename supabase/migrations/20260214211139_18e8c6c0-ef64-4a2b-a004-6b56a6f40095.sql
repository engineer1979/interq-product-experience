
-- Step 1: Add new enum values only
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'company';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'job_seeker';
