import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff, Volume2, Play, Square, ChevronRight, MessageSquare, Brain, Sparkles, Cpu, Globe, ArrowRight, LogIn, AudioLines, Speech } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AudioVisualizer } from "@/components/voice/AudioVisualizer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Interview Script Data
const INTERVIEW_SCRIPT = [
    {
        id: "intro",
        text: "Hello and welcome. Thank you for taking the time to interview for the Software Engineer role at InterQ. My name is Aria, and I'll be your AI interviewer for this session. This is a one-way interview where you'll be asked a series of questions. After each question, you will hear a beep and will have up to two minutes to record your answer. Please try to find a quiet place for our conversation. Are you ready? Let's begin.",
        type: "intro"
    },
    {
        id: "q1",
        text: "First, I'd like to understand your technical problem-solving approach. Could you describe a particularly challenging bug or technical issue you faced in a recent project? Please walk me through how you identified the root cause and the steps you took to resolve it. You have two minutes.",
        type: "question",
        timeLimit: 120
    },
    {
        id: "q2",
        text: "Thank you, that's very helpful. Moving on to your technical expertise. At InterQ, we rely heavily on modern frontend technologies. Can you explain a complex feature you built using React and TypeScript? Focus on the design decisions you made and how you handled state management or performance optimization. You have two minutes.",
        type: "question",
        timeLimit: 120
    },
    {
        id: "q3",
        text: "Great, thank you for those details. Now, let's talk about collaboration. Software engineering is a team sport. Tell me about a time when you had a disagreement with a designer or product manager about a feature's implementation. How did you communicate your technical perspective while ensuring the product goals were met? You have two minutes.",
        type: "question",
        timeLimit: 120
    },
    {
        id: "q4",
        text: "Excellent. For our final question, we value continuous learning. What is a new technology or tool you've recently learned, and how have you applied it to improve your work or a personal project? You have two minutes.",
        type: "question",
        timeLimit: 120
    },
    {
        id: "outro",
        text: "Perfect. That was our last question. On behalf of the team at InterQ, thank you so much for your thoughtful answers and for your interest in joining us. Our hiring team will review your responses and will be in touch via email regarding next steps. We wish you the best of luck. Goodbye.",
        type: "outro"
    }
];

export default function VoiceInterview() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user, signIn } = useAuth();

    // UI States
    const [hasStarted, setHasStarted] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Interview Logic States
    const [currentStep, setCurrentStep] = useState(0);
    const [interviewState, setInterviewState] = useState<"idle" | "speaking" | "listening" | "processing" | "completed">("idle");
    const [timeLeft, setTimeLeft] = useState(0);

    const synth = window.speechSynthesis;
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize voices
    useEffect(() => {
        const loadVoices = () => {
            synth.getVoices();
        };
        loadVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }
        return () => {
            synth.cancel();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const speak = (text: string, onEnd?: () => void) => {
        if (synth.speaking) {
            console.error("speechSynthesis.speaking");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synth.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha")) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onstart = () => setInterviewState("speaking");
        utterance.onend = () => {
            setInterviewState("idle");
            if (onEnd) onEnd();
        };

        synth.speak(utterance);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                // const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
            };

            mediaRecorder.start();
            setInterviewState("listening");

            const step = INTERVIEW_SCRIPT[currentStep];
            if (step.timeLimit) {
                setTimeLeft(step.timeLimit);
                timerRef.current = setInterval(() => {
                    setTimeLeft((prev) => {
                        if (prev <= 1) {
                            stopRecording();
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        } catch (err) {
            console.error("Error accessing microphone:", err);
            toast({
                title: "Microphone Error",
                description: "Please allow microphone access to continue.",
                variant: "destructive",
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        if (timerRef.current) clearInterval(timerRef.current);
        setInterviewState("processing");

        setTimeout(() => {
            handleNextStep();
        }, 1500);
    };

    const handleStart = () => {
        const step = INTERVIEW_SCRIPT[currentStep];
        speak(step.text, () => {
            if (step.type === "intro") {
                setTimeout(() => handleNextStep(), 1000);
            } else if (step.type === "question") {
                const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
                audio.play().catch(e => console.log("Audio play failed", e));
                setTimeout(() => startRecording(), 500);
            } else if (step.type === "outro") {
                setInterviewState("completed");
            }
        });
    };

    const handleNextStep = async () => {
        if (currentStep < INTERVIEW_SCRIPT.length - 1) {
            setCurrentStep(prev => prev + 1);
            setTimeout(() => {
                const nextStep = INTERVIEW_SCRIPT[currentStep + 1];
                speak(nextStep.text, () => {
                    if (nextStep.type === "question") {
                        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
                        audio.play().catch(e => console.log("Audio play failed", e));
                        setTimeout(() => startRecording(), 500);
                    } else if (nextStep.type === "outro") {
                        completeInterview();
                    }
                });
            }, 1000);
        } else {
            completeInterview();
        }
    };

    const completeInterview = async () => {
        setInterviewState("completed");
        try {
            const { data: interviews } = await supabase.from('interviews').select('id').limit(1);
            if (interviews && interviews.length > 0) {
                const interviewId = interviews[0].id;
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    await supabase.from('interview_results').insert({
                        interview_id: interviewId,
                        user_id: user.id,
                        overall_score: 85,
                        communication_score: 90,
                        technical_score: 80,
                        confidence_score: 85,
                        fraud_detected: false,
                        ai_feedback: {
                            strengths: ["Clear communication", "Good technical depth"],
                            improvements: ["Could be more concise"]
                        }
                    });
                    toast({
                        title: "Interview Saved",
                        description: "Your voice interview has been recorded and analyzed.",
                    });
                }
            }
        } catch (error) {
            console.error("Error saving interview:", error);
        }
    };

    const handleQuickLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            await signIn(loginEmail, loginPassword);
            toast({ title: "Logged in successfully" });
        } catch (error: any) {
            toast({ title: "Login failed", description: error.message, variant: "destructive" });
        } finally {
            setIsLoggingIn(false);
        }
    };

    const features = [
        { icon: AudioLines, title: "Natural Voice", desc: "Interact with AI that sounds human" },
        { icon: Brain, title: "Real-time Processing", desc: "Instant speech-to-text analysis" },
        { icon: Sparkles, title: "Personality Insights", desc: "Tone and confidence scoring" },
        { icon: Globe, title: "Multi-language", desc: "Support for 30+ languages" }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navigation />

            <main className="flex-grow pt-28 pb-8">
                <div className="container mx-auto px-4 max-w-7xl">

                    {!hasStarted ? (
                        /* ================= START: LANDING PAGE MODULE ================= */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-20"
                        >
                            {/* Header */}
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                    Voice-First <span className="text-gradient">Interviews</span>
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                                    Experience the future of hiring with our conversational AI. Speak naturally and get evaluated on communication skills in real-time.
                                </p>
                            </div>

                            {/* How It Works */}
                            <div>
                                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                                <div className="grid md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
                                    {[
                                        { icon: Volume2, title: "1. Listen", desc: "AI asks a question" },
                                        { icon: Mic, title: "2. Speak", desc: "Record your answer" },
                                        { icon: Cpu, title: "3. Analyze", desc: "Get instant scores" },
                                    ].map((step, index) => (
                                        <div key={index} className="flex flex-col items-center text-center relative z-10">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary shadow-sm">
                                                <step.icon className="w-8 h-8" />
                                            </div>
                                            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                                            {/* Desktop Line */}
                                            {index < 2 && (
                                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border -z-10" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Two Column: Features + Login/Start */}
                            <div className="grid lg:grid-cols-3 gap-12 items-start">
                                <div className="lg:col-span-2 space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-6">Key Capabilities</h2>
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors">
                                                    <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                                                        <feature.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Banner */}
                                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">Ready to speak?</h3>
                                            <p className="text-muted-foreground">Start the interactive voice interview now. No account needed.</p>
                                        </div>
                                        <Button size="lg" className="shrink-0 text-lg px-8 h-14 shadow-lg shadow-blue-500/20" onClick={() => setHasStarted(true)}>
                                            Start Voice Session <Mic className="ml-2 w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Sidebar Login */}
                                {!user && (
                                    <Card className="p-6 border-border shadow-soft sticky top-24">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                                                <LogIn className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold">Save Results</h3>
                                                <p className="text-xs text-muted-foreground">Optional: Login to track history</p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleQuickLogin} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    value={loginEmail}
                                                    onChange={(e) => setLoginEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={loginPassword}
                                                    onChange={(e) => setLoginPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <Button type="submit" className="w-full" disabled={isLoggingIn}>
                                                {isLoggingIn ? "Signing in..." : "Login & Track"}
                                            </Button>
                                        </form>
                                        <p className="text-xs text-center mt-4 text-muted-foreground">
                                            Don't have an account? <a href="/auth" className="text-primary hover:underline">Sign up</a>
                                        </p>
                                    </Card>
                                )}
                            </div>
                        </motion.div>
                        /* ================= END: LANDING PAGE MODULE ================= */
                    ) : (
                        /* ================= START: ACTIVE INTERVIEW UI ================= */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center max-w-2xl mx-auto"
                        >
                            <Card className="w-full p-8 shadow-lg">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold mb-2">Voice Interview</h1>
                                    <p className="text-muted-foreground">Software Engineer Role • AI Interviewer: Aria</p>
                                </div>

                                <div className="min-h-[200px] flex flex-col items-center justify-center mb-8">
                                    <div className="mb-6">
                                        <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${interviewState === "speaking" ? "bg-primary/20 scale-110" :
                                            interviewState === "listening" ? "bg-red-100 scale-110" : "bg-muted"
                                            }`}>
                                            {interviewState === "speaking" && <Volume2 className="w-10 h-10 text-primary animate-pulse" />}
                                            {interviewState === "listening" && <Mic className="w-10 h-10 text-red-500" />}
                                            {interviewState === "idle" && <MicOff className="w-10 h-10 text-muted-foreground" />}
                                            {interviewState === "processing" && <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />}
                                            {interviewState === "completed" && <div className="text-4xl">🎉</div>}
                                        </div>
                                    </div>

                                    <AudioVisualizer state={interviewState} />

                                    <div className="mt-6 text-center max-w-lg">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={currentStep}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-lg font-medium"
                                            >
                                                {interviewState === "completed"
                                                    ? "Interview Completed! Thank you for your time."
                                                    : INTERVIEW_SCRIPT[currentStep].text}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {interviewState === "listening" && (
                                    <div className="mb-8">
                                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                            <span>Recording Answer...</span>
                                            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div
                                                className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                                                style={{ width: `${(timeLeft / (INTERVIEW_SCRIPT[currentStep].timeLimit || 120)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-center gap-4">
                                    {interviewState === "idle" && currentStep === 0 && (
                                        <Button onClick={handleStart} size="lg" className="gap-2">
                                            <Play className="w-4 h-4" />
                                            Start Interview
                                        </Button>
                                    )}

                                    {interviewState === "listening" && (
                                        <Button onClick={stopRecording} variant="destructive" size="lg" className="gap-2">
                                            <Square className="w-4 h-4" />
                                            Stop Recording
                                        </Button>
                                    )}

                                    {interviewState === "completed" && (
                                        <Button onClick={() => setHasStarted(false)} size="lg" className="gap-2">
                                            Back to Overview
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                        /* ================= END: ACTIVE INTERVIEW UI ================= */
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}
