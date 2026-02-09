import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, Square, CheckCircle2, Loader2, ArrowRight, Video, Settings, UserCheck, X, Ear, Briefcase, Tag, Award, AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";
import { interviewTypes, questionPool, type InterviewQuestion } from "@/data/interview-questions";
import { OpenEndedInteraction } from "@/components/interview/OpenEndedInteraction";
import { MultipleChoiceInteraction } from "@/components/interview/MultipleChoiceInteraction";
import { CodingInteraction } from "@/components/interview/CodingInteraction";
import { AudioVisualizer } from "@/components/voice/AudioVisualizer";

const LIVE_STEPS = [
  { id: 1, title: 'Setup', description: 'Configure Interview', icon: Settings },
  { id: 2, title: 'Tech Check', description: 'Test your audio', icon: Ear },
  { id: 3, title: 'Live Session', description: 'Start the interview', icon: Video },
  { id: 4, title: 'Results', description: 'View your report', icon: Award }
];

// --- Interfaces ---
interface LiveInterviewState {
  status: 'setup' | 'tech-check' | 'question' | 'listening' | 'processing' | 'completed' | 'error';
  currentStep: number;
  highestCompletedStep: number;
  currentQuestionIndex: number;
  questions: InterviewQuestion[];
  answers: any[];
  isRecording: boolean;
  hasMicrophonePermission: boolean;
  techCheckStatus: 'idle' | 'testing' | 'success' | 'error';
  techCheckError: string | null;
}

interface SetupState {
  step: 'role' | 'category' | 'seniority';
  role: string | null;
  category: string | null;
  seniority: string | null;
}

// --- Main Component ---
export default function LiveInterview() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [state, setState] = useState<LiveInterviewState>({
    status: 'setup',
    currentStep: 1,
    highestCompletedStep: 0,
    currentQuestionIndex: 0,
    questions: [],
    answers: [],
    isRecording: false,
    hasMicrophonePermission: false,
    techCheckStatus: 'idle',
    techCheckError: null,
  });

  const [setup, setSetup] = useState<SetupState>({ step: 'role', role: null, category: null, seniority: null });
  const audioStreamRef = useRef<MediaStream | null>(null);

  const changeStep = (newStep: number, newStatus: LiveInterviewState['status']) => {
    setState(prev => ({ ...prev, currentStep: newStep, status: newStatus, highestCompletedStep: Math.max(prev.highestCompletedStep, newStep -1) }));
  };

  const handleStepClick = (stepId: number) => {
    if (stepId > state.highestCompletedStep + 1) return;
    let status: LiveInterviewState['status'] = 'setup';
    if (stepId === 1) status = 'setup';
    else if (stepId === 2) status = 'tech-check';
    else if (stepId === 3) status = 'question';
    changeStep(stepId, status);
  };

  const handleSetupSelection = (type: keyof SetupState, value: string) => {
    setSetup(prev => ({ ...prev, [type]: value }));
    if (setup.step === 'role') setSetup(prev => ({...prev, step: 'category'}));
    else if (setup.step === 'category') setSetup(prev => ({...prev, step: 'seniority'}));
  };

  const generateInterview = () => {
    const { role, category, seniority } = setup;
    if (!role || !category || !seniority) {
      toast({ title: "Setup Incomplete", description: "Please select a role, category, and seniority level.", variant: "destructive"});
      return;
    }

    // 1. Precise filter
    let potentialQuestions = questionPool.filter(q => 
      q.role === role && q.category === category && q.seniority === seniority
    );

    // 2. Broaden search if not enough questions
    if (potentialQuestions.length < 20) {
      // Add questions matching role and category, regardless of seniority
      const roleAndCategoryQuestions = questionPool.filter(q => 
        q.role === role && q.category === category && !potentialQuestions.find(pq => pq.id === q.id)
      );
      potentialQuestions.push(...roleAndCategoryQuestions);
    }

    if (potentialQuestions.length < 20) {
        // Add behavioral/situational questions for that role and seniority
        const behavioralSituational = questionPool.filter(q => 
            q.role === role && (q.category === 'behavioral' || q.category === 'situational') && q.seniority === seniority && !potentialQuestions.find(pq => pq.id === q.id)
        );
        potentialQuestions.push(...behavioralSituational);
    }

    if (potentialQuestions.length < 20) {
        // Add any questions from the selected category and seniority
        const categoryAndSeniority = questionPool.filter(q => 
            q.category === category && q.seniority === seniority && !potentialQuestions.find(pq => pq.id === q.id)
        );
        potentialQuestions.push(...categoryAndSeniority);
    }
    
    // 3. Shuffle the collected questions
    const shuffledQuestions = [...potentialQuestions].sort(() => Math.random() - 0.5);

    // 4. Select up to 20 questions
    const selectedQuestions = shuffledQuestions.slice(0, 20);

    // 5. Final fallback (should be rare after data is fixed)
    const questions = selectedQuestions.length > 0 
      ? selectedQuestions 
      : [{id: 'fallback', type: 'open_ended', question_text: 'Tell me about yourself.', category:'behavioral', role:'frontend', seniority:'junior'}];

    setState(prev => ({ ...prev, questions, answers: [] }));
    changeStep(2, 'tech-check');
    toast({ title: "Interview Generated!", description: `Loaded ${questions.length} questions.` });
  };

  const requestMicrophonePermission = async () => {
    setState(prev => ({ ...prev, techCheckStatus: 'testing', techCheckError: null }));
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      setState(prev => ({ ...prev, hasMicrophonePermission: true, techCheckStatus: 'success' }));
      toast({ title: "Microphone connected!", variant: "success" });
    } catch (error) {
      console.error("Microphone permission denied:", error);
      setState(prev => ({ ...prev, hasMicrophonePermission: false, techCheckStatus: 'error', techCheckError: 'Microphone access was denied. Please enable it in your browser settings and try again.' }));
    }
  };

  const stopMicrophoneStream = () => {
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopMicrophoneStream();
  }, []);

  const submitInterview = () => {
    const mockSessionId = "a1b2c3d4";
    toast({ title: "Interview Complete!", description: "Generating your report..."});
    setTimeout(() => navigate(`/report/${mockSessionId}`), 2500);
  };

  const handleAnswer = (answer: any) => {
    setState(prev => ({ ...prev, answers: [...prev.answers, { questionId: prev.questions[prev.currentQuestionIndex].id, answer }]}));
    nextQuestion();
  };

  const nextQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1, status: 'question' }));
    } else {
      changeStep(4, 'completed');
      submitInterview();
    }
  };

  const startRecording = () => {
    if(state.hasMicrophonePermission) {
      setState(prev => ({ ...prev, isRecording: true, status: 'listening' }));
    } else {
      toast({title: "Microphone Required", description: "Please complete the tech check first.", variant: "destructive"});
      changeStep(2, 'tech-check');
    }
  }
  const stopRecording = () => {
    setState(prev => ({ ...prev, isRecording: false, status: 'processing' }));
    // Simulate processing delay
    setTimeout(() => {
      handleAnswer("Recorded audio answer");
    }, 1500);
  };

  // --- RENDER FUNCTIONS ---
  
  const renderSetupWizard = () => {
    const renderOptions = (options: {id: string, name: string}[], type: keyof SetupState, icon: React.ElementType) => (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {options.map(option => (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={option.id}>
            <Button variant="outline" className="w-full h-24 text-center flex flex-col justify-center items-center gap-2" onClick={() => handleSetupSelection(type, option.id)}>
              {React.createElement(icon, { className: "w-6 h-6 mb-1" })}
              <span className="text-sm font-medium">{option.name}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    );

    return (
      <div className="max-w-4xl mx-auto text-center">
        <AnimatePresence mode="wait">
          <motion.div key={setup.step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50}} transition={{ duration: 0.3 }}>
            {setup.step === 'role' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Select Your Role</h2>
                <p className="text-muted-foreground">Choose the role you want to practice for.</p>
                {renderOptions(interviewTypes.roles, 'role', Briefcase)}
              </div>
            )}
            {setup.step === 'category' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Choose a Category</h2>
                <p className="text-muted-foreground">What type of questions do you want to focus on?</p>
                {renderOptions(interviewTypes.categories, 'category', Tag)}
              </div>
            )}
            {setup.step === 'seniority' && (
              <div className="space-y-8">
                 <h2 className="text-3xl font-bold">Select Seniority Level</h2>
                 <p className="text-muted-foreground">Finally, choose your experience level.</p>
                {renderOptions(interviewTypes.seniority, 'seniority', UserCheck)}
                <div className="mt-8"><Button size="lg" onClick={generateInterview} disabled={!setup.role || !setup.category || !setup.seniority}>Generate Interview <ArrowRight className="ml-2"/></Button></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };
  
  const renderTechCheck = () => (
    <div className="text-center max-w-2xl mx-auto space-y-8 py-8">
      <h2 className="text-3xl font-bold">Microphone Check</h2>
      <p className="text-muted-foreground">Let's make sure your audio is working. Click the button below to test your microphone.</p>
      {state.techCheckStatus === 'idle' && <Button size="lg" onClick={requestMicrophonePermission}><Mic className="mr-2"/>Test My Microphone</Button>}
      {state.techCheckStatus === 'testing' && <div className="flex items-center justify-center gap-2 text-primary"><Loader2 className="animate-spin"/><span>Accessing microphone...</span></div>}
      {state.techCheckStatus === 'error' && (
        <div className="space-y-4">
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-4">
              <AlertCircle className="text-destructive"/>
              <p className="text-destructive text-left text-sm">{state.techCheckError}</p>
          </div>
          <Button size="lg" onClick={requestMicrophonePermission}>Try Again</Button>
        </div>
      )}
      {state.techCheckStatus === 'success' && (
        <div className="space-y-6">
          <div className="p-6 bg-green-500/10 rounded-xl space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-600 font-bold"><CheckCircle2/><span>Microphone Connected!</span></div>
            <p className="text-sm text-green-700">We can hear you. Speak to see the visualizer react.</p>
            <div className="h-20 w-full bg-background rounded-lg flex justify-center items-center overflow-hidden"><AudioVisualizer stream={audioStreamRef.current} isRecording={true}/></div>
          </div>
          <Button size="lg" onClick={() => { changeStep(3, 'question'); }}>Start Interview</Button>
        </div>
      )}
    </div>
  );

  const renderSession = () => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return <div className="text-center"><p>No questions loaded. Please restart.</p></div>;

    const renderInteraction = () => {
      switch (currentQuestion.type) {
        case 'open_ended':
          return <OpenEndedInteraction 
                    status={state.status as any} 
                    startRecording={startRecording} 
                    stopRecording={stopRecording} 
                    stream={audioStreamRef.current}
                  />;
        case 'multiple_choice':
          return <MultipleChoiceInteraction 
                    question={currentQuestion} 
                    onAnswer={(answer) => handleAnswer(answer)}
                  />;
        case 'coding':
          return <CodingInteraction 
                    question={currentQuestion} 
                    onComplete={() => handleAnswer("Submitted code solution")}
                  />;
        default:
          return <p>Unsupported question type.</p>;
      }
    };

    return (
      <div className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <Badge variant="outline">Question {state.currentQuestionIndex + 1} of {state.questions.length}</Badge>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight max-w-4xl">{currentQuestion.question_text}</h2>
        </div>
        <div className="min-h-[250px] flex items-center justify-center">
          {renderInteraction()}
        </div>
      </div>
    );
  };

  const renderCompleted = () => (
    <div className="text-center max-w-2xl mx-auto space-y-8 py-12">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1}} transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 150 }}>
            <CheckCircle2 className="w-24 h-24 mx-auto text-green-500" />
        </motion.div>
        <h2 className="text-4xl font-bold">Interview Complete!</h2>
        <p className="text-muted-foreground text-lg">Great job! We're now analyzing your responses to generate your detailed performance report.</p>
        <div className="flex items-center justify-center gap-3 text-primary">
            <Loader2 className="animate-spin"/>
            <span className="font-semibold">Generating report...</span>
        </div>
    </div>
);

  const renderContent = () => {
    switch (state.status) {
      case 'setup': return renderSetupWizard();
      case 'tech-check': return renderTechCheck();
      case 'question':
      case 'listening':
      case 'processing': return renderSession();
      case 'completed': return renderCompleted();
      default: return <div>Loading...</div>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedNavigation />
      <main className="flex-grow container mx-auto px-4 pt-24 sm:pt-32 pb-20 max-w-6xl">
        <div className="mb-12 sm:mb-16">
            <div className="w-full max-w-3xl mx-auto">
                <div className="flex justify-between items-start">
                    {LIVE_STEPS.map((step, index) => (
                        <div key={step.id} className="flex-1 flex flex-col items-center text-center relative">
                            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${state.currentStep > step.id ? 'bg-green-500 text-white' : state.currentStep === step.id ? 'bg-primary text-primary-foreground' : 'bg-card-foreground/10'}`}>
                                {state.currentStep > step.id ? <CheckCircle2/> : <step.icon/>}
                            </div>
                            <p className={`mt-2 font-bold ${state.currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</p>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            {index < LIVE_STEPS.length - 1 && <div className={`absolute top-6 left-1/2 w-full h-0.5 ${state.currentStep > step.id ? 'bg-green-500' : 'bg-card-foreground/10'}`} style={{ transform: 'translateX(50%)' }}/>}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-card border rounded-2xl p-4 sm:p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div key={state.status + state.currentQuestionIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: "circOut" }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <EnhancedFooter />
    </div>
  );
}
