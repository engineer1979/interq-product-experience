
export const softwareEngineeringAssessment = {
    title: "Software Engineering - Full Stack & Architecture",
    role: "Senior Full Stack Engineer / Architect",
    difficulty: "Hard",
    duration_minutes: 60,

    // SECTION 1: 20 LIVE INTERVIEW SCENARIO QUESTIONS
    liveScenarios: [
        {
            id: "LS-01",
            scenario: "A legacy monolith is being migrated to microservices. The team is seeing inconsistent data in the User Profile service compared to the Transactions service.",
            problem: "Data inconsistency across distributed services.",
            analysis: "Candidate should analyze Eventual Consistency patterns (Saga, Outbox pattern) vs Distributed Transactions.",
            probing: "How would you handle a failed transaction in the second service to ensure atomicity?",
            skill: "System Design / Distributed Systems",
            difficulty: "Hard",
            answerOutline: "Implement Saga pattern (Choreography or Orchestration). Use Compensation Transactions to roll back state. Discuss the use of an Idempotency Key."
        },
        {
            id: "LS-02",
            scenario: "The frontend application bundle size has grown to 5MB, causing a 10-second TTI (Time to Interactive) for mobile users in low-bandwidth areas.",
            problem: "Poor frontend performance/load time.",
            analysis: "Analyze code-splitting, tree-shaking, lazy loading, and asset optimization.",
            probing: "Can you explain the difference between dynamic imports and static imports in the context of build-time vs run-time optimization?",
            skill: "Frontend Optimization",
            difficulty: "Medium",
            answerOutline: "Use Route-based code splitting. Implement Lazy Loading for heavy components. Optimize images/assets. Use a CDN."
        },
        // ... (Adding more scenarios in a real implementation)
    ],

    // SECTION 3: SAMPLE 20-QUESTION TEST PAPER
    questions: [
        // CONCEPT MCQs (5)
        {
            id: "se-q1",
            question_text: "In a Microservices architecture, what is the primary purpose of the 'API Gateway' pattern?",
            type: "mcq",
            options: [
                "To manage the database connections for all services",
                "To act as a single entry point for routing, authentication, and rate limiting",
                "To replace the need for service-to-service communication",
                "To store the global state of the application"
            ],
            correctAnswer: "To act as a single entry point for routing, authentication, and rate limiting",
            explanation: "The API Gateway provides a unified interface, handles request routing, and centralizes cross-cutting concerns like security and monitoring.",
            points: 5
        },
        {
            id: "se-q2",
            question_text: "Which SOLID principle states that 'Software entities should be open for extension, but closed for modification'?",
            type: "mcq",
            options: ["Single Responsibility", "Open-Closed Principle", "Liskov Substitution", "Interface Segregation"],
            correctAnswer: "Open-Closed Principle",
            explanation: "OCP allows adding new functionality without changing existing code, reducing the risk of regressions.",
            points: 5
        },
        // SCENARIO MCQs (5)
        {
            id: "se-q6",
            question_text: "You are designing a notification system that must handle 100k messages per second. The order of messages is critical for each user. Which technology choice is best?",
            type: "scenario",
            options: [
                "Standard RabbitMQ Queue",
                "Kafka with message keys based on User ID",
                "Amazon SQS (Standard)",
                "In-memory Redis List"
            ],
            correctAnswer: "Kafka with message keys based on User ID",
            explanation: "Kafka guarantees ordering within a partition. By using the User ID as the key, all messages for a specific user go to the same partition, ensuring order at high scale.",
            points: 5
        },
        // PRACTICAL / CODING (5)
        {
            id: "se-q11",
            question_text: "Implement a function 'isPalindrome' that handles non-alphanumeric characters and is case-insensitive. Example: 'A man, a plan, a canal: Panama' -> true.",
            type: "coding",
            starter_code: "function isPalindrome(s) {\n  // Your code here\n}",
            correctAnswer: "var clean = s.toLowerCase().replace(/[^a-z0-9]/g, ''); return clean === clean.split('').reverse().join('');",
            explanation: "The solution requires regex to clean the string and then a standard comparison with its reverse.",
            points: 10
        },
        // CASE STUDY / ARCHITECTURE (5)
        {
            id: "se-q16",
            question_text: "Design a Rate Limiter for an API that allows 100 requests per minute per User ID. How would you store the state if the application is distributed across 10 servers?",
            type: "scenario",
            options: [
                "In-memory Map on each server",
                "Centralized Redis store with 'Sliding Window' algorithm",
                "Relational Database with a 'limit' table",
                "Strict Round-Robin Load Balancing"
            ],
            correctAnswer: "Centralized Redis store with 'Sliding Window' algorithm",
            explanation: "Centralized storage is required for distributed systems. Redis provides high-performance atomic increments and TTLs suitable for rate limiting.",
            points: 10
        }
    ]
};
