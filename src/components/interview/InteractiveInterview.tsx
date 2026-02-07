import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Sparkles, MessageCircle, AlertCircle, Award, Mic, Volume2, VolumeX, MicOff } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface InterviewSetup {
  jobRole: string;
  experienceLevel: string;
  focusAreas: string;
}

export const InteractiveInterview = () => {
  const [setup, setSetup] = useState<InterviewSetup | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition & Synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage((prev) => prev + (prev ? " " : "") + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        toast({
          title: "Voice Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || !synthRef.current) return;

    // Cancel any current speaking
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    // Select a better voice if available (e.g., Google US English)
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
    if (preferredVoice) utterance.voice = preferredVoice;

    synthRef.current.speak(utterance);
  };

  const startInterview = async () => {
    if (!setup?.jobRole || !setup?.experienceLevel) {
      toast({
        title: "Missing Information",
        description: "Please provide job role and experience level",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setIsInterviewActive(true);

    try {
      const initialMessage = `I'm ready to begin the interview for the ${setup.jobRole} position at ${setup.experienceLevel} level${setup.focusAreas ? `, with focus on ${setup.focusAreas}` : ''}.`;
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-interview-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: initialMessage }],
            jobRole: setup.jobRole,
            experienceLevel: setup.experienceLevel,
            focusAreas: setup.focusAreas,
            requestFeedback: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start interview");
      }

      const data = await response.json();
      setMessages([
        { role: "user", content: initialMessage, timestamp: new Date() },
        { role: "assistant", content: data.message, timestamp: new Date() },
      ]);
      
      // Speak the initial response
      speakText(data.message);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start interview. Please try again.",
        variant: "destructive",
      });
      setIsInterviewActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // Stop any current speech
    if (synthRef.current) synthRef.current.cancel();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-interview-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
            jobRole: setup?.jobRole,
            experienceLevel: setup?.experienceLevel,
            focusAreas: setup?.focusAreas,
            requestFeedback: showFeedback,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();
      const assistantMessage = { role: "assistant" as const, content: data.message, timestamp: new Date() };
      
      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

      // Speak the response
      speakText(data.message);

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requestFeedback = async () => {
    if (messages.length < 4) {
      toast({
        title: "Not Enough Data",
        description: "Please answer at least 2-3 questions before requesting feedback",
        variant: "destructive",
      });
      return;
    }

    setShowFeedback(true);
    setIsLoading(true);

    const feedbackRequest: Message = {
      role: "user",
      content: "Please provide detailed feedback on my interview performance.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, feedbackRequest]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-interview-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, feedbackRequest].map((m) => ({
              role: m.role,
              content: m.content,
            })),
            jobRole: setup?.jobRole,
            experienceLevel: setup?.experienceLevel,
            focusAreas: setup?.focusAreas,
            requestFeedback: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get feedback");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message, timestamp: new Date() },
      ]);
      setIsInterviewActive(false);
      speakText("Here is the feedback on your interview performance.");

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetInterview = () => {
    setMessages([]);
    setSetup(null);
    setIsInterviewActive(false);
    setShowFeedback(false);
    setInputMessage("");
    if (synthRef.current) synthRef.current.cancel();
  };

  if (!setup) {
    return (
      <Card className="p-8 max-w-2xl mx-auto shadow-elegant">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Start Your AI Interview</h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Practice with our AI interviewer. Get personalized questions and detailed feedback on your performance.
        </p>

        <div className="space-y-6">
          <div>
            <Label htmlFor="jobRole">Job Role *</Label>
            <Input
              id="jobRole"
              placeholder="e.g., Senior Software Engineer, Marketing Manager"
              value={setup?.jobRole || ""}
              onChange={(e) => setSetup({ ...setup!, jobRole: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="experienceLevel">Experience Level *</Label>
            <Select
              value={setup?.experienceLevel || ""}
              onValueChange={(value) => setSetup({ ...setup!, experienceLevel: value })}
            >
              <SelectTrigger id="experienceLevel" className="mt-2">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Entry-level">Entry-level</SelectItem>
                <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
                <SelectItem value="Executive">Executive/Leadership</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="focusAreas">Focus Areas (Optional)</Label>
            <Input
              id="focusAreas"
              placeholder="e.g., Technical Skills, Behavioral Questions, Leadership"
              value={setup?.focusAreas || ""}
              onChange={(e) => setSetup({ ...setup!, focusAreas: e.target.value })}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank for a general interview experience
            </p>
          </div>

          <Button onClick={startInterview} size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? "Starting Interview..." : "Begin Interview"}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <Card className="p-4 sm:p-6 mb-4 bg-primary/5 border-primary/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Interview Session</h3>
            <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>Role:</strong> {setup.jobRole}</span>
              <span><strong>Level:</strong> {setup.experienceLevel}</span>
              {setup.focusAreas && <span><strong>Focus:</strong> {setup.focusAreas}</span>}
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <Button
                variant="outline"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="flex-1 sm:flex-none"
                title={voiceEnabled ? "Mute AI Voice" : "Enable AI Voice"}
             >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
             </Button>
            {isInterviewActive && messages.length >= 4 && !showFeedback && (
              <Button onClick={requestFeedback} variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
                <Award className="w-4 h-4" />
                Feedback
              </Button>
            )}
            <Button onClick={resetInterview} variant="ghost" size="sm" className="flex-1 sm:flex-none">
              Reset
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 shadow-lg h-[600px] flex flex-col">
        <div className="flex-1 space-y-6 mb-6 overflow-y-auto pr-2">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl p-4 max-w-[85%] sm:max-w-[75%] shadow-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{message.content}</p>
                  <p className="text-[10px] opacity-70 mt-2 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-none p-4 flex items-center gap-1">
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {isInterviewActive && !showFeedback && (
          <div className="flex gap-2 items-end">
            <div className="relative flex-1">
                <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={isListening ? "Listening..." : "Type your answer here..."}
                className={`min-h-[60px] max-h-[120px] resize-none pr-12 py-3 ${isListening ? "border-primary ring-1 ring-primary" : ""}`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                    }
                }}
                disabled={isLoading}
                />
                <Button
                    size="icon"
                    variant={isListening ? "destructive" : "ghost"}
                    className={`absolute right-2 bottom-2 h-8 w-8 transition-all ${isListening ? "animate-pulse" : "text-muted-foreground hover:text-primary"}`}
                    onClick={toggleListening}
                    title={isListening ? "Stop Listening" : "Start Voice Input"}
                >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
            </div>
            <Button
              onClick={sendMessage}
              size="icon"
              className="h-[60px] w-[60px] shrink-0"
              disabled={isLoading || (!inputMessage.trim() && !isListening)}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        )}

        {showFeedback && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
            <Award className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1 text-green-800 dark:text-green-300">Interview Completed Successfully</p>
              <p className="text-green-700 dark:text-green-400/80">
                You've completed the practice session. Review your AI-generated feedback above to identify areas for improvement.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
