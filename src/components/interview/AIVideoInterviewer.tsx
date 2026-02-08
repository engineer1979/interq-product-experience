import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mic,
    Video as VideoIcon,
    Square,
    Zap,
    Brain,
    CheckCircle2,
    Waves,
    RefreshCcw,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface AIVideoInterviewerProps {
    question: {
        id: string;
        question_text: string;
    };
    onComplete: (data: { videoUrl?: string; transcript: string; duration: number }) => void;
}

export function AIVideoInterviewer({ question, onComplete }: AIVideoInterviewerProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isFollowUp, setIsFollowUp] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
            }
        } catch (err) {
            console.error("Camera access denied", err);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const handleStartRecording = () => {
        setIsRecording(true);
        setRecordingTime(0);
        timerRef.current = setInterval(() => {
            setRecordingTime(prev => prev + 1);
        }, 1000);
    };

    const handleStopRecording = async () => {
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);

        // Simulate AI Analysis
        setIsAnalyzing(true);
        await new Promise(resolve => setTimeout(resolve, 2500));
        setIsAnalyzing(false);

        // Simulation logic: Trigger follow-up 50% of the time for the demo
        const triggerFollowUp = Math.random() > 0.5;

        if (triggerFollowUp && !isFollowUp) {
            setIsFollowUp(true);
        } else {
            onComplete({
                transcript: "Simulated candidate transcript...",
                duration: recordingTime
            });
        }
    };

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            {/* Header Content */}
            <div className="space-y-4 text-center">
                <AnimatePresence mode="wait">
                    {!isFollowUp ? (
                        <motion.div
                            key="main-q"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2"
                        >
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px] py-0">Main Assessment</Badge>
                            <h2 className="text-2xl font-black tracking-tight leading-snug">{question.question_text}</h2>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="follow-up-q"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-2 p-4 bg-primary/5 rounded-2xl border border-primary/20"
                        >
                            <Badge className="gradient-primary border-0 text-[10px] animate-pulse">AI Follow-up Question</Badge>
                            <h2 className="text-2xl font-black tracking-tight leading-snug">
                                <Sparkles className="inline-block mr-2 text-primary" size={24} />
                                Based on your mention of scalability, how do you handle concurrency?
                            </h2>
                            <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mt-2">Intelligence Signal: High Depth Detected</p>
                        </motion.div>
                    )
                    }
                </AnimatePresence>
            </div>

            {/* Workplace UI */}
            <div className="relative group">
                {/* Camera Container */}
                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-black border-4 border-background shadow-2xl overflow-hidden shadow-glow-sm transition-smooth group-hover:shadow-glow">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-x-[-1]"
                    />

                    {/* Mirroring / Grid Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="absolute inset-0 pointer-events-none border-[20px] border-black/10" />

                    {/* Analysis Overlay */}
                    <AnimatePresence>
                        {isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-6"
                            >
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                                    <Brain className="absolute inset-0 m-auto text-primary animate-pulse" size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-black text-white tracking-tight">AI Reasoning Engine...</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Deep Topic Mapping & Bias Extraction</p>
                                </div>
                                <motion.div
                                    className="flex gap-1"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-8 bg-primary rounded-full" />)}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Recording Metadata */}
                    {isRecording && (
                        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-full animate-pulse shadow-lg">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Recording • {formatTime(recordingTime)}</span>
                        </div>
                    )}
                </div>

                {/* Intelligence Waveform (Bottom) */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-card/80 backdrop-blur-xl border border-border rounded-2xl h-16 flex items-center px-6 gap-4 shadow-xl">
                    <div className="flex-1 flex items-center gap-1.5 h-10 overflow-hidden">
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 4 }}
                                animate={{
                                    height: isRecording ? [4, Math.random() * 32 + 4, 4] : 4,
                                    opacity: isRecording ? 1 : 0.2
                                }}
                                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.02 }}
                                className="w-[1.5px] bg-primary rounded-full"
                            />
                        ))}
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <div className="flex items-center gap-3">
                        <Mic className={isRecording ? "text-primary animate-pulse" : "text-muted-foreground"} size={18} />
                        <VideoIcon className="text-muted-foreground" size={18} />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
                {!isRecording ? (
                    <Button
                        size="lg"
                        onClick={handleStartRecording}
                        className="h-14 px-8 rounded-2xl gradient-primary border-0 shadow-glow font-bold text-lg"
                    >
                        <Zap size={20} className="mr-2" /> Start Response
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        onClick={handleStopRecording}
                        variant="destructive"
                        className="h-14 px-8 rounded-2xl shadow-xl font-bold text-lg transition-smooth hover:scale-105"
                    >
                        <Square size={20} className="mr-2 fill-current" /> Stop & Analyze
                    </Button>
                )}

                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl border border-border hover:bg-muted" onClick={startCamera}>
                    <RefreshCcw size={20} className="text-muted-foreground" />
                </Button>
            </div>

            {/* Accessibility / Instructions */}
            <div className="flex justify-center gap-8 mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="text-green-500" size={12} /> Auto-save active</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="text-green-500" size={12} /> Real-time Encryption</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="text-green-500" size={12} /> Bias Filter ON</div>
            </div>
        </div>
    );
}

function Separator({ orientation = "horizontal", className = "" }) {
    return <div className={`bg-border ${orientation === "horizontal" ? "w-full h-[1px]" : "h-full w-[1px]"} ${className}`} />;
}
