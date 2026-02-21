-- Generate Live Interview sets for all existing assessments
-- Creates an interview per assessment and seeds 20 scenario-based questions

-- Ensure live_interview_enabled column exists
ALTER TABLE public.interviews
ADD COLUMN IF NOT EXISTS live_interview_enabled boolean DEFAULT true;

DO $$
DECLARE
  rec RECORD;
  new_interview_id uuid;
  dur int;
BEGIN
  FOR rec IN
    SELECT id, title, category
    FROM public.assessments
  LOOP
    dur := 50;

    IF NOT EXISTS (
      SELECT 1 FROM public.interviews
      WHERE title = rec.title || ' — Live Interview'
    ) THEN
      INSERT INTO public.interviews (
        created_by,
        title,
        job_role,
        description,
        questions,
        duration_minutes,
        is_published,
        live_interview_enabled
      ) VALUES (
        '391dea46-f9cc-43cc-a253-ae56151e8993',
        rec.title || ' — Live Interview',
        rec.category,
        'Live, scenario-based interview for ' || rec.title || ' focusing on practical problem-solving.',
        '[]'::jsonb,
        dur,
        true,
        true
      )
      RETURNING id INTO new_interview_id;
    ELSE
      SELECT id INTO new_interview_id FROM public.interviews
      WHERE title = rec.title || ' — Live Interview'
      LIMIT 1;
    END IF;

    IF new_interview_id IS NOT NULL THEN
      IF NOT EXISTS (
        SELECT 1 FROM public.interview_questions iq
        WHERE iq.interview_id = new_interview_id
      ) THEN
        INSERT INTO public.interview_questions (interview_id, question_type, question_text, difficulty, points, order_index, options, correct_answer)
        VALUES
        (new_interview_id, 'mcq', 'A critical issue impacts production. Which immediate action best stabilizes the system before deeper analysis?', 'medium', 5, 1,
          '["Roll back recent changes","Scale up compute resources","Restart all services","Disable monitoring alerts"]'::jsonb, 'Roll back recent changes'),
        (new_interview_id, 'system_design', 'An urgent stakeholder escalates a degraded feature. Outline your triage approach and communication plan.', 'medium', 5, 2, NULL, NULL),
        (new_interview_id, 'mcq', 'A scheduled job fails intermittently after a dependency upgrade. What is the most systematic next step?', 'medium', 5, 3,
          '["Revert dependency","Increase retries","Pin version and reproduce in staging","Switch provider"]'::jsonb, 'Pin version and reproduce in staging'),
        (new_interview_id, 'system_design', 'You inherit a legacy component with fragile tests. Explain how you would harden reliability without blocking releases.', 'medium', 5, 4, NULL, NULL),
        (new_interview_id, 'mcq', 'A cross-team integration shows high latency at peak hours. Which action addresses this most effectively?', 'medium', 5, 5,
          '["Add caching at boundaries","Increase DB connections","Disable logs","Move to monolith"]'::jsonb, 'Add caching at boundaries'),
        (new_interview_id, 'system_design', 'A stakeholder requests a last-minute feature for a critical demo. Describe your scope management and risk mitigation plan.', 'medium', 5, 6, NULL, NULL),
        (new_interview_id, 'mcq', 'A new compliance rule requires auditability. What is the most appropriate first implementation step?', 'medium', 5, 7,
          '["Instrument structured logs","Add screenshots to docs","Increase server size","Shorten retention"]'::jsonb, 'Instrument structured logs'),
        (new_interview_id, 'system_design', 'Traffic doubles overnight; costs spike. Propose a short-term stabilization and longer-term optimization plan.', 'medium', 5, 8, NULL, NULL),
        (new_interview_id, 'mcq', 'A regional outage affects one availability zone. Which choice improves resilience most with minimal downtime?', 'medium', 5, 9,
          '["Implement multi‑AZ failover","Increase instance size","Disable health checks","Consolidate workloads"]'::jsonb, 'Implement multi‑AZ failover'),
        (new_interview_id, 'system_design', 'A vendor SLA breach causes partial data delays. Explain your escalation and fallback strategy.', 'medium', 5, 10, NULL, NULL),
        (new_interview_id, 'mcq', 'A data pipeline shows duplicate records after a hotfix. What is the best immediate corrective step?', 'medium', 5, 11,
          '["Disable deduplication","Reprocess affected window with idempotent keys","Purge entire dataset","Ignore duplicates"]'::jsonb, 'Reprocess affected window with idempotent keys'),
        (new_interview_id, 'system_design', 'Executives request a live operational dashboard. Describe your approach to metrics, SLOs, and alert thresholds.', 'medium', 5, 12, NULL, NULL),
        (new_interview_id, 'mcq', 'A partner API changes response formats unexpectedly. What minimizes breakage across services?', 'medium', 5, 13,
          '["Patch clients directly in prod","Introduce compatibility adapter layer","Update docs only","Throttle callers"]'::jsonb, 'Introduce compatibility adapter layer'),
        (new_interview_id, 'system_design', 'A cross-team dependency delays a release. Outline your risk, communication, and contingency plan.', 'medium', 5, 14, NULL, NULL),
        (new_interview_id, 'mcq', 'Access reviews uncover excessive permissions. Which action best aligns with least-privilege quickly?', 'medium', 5, 15,
          '["Rotate all keys","Implement role-based policies and revoke unused permissions","Disable all accounts","Whitelist by IP only"]'::jsonb, 'Implement role-based policies and revoke unused permissions'),
        (new_interview_id, 'system_design', 'A critical system requires blue/green deployments. Explain your rollout, verification, and rollback criteria.', 'medium', 5, 16, NULL, NULL),
        (new_interview_id, 'mcq', 'An on-call alert shows elevated error rates after a new feature flag. Optimal first action?', 'medium', 5, 17,
          '["Disable the flag","Restart service","Scale out randomly","Silence alerts"]'::jsonb, 'Disable the flag'),
        (new_interview_id, 'system_design', 'An internal audit requires end-to-end traceability. Describe how you would implement distributed tracing.', 'medium', 5, 18, NULL, NULL),
        (new_interview_id, 'mcq', 'Production logs reveal PII exposure risk. What is the most appropriate immediate step?', 'medium', 5, 19,
          '["Purge sensitive logs and rotate keys","Notify only internal chat","Increase log level","Archive logs"]'::jsonb, 'Purge sensitive logs and rotate keys'),
        (new_interview_id, 'system_design', 'A customer escalates a multi-tenant performance issue. Present your isolation and remediation approach.', 'medium', 5, 20, NULL, NULL);
      END IF;
    END IF;
  END LOOP;
END
$$;
