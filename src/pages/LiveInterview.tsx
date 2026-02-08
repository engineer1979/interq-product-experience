import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";
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
  Loader2,
  Video,
  Shield,
  Brain,
  TrendingUp,
  ChevronRight,
  Circle,
  MessageSquare
} from "lucide-react";
import { AudioVisualizer } from "@/components/voice/AudioVisualizer";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

const LIVE_STEPS = [
  { id: 1, title: 'Select', description: 'Choose role' },
  { id: 2, title: 'Instructions', description: 'Guidelines' },
  { id: 3, title: 'Tech Check', description: 'Test audio' },
  { id: 4, title: 'Live Session', description: 'Interview' },
  { id: 5, title: 'Results', description: 'Reporting' }
];

interface LiveInterviewState {
  status: 'landing' | 'intro' | 'tech-check' | 'question' | 'listening' | 'processing' | 'completed' | 'error';
  currentStep: number;
  currentQuestionIndex: number;
  questions: Array<{
    id: string;
    question_text: string;
    time_limit_minutes?: number | null;
    order_index: number;
  }>;
  responses: Record<string, { audio: Blob; duration: number; text?: string }>;
  isRecording: boolean;
  recordingTime: number;
  maxRecordingTime: number;
  hasMicrophonePermission: boolean;
  isMuted: boolean;
  sessionId?: string;
  isTechCheckPassed: boolean;
}

export default function LiveInterview() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState<any>(null);
  const [state, setState] = useState<LiveInterviewState>({
    status: 'landing',
    currentStep: 1,
    currentQuestionIndex: 0,
    questions: [],
    responses: {},
    isRecording: false,
    recordingTime: 0,
    maxRecordingTime: 120, // 2 minutes max
    hasMicrophonePermission: false,
    isMuted: false,
    isTechCheckPassed: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordingStartTimeRef = useRef<number>(0);

  // Fetch interview data
  const fetchInterviewData = useCallback(async () => {
    try {
      setLoading(true);

      const interviewId = new URLSearchParams(window.location.search).get('id') || 'demo';

      if (interviewId === 'demo') {
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
              time_limit_minutes: 1,
              order_index: 0,
            },
            {
              id: "2",
              question_text: "Describe a challenging project you worked on and how you overcame obstacles.",
              time_limit_minutes: 1.5,
              order_index: 1,
            },
            {
              id: "3",
              question_text: "What are your career goals and how does this position align with them?",
              time_limit_minutes: 1,
              order_index: 2,
            },
          ],
        }));
      } else {
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
          questions: (questionsData || []).map(q => ({
            id: q.id,
            question_text: q.question_text,
            time_limit_minutes: q.time_limit_minutes,
            order_index: q.order_index
          })),
        }));
      }
    } catch (error) {
      console.error('Error fetching interview data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setState(prev => ({ ...prev, hasMicrophonePermission: true }));
      return true;
    } catch (error) {
      toast({
        title: "Microphone Required",
        description: "Please allow microphone access to participate in the interview.",
        variant: "destructive",
      });
      return false;
    }
  };

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
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const duration = Date.now() - recordingStartTimeRef.current;

        setState(prev => {
          if (prev.status === 'tech-check') {
            return { ...prev, isTechCheckPassed: true };
          }
          return {
            ...prev,
            responses: {
              ...prev.responses,
              [prev.questions[prev.currentQuestionIndex]?.id]: {
                audio: audioBlob,
                duration: duration,
              },
            },
            status: 'processing',
          };
        });

        if (state.status !== 'tech-check') {
          setTimeout(() => {
            setState(prev => ({ ...prev, status: 'question' }));
          }, 1500);
        }

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      recordingStartTimeRef.current = Date.now();

      setState(prev => ({
        ...prev,
        isRecording: true,
        recordingTime: 0,
        status: prev.status === 'tech-check' ? 'tech-check' : 'listening',
      }));

      recordingIntervalRef.current = setInterval(() => {
        setState(prev => ({
          ...prev,
          recordingTime: prev.recordingTime + 1,
        }));
      }, 1000);

    } catch (error) {
      toast({
        title: "Recording Error",
        description: "Failed to start recording.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    setState(prev => ({ ...prev, isRecording: false }));
  };

  const nextQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        status: 'question',
      }));
    } else {
      setState(prev => ({ ...prev, status: 'completed', currentStep: 5 }));
      submitInterview();
    }
  };

  const submitInterview = async () => {
    toast({
      title: "Interview Completed!",
      description: "Your live interview responses have been analyzed successfully.",
      variant: "default",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    fetchInterviewData();
  }, [fetchInterviewData]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') mediaRecorderRef.current.stop();
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, []);

  const renderLanding = () => (
    <div className="space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Live <span className="text-primary italic">Interview</span> Experience
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect your microphone and engage in a structured live interview session powered by our real-time analysis engine.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => setState(prev => ({ ...prev, status: 'intro', currentStep: 2 }))}>
            Begin Setup <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/create-interview')}>
            Browse Roles
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {[
          { icon: Shield, title: "Secure Audio", desc: "Encrypted live stream" },
          { icon: Brain, title: "Live Synthesis", desc: "Real-time AI mapping" },
          { icon: TrendingUp, title: "Deep Analytics", desc: "Question-by-question scoring" },
          { icon: MessageSquare, title: "Immediate Feedback", desc: "Instant result generation" },
        ].map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 bg-card border rounded-2xl">
            <div className="p-3 bg-primary/10 text-primary rounded-xl mb-4">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="font-bold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIntro = () => (
    <div className="text-center space-y-8 py-8">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mic className="w-12 h-12 text-primary" />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-4">{interview?.title || "Live Interview Practice"}</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          You are about to start a live session for <strong>{interview?.job_role}</strong>. Please ensure you are in a quiet environment.
        </p>
      </div>

      <div className="max-w-md mx-auto bg-muted rounded-2xl p-6 text-left space-y-3">
        <p className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Session Protocol:</p>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            <span className="text-sm">Click the mic to record; click square to stop.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            <span className="text-sm">Speak naturally; our AI handles the transcription.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            <span className="text-sm">You have maximum {state.maxRecordingTime / 60} minutes per response.</span>
          </li>
        </ul>
      </div>

      <Button size="lg" className="px-12 h-14" onClick={() => setState(prev => ({ ...prev, status: 'tech-check', currentStep: 3 }))}>
        Go to Tech Check
      </Button>
    </div>
  );

  const renderTechCheck = () => (
    <div className="text-center space-y-8 py-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Audio Test</h2>
        <p className="text-muted-foreground">Say a few words to calibrate your microphone.</p>
      </div>

      <div className="max-w-md mx-auto p-12 bg-muted/50 rounded-3xl border-2 border-dashed border-primary/20">
        <AudioVisualizer isRecording={state.isRecording} isActive={true} className="mb-8" />
        <div className="flex flex-col items-center gap-4">
          {!state.isRecording ? (
            <Button onClick={startRecording} size="lg" variant="outline" className="rounded-full w-24 h-24 p-0">
              <Mic className="h-10 w-10 text-primary" />
            </Button>
          ) : (
            <Button onClick={stopRecording} size="lg" variant="destructive" className="rounded-full w-24 h-24 p-0">
              <Square className="h-10 w-10" />
            </Button>
          )}
          <span className="font-medium">{state.isRecording ? "Listening..." : "Click to test"}</span>
        </div>
      </div>

      {state.isTechCheckPassed && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Alert className="max-w-md mx-auto bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">Your audio setup is optimal.</AlertDescription>
          </Alert>
          <Button size="lg" onClick={() => setState(prev => ({ ...prev, status: 'question', currentStep: 4 }))}>
            Enter Live Session
          </Button>
        </motion.div>
      )}
    </div>
  );

  const renderSession = () => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return null;
    const hasResponse = state.responses[currentQuestion.id];

    return (
      <div className="space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <Badge variant="outline" className="px-4 py-1">Question {state.currentQuestionIndex + 1} of {state.questions.length}</Badge>
          <h2 className="text-4xl font-black leading-tight max-w-3xl">{currentQuestion.question_text}</h2>
        </div>

        <div className="relative max-w-lg mx-auto p-12 bg-primary/5 rounded-[3rem] border border-primary/10">
          {state.status === 'listening' ? (
            <div className="space-y-8 flex flex-col items-center">
              <AudioVisualizer isRecording={true} isActive={true} />
              <div className="text-5xl font-mono tracking-tighter">{formatTime(state.recordingTime)}</div>
              <Button onClick={stopRecording} size="lg" variant="destructive" className="rounded-full w-16 h-16"><Square /></Button>
            </div>
          ) : state.status === 'processing' ? (
            <div className="py-12 flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="font-black text-xs uppercase tracking-widest text-primary animate-pulse">Syncing Neural Vectors</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-8">
              <p className="text-muted-foreground text-center">Ready when you are. Click the mic to answer.</p>
              <Button onClick={startRecording} size="lg" className="rounded-full w-24 h-24 shadow-glow"><Mic className="h-10 w-10" /></Button>
              {hasResponse && (
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setState(prev => ({ ...prev, responses: { ...prev.responses, [currentQuestion.id]: undefined } }))}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                  <Button onClick={nextQuestion}>
                    {state.currentQuestionIndex < state.questions.length - 1 ? "Next Step" : "Submit Analysis"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCompleted = () => (
    <div className="text-center space-y-12 py-12">
      <div className="w-32 h-32 bg-green-100 rounded-[2rem] flex items-center justify-center mx-auto rotate-3">
        <CheckCircle2 className="w-16 h-16 text-green-600" />
      </div>

      <div className="space-y-4">
        <h2 className="text-5xl font-black tracking-tighter">Session Optimized</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your live interview has been processed. Detailed analytics and scoring metrics are now available in your recruiter dashboard.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {[
          { label: "Overall Score", value: "88%", color: "text-blue-600" },
          { label: "Confidence", value: "High", color: "text-green-600" },
          { label: "Tech Match", value: "92%", color: "text-purple-600" },
        ].map((stat, i) => (
          <Card key={i} className="p-6">
            <p className="text-xs uppercase font-black text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button size="lg" onClick={() => navigate('/interviews')}>
          Review Library
        </Button>
        <Button size="lg" variant="outline" onClick={() => window.location.reload()}>
          Practice Again
        </Button>
      </div>
    </div>
  );

  const handleStepClick = (stepId: number) => {
    let status: LiveInterviewState['status'] = 'landing';
    switch (stepId) {
      case 1: status = 'landing'; break;
      case 2: status = 'intro'; break;
      case 3: status = 'tech-check'; break;
      case 4: status = 'question'; break;
      case 5: status = 'completed'; break;
    }
    setState(prev => ({ ...prev, status, currentStep: stepId }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <EnhancedNavigation />

      <main className="flex-grow container mx-auto px-4 pt-40 pb-20 max-w-6xl">
        {state.status !== 'landing' && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-black uppercase tracking-widest text-primary">Live Workflow</h1>
              <Button variant="ghost" className="text-muted-foreground" onClick={() => setState(prev => ({ ...prev, status: 'landing', currentStep: 1 }))}>Exit Workflow</Button>
            </div>

            <div className="flex items-center justify-between w-full mb-4 px-2">
              {LIVE_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className="flex flex-col items-center group appearance-none bg-transparent border-none p-0 cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${state.currentStep >= step.id ? 'bg-primary border-primary text-white shadow-glow' : 'border-muted text-muted-foreground hover:border-primary/50'
                      }`}>
                      {state.currentStep > step.id ? <CheckCircle2 className="h-6 w-6" /> : <span className="font-bold">{step.id}</span>}
                    </div>
                    <div className="mt-2 text-center hidden sm:block">
                      <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${state.currentStep >= step.id ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>{step.title}</p>
                    </div>
                  </button>
                  {index < LIVE_STEPS.length - 1 && (
                    <div className={`h-[2px] flex-1 mx-4 transition-all ${state.currentStep > step.id ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`${state.status === 'landing' ? '' : 'bg-card border-0'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={state.status}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: 'circOut' }}
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-4">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Initializing Engine</p>
                </div>
              ) : (
                <>
                  {state.status === 'landing' && renderLanding()}
                  {state.status === 'intro' && renderIntro()}
                  {state.status === 'tech-check' && renderTechCheck()}
                  {(state.status === 'question' || state.status === 'listening' || state.status === 'processing') && renderSession()}
                  {state.status === 'completed' && renderCompleted()}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <EnhancedFooter />
    </div>
  );
}