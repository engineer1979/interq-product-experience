import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, Award, FileText, Video, User, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const JobSeekerPrivacy = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["js-privacy", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await (supabase as any).from("profiles").select("profile_visibility, visibility_settings").eq("id", user.id).single();
      return data;
    },
    enabled: !!user?.id,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState({
    show_certificates: true,
    show_test_scores: true,
    show_interview_results: true,
    hide_contact_info: true,
  });

  useEffect(() => {
    if (profile) {
      setIsVisible(profile.profile_visibility ?? false);
      if (profile.visibility_settings) {
        setSettings({ ...settings, ...profile.visibility_settings });
      }
    }
  }, [profile]);

  const updatePrivacy = useMutation({
    mutationFn: async () => {
      const { error } = await (supabase as any).from("profiles").update({
        profile_visibility: isVisible,
        visibility_settings: settings,
      }).eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["js-privacy"] });
      toast({ title: "Privacy updated", description: "Your visibility settings have been saved." });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const toggleItems = [
    { key: "show_certificates", label: "Show Certificates", desc: "Companies can see your earned certificates", icon: Award },
    { key: "show_test_scores", label: "Show Test Scores", desc: "Companies can see your assessment results", icon: FileText },
    { key: "show_interview_results", label: "Show Interview Results", desc: "Companies can see your interview performance", icon: Video },
    { key: "hide_contact_info", label: "Hide Contact Info", desc: "Your email and phone are hidden from companies", icon: User },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /> Privacy Controls</h2>
        <p className="text-sm text-muted-foreground mt-1">Control what companies can see about you</p>
      </div>

      {/* Master Toggle */}
      <Card className={cn("shadow-soft border-2 transition-colors", isVisible ? "border-green-500/30" : "border-border")}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", isVisible ? "bg-green-500/10" : "bg-muted")}>
                {isVisible ? <Eye className="w-6 h-6 text-green-600" /> : <EyeOff className="w-6 h-6 text-muted-foreground" />}
              </div>
              <div>
                <p className="font-bold text-lg">Profile Visibility</p>
                <p className="text-sm text-muted-foreground">
                  {isVisible ? "Your profile is visible to companies" : "Your profile is private (default)"}
                </p>
              </div>
            </div>
            <Switch checked={isVisible} onCheckedChange={setIsVisible} />
          </div>
        </CardContent>
      </Card>

      {/* Granular Controls */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">What Companies Can See</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {toggleItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <Switch
                checked={(settings as any)[item.key]}
                onCheckedChange={(val) => setSettings({ ...settings, [item.key]: val })}
                disabled={!isVisible && item.key !== "hide_contact_info"}
              />
            </div>
          ))}
          {!isVisible && (
            <p className="text-xs text-muted-foreground text-center pt-2">
              Enable profile visibility to control individual settings.
            </p>
          )}
        </CardContent>
      </Card>

      <Button onClick={() => updatePrivacy.mutate()} disabled={updatePrivacy.isPending}>
        <Save className="w-4 h-4 mr-2" />
        {updatePrivacy.isPending ? "Saving..." : "Save Privacy Settings"}
      </Button>
    </motion.div>
  );
};

export default JobSeekerPrivacy;
