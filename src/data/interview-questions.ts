
export const interviewTypes = {
  roles: [
    { id: "fullstack", name: "Full Stack" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "java", name: "Java" },
    { id: "python", name: "Python" },
  ],
  categories: [
    { id: "technical", name: "Technical" },
    { id: "behavioral", name: "Behavioral" },
    { id: "coding", name: "Coding" },
  ],
  seniority: [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ],
};

export type InterviewQuestion = {
  id: string;
  type: 'open_ended' | 'multiple_choice' | 'coding';
  question_text: string;
  options?: string[];
  correct_answer?: string;
  starter_code?: string;
  test_cases?: any[];
  category: 'technical' | 'behavioral' | 'coding'; // <-- The critical fix
  role: 'fullstack' | 'frontend' | 'backend' | 'java' | 'python';
  seniority: 'easy' | 'medium' | 'hard' | 'all';
};
