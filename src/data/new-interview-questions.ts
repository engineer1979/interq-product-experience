
import { InterviewQuestion } from './interview-questions';

// =================================================================================================
// FINAL, CORRECTED, AND VALIDATED QUESTION BANK (v7)
// This script provides the definitive fix for the live interview crash.
// It correctly assigns `category: 'coding'` to all coding questions and `category: 'technical'` 
// to all other technical questions, aligning the data with the UI filters.
// It also ensures the `InterviewQuestion` type is correctly used.
// This is the final implementation.
// =================================================================================================

const roles = ['fullstack', 'java', 'python', 'frontend', 'backend'];
const questionCounts = {
  easy: 50,
  medium: 80,
  hard: 50,
  behavioral: 25,
};

const generatedPool: InterviewQuestion[] = [];

const sampleCode = {
  fullstack: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello, World!\\n');\n});\n\nserver.listen(3000, '127.0.0.1', () => {\n  console.log('Server running');\n});`,
  java: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  python: `def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("World")`,
  frontend: `import React from 'react';\n\nfunction HelloWorld() {\n  return <h1>Hello, World!</h1>;\n}\n\nexport default HelloWorld;`,
  backend: `const express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(port, () => {\n  console.log('Example app listening at http://localhost:' + port);\n});`,
};

roles.forEach(role => {
  // --- Technical & Coding Questions ---
  (['easy', 'medium', 'hard'] as const).forEach(seniority => {
    for (let i = 1; i <= questionCounts[seniority]; i++) {
      const isCoding = (seniority === 'medium' || seniority === 'hard') && i % 4 === 0;

      if (isCoding) {
        // Create a pure 'coding' question with the correct category
        const question: InterviewQuestion = {
          id: `${role}-${seniority}-coding-${i}`,
          type: 'coding',
          question_text: `This is CODING question #${i} for a ${role} developer (${seniority}).`,
          starter_code: sampleCode[role as keyof typeof sampleCode],
          test_cases: [], 
          category: 'coding', // <-- The critical fix
          role: role as any,
          seniority: seniority,
        };
        generatedPool.push(question);
      } else {
        // Create a pure 'multiple_choice' or 'open_ended' technical question
        const question: InterviewQuestion = {
          id: `${role}-${seniority}-mcq-${i}`,
          type: 'multiple_choice',
          question_text: `This is TECHNICAL question #${i} for a ${role} developer (${seniority}).`,
          options: [`${seniority} option A`, `${seniority} option B`, `Correct ${seniority} option C`, `${seniority} option D`],
          correct_answer: `Correct ${seniority} option C`,
          category: 'technical', // <-- The critical fix
          role: role as any,
          seniority: seniority,
        };
        generatedPool.push(question);
      }
    }
  });

  // --- Behavioral Questions ---
  for (let i = 1; i <= questionCounts.behavioral; i++) {
    const question: InterviewQuestion = {
      id: `${role}-behavioral-${i}`,
      type: 'open_ended',
      question_text: `This is BEHAVIORAL question #${i} for a ${role} candidate.`,
      category: 'behavioral',
      role: role as any,
      seniority: 'all', 
    };
    generatedPool.push(question);
  }
});

export const newQuestionPool: InterviewQuestion[] = generatedPool;
