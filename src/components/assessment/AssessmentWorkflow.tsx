import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AssessmentSelection } from './AssessmentSelection';
import { AssessmentInstructions } from './AssessmentInstructions';
import { AssessmentTest } from './AssessmentTest';
import { AssessmentReview } from './AssessmentReview';
import { AssessmentResults } from './AssessmentResults';
import { AssessmentSessionManager } from './AssessmentSessionManager';

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  passing_score: number;
  total_questions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
}

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options?: string[];
  correct_answer?: string;
  points: number;
  order_index: number;
  starter_code?: string;
  test_cases?: any[];
  time_limit_minutes?: number;
  language_options?: string[];
}

interface AssessmentWorkflowProps {
  userId: string;
  onComplete?: (results: AssessmentResultsData) => void;
  onCancel?: () => void;
}

export interface AssessmentResultsData {
  assessmentId: string;
  userId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, string>;
  timeTaken: number;
  completedAt: string;
  questionResults: QuestionResult[];
}

// Keep backward-compatible export name
export type AssessmentResults = AssessmentResultsData;

export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  points: number;
  maxPoints: number;
}

const STEPS = [
  { id: 1, title: 'Select Assessment', description: 'Choose your assessment' },
  { id: 2, title: 'Instructions', description: 'Read guidelines' },
  { id: 3, title: 'Start Test', description: 'Take the assessment' },
  { id: 4, title: 'Review Answers', description: 'Check your responses' },
  { id: 5, title: 'Results', description: 'View your score' }
];

export function AssessmentWorkflow({ userId, onComplete, onCancel }: AssessmentWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [sessionId, setSessionId] = useState<string>('');
  const [results, setResults] = useState<AssessmentResultsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [instructionsAccepted, setInstructionsAccepted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const { toast } = useToast();

  const handleAssessmentSelect = (assessment: Assessment) => { setSelectedAssessment(assessment); setCurrentStep(2); };

  const handleInstructionsAccept = () => {
    if (!instructionsAccepted) { toast({ title: 'Please accept the instructions', variant: 'destructive' }); return; }
    setCurrentStep(3);
    setStartTime(Date.now());
  };

  const handleTestComplete = (finalAnswers: Record<string, string>, finalMarkedForReview: Set<string>) => {
    setAnswers(finalAnswers);
    setMarkedForReview(finalMarkedForReview);
    setCurrentStep(4);
  };

  const handleReviewSubmit = async () => {
    if (selectedAssessment) { await calculateResults(); setCurrentStep(5); }
  };

  const calculateResults = async () => {
    if (!selectedAssessment || questions.length === 0) return;

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    let totalScore = 0;
    let totalPoints = 0;
    const questionResults: QuestionResult[] = [];

    questions.forEach((question) => {
      const userAnswer = answers[question.id] || '';
      const isCorrect = userAnswer === question.correct_answer;
      const points = isCorrect ? question.points : 0;
      totalScore += points;
      totalPoints += question.points;
      questionResults.push({ questionId: question.id, isCorrect, userAnswer: userAnswer.toString(), correctAnswer: question.correct_answer || '', points, maxPoints: question.points });
    });

    const percentage = totalPoints > 0 ? Math.round((totalScore / totalPoints) * 100) : 0;
    const passed = percentage >= selectedAssessment.passing_score;

    const assessmentResults: AssessmentResultsData = {
      assessmentId: selectedAssessment.id, userId, score: totalScore, totalPoints, percentage, passed, answers, timeTaken, completedAt: new Date().toISOString(), questionResults
    };

    setResults(assessmentResults);
    if (onComplete) onComplete(assessmentResults);
  };

  const handleStepNavigation = (step: number) => { if (step < currentStep) setCurrentStep(step); };

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 2: return selectedAssessment !== null;
      case 3: return selectedAssessment !== null && instructionsAccepted;
      case 4: return currentStep >= 3;
      case 5: return currentStep >= 4;
      default: return true;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return <AssessmentSelection onAssessmentSelect={handleAssessmentSelect} userId={userId} />;
      case 2: return <AssessmentInstructions assessment={selectedAssessment!} onAccept={handleInstructionsAccept} onBack={() => setCurrentStep(1)} accepted={instructionsAccepted} onAcceptChange={setInstructionsAccepted} />;
      case 3: return <AssessmentTest assessment={selectedAssessment!} questions={questions} onComplete={handleTestComplete} onBack={() => setCurrentStep(2)} sessionId={sessionId} userId={userId} />;
      case 4: return <AssessmentReview assessment={selectedAssessment!} questions={questions} answers={answers} markedForReview={markedForReview} onSubmit={handleReviewSubmit} onBack={() => setCurrentStep(3)} />;
      case 5: return <AssessmentResults results={results!} assessment={selectedAssessment!} onFinish={() => onCancel?.()} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background dark:to-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Assessment Workflow</h1>
            <Button variant="ghost" onClick={() => onCancel?.()}>Cancel Assessment</Button>
          </div>
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className={`flex items-center cursor-pointer ${canProceedToStep(step.id) ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => handleStepNavigation(step.id)}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep >= step.id ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : <span className="text-sm font-medium">{step.id}</span>}
                </div>
                <div className="ml-2 hidden sm:block"><div className="text-sm font-medium">{step.title}</div></div>
                {index < STEPS.length - 1 && <div className={`mx-4 flex-1 h-0.5 ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / STEPS.length) * 100} className="w-full" />
        </div>

        <AssessmentSessionManager assessmentId={selectedAssessment?.id} userId={userId} sessionId={sessionId} onSessionUpdate={setSessionId} />

        <Card className="shadow-xl border-0">
          <div className="p-6 sm:p-8">{renderCurrentStep()}</div>
        </Card>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/10">
            <div className="flex items-center"><AlertCircle className="w-5 h-5 text-red-500 mr-2" /><p className="text-red-800 dark:text-red-400">{error}</p></div>
          </div>
        )}
      </div>
    </div>
  );
}
