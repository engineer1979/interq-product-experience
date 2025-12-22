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
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Real-time analysis using advanced NLP",
    },
    {
      icon: Video,
      title: "HD Video",
      description: "Secure capture with quality checks",
    },
    {
      icon: Shield,
      title: "Fraud Detection",
      description: "Behavior analysis & proctoring",
    },
    {
      icon: TrendingUp,
      title: "Smart Scoring",
      description: "Multi-dimensional performance metrics",
    },
    {
      icon: Clock,
      title: "On-Demand",
      description: "Take interviews anytime, 24/7"
    },
    {
      icon: User,
      title: "No Sign-up",
      description: "Start practicing immediately"
    }
  ];

  const ScoreCard = ({ label, score, color }: { label: string; score: number; color: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-bold">{score}%</span>
      </div>
      <Progress value={score} className="h-2" />
    </div>
  );

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

            {/* How It Works - Process Explanation */}
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
                    {/* Connecting line for desktop */}
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border -z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Two Column Layout: Features + Login/Action */}
            <div className="grid lg:grid-cols-3 gap-12 mb-20 items-start">

              {/* Key Features & Demo */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Key Interview Features</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action Card */}
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Ready to impress?</h3>
                    <p className="text-muted-foreground">Start a mock interview now to test the AI capabilities.</p>
                  </div>
                  <Button size="lg" className="shrink-0 text-lg px-8 h-14 shadow-lg shadow-purple-500/20" onClick={() => navigate('/create-interview')}>
                    Start Interview <Video className="ml-2 w-5 h-5" />
                  </Button>
                </div>

                {/* Interactive Demo Area */}
                <Tabs defaultValue="practice" className="mt-8">
                  <TabsList className="mb-6">
                    <TabsTrigger value="practice" className="gap-2"><Sparkles className="w-4 h-4" /> Practice Demo</TabsTrigger>
                    <TabsTrigger value="browse" className="gap-2"><List className="w-4 h-4" /> Browse Types</TabsTrigger>
                  </TabsList>
                  <TabsContent value="practice">
                    <InteractiveInterview />
                  </TabsContent>
                  <TabsContent value="browse">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {['Behavioral', 'Technical', 'Leadership', 'Sales Pitch'].map((type) => (
                        <Card key={type} className="p-6 cursor-pointer hover:border-primary transition-colors onClick={() => navigate('/create-interview')}">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                              <FileVideo className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg">{type}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Master {type.toLowerCase()} interview questions.</p>
                          <div className="mt-4 flex items-center text-primary font-medium text-sm">
                            Start <ArrowRight className="w-4 h-4 ml-1" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar: optional Auth & Recent Results */}
              <div className="space-y-8">
                {/* Optional Login Card */}
                {!user && (
                  <Card className="p-6 border-border shadow-soft sticky top-24">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                        <LogIn className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">Track Your Progress</h3>
                        <p className="text-xs text-muted-foreground">Optional: Login to save results</p>
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

                {/* User Results (If Logged In) */}
                {user && results.length > 0 && (
                  <Card className="p-6 border-border shadow-soft">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" /> Recent Results
                    </h3>
                    <div className="space-y-4">
                      {results.slice(0, 3).map((result) => (
                        <div key={result.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {new Date(result.completed_at).toLocaleDateString()}
                            </span>
                            <span className="font-bold text-primary">{result.overall_score}%</span>
                          </div>
                          <Progress value={result.overall_score} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/interviews')}>
                      View All History
                    </Button>
                  </Card>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIInterview;
