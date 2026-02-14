import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { WorkflowStepper } from './WorkflowStepper';
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
  question_type: 'mcq' | 'coding';
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

// Steps are now rendered by WorkflowStepper component

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

  const fetchQuestionsAndCreateSession = useCallback(async (assessment: Assessment) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch questions for this assessment
      const { data: questionData, error: qError } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('assessment_id', assessment.id)
        .order('order_index', { ascending: true });

      if (qError) throw qError;

      if (!questionData || questionData.length === 0) {
        setError('No questions available for this assessment. Please contact an administrator.');
        setLoading(false);
        return false;
      }

      // Map DB rows to Question interface, parse options from JSON
      const mappedQuestions: Question[] = questionData.map((q: any) => ({
        id: q.id,
        question_text: q.question_text,
        question_type: q.question_type === 'multiple_choice' ? 'mcq' : q.question_type,
        options: Array.isArray(q.options) ? q.options : (typeof q.options === 'string' ? JSON.parse(q.options) : []),
        correct_answer: q.correct_answer,
        points: q.points,
        order_index: q.order_index,
      }));

      setQuestions(mappedQuestions);

      // Create assessment session
      const { data: sessionData, error: sError } = await supabase
        .from('assessment_sessions')
        .insert({
          assessment_id: assessment.id,
          user_id: userId,
          time_remaining_seconds: assessment.duration_minutes * 60,
          current_question_index: 0,
          completed: false,
        })
        .select('id')
        .single();

      if (sError) throw sError;
      if (sessionData) setSessionId(sessionData.id);

      return true;
    } catch (err: any) {
      console.error('Error loading questions:', err);
      setError(err.message || 'Failed to load questions.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const handleInstructionsAccept = async () => {
    if (!instructionsAccepted) { toast({ title: 'Please accept the instructions', variant: 'destructive' }); return; }
    if (!selectedAssessment) return;
    const success = await fetchQuestionsAndCreateSession(selectedAssessment);
    if (success) {
      setCurrentStep(3);
      setStartTime(Date.now());
    }
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
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">Loading questions...</span>
        </div>
      );
    }
    switch (currentStep) {
      case 1: return <AssessmentSelection onAssessmentSelect={handleAssessmentSelect} userId={userId} />;
      case 2: return <AssessmentInstructions assessment={selectedAssessment!} onAccept={handleInstructionsAccept} onBack={() => setCurrentStep(1)} accepted={instructionsAccepted} onAcceptChange={setInstructionsAccepted} />;
      case 3: return questions.length > 0 
        ? <AssessmentTest assessment={selectedAssessment!} questions={questions} onComplete={handleTestComplete} onBack={() => setCurrentStep(2)} sessionId={sessionId} userId={userId} />
        : <div className="text-center py-12"><AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" /><h3 className="text-lg font-medium mb-2">No questions available</h3><p className="text-muted-foreground mb-4">This assessment has no questions yet.</p><Button variant="outline" onClick={() => setCurrentStep(1)}>Choose Another Assessment</Button></div>;
      case 4: return <AssessmentReview assessment={selectedAssessment!} questions={questions} answers={answers} markedForReview={markedForReview} onSubmit={handleReviewSubmit} onBack={() => setCurrentStep(3)} />;
      case 5: return <AssessmentResults results={results!} assessment={selectedAssessment!} onFinish={() => onCancel?.()} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background dark:to-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Assessment Workflow</h1>
            <Button variant="ghost" onClick={() => onCancel?.()}>Cancel Assessment</Button>
          </div>

          <WorkflowStepper
            currentStep={currentStep}
            onStepClick={handleStepNavigation}
            canProceedToStep={canProceedToStep}
          />

          <Progress value={(currentStep / 5) * 100} className="w-full mt-6" />
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
