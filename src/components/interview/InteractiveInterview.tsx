import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Sparkles, MessageCircle, AlertCircle, Award } from "lucide-react";

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message, timestamp: new Date() },
      ]);
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
  };

  if (!setup) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
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
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 mb-4 bg-primary/5 border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-2">Interview Session</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Role:</strong> {setup.jobRole}</p>
              <p><strong>Level:</strong> {setup.experienceLevel}</p>
              {setup.focusAreas && <p><strong>Focus:</strong> {setup.focusAreas}</p>}
            </div>
          </div>
          <div className="flex gap-2">
            {isInterviewActive && messages.length >= 4 && !showFeedback && (
              <Button onClick={requestFeedback} variant="outline" size="sm" className="gap-2">
                <Award className="w-4 h-4" />
                Get Feedback
              </Button>
            )}
            <Button onClick={resetInterview} variant="ghost" size="sm">
              Reset
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6 mb-6 max-h-[500px] overflow-y-auto">
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
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {isInterviewActive && !showFeedback && (
          <div className="flex gap-2">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[100px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              size="icon"
              className="self-end"
              disabled={isLoading || !inputMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}

        {showFeedback && (
          <div className="bg-accent/50 border border-accent rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent-foreground mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Interview Completed</p>
              <p className="text-muted-foreground">
                Review your feedback above and consider practicing more interviews to improve your skills.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
