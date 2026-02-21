ALTER TABLE public.interviews
ADD COLUMN IF NOT EXISTS live_interview_enabled boolean DEFAULT true;

DO $$
DECLARE
  rec RECORD;
  iv_id uuid;
  dur int;
  qcount int;
BEGIN
  FOR rec IN SELECT id, title, category, difficulty FROM public.assessments LOOP
    dur := 50;
    qcount := 18;

    IF NOT EXISTS (
      SELECT 1 FROM public.interviews WHERE title = rec.title || ' — Live Interview'
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
        'Scenario-based live interview aligned to ' || rec.title || ' (' || coalesce(rec.difficulty,'medium') || ').',
        '[]'::jsonb,
        dur,
        true,
        true
      ) RETURNING id INTO iv_id;
    ELSE
      SELECT id INTO iv_id FROM public.interviews WHERE title = rec.title || ' — Live Interview' LIMIT 1;
      UPDATE public.interviews
      SET live_interview_enabled = true,
          is_published = true,
          duration_minutes = dur
      WHERE id = iv_id;
    END IF;

    IF iv_id IS NOT NULL THEN
      IF NOT EXISTS (SELECT 1 FROM public.interview_questions WHERE interview_id = iv_id) THEN
        INSERT INTO public.interview_questions (interview_id, question_type, question_text, difficulty, points, order_index, options, correct_answer)
        VALUES
        (iv_id, 'mcq', 'A critical customer workflow is failing after a release. What is your first action to stabilize while investigating?', coalesce(rec.difficulty,'medium'), 5, 1,
          '["Roll back recent change","Restart random services","Disable logs","Ignore alerts"]'::jsonb, 'Roll back recent change'),
        (iv_id, 'scenario', 'A stakeholder escalates degraded performance during peak hours. Outline your short-term mitigation and long-term plan.', coalesce(rec.difficulty,'medium'), 5, 2, NULL, NULL),
        (iv_id, 'mcq', 'An integration returns intermittent 5xx errors from a partner API. Which step most reduces impact quickly?', coalesce(rec.difficulty,'medium'), 5, 3,
          '["Introduce circuit breaker","Increase timeout globally","Remove retries","Cache errors"]'::jsonb, 'Introduce circuit breaker'),
        (iv_id, 'open_ended', 'Data quality checks fail for a nightly pipeline. Explain how you would triage and prevent recurrence.', coalesce(rec.difficulty,'medium'), 5, 4, NULL, NULL),
        (iv_id, 'mcq', 'Access review reveals overly broad permissions on a production role. Best immediate step?', coalesce(rec.difficulty,'medium'), 5, 5,
          '["Apply least-privilege policy","Rotate all keys immediately","Disable all users","Whitelist a single IP"]'::jsonb, 'Apply least-privilege policy'),
        (iv_id, 'scenario', 'A customer reports inconsistent results across regions. Describe how you would localize and remediate the issue.', coalesce(rec.difficulty,'medium'), 5, 6, NULL, NULL),
        (iv_id, 'mcq', 'After a dependency bump, a job fails intermittently. Most systematic next step?', coalesce(rec.difficulty,'medium'), 5, 7,
          '["Pin version and reproduce in staging","Reboot servers","Silence alerts","Skip tests"]'::jsonb, 'Pin version and reproduce in staging'),
        (iv_id, 'scenario', 'Costs spiked after traffic growth. Present a plan balancing performance and cost.', coalesce(rec.difficulty,'medium'), 5, 8, NULL, NULL),
        (iv_id, 'mcq', 'A data pipeline shows duplicates after a hotfix. What is the best corrective action?', coalesce(rec.difficulty,'medium'), 5, 9,
          '["Reprocess idempotently for affected window","Purge entire dataset","Disable deduplication","Ignore duplicates"]'::jsonb, 'Reprocess idempotently for affected window'),
        (iv_id, 'scenario', 'A regional outage affects a single AZ. Describe your verification and failover approach.', coalesce(rec.difficulty,'medium'), 5, 10, NULL, NULL),
        (iv_id, 'mcq', 'A feature behind a flag raises error rates. Immediate step?', coalesce(rec.difficulty,'medium'), 5, 11,
          '["Disable the flag","Scale randomly","Restart service","Reduce logging"]'::jsonb, 'Disable the flag'),
        (iv_id, 'scenario', 'New compliance requires auditability. Explain your logging and retention strategy.', coalesce(rec.difficulty,'medium'), 5, 12, NULL, NULL),
        (iv_id, 'mcq', 'Partner contract changes response schema. How to minimize breakage?', coalesce(rec.difficulty,'medium'), 5, 13,
          '["Add compatibility adapter","Patch all clients in prod","Do nothing","Throttle clients"]'::jsonb, 'Add compatibility adapter'),
        (iv_id, 'open_ended', 'A cross-team dependency risks a deadline. Outline communication, risk management, and contingency.', coalesce(rec.difficulty,'medium'), 5, 14, NULL, NULL),
        (iv_id, 'mcq', 'PII appears in logs. Most appropriate first step?', coalesce(rec.difficulty,'medium'), 5, 15,
          '["Purge sensitive logs and rotate keys","Archive logs","Disable monitoring","Ignore for now"]'::jsonb, 'Purge sensitive logs and rotate keys'),
        (iv_id, 'scenario', 'A multi-tenant system shows noisy-neighbor effects. Explain isolation and remediation.', coalesce(rec.difficulty,'medium'), 5, 16, NULL, NULL),
        (iv_id, 'mcq', 'SLO breaches for latency are reported. Best first investigation?', coalesce(rec.difficulty,'medium'), 5, 17,
          '["Check recent deployments and traces","Increase DB size","Disable alerts","Restart nodes"]'::jsonb, 'Check recent deployments and traces'),
        (iv_id, 'scenario', 'You must implement blue/green deployments. Describe rollout, verification, and rollback.', coalesce(rec.difficulty,'medium'), 5, 18, NULL, NULL);
      END IF;
    END IF;
  END LOOP;

  -- Ensure ALL interviews are enabled and published
  UPDATE public.interviews
  SET live_interview_enabled = true,
      is_published = true,
      duration_minutes = COALESCE(duration_minutes, 50)
  WHERE true;
END
$$;
