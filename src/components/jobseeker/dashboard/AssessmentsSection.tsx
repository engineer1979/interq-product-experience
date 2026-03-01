import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ArrowRight, CheckCircle, Clock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface AssessmentsSectionProps {
  results: any[];
  isLoading: boolean;
}

export function AssessmentsSection({ results, isLoading }: AssessmentsSectionProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-6 w-12" />
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
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            Assessments
          </span>
          {results.length > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-8" onClick={() => navigate("/jobseeker/results")}>
              View All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {results.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-7 h-7 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">No assessments taken</p>
            <p className="text-xs text-muted-foreground mb-4">Prove your skills and earn certificates</p>
            <Button size="sm" onClick={() => navigate("/jobseeker/assessments")}>
              Take Assessment <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {results.slice(0, 4).map((r: any) => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  r.passed ? "bg-emerald-500/10" : "bg-destructive/10"
                )}>
                  {r.passed ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-destructive" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{(r as any).assessments?.title || "Assessment"}</p>
                  <p className="text-xs text-muted-foreground">{new Date(r.completed_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold">{r.percentage}%</p>
                  <Badge variant={r.passed ? "default" : "secondary"} className="text-[10px]">
                    {r.passed ? "Passed" : "Failed"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
