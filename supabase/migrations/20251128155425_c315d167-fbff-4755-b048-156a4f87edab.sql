-- Insert Python Developer Test (30 MCQs, 45 minutes)
WITH new_assessment AS (
  INSERT INTO assessments (
    title, description, category, difficulty, duration_minutes, passing_score,
    timer_enabled, auto_submit_on_timeout, tab_switch_detection, max_tab_switches,
    face_detection_enabled, proctoring_enabled, is_published, created_by
  ) VALUES (
    'Python Developer Technical Test',
    'In-depth assessment covering Python data structures, OOP, Django/Flask, NumPy/Pandas, decorators, generators, error handling, and memory management.',
    'Backend Development',
    'intermediate',
    45,
    70,
    true,
    true,
    true,
    3,
    true,
    true,
    true,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO assessment_questions (assessment_id, question_text, question_type, options, correct_answer, points, order_index) 
SELECT id, question_text, question_type, options, correct_answer, points, order_index
FROM new_assessment, (VALUES
  -- Python Data Structures (6 questions)
  ('Which data structure would you use for fast lookups by key?', 'multiple_choice', '["Dictionary", "List", "Tuple", "Set"]'::jsonb, 'Dictionary', 2, 1),
  ('What is the time complexity of list.append() in Python?', 'multiple_choice', '["O(1) amortized", "O(n)", "O(log n)", "O(n²)"]'::jsonb, 'O(1) amortized', 2, 2),
  ('What is the difference between list and tuple?', 'multiple_choice', '["Lists are mutable, tuples are immutable", "Lists are faster", "Tuples can store more data", "No difference"]'::jsonb, 'Lists are mutable, tuples are immutable', 2, 3),
  ('How do you create a set with no duplicate elements?', 'multiple_choice', '["my_set = {1, 2, 3}", "my_set = [1, 2, 3]", "my_set = (1, 2, 3)", "my_set = <1, 2, 3>"]'::jsonb, 'my_set = {1, 2, 3}', 2, 4),
  ('What does the collections.deque provide?', 'multiple_choice', '["Fast appends and pops from both ends", "Sorted dictionary", "Immutable list", "Binary tree structure"]'::jsonb, 'Fast appends and pops from both ends', 2, 5),
  ('Which method removes and returns an arbitrary element from a set?', 'multiple_choice', '["pop()", "remove()", "delete()", "extract()"]'::jsonb, 'pop()', 2, 6),
  
  -- OOP Concepts (5 questions)
  ('What is the purpose of __init__ method?', 'multiple_choice', '["Initialize object attributes", "Destroy objects", "Import modules", "Define class methods"]'::jsonb, 'Initialize object attributes', 2, 7),
  ('How do you define a private attribute in Python?', 'multiple_choice', '["Prefix with double underscore __attribute", "Use private keyword", "Use @ symbol", "Use # symbol"]'::jsonb, 'Prefix with double underscore __attribute', 2, 8),
  ('What is method overriding?', 'multiple_choice', '["Redefining parent class method in child class", "Having multiple methods with same name", "Calling parent method from child", "Creating abstract methods"]'::jsonb, 'Redefining parent class method in child class', 2, 9),
  ('What does super() do in Python?', 'multiple_choice', '["Calls parent class methods", "Creates superuser", "Optimizes code", "Handles exceptions"]'::jsonb, 'Calls parent class methods', 2, 10),
  ('What is a property decorator used for?', 'multiple_choice', '["Define getter/setter methods as attributes", "Create static methods", "Handle errors", "Optimize performance"]'::jsonb, 'Define getter/setter methods as attributes', 2, 11),
  
  -- Django/Flask Framework (5 questions)
  ('What is the purpose of Django ORM?', 'multiple_choice', '["Map Python objects to database tables", "Handle HTTP requests", "Manage static files", "Render templates"]'::jsonb, 'Map Python objects to database tables', 2, 12),
  ('In Flask, what decorator is used to define routes?', 'multiple_choice', '["@app.route()", "@route()", "@path()", "@url()"]'::jsonb, '@app.route()', 2, 13),
  ('What is Django middleware?', 'multiple_choice', '["Component that processes requests/responses globally", "Database layer", "Template engine", "URL router"]'::jsonb, 'Component that processes requests/responses globally', 2, 14),
  ('How do you run database migrations in Django?', 'multiple_choice', '["python manage.py migrate", "python manage.py runserver", "python manage.py makemigrations", "python manage.py deploy"]'::jsonb, 'python manage.py migrate', 2, 15),
  ('What is the purpose of Flask blueprints?', 'multiple_choice', '["Organize application into components", "Define database models", "Handle authentication", "Manage static files"]'::jsonb, 'Organize application into components', 2, 16),
  
  -- Python Libraries (4 questions)
  ('What is NumPy primarily used for?', 'multiple_choice', '["Numerical computing with arrays", "Web development", "Machine learning models", "Database management"]'::jsonb, 'Numerical computing with arrays', 2, 17),
  ('Which Pandas data structure is two-dimensional?', 'multiple_choice', '["DataFrame", "Series", "Array", "Matrix"]'::jsonb, 'DataFrame', 2, 18),
  ('How do you read a CSV file in Pandas?', 'multiple_choice', '["pd.read_csv(filename)", "pd.load_csv(filename)", "pd.import_csv(filename)", "pd.open_csv(filename)"]'::jsonb, 'pd.read_csv(filename)', 2, 19),
  ('What does df.groupby() do in Pandas?', 'multiple_choice', '["Groups data by column values for aggregation", "Sorts dataframe", "Filters rows", "Merges dataframes"]'::jsonb, 'Groups data by column values for aggregation', 2, 20),
  
  -- Decorators & Generators (4 questions)
  ('What is a Python decorator?', 'multiple_choice', '["Function that modifies another function", "Design pattern", "Data structure", "Loop construct"]'::jsonb, 'Function that modifies another function', 2, 21),
  ('What keyword is used to create a generator?', 'multiple_choice', '["yield", "return", "generate", "iterator"]'::jsonb, 'yield', 2, 22),
  ('What is the advantage of generators over lists?', 'multiple_choice', '["Memory efficient - generate values on-the-fly", "Faster iteration", "Better syntax", "Easier to debug"]'::jsonb, 'Memory efficient - generate values on-the-fly', 2, 23),
  ('Which decorator makes a method static?', 'multiple_choice', '["@staticmethod", "@static", "@classmethod", "@method"]'::jsonb, '@staticmethod', 2, 24),
  
  -- Error Handling (3 questions)
  ('What is the purpose of try-except block?', 'multiple_choice', '["Handle exceptions gracefully", "Improve performance", "Define functions", "Create loops"]'::jsonb, 'Handle exceptions gracefully', 2, 25),
  ('Which block always executes regardless of exception?', 'multiple_choice', '["finally", "except", "else", "try"]'::jsonb, 'finally', 2, 26),
  ('How do you raise a custom exception?', 'multiple_choice', '["raise CustomException()", "throw CustomException()", "error CustomException()", "exception CustomException()"]'::jsonb, 'raise CustomException()', 2, 27),
  
  -- Memory Management (3 questions)
  ('What is Python garbage collection based on?', 'multiple_choice', '["Reference counting", "Mark and sweep only", "Manual deallocation", "Stack allocation"]'::jsonb, 'Reference counting', 2, 28),
  ('What can cause memory leaks in Python?', 'multiple_choice', '["Circular references", "Using too many variables", "Long strings", "Multiple imports"]'::jsonb, 'Circular references', 2, 29),
  ('What is the purpose of __del__ method?', 'multiple_choice', '["Destructor called before object deletion", "Delete variables", "Remove files", "Clear memory"]'::jsonb, 'Destructor called before object deletion', 2, 30)
) AS questions(question_text, question_type, options, correct_answer, points, order_index);