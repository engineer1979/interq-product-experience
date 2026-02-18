-- Insert DevOps Engineer Test (28 MCQs, 50 minutes)
WITH new_assessment AS (
  INSERT INTO assessments (
    title, description, category, difficulty, duration_minutes, passing_score,
    timer_enabled, auto_submit_on_timeout, tab_switch_detection, max_tab_switches,
    face_detection_enabled, proctoring_enabled, is_published, created_by
  ) VALUES (
    'DevOps Engineer Technical Test',
    'Comprehensive evaluation of Docker, Kubernetes, CI/CD pipelines, cloud services (AWS/Azure/GCP), Infrastructure as Code (Terraform), and monitoring/logging.',
    'DevOps & Cloud',
    'advanced',
    50,
    75,
    true,
    true,
    true,
    2,
    true,
    true,
    true,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO assessment_questions (assessment_id, question_text, question_type, options, correct_answer, points, order_index) 
SELECT id, question_text, question_type, options, correct_answer, points, order_index
FROM new_assessment, (VALUES
  -- Docker & Containerization (6 questions)
  ('What is the difference between Docker image and container?', 'multiple_choice', '["Image is template, container is running instance", "Image is running, container is template", "They are the same", "Image is larger than container"]'::jsonb, 'Image is template, container is running instance', 3, 1),
  ('What is multi-stage Dockerfile used for?', 'multiple_choice', '["Optimize image size by separating build and runtime", "Run multiple containers", "Support multiple architectures", "Enable parallel builds"]'::jsonb, 'Optimize image size by separating build and runtime', 3, 2),
  ('Which command removes unused Docker images?', 'multiple_choice', '["docker image prune", "docker rm images", "docker clean", "docker delete unused"]'::jsonb, 'docker image prune', 3, 3),
  ('What is Docker Compose used for?', 'multiple_choice', '["Define and run multi-container applications", "Build Docker images", "Monitor containers", "Deploy to production"]'::jsonb, 'Define and run multi-container applications', 3, 4),
  ('How do you persist data in Docker?', 'multiple_choice', '["Use volumes or bind mounts", "Store in container filesystem", "Use environment variables", "Copy to host manually"]'::jsonb, 'Use volumes or bind mounts', 3, 5),
  ('What is the purpose of .dockerignore file?', 'multiple_choice', '["Exclude files from build context", "Ignore container errors", "Hide sensitive data", "Skip image layers"]'::jsonb, 'Exclude files from build context', 3, 6),
  
  -- Kubernetes (6 questions)
  ('What is a Kubernetes Pod?', 'multiple_choice', '["Smallest deployable unit containing one or more containers", "Physical server", "Virtual machine", "Load balancer"]'::jsonb, 'Smallest deployable unit containing one or more containers', 3, 7),
  ('What is the purpose of Kubernetes Service?', 'multiple_choice', '["Provide stable network endpoint for Pods", "Store configuration", "Schedule workloads", "Manage storage"]'::jsonb, 'Provide stable network endpoint for Pods', 3, 8),
  ('What does kubectl describe pod command do?', 'multiple_choice', '["Shows detailed pod information including events", "Creates a new pod", "Deletes a pod", "Restarts a pod"]'::jsonb, 'Shows detailed pod information including events', 3, 9),
  ('What is a Kubernetes Deployment?', 'multiple_choice', '["Manages replica sets and rolling updates", "Stores secrets", "Configures networking", "Monitors cluster health"]'::jsonb, 'Manages replica sets and rolling updates', 3, 10),
  ('How do you expose application outside the cluster?', 'multiple_choice', '["Use LoadBalancer or Ingress", "Use ClusterIP", "Use NodePort only", "Modify Pod directly"]'::jsonb, 'Use LoadBalancer or Ingress', 3, 11),
  ('What are ConfigMaps used for in Kubernetes?', 'multiple_choice', '["Store non-sensitive configuration data", "Store passwords", "Manage deployments", "Configure networking"]'::jsonb, 'Store non-sensitive configuration data', 3, 12),
  
  -- CI/CD Pipelines (5 questions)
  ('What is Continuous Integration (CI)?', 'multiple_choice', '["Automatically build and test code changes", "Deploy to production continuously", "Monitor applications", "Manage infrastructure"]'::jsonb, 'Automatically build and test code changes', 3, 13),
  ('What is the purpose of Jenkins pipeline?', 'multiple_choice', '["Automate build, test, and deployment process", "Store source code", "Manage containers", "Monitor servers"]'::jsonb, 'Automate build, test, and deployment process', 3, 14),
  ('What is blue-green deployment?', 'multiple_choice', '["Run two identical environments, switch traffic instantly", "Deploy to multiple regions", "Use color-coded servers", "Test in staging environment"]'::jsonb, 'Run two identical environments, switch traffic instantly', 3, 15),
  ('What is canary deployment?', 'multiple_choice', '["Gradually roll out changes to subset of users", "Deploy all at once", "Deploy to test environment only", "Backup deployment strategy"]'::jsonb, 'Gradually roll out changes to subset of users', 3, 16),
  ('What should trigger a CI/CD pipeline?', 'multiple_choice', '["Code commit, pull request, or scheduled time", "Manual button click only", "Server restart", "User login"]'::jsonb, 'Code commit, pull request, or scheduled time', 3, 17),
  
  -- Cloud Services (5 questions)
  ('What is AWS EC2?', 'multiple_choice', '["Virtual server in the cloud", "Object storage service", "Database service", "Load balancer"]'::jsonb, 'Virtual server in the cloud', 3, 18),
  ('What is the purpose of AWS S3?', 'multiple_choice', '["Object storage for files and backups", "Compute instances", "Database hosting", "Network routing"]'::jsonb, 'Object storage for files and backups', 3, 19),
  ('What is Infrastructure as a Service (IaaS)?', 'multiple_choice', '["Virtualized computing resources over internet", "Software applications", "Development tools", "Storage only"]'::jsonb, 'Virtualized computing resources over internet', 3, 20),
  ('What is auto-scaling in cloud?', 'multiple_choice', '["Automatically adjust resources based on demand", "Manual resource allocation", "Fixed server capacity", "Load balancing algorithm"]'::jsonb, 'Automatically adjust resources based on demand', 3, 21),
  ('What is AWS Lambda?', 'multiple_choice', '["Serverless compute service", "Storage service", "Database service", "Monitoring tool"]'::jsonb, 'Serverless compute service', 3, 22),
  
  -- Infrastructure as Code (3 questions)
  ('What is Terraform used for?', 'multiple_choice', '["Provision and manage infrastructure as code", "Monitor applications", "Deploy containers", "Write application code"]'::jsonb, 'Provision and manage infrastructure as code', 3, 23),
  ('What is the purpose of terraform plan?', 'multiple_choice', '["Preview changes before applying", "Apply changes immediately", "Destroy infrastructure", "Initialize Terraform"]'::jsonb, 'Preview changes before applying', 3, 24),
  ('What is idempotency in Infrastructure as Code?', 'multiple_choice', '["Running same operation multiple times produces same result", "Code runs faster", "Automatic rollback", "Version control"]'::jsonb, 'Running same operation multiple times produces same result', 3, 25),
  
  -- Monitoring & Logging (3 questions)
  ('What is Prometheus used for?', 'multiple_choice', '["Monitoring and alerting system", "Log aggregation", "Container orchestration", "Code deployment"]'::jsonb, 'Monitoring and alerting system', 3, 26),
  ('What is ELK stack?', 'multiple_choice', '["Elasticsearch, Logstash, Kibana for logging", "Container platform", "CI/CD tool", "Cloud provider"]'::jsonb, 'Elasticsearch, Logstash, Kibana for logging', 3, 27),
  ('What metrics are important for application monitoring?', 'multiple_choice', '["CPU, memory, response time, error rate", "Only error logs", "Only uptime", "Only disk space"]'::jsonb, 'CPU, memory, response time, error rate', 3, 28)
) AS questions(question_text, question_type, options, correct_answer, points, order_index);