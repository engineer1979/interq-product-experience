-- Insert new IT assessments if they don't already exist (by exact title)
WITH new_assessments AS (
  SELECT * FROM (
    VALUES
      ('Cisco Network Engineer Assessment','Cisco routing, switching, VLANs, firewalls, and network troubleshooting.','Networking','hard',50),
      ('UI/UX Designer Assessment','User research, wireframing, prototyping, usability testing, and design systems.','Design','medium',45),
      ('AI Automation Engineer Assessment','Workflow automation, AI integrations, APIs, and process optimization.','Artificial Intelligence','hard',55),
      ('AI Agent Design Engineer Assessment','LLM agents, prompt engineering, tool integration, and orchestration logic.','AI Engineering','hard',60),
      ('Microsoft Infrastructure Engineer Assessment','Windows Server, Active Directory, Azure integration, and system security.','Infrastructure','hard',55),
      ('Cloud Security Engineer Assessment','Cloud IAM, encryption, threat monitoring, and compliance frameworks.','Cloud & Security','hard',55),
      ('MLOps Engineer Assessment','Model deployment, CI/CD pipelines, monitoring, and scalable ML systems.','AI & DevOps','hard',60),
      ('IT Infrastructure Architect Assessment','Enterprise infrastructure design, scalability, redundancy, and optimization.','Infrastructure','hard',60),
      ('Power Platform Developer Assessment','Power Apps, Power Automate, Dataverse, and business workflow automation.','Microsoft Technologies','medium',45),
      ('Cybersecurity Engineer Assessment','Network security, penetration testing, SIEM tools, and risk mitigation.','Security','hard',60),
      ('Azure DevOps Engineer Assessment','Azure pipelines, infrastructure as code, and release management.','DevOps','medium',50),
      ('Enterprise IT Administrator Assessment','Enterprise systems management, virtualization, backups, and monitoring.','IT Operations','medium',45)
  ) AS t(title, description, category, difficulty, duration_minutes)
)
INSERT INTO public.assessments (
  title, description, category, difficulty, duration_minutes, passing_score,
  created_by, is_published, timer_enabled, grace_period_minutes, auto_submit_on_timeout,
  proctoring_enabled, face_detection_enabled, tab_switch_detection, max_tab_switches
)
SELECT
  na.title,
  na.description,
  na.category,
  na.difficulty,
  na.duration_minutes,
  70,                                            -- passing_score
  '391dea46-f9cc-43cc-a253-ae56151e8993',        -- created_by (system/admin user)
  true,                                          -- is_published
  true,                                          -- timer_enabled
  5,                                             -- grace_period_minutes
  true,                                          -- auto_submit_on_timeout
  false,                                         -- proctoring_enabled
  false,                                         -- face_detection_enabled
  true,                                          -- tab_switch_detection
  5                                              -- max_tab_switches
FROM new_assessments na
WHERE NOT EXISTS (
  SELECT 1 FROM public.assessments a WHERE a.title = na.title
);
