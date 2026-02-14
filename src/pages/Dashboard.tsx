import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard, Calendar, Clock, FileText, Bell, Settings, User,
  Video, CheckCircle, AlertCircle, TrendingUp, BarChart3, Star, LogOut, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", key: "overview" },
  { icon: Calendar, label: "Upcoming", key: "upcoming" },
  { icon: Clock, label: "Past Sessions", key: "past" },
  { icon: FileText, label: "Reports", key: "reports" },
  { icon: Bell, label: "Notifications", key: "notifications" },
  { icon: Settings, label: "Settings", key: "settings" },
];

const upcomingBookings = [
  { id: "1", expert: "Dr. Sarah Mitchell", date: "Feb 18, 2026", time: "10:00 AM", type: "Technical Review", status: "Confirmed" },
  { id: "2", expert: "James Rodriguez", date: "Feb 20, 2026", time: "02:30 PM", type: "Behavioral Assessment", status: "Pending" },
];

const pastSessions = [
  { id: "1", expert: "Priya Sharma", date: "Feb 10, 2026", type: "Data Science Evaluation", score: 87, status: "Completed" },
  { id: "2", expert: "Dr. Sarah Mitchell", date: "Feb 05, 2026", type: "System Design Review", score: 92, status: "Completed" },
  { id: "3", expert: "James Rodriguez", date: "Jan 28, 2026", type: "Leadership Assessment", score: 78, status: "Completed" },
];

const notifications = [
  { id: "1", message: "Your session with Dr. Sarah Mitchell is tomorrow at 10:00 AM", time: "2 hours ago", read: false },
  { id: "2", message: "Evaluation report for Data Science session is ready", time: "1 day ago", read: false },
  { id: "3", message: "James Rodriguez confirmed your booking", time: "2 days ago", read: true },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const userName = user?.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300 sticky top-0 h-screen",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
            IQ
          </div>
          {!sidebarCollapsed && <span className="font-bold text-lg">InterQ</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                activeSection === item.key
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={() => { signOut(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Welcome back, {userName}!</h1>
            <p className="text-sm text-muted-foreground">Here's your dashboard overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/book-session")}>
              <Calendar className="w-4 h-4 mr-2" /> Book Session
            </Button>
            <Avatar className="w-9 h-9 border border-border cursor-pointer">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                {userName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          {activeSection === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Sessions", value: "12", icon: Video, color: "text-primary", bg: "bg-primary/10" },
                  { label: "Upcoming Meetings", value: "2", icon: Calendar, color: "text-green-600", bg: "bg-green-500/10" },
                  { label: "Completed Evaluations", value: "8", icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-500/10" },
                  { label: "Avg. Score", value: "85.6%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-500/10" },
                ].map((stat) => (
                  <Card key={stat.label} className="shadow-soft hover:shadow-elegant transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                          <stat.icon className={cn("w-5 h-5", stat.color)} />
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Upcoming & Recent */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Upcoming Bookings
                      <Button variant="ghost" size="sm" onClick={() => setActiveSection("upcoming")}>View All</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{booking.expert}</p>
                          <p className="text-xs text-muted-foreground">{booking.date} • {booking.time}</p>
                        </div>
                        <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"} className="text-xs">
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Recent Reports
                      <Button variant="ghost" size="sm" onClick={() => setActiveSection("reports")}>View All</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pastSessions.slice(0, 2).map((session) => (
                      <div key={session.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate("/evaluation-report")}>
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{session.type}</p>
                          <p className="text-xs text-muted-foreground">{session.expert} • {session.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{session.score}%</p>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Notifications Preview */}
              <Card className="shadow-soft mt-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notifications
                    <Badge className="ml-2">{notifications.filter(n => !n.read).length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={cn(
                      "flex items-start gap-3 p-3 rounded-xl transition-colors",
                      notif.read ? "bg-transparent" : "bg-primary/5"
                    )}>
                      <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", notif.read ? "bg-muted" : "bg-primary")} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === "upcoming" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="shadow-soft">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Video className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{booking.type}</p>
                        <p className="text-sm text-muted-foreground">Expert: {booking.expert}</p>
                        <p className="text-sm text-muted-foreground">{booking.date} at {booking.time}</p>
                      </div>
                      <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "past" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold mb-4">Past Sessions</h2>
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <Card key={session.id} className="shadow-soft cursor-pointer hover:shadow-elegant transition-all" onClick={() => navigate("/evaluation-report")}>
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{session.type}</p>
                        <p className="text-sm text-muted-foreground">Expert: {session.expert} • {session.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{session.score}%</p>
                        <Badge variant="default">Completed</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "reports" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold mb-4">Evaluation Reports</h2>
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <Card key={session.id} className="shadow-soft cursor-pointer hover:shadow-elegant transition-all" onClick={() => navigate("/evaluation-report")}>
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{session.type}</p>
                        <p className="text-sm text-muted-foreground">{session.expert} • {session.date}</p>
                      </div>
                      <Button variant="outline" size="sm">View Report <ChevronRight className="w-4 h-4 ml-1" /></Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "notifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold mb-4">All Notifications</h2>
              <div className="space-y-2">
                {notifications.map((notif) => (
                  <Card key={notif.id} className={cn("shadow-soft", !notif.read && "border-primary/20")}>
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", notif.read ? "bg-muted" : "bg-primary")} />
                      <div>
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
              <Card className="shadow-soft max-w-xl">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                        {userName[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-lg">{userName}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => navigate("/settings")}>Edit Profile</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
