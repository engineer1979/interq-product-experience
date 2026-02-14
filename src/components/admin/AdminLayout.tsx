import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, FileText, Settings, LogOut, Menu, X,
  BookOpen, HelpCircle, Users, Building2, GraduationCap,
  Award, Activity, ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NotificationBell } from "@/components/NotificationBell";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const navSections = [
  {
    label: "Overview",
    items: [
      { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/tests", icon: BookOpen, label: "Tests" },
      { to: "/admin/question-bank", icon: HelpCircle, label: "Question Bank" },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/admin/results", icon: FileText, label: "Results" },
      { to: "/admin/interviews", icon: ClipboardList, label: "Interviews" },
      { to: "/admin/certificates", icon: Award, label: "Certificates" },
    ],
  },
  {
    label: "Users",
    items: [
      { to: "/admin/companies", icon: Building2, label: "Companies" },
      { to: "/admin/job-seekers", icon: GraduationCap, label: "Job Seekers" },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/admin/logs", icon: Activity, label: "Activity Logs" },
      { to: "/admin/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card shadow-sm">
        <h2 className="text-lg font-bold tracking-tight">InterQ Admin</h2>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "w-full md:w-64 lg:w-72 border-r bg-card flex-shrink-0 transition-all duration-300",
        isMobileMenuOpen ? "block" : "hidden md:flex md:flex-col"
      )}>
        <div className="p-5 hidden md:block border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">InterQ Admin</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Management Console</p>
            </div>
            <NotificationBell />
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          {navSections.map((section, idx) => (
            <div key={section.label} className={cn(idx > 0 && "mt-4")}>
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.to ||
                    (item.to !== "/admin" && location.pathname.startsWith(item.to));
                  return (
                    <Link key={item.to} to={item.to} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-full justify-start h-9 text-sm font-medium",
                          isActive
                            ? "bg-primary/10 text-primary hover:bg-primary/15"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4 mr-2.5 flex-shrink-0" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
              {idx < navSections.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </ScrollArea>

        <div className="p-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-9 text-sm text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2.5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
