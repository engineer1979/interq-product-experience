import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Briefcase, Upload, Award, Settings, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const actions = [
  { label: "Browse Jobs", desc: "Find opportunities", icon: Briefcase, path: "/jobseeker/assessments", color: "text-primary", bg: "bg-primary/10" },
  { label: "Upload Resume", desc: "Update your resume", icon: Upload, path: "/jobseeker/profile", color: "text-emerald-600", bg: "bg-emerald-500/10" },
  { label: "Take Assessment", desc: "Prove your skills", icon: Award, path: "/jobseeker/assessments", color: "text-amber-600", bg: "bg-amber-500/10" },
  { label: "My Results", desc: "View scores & reports", icon: FileText, path: "/jobseeker/results", color: "text-violet-600", bg: "bg-violet-500/10" },
  { label: "Certificates", desc: "Download certificates", icon: Award, path: "/jobseeker/certificates", color: "text-pink-600", bg: "bg-pink-500/10" },
  { label: "Settings", desc: "Manage preferences", icon: Settings, path: "/jobseeker/settings", color: "text-muted-foreground", bg: "bg-muted" },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-muted/50 transition-colors group"
          >
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", action.bg)}>
              <action.icon className={cn("w-4 h-4", action.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
