import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileStatusCardProps {
  profile: any;
  isLoading: boolean;
}

export function ProfileStatusCard({ profile, isLoading }: ProfileStatusCardProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-3 w-full rounded-full" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-48" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const items = [
    { label: "Full Name", done: !!profile?.full_name },
    { label: "Resume Uploaded", done: !!profile?.resume_url },
    { label: "Skills Added", done: (profile?.skills?.length || 0) > 0 },
    { label: "Work Experience", done: (profile?.work_experience as any[])?.length > 0 },
    { label: "Education", done: (profile?.education as any[])?.length > 0 },
    { label: "Location", done: !!profile?.location || !!profile?.country },
  ];

  const completed = items.filter((i) => i.done).length;
  const percentage = Math.round((completed / items.length) * 100);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          Profile Strength
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{percentage}% Complete</span>
            <span className="text-xs text-muted-foreground">{completed}/{items.length}</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-sm">
              {item.done ? (
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
              )}
              <span className={cn(item.done ? "text-foreground" : "text-muted-foreground")}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {percentage < 100 && (
          <Button
            onClick={() => navigate("/jobseeker/profile")}
            className="w-full mt-2"
            size="sm"
          >
            Complete Profile
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
