import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Clock, CheckCircle2, ArrowLeft, ArrowRight, Brain, Zap } from "lucide-react";
import { MCQQuestion } from "@/components/interview/MCQQuestion";
import { CodingQuestion } from "@/components/interview/CodingQuestion";
import { AIVideoInterviewer } from "@/components/interview/AIVideoInterviewer";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

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

export default function TakeInterview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [interview, setInterview] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [session, setSession] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchInterviewData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: interviewData, error: interviewError } = await supabase.from('interviews').select('*').eq('id', id).single();
      if (interviewError) throw interviewError;
      setInterview(interviewData);

      const { data: questionsData, error: questionsError } = await supabase.from('interview_questions').select('*').eq('interview_id', id).order('order_index');
      if (questionsError) throw questionsError;

      const transformedQuestions = questionsData?.map(q => ({ ...q, options: q.options as any, test_cases: q.test_cases as any, language_options: q.language_options as any })) || [];
      setQuestions(transformedQuestions);

      if (user) {
        const { data: existingSession } = await (supabase as any).from('interview_sessions').select('*').eq('interview_id', id).eq('user_id', user.id).eq('completed', false).maybeSingle();

        if (existingSession) {
          setSession(existingSession);
          setCurrentQuestionIndex(existingSession.current_question_index || 0);
          setResponses(existingSession.responses || {});
        } else {
          const { data: createdSession } = await (supabase as any).from('interview_sessions').insert({
            interview_id: id, user_id: user.id, current_question_index: 0, responses: {}, start_time: new Date().toISOString(), completed: false, time_remaining_seconds: (interviewData.duration_minutes || 60) * 60
          }).select().single();
          setSession(createdSession);
        }
      }
    } catch (error: any) {
      console.error('Error fetching interview:', error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
      navigate('/ai-interview');
    } finally {
      setLoading(false);
    }
  }, [id, user, navigate, toast]);

  const saveProgress = useCallback(async () => {
    if (!session?.id || !user) return;
    try {
      setSaving(true);
      await (supabase as any).from('interview_sessions').update({
        current_question_index: currentQuestionIndex, responses, updated_at: new Date().toISOString()
      }).eq('id', session.id);
    } catch (error) { console.error('Save failed:', error); }
    finally { setSaving(false); }
  }, [session, currentQuestionIndex, responses, user]);

  useEffect(() => { if (id && user) fetchInterviewData(); }, [id, user, fetchInterviewData]);

  const validateCurrentQuestion = (): boolean => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return true;
    const response = responses[currentQuestion.id];
    const errors: Record<string, string> = {};
    if (currentQuestion.question_type === 'mcq' && !response) errors[currentQuestion.id] = "Please select an answer";
    else if (currentQuestion.question_type === 'coding' && (!response?.code || response.code.trim() === '')) errors[currentQuestion.id] = "Please write your code solution";
    else if (currentQuestion.question_type === 'video' && !response?.transcript) errors[currentQuestion.id] = "Video recording is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setResponses(prev => ({ ...prev, [questionId]: answer }));
    setValidationErrors(prev => { const n = { ...prev }; delete n[questionId]; return n; });
  };

  const handlePrevious = () => { if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1); };

  const handleNext = async () => {
    if (!validateCurrentQuestion()) { toast({ title: "Action Required", description: validationErrors[questions[currentQuestionIndex].id], variant: "destructive" }); return; }
    await saveProgress();
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
    else await submitInterview();
  };

  const submitInterview = async () => {
    if (!user || !session) return;
    try {
      setIsSubmitting(true);
      let totalPoints = 0, earnedPoints = 0;
      for (const question of questions) {
        const response = responses[question.id];
        if (!response) continue;
        if (question.question_type === 'mcq') { const isCorrect = response === question.correct_answer; totalPoints += question.points; earnedPoints += isCorrect ? question.points : 0; }
        else { totalPoints += question.points; earnedPoints += Math.floor(question.points * 0.8); }
      }
      const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      await (supabase as any).from('interview_sessions').update({ completed: true, completed_at: new Date().toISOString(), final_score: percentage }).eq('id', session.id);
      toast({ title: "Assessment Synchronized", description: "Your responses are being analyzed by our AI models." });
      navigate('/ai-interview');
    } catch (error: any) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    finally { setIsSubmitting(false); }
  };

  if (loading) {
    return (<ProtectedRoute><div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="relative mb-8"><div className="w-24 h-24 rounded-[2rem] border-4 border-primary/20 border-t-primary animate-spin" /><Brain className="absolute inset-0 m-auto text-primary animate-pulse" size={40} /></div>
      <p className="text-2xl font-black tracking-tight mb-2">Connecting to InterQ Engine...</p>
    </div></ProtectedRoute>);
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
        <Navigation />
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
          <div className="absolute top-[5%] right-[5%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        </div>
        <main className="flex-grow container mx-auto px-4 py-32 max-w-5xl">
          <div className="mb-12 border-b border-border/50 pb-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
              <div>
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.2em] font-black text-[10px] mb-2">Live Session</Badge>
                <h1 className="text-4xl font-black tracking-tight leading-none">{interview?.title}</h1>
                <div className="flex flex-wrap gap-6 text-sm font-bold text-muted-foreground mt-4">
                  <span className="flex items-center gap-2"><Clock size={16} className="text-primary" />{interview?.duration_minutes}m</span>
                  <span className="flex items-center gap-2"><Zap size={16} className="text-primary" />LEVEL: {currentQuestion.difficulty?.toUpperCase()}</span>
                  <Badge variant="secondary">Q {currentQuestionIndex + 1}/{questions.length}</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-muted-foreground"><span>Progress</span><span>{Math.round(progress)}%</span></div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-primary transition-all duration-700" /></div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }} className="mb-12">
              {currentQuestion.question_type === 'video' ? (
                <AIVideoInterviewer question={currentQuestion} onComplete={(data) => handleAnswerChange(currentQuestion.id, data)} />
              ) : (
                <div className="bg-card/50 backdrop-blur-xl border border-primary/20 rounded-[2.5rem] p-8 sm:p-12 shadow-lg relative overflow-hidden">
                  {currentQuestion.question_type === 'mcq' ? (
                    <MCQQuestion question={currentQuestion} selectedAnswer={responses[currentQuestion.id]} onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)} />
                  ) : (
                    <CodingQuestion question={currentQuestion} code={responses[currentQuestion.id]} onCodeChange={(code) => handleAnswerChange(currentQuestion.id, code)} />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {currentQuestion.question_type !== 'video' && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <Button variant="ghost" onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="h-14 px-8 rounded-2xl font-bold"><ArrowLeft className="mr-2 h-5 w-5" />Previous</Button>
              <div className="hidden md:flex items-center gap-1.5">{questions.map((_, i) => <div key={i} className={`w-8 h-1 rounded-full transition-all ${i === currentQuestionIndex ? "bg-primary scale-x-125" : "bg-muted"}`} />)}</div>
              <Button onClick={handleNext} disabled={isSubmitting} className="h-14 px-10 rounded-2xl font-black">
                {currentQuestionIndex === questions.length - 1 ? <><CheckCircle2 className="mr-2 h-5 w-5" />{isSubmitting ? 'Synchronizing...' : 'Finalize'}</> : <>Next <ArrowRight className="ml-2 h-5 w-5" /></>}
              </Button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
