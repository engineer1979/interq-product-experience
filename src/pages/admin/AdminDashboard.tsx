import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, ClipboardList, Award, Building2, GraduationCap, TrendingUp, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const [
        { count: totalAssessments },
        { count: totalQuestions },
        { count: totalResults },
        { count: totalInterviews },
        { count: totalProfiles },
        { count: totalSessions },
      ] = await Promise.all([
        supabase.from("assessments").select("*", { count: "exact", head: true }),
        supabase.from("assessment_questions").select("*", { count: "exact", head: true }),
        supabase.from("assessment_results").select("*", { count: "exact", head: true }),
        supabase.from("interviews").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("assessment_sessions").select("*", { count: "exact", head: true }),
      ]);
      return {
        totalAssessments: totalAssessments ?? 0,
        totalQuestions: totalQuestions ?? 0,
        totalResults: totalResults ?? 0,
        totalInterviews: totalInterviews ?? 0,
        totalProfiles: totalProfiles ?? 0,
        totalSessions: totalSessions ?? 0,
      };
    },
  });

  const { data: recentResults } = useQuery({
    queryKey: ["admin-recent-results"],
    queryFn: async () => {
      const { data } = await supabase
        .from("assessment_results")
        .select("id, score, total_points, percentage, passed, completed_at, assessment_id")
        .order("completed_at", { ascending: false })
        .limit(8);
      return data ?? [];
    },
  });

  const { data: recentAssessments } = useQuery({
    queryKey: ["admin-recent-assessments"],
    queryFn: async () => {
      const { data } = await supabase
        .from("assessments")
        .select("id, title, category, difficulty, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  const summaryCards = [
    { title: "Total Tests", value: stats?.totalAssessments, icon: BookOpen, color: "text-blue-600 bg-blue-50" },
    { title: "Questions", value: stats?.totalQuestions, icon: Users, color: "text-violet-600 bg-violet-50" },
    { title: "Test Attempts", value: stats?.totalSessions, icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
    { title: "Results", value: stats?.totalResults, icon: ClipboardList, color: "text-amber-600 bg-amber-50" },
    { title: "Interviews", value: stats?.totalInterviews, icon: Activity, color: "text-pink-600 bg-pink-50" },
    { title: "Users", value: stats?.totalProfiles, icon: GraduationCap, color: "text-cyan-600 bg-cyan-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform overview and recent activity</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="border-border/50">
            <CardContent className="p-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                <card.icon className="h-4 w-4" />
              </div>
              {isLoading ? (
                <Skeleton className="h-7 w-12 mb-1" />
              ) : (
                <p className="text-2xl font-bold">{card.value}</p>
              )}
              <p className="text-xs text-muted-foreground">{card.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Results */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResults?.map((result) => (
                <div key={result.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="text-sm">
                    <p className="font-medium truncate max-w-[200px]">Result #{result.id.slice(0, 8)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(result.completed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{Number(result.percentage).toFixed(0)}%</span>
                    <Badge variant={result.passed ? "default" : "destructive"} className="text-[10px]">
                      {result.passed ? "Pass" : "Fail"}
                    </Badge>
                  </div>
                </div>
              ))}
              {!recentResults?.length && (
                <p className="text-sm text-muted-foreground text-center py-4">No results yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assessments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recently Added Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAssessments?.map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="text-sm">
                    <p className="font-medium">{assessment.title}</p>
                    <p className="text-xs text-muted-foreground">{assessment.category}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{assessment.difficulty}</Badge>
                </div>
              ))}
              {!recentAssessments?.length && (
                <p className="text-sm text-muted-foreground text-center py-4">No tests yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
