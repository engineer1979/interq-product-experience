import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Clock, Code, CheckCircle2 } from "lucide-react";
import { MCQQuestion } from "@/components/interview/MCQQuestion";
import { CodingQuestion } from "@/components/interview/CodingQuestion";
import { useAuth } from "@/contexts/AuthContext";

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
  const [interview, setInterview] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime] = useState(Date.now());
  const [responses, setResponses] = useState<Record<string, any>>({});

  useEffect(() => {
    if (id) {
      fetchInterviewData();
    }
  }, [id]);

  const fetchInterviewData = async () => {
    try {
      setLoading(true);

      const { data: interviewData, error: interviewError } = await supabase
        .from('interviews')
        .select('*')
        .eq('id', id)
        .single();

      if (interviewError) throw interviewError;
      setInterview(interviewData);

      const { data: questionsData, error: questionsError } = await supabase
        .from('interview_questions')
        .select('*')
        .eq('interview_id', id)
        .order('order_index');

      if (questionsError) throw questionsError;

      // Transform the data to match our interface
      const transformedQuestions = questionsData?.map(q => ({
        ...q,
        options: q.options as any,
        test_cases: q.test_cases as any,
        language_options: q.language_options as any,
      })) || [];

      setQuestions(transformedQuestions);

    } catch (error: any) {
      console.error('Error fetching interview:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = async () => {
    const currentQuestion = questions[currentQuestionIndex];

    // Save current answer if provided
    if (responses[currentQuestion.id]) {
      await saveResponse(currentQuestion);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      await submitInterview();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const saveResponse = async (question: Question) => {
    try {
      const response = responses[question.id];

      if (question.question_type === 'mcq') {
        await supabase.from('interview_responses').upsert({
          interview_id: id,
          question_id: question.id,
          user_id: user?.id,
          answer_text: response,
          is_correct: response === question.correct_answer,
          points_earned: response === question.correct_answer ? question.points : 0,
        });
      } else if (question.question_type === 'coding') {
        // Coding evaluation happens via edge function
        const { data, error } = await supabase.functions.invoke('evaluate-code', {
          body: {
            questionId: question.id,
            code: response.code,
            language: response.language,
            userId: user?.id,
            interviewId: id,
          }
        });

        if (error) throw error;
      }
    } catch (error: any) {
      console.error('Error saving response:', error);
    }
  };

  const submitInterview = async () => {
    try {
      const timeTaken = Math.floor((Date.now() - startTime) / 60000);

      // Calculate total score
      const { data: responsesData } = await supabase
        .from('interview_responses')
        .select('points_earned')
        .eq('interview_id', id)
        .eq('user_id', user?.id);

      const totalPoints = responsesData?.reduce((sum, r) => sum + (r.points_earned || 0), 0) || 0;
      const maxPoints = questions.reduce((sum, q) => sum + q.points, 0);
      const percentage = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;

      await supabase.from('interview_results').insert({
        interview_id: id,
        user_id: user?.id,
        overall_score: percentage,
        technical_score: percentage,
        communication_score: 0,
        confidence_score: 0,
        ai_feedback: { completed: true, timeTaken },
      });

      toast({
        title: "Interview Submitted",
        description: "Your interview has been submitted successfully!",
      });

      navigate('/ai-interview');
    } catch (error: any) {
      console.error('Error submitting interview:', error);
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
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ProtectedRoute>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />

        <main className="flex-grow container mx-auto px-4 pt-28 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{interview?.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {interview?.duration_minutes} minutes
                </span>
                <span className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  {interview?.job_role}
                </span>
              </div>
            </div>

            {/* Progress */}
            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </Card>

            {/* Question */}
            {currentQuestion && (
              <div className="mb-6">
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
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="gap-2"
              >
                {currentQuestionIndex === questions.length - 1 ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Submit Interview
                  </>
                ) : (
                  'Next Question'
                )}
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}