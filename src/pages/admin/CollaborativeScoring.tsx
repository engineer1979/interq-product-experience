import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Trophy, Search, TrendingUp, AlertTriangle, CheckCircle, XCircle,
  Loader2, BarChart3, Users, Award, ArrowUpDown
} from "lucide-react";

interface CandidateRow {
  id: string;
  full_name: string;
  email: string;
  current_title: string | null;
  job_id: string | null;
}

interface ATSScreeningRow {
  candidate_id: string;
  total_score: number | null;
}

interface AssessmentResultRow {
  user_id: string;
  percentage: number;
}

interface InterviewResultRow {
  user_id: string;
  overall_score: number;
}

interface HiringDecision {
  id: string;
  candidate_id: string;
  job_id: string | null;
  ats_score: number;
  assessment_score: number;
  interview_score: number;
  ats_weight: number;
  assessment_weight: number;
  interview_weight: number;
  final_weighted_score: number;
  rank: number | null;
  decision: string;
  risk_level: string;
  salary_band_fit: string | null;
  key_strengths: string[];
  key_gaps: string[];
  culture_fit_notes: string | null;
  justification: string | null;
  decided_by: string;
}

interface JobRow {
  id: string;
  title: string;
}

export default function CollaborativeScoring() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [candidates, setCandidates] = useState<CandidateRow[]>([]);
  const [atsScores, setAtsScores] = useState<Record<string, number>>({});
  const [decisions, setDecisions] = useState<Record<string, HiringDecision>>({});
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [sortField, setSortField] = useState<"final_weighted_score" | "ats_score" | "full_name">("final_weighted_score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // Decision dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRow | null>(null);
  const [form, setForm] = useState({
    ats_score: 0,
    assessment_score: 0,
    interview_score: 0,
    ats_weight: 20,
    assessment_weight: 40,
    interview_weight: 40,
    decision: "pending",
    risk_level: "low",
    salary_band_fit: "",
    key_strengths: "",
    key_gaps: "",
    culture_fit_notes: "",
    justification: "",
  });

  useEffect(() => {
    if (user) fetchAll();
  }, [user]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [cRes, jRes] = await Promise.all([
        supabase.from("candidates").select("id, full_name, email, current_title, job_id").order("created_at", { ascending: false }),
        supabase.from("jobs").select("id, title"),
      ]);

      const candidatesList = (cRes.data || []) as CandidateRow[];
      setCandidates(candidatesList);
      setJobs((jRes.data || []) as JobRow[]);

      if (candidatesList.length > 0) {
        const ids = candidatesList.map(c => c.id);

        const [atsRes, decRes] = await Promise.all([
          supabase.from("ats_screenings").select("candidate_id, total_score").in("candidate_id", ids),
          supabase.from("hiring_decisions").select("*").in("candidate_id", ids),
        ]);

        const atsMap: Record<string, number> = {};
        (atsRes.data || []).forEach((r: any) => {
          atsMap[r.candidate_id] = r.total_score ?? 0;
        });
        setAtsScores(atsMap);

        const decMap: Record<string, HiringDecision> = {};
        (decRes.data || []).forEach((d: any) => {
          decMap[d.candidate_id] = d as HiringDecision;
        });
        setDecisions(decMap);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openDecisionDialog = (candidate: CandidateRow) => {
    setSelectedCandidate(candidate);
    const existing = decisions[candidate.id];
    if (existing) {
      setForm({
        ats_score: existing.ats_score,
        assessment_score: existing.assessment_score,
        interview_score: existing.interview_score,
        ats_weight: existing.ats_weight * 100,
        assessment_weight: existing.assessment_weight * 100,
        interview_weight: existing.interview_weight * 100,
        decision: existing.decision,
        risk_level: existing.risk_level,
        salary_band_fit: existing.salary_band_fit || "",
        key_strengths: (existing.key_strengths || []).join(", "),
        key_gaps: (existing.key_gaps || []).join(", "),
        culture_fit_notes: existing.culture_fit_notes || "",
        justification: existing.justification || "",
      });
    } else {
      setForm({
        ats_score: atsScores[candidate.id] || 0,
        assessment_score: 0,
        interview_score: 0,
        ats_weight: 20,
        assessment_weight: 40,
        interview_weight: 40,
        decision: "pending",
        risk_level: "low",
        salary_band_fit: "",
        key_strengths: "",
        key_gaps: "",
        culture_fit_notes: "",
        justification: "",
      });
    }
    setDialogOpen(true);
  };

  const finalScore = useMemo(() => {
    const w1 = form.ats_weight / 100;
    const w2 = form.assessment_weight / 100;
    const w3 = form.interview_weight / 100;
    return Math.round((form.ats_score * w1 + form.assessment_score * w2 + form.interview_score * w3) * 100) / 100;
  }, [form]);

  const saveDecision = async () => {
    if (!user || !selectedCandidate) return;
    const existing = decisions[selectedCandidate.id];
    const payload = {
      candidate_id: selectedCandidate.id,
      job_id: selectedCandidate.job_id || null,
      ats_score: form.ats_score,
      assessment_score: form.assessment_score,
      interview_score: form.interview_score,
      ats_weight: form.ats_weight / 100,
      assessment_weight: form.assessment_weight / 100,
      interview_weight: form.interview_weight / 100,
      final_weighted_score: finalScore,
      decision: form.decision,
      risk_level: form.risk_level,
      salary_band_fit: form.salary_band_fit || null,
      key_strengths: form.key_strengths.split(",").map(s => s.trim()).filter(Boolean),
      key_gaps: form.key_gaps.split(",").map(s => s.trim()).filter(Boolean),
      culture_fit_notes: form.culture_fit_notes || null,
      justification: form.justification || null,
      decided_by: user.id,
    };

    const { error } = existing
      ? await supabase.from("hiring_decisions").update(payload).eq("id", existing.id)
      : await supabase.from("hiring_decisions").insert(payload);

    if (error) {
      toast({ title: "Error saving decision", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Decision saved", description: `${selectedCandidate.full_name}: ${form.decision.toUpperCase()}` });
      setDialogOpen(false);
      fetchAll();
    }
  };

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case "hire": return <Badge className="bg-green-500/10 text-green-600 border-green-200">✅ Hire</Badge>;
      case "hold": return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">⏸ Hold</Badge>;
      case "reject": return <Badge className="bg-red-500/10 text-red-600 border-red-200">❌ Reject</Badge>;
      default: return <Badge variant="secondary">⏳ Pending</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low": return <Badge variant="outline" className="text-green-600 border-green-200">Low</Badge>;
      case "medium": return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Medium</Badge>;
      case "high": return <Badge variant="outline" className="text-red-600 border-red-200">High</Badge>;
      default: return <Badge variant="outline">—</Badge>;
    }
  };

  // Build ranked list
  const rankedCandidates = useMemo(() => {
    let list = candidates.filter(c => {
      const matchSearch = !searchTerm ||
        c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchJob = jobFilter === "all" || c.job_id === jobFilter;
      return matchSearch && matchJob;
    }).map(c => {
      const d = decisions[c.id];
      return {
        ...c,
        ats_score: d?.ats_score ?? atsScores[c.id] ?? 0,
        assessment_score: d?.assessment_score ?? 0,
        interview_score: d?.interview_score ?? 0,
        final_weighted_score: d?.final_weighted_score ?? 0,
        decision: d?.decision ?? "pending",
        risk_level: d?.risk_level ?? "—",
        salary_band_fit: d?.salary_band_fit ?? "—",
      };
    });

    list.sort((a, b) => {
      const valA = sortField === "full_name" ? a.full_name : (a as any)[sortField];
      const valB = sortField === "full_name" ? b.full_name : (b as any)[sortField];
      if (sortField === "full_name") {
        return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDir === "asc" ? valA - valB : valB - valA;
    });

    return list.map((c, i) => ({ ...c, rank: i + 1 }));
  }, [candidates, decisions, atsScores, searchTerm, jobFilter, sortField, sortDir]);

  const stats = useMemo(() => {
    const d = Object.values(decisions);
    return {
      total: candidates.length,
      scored: d.length,
      hired: d.filter(x => x.decision === "hire").length,
      held: d.filter(x => x.decision === "hold").length,
      rejected: d.filter(x => x.decision === "reject").length,
    };
  }, [candidates, decisions]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Collaborative Scoring & Rankings</h1>
        <p className="text-muted-foreground mt-1">Combine ATS, Assessment & Interview scores into final hiring decisions</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium"><Users className="h-4 w-4 inline mr-1" />Candidates</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium"><BarChart3 className="h-4 w-4 inline mr-1" />Scored</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.scored}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-green-600"><CheckCircle className="h-4 w-4 inline mr-1" />Hire</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{stats.hired}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-yellow-600"><AlertTriangle className="h-4 w-4 inline mr-1" />Hold</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-yellow-600">{stats.held}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-red-600"><XCircle className="h-4 w-4 inline mr-1" />Reject</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">{stats.rejected}</div></CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search candidates..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        {jobs.length > 0 && (
          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-[200px]"><SelectValue placeholder="Filter by job" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {jobs.map(j => <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Ranking Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /> Final Candidate Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Rank</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("full_name")}>
                    Candidate <ArrowUpDown className="h-3 w-3 inline ml-1" />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("ats_score")}>
                    ATS <ArrowUpDown className="h-3 w-3 inline ml-1" />
                  </TableHead>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Interview</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("final_weighted_score")}>
                    <span className="font-bold">Final Score</span> <ArrowUpDown className="h-3 w-3 inline ml-1" />
                  </TableHead>
                  <TableHead>Decision</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Salary Fit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={11} className="h-32 text-center"><Loader2 className="animate-spin h-5 w-5 mx-auto" /></TableCell></TableRow>
                ) : rankedCandidates.length === 0 ? (
                  <TableRow><TableCell colSpan={11} className="h-32 text-center text-muted-foreground">No candidates found</TableCell></TableRow>
                ) : (
                  rankedCandidates.map(c => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <span className={`font-bold text-lg ${c.rank <= 3 ? 'text-primary' : ''}`}>
                          {c.rank === 1 ? "🥇" : c.rank === 2 ? "🥈" : c.rank === 3 ? "🥉" : `#${c.rank}`}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{c.full_name}</TableCell>
                      <TableCell>{c.current_title || "—"}</TableCell>
                      <TableCell>{c.ats_score}</TableCell>
                      <TableCell>{c.assessment_score}</TableCell>
                      <TableCell>{c.interview_score}</TableCell>
                      <TableCell>
                        <span className={`font-bold text-lg ${c.final_weighted_score >= 70 ? 'text-green-600' : c.final_weighted_score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {c.final_weighted_score}
                        </span>
                      </TableCell>
                      <TableCell>{getDecisionBadge(c.decision)}</TableCell>
                      <TableCell>{getRiskBadge(c.risk_level)}</TableCell>
                      <TableCell className="text-sm">{c.salary_band_fit}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => openDecisionDialog(c)}>
                          <Award className="h-4 w-4 mr-1" /> Decide
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Decision Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Final Decision — {selectedCandidate?.full_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Live final score */}
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className={`text-4xl font-bold ${finalScore >= 70 ? 'text-green-600' : finalScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {finalScore}<span className="text-lg text-muted-foreground">/100</span>
              </div>
              <Progress value={finalScore} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                ({form.ats_score} × {form.ats_weight}%) + ({form.assessment_score} × {form.assessment_weight}%) + ({form.interview_score} × {form.interview_weight}%)
              </p>
            </div>

            {/* Score inputs */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { key: "ats_score", label: "ATS Score", wKey: "ats_weight", wLabel: "ATS Weight" },
                { key: "assessment_score", label: "Assessment Score", wKey: "assessment_weight", wLabel: "Assessment Weight" },
                { key: "interview_score", label: "Interview Score", wKey: "interview_weight", wLabel: "Interview Weight" },
              ].map(({ key, label, wKey, wLabel }) => (
                <div key={key} className="space-y-3">
                  <div>
                    <Label className="text-xs">{label} (0–100)</Label>
                    <Slider value={[(form as any)[key]]} max={100} step={1}
                      onValueChange={([v]) => setForm(p => ({ ...p, [key]: v }))} />
                    <p className="text-center font-bold mt-1">{(form as any)[key]}</p>
                  </div>
                  <div>
                    <Label className="text-xs">{wLabel} (%)</Label>
                    <Slider value={[(form as any)[wKey]]} max={100} step={5}
                      onValueChange={([v]) => setForm(p => ({ ...p, [wKey]: v }))} />
                    <p className="text-center text-sm text-muted-foreground">{(form as any)[wKey]}%</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decision & Risk */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Decision</Label>
                <Select value={form.decision} onValueChange={v => setForm(p => ({ ...p, decision: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="hire">Hire</SelectItem>
                    <SelectItem value="hold">Hold</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Risk Level</Label>
                <Select value={form.risk_level} onValueChange={v => setForm(p => ({ ...p, risk_level: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Salary Band Fit</Label>
                <Input value={form.salary_band_fit} onChange={e => setForm(p => ({ ...p, salary_band_fit: e.target.value }))} placeholder="e.g. $80K–$100K" />
              </div>
            </div>

            {/* Qualitative */}
            <div className="space-y-4">
              <div>
                <Label>Key Strengths (comma-separated)</Label>
                <Input value={form.key_strengths} onChange={e => setForm(p => ({ ...p, key_strengths: e.target.value }))} placeholder="Strong technical skills, leadership" />
              </div>
              <div>
                <Label>Key Gaps (comma-separated)</Label>
                <Input value={form.key_gaps} onChange={e => setForm(p => ({ ...p, key_gaps: e.target.value }))} placeholder="Limited industry experience" />
              </div>
              <div>
                <Label>Culture Fit Notes</Label>
                <Textarea value={form.culture_fit_notes} onChange={e => setForm(p => ({ ...p, culture_fit_notes: e.target.value }))} rows={2} />
              </div>
              <div>
                <Label>Justification</Label>
                <Textarea value={form.justification} onChange={e => setForm(p => ({ ...p, justification: e.target.value }))} rows={3} placeholder="Detailed reasoning for the decision..." />
              </div>
            </div>

            <Button className="w-full" onClick={saveDecision}>
              Save Final Decision
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
