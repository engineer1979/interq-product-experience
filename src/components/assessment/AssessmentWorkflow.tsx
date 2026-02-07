import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, CheckCircle, Circle, AlertCircle } from 'lucide-react';
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

interface TestCase {
  input: string;
  expected_output: string;
  description?: string;
}

interface Question {
  id: string;
  question_text: string;
  question_type: 'mcq' | 'coding';
  options?: string[];
  correct_answer?: string;
  points: number;
  order_index: number;
  starter_code?: string;
  test_cases?: TestCase[];
  time_limit_minutes?: number;
  language_options?: string[];
}

interface AssessmentWorkflowProps {
  userId: string;
  onComplete?: (results: AssessmentResults) => void;
  onCancel?: () => void;
}

export interface AssessmentResults {
  assessmentId: string;
  userId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, string | number | boolean>;
  timeTaken: number;
  completedAt: string;
  questionResults: QuestionResult[];
}

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
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [sessionId, setSessionId] = useState<string>('');
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [instructionsAccepted, setInstructionsAccepted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const { toast } = useToast();

  const handleAssessmentSelect = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setCurrentStep(2);
  };

  const handleInstructionsAccept = () => {
    if (!instructionsAccepted) {
      toast({
        title: 'Please accept the instructions',
        description: 'You must agree to the assessment guidelines before proceeding',
        variant: 'destructive'
      });
      return;
    }
    setCurrentStep(3);
    setStartTime(Date.now());
  };

  const handleTestComplete = (finalAnswers: Record<string, string | number | boolean>, finalMarkedForReview: Set<string>) => {
    setAnswers(finalAnswers);
    setMarkedForReview(finalMarkedForReview);
    setCurrentStep(4);
  };

  const handleReviewSubmit = async () => {
    if (selectedAssessment) {
      await calculateResults();
      setCurrentStep(5);
    }
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
      
      questionResults.push({
        questionId: question.id,
        isCorrect,
        userAnswer: userAnswer.toString(),
        correctAnswer: question.correct_answer || '',
        points,
        maxPoints: question.points
      });
    });

    const percentage = totalPoints > 0 ? Math.round((totalScore / totalPoints) * 100) : 0;
    const passed = percentage >= selectedAssessment.passing_score;

    const assessmentResults: AssessmentResults = {
      assessmentId: selectedAssessment.id,
      userId,
      score: totalScore,
      totalPoints,
      percentage,
      passed,
      answers,
      timeTaken,
      completedAt: new Date().toISOString(),
      questionResults
    };

    setResults(assessmentResults);
    
    if (onComplete) {
      onComplete(assessmentResults);
    }
  };

  const handleStepNavigation = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 2:
        return selectedAssessment !== null;
      case 3:
        return selectedAssessment !== null && instructionsAccepted;
      case 4:
        return currentStep >= 3;
      case 5:
        return currentStep >= 4;
      default:
        return true;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AssessmentSelection
            onAssessmentSelect={handleAssessmentSelect}
            userId={userId}
          />
        );
      case 2:
        return (
          <AssessmentInstructions
            assessment={selectedAssessment!}
            onAccept={handleInstructionsAccept}
            onBack={() => setCurrentStep(1)}
            accepted={instructionsAccepted}
            onAcceptChange={setInstructionsAccepted}
          />
        );
      case 3:
        return (
          <AssessmentTest
            assessment={selectedAssessment!}
            questions={questions}
            onComplete={handleTestComplete}
            onBack={() => setCurrentStep(2)}
            sessionId={sessionId}
            userId={userId}
          />
        );
      case 4:
        return (
          <AssessmentReview
            assessment={selectedAssessment!}
            questions={questions}
            answers={answers}
            markedForReview={markedForReview}
            onSubmit={handleReviewSubmit}
            onBack={() => setCurrentStep(3)}
          />
        );
      case 5:
        return (
          <AssessmentResults
            results={results!}
            assessment={selectedAssessment!}
            onFinish={() => onCancel?.()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Assessment Workflow</h1>
            <Button
              variant="ghost"
              onClick={() => onCancel?.()}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel Assessment
            </Button>
          </div>
          
          {/* Step Progress */}
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center cursor-pointer ${
                  canProceedToStep(step.id) ? 'text-blue-600' : 'text-gray-400'
                }`}
                onClick={() => handleStepNavigation(step.id)}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : currentStep === step.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`mx-4 flex-1 h-0.5 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <Progress value={(currentStep / STEPS.length) * 100} className="w-full" />
        </div>

        {/* Session Manager */}
        <AssessmentSessionManager
          assessmentId={selectedAssessment?.id}
          userId={userId}
          sessionId={sessionId}
          onSessionUpdate={setSessionId}
        />

        {/* Current Step Content */}
        <Card className="shadow-xl border-0">
          <div className="p-6 sm:p-8">
            {renderCurrentStep()}
          </div>
        </Card>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-700">Processing...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}