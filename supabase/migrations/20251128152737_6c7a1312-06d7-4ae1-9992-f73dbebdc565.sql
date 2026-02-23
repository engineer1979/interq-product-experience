-- Full Stack Developer & DevOps Engineer
WITH fullstack_assessment AS (
  INSERT INTO assessments (
    title, description, category, difficulty, duration_minutes, passing_score,
    created_by, is_published, timer_enabled, grace_period_minutes, auto_submit_on_timeout,
    proctoring_enabled, face_detection_enabled, tab_switch_detection, max_tab_switches
  ) VALUES (
    'Full Stack Developer',
    'Complete full-stack assessment testing MERN stack, authentication, deployment, and end-to-end development',
    'Software Development',
    'hard',
    75,
    70,
    '391dea46-f9cc-43cc-a253-ae56151e8993',
    true,
    true,
    10,
    true,
    true,
    true,
    true,
    3
  )
  RETURNING id
),
fullstack_questions AS (
  INSERT INTO assessment_questions (assessment_id, question_text, question_type, options, correct_answer, order_index, points)
  SELECT 
    id,
    unnest(ARRAY[
      'What does MERN stack stand for?',
      'How do you manage state in a full-stack app?',
      'What is server-side rendering?',
      'How do you implement authentication in full-stack?',
      'What is the purpose of Redux in MERN?',
      'How do you connect React to Node.js backend?',
      'What is MongoDB Atlas?',
      'How do you deploy a MERN application?',
      'What is API gateway?',
      'How do you handle file uploads in full-stack?',
      'What is Docker used for in deployment?',
      'How do you implement real-time features?',
      'What is GraphQL vs REST?',
      'How do you secure a full-stack application?',
      'What is CI/CD pipeline?'
    ]),
    'multiple_choice',
    unnest(ARRAY[
      '["MongoDB, Express, React, Node.js", "MySQL, Express, React, Node.js", "MongoDB, Ember, React, Next.js", "MongoDB, Express, Redux, Node.js"]'::jsonb,
      '["Redux, Context API, or state management library", "Only local state", "Only cookies", "Only database"]'::jsonb,
      '["Rendering on server before sending to client", "Rendering only on client", "No rendering", "Rendering in database"]'::jsonb,
      '["JWT, sessions, OAuth", "No authentication", "Only cookies", "Only passwords"]'::jsonb,
      '["Centralized state management", "Database management", "Routing", "Styling"]'::jsonb,
      '["REST API or GraphQL", "Direct database connection", "No connection needed", "FTP"]'::jsonb,
      '["Cloud database service for MongoDB", "Atlas for maps", "Testing framework", "Design tool"]'::jsonb,
      '["Heroku, Vercel, AWS, or similar platforms", "No deployment needed", "Only locally", "Email it"]'::jsonb,
      '["Entry point for backend APIs", "Frontend router", "Database gateway", "Testing tool"]'::jsonb,
      '["Multer backend + FormData frontend", "Only backend", "Only frontend", "Not possible"]'::jsonb,
      '["Containerization and deployment", "Testing", "Database", "Frontend framework"]'::jsonb,
      '["WebSockets or Socket.io", "Polling only", "No real-time possible", "Email"]'::jsonb,
      '["Different query approaches", "No difference", "Both are databases", "Both are frontend"]'::jsonb,
      '["Authentication, input validation, HTTPS, CORS", "No security needed", "Frontend only", "Backend only"]'::jsonb,
      '["Automated testing and deployment", "Manual deployment", "No deployment", "Testing only"]'::jsonb
    ]),
    unnest(ARRAY[
      'MongoDB, Express, React, Node.js',
      'Redux, Context API, or state management library',
      'Rendering on server before sending to client',
      'JWT, sessions, OAuth',
      'Centralized state management',
      'REST API or GraphQL',
      'Cloud database service for MongoDB',
      'Heroku, Vercel, AWS, or similar platforms',
      'Entry point for backend APIs',
      'Multer backend + FormData frontend',
      'Containerization and deployment',
      'WebSockets or Socket.io',
      'Different query approaches',
      'Authentication, input validation, HTTPS, CORS',
      'Automated testing and deployment'
    ]),
    generate_series(1, 15),
    5
  FROM fullstack_assessment
  RETURNING 1
),
devops_assessment AS (
  INSERT INTO assessments (
    title, description, category, difficulty, duration_minutes, passing_score,
    created_by, is_published, timer_enabled, grace_period_minutes, auto_submit_on_timeout,
    proctoring_enabled, face_detection_enabled, tab_switch_detection, max_tab_switches
  ) VALUES (
    'DevOps Engineer',
    'DevOps assessment covering Docker, Kubernetes, AWS, CI/CD pipelines, and infrastructure as code',
    'Software Development',
    'hard',
    60,
    70,
    '391dea46-f9cc-43cc-a253-ae56151e8993',
    true,
    true,
    5,
    true,
    true,
    false,
    true,
    5
  )
  RETURNING id
)
INSERT INTO assessment_questions (assessment_id, question_text, question_type, options, correct_answer, order_index, points)
SELECT 
  id,
  unnest(ARRAY[
    'What is Docker used for?',
    'What is a Kubernetes pod?',
    'What is Infrastructure as Code?',
    'What is the purpose of CI/CD?',
    'What is AWS EC2?',
    'What is container orchestration?',
    'What is Jenkins used for?',
    'What is the difference between Docker and VM?',
    'What is Terraform?',
    'What is load balancing?',
    'What is monitoring in DevOps?',
    'What is Git in DevOps workflow?',
    'What is blue-green deployment?',
    'What is AWS S3 used for?',
    'What is the purpose of logging?',
    'What is container registry?',
    'What is Kubernetes service?',
    'What is auto-scaling?',
    'What is AWS Lambda?',
    'What is configuration management?',
    'What is the purpose of backup strategies?',
    'What is microservices architecture?'
  ]),
  'multiple_choice',
  unnest(ARRAY[
    '["Containerization of applications", "Database management", "Frontend development", "Mobile apps"]'::jsonb,
    '["Smallest deployable unit", "Database", "Load balancer", "Monitoring tool"]'::jsonb,
    '["Managing infrastructure through code", "Manual setup", "Hardware only", "No infrastructure"]'::jsonb,
    '["Automate build, test, deploy", "Manual deployment", "No automation", "Testing only"]'::jsonb,
    '["Virtual servers in cloud", "Database", "Container", "Monitoring"]'::jsonb,
    '["Managing containerized applications", "Database queries", "Frontend routing", "File storage"]'::jsonb,
    '["Automation server for CI/CD", "Database", "Frontend framework", "Testing tool"]'::jsonb,
    '["Containers share OS, VMs dont", "No difference", "Docker is faster", "VMs are lighter"]'::jsonb,
    '["Infrastructure as Code tool", "Programming language", "Database", "Container"]'::jsonb,
    '["Distribute traffic across servers", "Store data", "Compile code", "Test applications"]'::jsonb,
    '["Track system health and performance", "Deploy code", "Write tests", "Design UI"]'::jsonb,
    '["Version control for collaboration", "Database", "Deployment tool", "Testing framework"]'::jsonb,
    '["Zero-downtime deployment strategy", "Color coding", "Database backup", "Testing method"]'::jsonb,
    '["Object storage service", "Compute service", "Database", "Container registry"]'::jsonb,
    '["Track errors and debug", "Store data", "Deploy apps", "Test code"]'::jsonb,
    '["Store container images", "Run containers", "Monitor containers", "Build containers"]'::jsonb,
    '["Expose pods to network", "Store data", "Run code", "Test applications"]'::jsonb,
    '["Automatically adjust resources", "Manual scaling", "No scaling", "Database scaling"]'::jsonb,
    '["Serverless compute service", "Database", "Container", "Load balancer"]'::jsonb,
    '["Manage system configurations", "Write code", "Test applications", "Design UI"]'::jsonb,
    '["Ensure data recovery", "Speed up apps", "Write code", "Design UI"]'::jsonb,
    '["Small independent services", "Monolithic app", "Database design", "Frontend pattern"]'::jsonb
  ]),
  unnest(ARRAY[
    'Containerization of applications',
    'Smallest deployable unit',
    'Managing infrastructure through code',
    'Automate build, test, deploy',
    'Virtual servers in cloud',
    'Managing containerized applications',
    'Automation server for CI/CD',
    'Containers share OS, VMs dont',
    'Infrastructure as Code tool',
    'Distribute traffic across servers',
    'Track system health and performance',
    'Version control for collaboration',
    'Zero-downtime deployment strategy',
    'Object storage service',
    'Track errors and debug',
    'Store container images',
    'Expose pods to network',
    'Automatically adjust resources',
    'Serverless compute service',
    'Manage system configurations',
    'Ensure data recovery',
    'Small independent services'
  ]),
  generate_series(1, 22),
  5
FROM devops_assessment;