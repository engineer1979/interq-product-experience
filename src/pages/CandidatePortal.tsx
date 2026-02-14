import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard, FileText, Calendar, Clock, CheckCircle, AlertCircle,
  Video, LogOut, Settings, Bell, ChevronRight, Eye, BookOpen,
  TrendingUp, Briefcase, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", key: "overview" },
  { icon: FileText, label: "Assessments", key: "assessments" },
  { icon: Calendar, label: "Interviews", key: "interviews" },
  { icon: TrendingUp, label: "Status", key: "status" },
  { icon: BookOpen, label: "Guidelines", key: "guidelines" },
  { icon: Bell, label: "Notifications", key: "notifications" },
  { icon: Settings, label: "Settings", key: "settings" },
];

const mockAssessments = [
  { id: "1", title: "Frontend Developer Assessment", role: "Senior React Developer", status: "pending", deadline: "Feb 22, 2026", duration: "60 min", difficulty: "Medium" },
  { id: "2", title: "System Design Challenge", role: "Senior React Developer", status: "completed", deadline: "Feb 15, 2026", duration: "90 min", score: 85, difficulty: "Hard" },
];

const mockInterviews = [
  { id: "1", expert: "Dr. Sarah Mitchell", date: "Feb 25, 2026", time: "10:00 AM", type: "Technical Interview", status: "scheduled", meetingLink: "#" },
];

const pipelineStages = [
  { label: "Applied", completed: true },
  { label: "ATS Screened", completed: true },
  { label: "Assessment", completed: true },
  { label: "Interview", completed: false, active: true },
  { label: "Decision", completed: false },
];

const CandidatePortal = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const userName = user?.email?.split("@")[0] || "Job Seeker";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300 sticky top-0 h-screen",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">IQ</div>
          {!sidebarCollapsed && <span className="font-bold text-lg">Candidate</span>}
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                activeSection === item.key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Welcome, {userName}!</h1>
            <p className="text-sm text-muted-foreground">Track your application progress</p>
          </div>
          <Avatar className="w-9 h-9 border border-border">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{userName[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </header>

        <div className="p-6 space-y-6">
          {/* Overview */}
          {activeSection === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Pipeline Status */}
              <Card className="shadow-soft">
                <CardHeader><CardTitle className="text-lg">Your Application Status</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                    {pipelineStages.map((stage, i) => (
                      <div key={stage.label} className="flex items-center gap-2 min-w-0">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold",
                          stage.completed ? "bg-green-500 text-white" :
                          stage.active ? "bg-primary text-primary-foreground" :
                          "bg-muted text-muted-foreground"
                        )}>
                          {stage.completed ? <CheckCircle className="w-4 h-4" /> : i + 1}
                        </div>
                        <span className={cn(
                          "text-xs font-medium whitespace-nowrap",
                          stage.active ? "text-primary" : stage.completed ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {stage.label}
                        </span>
                        {i < pipelineStages.length - 1 && (
                          <div className={cn("w-8 h-0.5 flex-shrink-0", stage.completed ? "bg-green-500" : "bg-muted")} />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="shadow-soft">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Pending Assessment</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-sm text-muted-foreground">Best Assessment Score</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
                      <Calendar className="w-5 h-5 text-amber-600" />
                    </div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Upcoming Interview</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="shadow-soft cursor-pointer hover:shadow-md transition-all" onClick={() => setActiveSection("assessments")}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">Start Assessment</p>
                      <p className="text-sm text-muted-foreground">Frontend Developer Assessment pending</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
                <Card className="shadow-soft cursor-pointer hover:shadow-md transition-all" onClick={() => setActiveSection("interviews")}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Video className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">Upcoming Interview</p>
                      <p className="text-sm text-muted-foreground">Feb 25, 2026 at 10:00 AM</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Assessments */}
          {activeSection === "assessments" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-xl font-bold">Your Assessments</h2>
              {mockAssessments.map(a => (
                <Card key={a.id} className="shadow-soft">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      a.status === "completed" ? "bg-green-500/10" : "bg-primary/10"
                    )}>
                      {a.status === "completed"
                        ? <CheckCircle className="w-6 h-6 text-green-600" />
                        : <FileText className="w-6 h-6 text-primary" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{a.title}</p>
                      <p className="text-sm text-muted-foreground">{a.role} • {a.duration} • {a.difficulty}</p>
                      {a.status === "pending" && (
                        <p className="text-xs text-amber-600 mt-1">Deadline: {a.deadline}</p>
                      )}
                    </div>
                    {a.status === "completed" ? (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{a.score}%</p>
                        <Badge variant="default" className="text-xs">Completed</Badge>
                      </div>
                    ) : (
                      <Button onClick={() => navigate("/assessment-workflow")}>
                        Start Assessment <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Interviews */}
          {activeSection === "interviews" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-xl font-bold">Your Interviews</h2>
              {mockInterviews.map(interview => (
                <Card key={interview.id} className="shadow-soft">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Video className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{interview.type}</p>
                        <p className="text-sm text-muted-foreground">Expert: {interview.expert}</p>
                        <p className="text-sm text-muted-foreground">{interview.date} at {interview.time}</p>
                      </div>
                      <Badge variant="default">Scheduled</Badge>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-muted/30">
                      <p className="text-sm font-medium mb-2">Preparation Tips</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Ensure stable internet connection</li>
                        <li>• Test your camera and microphone</li>
                        <li>• Have a quiet environment</li>
                        <li>• Review the job description beforehand</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Status */}
          {activeSection === "status" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-xl font-bold">Application Timeline</h2>
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {[
                      { label: "Application Submitted", date: "Feb 1, 2026", status: "completed", detail: "Your application was received" },
                      { label: "Resume Screened", date: "Feb 3, 2026", status: "completed", detail: "Your resume passed initial screening" },
                      { label: "Assessment Completed", date: "Feb 15, 2026", status: "completed", detail: "Score: 85% — Passed" },
                      { label: "Interview Scheduled", date: "Feb 25, 2026", status: "active", detail: "With Dr. Sarah Mitchell" },
                      { label: "Final Decision", date: "Pending", status: "pending", detail: "Awaiting interview completion" },
                    ].map((event, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-3 h-3 rounded-full flex-shrink-0",
                            event.status === "completed" ? "bg-green-500" :
                            event.status === "active" ? "bg-primary" :
                            "bg-muted"
                          )} />
                          {i < 4 && <div className={cn("w-0.5 flex-1 mt-1", event.status === "completed" ? "bg-green-500" : "bg-muted")} />}
                        </div>
                        <div className="pb-6">
                          <p className={cn("font-medium text-sm", event.status === "pending" && "text-muted-foreground")}>{event.label}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                          <p className="text-xs text-muted-foreground mt-1">{event.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Guidelines */}
          {activeSection === "guidelines" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-xl font-bold">Guidelines & Preparation</h2>
              {[
                { title: "Assessment Guidelines", items: ["Complete within the time limit", "No external help or references unless allowed", "Ensure stable internet connection", "Do not switch tabs during proctored tests"] },
                { title: "Interview Guidelines", items: ["Join 5 minutes early", "Use a professional background", "Have your resume ready for reference", "Prepare questions about the role"] },
                { title: "Code of Conduct", items: ["Be honest and authentic", "Maintain professional communication", "Respect the expert's time", "Report any technical issues immediately"] },
              ].map(section => (
                <Card key={section.title} className="shadow-soft">
                  <CardHeader><CardTitle className="text-lg">{section.title}</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-xl font-bold">Notifications</h2>
              {[
                { msg: "Your interview with Dr. Sarah Mitchell is scheduled for Feb 25", time: "2 hours ago", read: false },
                { msg: "Assessment 'System Design Challenge' — Score: 85%. Congratulations!", time: "1 day ago", read: false },
                { msg: "New assessment assigned: Frontend Developer Assessment", time: "3 days ago", read: true },
                { msg: "Your application for Senior React Developer has been received", time: "2 weeks ago", read: true },
              ].map((n, i) => (
                <Card key={i} className={cn("shadow-soft", !n.read && "border-primary/20")}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", n.read ? "bg-muted" : "bg-primary")} />
                    <div>
                      <p className="text-sm">{n.msg}</p>
                      <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Settings */}
          {activeSection === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
              <Card className="shadow-soft max-w-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{userName[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-lg">{userName}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      <Badge className="mt-1">Candidate</Badge>
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

export default CandidatePortal;
