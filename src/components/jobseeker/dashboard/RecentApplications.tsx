import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentApplicationsProps {
  applications: any[];
  isLoading: boolean;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-700 border-amber-200",
  shortlisted: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  interview: "bg-primary/10 text-primary border-primary/20",
};

export function RecentApplications({ applications, isLoading }: RecentApplicationsProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-44" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
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
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-emerald-600" />
            </div>
            Recent Applications
          </span>
          {applications.length > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-8" onClick={() => navigate("/jobseeker/results")}>
              View All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">No applications yet</p>
            <p className="text-xs text-muted-foreground mb-4">Start applying to jobs to track your progress</p>
            <Button size="sm" onClick={() => navigate("/jobseeker/assessments")}>
              Browse Jobs <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {applications.slice(0, 4).map((app: any) => (
              <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{app.title || "Job Application"}</p>
                  <p className="text-xs text-muted-foreground">{app.company || "Company"} · {new Date(app.created_at).toLocaleDateString()}</p>
                </div>
                <Badge variant="outline" className={cn("text-[10px] capitalize", statusColors[app.status] || "")}>
                  {app.status || "pending"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
