import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Clock, 
  Flag, 
  FlagOff, 
  Save, 
  ChevronLeft, 
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Pause,
  Play
} from 'lucide-react';
import { AssessmentTimer } from './AssessmentTimer';
import { AssessmentProgress } from './AssessmentProgress';

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

interface AssessmentTestProps {
  assessment: Assessment;
  questions: Question[];
  onComplete: (answers: Record<string, string | number | boolean>, markedForReview: Set<string>) => void;
  onBack: () => void;
  sessionId: string;
  userId: string;
}

export function AssessmentTest({ 
  assessment, 
  questions, 
  onComplete, 
  onBack, 
  sessionId, 
  userId 
}: AssessmentTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(assessment.duration_minutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const { toast } = useToast();
  const autoSaveInterval = useRef<NodeJS.Timeout>();
  const timerInterval = useRef<NodeJS.Timeout>();
  const currentQuestion = questions[currentQuestionIndex];

  // Initialize from session if available
  useEffect(() => {
    if (sessionId) {
      loadSessionData();
    }
  }, [sessionId, loadSessionData]);

  // Timer management
  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      timerInterval.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [isPaused, timeRemaining, handleTimeUp]);

  // Auto-save functionality
  useEffect(() => {
    autoSaveInterval.current = setInterval(() => {
      saveProgress();
    }, 30000); // Auto-save every 30 seconds

    return () => {
      if (autoSaveInterval.current) {
        clearInterval(autoSaveInterval.current);
      }
    };
  }, [saveProgress]);

  // Prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(answers).length > 0) {
        e.preventDefault();
        e.returnValue = 'You have unsaved answers. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers]);

  const loadSessionData = useCallback(async () => {
    try {
      const { data: sessionData } = await supabase
        .from('assessment_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (sessionData) {
        setCurrentQuestionIndex(sessionData.current_question_index || 0);
        setTimeRemaining(sessionData.time_remaining_seconds || assessment.duration_minutes * 60);
        
        // Load saved answers if any
        const { data: savedAnswers } = await supabase
          .from('assessment_answers')
          .select('*')
          .eq('session_id', sessionId);

        if (savedAnswers) {
          const loadedAnswers: Record<string, string | number | boolean> = {};
          savedAnswers.forEach(answer => {
            loadedAnswers[answer.question_id] = answer.answer;
          });
          setAnswers(loadedAnswers);
        }
      }
    } catch (error) {
      console.error('Error loading session data:', error);
    }
  }, [sessionId, assessment.duration_minutes]);

  const saveProgress = useCallback(async () => {
    if (!sessionId) return;

    setAutoSaveStatus('saving');
    try {
      // Save session progress
      await supabase
        .from('assessment_sessions')
        .update({
          current_question_index: currentQuestionIndex,
          time_remaining_seconds: timeRemaining,
          last_activity_at: new Date().toISOString()
        })
        .eq('id', sessionId);

      // Save answers
      for (const [questionId, answer] of Object.entries(answers)) {
        await supabase
          .from('assessment_answers')
          .upsert({
            session_id: sessionId,
            question_id: questionId,
            answer: answer,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'session_id,question_id'
          });
      }

      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving progress:', error);
      setAutoSaveStatus('idle');
    }
  }, [sessionId, currentQuestionIndex, timeRemaining, answers]);

  const handleAnswerChange = (questionId: string, answer: string | number | boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const toggleMarkForReview = (questionId: string) => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const navigateQuestion = (direction: 'next' | 'previous') => {
    if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (direction === 'previous' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleTimeUp = useCallback(() => {
    toast({
      title: 'Time\'s up!',
      description: 'Your assessment has been automatically submitted.',
      variant: 'destructive'
    });
    saveProgress();
    onComplete(answers, markedForReview);
  }, [toast, saveProgress, onComplete, answers, markedForReview]);

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      setShowWarning(true);
      return;
    }
    saveProgress();
    onComplete(answers, markedForReview);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionStatus = (index: number) => {
    const question = questions[index];
    if (markedForReview.has(question.id)) return 'review';
    if (answers[question.id]) return 'answered';
    return 'unanswered';
  };

  const renderQuestionContent = () => {
    if (!currentQuestion) return null;

    return (
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Badge variant="outline" className="text-sm">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
              <Badge className={`text-xs ${
                currentQuestion.question_type === 'mcq' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {currentQuestion.question_type === 'mcq' ? 'Multiple Choice' : 'Coding'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {currentQuestion.points} points
              </Badge>
            </div>
            <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
              {currentQuestion.question_text}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleMarkForReview(currentQuestion.id)}
            className={`${
              markedForReview.has(currentQuestion.id) 
                ? 'text-orange-600 hover:text-orange-700' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {markedForReview.has(currentQuestion.id) ? (
              <Flag className="w-4 h-4" />
            ) : (
              <FlagOff className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Question Content */}
        {currentQuestion.question_type === 'mcq' && currentQuestion.options && (
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {currentQuestion.question_type === 'coding' && (
          <div className="space-y-4">
            {currentQuestion.starter_code && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Starter Code:</Label>
                <Textarea
                  value={answers[currentQuestion.id] || currentQuestion.starter_code}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="font-mono text-sm min-h-[200px] bg-gray-50"
                  placeholder="Write your solution here..."
                />
              </div>
            )}
            {currentQuestion.language_options && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Available Languages:</Label>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.language_options.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Auto-save Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {autoSaveStatus === 'saving' && (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                <span className="text-blue-600">Auto-saving...</span>
              </>
            )}
            {autoSaveStatus === 'saved' && (
              <>
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span className="text-green-600">Saved</span>
              </>
            )}
            {autoSaveStatus === 'idle' && (
              <>
                <Save className="w-3 h-3 text-gray-400" />
                <span className="text-gray-500">Auto-saved</span>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={saveProgress}
            className="text-xs"
          >
            <Save className="w-3 h-3 mr-1" />
            Save Now
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{assessment.title}</h2>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Timer */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            timeRemaining < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
          </div>

          {/* Pause/Resume */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            className="text-gray-600"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Question Navigator */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {questions.map((question, index) => {
            const status = getQuestionStatus(index);
            return (
              <Button
                key={question.id}
                variant="ghost"
                size="sm"
                onClick={() => jumpToQuestion(index)}
                className={`w-10 h-10 p-0 ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : status === 'answered'
                    ? 'bg-green-100 text-green-800'
                    : status === 'review'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
                {status === 'review' && <Flag className="w-2 h-2 absolute top-0 right-0" />}
              </Button>
            );
          })}
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-gray-600">Answered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded"></div>
            <span className="text-gray-600">Marked for Review</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
            <span className="text-gray-600">Unanswered</span>
          </div>
        </div>
      </Card>

      {/* Question Content */}
      <Card className="p-6">
        {renderQuestionContent()}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigateQuestion('previous')}
          disabled={currentQuestionIndex === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => toggleMarkForReview(currentQuestion.id)}
            className={`flex items-center space-x-2 ${
              markedForReview.has(currentQuestion.id)
                ? 'text-orange-600'
                : 'text-gray-600'
            }`}
          >
            {markedForReview.has(currentQuestion.id) ? (
              <>
                <Flag className="w-4 h-4" />
                <span>Marked</span>
              </>
            ) : (
              <>
                <FlagOff className="w-4 h-4" />
                <span>Mark for Review</span>
              </>
            )}
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => navigateQuestion('next')}
          disabled={currentQuestionIndex === questions.length - 1}
          className="flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Submit Section */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-600"
        >
          Back to Instructions
        </Button>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {Object.keys(answers).length} of {questions.length} answered
          </span>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Submit Assessment
          </Button>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Incomplete Assessment</h3>
              </div>
              <p className="text-gray-600 mb-6">
                You have answered {Object.keys(answers).length} out of {questions.length} questions. 
                Are you sure you want to submit?
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowWarning(false)}
                >
                  Continue Answering
                </Button>
                <Button
                  onClick={() => {
                    setShowWarning(false);
                    handleSubmit();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit Anyway
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}