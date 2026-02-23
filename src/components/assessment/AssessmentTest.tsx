import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Flag, FlagOff, Save, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Pause, Play } from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  passing_score: number;
  total_questions: number;
  difficulty: string;
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

interface AssessmentTestProps {
  assessment: Assessment;
  questions: Question[];
  onComplete: (answers: Record<string, string>, markedForReview: Set<string>) => void;
  onBack: () => void;
  sessionId: string;
  userId: string;
}

export function AssessmentTest({ assessment, questions, onComplete, onBack, sessionId, userId }: AssessmentTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(assessment.duration_minutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const { toast } = useToast();
  const autoSaveInterval = useRef<NodeJS.Timeout>();
  const timerInterval = useRef<NodeJS.Timeout>();
  const currentQuestion = questions[currentQuestionIndex];

  const saveProgress = useCallback(async () => {
    if (!sessionId) return;
    setAutoSaveStatus('saving');
    try {
      await supabase
        .from('assessment_sessions')
        .update({ current_question_index: currentQuestionIndex, time_remaining_seconds: timeRemaining, last_activity_at: new Date().toISOString() })
        .eq('id', sessionId);

      for (const [questionId, answer] of Object.entries(answers)) {
        await (supabase as any)
          .from('assessment_answers')
          .upsert({ session_id: sessionId, question_id: questionId, answer: String(answer), updated_at: new Date().toISOString() }, { onConflict: 'session_id,question_id' });
      }
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving progress:', error);
      setAutoSaveStatus('idle');
    }
  }, [sessionId, currentQuestionIndex, timeRemaining, answers]);

  const handleTimeUp = useCallback(() => {
    toast({ title: "Time's up!", description: 'Your assessment has been automatically submitted.', variant: 'destructive' });
    saveProgress();
    onComplete(answers, markedForReview);
  }, [toast, saveProgress, onComplete, answers, markedForReview]);

  const loadSessionData = useCallback(async () => {
    try {
      const { data: sessionData } = await supabase.from('assessment_sessions').select('*').eq('id', sessionId).single();
      if (sessionData) {
        setCurrentQuestionIndex(sessionData.current_question_index || 0);
        setTimeRemaining(sessionData.time_remaining_seconds || assessment.duration_minutes * 60);

        const { data: savedAnswers } = await (supabase as any).from('assessment_answers').select('*').eq('session_id', sessionId);
        if (savedAnswers) {
          const loadedAnswers: Record<string, string> = {};
          savedAnswers.forEach((a: any) => { loadedAnswers[a.question_id] = a.answer; });
          setAnswers(loadedAnswers);
        }
      }
    } catch (error) {
      console.error('Error loading session data:', error);
    }
  }, [sessionId, assessment.duration_minutes]);

  useEffect(() => { if (sessionId) loadSessionData(); }, [sessionId, loadSessionData]);

  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      timerInterval.current = setInterval(() => {
        setTimeRemaining(prev => { if (prev <= 1) { handleTimeUp(); return 0; } return prev - 1; });
      }, 1000);
    }
    return () => { if (timerInterval.current) clearInterval(timerInterval.current); };
  }, [isPaused, timeRemaining, handleTimeUp]);

  useEffect(() => {
    autoSaveInterval.current = setInterval(() => { saveProgress(); }, 30000);
    return () => { if (autoSaveInterval.current) clearInterval(autoSaveInterval.current); };
  }, [saveProgress]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => { if (Object.keys(answers).length > 0) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const toggleMarkForReview = (questionId: string) => {
    setMarkedForReview(prev => { const s = new Set(prev); s.has(questionId) ? s.delete(questionId) : s.add(questionId); return s; });
  };

  const navigateQuestion = (direction: 'next' | 'previous') => {
    if (direction === 'next' && currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
    else if (direction === 'previous' && currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
  };

  const jumpToQuestion = (index: number) => setCurrentQuestionIndex(index);

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) { setShowWarning(true); return; }
    saveProgress();
    onComplete(answers, markedForReview);
  };

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  const getQuestionStatus = (index: number) => {
    const q = questions[index];
    if (markedForReview.has(q.id)) return 'review';
    if (answers[q.id]) return 'answered';
    return 'unanswered';
  };

  const renderQuestionContent = () => {
    if (!currentQuestion) return null;
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Badge variant="outline">Question {currentQuestionIndex + 1} of {questions.length}</Badge>
              <Badge className={currentQuestion.question_type === 'mcq' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>{currentQuestion.question_type === 'mcq' ? 'Multiple Choice' : 'Coding'}</Badge>
              <Badge variant="outline">{currentQuestion.points} points</Badge>
            </div>
            <h3 className="text-lg font-medium leading-relaxed">{currentQuestion.question_text}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => toggleMarkForReview(currentQuestion.id)} className={markedForReview.has(currentQuestion.id) ? 'text-orange-600' : 'text-muted-foreground'}>
            {markedForReview.has(currentQuestion.id) ? <Flag className="w-4 h-4" /> : <FlagOff className="w-4 h-4" />}
          </Button>
        </div>

        {currentQuestion.question_type === 'mcq' && currentQuestion.options && (
          <RadioGroup value={answers[currentQuestion.id] || ''} onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)} className="space-y-3">
            {currentQuestion.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {currentQuestion.question_type === 'coding' && (
          <div className="space-y-4">
            <Textarea
              value={answers[currentQuestion.id] || currentQuestion.starter_code || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="font-mono text-sm min-h-[200px] bg-muted/30"
              placeholder="Write your solution here..."
            />
            {currentQuestion.language_options && (
              <div className="flex flex-wrap gap-2">
                {currentQuestion.language_options.map(lang => <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>)}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {autoSaveStatus === 'saving' && <><div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div><span className="text-primary">Auto-saving...</span></>}
            {autoSaveStatus === 'saved' && <><CheckCircle className="w-3 h-3 text-green-600" /><span className="text-green-600">Saved</span></>}
            {autoSaveStatus === 'idle' && <><Save className="w-3 h-3 text-muted-foreground" /><span className="text-muted-foreground">Auto-saved</span></>}
          </div>
          <Button variant="ghost" size="sm" onClick={saveProgress} className="text-xs"><Save className="w-3 h-3 mr-1" />Save Now</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{assessment.title}</h2>
          <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${timeRemaining < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
            <Clock className="w-4 h-4" /><span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsPaused(!isPaused)}>{isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}</Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {questions.map((q, index) => {
            const status = getQuestionStatus(index);
            return (
              <Button key={q.id} variant="ghost" size="sm" onClick={() => jumpToQuestion(index)}
                className={`w-10 h-10 p-0 ${index === currentQuestionIndex ? 'bg-primary text-primary-foreground' : status === 'answered' ? 'bg-green-100 text-green-800' : status === 'review' ? 'bg-orange-100 text-orange-800' : 'bg-muted text-muted-foreground'}`}>
                {index + 1}
              </Button>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">{renderQuestionContent()}</Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigateQuestion('previous')} disabled={currentQuestionIndex === 0}><ChevronLeft className="w-4 h-4 mr-1" />Previous</Button>
        <div className="flex items-center space-x-4">
          {showWarning && (
            <div className="flex items-center text-orange-600 text-sm"><AlertTriangle className="w-4 h-4 mr-1" />Some questions unanswered</div>
          )}
          <Button onClick={handleSubmit} variant="destructive">Submit Assessment</Button>
        </div>
        <Button onClick={() => navigateQuestion('next')} disabled={currentQuestionIndex === questions.length - 1}>Next<ChevronRight className="w-4 h-4 ml-1" /></Button>
      </div>
    </div>
  );
}
