import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, FileText, Users, ClipboardList, MessageSquare,
  Settings, BarChart3, Briefcase, LogOut, Menu, X, ChevronDown,
  Building2, Bell, ScrollText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import interqLogo from "@/assets/interq-logo.png";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/company" },
  { label: "Jobs / JDs", icon: Briefcase, path: "/company/jobs" },
  { label: "Candidates (ATS)", icon: Users, path: "/company/candidates" },
  { label: "Tests & Questions", icon: ClipboardList, path: "/company/tests" },
  { label: "Interviews", icon: MessageSquare, path: "/company/interviews" },
  { label: "Results & Reports", icon: BarChart3, path: "/company/results" },
  { label: "Notifications", icon: Bell, path: "/company/notifications" },
  { label: "Audit Logs", icon: ScrollText, path: "/company/logs" },
  { label: "Settings", icon: Settings, path: "/company/settings" },
];

interface Company {
  id: string;
  name: string;
  logo_url: string | null;
}

export function CompanyLayout() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [company, setCompany] = useState<Company | null>(null);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    if (!user) return;

    const fetchCompany = async () => {
      const { data: membership } = await (supabase as any)
        .from("company_members")
        .select("company_id, role, companies(id, name, logo_url)")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (membership?.companies) {
        setCompany(membership.companies as Company);
      }
      setLoadingCompany(false);
    };
    fetchCompany();
  }, [user, authLoading, navigate]);

  if (authLoading || loadingCompany) {
    return (
      <div className="flex h-screen bg-background">
        <div className="w-64 border-r p-4 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        </div>
        <div className="flex-1 p-8"><Skeleton className="h-64 w-full" /></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <Building2 className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">No Company Found</h2>
          <p className="text-muted-foreground">You don't belong to any company workspace yet.</p>
          <Button onClick={() => navigate("/company-signup")}>Create a Company</Button>
        </div>
      </div>
    );
  }

  const isActive = (path: string) => {
    if (path === "/company") return location.pathname === "/company";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img src={interqLogo} alt="InterQ" className="h-7 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{company.name}</p>
              <Badge variant="secondary" className="text-[10px]">Company</Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t">
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 border-b flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Welcome, <span className="font-medium text-foreground">{user?.user_metadata?.full_name || user?.email}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet context={{ company, user }} />
        </main>
      </div>
    </div>
  );
}
