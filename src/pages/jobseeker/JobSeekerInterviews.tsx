import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const JobSeekerInterviews = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["js-interview-sessions", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await supabase.from("interview_sessions")
        .select("*, interviews(title, job_role, duration_minutes, description)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: availableInterviews = [] } = useQuery({
    queryKey: ["js-available-interviews"],
    queryFn: async () => {
      const { data } = await supabase.from("interviews").select("*").eq("is_published", true).order("created_at", { ascending: false });
      return data || [];
    },
  });

  const upcoming = sessions.filter((s: any) => !s.completed && s.status !== "completed");
  const completed = sessions.filter((s: any) => s.completed || s.status === "completed");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Interviews</h2>
        <p className="text-sm text-muted-foreground">Schedule and manage your live interviews</p>
      </div>

      {/* Available Interviews */}
      {availableInterviews.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-lg">Available Interviews</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {availableInterviews.slice(0, 5).map((interview: any) => (
              <div key={interview.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{interview.title}</p>
                  <p className="text-xs text-muted-foreground">{interview.job_role} • {interview.duration_minutes} min</p>
                </div>
                <Button size="sm" onClick={() => navigate("/book-session")}>
                  Schedule <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Upcoming */}
      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Calendar className="w-5 h-5 text-amber-500" /> Upcoming</CardTitle></CardHeader>
        <CardContent>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No upcoming interviews scheduled.</p>
          ) : (
            <div className="space-y-3">
              {upcoming.map((s: any) => (
                <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{(s as any).interviews?.title || "Interview"}</p>
                    <p className="text-xs text-muted-foreground">{(s as any).interviews?.job_role} • {new Date(s.created_at).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed */}
      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Completed</CardTitle></CardHeader>
        <CardContent>
          {completed.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No completed interviews yet.</p>
          ) : (
            <div className="space-y-3">
              {completed.map((s: any) => (
                <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{(s as any).interviews?.title || "Interview"}</p>
                    <p className="text-xs text-muted-foreground">{new Date(s.completed_at || s.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    {s.final_score && <p className="font-bold text-sm">{s.final_score}%</p>}
                    <Badge variant="default" className="text-[10px]">Done</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobSeekerInterviews;
