-- Insert Java Developer and AI Automation Engineer Tests

-- Java Developer Test (32 MCQs, 50 minutes)
WITH new_assessment AS (
  INSERT INTO assessments (
    title, description, category, difficulty, duration_minutes, passing_score,
    timer_enabled, auto_submit_on_timeout, tab_switch_detection, max_tab_switches,
    face_detection_enabled, proctoring_enabled, is_published, created_by
  ) VALUES (
    'Java Developer Technical Test',
    'Comprehensive evaluation of Java core concepts, Spring Framework, multithreading, JVM, design patterns, microservices, and database connectivity.',
    'Backend Development',
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
  -- Java Core Concepts (8 questions)
  ('What is the difference between == and equals() in Java?', 'multiple_choice', '["== compares references, equals() compares content", "They are identical", "== is faster", "equals() compares references"]'::jsonb, '== compares references, equals() compares content', 3, 1),
  ('What is polymorphism in Java?', 'multiple_choice', '["Ability of object to take many forms", "Multiple inheritance", "Memory management", "Exception handling"]'::jsonb, 'Ability of object to take many forms', 3, 2),
  ('What is the purpose of the final keyword?', 'multiple_choice', '["Prevent modification of variables, methods, or classes", "Optimize performance", "Handle exceptions", "Create interfaces"]'::jsonb, 'Prevent modification of variables, methods, or classes', 3, 3),
  ('What is autoboxing in Java?', 'multiple_choice', '["Automatic conversion between primitive and wrapper types", "Memory cleanup", "Thread management", "Exception wrapping"]'::jsonb, 'Automatic conversion between primitive and wrapper types', 3, 4),
  ('What is the difference between abstract class and interface?', 'multiple_choice', '["Abstract class can have implementation, interface cannot (before Java 8)", "They are identical", "Interface is faster", "Abstract class supports multiple inheritance"]'::jsonb, 'Abstract class can have implementation, interface cannot (before Java 8)', 3, 5),
  ('What is a lambda expression in Java?', 'multiple_choice', '["Anonymous function for functional programming", "Thread pool", "Exception type", "Design pattern"]'::jsonb, 'Anonymous function for functional programming', 3, 6),
  ('What is the Stream API used for?', 'multiple_choice', '["Process collections in functional style", "Input/output operations", "Thread management", "Network communication"]'::jsonb, 'Process collections in functional style', 3, 7),
  ('What is method overloading?', 'multiple_choice', '["Multiple methods with same name but different parameters", "Overriding parent methods", "Thread synchronization", "Exception handling"]'::jsonb, 'Multiple methods with same name but different parameters', 3, 8),
  
  -- Spring Framework (6 questions)
  ('What is Spring Boot?', 'multiple_choice', '["Framework to create production-ready Spring applications", "Database tool", "Testing framework", "Build tool"]'::jsonb, 'Framework to create production-ready Spring applications', 3, 9),
  ('What is Dependency Injection in Spring?', 'multiple_choice', '["Design pattern where framework provides dependencies", "Database connection", "Security mechanism", "Threading model"]'::jsonb, 'Design pattern where framework provides dependencies', 3, 10),
  ('What annotation is used to create a REST controller?', 'multiple_choice', '["@RestController", "@Controller", "@Service", "@Component"]'::jsonb, '@RestController', 3, 11),
  ('What is Spring AOP?', 'multiple_choice', '["Aspect-Oriented Programming for cross-cutting concerns", "Database framework", "Testing tool", "Build system"]'::jsonb, 'Aspect-Oriented Programming for cross-cutting concerns', 3, 12),
  ('What is the purpose of @Autowired annotation?', 'multiple_choice', '["Automatically inject dependencies", "Create web controllers", "Define routes", "Handle exceptions"]'::jsonb, 'Automatically inject dependencies', 3, 13),
  ('What is Spring Data JPA?', 'multiple_choice', '["Simplifies database access with JPA", "Web framework", "Security module", "Logging framework"]'::jsonb, 'Simplifies database access with JPA', 3, 14),
  
  -- Multithreading & Concurrency (5 questions)
  ('What is the difference between process and thread?', 'multiple_choice', '["Process has separate memory, threads share memory", "They are identical", "Process is faster", "Thread uses more memory"]'::jsonb, 'Process has separate memory, threads share memory', 3, 15),
  ('What is synchronization in Java?', 'multiple_choice', '["Control access to shared resources by multiple threads", "Network communication", "File operations", "Memory management"]'::jsonb, 'Control access to shared resources by multiple threads', 3, 16),
  ('What is a deadlock?', 'multiple_choice', '["Two threads waiting for each other indefinitely", "Thread completion", "Memory leak", "Network timeout"]'::jsonb, 'Two threads waiting for each other indefinitely', 3, 17),
  ('What is the purpose of ExecutorService?', 'multiple_choice', '["Manage thread pool for concurrent tasks", "Database connection pool", "Web server", "File manager"]'::jsonb, 'Manage thread pool for concurrent tasks', 3, 18),
  ('What is the volatile keyword used for?', 'multiple_choice', '["Ensure visibility of variable changes across threads", "Optimize performance", "Handle exceptions", "Create constants"]'::jsonb, 'Ensure visibility of variable changes across threads', 3, 19),
  
  -- JVM & Memory Management (4 questions)
  ('What is the JVM?', 'multiple_choice', '["Java Virtual Machine - executes Java bytecode", "Java compiler", "IDE for Java", "Database server"]'::jsonb, 'Java Virtual Machine - executes Java bytecode', 3, 20),
  ('What is garbage collection?', 'multiple_choice', '["Automatic memory management", "Code optimization", "Thread cleanup", "Exception handling"]'::jsonb, 'Automatic memory management', 3, 21),
  ('What is a memory leak in Java?', 'multiple_choice', '["Objects not garbage collected despite being unused", "Stack overflow", "Compilation error", "Thread deadlock"]'::jsonb, 'Objects not garbage collected despite being unused', 3, 22),
  ('What is the difference between heap and stack memory?', 'multiple_choice', '["Heap stores objects, stack stores method calls and local variables", "They are identical", "Stack is larger", "Heap is faster"]'::jsonb, 'Heap stores objects, stack stores method calls and local variables', 3, 23),
  
  -- Design Patterns (4 questions)
  ('What is the Singleton pattern?', 'multiple_choice', '["Ensure class has only one instance", "Handle multiple connections", "Manage threads", "Process requests"]'::jsonb, 'Ensure class has only one instance', 3, 24),
  ('What is the Factory pattern?', 'multiple_choice', '["Create objects without specifying exact class", "Manage database connections", "Handle exceptions", "Optimize performance"]'::jsonb, 'Create objects without specifying exact class', 3, 25),
  ('What is the Observer pattern?', 'multiple_choice', '["Define one-to-many dependency for state changes", "Monitor performance", "Handle threads", "Manage memory"]'::jsonb, 'Define one-to-many dependency for state changes', 3, 26),
  ('What is Dependency Inversion Principle?', 'multiple_choice', '["Depend on abstractions, not concrete implementations", "Optimize database queries", "Manage threads", "Handle exceptions"]'::jsonb, 'Depend on abstractions, not concrete implementations', 3, 27),
  
  -- Microservices Architecture (3 questions)
  ('What are microservices?', 'multiple_choice', '["Small, independent services communicating via APIs", "Monolithic applications", "Database sharding", "Load balancers"]'::jsonb, 'Small, independent services communicating via APIs', 3, 28),
  ('What is an API Gateway in microservices?', 'multiple_choice', '["Single entry point routing requests to services", "Database connection", "Monitoring tool", "Testing framework"]'::jsonb, 'Single entry point routing requests to services', 3, 29),
  ('What is service discovery?', 'multiple_choice', '["Mechanism to locate service instances dynamically", "Database indexing", "Code compilation", "Memory management"]'::jsonb, 'Mechanism to locate service instances dynamically', 3, 30),
  
  -- Database Connectivity (2 questions)
  ('What is JDBC?', 'multiple_choice', '["Java Database Connectivity - API for database access", "Web framework", "Testing tool", "Build system"]'::jsonb, 'Java Database Connectivity - API for database access', 3, 31),
  ('What is a PreparedStatement?', 'multiple_choice', '["Pre-compiled SQL statement preventing injection", "Database connection", "Transaction manager", "Query optimizer"]'::jsonb, 'Pre-compiled SQL statement preventing injection', 3, 32)
) AS questions(question_text, question_type, options, correct_answer, points, order_index);