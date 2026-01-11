import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/components/settings/UserManagement";
import { PermissionManagement } from "@/components/settings/PermissionManagement";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Users, Shield } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (error || !data) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access settings.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <SettingsIcon className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Admin Settings</h1>
                  <p className="text-muted-foreground">Manage users and permissions</p>
                </div>
              </div>

              <Tabs defaultValue="users" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                  <TabsTrigger value="users" className="gap-2">
                    <Users className="w-4 h-4" />
                    User Management
                  </TabsTrigger>
                  <TabsTrigger value="permissions" className="gap-2">
                    <Shield className="w-4 h-4" />
                    Permissions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                  <UserManagement />
                </TabsContent>

                <TabsContent value="permissions">
                  <PermissionManagement />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Settings;
