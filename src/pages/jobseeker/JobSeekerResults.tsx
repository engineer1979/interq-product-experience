import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, FileText, Download, TrendingUp, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const JobSeekerResults = () => {
  const { user } = useAuth();

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["js-all-results", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await supabase.from("assessment_results")
        .select("*, assessments(title, category, difficulty)")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: interviewResults = [] } = useQuery({
    queryKey: ["js-interview-results", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await supabase.from("interview_results")
        .select("*, interviews(title, job_role)")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });

  const getRating = (pct: number) => {
    if (pct >= 90) return { label: "Excellent", color: "bg-green-500/10 text-green-700" };
    if (pct >= 70) return { label: "Good", color: "bg-primary/10 text-primary" };
    return { label: "Needs Improvement", color: "bg-amber-500/10 text-amber-700" };
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Your Results</h2>
        <p className="text-sm text-muted-foreground">View all assessment and interview scores</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{results.length}</p>
            <p className="text-xs text-muted-foreground">Assessments</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{interviewResults.length}</p>
            <p className="text-xs text-muted-foreground">Interviews</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {results.length > 0 ? Math.round(results.reduce((s: number, r: any) => s + r.percentage, 0) / results.length) : 0}%
            </p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Results */}
      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Assessment Results</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" /></div>
          ) : results.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No assessment results yet.</p>
          ) : (
            results.map((r: any) => {
              const rating = getRating(r.percentage);
              return (
                <div key={r.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", r.passed ? "bg-green-500/10" : "bg-destructive/10")}>
                    {r.passed ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-destructive" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{(r as any).assessments?.title || "Assessment"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">{(r as any).assessments?.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {r.time_taken_minutes || "—"} min
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{r.percentage}%</p>
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", rating.color)}>{rating.label}</span>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Interview Results */}
      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-600" /> Interview Results</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {interviewResults.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No interview results yet.</p>
          ) : (
            interviewResults.map((r: any) => (
              <div key={r.id} className="p-4 rounded-xl bg-muted/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{(r as any).interviews?.title || "Interview"}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.completed_at).toLocaleDateString()}</p>
                  </div>
                  <p className="text-lg font-bold text-primary">{r.overall_score}%</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded-lg bg-background">
                    <p className="text-sm font-bold">{r.technical_score}%</p>
                    <p className="text-[10px] text-muted-foreground">Technical</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-background">
                    <p className="text-sm font-bold">{r.communication_score}%</p>
                    <p className="text-[10px] text-muted-foreground">Communication</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-background">
                    <p className="text-sm font-bold">{r.confidence_score}%</p>
                    <p className="text-[10px] text-muted-foreground">Confidence</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobSeekerResults;
