import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, ArrowRight, Sparkles, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface RecommendedJobsProps {
  isLoading: boolean;
}

export function RecommendedJobs({ isLoading }: RecommendedJobsProps) {
  const navigate = useNavigate();

  const { data: jobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: ["recommended-jobs"],
    queryFn: async () => {
      const { data } = await supabase
        .from("jobs")
        .select("id, title, location, department, employment_type, company_id, companies(name)")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(4);
      return data || [];
    },
  });

  const loading = isLoading || jobsLoading;

  if (loading) {
    return (
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-44" />
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl border border-border/50 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            Recommended Jobs
          </span>
          {jobs.length > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-8" onClick={() => navigate("/jobseeker/assessments")}>
              Browse All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">No jobs available yet</p>
            <p className="text-xs text-muted-foreground mb-4">Complete your profile to get personalized recommendations</p>
            <Button size="sm" onClick={() => navigate("/jobseeker/profile")}>
              Complete Profile <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {jobs.map((job: any) => (
              <div
                key={job.id}
                className="group p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  {job.employment_type && (
                    <Badge variant="secondary" className="text-[10px] capitalize">
                      {job.employment_type}
                    </Badge>
                  )}
                </div>
                <h4 className="text-sm font-semibold mb-1 truncate group-hover:text-primary transition-colors">
                  {job.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-0.5">
                  {(job as any).companies?.name || "Company"}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  {job.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                  )}
                  {job.department && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> {job.department}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs rounded-full px-4"
                  onClick={() => navigate(`/jobseeker/assessments`)}
                >
                  Apply <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
