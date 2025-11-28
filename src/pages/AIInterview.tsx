import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Video, Play, Shield, Brain, TrendingUp, AlertTriangle, Plus, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from("interview_results")
        .select("*")
        .order("completed_at", { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load interview results",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Real-time analysis of responses using advanced NLP",
    },
    {
      icon: Video,
      title: "Video Recording",
      description: "Secure video capture with quality assurance",
    },
    {
      icon: Shield,
      title: "Fraud Detection",
      description: "Multi-factor authentication and behavior analysis",
    },
    {
      icon: TrendingUp,
      title: "Scoring System",
      description: "Comprehensive evaluation across multiple dimensions",
    },
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
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  AI-Powered <span className="gradient-primary bg-clip-text text-transparent">Interviews</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Conduct intelligent video interviews with real-time AI analysis, fraud detection, and comprehensive scoring
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button size="lg" onClick={() => navigate('/interviews')} className="gap-2">
                    <List className="h-5 w-5" />
                    Browse Interviews
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/create-interview')} className="gap-2">
                    <Plus className="h-5 w-5" />
                    Create Interview
                  </Button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 shadow-soft"
                  >
                    <feature.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Demo Interview */}
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Try Interview Demo</h2>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                    <Play className="w-16 h-16 text-primary" />
                  </div>
                  <Button className="w-full" size="lg">
                    Start Demo Interview
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Experience our AI interviewer with sample questions
                  </p>
                </Card>

                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Sample Scoring</h2>
                  <div className="space-y-6">
                    <ScoreCard label="Overall Performance" score={85} color="primary" />
                    <ScoreCard label="Communication Skills" score={78} color="blue" />
                    <ScoreCard label="Technical Knowledge" score={92} color="green" />
                    <ScoreCard label="Confidence Level" score={81} color="purple" />
                  </div>
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">No fraud detected</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Results */}
              {!loading && results.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8">Your Interview Results</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((result) => (
                      <Card key={result.id} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Video className="w-8 h-8 text-primary" />
                          {result.fraud_detected && (
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="space-y-3 mb-4">
                          <ScoreCard label="Overall" score={result.overall_score} color="primary" />
                          <ScoreCard label="Communication" score={result.communication_score} color="blue" />
                          <ScoreCard label="Technical" score={result.technical_score} color="green" />
                          <ScoreCard label="Confidence" score={result.confidence_score} color="purple" />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(result.completed_at).toLocaleDateString()}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* How It Works */}
              <div className="mt-20 bg-muted/30 rounded-2xl p-12">
                <h2 className="text-3xl font-bold text-center mb-12">How AI Interviews Work</h2>
                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    { step: "1", title: "Setup", description: "Configure interview questions and criteria" },
                    { step: "2", title: "Invite", description: "Send interview link to candidates" },
                    { step: "3", title: "Record", description: "Candidates complete video interview" },
                    { step: "4", title: "Analyze", description: "AI evaluates and scores responses" },
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AIInterview;
