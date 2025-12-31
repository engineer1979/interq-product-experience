import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Filter, Clock, FileQuestion, CheckCircle, Timer, Award, BarChart, User, Play, LogIn, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration_minutes: number;
  is_published: boolean;
}

const Assessments = () => {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error: any) {
      // Create some dummy data if fetch fails (e.g. RLS blocks anon)
      const dummyData = [
        { id: "1", title: "Frontend Challenge", description: "Test your React and CSS skills", category: "Engineering", difficulty: "medium", duration_minutes: 30, is_published: true },
        { id: "2", title: "Product Design", description: "UX/UI principles assessment", category: "Design", difficulty: "easy", duration_minutes: 20, is_published: true },
        { id: "3", title: "Backend Systems", description: "Database and API knowledge", category: "Engineering", difficulty: "hard", duration_minutes: 45, is_published: true },
      ];
      setAssessments((data && data.length > 0) ? data : dummyData);
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

  /* Filter out HR Manager and Executive assessments as requested */
  const hiddenTitles = ["HR Manager - Generalist", "HR Executive - Recruitment"];

  const filteredAssessments = assessments.filter((assessment) =>
    !hiddenTitles.includes(assessment.title) &&
    (assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.category.toLowerCase().includes(searchQuery.toLowerCase()))
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
                Skill <span className="text-gradient">Assessments</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Validate your expertise with our industry-standard assessments. Take them anytime, anywhere.
              </p>
            </div>

            {/* How It Works - Process Explanation */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid md:grid-cols-5 gap-8 relative">
                {[
                  { icon: Search, title: "1. Select", desc: "Choose an assessment" },
                  { icon: FileQuestion, title: "2. Instructions", desc: "Read guidelines" },
                  { icon: Play, title: "3. Start", desc: "Begin immediately" },
                  { icon: Clock, title: "4. Complete", desc: "Submit answers" },
                  { icon: Award, title: "5. Results", desc: "Get feedback" },
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary shadow-sm">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                    {/* Connecting line for desktop */}
                    {index < 4 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border -z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Two Column Layout: Features + Login/Action */}
            <div className="grid lg:grid-cols-3 gap-12 mb-20 items-start">

              {/* Key Features */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Key Assessment Features</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { icon: FileQuestion, label: "Variety of Questions", desc: "Multiple-choice, coding, & video responses" },
                      { icon: Timer, label: "Timed Tests", desc: "Real-world pressure simulation" },
                      { icon: CheckCircle, label: "Instant Feedback", desc: "Immediate scoring on submission" },
                      { icon: BarChart, label: "Automatic Grading", desc: "AI-powered evaluation systems" },
                      { icon: User, label: "No Login Required", desc: "Start immediately as a guest" },
                      { icon: Award, label: "Certifications", desc: "Earn badges for passing scores" },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{feature.label}</h4>
                          <p className="text-sm text-muted-foreground">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Action Area */}
                <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Ready to prove your skills?</h3>
                    <p className="text-muted-foreground">Select an assessment below and start immediately. No account needed.</p>
                  </div>
                  <Button size="lg" className="shrink-0 text-lg px-8 h-14 shadow-lg shadow-primary/20" onClick={() => {
                    const firstId = assessments[0]?.id || "1";
                    navigate(`/assessment/${firstId}`);
                  }}>
                    Start Assessment <Play className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Optional Login Card */}
              {!user && (
                <Card className="p-6 border-border shadow-soft sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                      <LogIn className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Save Your Progress</h3>
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

            {/* Assessment List */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-border pb-4">
                <h3 className="text-2xl font-bold">Available Assessments</h3>

                {/* Search */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-card border border-border rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAssessments.map((assessment) => (
                    <Card key={assessment.id} className="group p-6 hover:shadow-elegant transition-all duration-300 border-border hover:border-primary/50 cursor-pointer" onClick={() => navigate(`/assessment/${assessment.id}`)}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileQuestion className="w-6 h-6 text-primary" />
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${assessment.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          assessment.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                          {assessment.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{assessment.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {assessment.description}
                      </p>
                      <div className="flex items-center justify-between text-sm mt-auto border-t border-border/50 pt-4">
                        <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                          <Clock className="w-4 h-4" />
                          {assessment.duration_minutes} min
                        </span>
                        <span className="text-primary font-bold flex items-center gap-1">
                          Start <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Assessments;
