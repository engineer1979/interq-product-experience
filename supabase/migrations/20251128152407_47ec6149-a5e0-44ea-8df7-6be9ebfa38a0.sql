-- Insert 7 Pre-built Assessments with Questions
-- Frontend Developer (React)
WITH frontend_assessment AS (
  INSERT INTO assessments (
    title, description, category, difficulty, duration_minutes, passing_score,
    created_by, is_published, timer_enabled, grace_period_minutes, auto_submit_on_timeout,
    proctoring_enabled, face_detection_enabled, tab_switch_detection, max_tab_switches
  ) VALUES (
    'Frontend Developer (React)',
    'Comprehensive React assessment covering hooks, Redux, component lifecycle, and modern frontend practices',
    'Software Development',
    'medium',
    45,
    70,
    '391dea46-f9cc-43cc-a253-ae56151e8993',
    true,
    true,
    5,
    true,
    true,
    true,
    true,
    3
  )
  RETURNING id
)
INSERT INTO assessment_questions (assessment_id, question_text, question_type, options, correct_answer, order_index, points)
SELECT 
  id,
  unnest(ARRAY[
    'What is the purpose of React Hooks?',
    'Which hook is used for side effects in React?',
    'What does the useState hook return?',
    'How do you optimize performance in React?',
    'What is the Virtual DOM in React?',
    'Which method is called before a component is removed from the DOM?',
    'What is prop drilling in React?',
    'How do you prevent unnecessary re-renders?',
    'What is the purpose of useEffect cleanup function?',
    'Which hook would you use to access context?',
    'What is React.memo used for?',
    'How do you handle forms in React?',
    'What is the difference between controlled and uncontrolled components?',
    'What is the purpose of keys in React lists?',
    'How do you handle errors in React components?',
    'What is Redux used for?',
    'What are Redux actions?',
    'What is a reducer in Redux?',
    'How do you connect React components to Redux?',
    'What is the purpose of middleware in Redux?'
  ]),
  'multiple_choice',
  unnest(ARRAY[
    '["To add state to functional components", "To replace class components", "To manage side effects", "All of the above"]'::jsonb,
    '["useState", "useEffect", "useContext", "useReducer"]'::jsonb,
    '["Current state and update function", "Only current state", "Only update function", "Previous and current state"]'::jsonb,
    '["Using React.memo", "Using useCallback", "Using useMemo", "All of the above"]'::jsonb,
    '["A lightweight copy of the real DOM", "A database", "A state management tool", "A routing library"]'::jsonb,
    '["componentWillUnmount", "componentDidMount", "componentDidUpdate", "render"]'::jsonb,
    '["Passing props through multiple levels", "Using Redux", "Using Context API", "Creating custom hooks"]'::jsonb,
    '["React.memo", "shouldComponentUpdate", "PureComponent", "All of the above"]'::jsonb,
    '["To clean up subscriptions and timers", "To cancel the effect", "To reset state", "To update dependencies"]'::jsonb,
    '["useContext", "useState", "useEffect", "useReducer"]'::jsonb,
    '["To memoize components", "To create contexts", "To manage state", "To handle side effects"]'::jsonb,
    '["Controlled components", "Uncontrolled components", "Form libraries", "All of the above"]'::jsonb,
    '["Controlled uses state, uncontrolled uses refs", "No difference", "Controlled is faster", "Uncontrolled uses state"]'::jsonb,
    '["To identify elements in lists", "To style components", "To pass props", "To manage state"]'::jsonb,
    '["Error boundaries", "try-catch", "componentDidCatch", "Both A and C"]'::jsonb,
    '["State management", "Routing", "Styling", "Testing"]'::jsonb,
    '["Objects describing state changes", "Functions that update state", "React components", "Database queries"]'::jsonb,
    '["A pure function that updates state", "A React component", "A middleware", "A store"]'::jsonb,
    '["Using connect() or hooks", "Direct import", "Props only", "Context API"]'::jsonb,
    '["To handle async actions", "To log actions", "To transform actions", "All of the above"]'::jsonb
  ]),
  unnest(ARRAY[
    'All of the above',
    'useEffect',
    'Current state and update function',
    'All of the above',
    'A lightweight copy of the real DOM',
    'componentWillUnmount',
    'Passing props through multiple levels',
    'All of the above',
    'To clean up subscriptions and timers',
    'useContext',
    'To memoize components',
    'All of the above',
    'Controlled uses state, uncontrolled uses refs',
    'To identify elements in lists',
    'Both A and C',
    'State management',
    'Objects describing state changes',
    'A pure function that updates state',
    'Using connect() or hooks',
    'All of the above'
  ]),
  generate_series(1, 20),
  5
FROM frontend_assessment;