import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { AssessmentSetupWizard, AssessmentConfig } from "@/components/admin/AssessmentSetupWizard";
import { motion } from "framer-motion";

export default function CreateAssessment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleComplete = async (config: AssessmentConfig) => {
    if (!config.title) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 1. Insert Assessment
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          title: config.title,
          category: config.category,
          difficulty: config.difficulty,
          description: config.description,
          duration_minutes: config.totalDuration,
          passing_score: config.passingScore,
          created_by: user.id,
          is_published: true,
          proctoring_enabled: config.proctoringEnabled,
          // Note: Add AI scoring and other flags if the schema is updated 
          // For now, we store them in the description or just keep them in UI state
        })
        .select()
        .single();

      if (assessmentError) throw assessmentError;

      const assessmentId = assessmentData.id;

      // 2. Insert Questions
      const questionsPayload = config.questions.map((q, index) => ({
        assessment_id: assessmentId,
        question_text: q.text || "New Question",
        question_type: q.type,
        points: q.points || 10,
        order_index: index,
        options: q.type === 'mcq' ? JSON.stringify(q.options || []) : null,
        correct_answer: q.correctAnswer || '',
      }));

      const { error: qError } = await supabase.from('assessment_questions').insert(questionsPayload);
      if (qError) throw qError;

      toast({
        title: "Assessment Deployed",
        description: "Your infrastructure is now live and ready for candidates.",
      });
      navigate('/assessments');

    } catch (error: any) {
      console.error(error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
        <Navigation />

        {/* Decorative background gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <main className="flex-grow container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-glow-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /><circle cx="12" cy="12" r="3" /></svg>
                </motion.div>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight mb-1">Architect Your Intake</h1>
                <p className="text-muted-foreground font-medium">Configure high-signal evaluation environments with InterQ's AI engine.</p>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-primary font-bold animate-pulse text-xs">AI</div>
              </div>
              <div className="text-center animate-pulse">
                <p className="font-black text-xl tracking-tight">Deploying Infrastructure...</p>
                <p className="text-sm text-muted-foreground">Calibrating scoring Rubrics & Anti-cheat vectors.</p>
              </div>
            </div>
          ) : (
            <AssessmentSetupWizard
              onComplete={handleComplete}
              onCancel={() => navigate('/assessments')}
            />
          )}
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
