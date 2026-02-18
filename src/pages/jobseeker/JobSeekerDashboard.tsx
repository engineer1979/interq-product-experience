import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { OverviewCards } from "@/components/jobseeker/dashboard/OverviewCards";
import { ProfileStatusCard } from "@/components/jobseeker/dashboard/ProfileStatusCard";
import { RecentApplications } from "@/components/jobseeker/dashboard/RecentApplications";
import { AssessmentsSection } from "@/components/jobseeker/dashboard/AssessmentsSection";
import { NotificationsPanel } from "@/components/jobseeker/dashboard/NotificationsPanel";
import { QuickActions } from "@/components/jobseeker/dashboard/QuickActions";
import { RecommendedJobs } from "@/components/jobseeker/dashboard/RecommendedJobs";

const JobSeekerDashboard = () => {
  const { user } = useAuth();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["js-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await (supabase as any).from("profiles").select("*").eq("id", user.id).single();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: assessmentResults = [], isLoading: resultsLoading } = useQuery({
    queryKey: ["js-assessment-results", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await supabase.from("assessment_results").select("*, assessments(title, category)").eq("user_id", user.id).order("completed_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: notifications = [], isLoading: notifsLoading } = useQuery({
    queryKey: ["js-recent-notifications", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await (supabase as any).from("job_seeker_notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Profile completion percentage
  const profileItems = [
    !!profile?.full_name,
    !!profile?.resume_url,
    (profile?.skills?.length || 0) > 0,
    (profile?.work_experience as any[])?.length > 0,
    (profile?.education as any[])?.length > 0,
    !!profile?.location || !!profile?.country,
  ];
  const profileCompletion = profileItems.length > 0
    ? Math.round((profileItems.filter(Boolean).length / profileItems.length) * 100)
    : 0;

  const isLoading = profileLoading || resultsLoading || notifsLoading;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Overview Stats */}
      <OverviewCards
        profileCompletion={profileCompletion}
        jobsApplied={0}
        assessmentsCompleted={assessmentResults.length}
        savedJobs={0}
        isLoading={isLoading}
      />

      {/* Main Grid: Left content + Right sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <RecentApplications applications={[]} isLoading={isLoading} />
          <RecommendedJobs isLoading={isLoading} />
          <AssessmentsSection results={assessmentResults} isLoading={isLoading} />
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <ProfileStatusCard profile={profile} isLoading={isLoading} />
          <NotificationsPanel notifications={notifications} isLoading={isLoading} />
          <QuickActions />
        </div>
      </div>
    </motion.div>
  );
};

export default JobSeekerDashboard;
