import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Settings,
  Save,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { AudioVisualizer } from "@/components/voice/AudioVisualizer";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

interface LiveInterviewState {
  status: 'intro' | 'question' | 'listening' | 'processing' | 'completed' | 'error';
  currentQuestionIndex: number;
  questions: Array<{
    id: string;
    question_text: string;
    duration_seconds: number;
    order_index: number;
  }>;
  responses: Record<string, { audio: Blob; duration: number; text?: string }>;
  isRecording: boolean;
  recordingTime: number;
  maxRecordingTime: number;
  hasMicrophonePermission: boolean;
  isMuted: boolean;
  sessionId?: string;
}

export default function LiveInterview() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState<any>(null);
  const [state, setState] = useState<LiveInterviewState>({
    status: 'intro',
    currentQuestionIndex: 0,
    questions: [],
    responses: {},
    isRecording: false,
    recordingTime: 0,
    maxRecordingTime: 120, // 2 minutes max
    hasMicrophonePermission: false,
    isMuted: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordingStartTimeRef = useRef<number>(0);

  // Fetch interview data
  const fetchInterviewData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get interview ID from URL or create new one
      const interviewId = new URLSearchParams(window.location.search).get('id') || 'demo';
      
      if (interviewId === 'demo') {
        // Demo questions for practice
        setInterview({
          title: "Live Interview Practice",
          description: "Practice your live interview skills with AI-generated questions",
          job_role: "General Practice",
          duration_minutes: 10,
          difficulty: "medium",
        });
        
        setState(prev => ({
          ...prev,
          questions: [
            {
              id: "1",
              question_text: "Tell me about yourself and your background.",
              duration_seconds: 60,
              order_index: 0,
            },
            {
              id: "2", 
              question_text: "Describe a challenging project you worked on and how you overcame obstacles.",
              duration_seconds: 90,
              order_index: 1,
            },
            {
              id: "3",
              question_text: "What are your career goals and how does this position align with them?",
              duration_seconds: 60,
              order_index: 2,
            },
          ],
        }));
      } else {
        // Fetch from database
        const { data: interviewData, error: interviewError } = await supabase
          .from('interviews')
          .select('*')
          .eq('id', interviewId)
          .single();

        if (interviewError) throw interviewError;

        const { data: questionsData, error: questionsError } = await supabase
          .from('interview_questions')
          .select('*')
          .eq('interview_id', interviewId)
          .order('order_index', { ascending: true });

        if (questionsError) throw questionsError;

        setInterview(interviewData);
        setState(prev => ({
          ...prev,
          questions: questionsData || [],
        }));
      }
    } catch (error) {
      console.error('Error fetching interview data:', error);
      toast({
        title: "Error",
        description: "Failed to load interview data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setState(prev => ({ ...prev, hasMicrophonePermission: true }));
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      toast({
        title: "Microphone Required",
        description: "Please allow microphone access to participate in the interview.",
        variant: "destructive",
      });
      setState(prev => ({ ...prev, hasMicrophonePermission: false }));
      return false;
    }
  };

  // Start recording
  const startRecording = async () => {
    if (!state.hasMicrophonePermission) {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const duration = Date.now() - recordingStartTimeRef.current;
        
        setState(prev => ({
          ...prev,
          responses: {
            ...prev.responses,
            [prev.questions[prev.currentQuestionIndex]?.id]: {
              audio: audioBlob,
              duration: duration,
            },
          },
          status: 'processing',
        }));

        // Simulate processing
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            status: 'question',
          }));
        }, 1500);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      recordingStartTimeRef.current = Date.now();

      setState(prev => ({
        ...prev,
        isRecording: true,
        recordingTime: 0,
        status: 'listening',
      }));

      // Start recording timer
      recordingIntervalRef.current = setInterval(() => {
        setState(prev => ({
          ...prev,
          recordingTime: prev.recordingTime + 1,
        }));
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Failed to start recording. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isRecording: false,
    }));
  };

  // Next question
  const nextQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        status: 'question',
      }));
    } else {
      // Interview completed
      setState(prev => ({ ...prev, status: 'completed' }));
      submitInterview();
    }
  };

  // Submit interview
  const submitInterview = async () => {
    try {
      // Here you would typically upload the audio responses to your server
      // For demo purposes, we'll just show a success message
      toast({
        title: "Interview Completed!",
        description: "Your live interview responses have been recorded successfully.",
        variant: "success",
      });

      // Navigate to results or dashboard after a delay
      setTimeout(() => {
        navigate('/interviews');
      }, 3000);

    } catch (error) {
      console.error('Error submitting interview:', error);
      toast({
        title: "Submission Error",
        description: "Failed to submit interview. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Utility functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetInterview = () => {
    setState({
      status: 'intro',
      currentQuestionIndex: 0,
      questions: state.questions,
      responses: {},
      isRecording: false,
      recordingTime: 0,
      maxRecordingTime: 120,
      hasMicrophonePermission: state.hasMicrophonePermission,
      isMuted: false,
    });
  };

  // Effects
  useEffect(() => {
    fetchInterviewData();
  }, [fetchInterviewData]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  // Render functions
  const renderIntro = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
        <Mic className="w-12 h-12 text-primary" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">{interview?.title || "Live Interview Practice"}</h2>
        <p className="text-muted-foreground mb-6">
          {interview?.description || "Practice your live interview skills with AI-generated questions"}
        </p>
      </div>

      <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
        <p className="mb-2"><strong>Instructions:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Click the microphone button to start recording your response</li>
          <li>Speak clearly and answer the question thoroughly</li>
          <li>You have up to 2 minutes per question</li>
          <li>Click stop when you're finished with your response</li>
        </ul>
      </div>

      <Button 
        size="lg" 
        onClick={() => setState(prev => ({ ...prev, status: 'question' }))}
        className="min-w-32"
      >
        Start Interview
      </Button>
    </div>
  );

  const renderQuestion = () => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return null;

    const hasResponse = state.responses[currentQuestion.id];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline">Question {state.currentQuestionIndex + 1} of {state.questions.length}</Badge>
            <Badge variant="outline">{formatTime(currentQuestion.duration_seconds)} max</Badge>
          </div>
          
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question_text}</h2>
        </div>

        {hasResponse ? (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Response recorded ({formatTime(Math.floor(hasResponse.duration / 1000))})</span>
            </div>
          </div>
        ) : (
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Click the microphone button below to start recording your response.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center">
          {!state.isRecording ? (
            <Button
              size="lg"
              onClick={startRecording}
              className="rounded-full w-20 h-20"
              variant={hasResponse ? "outline" : "default"}
            >
              <Mic className="w-8 h-8" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={stopRecording}
              className="rounded-full w-20 h-20"
              variant="destructive"
            >
              <Square className="w-8 h-8" />
            </Button>
          )}
        </div>

        {hasResponse && (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setState(prev => ({
                  ...prev,
                  responses: {
                    ...prev.responses,
                    [currentQuestion.id]: undefined,
                  },
                }));
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Re-record
            </Button>
            <Button onClick={nextQuestion}>
              {state.currentQuestionIndex < state.questions.length - 1 ? 'Next Question' : 'Finish Interview'}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderListening = () => (
    <div className="text-center space-y-6">
      <div className="w-32 h-32 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
        <div className="w-8 h-8 bg-destructive rounded-full animate-pulse" />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Recording in Progress</h2>
        <p className="text-muted-foreground">Speak now... your response is being recorded</p>
      </div>

      <div className="text-3xl font-mono">
        {formatTime(state.recordingTime)}
      </div>

      <AudioVisualizer isActive={true} />

      <Button 
        variant="destructive" 
        onClick={stopRecording}
        className="min-w-32"
      >
        Stop Recording
      </Button>
    </div>
  );

  const renderProcessing = () => (
    <div className="text-center space-y-6">
      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Processing Response</h2>
        <p className="text-muted-foreground">Analyzing your audio response...</p>
      </div>
    </div>
  );

  const renderCompleted = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Interview Completed!</h2>
        <p className="text-muted-foreground">
          Thank you for completing the live interview. Your responses have been recorded successfully.
        </p>
      </div>

      <div className="flex justify-center gap-2">
        <Button variant="outline" onClick={resetInterview}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button onClick={() => navigate('/interviews')}>
          Back to Interviews
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col bg-background">
          <Navigation />
          <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">Live Interview</h1>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">{state.currentQuestionIndex + 1} of {state.questions.length}</Badge>
                  <Badge variant="outline">{formatTime(state.recordingTime)}</Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setState(prev => ({ ...prev, isMuted: !prev.isMuted }))}
                >
                  {state.isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/ai-interview')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <Progress 
              value={((state.currentQuestionIndex + (state.status === 'completed' ? 1 : 0)) / state.questions.length) * 100} 
              className="h-2" 
            />
          </div>

          {/* Content */}
          <Card className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {state.status === 'intro' && renderIntro()}
                {state.status === 'question' && renderQuestion()}
                {state.status === 'listening' && renderListening()}
                {state.status === 'processing' && renderProcessing()}
                {state.status === 'completed' && renderCompleted()}
              </motion.div>
            </AnimatePresence>
          </Card>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}