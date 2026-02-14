import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, FileText, Video, Award, User, Bell, Settings,
  LogOut, BookOpen, TrendingUp, ChevronLeft, ChevronRight, Menu, X, Shield
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/jobseeker" },
  { icon: FileText, label: "Assessments", path: "/jobseeker/assessments" },
  { icon: Video, label: "Interviews", path: "/jobseeker/interviews" },
  { icon: TrendingUp, label: "Results", path: "/jobseeker/results" },
  { icon: Award, label: "Certificates", path: "/jobseeker/certificates" },
  { icon: User, label: "Profile", path: "/jobseeker/profile" },
  { icon: Shield, label: "Privacy", path: "/jobseeker/privacy" },
  { icon: BookOpen, label: "Guidelines", path: "/jobseeker/guidelines" },
  { icon: Bell, label: "Notifications", path: "/jobseeker/notifications" },
  { icon: Settings, label: "Settings", path: "/jobseeker/settings" },
];

export function JobSeekerLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: profile } = useQuery({
    queryKey: ["jobseeker-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await (supabase as any).from("profiles").select("*").eq("id", user.id).single();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unread-notifications", user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const { count } = await (supabase as any)
        .from("job_seeker_notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", false);
      return count || 0;
    },
    enabled: !!user?.id,
    refetchInterval: 30000,
  });

  const userName = profile?.full_name || user?.email?.split("@")[0] || "Job Seeker";

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const isActive = (path: string) => {
    if (path === "/jobseeker") return location.pathname === "/jobseeker";
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-border flex items-center gap-3">
        <img src="/interq-logo.png" alt="InterQ" className="h-8 w-8 object-contain flex-shrink-0" />
        {!collapsed && <span className="font-bold text-lg">Job Seeker</span>}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => { navigate(item.path); setMobileOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative",
              isActive(item.path)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
            {item.label === "Notifications" && unreadCount > 0 && (
              <Badge className="ml-auto text-[10px] h-5 min-w-5 flex items-center justify-center">{unreadCount}</Badge>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="w-8 h-8 border border-border">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                {userName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300 sticky top-0 h-screen",
        collapsed ? "w-16" : "w-64"
      )}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-card flex flex-col h-full shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 overflow-auto min-w-0">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-muted rounded-lg" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Welcome, {userName}!</h1>
              <p className="text-xs text-muted-foreground">Manage your career journey</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate("/jobseeker/notifications")}>
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Avatar className="w-8 h-8 border border-border cursor-pointer" onClick={() => navigate("/jobseeker/profile")}>
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                {userName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
