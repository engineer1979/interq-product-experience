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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const itAssessments: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    duration_minutes: number;
  }> = [
    { id: "it-1", title: "Full Stack Developer Assessment", category: "Programming", description: "JavaScript, React, Node.js, REST APIs, and database integration.", difficulty: "hard", duration_minutes: 60 },
    { id: "it-2", title: "Backend Developer Assessment", category: "Software Development", description: "API development, authentication, databases, and system architecture.", difficulty: "medium", duration_minutes: 50 },
    { id: "it-3", title: "Frontend Developer Assessment", category: "Web Development", description: "HTML, CSS, JavaScript, responsive design, and UI performance.", difficulty: "medium", duration_minutes: 45 },
    { id: "it-4", title: "DevOps Engineer Assessment", category: "DevOps", description: "CI/CD pipelines, Docker, Kubernetes, monitoring, and automation.", difficulty: "hard", duration_minutes: 60 },
    { id: "it-5", title: "Cloud Engineer Assessment", category: "Cloud Computing", description: "AWS/Azure/GCP services, networking, and infrastructure design.", difficulty: "hard", duration_minutes: 55 },
    { id: "it-6", title: "Cybersecurity Analyst Assessment", category: "Security", description: "Threat detection, vulnerability assessment, and incident response.", difficulty: "hard", duration_minutes: 60 },
    { id: "it-7", title: "Network Engineer Assessment", category: "Infrastructure", description: "Routing, switching, firewalls, and network troubleshooting.", difficulty: "medium", duration_minutes: 45 },
    { id: "it-8", title: "System Administrator Assessment", category: "IT Operations", description: "Linux/Windows server management, scripting, and monitoring.", difficulty: "medium", duration_minutes: 45 },
    { id: "it-9", title: "Python Developer Assessment", category: "Programming", description: "Data structures, OOP, APIs, and performance optimization.", difficulty: "medium", duration_minutes: 40 },
    { id: "it-10", title: "Java Developer Assessment", category: "Programming", description: "Core Java, Spring Boot, multithreading, and backend systems.", difficulty: "hard", duration_minutes: 50 },
    { id: "it-11", title: "Database Administrator Assessment", category: "Databases", description: "SQL tuning, indexing, backups, and database security.", difficulty: "medium", duration_minutes: 45 },
    { id: "it-12", title: "Machine Learning Engineer Assessment", category: "AI & ML", description: "Model training, feature engineering, and deployment pipelines.", difficulty: "hard", duration_minutes: 60 },
    { id: "it-13", title: "QA Automation Engineer Assessment", category: "Testing", description: "Selenium, test frameworks, CI integration, and debugging.", difficulty: "medium", duration_minutes: 40 },
    { id: "it-14", title: "Mobile App Developer Assessment", category: "Mobile Development", description: "Android/iOS fundamentals, APIs, and app performance.", difficulty: "medium", duration_minutes: 45 },
    { id: "it-15", title: "Site Reliability Engineer Assessment", category: "DevOps", description: "Monitoring, reliability, scaling, and incident management.", difficulty: "hard", duration_minutes: 60 },
    { id: "it-16", title: "IT Support Specialist Assessment", category: "IT Support", description: "Troubleshooting hardware, software, and user support issues.", difficulty: "easy", duration_minutes: 30 },
    { id: "it-17", title: "Blockchain Developer Assessment", category: "Emerging Technologies", description: "Smart contracts, distributed systems, and cryptography basics.", difficulty: "hard", duration_minutes: 55 },
    { id: "it-18", title: "Data Engineer Assessment", category: "Data Engineering", description: "ETL pipelines, data warehousing, and big data tools.", difficulty: "hard", duration_minutes: 60 },
    { id: "it-19", title: "Embedded Systems Engineer Assessment", category: "Hardware & Systems", description: "C/C++, microcontrollers, and low-level programming.", difficulty: "hard", duration_minutes: 55 },
    { id: "it-20", title: "IT Project Manager Assessment", category: "Management", description: "Agile, Scrum, risk management, and stakeholder coordination.", difficulty: "medium", duration_minutes: 40 },
  ];

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
      const dummyData: Assessment[] = [
        { id: "1", title: "Frontend Challenge", description: "Test your React and CSS skills", category: "Engineering", difficulty: "medium", duration_minutes: 30, is_published: true },
        { id: "2", title: "Product Design", description: "UX/UI principles assessment", category: "Design", difficulty: "easy", duration_minutes: 20, is_published: true },
        { id: "3", title: "Backend Systems", description: "Database and API knowledge", category: "Engineering", difficulty: "hard", duration_minutes: 45, is_published: true },
      ];
      setAssessments(dummyData);
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

  const hiddenTitles = [
    "HR Manager - Generalist",
    "HR Executive - Recruitment",
    "Talent Acquisition Specialist",
    "Sales Fundamentals & CRM",
    "B2B Sales & Enterprise Selling",
    "Banking Operations",
    "Banking Compliance & AML",
    "Customer Support Excellence",
    "Finance Fundamentals",
    "Investment Analysis & Portfolio Management",
    "Healthcare Administration",
    "Clinical Operations Management",
    "Pharmacy Technician Essentials",
    "Pharmacy Management & Compliance",
    "Accounting Fundamentals",
    "Advanced Accounting & Taxation",
    "Data Analyst Assessment",
  ];

  const categories = ["All", ...Array.from(new Set(assessments.filter(a => !hiddenTitles.includes(a.title)).map(a => a.category))).sort()];

  const filteredAssessments = assessments.filter((assessment) =>
    !hiddenTitles.includes(assessment.title) &&
    (selectedCategory === "All" || assessment.category === selectedCategory) &&
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
                  { icon: Search, title: "1. Select", desc: "Choose an assessment", action: () => document.getElementById('assessment-list')?.scrollIntoView({ behavior: 'smooth' }) },
                  { icon: FileQuestion, title: "2. Instructions", desc: "Read guidelines", action: () => { const id = assessments[0]?.id || "1"; navigate(`/assessment/${id}`); } },
                  { icon: Play, title: "3. Start", desc: "Begin immediately", action: () => { const id = assessments[0]?.id || "1"; navigate(`/assessment/${id}`); } },
                  { icon: Clock, title: "4. Complete", desc: "Submit answers", action: () => { const id = assessments[0]?.id || "1"; navigate(`/assessment/${id}`); } },
                  { icon: Award, title: "5. Results", desc: "Get feedback", action: () => navigate('/admin/results') },
                ].map((step, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center text-center relative z-10 cursor-pointer group"
                    onClick={step.action}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                    {/* Connecting line for desktop */}
                    {index < 4 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border -z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12">IT Assessment Dashboard</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itAssessments.map((item) => (
                  <Card key={item.id} className="p-6 hover:shadow-elegant transition-all duration-300 border-border hover:border-primary/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileQuestion className="w-6 h-6 text-primary" />
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                          item.difficulty === "easy"
                            ? "bg-green-100 text-green-700"
                            : item.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground mb-2">
                      {item.category}
                    </span>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between text-sm mt-auto border-t border-border/50 pt-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                        <Clock className="w-4 h-4" />
                        {item.duration_minutes} min
                      </span>
                      <Button
                        size="sm"
                        className="h-8 px-3"
                        onClick={() =>
                          navigate("/assessment-workflow", {
                            state: {
                              title: item.title,
                              category: item.category,
                              difficulty: item.difficulty,
                              duration_minutes: item.duration_minutes,
                            },
                          })
                        }
                      >
                        Start <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
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
            <div id="assessment-list" className="space-y-6">
              <div className="flex flex-col gap-4 border-b border-border pb-4">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                  <h3 className="text-2xl font-bold">Available Assessments <span className="text-muted-foreground text-lg font-normal">({filteredAssessments.length})</span></h3>
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
                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
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
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{assessment.title}</h3>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground mb-2">{assessment.category}</span>
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

            {/* Live Interview Section */}
            <div className="mt-20 pt-16 border-t border-border">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Coming Next</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Live <span className="text-gradient">Interview</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  After completing your assessment, take the next step with an AI-powered live interview session.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: User,
                    title: "Face-to-Face with AI",
                    desc: "Engage in a realistic interview simulation powered by advanced AI that adapts to your responses in real-time.",
                  },
                  {
                    icon: Timer,
                    title: "Timed & Structured",
                    desc: "Experience structured interview rounds with time management, just like a real professional interview.",
                  },
                  {
                    icon: BarChart,
                    title: "Detailed Analytics",
                    desc: "Receive comprehensive feedback on communication, technical accuracy, and confidence scores.",
                  },
                ].map((item, i) => (
                  <Card key={i} className="p-6 text-center border-border hover:border-primary/40 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Button
                  size="lg"
                  className="text-lg px-10 h-14 shadow-lg shadow-primary/20"
                  onClick={() => navigate("/assessment-workflow")}
                >
                  Start Live Interview <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Assessments;
