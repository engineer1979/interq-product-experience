import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Search, Plus, UserPlus, Filter, Eye, EyeOff, CheckCircle, XCircle,
  AlertTriangle, Loader2, FileText, BarChart3, Users, TrendingUp
} from "lucide-react";

interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  years_experience: number;
  education_level?: string;
  skills: string[];
  industry?: string;
  current_title?: string;
  status: string;
  is_blind_screening: boolean;
  job_id?: string;
  created_at: string;
}

interface Screening {
  id: string;
  candidate_id: string;
  skills_score: number;
  experience_score: number;
  industry_score: number;
  education_score: number;
  progression_score: number;
  bonus_score: number;
  total_score: number;
  decision: string;
  decision_reason?: string;
  knockout_failed: boolean;
  knockout_details: any[];
  notes?: string;
}

interface Job {
  id: string;
  title: string;
}

export default function ATSScreening() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const jobIdFilter = searchParams.get("job");

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [screenings, setScreenings] = useState<Record<string, Screening>>({});
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [blindMode, setBlindMode] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [scoreDialogOpen, setScoreDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // New candidate form
  const [newCandidate, setNewCandidate] = useState({
    full_name: "", email: "", phone: "", location: "",
    years_experience: 0, education_level: "", skills: "",
    industry: "", current_title: "", job_id: jobIdFilter || ""
  });

  // Scoring form
  const [scores, setScores] = useState({
    skills_score: 0, experience_score: 0, industry_score: 0,
    education_score: 0, progression_score: 0, bonus_score: 0,
    notes: "", knockout_failed: false, knockout_details: [] as string[]
  });

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [candidatesRes, jobsRes] = await Promise.all([
        supabase.from("candidates").select("*").order("created_at", { ascending: false }),
        supabase.from("jobs").select("id, title")
      ]);

      if (candidatesRes.data) setCandidates(candidatesRes.data as Candidate[]);
      if (jobsRes.data) setJobs(jobsRes.data as Job[]);

      // Fetch screenings for all candidates
      if (candidatesRes.data && candidatesRes.data.length > 0) {
        const ids = candidatesRes.data.map((c: any) => c.id);
        const { data: screenData } = await supabase
          .from("ats_screenings").select("*").in("candidate_id", ids);
        if (screenData) {
          const map: Record<string, Screening> = {};
          screenData.forEach((s: any) => { map[s.candidate_id] = s as Screening; });
          setScreenings(map);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addCandidate = async () => {
    if (!user || !newCandidate.full_name || !newCandidate.email) {
      toast({ title: "Name and email are required", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("candidates").insert({
      ...newCandidate,
      skills: newCandidate.skills.split(",").map(s => s.trim()).filter(Boolean),
      created_by: user.id,
      job_id: newCandidate.job_id || null,
      is_blind_screening: blindMode
    });
    if (error) {
      toast({ title: "Error adding candidate", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Candidate added" });
      setAddDialogOpen(false);
      setNewCandidate({ full_name: "", email: "", phone: "", location: "", years_experience: 0, education_level: "", skills: "", industry: "", current_title: "", job_id: jobIdFilter || "" });
      fetchData();
    }
  };

  const submitScreening = async () => {
    if (!user || !selectedCandidate) return;
    const totalScore = scores.skills_score + scores.experience_score + scores.industry_score + scores.education_score + scores.progression_score + scores.bonus_score;
    let decision = "pending";
    let decision_reason = "";

    if (scores.knockout_failed) {
      decision = "rejected";
      decision_reason = "Failed knockout criteria";
    } else if (totalScore >= 60) {
      decision = "shortlisted";
      decision_reason = `Score ${totalScore}/100 meets shortlist threshold`;
    } else if (totalScore >= 40) {
      decision = "review";
      decision_reason = `Score ${totalScore}/100 requires manual review`;
    } else {
      decision = "rejected";
      decision_reason = `Score ${totalScore}/100 below minimum threshold`;
    }

    const existing = screenings[selectedCandidate.id];
    const payload = {
      candidate_id: selectedCandidate.id,
      job_id: selectedCandidate.job_id || null,
      screened_by: user.id,
      skills_score: scores.skills_score,
      experience_score: scores.experience_score,
      industry_score: scores.industry_score,
      education_score: scores.education_score,
      progression_score: scores.progression_score,
      bonus_score: scores.bonus_score,
      decision,
      decision_reason,
      knockout_failed: scores.knockout_failed,
      knockout_details: scores.knockout_details,
      notes: scores.notes
    };

    const { error } = existing
      ? await supabase.from("ats_screenings").update(payload).eq("id", existing.id)
      : await supabase.from("ats_screenings").insert(payload);

    if (error) {
      toast({ title: "Error saving screening", description: error.message, variant: "destructive" });
    } else {
      // Update candidate status
      await supabase.from("candidates").update({ status: decision }).eq("id", selectedCandidate.id);
      toast({ title: "Screening saved", description: `Decision: ${decision.toUpperCase()}` });
      setScoreDialogOpen(false);
      fetchData();
    }
  };

  const openScoring = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    const existing = screenings[candidate.id];
    if (existing) {
      setScores({
        skills_score: existing.skills_score,
        experience_score: existing.experience_score,
        industry_score: existing.industry_score,
        education_score: existing.education_score,
        progression_score: existing.progression_score,
        bonus_score: existing.bonus_score,
        notes: existing.notes || "",
        knockout_failed: existing.knockout_failed,
        knockout_details: (existing.knockout_details || []) as string[]
      });
    } else {
      setScores({ skills_score: 0, experience_score: 0, industry_score: 0, education_score: 0, progression_score: 0, bonus_score: 0, notes: "", knockout_failed: false, knockout_details: [] });
    }
    setScoreDialogOpen(true);
  };

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case "shortlisted": return <Badge className="bg-green-500/10 text-green-600 border-green-200">✅ Shortlisted</Badge>;
      case "review": return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">⚠️ Review</Badge>;
      case "rejected": return <Badge className="bg-red-500/10 text-red-600 border-red-200">❌ Rejected</Badge>;
      default: return <Badge variant="secondary">⏳ Pending</Badge>;
    }
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = !searchTerm ||
      c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.current_title?.toLowerCase().includes(searchTerm.toLowerCase());
    const screening = screenings[c.id];
    const matchesTab = activeTab === "all" ||
      (activeTab === "pending" && (!screening || screening.decision === "pending")) ||
      (activeTab === "shortlisted" && screening?.decision === "shortlisted") ||
      (activeTab === "review" && screening?.decision === "review") ||
      (activeTab === "rejected" && screening?.decision === "rejected");
    const matchesJob = !jobIdFilter || c.job_id === jobIdFilter;
    return matchesSearch && matchesTab && matchesJob;
  });

  const stats = {
    total: candidates.length,
    shortlisted: Object.values(screenings).filter(s => s.decision === "shortlisted").length,
    review: Object.values(screenings).filter(s => s.decision === "review").length,
    rejected: Object.values(screenings).filter(s => s.decision === "rejected").length,
    pending: candidates.length - Object.keys(screenings).length
  };

  const currentTotal = scores.skills_score + scores.experience_score + scores.industry_score + scores.education_score + scores.progression_score + scores.bonus_score;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ATS Screening</h1>
          <p className="text-muted-foreground mt-1">Bias-reduced candidate screening with structured scoring</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 mr-4">
            {blindMode ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            <Label htmlFor="blind-mode" className="text-sm">Blind Screening</Label>
            <Switch id="blind-mode" checked={blindMode} onCheckedChange={setBlindMode} />
          </div>
          <Button className="gap-2" onClick={() => setAddDialogOpen(true)}>
            <UserPlus className="h-4 w-4" /> Add Candidate
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-green-600">Shortlisted</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{stats.shortlisted}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-yellow-600">Manual Review</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-yellow-600">{stats.review}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-red-600">Rejected</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">{stats.rejected}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Pending</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.pending}</div></CardContent></Card>
      </div>

      {/* Search & Tabs */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search candidates..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted ({stats.shortlisted})</TabsTrigger>
          <TabsTrigger value="review">Review ({stats.review})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{blindMode ? "Candidate ID" : "Name"}</TableHead>
                    {!blindMode && <TableHead>Email</TableHead>}
                    <TableHead>Title</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>ATS Score</TableHead>
                    <TableHead>Decision</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={8} className="h-32 text-center"><Loader2 className="animate-spin h-5 w-5 mx-auto" /></TableCell></TableRow>
                  ) : filteredCandidates.length === 0 ? (
                    <TableRow><TableCell colSpan={8} className="h-32 text-center text-muted-foreground">No candidates found</TableCell></TableRow>
                  ) : (
                    filteredCandidates.map(c => {
                      const s = screenings[c.id];
                      return (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">{blindMode ? `#${c.id.slice(0, 8)}` : c.full_name}</TableCell>
                          {!blindMode && <TableCell>{c.email}</TableCell>}
                          <TableCell>{c.current_title || "—"}</TableCell>
                          <TableCell>{c.years_experience} yrs</TableCell>
                          <TableCell>
                            <div className="flex gap-1 flex-wrap max-w-[200px]">
                              {(c.skills || []).slice(0, 3).map((skill, i) => (
                                <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                              ))}
                              {(c.skills || []).length > 3 && <Badge variant="secondary" className="text-xs">+{c.skills.length - 3}</Badge>}
                            </div>
                          </TableCell>
                          <TableCell>
                            {s ? (
                              <div className="flex items-center gap-2">
                                <span className={`font-bold ${s.total_score >= 60 ? 'text-green-600' : s.total_score >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                                  {s.total_score}
                                </span>
                                <span className="text-muted-foreground text-xs">/100</span>
                              </div>
                            ) : <span className="text-muted-foreground">—</span>}
                          </TableCell>
                          <TableCell>{s ? getDecisionBadge(s.decision) : getDecisionBadge("pending")}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" onClick={() => openScoring(c)}>
                              <BarChart3 className="h-4 w-4 mr-1" /> Score
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Candidate Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add Candidate</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Full Name *</Label><Input value={newCandidate.full_name} onChange={e => setNewCandidate(p => ({ ...p, full_name: e.target.value }))} /></div>
              <div><Label>Email *</Label><Input type="email" value={newCandidate.email} onChange={e => setNewCandidate(p => ({ ...p, email: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Phone</Label><Input value={newCandidate.phone} onChange={e => setNewCandidate(p => ({ ...p, phone: e.target.value }))} /></div>
              <div><Label>Location</Label><Input value={newCandidate.location} onChange={e => setNewCandidate(p => ({ ...p, location: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Current Title</Label><Input value={newCandidate.current_title} onChange={e => setNewCandidate(p => ({ ...p, current_title: e.target.value }))} /></div>
              <div><Label>Years Experience</Label><Input type="number" value={newCandidate.years_experience} onChange={e => setNewCandidate(p => ({ ...p, years_experience: parseInt(e.target.value) || 0 }))} /></div>
            </div>
            <div><Label>Skills (comma-separated)</Label><Input value={newCandidate.skills} onChange={e => setNewCandidate(p => ({ ...p, skills: e.target.value }))} placeholder="React, TypeScript, Node.js" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Industry</Label><Input value={newCandidate.industry} onChange={e => setNewCandidate(p => ({ ...p, industry: e.target.value }))} /></div>
              <div><Label>Education Level</Label>
                <Select value={newCandidate.education_level} onValueChange={v => setNewCandidate(p => ({ ...p, education_level: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="bachelors">Bachelor's</SelectItem>
                    <SelectItem value="masters">Master's</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {jobs.length > 0 && (
              <div><Label>Job</Label>
                <Select value={newCandidate.job_id} onValueChange={v => setNewCandidate(p => ({ ...p, job_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select job" /></SelectTrigger>
                  <SelectContent>{jobs.map(j => <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
            <Button className="w-full" onClick={addCandidate}>Add Candidate</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scoring Dialog */}
      <Dialog open={scoreDialogOpen} onOpenChange={setScoreDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>ATS Screening Score — {blindMode ? `#${selectedCandidate?.id.slice(0, 8)}` : selectedCandidate?.full_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Live total */}
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className={`text-4xl font-bold ${currentTotal >= 60 ? 'text-green-600' : currentTotal >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                {currentTotal}<span className="text-lg text-muted-foreground">/100</span>
              </div>
              <Progress value={currentTotal} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-1">
                {currentTotal >= 60 ? "✅ Shortlist" : currentTotal >= 40 ? "⚠️ Manual Review" : "❌ Auto-Reject"}
              </p>
            </div>

            {/* Score sliders */}
            {[
              { key: "skills_score", label: "Skills Match", max: 30, desc: "Technical & functional skill alignment" },
              { key: "experience_score", label: "Experience Relevance", max: 25, desc: "Years and relevance of experience" },
              { key: "industry_score", label: "Industry Alignment", max: 15, desc: "Domain and industry fit" },
              { key: "education_score", label: "Education", max: 10, desc: "Educational qualifications" },
              { key: "progression_score", label: "Career Progression", max: 10, desc: "Stability & growth trajectory" },
              { key: "bonus_score", label: "Bonus Factors", max: 10, desc: "Certifications, referrals, etc." },
            ].map(({ key, label, max, desc }) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <Label className="font-medium">{label}</Label>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <span className="font-bold text-lg">{(scores as any)[key]}<span className="text-sm text-muted-foreground">/{max}</span></span>
                </div>
                <Slider
                  value={[(scores as any)[key]]}
                  max={max}
                  step={1}
                  onValueChange={([v]) => setScores(p => ({ ...p, [key]: v }))}
                />
              </div>
            ))}

            {/* Knockout */}
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <Switch checked={scores.knockout_failed} onCheckedChange={v => setScores(p => ({ ...p, knockout_failed: v }))} />
                <Label className="font-medium text-red-600">Knockout Criteria Failed</Label>
              </div>
              <p className="text-xs text-muted-foreground">Enable if candidate fails mandatory yes/no elimination criteria (e.g., work eligibility, required certifications)</p>
            </div>

            {/* Notes */}
            <div>
              <Label>Screening Notes</Label>
              <Textarea value={scores.notes} onChange={e => setScores(p => ({ ...p, notes: e.target.value }))} placeholder="Additional observations..." rows={3} />
            </div>

            <Button className="w-full" onClick={submitScreening}>
              Submit Screening Decision
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
