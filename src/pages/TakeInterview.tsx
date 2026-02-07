import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Clock, Code, CheckCircle2, AlertCircle, Save, ArrowLeft, ArrowRight } from "lucide-react";
import { MCQQuestion } from "@/components/interview/MCQQuestion";
import { CodingQuestion } from "@/components/interview/CodingQuestion";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: string;
  question_type: string;
  question_text: string;
  difficulty: string;
  points: number;
  order_index: number;
  options?: any;
  correct_answer?: string;
  starter_code?: string;
  test_cases?: any;
  time_limit_minutes?: number;
  language_options?: any;
}

interface InterviewSession {
  id?: string;
  current_question_index: number;
  responses: Record<string, any>;
  start_time: string;
  time_remaining?: number;
}

export default function TakeInterview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // State Management
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [interview, setInterview] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Auto-save timer
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveInterval, setAutoSaveInterval] = useState<NodeJS.Timeout | null>(null);

  // Fetch interview data and resume session
  const fetchInterviewData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch interview details
      const { data: interviewData, error: interviewError } = await supabase
        .from('interviews')
        .select('*')
        .eq('id', id)
        .single();

      if (interviewError) throw interviewError;
      setInterview(interviewData);

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('interview_questions')
        .select('*')
        .eq('interview_id', id)
        .order('order_index');

      if (questionsError) throw questionsError;

      const transformedQuestions = questionsData?.map(q => ({
        ...q,
        options: q.options as any,
        test_cases: q.test_cases as any,
        language_options: q.language_options as any,
      })) || [];

      setQuestions(transformedQuestions);

      // Check for existing session
      if (user) {
        const { data: existingSession } = await supabase
          .from('interview_sessions')
          .select('*')
          .eq('interview_id', id)
          .eq('user_id', user.id)
          .eq('completed', false)
          .maybeSingle();

        if (existingSession) {
          setSession(existingSession);
          setCurrentQuestionIndex(existingSession.current_question_index);
          setResponses(existingSession.responses || {});
          setLastSaved(new Date(existingSession.updated_at));
        } else {
          // Create new session
          const newSession = {
            interview_id: id,
            user_id: user.id,
            current_question_index: 0,
            responses: {},
            start_time: new Date().toISOString(),
            completed: false,
          };
          
          const { data: createdSession } = await supabase
            .from('interview_sessions')
            .insert(newSession)
            .select()
            .single();
          
          setSession(createdSession);
        }
      }

    } catch (error: any) {
      console.error('Error fetching interview:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate('/interviews');
    } finally {
      setLoading(false);
    }
  }, [id, user, navigate, toast]);

  // Auto-save functionality
  const saveProgress = useCallback(async () => {
    if (!session?.id || !user) return;
    
    try {
      setSaving(true);
      await supabase
        .from('interview_sessions')
        .update({
          current_question_index: currentQuestionIndex,
          responses: responses,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.id);
      
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setSaving(false);
    }
  }, [session, currentQuestionIndex, responses, user]);

  // Set up auto-save interval
  useEffect(() => {
    const interval = setInterval(saveProgress, 30000); // Auto-save every 30 seconds
    setAutoSaveInterval(interval);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [saveProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveInterval) clearInterval(autoSaveInterval);
    };
  }, [autoSaveInterval]);

  // Initial data fetch
  useEffect(() => {
    if (id && user) {
      fetchInterviewData();
    }
  }, [id, user, fetchInterviewData]);

  // Validate current question
  const validateCurrentQuestion = (): boolean => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return true;

    const response = responses[currentQuestion.id];
    const errors: Record<string, string> = {};

    if (currentQuestion.question_type === 'mcq') {
      if (!response) {
        errors[currentQuestion.id] = "Please select an answer";
      }
    } else if (currentQuestion.question_type === 'coding') {
      if (!response?.code || response.code.trim() === '') {
        errors[currentQuestion.id] = "Please write your code solution";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle answer changes
  const handleAnswerChange = (questionId: string, answer: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
    // Clear validation error for this question
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[questionId];
      return newErrors;
    });
  };

  // Navigation handlers
  const handleNext = async () => {
    if (!validateCurrentQuestion()) {
      toast({
        title: "Please answer the question",
        description: validationErrors[questions[currentQuestionIndex].id],
        variant: "destructive",
      });
      return;
    }

    await saveProgress();
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      await submitInterview();
    }
  };

  const handlePrevious = async () => {
    if (currentQuestionIndex > 0) {
      await saveProgress();
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Submit interview
  const submitInterview = async () => {
    if (!user || !session) return;
    
    try {
      setIsSubmitting(true);
      
      // Calculate score
      let totalPoints = 0;
      let earnedPoints = 0;

      // Process MCQ responses
      for (const question of questions) {
        const response = responses[question.id];
        if (!response) continue;

        if (question.question_type === 'mcq') {
          const isCorrect = response === question.correct_answer;
          const pointsEarned = isCorrect ? question.points : 0;
          
          totalPoints += question.points;
          earnedPoints += pointsEarned;

          await supabase.from('interview_responses').insert({
            interview_id: id,
            question_id: question.id,
            user_id: user.id,
            answer_text: response,
            is_correct: isCorrect,
            points_earned: pointsEarned,
          });
        } else if (question.question_type === 'coding') {
          // Evaluate coding responses
          const { data, error } = await supabase.functions.invoke('evaluate-code', {
            body: {
              questionId: question.id,
              code: response.code,
              language: response.language,
              userId: user.id,
              interviewId: id,
            }
          });

          if (!error && data) {
            totalPoints += question.points;
            earnedPoints += data.points_earned || 0;
          }
        }
      }

      const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;

      // Update session as completed
      await supabase
        .from('interview_sessions')
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
          final_score: percentage,
        })
        .eq('id', session.id);

      // Insert results
      await supabase.from('interview_results').insert({
        interview_id: id,
        user_id: user.id,
        overall_score: percentage,
        technical_score: percentage,
        communication_score: 0,
        confidence_score: 0,
        fraud_detected: false,
        ai_feedback: {
          total_points: totalPoints,
          earned_points: earnedPoints,
          completed_at: new Date().toISOString(),
        }
      });

      toast({
        title: "Interview Completed!",
        description: `You scored ${Math.round(percentage)}% (${earnedPoints}/${totalPoints} points)`,
      });

      navigate('/ai-interview');
      
    } catch (error: any) {
      console.error('Error submitting interview:', error);
      toast({
        title: "Submission Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading interview...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!interview || questions.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No interview found. Please check the URL or contact support.
            </AlertDescription>
          </Alert>
        </div>
      </ProtectedRoute>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const hasAnswer = responses[currentQuestion.id] !== undefined;

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{interview.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {interview.duration_minutes} minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    {interview.job_role}
                  </span>
                  <Badge variant="outline">{currentQuestionIndex + 1} of {questions.length}</Badge>
                </div>
              </div>
              
              {/* Auto-save indicator */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {saving && <Loader2 className="h-3 w-3 animate-spin" />}
                {lastSaved && (
                  <span className="text-xs">
                    Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            {validationErrors[currentQuestion.id] && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationErrors[currentQuestion.id]}</AlertDescription>
              </Alert>
            )}
            
            {currentQuestion.question_type === 'mcq' ? (
              <MCQQuestion
                question={currentQuestion}
                selectedAnswer={responses[currentQuestion.id]}
                onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
              />
            ) : (
              <CodingQuestion
                question={currentQuestion}
                code={responses[currentQuestion.id]}
                onCodeChange={(code) => handleAnswerChange(currentQuestion.id, code)}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {hasAnswer && <Save className="h-3 w-3 text-green-500" />}
              <span>{hasAnswer ? 'Answered' : 'Not answered'}</span>
            </div>

            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {currentQuestionIndex === questions.length - 1 ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit Interview'}
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}