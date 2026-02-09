import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search, Clock, Code, Play, Calendar, Users, TrendingUp, Loader2, AlertCircle, Mic } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Interview {
  id: string;
  title: string;
  description: string;
  job_role: string;
  difficulty?: string;
  duration_minutes: number;
  question_count: number;
  is_published: boolean;
  created_at: string;
  completion_rate?: number;
  average_score?: number;
}

interface InterviewStats {
  total_interviews: number;
  completed_interviews: number;
  average_score: number;
  total_questions_answered: number;
}

export default function InterviewBrowser() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [stats, setStats] = useState<InterviewStats | null>(null);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const { data: interviewsData, error } = await supabase
        .from('interviews')
        .select(`*, interview_questions(count), interview_results(overall_score)`)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const enhancedInterviews = (interviewsData || []).map((interview: any) => {
        const results = interview.interview_results || [];
        const count = results.length;
        const totalScore = results.reduce((sum: number, r: any) => sum + (r.overall_score || 0), 0);
        return { ...interview, question_count: interview.interview_questions?.[0]?.count || 0, completion_rate: count, average_score: count > 0 ? totalScore / count : 0 };
      });

      setInterviews(enhancedInterviews);
      setFilteredInterviews(enhancedInterviews);

      const { data: statsData } = await supabase.from('interview_results').select('*').eq('user_id', (await supabase.auth.getUser()).data.user?.id || '');
      if (statsData) {
        const totalCompleted = statsData.length;
        const avgScore = totalCompleted > 0 ? statsData.reduce((sum, r) => sum + (r.overall_score || 0), 0) / totalCompleted : 0;
        setStats({ total_interviews: enhancedInterviews.length, completed_interviews: totalCompleted, average_score: avgScore, total_questions_answered: statsData.filter(r => r.overall_score > 0).length });
      }
    } catch (error: any) {
      console.error('Error fetching interviews:', error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filterInterviews = () => {
    let filtered = [...interviews];
    if (searchTerm) filtered = filtered.filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase()) || i.description.toLowerCase().includes(searchTerm.toLowerCase()) || i.job_role.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedRole !== "all") filtered = filtered.filter(i => i.job_role === selectedRole);
    if (selectedDifficulty !== "all") filtered = filtered.filter(i => i.difficulty === selectedDifficulty);
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title': return a.title.localeCompare(b.title);
        case 'duration': return a.duration_minutes - b.duration_minutes;
        default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    setFilteredInterviews(filtered);
  };

  const getUniqueValues = (key: keyof Interview) => [...new Set(interviews.map(i => i[key]).filter(Boolean) as string[])].sort();

  const startInterview = async (interviewId: string, type: 'technical' | 'voice') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast({ title: "Authentication Required", variant: "destructive" }); return; }

      await (supabase as any).from('interview_sessions').insert({
        interview_id: interviewId, user_id: user.id, interview_type: type, status: 'active'
      });

      if (type === 'voice') navigate(`/live-interview?id=${interviewId}`);
      else navigate(`/take-interview/${interviewId}`);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const getDifficultyColor = (d?: string) => {
    switch (d?.toLowerCase()) { case 'easy': return 'bg-green-100 text-green-800'; case 'medium': return 'bg-yellow-100 text-yellow-800'; case 'hard': return 'bg-red-100 text-red-800'; default: return 'bg-secondary text-secondary-foreground'; }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  useEffect(() => { fetchInterviews(); }, []);
  useEffect(() => { filterInterviews(); }, [interviews, searchTerm, selectedRole, selectedDifficulty, sortBy]);

  if (loading) {
    return (<ProtectedRoute><div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div></ProtectedRoute>);
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div><h1 className="text-3xl font-bold mb-2">Interview Library</h1><p className="text-muted-foreground">Browse and practice with AI-generated interview questions</p></div>
              {stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card p-4 rounded-lg border"><div className="text-2xl font-bold text-primary">{stats.total_interviews}</div><div className="text-sm text-muted-foreground">Total</div></div>
                  <div className="bg-card p-4 rounded-lg border"><div className="text-2xl font-bold text-green-600">{stats.completed_interviews}</div><div className="text-sm text-muted-foreground">Completed</div></div>
                  <div className="bg-card p-4 rounded-lg border"><div className="text-2xl font-bold text-blue-600">{Math.round(stats.average_score)}%</div><div className="text-sm text-muted-foreground">Avg Score</div></div>
                  <div className="bg-card p-4 rounded-lg border"><div className="text-2xl font-bold text-purple-600">{stats.total_questions_answered}</div><div className="text-sm text-muted-foreground">Questions</div></div>
                </div>
              )}
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search interviews..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" /></div>
              <Select value={selectedRole} onValueChange={setSelectedRole}><SelectTrigger className="w-full lg:w-48"><SelectValue placeholder="All Roles" /></SelectTrigger><SelectContent><SelectItem value="all">All Roles</SelectItem>{getUniqueValues('job_role').map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}><SelectTrigger className="w-full lg:w-40"><SelectValue placeholder="All Difficulties" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="easy">Easy</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="hard">Hard</SelectItem></SelectContent></Select>
              <Select value={sortBy} onValueChange={setSortBy}><SelectTrigger className="w-full lg:w-40"><SelectValue placeholder="Sort by" /></SelectTrigger><SelectContent><SelectItem value="created_at">Newest</SelectItem><SelectItem value="title">Title</SelectItem><SelectItem value="duration">Duration</SelectItem></SelectContent></Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInterviews.map(interview => (
              <Card key={interview.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg line-clamp-2">{interview.title}</CardTitle>
                    <Badge className={getDifficultyColor(interview.difficulty)}>{interview.difficulty}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{interview.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{interview.duration_minutes} min</span>
                    <span className="flex items-center gap-1"><Code className="h-3 w-3" />{interview.question_count} questions</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{interview.job_role}</span>
                  </div>
                  {interview.average_score && interview.average_score > 0 && (
                    <div className="mb-3"><div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Avg Score</span><span>{Math.round(interview.average_score)}%</span></div><div className="w-full bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{ width: `${interview.average_score}%` }} /></div></div>
                  )}
                  <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1"><Calendar className="h-3 w-3" />Created {formatDate(interview.created_at)}</div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => startInterview(interview.id, 'technical')}><Play className="h-3 w-3 mr-1" />Start</Button>
                    <Button size="sm" variant="outline" onClick={() => startInterview(interview.id, 'voice')}><Mic className="h-3 w-3 mr-1" />Live</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInterviews.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No interviews found</h3>
              <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedRole("all"); setSelectedDifficulty("all"); }}>Clear Filters</Button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
