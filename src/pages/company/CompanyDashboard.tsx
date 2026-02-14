import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Users, ClipboardList, BarChart3, Plus, ArrowRight } from "lucide-react";

interface DashboardContext {
  company: { id: string; name: string };
  user: any;
}

export default function CompanyDashboard() {
  const { company, user } = useOutletContext<DashboardContext>();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, tests: 0, results: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [jobsRes, candidatesRes, testsRes, resultsRes] = await Promise.all([
        (supabase as any).from("jobs").select("id", { count: "exact", head: true }).eq("company_id", company.id),
        (supabase as any).from("candidates").select("id", { count: "exact", head: true }).eq("company_id", company.id),
        (supabase as any).from("assessments").select("id", { count: "exact", head: true }).eq("company_id", company.id),
        (supabase as any).from("assessment_results").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        jobs: jobsRes.count ?? 0,
        candidates: candidatesRes.count ?? 0,
        tests: testsRes.count ?? 0,
        results: resultsRes.count ?? 0,
      });
    };
    fetchStats();
  }, [company.id]);

  const statCards = [
    { title: "Active Jobs", value: stats.jobs, icon: Briefcase, color: "text-blue-600", path: "/company/jobs" },
    { title: "Candidates", value: stats.candidates, icon: Users, color: "text-green-600", path: "/company/candidates" },
    { title: "Tests Created", value: stats.tests, icon: ClipboardList, color: "text-purple-600", path: "/company/tests" },
    { title: "Results", value: stats.results, icon: BarChart3, color: "text-orange-600", path: "/company/results" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{company.name}</h1>
          <p className="text-muted-foreground mt-1">Company Hiring Dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/company/jobs")}><Plus className="h-4 w-4 mr-2" />Post a Job</Button>
          <Button variant="outline" onClick={() => navigate("/company/tests")}><Plus className="h-4 w-4 mr-2" />Create Test</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <Card key={card.title} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(card.path)}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-3xl font-bold mt-1">{card.value}</p>
                </div>
                <card.icon className={`h-10 w-10 ${card.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-between h-auto py-4" onClick={() => navigate("/company/jobs")}>
              <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Create Job Posting</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-4" onClick={() => navigate("/company/tests")}>
              <span className="flex items-center gap-2"><ClipboardList className="h-4 w-4" /> Build Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-4" onClick={() => navigate("/company/candidates")}>
              <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Add Candidates</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
