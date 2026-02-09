// Comprehensive Interview Questions Database - Extended Version
export const interviewQuestionsDatabase = {
  "Java Developer": {
    easy: {
      mcqs: [
        {
          question_text: "What is the default value of a String in Java?",
          options: ["null", "\"\"", "0", "undefined"],
          correct_answer: "null",
          points: 10
        },
        {
          question_text: "Which keyword is used to create a subclass in Java?",
          options: ["extends", "implements", "inherits", "super"],
          correct_answer: "extends",
          points: 10
        },
        {
          question_text: "What is the size of an int in Java?",
          options: ["16 bits", "32 bits", "64 bits", "8 bits"],
          correct_answer: "32 bits",
          points: 10
        },
        {
          question_text: "Which method is used to start a thread in Java?",
          options: ["run()", "start()", "execute()", "begin()"],
          correct_answer: "start()",
          points: 10
        },
        {
          question_text: "What is the default value of a boolean in Java?",
          options: ["true", "false", "null", "0"],
          correct_answer: "false",
          points: 10
        },
        {
          question_text: "Which collection class is synchronized?",
          options: ["ArrayList", "HashMap", "Vector", "HashSet"],
          correct_answer: "Vector",
          points: 10
        },
        {
          question_text: "What does JVM stand for?",
          options: ["Java Virtual Machine", "Java Virtual Memory", "Java Variable Machine", "Java Visual Machine"],
          correct_answer: "Java Virtual Machine",
          points: 10
        },
        {
          question_text: "Which access modifier provides the most restrictive access?",
          options: ["public", "protected", "private", "default"],
          correct_answer: "private",
          points: 10
        },
        {
          question_text: "What is the parent class of all classes in Java?",
          options: ["Class", "Object", "Main", "System"],
          correct_answer: "Object",
          points: 10
        },
        {
          question_text: "Which keyword is used to handle exceptions?",
          options: ["catch", "try", "exception", "handle"],
          correct_answer: "try",
          points: 10
        }
      ],
      coding: [
        {
          question_text: "Write a Java program to reverse a string without using built-in reverse methods.",
          starter_code: "public class StringReversal {\n  public static String reverseString(String str) {\n    // Your code here\n    return \"\";\n  }\n  \n  public static void main(String[] args) {\n    System.out.println(reverseString(\"Hello World\"));\n  }\n}",
          test_cases: [
            { input: "Hello", expected_output: "olleH", description: "Basic string reversal" },
            { input: "Java", expected_output: "avaJ", description: "Java word reversal" },
            { input: "", expected_output: "", description: "Empty string" }
          ],
          time_limit_minutes: 15,
          language_options: ["java"],
          points: 20
        },
        {
          question_text: "Create a Java method to find the factorial of a number using recursion.",
          starter_code: "public class Factorial {\n  public static long factorial(int n) {\n    // Your recursive code here\n    return 0;\n  }\n  \n  public static void main(String[] args) {\n    System.out.println(factorial(5));\n  }\n}",
          test_cases: [
            { input: "5", expected_output: "120", description: "Factorial of 5" },
            { input: "0", expected_output: "1", description: "Factorial of 0" },
            { input: "3", expected_output: "6", description: "Factorial of 3" }
          ],
          time_limit_minutes: 15,
          language_options: ["java"],
          points: 20
        }
      ]
    },
    medium: {
      mcqs: [
        {
          question_text: "What is the difference between == and equals() in Java?",
          options: ["== compares references, equals() compares content", "== compares content, equals() compares references", "Both compare content", "Both compare references"],
          correct_answer: "== compares references, equals() compares content",
          points: 15
        },
        {
          question_text: "Which design pattern is used to create objects without specifying the exact class?",
          options: ["Factory Pattern", "Singleton Pattern", "Observer Pattern", "Decorator Pattern"],
          correct_answer: "Factory Pattern",
          points: 15
        },
        {
          question_text: "What is the purpose of the synchronized keyword?",
          options: ["To prevent method overriding", "To ensure thread safety", "To improve performance", "To handle exceptions"],
          correct_answer: "To ensure thread safety",
          points: 15
        },
        {
          question_text: "Which Java 8 feature allows you to treat functionality as a method argument?",
          options: ["Lambda Expressions", "Streams", "Optional", "Default Methods"],
          correct_answer: "Lambda Expressions",
          points: 15
        },
        {
          question_text: "What is the difference between HashMap and ConcurrentHashMap?",
          options: ["ConcurrentHashMap is thread-safe", "HashMap is faster", "HashMap allows null keys", "All of the above"],
          correct_answer: "All of the above",
          points: 15
        }
      ],
      coding: [
        {
          question_text: "Implement a thread-safe singleton class in Java using double-checked locking.",
          starter_code: "public class ThreadSafeSingleton {\n  private static volatile ThreadSafeSingleton instance;\n  \n  private ThreadSafeSingleton() {}\n  \n  public static ThreadSafeSingleton getInstance() {\n    // Your thread-safe implementation here\n    return null;\n  }\n  \n  public static void main(String[] args) {\n    // Test your implementation\n    ThreadSafeSingleton singleton = ThreadSafeSingleton.getInstance();\n    System.out.println(singleton != null ? \"Success\" : \"Failed\");\n  }\n}",
          test_cases: [
            { input: "", expected_output: "Success", description: "Singleton instance creation" },
            { input: "", expected_output: "Same instance", description: "Multiple calls return same instance" }
          ],
          time_limit_minutes: 25,
          language_options: ["java"],
          points: 30
        },
        {
          question_text: "Create a Java program to implement a custom ArrayList with basic operations.",
          starter_code: "public class CustomArrayList<T> {\n  private static final int DEFAULT_CAPACITY = 10;\n  private Object[] elements;\n  private int size;\n  \n  public CustomArrayList() {\n    // Initialize your custom ArrayList\n  }\n  \n  public void add(T element) {\n    // Your add implementation\n  }\n  \n  public T get(int index) {\n    // Your get implementation\n    return null;\n  }\n  \n  public int size() {\n    return size;\n  }\n  \n  public static void main(String[] args) {\n    CustomArrayList<Integer> list = new CustomArrayList<>();\n    list.add(1);\n    list.add(2);\n    list.add(3);\n    System.out.println(\"Size: \" + list.size());\n    System.out.println(\"Element at 1: \" + list.get(1));\n  }\n}",
          test_cases: [
            { input: "add 1,2,3", expected_output: "Size: 3", description: "Add multiple elements" },
            { input: "get 1", expected_output: "Element at 1: 2", description: "Get element by index" }
          ],
          time_limit_minutes: 30,
          language_options: ["java"],
          points: 35
        }
      ]
    },
    hard: {
      mcqs: [
        {
          question_text: "What is the difference between Callable and Runnable in Java?",
          options: ["Callable can return a result and throw checked exceptions", "Runnable is faster", "Callable is deprecated", "No difference"],
          correct_answer: "Callable can return a result and throw checked exceptions",
          points: 20
        },
        {
          question_text: "Which garbage collection algorithm is used by default in modern JVMs?",
          options: ["G1 (Garbage First)", "Parallel GC", "Serial GC", "CMS"],
          correct_answer: "G1 (Garbage First)",
          points: 20
        },
        {
          question_text: "What is the happens-before relationship in Java concurrency?",
          options: ["Guarantees memory visibility", "Ensures thread priority", "Handles exceptions", "Manages garbage collection"],
          correct_answer: "Guarantees memory visibility",
          points: 20n        }
      ],
      coding: [
        {
          question_text: "Implement a custom thread pool executor with core pool size, maximum pool size, and work queue.",
          starter_code: "import java.util.concurrent.*;\nimport java.util.*;\n\npublic class CustomThreadPool {\n  private final int corePoolSize;\n  private final int maxPoolSize;\n  private final BlockingQueue<Runnable> workQueue;\n  private final List<WorkerThread> workers;\n  \n  public CustomThreadPool(int corePoolSize, int maxPoolSize, int queueCapacity) {\n    // Initialize your thread pool\n  }\n  \n  public void execute(Runnable task) {\n    // Your execution logic\n  }\n  \n  public void shutdown() {\n    // Your shutdown logic\n  }\n  \n  private class WorkerThread extends Thread {\n    // Implement worker thread\n  }\n  \n  public static void main(String[] args) {\n    CustomThreadPool pool = new CustomThreadPool(2, 4, 10);\n    for (int i = 0; i < 10; i++) {\n      final int taskId = i;\n      pool.execute(() -> {\n        System.out.println(\"Task \" + taskId + \" executed by \" + Thread.currentThread().getName());\n      });\n    }\n    pool.shutdown();\n  }\n}",
          test_cases: [
            { input: "10 tasks", expected_output: "All tasks executed", description: "Thread pool executes all tasks" },
            { input: "shutdown", expected_output: "Pool shutdown successfully", description: "Graceful shutdown" }
          ],
          time_limit_minutes: 45,
          language_options: ["java"],
          points: 50
        }
      ]
    }
  },
  "Python Developer": {
    easy: {
      mcqs: [
        {
          question_text: "What is the correct way to create a list in Python?",
          options: ["list = []", "list = ()", "list = {}", "list = \"\""],
          correct_answer: "list = []",
          points: 10
        },
        {
          question_text: "Which method is used to add an element to the end of a list?",
          options: ["append()", "add()", "insert()", "extend()"],
          correct_answer: "append()",
          points: 10
        },
        {
          question_text: "What is the output of print(3 * 'Hi')?",
          options: ["HiHiHi", "3Hi", "Error", "Hi 3"],
          correct_answer: "HiHiHi",
          points: 10
        },
        {
          question_text: "Which keyword is used to define a function in Python?",
          options: ["function", "def", "define", "func"],
          correct_answer: "def",
          points: 10
        },
        {
          question_text: "What is the correct way to open a file for reading?",
          options: ["open('file.txt', 'r')", "open('file.txt', 'w')", "open('file.txt')", "Both A and C"],
          correct_answer: "Both A and C",
          points: 10
        }
      ],
      coding: [
        {
          question_text: "Write a Python function to find the factorial of a number.",
          starter_code: "def factorial(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(factorial(5))",
          test_cases: [
            { input: "5", expected_output: "120", description: "Factorial of 5" },
            { input: "0", expected_output: "1", description: "Factorial of 0" }
          ],
          time_limit_minutes: 15,
          language_options: ["python"],
          points: 20
        }
      ]
    },
    medium: {
      mcqs: [
        {
          question_text: "What is the difference between a list and a tuple in Python?",
          options: ["Lists are mutable, tuples are immutable", "Tuples are mutable, lists are immutable", "Both are mutable", "Both are immutable"],
          correct_answer: "Lists are mutable, tuples are immutable",
          points: 15
        },
        {
          question_text: "Which method is used to remove whitespace from the beginning and end of a string?",
          options: ["strip()", "trim()", "clean()", "remove()"],
          correct_answer: "strip()",
          points: 15
        }
      ],
      coding: [
        {
          question_text: "Create a Python decorator that measures the execution time of a function.",
          starter_code: "import time\nfrom functools import wraps\n\ndef timer_decorator(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        # Your decorator implementation here\n        pass\n    return wrapper\n\n@timer_decorator\ndef slow_function():\n    time.sleep(1)\n    return \"Done\"\n\nprint(slow_function())",
          test_cases: [
            { input: "slow_function()", expected_output: "Execution time and result", description: "Decorator measures execution time" }
          ],
          time_limit_minutes: 25,
          language_options: ["python"],
          points: 30
        }
      ]
    }
  },
  "Full Stack Developer": {
    easy: {
      mcqs: [
        {
          question_text: "Which HTTP method is typically used to create a new resource?",
          options: ["GET", "POST", "PUT", "DELETE"],
          correct_answer: "POST",
          points: 10
        },
        {
          question_text: "What does REST stand for?",
          options: ["Representational State Transfer", "Remote State Transfer", "Resource State Transfer", "Representational System Transfer"],
          correct_answer: "Representational State Transfer",
          points: 10
        },
        {
          question_text: "Which of these is a NoSQL database?",
          options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
          correct_answer: "MongoDB",
          points: 10
        },
        {
          question_text: "What is the purpose of CORS?",
          options: ["Cross-origin resource sharing", "Database connection", "CSS styling", "JavaScript execution"],
          correct_answer: "Cross-origin resource sharing",
          points: 10
        },
        {
          question_text: "Which status code indicates a successful request?",
          options: ["200", "404", "500", "302"],
          correct_answer: "200",
          points: 10
        }
      ],
      coding: [
        {
          question_text: "Create a simple REST API endpoint that returns user data in JSON format.",
          starter_code: "from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n# Sample user data\nusers = [\n    {\"id\": 1, \"name\": \"John Doe\", \"email\": \"john@example.com\"},\n    {\"id\": 2, \"name\": \"Jane Smith\", \"email\": \"jane@example.com\"}\n]\n\n@app.route('/users')\ndef get_users():\n    # Your implementation here\n    pass\n\n@app.route('/users/<int:user_id>')\ndef get_user(user_id):\n    # Your implementation here\n    pass\n\nif __name__ == '__main__':\n    app.run(debug=True)",
          test_cases: [
            { input: "GET /users", expected_output: "List of all users", description: "Get all users endpoint" },
            { input: "GET /users/1", expected_output: "Single user data", description: "Get specific user endpoint" }
          ],
          time_limit_minutes: 20,
          language_options: ["python"],
          points: 25
        }
      ]
    },
    medium: {
      mcqs: [
        {
          question_text: "What is the purpose of JWT (JSON Web Token)?",
          options: ["Authentication and authorization", "Database queries", "CSS styling", "HTML rendering"],
          correct_answer: "Authentication and authorization",
          points: 15
        },
        {
          question_text: "Which of these is a common frontend framework?",
          options: ["React", "Express", "Django", "Flask"],
          correct_answer: "React",
          points: 15
        },
        {
          question_text: "What is SQL injection?",
          options: ["A security vulnerability", "A database feature", "A programming language", "A web framework"],
          correct_answer: "A security vulnerability",
          points: 15n        }
      ],
      coding: [
        {
          question_text: "Create a full-stack application with user authentication using JWT.",
          starter_code: "// Backend (Node.js/Express)\nconst express = require('express');\nconst jwt = require('jsonwebtoken');\nconst bcrypt = require('bcrypt');\n\nconst app = express();\napp.use(express.json());\n\nconst users = [];\nconst JWT_SECRET = 'your-secret-key';\n\n// Register endpoint\napp.post('/register', async (req, res) => {\n  // Your implementation here\n});\n\n// Login endpoint\napp.post('/login', async (req, res) => {\n  // Your implementation here\n});\n\n// Protected route\napp.get('/profile', (req, res) => {\n  // Your implementation here\n});\n\napp.listen(3000, () => console.log('Server running on port 3000'));",
          test_cases: [
            { input: "POST /register with user data", expected_output: "User created successfully", description: "User registration" },
            { input: "POST /login with credentials", expected_output: "JWT token returned", description: "User login with JWT" },
            { input: "GET /profile with valid token", expected_output: "User profile data", description: "Access protected route" }
          ],
          time_limit_minutes: 35,
          language_options: ["javascript"],
          points: 40
        }
      ]
    }
  },
  "Backend Developer": {
    easy: {
      mcqs: [
        {
          question_text: "Which HTTP method is idempotent?",
          options: ["GET", "POST", "PATCH", "CONNECT"],
          correct_answer: "GET",
          points: 10
        },
        {
          question_text: "What is the primary key in a database?",
          options: ["A unique identifier for records", "A foreign key", "An index", "A data type"],
          correct_answer: "A unique identifier for records",
          points: 10
        },
        {
          question_text: "Which of these is a RESTful API design principle?",
          options: ["Stateless communication", "Stateful sessions", "SOAP protocol", "XML only"],
          correct_answer: "Stateless communication",
          points: 10
        },
        {
          question_text: "What does ACID stand for in database transactions?",
          options: ["Atomicity, Consistency, Isolation, Durability", "Advanced, Consistent, Isolated, Durable", "Atomic, Complete, Isolated, Durable", "All, Consistent, Isolated, Durable"],
          correct_answer: "Atomicity, Consistency, Isolation, Durability",
          points: 10
        },
        {
          question_text: "Which database operation is used to retrieve data?",
          options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
          correct_answer: "SELECT",
          points: 10
        }
      ],
      coding: [
        {
          question_text: "Create a Node.js API endpoint that connects to a database and retrieves user data.",
          starter_code: "const express = require('express');\nconst mysql = require('mysql2');\n\nconst app = express();\nconst port = 3000;\n\n// Database connection\nconst db = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'users_db'\n});\n\n// Your API endpoint here\napp.get('/api/users', (req, res) => {\n  // Implement database query\n});\n\napp.listen(port, () => {\n  console.log(`Server running on port ${port}`);\n});",
          test_cases: [
            { input: "GET /api/users", expected_output: "List of users from database", description: "Database connection and data retrieval" }
          ],
          time_limit_minutes: 25,
          language_options: ["javascript"],
          points: 30
        }
      ]
    },
    medium: {
      mcqs: [
        {
          question_text: "What is database normalization?",
          options: ["Organizing data to reduce redundancy", "Adding more tables", "Making queries faster", "Storing more data"],
          correct_answer: "Organizing data to reduce redundancy",
          points: 15
        },
        {
          question_text: "Which of these is a NoSQL database type?",
          options: ["Document-based", "Relational", "Tabular", "Structured"],
          correct_answer: "Document-based",
          points: 15
        },
        {
          question_text: "What is the purpose of connection pooling?",
          options: ["Reuse database connections", "Create more connections", "Close all connections", "Slow down queries"],
          correct_answer: "Reuse database connections",
          points: 15n        }
      ],
      coding: [
        {
          question_text: "Implement a rate limiting middleware for an API using the token bucket algorithm.",
          starter_code: "const express = require('express');\n\nclass RateLimiter {\n  constructor(capacity, refillRate) {\n    this.capacity = capacity;\n    this.tokens = capacity;\n    this.refillRate = refillRate;\n    this.lastRefill = Date.now();\n  }\n  \n  allowRequest() {\n    // Your implementation here\n    return false;\n  }\n  \n  refillTokens() {\n    // Your implementation here\n  }\n}\n\n// Middleware\nfunction rateLimitMiddleware(req, res, next) {\n  // Your middleware implementation\n}\n\nconst app = express();\napp.use(rateLimitMiddleware);\n\napp.get('/api/data', (req, res) => {\n  res.json({ message: 'Request allowed' });\n});\n\napp.listen(3000);",
          test_cases: [
            { input: "Requests within limit", expected_output: "200 OK", description: "Allow requests within rate limit" },
            { input: "Requests exceeding limit", expected_output: "429 Too Many Requests", description: "Block requests exceeding rate limit" }
          ],
          time_limit_minutes: 35,
          language_options: ["javascript"],
          points: 40
        }
      ]
    }
  },
  "Mobile Developer": {
    easy: {
      mcqs: [
        {
          question_text: "Which programming language is primarily used for native iOS development?",
          options: ["Swift", "Java", "Kotlin", "C#"],
          correct_answer: "Swift",
          points: 10
        },
        {
          question_text: "What is the main programming language for native Android development?",
          options: ["Java/Kotlin", "Swift", "JavaScript", "Python"],
          correct_answer: "Java/Kotlin",
          points: 10
        },
        {
          question_text: "What is a cross-platform mobile development framework?",
          options: ["React Native", "jQuery", "Bootstrap", "Angular"],
          correct_answer: "React Native",
          points: 10
        },
        {
          question_text: "What is the purpose of the Android Manifest file?",
          options: ["Declare app components and permissions", "Store user data", "Define UI layouts", "Handle network requests"],
          correct_answer: "Declare app components and permissions",
          points: 10
        },
        {
          question_text: "Which component is used to display a list of items in Android?",
          options: ["RecyclerView", "TextView", "Button", "EditText"],
          correct_answer: "RecyclerView",
          points: 10n        }
      ],
      coding: [
        {
          question_text: "Create a simple Flutter app with a counter that increments when a button is pressed.",
          starter_code: "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Counter App',\n      home: CounterPage(),\n    );\n  }\n}\n\nclass CounterPage extends StatefulWidget {\n  @override\n  _CounterPageState createState() => _CounterPageState();\n}\n\nclass _CounterPageState extends State<CounterPage> {\n  int _counter = 0;\n  \n  void _incrementCounter() {\n    // Your implementation here\n  }\n  \n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: Text('Counter App'),\n      ),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: <Widget>[\n            Text('Counter: $_counter'),\n            ElevatedButton(\n              onPressed: _incrementCounter,\n              child: Text('Increment'),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}",
          test_cases: [
            { input: "Button press", expected_output: "Counter increments", description: "Counter increments on button press" },
            { input: "Multiple presses", expected_output: "Counter increases accordingly", description: "Multiple button presses" }
          ],
          time_limit_minutes: 20,
          language_options: ["dart"],
          points: 25n        }
      ]
    },
    medium: {
      mcqs: [
        {
          question_text: "What is the purpose of the ViewModel in Android MVVM architecture?",
          options: ["Manage UI-related data", "Handle network requests", "Store user preferences", "Manage database operations"],
          correct_answer: "Manage UI-related data",
          points: 15
        },
        {
          question_text: "Which component handles navigation between screens in React Native?",
          options: ["React Navigation", "React Router", "React Native Router", "Navigation Controller"],
          correct_answer: "React Navigation",
          points: 15n        },
        {
          question_text: "What is the purpose of AsyncStorage in React Native?",
          options: ["Persistent key-value storage", "Network requests", "Image caching", "Database operations"],
          correct_answer: "Persistent key-value storage",
          points: 15n        }
      ],
      coding: [
        {
          question_text: "Implement a native Android app with a RecyclerView that displays a list of items with click handling.",
          starter_code: "// MainActivity.kt\npackage com.example.recyclerviewapp\n\nimport android.os.Bundle\nimport androidx.appcompat.app.AppCompatActivity\nimport androidx.recyclerview.widget.LinearLayoutManager\nimport androidx.recyclerview.widget.RecyclerView\n\nclass MainActivity : AppCompatActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContentView(R.layout.activity_main)\n        \n        val recyclerView = findViewById<RecyclerView>(R.id.recyclerView)\n        val items = listOf(\"Item 1\", \"Item 2\", \"Item 3\", \"Item 4\", \"Item 5\")\n        \n        // Your RecyclerView setup here\n    }\n}\n\n// ItemAdapter.kt\npackage com.example.recyclerviewapp\n\nimport android.view.LayoutInflater\nimport android.view.View\nimport android.view.ViewGroup\nimport android.widget.TextView\nimport androidx.recyclerview.widget.RecyclerView\n\nclass ItemAdapter(private val items: List<String>) : RecyclerView.Adapter<ItemAdapter.ItemViewHolder>() {\n    \n    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {\n        val textView: TextView = itemView.findViewById(R.id.itemText)\n    }\n    \n    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {\n        // Your implementation here\n        return ItemViewHolder(view)\n    }\n    \n    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {\n        // Your implementation here\n    }\n    \n    override fun getItemCount(): Int = items.size\n}",
          test_cases: [
            { input: "App launch", expected_output: "RecyclerView displays items", description: "RecyclerView setup and display" },
            { input: "Item click", expected_output: "Click handled appropriately", description: "Item click handling" }
          ],
          time_limit_minutes: 35,
          language_options: ["kotlin"],
          points: 40n        }
      ]
    }
  },
  "Financial Auditor": {
    easy: {
      mcqs: [
        {
          question_text: "What is the primary purpose of a financial audit?",
          options: ["To provide assurance on financial statements", "To prepare tax returns", "To manage investments", "To create budgets"],
          correct_answer: "To provide assurance on financial statements",
          points: 10
        },
        {
          question_text: "Which accounting principle requires expenses to be matched with related revenues?",
          options: ["Matching principle", "Revenue recognition principle", "Cost principle", "Consistency principle"],
          correct_answer: "Matching principle",
          points: 10
        },
        {
          question_text: "What does GAAP stand for?",
          options: ["Generally Accepted Accounting Principles", "Global Accounting and Auditing Practices", "Government Accounting and Auditing Procedures", "General Accounting and Auditing Principles"],
          correct_answer: "Generally Accepted Accounting Principles",
          points: 10
        },
        {
          question_text: "Which financial statement shows a company's financial position at a specific date?",
          options: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "Statement of Retained Earnings"],
          correct_answer: "Balance Sheet",
          points: 10
        },
        {
          question_text: "What is the accounting equation?",
          options: ["Assets = Liabilities + Equity", "Revenue - Expenses = Net Income", "Assets - Liabilities = Equity", "Both A and C"],
          correct_answer: "Both A and C",
          points: 10n        }
      ],
      coding: [
        {
          question_text: "Create a Python script to calculate financial ratios from a balance sheet.",
          starter_code: "def calculate_financial_ratios(assets, liabilities, equity, revenue, expenses):\n    \"\"\"\n    Calculate key financial ratios\n    \"\"\"\n    ratios = {}\n    \n    # Current ratio = Current Assets / Current Liabilities\n    # Your implementation here\n    \n    # Debt-to-equity ratio = Total Liabilities / Total Equity\n    # Your implementation here\n    \n    # Return on equity = Net Income / Average Shareholders' Equity\n    # Your implementation here\n    \n    return ratios\n\n# Sample financial data\ndata = {\n    'revenue': 1000000,\n    'gross_profit': 400000,\n    'current_assets': 500000,\n    'current_liabilities': 300000,\n    'total_assets': 2000000,\n    'net_income': 150000\n}\n\nratios = calculate_financial_ratios(data)\nprint(\"Financial Ratios Analysis:\")\nfor ratio, value in ratios.items():\n    print(f\"{ratio}: {value:.2f}\")",
          test_cases: [
            { input: "Sample financial data", expected_output: "Ratios calculated", description: "Calculate financial ratios" },
            { input: "Zero values", expected_output: "Handle edge cases", description: "Handle zero and negative values" }
          ],
          time_limit_minutes: 25,
          language_options: ["python"],
          points: 30n        }
      ]
    },
    medium: {
      mcqs: [
        {
          question_text: "What is materiality in auditing?",
          options: ["The significance of an omission or misstatement", "The physical weight of documents", "The cost of audit procedures", "The time taken for audit"],
          correct_answer: "The significance of an omission or misstatement",
          points: 15
        },
        {
          question_text: "Which audit opinion indicates that financial statements are fairly presented?",
          options: ["Unqualified opinion", "Qualified opinion", "Adverse opinion", "Disclaimer of opinion"],
          correct_answer: "Unqualified opinion",
          points: 15n        },
        {
          question_text: "What is the purpose of analytical procedures in auditing?",
          options: ["Identify unusual trends and relationships", "Prepare financial statements", "Calculate taxes", "Manage client relationships"],
          correct_answer: "Identify unusual trends and relationships",
          points: 15n        }
      ],
      coding: [
        {
          question_text: "Implement a comprehensive financial planning and budgeting system in Python.",
          starter_code: "import numpy as np\nimport pandas as pd\nfrom datetime import datetime, timedelta\n\nclass FinancialPlanner:\n    def __init__(self, initial_budget, planning_horizon_months):\n        self.initial_budget = initial_budget\n        self.planning_horizon = planning_horizon_months\n        self.monthly_data = []\n    \n    def add_monthly_projection(self, month, revenue, expenses, capital_expenditure=0):\n        \"\"\"Add monthly financial projection\"\"\"\n        # Your implementation here\n        pass\n    \n    def calculate_cash_flow_forecast(self):\n        \"\"\"Calculate rolling cash flow forecast\"\"\"\n        # Your implementation here\n        pass\n    \n    def variance_analysis(self, actual_data):\n        \"\"\"Compare actual vs. budgeted performance\"\"\"\n        # Your implementation here\n        pass\n    \n    def generate_financial_report(self):\n        \"\"\"Generate comprehensive financial planning report\"\"\"\n        # Your implementation here\n        pass\n\n# Test the financial planner\nplanner = FinancialPlanner(initial_budget=100000, planning_horizon_months=12)\n\n# Add monthly projections\nfor month in range(1, 13):\n    revenue = 50000 + (month * 2000)  # Growing revenue\n    expenses = 35000 + (month * 1000)  # Growing expenses\n    planner.add_monthly_projection(month, revenue, expenses)\n\ncash_flow_forecast = planner.calculate_cash_flow_forecast()\nprint(\"12-Month Cash Flow Forecast:\")\nprint(cash_flow_forecast)",
          test_cases: [
            { input: "Monthly projections", expected_output: "Cash flow forecast", description: "Generate cash flow forecast" },
            { input: "Variance analysis", expected_output: "Budget vs. actual comparison", description: "Perform variance analysis" },
            { input: "Financial report", expected_output: "Comprehensive report", description: "Generate financial report" }
          ],
          time_limit_minutes: 45,
          language_options: ["python"],
          points: 50n        }
      ]
    }
  },
  "DevOps Engineer": {
    easy: {
      mcqs: [
        {
          question_text: "What is the primary goal of DevOps?",
          options: ["Bridge development and operations", "Write more code", "Increase server costs", "Create more documentation"],
          correct_answer: "Bridge development and operations",
          points: 10
        },
        {
          question_text: "Which tool is used for containerization?",
          options: ["Docker", "Git", "Jenkins", "Ansible"],
          correct_answer: "Docker",
          points: 10
        },
        {
          question_text: "What is CI/CD?",
          options: ["Continuous Integration/Continuous Deployment", "Code Integration/Code Deployment", "Continuous Improvement/Continuous Development", "Code Improvement/Code Development"],
          correct_answer: "Continuous Integration/Continuous Deployment",
          points: 10
        },
        {
          question_text: "Which version control system is most commonly used?",
          options: ["Git", "SVN", "Mercurial", "CVS"],
          correct_answer: "Git",
          points: 10
        },
        {
          question_text: "What is Infrastructure as Code (IaC)?",
          options: ["Managing infrastructure through code", "Writing infrastructure documentation", "Manual server configuration", "Network programming"],
          correct_answer: "Managing infrastructure through code",
          points: 10n        }
      ],
      coding: [
        {
          question_text: "Create a simple Dockerfile for a Node.js application.",
          starter_code: "# Use official Node.js runtime as base image\nFROM node:14\n\n# Set working directory\nWORKDIR /app\n\n# Copy package.json and package-lock.json\nCOPY package*.json ./\n\n# Your Dockerfile implementation here\n\n# Expose port\nEXPOSE 3000\n\n# Start the application\nCMD [\"npm\", \"start\"]",
          test_cases: [
            { input: "docker build", expected_output: "Docker image built successfully", description: "Docker image builds without errors" },
            { input: "docker run", expected_output: "Application runs in container", description: "Container runs application" }
          ],
          time_limit_minutes: 20,
          language_options: ["dockerfile"],
          points: 25n        }
      ]
    },
    medium: {
      mcqs: [
        {
          question_text: "What is the purpose of Kubernetes?",
          options: ["Container orchestration", "Code compilation", "Database management", "Network routing"],
          correct_answer: "Container orchestration",
          points: 15
        },
        {
          question_text: "Which tool is commonly used for infrastructure provisioning?",
          options: ["Terraform", "Docker", "Git", "Jenkins"],
          correct_answer: "Terraform",
          points: 15n        },
        {
          question_text: "What is blue-green deployment?",
          options: ["A deployment strategy with two identical environments", "A color-coded deployment system", "A deployment with rollback capability", "A deployment to cloud providers"],
          correct_answer: "A deployment strategy with two identical environments",
          points: 15n        }
      ],
      coding: [
        {
          question_text: "Create a GitHub Actions workflow for automated testing and deployment.",
          starter_code: "name: CI/CD Pipeline\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    \n    steps:\n    - uses: actions/checkout@v2\n    \n    # Your workflow implementation here\n    \n  deploy:\n    needs: test\n    runs-on: ubuntu-latest\n    if: github.ref == 'refs/heads/main'\n    \n    steps:\n    - uses: actions/checkout@v2\n    \n    # Your deployment implementation here",
          test_cases: [
            { input: "Push to main branch", expected_output: "Tests run and pass", description: "Automated testing on push" },
            { input: "PR to main branch", expected_output: "Tests run on PR", description: "Automated testing on PR" },
            { input: "Successful tests", expected_output: "Deployment triggered", description: "Deployment after successful tests" }
          ],
          time_limit_minutes: 35,
          language_options: ["yaml"],
          points: 40n        }
      ]
    }
  },
  "Network Engineer": {
    easy: {
      mcqs: [
        {
          question_text: "What is the purpose of the OSI model?",
          options: ["Standardize network communication", "Create network protocols", "Design hardware", "Manage IP addresses"],
          correct_answer: "Standardize network communication",
          points: 10
        },
        {
          question_text: "Which layer of the OSI model handles routing?",
          options: ["Network Layer", "Transport Layer", "Data Link Layer", "Physical Layer"],
          correct_answer: "Network Layer",
          points: 10
        },
        {
          question_text: "What is the default subnet mask for a Class C IP address?",
          options: ["255.255.255.0", "255.255.0.0", "255.0.0.0", "255.255.255.255"],
          correct_answer: "255.255.255.0",
          points: 10
        },
        {
          question_text: "Which protocol is used for reliable data transmission?",
          options: ["TCP", "UDP", "IP", "ICMP"],
          correct_answer: "TCP",
          points: 10
        },
        {
          question_text: "What is the purpose of DNS?",
          options: ["Translate domain names to IP addresses", "Route network traffic", "Encrypt data", "Manage network devices"],
          correct_answer: "Translate domain names to IP addresses",
          points: 10n        }
      ],
      coding: [
        {
          question_text: "Create a Python script to perform basic network connectivity tests.",
          starter_code: "import socket\nimport subprocess\nimport platform\n\ndef test_port_connectivity(host, port):\n    \"\"\"Test if a port is open on a remote host\"\"\"\n    # Your implementation here\n    pass\n\ndef ping_host(host):\n    \"\"\"Ping a host to check connectivity\"\"\"\n    # Your implementation here\n    pass\n\ndef get_host_ip(hostname):\n    \"\"\"Get IP address of a hostname\"\"\"\n    # Your implementation here\n    pass\n\n# Test the functions\nif __name__ == \"__main__\":\n    test_host = \"google.com\"\n    test_port = 80\n    \n    print(f\"Testing connectivity to {test_host}\")\n    print(f\"IP address: {get_host_ip(test_host)}\")\n    print(f\"Ping result: {ping_host(test_host)}\")\n    print(f\"Port {test_port} connectivity: {test_port_connectivity(test_host, test_port)}\")",
          test_cases: [
            { input: "google.com", expected_output: "IP address resolved", description: "DNS resolution test" },
            { input: "Port 80 test", expected_output: "Port connectivity result", description: "Port connectivity test" },
            { input: "Ping test", expected_output: "Ping result", description: "Network ping test" }
          ],
          time_limit_minutes: 25,
          language_options: ["python"],
          points: 30n        }
      ]
    },
    medium: {
      mcqs: [
        {
          question_text: "What is the difference between a switch and a router?",
          options: ["Switch operates at Layer 2, Router at Layer 3", "Switch is faster", "Router is cheaper", "No difference"],
          correct_answer: "Switch operates at Layer 2, Router at Layer 3",
          points: 15
        },
        {
          question_text: "Which protocol is used for dynamic IP address assignment?",
          options: ["DHCP", "DNS", "ARP", "ICMP"],
          correct_answer: "DHCP",
          points: 15n        },
        {
          question_text: "What is the purpose of VLANs?",
          options: ["Segment network traffic", "Increase bandwidth", "Reduce latency", "Encrypt data"],
          correct_answer: "Segment network traffic",
          points: 15n        }
      ],
      coding: [
        {
          question_text: "Implement a basic network packet analyzer in Python using sockets.",
          starter_code: "import socket\nimport struct\nimport binascii\n\nclass PacketAnalyzer:\n    def __init__(self):\n        self.raw_socket = None\n    \n    def create_raw_socket(self):\n        \"\"\"Create a raw socket for packet capture\"\"\"\n        # Your implementation here\n        pass\n    \n    def parse_ethernet_header(self, data):\n        \"\"\"Parse Ethernet header\"\"\"\n        # Your implementation here\n        pass\n    \n    def parse_ip_header(self, data):\n        \"\"\"Parse IP header\"\"\"\n        # Your implementation here\n        pass\n    \n    def capture_packets(self, count=5):\n        \"\"\"Capture and analyze packets\"\"\"\n        # Your implementation here\n        pass\n\n# Test the analyzer\nanalyzer = PacketAnalyzer()\nprint(\"Network Packet Analyzer initialized\")\n# Note: Raw sockets require elevated privileges\n# analyzer.capture_packets(3)",
          test_cases: [
            { input: "Socket creation", expected_output: "Raw socket created", description: "Create raw socket for packet capture" },
            { input: "Header parsing", expected_output: "Headers parsed correctly", description: "Parse network packet headers" }
          ],
          time_limit_minutes: 40,
          language_options: ["python"],
          points: 45n        }
      ]
    }
  },
  "Manager Finance": {
    easy: {
      mcqs: [
        {
          question_text: "What is the primary responsibility of a Finance Manager?",
          options: ["Financial planning and analysis", "Sales management", "Marketing strategy", "IT operations"],
          correct_answer: "Financial planning and analysis",
          points: 10
        },
        {
          question_text: "Which financial metric measures profitability relative to sales?",
          options: ["Gross profit margin", "Current ratio", "Debt-to-equity ratio", "Return on assets"],
          correct_answer: "Gross profit margin",
          points: 10
        },
        {
          question_text: "What is working capital?",
          options: ["Current assets minus current liabilities", "Total assets minus total liabilities", "Revenue minus expenses", "Cash plus inventory"],
          correct_answer: "Current assets minus current liabilities",
          points: 10
        },
        {
          question_text: "Which budget type adjusts based on actual activity levels?",
          options: ["Flexible budget", "Static budget", "Zero-based budget", "Incremental budget"],
          correct_answer: "Flexible budget",
          points: 10
        },
        {
          question_text: "What is the purpose of variance analysis?",
          options: ["Compare actual vs. budgeted performance", "Calculate taxes", "Prepare financial statements", "Manage cash flow"],
          correct_answer: "Compare actual vs. budgeted performance",
          points: 10n        }
      ],
      coding: [
        {
          question_text: "Create a Python script to calculate and analyze key financial ratios for management reporting.",
          starter_code: "import pandas as pd\nimport numpy as np\n\ndef calculate_management_ratios(financial_data):\n    \"\"\"\n    Calculate key financial ratios for management decision making\n    \"\"\"\n    ratios = {}\n    \n    # Profitability ratios\n    gross_profit_margin = (financial_data['gross_profit'] / financial_data['revenue']) * 100\n    \n    # Liquidity ratios\n    current_ratio = financial_data['current_assets'] / financial_data['current_liabilities']\n    \n    # Efficiency ratios\n    asset_turnover = financial_data['revenue'] / financial_data['total_assets']\n    \n    # Your implementation here\n    \n    return ratios\n\n# Sample financial data\ndata = {\n    'revenue': 1000000,\n    'gross_profit': 400000,\n    'current_assets': 500000,\n    'current_liabilities': 300000,\n    'total_assets': 2000000,\n    'net_income': 150000\n}\n\nratios = calculate_management_ratios(data)\nprint(\"Financial Ratios Analysis:\")\nfor ratio, value in ratios.items():\n    print(f\"{ratio}: {value:.2f}\")",
          test_cases: [
            { input: "Sample financial data", expected_output: "Ratios calculated", description: "Calculate financial ratios" },
            { input: "Multiple periods", expected_output: "Trend analysis", description: "Analyze financial trends" }
          ],
          time_limit_minutes: 30,
          language_options: ["python"],
          points: 35n        }
      ]
    },
    medium: {
      mcqs: [
        {
          question_text: "What is the purpose of cash flow forecasting?",
          options: ["Predict future cash positions", "Calculate taxes", "Prepare budgets", "Analyze profitability"],
          correct_answer: "Predict future cash positions",
          points: 15
        },
        {
          question_text: "Which method is used to evaluate investment projects?",
          options: ["Net Present Value (NPV)", "Gross profit margin", "Current ratio", "Asset turnover"],
          correct_answer: "Net Present Value (NPV)",
          points: 15n        },
        {
          question_text: "What is the weighted average cost of capital (WACC)?",
          options: ["Average rate of return required by all capital providers", "Cost of debt only", "Cost of equity only", "Interest rate on loans"],
          correct_answer: "Average rate of return required by all capital providers",
          points: 15n        }
      ],
      coding: [
        {
          question_text: "Implement a comprehensive financial planning and budgeting system in Python.",
          starter_code: "import numpy as np\nimport pandas as pd\nfrom datetime import datetime, timedelta\n\nclass FinancialPlanner:\n    def __init__(self, initial_budget, planning_horizon_months):\n        self.initial_budget = initial_budget\n        self.planning_horizon = planning_horizon_months\n        self.monthly_data = []\n    \n    def add_monthly_projection(self, month, revenue, expenses, capital_expenditure=0):\n        \"\"\"Add monthly financial projection\"\"\"\n        # Your implementation here\n        pass\n    \n    def calculate_cash_flow_forecast(self):\n        \"\"\"Calculate rolling cash flow forecast\"\"\"\n        # Your implementation here\n        pass\n    \n    def variance_analysis(self, actual_data):\n        \"\"\"Compare actual vs. budgeted performance\"\"\"\n        # Your implementation here\n        pass\n    \n    def generate_financial_report(self):\n        \"\"\"Generate comprehensive financial planning report\"\"\"\n        # Your implementation here\n        pass\n\n# Test the financial planner\nplanner = FinancialPlanner(initial_budget=100000, planning_horizon_months=12)\n\n# Add monthly projections\nfor month in range(1, 13):\n    revenue = 50000 + (month * 2000)  # Growing revenue\n    expenses = 35000 + (month * 1000)  # Growing expenses\n    planner.add_monthly_projection(month, revenue, expenses)\n\ncash_flow_forecast = planner.calculate_cash_flow_forecast()\nprint(\"12-Month Cash Flow Forecast:\")\nprint(cash_flow_forecast)",
          test_cases: [
            { input: "Monthly projections", expected_output: "Cash flow forecast", description: "Generate cash flow forecast" },
            { input: "Variance analysis", expected_output: "Budget vs. actual comparison", description: "Perform variance analysis" },
            { input: "Financial report", expected_output: "Comprehensive report", description: "Generate financial report" }
          ],
          time_limit_minutes: 45,
          language_options: ["python"],
          points: 50n        }
      ]
    }
  }
};

// Helper function to get questions for specific job role and difficulty
export function getQuestionsForRole(jobRole: string, difficulty: string, questionCount: number) {
  const roleData = interviewQuestionsDatabase[jobRole as keyof typeof interviewQuestionsDatabase];
  if (!roleData) {
    return getFallbackQuestions(jobRole, difficulty, questionCount);
  }
  
  const difficultyData = (roleData as any)[difficulty];
  if (!difficultyData) {
    return getFallbackQuestions(jobRole, difficulty, questionCount);
  }
  
  const mcqCount = Math.floor(questionCount * 0.6);
  const codingCount = questionCount - mcqCount;
  
  const selectedMCQs = difficultyData.mcqs.slice(0, mcqCount);
  const selectedCoding = difficultyData.coding.slice(0, codingCount);
  
  // If we don't have enough questions, duplicate or create variations
  while (selectedMCQs.length < mcqCount) {
    const baseMCQ = difficultyData.mcqs[0] || getFallbackMCQ(jobRole, difficulty);
    selectedMCQs.push({
      ...baseMCQ,
      question_text: baseMCQ.question_text.replace(/Java|Python|React/, jobRole.split(' ')[0])
    });
  }
  
  while (selectedCoding.length < codingCount) {
    const baseCoding = difficultyData.coding[0] || getFallbackCoding(jobRole, difficulty);
    selectedCoding.push({
      ...baseCoding,
      question_text: baseCoding.question_text.replace(/Java|Python|React/, jobRole.split(' ')[0])
    });
  }
  
  return {
    mcqs: selectedMCQs,
    coding: selectedCoding
  };
}

function getFallbackQuestions(jobRole: string, difficulty: string, questionCount: number) {
  const mcqCount = Math.floor(questionCount * 0.6);
  const codingCount = questionCount - mcqCount;
  
  return {
    mcqs: Array(mcqCount).fill(null).map((_, i) => getFallbackMCQ(jobRole, difficulty)),
    coding: Array(codingCount).fill(null).map((_, i) => getFallbackCoding(jobRole, difficulty))
  };
}

function getFallbackMCQ(jobRole: string, difficulty: string) {
  const role = jobRole.split(' ')[0];
  return {
    question_text: `What is a key responsibility of a ${jobRole}?`,
    options: ["Primary role function", "Secondary task", "Administrative duty", "Support activity"],
    correct_answer: "Primary role function",
    points: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20
  };
}

function getFallbackCoding(jobRole: string, difficulty: string) {
  const role = jobRole.split(' ')[0];
  const points = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 30 : 40;
  
  return {
    question_text: `Create a solution for a common ${jobRole} challenge.`,
    starter_code: `def solve_challenge():\n    # Your implementation here\n    pass\n\n# Test the solution\nresult = solve_challenge()\nprint(result)`,
    test_cases: [
      { input: "Challenge input", expected_output: "Solution implemented", description: "Solve the challenge" }
    ],
    time_limit_minutes: points,
    language_options: ["python", "javascript", "java"],
    points: points
  };
}