-- Insert 6 Technical Assessments Part 1 (Android, Python, DevOps)

-- 1. ANDROID DEVELOPER TEST (25 MCQs, 40 minutes)
WITH new_assessment AS (
  INSERT INTO assessments (
    title, description, category, difficulty, duration_minutes, passing_score,
    timer_enabled, auto_submit_on_timeout, tab_switch_detection, max_tab_switches,
    face_detection_enabled, proctoring_enabled, is_published, created_by
  ) VALUES (
    'Android Developer Technical Test',
    'Comprehensive assessment covering Kotlin, Android lifecycle, RecyclerView, Room Database, Material Design, and Android Architecture Components.',
    'Mobile Development',
    'intermediate',
    40,
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
  -- Kotlin vs Java (4 questions)
  ('What is the main advantage of using Kotlin over Java for Android development?', 'multiple_choice', '["Null safety and concise syntax", "Faster compilation time", "Better backward compatibility", "Lower memory usage"]'::jsonb, 'Null safety and concise syntax', 2, 1),
  ('Which Kotlin feature eliminates NullPointerException?', 'multiple_choice', '["Extension functions", "Nullable and non-nullable types", "Data classes", "Coroutines"]'::jsonb, 'Nullable and non-nullable types', 2, 2),
  ('How do you declare a read-only list in Kotlin?', 'multiple_choice', '["val list = mutableListOf()", "val list = listOf()", "var list = listOf()", "const list = listOf()"]'::jsonb, 'val list = listOf()', 2, 3),
  ('What does the "companion object" in Kotlin replace from Java?', 'multiple_choice', '["Static methods and fields", "Abstract classes", "Interface default methods", "Inner classes"]'::jsonb, 'Static methods and fields', 2, 4),
  
  -- Android Activity Lifecycle (5 questions)
  ('Which method is called when an Activity is first created?', 'multiple_choice', '["onStart()", "onCreate()", "onResume()", "onRestart()"]'::jsonb, 'onCreate()', 2, 5),
  ('When is onPause() called in the Activity lifecycle?', 'multiple_choice', '["When activity is destroyed", "When activity is no longer visible", "When activity loses focus but is still visible", "When activity is first created"]'::jsonb, 'When activity loses focus but is still visible', 2, 6),
  ('Which method should you override to save temporary state data?', 'multiple_choice', '["onSaveInstanceState()", "onPause()", "onStop()", "onDestroy()"]'::jsonb, 'onSaveInstanceState()', 2, 7),
  ('What is the correct lifecycle order when rotating the device?', 'multiple_choice', '["onPause → onStop → onDestroy → onCreate → onStart → onResume", "onStop → onDestroy → onCreate → onResume", "onDestroy → onCreate → onStart", "onPause → onCreate → onResume"]'::jsonb, 'onPause → onStop → onDestroy → onCreate → onStart → onResume', 2, 8),
  ('When should you release heavy resources like camera or sensors?', 'multiple_choice', '["onPause()", "onStop()", "onDestroy()", "onCreate()"]'::jsonb, 'onPause()', 2, 9),
  
  -- RecyclerView & Adapters (4 questions)
  ('What is the purpose of ViewHolder pattern in RecyclerView?', 'multiple_choice', '["To improve scrolling performance by reusing views", "To handle click events", "To manage data binding", "To animate items"]'::jsonb, 'To improve scrolling performance by reusing views', 2, 10),
  ('Which method is called to bind data to a ViewHolder?', 'multiple_choice', '["onCreateViewHolder()", "onBindViewHolder()", "getItemCount()", "attachToRecyclerView()"]'::jsonb, 'onBindViewHolder()', 2, 11),
  ('How do you implement multiple view types in RecyclerView?', 'multiple_choice', '["Override getItemViewType() and handle types in onCreateViewHolder()", "Create separate RecyclerViews", "Use nested RecyclerViews", "Override onBindViewHolder() only"]'::jsonb, 'Override getItemViewType() and handle types in onCreateViewHolder()', 2, 12),
  ('What is DiffUtil used for in RecyclerView?', 'multiple_choice', '["Efficiently calculating differences between old and new lists", "Creating animations", "Handling click events", "Managing layout managers"]'::jsonb, 'Efficiently calculating differences between old and new lists', 2, 13),
  
  -- Room Database & SQLite (3 questions)
  ('What are the three main components of Room?', 'multiple_choice', '["Entity, DAO, Database", "Table, Query, Connection", "Model, Repository, Database", "Entity, Repository, ViewModel"]'::jsonb, 'Entity, DAO, Database', 2, 14),
  ('Which annotation is used to define a database entity in Room?', 'multiple_choice', '["@Entity", "@Table", "@DatabaseEntity", "@RoomEntity"]'::jsonb, '@Entity', 2, 15),
  ('How should database operations be performed in Room?', 'multiple_choice', '["On background thread or with coroutines", "On main UI thread", "In onCreate() method", "In onResume() method"]'::jsonb, 'On background thread or with coroutines', 2, 16),
  
  -- Material Design Components (3 questions)
  ('What is the purpose of CoordinatorLayout?', 'multiple_choice', '["Coordinate interactions between child views", "Display coordinates on screen", "Manage layout constraints", "Handle touch events"]'::jsonb, 'Coordinate interactions between child views', 2, 17),
  ('Which Material component is used for swipe-to-refresh?', 'multiple_choice', '["SwipeRefreshLayout", "RefreshLayout", "PullToRefresh", "MaterialRefresh"]'::jsonb, 'SwipeRefreshLayout', 2, 18),
  ('What is the recommended way to show brief messages to users?', 'multiple_choice', '["Snackbar", "Toast", "AlertDialog", "Notification"]'::jsonb, 'Snackbar', 2, 19),
  
  -- Android Architecture Components (3 questions)
  ('What is the main advantage of ViewModel?', 'multiple_choice', '["Survives configuration changes", "Handles network requests", "Manages database operations", "Creates UI layouts"]'::jsonb, 'Survives configuration changes', 2, 20),
  ('What is LiveData in Android Architecture Components?', 'multiple_choice', '["Observable data holder class that is lifecycle-aware", "Real-time database", "Live streaming service", "Background task manager"]'::jsonb, 'Observable data holder class that is lifecycle-aware', 2, 21),
  ('Which architecture pattern is recommended by Google for Android?', 'multiple_choice', '["MVVM (Model-View-ViewModel)", "MVC (Model-View-Controller)", "MVP (Model-View-Presenter)", "VIPER"]'::jsonb, 'MVVM (Model-View-ViewModel)', 2, 22),
  
  -- Gradle & Build System (3 questions)
  ('What is the purpose of build.gradle file?', 'multiple_choice', '["Configure build settings and dependencies", "Store application code", "Manage runtime permissions", "Handle user preferences"]'::jsonb, 'Configure build settings and dependencies', 2, 23),
  ('What is the difference between implementation and api in Gradle dependencies?', 'multiple_choice', '["implementation hides dependencies from consumers, api exposes them", "They are identical", "api is faster", "implementation is for production, api for testing"]'::jsonb, 'implementation hides dependencies from consumers, api exposes them', 2, 24),
  ('What are build variants in Android?', 'multiple_choice', '["Combinations of build types and product flavors", "Different Gradle versions", "Android SDK versions", "Testing frameworks"]'::jsonb, 'Combinations of build types and product flavors', 2, 25)
) AS questions(question_text, question_type, options, correct_answer, points, order_index);