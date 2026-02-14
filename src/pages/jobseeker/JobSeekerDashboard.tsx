import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText, Video, Award, TrendingUp, ChevronRight, CheckCircle,
  Clock, Eye, EyeOff, Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["js-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await (supabase as any).from("profiles").select("*").eq("id", user.id).single();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: assessmentResults = [] } = useQuery({
    queryKey: ["js-assessment-results", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await supabase.from("assessment_results").select("*, assessments(title, category)").eq("user_id", user.id).order("completed_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: certificates = [] } = useQuery({
    queryKey: ["js-certificates", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await (supabase as any).from("job_seeker_certificates").select("*").eq("user_id", user.id).order("issued_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: interviewSessions = [] } = useQuery({
    queryKey: ["js-interviews", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await supabase.from("interview_sessions").select("*, interviews(title, job_role)").eq("user_id", user.id).order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["js-recent-notifications", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await (supabase as any).from("job_seeker_notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
      return data || [];
    },
    enabled: !!user?.id,
  });

  const testsCompleted = assessmentResults.length;
  const interviewsCompleted = interviewSessions.filter((s: any) => s.completed).length;
  const avgScore = testsCompleted > 0
    ? Math.round(assessmentResults.reduce((sum: number, r: any) => sum + (r.percentage || 0), 0) / testsCompleted)
    : 0;
  const certsEarned = certificates.length;
  const isVisible = profile?.profile_visibility ?? false;

  const stats = [
    { label: "Tests Completed", value: testsCompleted, icon: FileText, color: "text-primary", bg: "bg-primary/10" },
    { label: "Interviews Done", value: interviewsCompleted, icon: Video, color: "text-green-600", bg: "bg-green-500/10" },
    { label: "Average Score", value: `${avgScore}%`, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-500/10" },
    { label: "Certificates", value: certsEarned, icon: Award, color: "text-purple-600", bg: "bg-purple-500/10" },
  ];

  const quickActions = [
    { label: "Start Assessment", desc: "Browse and take skill tests", icon: FileText, path: "/jobseeker/assessments", color: "bg-primary/10", iconColor: "text-primary" },
    { label: "View Results", desc: "Check your scores and reports", icon: TrendingUp, path: "/jobseeker/results", color: "bg-green-500/10", iconColor: "text-green-600" },
    { label: "Certificates", desc: "Download earned certificates", icon: Award, path: "/jobseeker/certificates", color: "bg-purple-500/10", iconColor: "text-purple-600" },
    { label: "Update Profile", desc: "Edit your info and skills", icon: CheckCircle, path: "/jobseeker/profile", color: "bg-amber-500/10", iconColor: "text-amber-600" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Visibility Banner */}
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-xl text-sm",
        isVisible ? "bg-green-500/10 text-green-700" : "bg-muted text-muted-foreground"
      )}>
        {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        <span>Profile is {isVisible ? "visible to companies" : "private"}</span>
        <Button variant="ghost" size="sm" className="ml-auto text-xs" onClick={() => navigate("/jobseeker/privacy")}>
          Manage
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-soft hover:shadow-elegant transition-all">
            <CardContent className="p-4 md:p-5">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Card
            key={action.label}
            className="shadow-soft cursor-pointer hover:shadow-elegant transition-all group"
            onClick={() => navigate(action.path)}
          >
            <CardContent className="p-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", action.color)}>
                <action.icon className={cn("w-5 h-5", action.iconColor)} />
              </div>
              <p className="font-semibold text-sm">{action.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Results + Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Recent Results
              <Button variant="ghost" size="sm" onClick={() => navigate("/jobseeker/results")}>View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assessmentResults.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No results yet. Start an assessment!</p>
            ) : (
              assessmentResults.slice(0, 3).map((r: any) => (
                <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", r.passed ? "bg-green-500/10" : "bg-destructive/10")}>
                    {r.passed ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Clock className="w-5 h-5 text-destructive" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{(r as any).assessments?.title || "Assessment"}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.completed_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{r.percentage}%</p>
                    <Badge variant={r.passed ? "default" : "secondary"} className="text-[10px]">
                      {r.passed ? "Passed" : "Failed"}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Notifications
              <Button variant="ghost" size="sm" onClick={() => navigate("/jobseeker/notifications")}>View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No notifications yet.</p>
            ) : (
              notifications.map((n: any) => (
                <div key={n.id} className={cn("flex items-start gap-3 p-3 rounded-xl", !n.is_read && "bg-primary/5")}>
                  <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", n.is_read ? "bg-muted" : "bg-primary")} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(n.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default JobSeekerDashboard;
