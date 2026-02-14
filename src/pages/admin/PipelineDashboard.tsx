import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search, Filter, Users, ChevronRight, Calendar, MapPin, Briefcase,
  Mail, Phone, GraduationCap, Star, FileText, Download, Loader2,
  ArrowRight, Clock, CheckCircle, XCircle, AlertTriangle, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PipelineCandidate {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  current_title?: string;
  years_experience: number;
  education_level?: string;
  skills: string[];
  industry?: string;
  status: string;
  job_id?: string;
  created_at: string;
  ats_score?: number;
  assessment_score?: number;
  interview_score?: number;
  decision?: string;
}

const PIPELINE_STAGES = [
  { key: "applied", label: "Applied", icon: Users, color: "bg-slate-500" },
  { key: "screened", label: "Screened", icon: Eye, color: "bg-blue-500" },
  { key: "shortlisted", label: "Shortlisted", icon: CheckCircle, color: "bg-indigo-500" },
  { key: "assessment_sent", label: "Assessment Sent", icon: FileText, color: "bg-purple-500" },
  { key: "assessment_completed", label: "Assessment Done", icon: CheckCircle, color: "bg-violet-500" },
  { key: "interview_scheduled", label: "Interview Scheduled", icon: Calendar, color: "bg-amber-500" },
  { key: "interview_completed", label: "Interview Done", icon: Star, color: "bg-orange-500" },
  { key: "offer", label: "Offer", icon: CheckCircle, color: "bg-green-500" },
  { key: "rejected", label: "Rejected", icon: XCircle, color: "bg-red-500" },
];

export default function PipelineDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<PipelineCandidate[]>([]);
  const [jobs, setJobs] = useState<{ id: string; title: string }[]>([]);
  const [screenings, setScreenings] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<PipelineCandidate | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cRes, jRes] = await Promise.all([
        supabase.from("candidates").select("*").order("created_at", { ascending: false }),
        supabase.from("jobs").select("id, title"),
      ]);

      const candidatesList = (cRes.data || []) as PipelineCandidate[];
      setJobs((jRes.data || []) as { id: string; title: string }[]);

      if (candidatesList.length > 0) {
        const ids = candidatesList.map(c => c.id);
        const [atsRes, decRes] = await Promise.all([
          supabase.from("ats_screenings").select("candidate_id, total_score").in("candidate_id", ids),
          supabase.from("hiring_decisions").select("candidate_id, ats_score, assessment_score, interview_score, decision").in("candidate_id", ids),
        ]);

        const atsMap: Record<string, number> = {};
        (atsRes.data || []).forEach((r: any) => { atsMap[r.candidate_id] = r.total_score ?? 0; });
        setScreenings(atsMap);

        const decMap: Record<string, any> = {};
        (decRes.data || []).forEach((d: any) => { decMap[d.candidate_id] = d; });

        const enriched = candidatesList.map(c => ({
          ...c,
          ats_score: atsMap[c.id] ?? undefined,
          assessment_score: decMap[c.id]?.assessment_score ?? undefined,
          interview_score: decMap[c.id]?.interview_score ?? undefined,
          decision: decMap[c.id]?.decision ?? undefined,
        }));
        setCandidates(enriched);
      } else {
        setCandidates([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const mapToStage = (c: PipelineCandidate): string => {
    if (c.decision === "hire" || c.status === "offer") return "offer";
    if (c.decision === "reject" || c.status === "rejected") return "rejected";
    if (c.interview_score && c.interview_score > 0) return "interview_completed";
    if (c.status === "interview_scheduled") return "interview_scheduled";
    if (c.assessment_score && c.assessment_score > 0) return "assessment_completed";
    if (c.status === "assessment_sent") return "assessment_sent";
    if (c.status === "shortlisted" || (c.ats_score && c.ats_score >= 60)) return "shortlisted";
    if (c.ats_score !== undefined) return "screened";
    return "applied";
  };

  const moveCandidate = async (candidateId: string, newStatus: string) => {
    const { error } = await supabase.from("candidates").update({ status: newStatus }).eq("id", candidateId);
    if (error) {
      toast({ title: "Error moving candidate", variant: "destructive" });
    } else {
      toast({ title: "Candidate moved" });
      fetchData();
    }
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchSearch = !searchTerm ||
        c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchJob = jobFilter === "all" || c.job_id === jobFilter;
      return matchSearch && matchJob;
    });
  }, [candidates, searchTerm, jobFilter]);

  const stageGroups = useMemo(() => {
    const groups: Record<string, PipelineCandidate[]> = {};
    PIPELINE_STAGES.forEach(s => { groups[s.key] = []; });
    filteredCandidates.forEach(c => {
      const stage = mapToStage(c);
      if (groups[stage]) groups[stage].push(c);
      else groups["applied"].push(c);
    });
    return groups;
  }, [filteredCandidates]);

  const openDrawer = (c: PipelineCandidate) => {
    setSelectedCandidate(c);
    setDrawerOpen(true);
  };

  const getJobTitle = (jobId?: string) => {
    if (!jobId) return "—";
    return jobs.find(j => j.id === jobId)?.title || "—";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidate Pipeline</h1>
          <p className="text-muted-foreground mt-1">Track candidates across all recruitment stages</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm px-3 py-1">
            {filteredCandidates.length} candidates
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
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

      {/* Pipeline Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {PIPELINE_STAGES.map(stage => (
            <div key={stage.key} className="w-[280px] flex-shrink-0">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className={cn("w-2.5 h-2.5 rounded-full", stage.color)} />
                <h3 className="text-sm font-semibold">{stage.label}</h3>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {stageGroups[stage.key]?.length || 0}
                </Badge>
              </div>
              <div className="space-y-2 min-h-[120px] bg-muted/30 rounded-xl p-2">
                <AnimatePresence>
                  {(stageGroups[stage.key] || []).map(c => (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Card
                        className="cursor-pointer hover:shadow-md transition-all border hover:border-primary/30"
                        onClick={() => openDrawer(c)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2.5">
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                {c.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{c.full_name}</p>
                              <p className="text-xs text-muted-foreground truncate">{c.current_title || c.email}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                            {c.ats_score !== undefined && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                ATS: {c.ats_score}
                              </Badge>
                            )}
                            {c.assessment_score !== undefined && c.assessment_score > 0 && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                Assess: {c.assessment_score}
                              </Badge>
                            )}
                            {c.interview_score !== undefined && c.interview_score > 0 && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                Interview: {c.interview_score}
                              </Badge>
                            )}
                          </div>
                          {(c.skills || []).length > 0 && (
                            <div className="mt-1.5 flex gap-1 flex-wrap">
                              {c.skills.slice(0, 2).map((s, i) => (
                                <span key={i} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{s}</span>
                              ))}
                              {c.skills.length > 2 && <span className="text-[10px] text-muted-foreground">+{c.skills.length - 2}</span>}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {(stageGroups[stage.key] || []).length === 0 && (
                  <div className="text-center py-8 text-xs text-muted-foreground">No candidates</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedCandidate && (
            <div className="space-y-6">
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {selectedCandidate.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selectedCandidate.full_name}</SheetTitle>
                    <p className="text-sm text-muted-foreground">{selectedCandidate.current_title || "Candidate"}</p>
                  </div>
                </div>
              </SheetHeader>

              <Separator />

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedCandidate.email}</span>
                  </div>
                  {selectedCandidate.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCandidate.phone}</span>
                    </div>
                  )}
                  {selectedCandidate.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCandidate.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Details</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="font-semibold">{selectedCandidate.years_experience} years</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Education</p>
                    <p className="font-semibold">{selectedCandidate.education_level || "—"}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Industry</p>
                    <p className="font-semibold">{selectedCandidate.industry || "—"}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Job</p>
                    <p className="font-semibold truncate">{getJobTitle(selectedCandidate.job_id)}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {(selectedCandidate.skills || []).length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCandidate.skills.map((s, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Scores */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Scores</h4>
                <div className="space-y-3">
                  {selectedCandidate.ats_score !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>ATS Screening</span>
                        <span className="font-semibold">{selectedCandidate.ats_score}/100</span>
                      </div>
                      <Progress value={selectedCandidate.ats_score} className="h-2" />
                    </div>
                  )}
                  {selectedCandidate.assessment_score !== undefined && selectedCandidate.assessment_score > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Assessment</span>
                        <span className="font-semibold">{selectedCandidate.assessment_score}/100</span>
                      </div>
                      <Progress value={selectedCandidate.assessment_score} className="h-2" />
                    </div>
                  )}
                  {selectedCandidate.interview_score !== undefined && selectedCandidate.interview_score > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Expert Interview</span>
                        <span className="font-semibold">{selectedCandidate.interview_score}/100</span>
                      </div>
                      <Progress value={selectedCandidate.interview_score} className="h-2" />
                    </div>
                  )}
                  {selectedCandidate.ats_score === undefined && (
                    <p className="text-sm text-muted-foreground">No scores recorded yet</p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Stage Actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Move to Stage</h4>
                <div className="grid grid-cols-2 gap-2">
                  {PIPELINE_STAGES.filter(s => s.key !== "rejected").map(stage => (
                    <Button
                      key={stage.key}
                      variant={mapToStage(selectedCandidate) === stage.key ? "default" : "outline"}
                      size="sm"
                      className="text-xs justify-start"
                      onClick={() => {
                        moveCandidate(selectedCandidate.id, stage.key);
                        setDrawerOpen(false);
                      }}
                    >
                      <div className={cn("w-2 h-2 rounded-full mr-2 flex-shrink-0", stage.color)} />
                      {stage.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Applied</p>
                      <p className="text-xs text-muted-foreground">{new Date(selectedCandidate.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {selectedCandidate.ats_score !== undefined && (
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">ATS Screened — Score: {selectedCandidate.ats_score}</p>
                      </div>
                    </div>
                  )}
                  {selectedCandidate.assessment_score !== undefined && selectedCandidate.assessment_score > 0 && (
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Assessment Completed — Score: {selectedCandidate.assessment_score}</p>
                      </div>
                    </div>
                  )}
                  {selectedCandidate.interview_score !== undefined && selectedCandidate.interview_score > 0 && (
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Interview Completed — Score: {selectedCandidate.interview_score}</p>
                      </div>
                    </div>
                  )}
                  {selectedCandidate.decision && (
                    <div className="flex gap-3">
                      <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", selectedCandidate.decision === "hire" ? "bg-green-500" : "bg-red-500")} />
                      <div>
                        <p className="text-sm font-medium">Decision: {selectedCandidate.decision.toUpperCase()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
