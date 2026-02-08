import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Sparkles, Brain, Zap, Target, Layers, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const IT_ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Mobile Developer",
  "QA Engineer",
  "Product Manager",
  "UX Designer"
];

export default function CreateInterview() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    job_role: "",
    duration_minutes: 60,
    difficulty: "medium",
    question_count: 10,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.job_role) {
      toast({
        title: "Configuration Error",
        description: "Please specify both Title and Role for the AI engine.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const { data: interview, error: interviewError } = await supabase
        .from('interviews')
        .insert({
          title: formData.title,
          description: formData.description,
          job_role: formData.job_role,
          duration_minutes: formData.duration_minutes,
          is_published: true,
          created_by: user?.id,
          questions: {},
        })
        .select()
        .single();

      if (interviewError) throw interviewError;

      setGenerating(true);
      const { data: genData, error: genError } = await supabase.functions.invoke('generate-interview-questions', {
        body: {
          interviewId: interview.id,
          jobRole: formData.job_role,
          difficulty: formData.difficulty,
          questionCount: formData.question_count,
        }
      });

      if (genError) throw genError;

      toast({
        title: "Intelligence Synthesized",
        description: `Successfully mapped ${genData.mcqCount} MCQ and ${genData.codingCount} Coding parameters.`,
      });

      navigate('/ai-interview');

    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Synthesis Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  };

  if (generating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-12"
        >
          <div className="relative">
            <div className="w-48 h-48 mx-auto rounded-[3rem] border-4 border-primary/20 border-t-primary animate-spin" />
            <Brain className="absolute inset-0 m-auto text-primary animate-pulse" size={64} />
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-glow animate-bounce">
              <Zap className="text-white" size={20} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight">Synthesizing Cognitive Vectors</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">AI is currently mapping job requirements to technical rubrics...</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-muted-foreground">
              <span>Semantic Mapping</span>
              <span className="animate-pulse">Active</span>
            </div>
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 15, ease: "linear" }}
                className="h-full bg-primary shadow-glow"
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
        <Navigation />

        {/* Cinematic Backdrop */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-slow-pulse" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[80px] animate-slow-pulse" />
        </div>

        <main className="flex-grow container mx-auto px-4 py-32 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/ai-interview')}
                className="group font-bold text-muted-foreground hover:text-foreground -ml-4"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Intelligence Console
              </Button>
              <div>
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.2em] font-black text-[10px] mb-4">Neural Generator</Badge>
                <h1 className="text-5xl font-black tracking-tighter leading-none">Assemble AI Interview</h1>
                <p className="text-xl text-muted-foreground font-medium mt-4">Define your hiring parameters. Our engine will synthesize the rest.</p>
              </div>
            </div>

            {/* Form Workspace */}
            <form onSubmit={handleSubmit} className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-8 space-y-6">
                <Card className="p-8 bg-card/50 backdrop-blur-xl border-primary/20 rounded-[2rem] shadow-elegant space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Session Identifier</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      placeholder="e.g., Lead Systems Engineer - Q3 Intake"
                      className="h-16 text-xl font-bold bg-transparent border-b-2 border-x-0 border-t-0 border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Contextual Metadata</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Specify team needs, specific tech stacks, or project goals..."
                      className="min-h-[120px] bg-secondary/20 border-border/50 rounded-2xl p-4 focus:ring-primary/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Job Archetype</Label>
                      <Select
                        value={formData.job_role}
                        onValueChange={(value) => handleChange('job_role', value)}
                      >
                        <SelectTrigger className="h-14 rounded-xl font-bold">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {IT_ROLES.map(role => (
                            <SelectItem key={role} value={role} className="font-bold">
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Cognitive Depth</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value) => handleChange('difficulty', value)}
                      >
                        <SelectTrigger className="h-14 rounded-xl font-bold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy" className="text-green-500 font-bold">Standard</SelectItem>
                          <SelectItem value="medium" className="text-amber-500 font-bold">Advanced</SelectItem>
                          <SelectItem value="hard" className="text-red-500 font-bold">Expert (Senior+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar Config */}
              <div className="md:col-span-4 space-y-6">
                <Card className="p-6 bg-primary/5 border border-primary/20 rounded-3xl space-y-6">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-primary" />
                    <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">Precision Controls</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground">Session Minutes</Label>
                      <Input
                        type="number"
                        value={formData.duration_minutes}
                        onChange={(e) => handleChange('duration_minutes', parseInt(e.target.value))}
                        className="bg-background border-border/50 font-black h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground">Inquiry Count</Label>
                      <Input
                        type="number"
                        value={formData.question_count}
                        onChange={(e) => handleChange('question_count', parseInt(e.target.value))}
                        className="bg-background border-border/50 font-black h-12"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-2xl space-y-2 border border-primary/20">
                    <div className="flex items-center gap-2 text-primary">
                      <Layers size={14} />
                      <span className="text-[10px] font-black uppercase">Payload Mix</span>
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground leading-snug">
                      {Math.floor(formData.question_count * 0.6)} MCQ Synthetics <br />
                      {formData.question_count - Math.floor(formData.question_count * 0.6)} Deep Coding Tasks
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || generating}
                    className="w-full h-16 rounded-2xl font-black text-lg gradient-primary border-0 shadow-glow transition-all active:scale-95"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={20} className="mr-2" /> Sync with AI</>}
                  </Button>
                </Card>

                <p className="text-[10px] font-bold text-center text-muted-foreground uppercase tracking-widest px-4">
                  By synthesizing, you agree to our <span className="text-primary underline">AI Ethics & Bias Policy</span>.
                </p>
              </div>
            </form>
          </motion.div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
