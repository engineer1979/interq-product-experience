import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Play, Shield, Brain, TrendingUp, AlertTriangle, Plus, List, Sparkles, CheckCircle, Clock, User, LogIn, ArrowRight, Search, FileVideo } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { InteractiveInterview } from "@/components/interview/InteractiveInterview";

interface InterviewResult {
  id: string;
  overall_score: number;
  communication_score: number;
  technical_score: number;
  confidence_score: number;
  fraud_detected: boolean;
  completed_at: string;
}

const AIInterview = () => {
  const [results, setResults] = useState<InterviewResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (user) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from("interview_results")
        .select("*")
        .order("completed_at", { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error: any) {
      // Use toast only for critical errors, not just "no results"
      console.error("Error fetching results", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    const mockSessionId = "a1b2c3d4"; // Matching the mock data in the report
    toast({
      title: "Starting Demo Interview!",
      description: "You will be redirected to the report page to simulate completion.",
    });
    setTimeout(() => {
      navigate(`/report/${mockSessionId}`);
    }, 2000);
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

  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  const features = [
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Real-time analysis using advanced NLP",
      longDescription: "Our proprietary NLP engine analyzes speech patterns, keyword density, and sentiment in real-time to provide immediate, actionable feedback on candidate performance. It identifies strengths, areas for improvement, and potential red flags.",
      benefits: ["Sentiment Analysis", "Keyword Matching", "Tone Detection"],
      cta: "See Analysis Demo"
    },
    {
      icon: Video,
      title: "HD Video",
      description: "Secure capture with quality checks",
      longDescription: "Crystal clear video recording ensures every non-verbal cue is captured. Supports up to 4K resolution with adaptive bitrate streaming for low-bandwidth environments, ensuring a smooth experience for all candidates.",
      benefits: ["4K Resolution Support", "Adaptive Bitrate", "Low Latency"],
      cta: "Test Video"
    },
    // ... (other features remain the same)
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                AI-Powered <span className="text-gradient">Interviews</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Practice with our intelligent AI interviewer or conduct structured interviews with real-time analysis.
              </p>
            </div>

            {/* How It Works */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-8 relative">
                 {[
                  { icon: Sparkles, title: "1. Setup", desc: "Choose interview type" },
                  { icon: Video, title: "2. Record", desc: "Answer via video" },
                  { icon: Brain, title: "3. AI Analysis", desc: "Instant evaluation" },
                  { icon: TrendingUp, title: "4. Feedback", desc: "Get detailed scores" },
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary shadow-sm">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                    {index < 3 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border -z-10" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready to see the results?</h3>
                  <p className="text-muted-foreground">Click here to view a sample of a completed interview report.</p>
                </div>
                <Button size="lg" className="shrink-0 text-lg px-8 h-14 shadow-lg shadow-purple-500/20" onClick={handleStartInterview}>
                  View Sample Report <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIInterview;
