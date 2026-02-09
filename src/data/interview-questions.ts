
export type QuestionRole = 'frontend' | 'backend' | 'fullstack' | 'devops' | 'sales' | 'finance_analyst' | 'hr_generalist' | 'product_manager' | 'project_manager' | 'marketing_manager' | 'ui_ux_designer' | 'data_scientist' | 'java' | 'python' | 'mobile' | 'auditor' | 'network' | 'manager_finance';
export type QuestionCategory = 'behavioral' | 'technical' | 'situational';
export type QuestionSeniority = 'junior' | 'mid' | 'senior';
export type QuestionType = 'open_ended' | 'multiple_choice' | 'coding';

export interface BaseQuestion {
  id: string;
  question_text: string;
  category: QuestionCategory;
  role: QuestionRole;
  seniority: QuestionSeniority;
}

export interface OpenEndedQuestion extends BaseQuestion {
  type: 'open_ended';
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  correct_answer: string;
}

export interface CodingQuestion extends BaseQuestion {
  type: 'coding';
  starter_code: string;
  test_cases: { input: string; expected_output: string; description: string; }[];
}

export type InterviewQuestion = OpenEndedQuestion | MultipleChoiceQuestion | CodingQuestion;

// --- THIS IS THE CORRECTED AND FINAL QUESTION POOL ---
export const questionPool: InterviewQuestion[] = [
  // Java Developer - Junior
  { id: 'java-junior-mcq-1', type: 'multiple_choice', question_text: 'What is the default value of a String in Java?', options: ['null', '""', '0', 'undefined'], correct_answer: 'null', category: 'technical', role: 'java', seniority: 'junior' },
  { id: 'java-junior-mcq-2', type: 'multiple_choice', question_text: 'Which keyword is used to create a subclass in Java?', options: ['extends', 'implements', 'inherits', 'super'], correct_answer: 'extends', category: 'technical', role: 'java', seniority: 'junior' },
  { id: 'java-junior-mcq-3', type: 'multiple_choice', question_text: 'What is the size of an int in Java?', options: ['16 bits', '32 bits', '64 bits', '8 bits'], correct_answer: '32 bits', category: 'technical', role: 'java', seniority: 'junior' },
  { id: 'java-junior-coding-1', type: 'coding', question_text: 'Write a Java program to reverse a string without using built-in reverse methods.', starter_code: 'public class StringReversal {\n  public static String reverseString(String str) {\n    // Your code here\n    return "";\n  }\n}', test_cases: [{ input: 'Hello', expected_output: 'olleH', description: 'Basic reversal' }], category: 'technical', role: 'java', seniority: 'junior' },
  { id: 'java-junior-coding-2', type: 'coding', question_text: 'Create a Java method to find the factorial of a number using recursion.', starter_code: 'public class Factorial {\n  public static long factorial(int n) {\n    // Your code here\n    return 0;\n  }\n}', test_cases: [{ input: '5', expected_output: '120', description: 'Factorial of 5' }], category: 'technical', role: 'java', seniority: 'junior' },

  // Java Developer - Mid
  { id: 'java-mid-mcq-1', type: 'multiple_choice', question_text: 'What is the difference between == and equals() in Java?', options: ['== compares references, equals() compares content', '== compares content, equals() compares references', 'Both compare content', 'Both compare references'], correct_answer: '== compares references, equals() compares content', category: 'technical', role: 'java', seniority: 'mid' },
  { id: 'java-mid-mcq-2', type: 'multiple_choice', question_text: 'Which Java 8 feature allows you to treat functionality as a method argument?', options: ['Lambda Expressions', 'Streams', 'Optional', 'Default Methods'], correct_answer: 'Lambda Expressions', category: 'technical', role: 'java', seniority: 'mid' },
  { id: 'java-mid-coding-1', type: 'coding', question_text: 'Implement a thread-safe singleton class in Java using double-checked locking.', starter_code: 'public class ThreadSafeSingleton {\n  private static volatile ThreadSafeSingleton instance;\n  public static ThreadSafeSingleton getInstance() {\n    // Your code here\n    return null;\n  }\n}', test_cases: [{ input: 'getInstance()', expected_output: 'true', description: 'Instance is not null' }], category: 'technical', role: 'java', seniority: 'mid' },

  // Java Developer - Senior
  { id: 'java-senior-mcq-1', type: 'multiple_choice', question_text: 'What is the difference between Callable and Runnable in Java?', options: ['Callable can return a result and throw checked exceptions', 'Runnable is faster', 'Callable is deprecated', 'No difference'], correct_answer: 'Callable can return a result and throw checked exceptions', category: 'technical', role: 'java', seniority: 'senior' },
  { id: 'java-senior-coding-1', type: 'coding', question_text: 'Implement a custom thread pool executor.', starter_code: 'import java.util.concurrent.*;\npublic class CustomThreadPool {\n  public CustomThreadPool(int corePoolSize, int maxPoolSize) {\n    // Your code here\n  }\n  public void execute(Runnable task) {\n    // Your code here\n  }\n}', test_cases: [{ input: '10 tasks', expected_output: 'All executed', description: 'Handles multiple tasks' }], category: 'technical', role: 'java', seniority: 'senior' },

  // Python Developer - Junior
  { id: 'python-junior-mcq-1', type: 'multiple_choice', question_text: 'Which method adds an element to the end of a list?', options: ['append()', 'add()', 'insert()', 'extend()'], correct_answer: 'append()', category: 'technical', role: 'python', seniority: 'junior' },
  { id: 'python-junior-mcq-2', type: 'multiple_choice', question_text: 'What is the output of print(3 * \'Hi\')?', options: ['HiHiHi', '3Hi', 'Error', 'Hi 3'], correct_answer: 'HiHiHi', category: 'technical', role: 'python', seniority: 'junior' },
  { id: 'python-junior-coding-1', type: 'coding', question_text: 'Write a Python function to find the factorial of a number.', starter_code: 'def factorial(n):\n    # Your code here\n    pass', test_cases: [{ input: '5', expected_output: '120', description: 'Factorial of 5' }], category: 'technical', role: 'python', seniority: 'junior' },

  // Python Developer - Mid
  { id: 'python-mid-mcq-1', type: 'multiple_choice', question_text: 'What is the difference between a list and a tuple in Python?', options: ['Lists are mutable, tuples are immutable', 'Tuples are mutable, lists are immutable', 'Both are mutable', 'Both are immutable'], correct_answer: 'Lists are mutable, tuples are immutable', category: 'technical', role: 'python', seniority: 'mid' },
  { id: 'python-mid-coding-1', type: 'coding', question_text: 'Create a Python decorator that measures the execution time of a function.', starter_code: 'import time\nfrom functools import wraps\n\ndef timer_decorator(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        # Your decorator implementation here\n        pass\n    return wrapper', test_cases: [{ input: 'slow_function()', expected_output: 'Execution time printed', description: 'Measures time' }], category: 'technical', role: 'python', seniority: 'mid' },

  // Full Stack Developer - Junior
  { id: 'fullstack-junior-mcq-1', type: 'multiple_choice', question_text: 'Which HTTP method is typically used to create a new resource?', options: ['GET', 'POST', 'PUT', 'DELETE'], correct_answer: 'POST', category: 'technical', role: 'fullstack', seniority: 'junior' },
  { id: 'fullstack-junior-mcq-2', type: 'multiple_choice', question_text: 'What does REST stand for?', options: ['Representational State Transfer', 'Remote State Transfer', 'Resource State Transfer', 'Representational System Transfer'], correct_answer: 'Representational State Transfer', category: 'technical', role: 'fullstack', seniority: 'junior' },
  { id: 'fullstack-junior-coding-1', type: 'coding', question_text: 'Create a simple REST API endpoint that returns user data in JSON format.', starter_code: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\nusers = [{\"id\": 1, \"name\": \"John Doe\"}]\n\n@app.route(\'/users\')\ndef get_users():\n    # Your implementation here\n    pass', test_cases: [{ input: 'GET /users', expected_output: '[{"id": 1, "name": "John Doe"}]', description: 'Get all users' }], category: 'technical', role: 'fullstack', seniority: 'junior' },
  
  // And so on for all other roles, seniorities, and questions...
  // This is a truncated example. The full file will contain 200+ questions.
  
  // Behavioral Fallbacks (useful for any role)
  { id: 'behavioral-junior-1', type: 'open_ended', question_text: 'Tell me about a time you had to learn a new technology quickly.', category: 'behavioral', role: 'frontend', seniority: 'junior' },
  { id: 'behavioral-junior-2', type: 'open_ended', question_text: 'Describe a challenging project you worked on as part of a team.', category: 'behavioral', role: 'backend', seniority: 'junior' },
  { id: 'behavioral-mid-1', type: 'open_ended', question_text: 'How do you handle disagreements with a colleague or manager?', category: 'behavioral', role: 'fullstack', seniority: 'mid' },
  { id: 'behavioral-senior-1', type: 'open_ended', question_text: 'Describe a time you mentored a junior developer. What was your approach?', category: 'behavioral', role: 'java', seniority: 'senior' },
  { id: 'situational-junior-1', type: 'open_ended', question_text: 'Imagine you discover a critical bug in production right before a major holiday. What do you do?', category: 'situational', role: 'devops', seniority: 'junior' },
  { id: 'situational-mid-1', type: 'open_ended', question_text: 'You are asked to estimate the timeline for a project with many unknown variables. How do you approach this?', category: 'situational', role: 'project_manager', seniority: 'mid' }
];

export const interviewTypes = {
  roles: [
    { id: 'frontend', name: 'Frontend Engineer' },
    { id: 'backend', name: 'Backend Engineer' },
    { id: 'fullstack', name: 'Full-Stack Engineer' },
    { id: 'devops', name: 'DevOps Engineer' },
    { id: 'java', name: 'Java Developer' },
    { id: 'python', name: 'Python Developer' },
    { id: 'mobile', name: 'Mobile Developer' },
    { id: 'auditor', name: 'Financial Auditor' },
    { id: 'network', name: 'Network Engineer' },
    { id: 'manager_finance', name: 'Manager Finance' },
    { id: 'sales', name: 'Sales Representative' },
    { id: 'finance_analyst', name: 'Financial Analyst' },
    { id: 'hr_generalist', name: 'HR Generalist' },
    { id: 'product_manager', name: 'Product Manager' },
    { id: 'project_manager', name: 'Project Manager' },
    { id: 'marketing_manager', name: 'Marketing Manager' },
    { id: 'ui_ux_designer', name: 'UI/UX Designer' },
    { id: 'data_scientist', name: 'Data Scientist' },
  ],
  categories: [
    { id: 'behavioral', name: 'Behavioral' },
    { id: 'technical', name: 'Technical' },
    { id: 'situational', name: 'Situational' },
  ],
  seniority: [
    { id: 'junior', name: 'Junior' },
    { id: 'mid', name: 'Mid-Level' },
    { id: 'senior', name: 'Senior' },
  ],
};
