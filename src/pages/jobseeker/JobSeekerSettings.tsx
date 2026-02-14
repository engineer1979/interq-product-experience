import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, User, Shield, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const JobSeekerSettings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const settingsItems = [
    { icon: User, label: "Edit Profile", desc: "Update your name, skills, and contact info", action: () => navigate("/jobseeker/profile") },
    { icon: Shield, label: "Privacy Settings", desc: "Control what companies can see", action: () => navigate("/jobseeker/privacy") },
    { icon: Bell, label: "Notification Preferences", desc: "Manage your notification settings", action: () => navigate("/jobseeker/notifications") },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold flex items-center gap-2"><Settings className="w-6 h-6 text-primary" /> Settings</h2>

      <Card className="shadow-soft">
        <CardContent className="p-2">
          {settingsItems.map((item, i) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-lg text-destructive">Danger Zone</CardTitle></CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={() => { signOut(); navigate("/"); }}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobSeekerSettings;
