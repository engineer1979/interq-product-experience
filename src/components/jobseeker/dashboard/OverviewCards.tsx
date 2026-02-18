import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Briefcase, Award, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OverviewCardsProps {
  profileCompletion: number;
  jobsApplied: number;
  assessmentsCompleted: number;
  savedJobs: number;
  isLoading: boolean;
}

const cards = [
  { key: "profile", label: "Profile Completion", icon: FileText, suffix: "%", color: "text-primary", bg: "bg-primary/10" },
  { key: "applied", label: "Jobs Applied", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-500/10" },
  { key: "assessments", label: "Assessments Done", icon: Award, color: "text-amber-600", bg: "bg-amber-500/10" },
  { key: "saved", label: "Saved Jobs", icon: Bookmark, color: "text-violet-600", bg: "bg-violet-500/10" },
];

export function OverviewCards({ profileCompletion, jobsApplied, assessmentsCompleted, savedJobs, isLoading }: OverviewCardsProps) {
  const values: Record<string, number> = {
    profile: profileCompletion,
    applied: jobsApplied,
    assessments: assessmentsCompleted,
    saved: savedJobs,
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-5">
              <Skeleton className="h-10 w-10 rounded-xl mb-3" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
        >
          <Card className="group border-border/50 hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-5">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", card.bg)}>
                <card.icon className={cn("w-5 h-5", card.color)} />
              </div>
              <p className="text-2xl font-bold tracking-tight">
                {values[card.key]}{card.suffix || ""}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
