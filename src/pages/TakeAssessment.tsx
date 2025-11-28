import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Clock, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { AssessmentTimer } from "@/components/assessment/AssessmentTimer";
import { AssessmentQuestion } from "@/components/assessment/AssessmentQuestion";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { ProctoringWarning } from "@/components/assessment/ProctoringWarning";
import { FaceDetection } from "@/components/assessment/FaceDetection";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  timer_enabled: boolean;
  grace_period_minutes: number;
  auto_submit_on_timeout: boolean;
  proctoring_enabled: boolean;
  face_detection_enabled: boolean;
  tab_switch_detection: boolean;
  max_tab_switches: number;
}

interface Question {
  id: string;
  question_text: string;
  options: any;
  order_index: number;
  points: number;
}

export default function TakeAssessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>("");
  const [tabSwitches, setTabSwitches] = useState(0);
  const [showProctoringWarning, setShowProctoringWarning] = useState(false);
  const [proctoringViolations, setProctoringViolations] = useState<string[]>([]);
  const autoSaveInterval = useRef<NodeJS.Timeout>();
  const lastActivityRef = useRef<number>(Date.now());
  const [copyPasteAttempts, setCopyPasteAttempts] = useState(0);

  useEffect(() => {
    if (id && user) {
      fetchAssessmentData();
    }
  }, [id, user]);

  // Copy-paste prevention
  useEffect(() => {
    if (!assessment) return;

    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      setCopyPasteAttempts(prev => {
        const newCount = prev + 1;
        setProctoringViolations(prev => [...prev, `Copy attempt detected at ${new Date().toLocaleTimeString()}`]);
        toast({
          title: "Action Blocked",
          description: "Copy-paste is disabled during the assessment",
          variant: "destructive",
        });
        return newCount;
      });
    };

    const preventPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      setCopyPasteAttempts(prev => {
        const newCount = prev + 1;
        setProctoringViolations(prev => [...prev, `Paste attempt detected at ${new Date().toLocaleTimeString()}`]);
        toast({
          title: "Action Blocked",
          description: "Copy-paste is disabled during the assessment",
          variant: "destructive",
        });
        return newCount;
      });
    };

    const preventCut = (e: ClipboardEvent) => {
      e.preventDefault();
      toast({
        title: "Action Blocked",
        description: "Cut operation is disabled during the assessment",
        variant: "destructive",
      });
    };

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast({
        title: "Action Blocked",
        description: "Right-click is disabled during the assessment",
        variant: "destructive",
      });
    };

    document.addEventListener('copy', preventCopy);
    document.addEventListener('paste', preventPaste);
    document.addEventListener('cut', preventCut);
    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('paste', preventPaste);
      document.removeEventListener('cut', preventCut);
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, [assessment, toast]);

  // Tab switch detection
  useEffect(() => {
    if (!assessment?.tab_switch_detection) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => {
          const newCount = prev + 1;
          if (assessment && newCount >= assessment.max_tab_switches) {
            setShowProctoringWarning(true);
            setProctoringViolations(prev => [...prev, `Tab switch detected at ${new Date().toLocaleTimeString()}`]);
          }
          updateSession({ tab_switches: newCount });
          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [assessment]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (sessionId) {
      autoSaveInterval.current = setInterval(() => {
        saveProgress();
      }, 30000);

      return () => {
        if (autoSaveInterval.current) {
          clearInterval(autoSaveInterval.current);
        }
      };
    }
  }, [sessionId, answers, currentQuestionIndex]);

  // Timer countdown
  useEffect(() => {
    if (!assessment?.timer_enabled || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (assessment.auto_submit_on_timeout) {
            handleSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, assessment]);

  const fetchAssessmentData = async () => {
    try {
      setLoading(true);
      
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', id)
        .single();

      if (assessmentError) throw assessmentError;
      setAssessment(assessmentData);

      const { data: questionsData, error: questionsError } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('assessment_id', id)
        .order('order_index');

      if (questionsError) throw questionsError;
      
      // Transform questions data to ensure options are arrays
      const transformedQuestions = (questionsData || []).map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : []
      }));
      setQuestions(transformedQuestions);

      // Create or resume session
      const { data: existingSession } = await supabase
        .from('assessment_sessions')
        .select('*')
        .eq('assessment_id', id)
        .eq('user_id', user?.id)
        .eq('completed', false)
        .maybeSingle();

      if (existingSession) {
        setSessionId(existingSession.id);
        setTimeRemaining(existingSession.time_remaining_seconds);
        setCurrentQuestionIndex(existingSession.current_question_index);
        setTabSwitches(existingSession.tab_switches || 0);
        // Load saved answers if any
      } else {
        const initialTime = assessmentData.duration_minutes * 60;
        const { data: newSession, error: sessionError } = await supabase
          .from('assessment_sessions')
          .insert({
            assessment_id: id,
            user_id: user?.id,
            time_remaining_seconds: initialTime,
            current_question_index: 0
          })
          .select()
          .single();

        if (sessionError) throw sessionError;
        setSessionId(newSession.id);
        setTimeRemaining(initialTime);
      }

    } catch (error: any) {
      console.error('Error fetching assessment:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate('/assessments');
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async () => {
    if (!sessionId) return;
    
    try {
      await supabase
        .from('assessment_sessions')
        .update({
          current_question_index: currentQuestionIndex,
          time_remaining_seconds: timeRemaining,
          tab_switches: tabSwitches,
        })
        .eq('id', sessionId);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const updateSession = async (updates: any) => {
    if (!sessionId) return;
    
    try {
      await supabase
        .from('assessment_sessions')
        .update(updates)
        .eq('id', sessionId);
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      saveProgress();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      saveProgress();
    }
  };

  const handleSubmit = async () => {
    try {
      // Calculate score
      let totalScore = 0;
      let totalPoints = 0;
      
      const answersArray = questions.map(q => {
        const userAnswer = answers[q.id];
        const isCorrect = false; // Will be evaluated server-side
        totalPoints += q.points;
        return {
          question_id: q.id,
          answer: userAnswer || "",
          is_correct: isCorrect,
          points_earned: 0
        };
      });

      // Insert result
      const { error: resultError } = await supabase
        .from('assessment_results')
        .insert({
          assessment_id: id,
          user_id: user?.id,
          score: totalScore,
          total_points: totalPoints,
          percentage: 0,
          passed: false,
          answers: answersArray,
          time_taken_minutes: assessment ? assessment.duration_minutes - Math.floor(timeRemaining / 60) : 0,
          tab_switches_count: tabSwitches,
          proctoring_flags: proctoringViolations,
          ip_address: '',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          started_at: new Date().toISOString()
        });

      if (resultError) throw resultError;

      // Mark session as completed
      await supabase
        .from('assessment_sessions')
        .update({ completed: true, submitted_at: new Date().toISOString() })
        .eq('id', sessionId);

      toast({
        title: "Assessment Submitted",
        description: "Your assessment has been submitted successfully!",
      });

      navigate('/assessments');
    } catch (error: any) {
      console.error('Error submitting assessment:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ProtectedRoute>
    );
  }

  if (!assessment) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
          {/* Face Detection */}
          {assessment.face_detection_enabled && (
            <FaceDetection
              enabled={assessment.face_detection_enabled}
              onViolation={(message) => {
                setProctoringViolations(prev => [...prev, message]);
              }}
            />
          )}

          {/* Header with Timer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{assessment.title}</h1>
                <p className="text-muted-foreground">{assessment.description}</p>
              </div>
              {assessment.timer_enabled && (
                <AssessmentTimer 
                  timeRemaining={timeRemaining} 
                  totalTime={assessment.duration_minutes * 60}
                  onTimeout={() => assessment.auto_submit_on_timeout && handleSubmit()}
                />
              )}
            </div>

            {/* Proctoring Warnings */}
            {assessment.tab_switch_detection && tabSwitches > 0 && (
              <Alert variant={tabSwitches >= assessment.max_tab_switches ? "destructive" : "default"} className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Tab switches detected: {tabSwitches}/{assessment.max_tab_switches}
                  {tabSwitches >= assessment.max_tab_switches && " - Maximum limit reached!"}
                </AlertDescription>
              </Alert>
            )}

            {copyPasteAttempts > 0 && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Copy-paste attempts detected: {copyPasteAttempts} - This activity is being logged
                </AlertDescription>
              </Alert>
            )}

            {assessment.face_detection_enabled && (
              <Alert className="mb-4">
                <Eye className="h-4 w-4" />
                <AlertDescription>
                  Face detection is active. Please ensure your face is visible throughout the assessment.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Progress Bar */}
          <AssessmentProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            answeredQuestions={Object.keys(answers).length}
          />

          {/* Question Card */}
          {currentQuestion && (
            <AssessmentQuestion
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id]}
              onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
              questionNumber={currentQuestionIndex + 1}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <Button onClick={handleSubmit} size="lg">
                Submit Assessment
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next Question
              </Button>
            )}
          </div>
        </main>

        <ProctoringWarning
          open={showProctoringWarning}
          onClose={() => setShowProctoringWarning(false)}
          violations={proctoringViolations}
        />

        <Footer />
      </div>
    </ProtectedRoute>
  );
}