import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Calendar, Clock, CheckCircle, FileText, Star, Video, User,
  Briefcase, LogOut, LayoutDashboard, Settings, ChevronRight,
  AlertCircle, Award, MessageSquare, Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { icon: Calendar, label: "Availability", key: "availability" },
  { icon: Video, label: "Interviews", key: "interviews" },
  { icon: FileText, label: "Scorecards", key: "scorecards" },
  { icon: Bell, label: "Notifications", key: "notifications" },
  { icon: Settings, label: "Settings", key: "settings" },
];

const mockInterviewRequests = [
  { id: "1", candidateName: "John Smith", role: "Senior Frontend Developer", date: "Feb 20, 2026", time: "10:00 AM", status: "pending", assessmentScore: 82, jobTitle: "Senior React Developer" },
  { id: "2", candidateName: "Maria Garcia", role: "Data Scientist", date: "Feb 22, 2026", time: "02:00 PM", status: "accepted", assessmentScore: 91, jobTitle: "ML Engineer" },
  { id: "3", candidateName: "Ahmed Khan", role: "DevOps Engineer", date: "Feb 25, 2026", time: "11:30 AM", status: "pending", assessmentScore: 75, jobTitle: "Cloud Infrastructure Lead" },
];

const mockCompletedInterviews = [
  { id: "1", candidateName: "Sarah Chen", role: "Backend Developer", date: "Feb 12, 2026", scorecardSubmitted: true, overallScore: 88 },
  { id: "2", candidateName: "James Wilson", role: "QA Engineer", date: "Feb 10, 2026", scorecardSubmitted: true, overallScore: 72 },
  { id: "3", candidateName: "Priya Patel", role: "Full Stack Developer", date: "Feb 8, 2026", scorecardSubmitted: false, overallScore: 0 },
];

const availabilitySlots = [
  { day: "Monday", slots: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"] },
  { day: "Tuesday", slots: ["10:00 AM", "11:00 AM", "1:00 PM"] },
  { day: "Wednesday", slots: ["9:00 AM", "11:00 AM", "3:00 PM", "4:00 PM"] },
  { day: "Thursday", slots: ["10:00 AM", "2:00 PM"] },
  { day: "Friday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
];

const ExpertPortal = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scorecardOpen, setScorecardOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const userName = user?.email?.split("@")[0] || "Expert";

  const [scorecard, setScorecard] = useState({
    technical: 3, problemSolving: 3, communication: 3, systemDesign: 3, cultureFit: 3,
    strengths: "", improvements: "", comments: "", recommendation: "consider"
  });

  const openScorecard = (interview: any) => {
    setSelectedInterview(interview);
    setScorecardOpen(true);
  };

  const submitScorecard = () => {
    setScorecardOpen(false);
    // In production, save to Supabase
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300 sticky top-0 h-screen",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">IQ</div>
          {!sidebarCollapsed && <span className="font-bold text-lg">Expert Portal</span>}
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
            <p className="text-sm text-muted-foreground">Expert Dashboard</p>
          </div>
          <Avatar className="w-9 h-9 border border-border">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{userName[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </header>

        <div className="p-6 space-y-6">
          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Pending Requests", value: "2", icon: Clock, color: "text-amber-600", bg: "bg-amber-500/10" },
                  { label: "Upcoming Interviews", value: "3", icon: Video, color: "text-primary", bg: "bg-primary/10" },
                  { label: "Completed This Month", value: "8", icon: CheckCircle, color: "text-green-600", bg: "bg-green-500/10" },
                  { label: "Avg. Rating Given", value: "4.2", icon: Star, color: "text-purple-600", bg: "bg-purple-500/10" },
                ].map((stat) => (
                  <Card key={stat.label} className="shadow-soft">
                    <CardContent className="p-5">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
                        <stat.icon className={cn("w-5 h-5", stat.color)} />
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pending Requests */}
              <Card className="shadow-soft">
                <CardHeader><CardTitle className="text-lg">Interview Requests</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {mockInterviewRequests.filter(r => r.status === "pending").map(req => (
                    <div key={req.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                          {req.candidateName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{req.candidateName}</p>
                        <p className="text-xs text-muted-foreground">{req.jobTitle} • {req.date} at {req.time}</p>
                        <Badge variant="outline" className="text-[10px] mt-1">Assessment: {req.assessmentScore}%</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">Decline</Button>
                        <Button size="sm">Accept</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming */}
              <Card className="shadow-soft">
                <CardHeader><CardTitle className="text-lg">Upcoming Interviews</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {mockInterviewRequests.filter(r => r.status === "accepted").map(req => (
                    <div key={req.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{req.candidateName}</p>
                        <p className="text-xs text-muted-foreground">{req.jobTitle} • {req.date} at {req.time}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-1" /> View JD
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Availability */}
          {activeSection === "availability" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-xl font-bold">Manage Availability</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availabilitySlots.map(day => (
                  <Card key={day.day} className="shadow-soft">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{day.day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {day.slots.map(slot => (
                          <Badge key={slot} variant="secondary" className="cursor-pointer hover:bg-primary/20 transition-colors">
                            <Clock className="w-3 h-3 mr-1" /> {slot}
                          </Badge>
                        ))}
                        <Button variant="ghost" size="sm" className="text-xs text-primary">+ Add Slot</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Interviews */}
          {activeSection === "interviews" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-xl font-bold">All Interviews</h2>
              <div className="space-y-3">
                {[...mockInterviewRequests, ...mockCompletedInterviews.map(i => ({ ...i, status: "completed", time: "", jobTitle: i.role, assessmentScore: i.overallScore }))].map(interview => (
                  <Card key={interview.id + interview.candidateName} className="shadow-soft">
                    <CardContent className="p-5 flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                          {interview.candidateName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{interview.candidateName}</p>
                        <p className="text-sm text-muted-foreground">{interview.role || (interview as any).jobTitle} • {interview.date}</p>
                      </div>
                      <Badge variant={interview.status === "accepted" ? "default" : interview.status === "completed" ? "secondary" : "outline"}>
                        {interview.status}
                      </Badge>
                      {interview.status === "completed" && !(interview as any).scorecardSubmitted && (
                        <Button size="sm" onClick={() => openScorecard(interview)}>
                          <Award className="w-4 h-4 mr-1" /> Fill Scorecard
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Scorecards */}
          {activeSection === "scorecards" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-xl font-bold">Submitted Scorecards</h2>
              {mockCompletedInterviews.filter(i => i.scorecardSubmitted).map(interview => (
                <Card key={interview.id} className="shadow-soft">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{interview.candidateName}</p>
                      <p className="text-sm text-muted-foreground">{interview.role} • {interview.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">{interview.overallScore}%</p>
                      <Badge variant="default" className="text-xs">Submitted</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {mockCompletedInterviews.filter(i => !i.scorecardSubmitted).map(interview => (
                <Card key={interview.id} className="shadow-soft border-amber-200">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{interview.candidateName}</p>
                      <p className="text-sm text-muted-foreground">{interview.role} • {interview.date}</p>
                    </div>
                    <Button size="sm" onClick={() => openScorecard(interview)}>
                      <Award className="w-4 h-4 mr-1" /> Fill Scorecard
                    </Button>
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
                { msg: "New interview request from John Smith for Senior Frontend Developer", time: "1 hour ago", read: false },
                { msg: "Ahmed Khan's assessment results are ready — Score: 75%", time: "3 hours ago", read: false },
                { msg: "Your interview with Maria Garcia is confirmed for Feb 22", time: "1 day ago", read: true },
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
              <h2 className="text-xl font-bold mb-4">Expert Settings</h2>
              <Card className="shadow-soft max-w-xl">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{userName[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-lg">{userName}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      <Badge className="mt-1">Expert</Badge>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => navigate("/settings")}>Edit Profile</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      {/* Scorecard Dialog */}
      <Dialog open={scorecardOpen} onOpenChange={setScorecardOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Expert Scorecard — {selectedInterview?.candidateName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {[
              { key: "technical", label: "Technical Skills" },
              { key: "problemSolving", label: "Problem Solving" },
              { key: "communication", label: "Communication" },
              { key: "systemDesign", label: "System Design" },
              { key: "cultureFit", label: "Culture Fit" },
            ].map(cat => (
              <div key={cat.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">{cat.label}</Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        className={cn(
                          "w-5 h-5 cursor-pointer transition-colors",
                          s <= (scorecard as any)[cat.key]
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted hover:text-yellow-300"
                        )}
                        onClick={() => setScorecard(p => ({ ...p, [cat.key]: s }))}
                      />
                    ))}
                  </div>
                </div>
                <Slider
                  value={[(scorecard as any)[cat.key]]}
                  min={1} max={5} step={1}
                  onValueChange={([v]) => setScorecard(p => ({ ...p, [cat.key]: v }))}
                />
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <Label>Recommendation</Label>
              <Select value={scorecard.recommendation} onValueChange={v => setScorecard(p => ({ ...p, recommendation: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hire">✅ Hire</SelectItem>
                  <SelectItem value="strong_consider">💪 Strong Consider</SelectItem>
                  <SelectItem value="consider">🤔 Consider</SelectItem>
                  <SelectItem value="not_recommended">❌ Not Recommended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Key Strengths</Label>
              <Textarea value={scorecard.strengths} onChange={e => setScorecard(p => ({ ...p, strengths: e.target.value }))} placeholder="List candidate strengths..." />
            </div>

            <div className="space-y-2">
              <Label>Areas for Improvement</Label>
              <Textarea value={scorecard.improvements} onChange={e => setScorecard(p => ({ ...p, improvements: e.target.value }))} placeholder="Areas to improve..." />
            </div>

            <div className="space-y-2">
              <Label>Expert Comments</Label>
              <Textarea value={scorecard.comments} onChange={e => setScorecard(p => ({ ...p, comments: e.target.value }))} placeholder="Additional comments..." rows={4} />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setScorecardOpen(false)}>Cancel</Button>
              <Button onClick={submitScorecard}>Submit Scorecard</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpertPortal;
