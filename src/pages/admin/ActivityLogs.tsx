import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ActivityLogs() {
  const [search, setSearch] = useState("");

  const { data: recentResults, isLoading: loadingResults } = useQuery({
    queryKey: ["admin-logs-results"],
    queryFn: async () => {
      const { data } = await supabase
        .from("assessment_results")
        .select("id, user_id, assessment_id, percentage, passed, completed_at, ip_address, user_agent, assessments(title)")
        .order("completed_at", { ascending: false })
        .limit(50);
      return data ?? [];
    },
  });

  const { data: recentSessions, isLoading: loadingSessions } = useQuery({
    queryKey: ["admin-logs-sessions"],
    queryFn: async () => {
      const { data } = await supabase
        .from("assessment_sessions")
        .select("id, user_id, assessment_id, started_at, completed, tab_switches, assessments(title)")
        .order("started_at", { ascending: false })
        .limit(50);
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Activity Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor platform activity and audit trail</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Tabs defaultValue="results">
        <TabsList>
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="sessions">Test Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="results">
          <Card>
            <CardContent className="p-0">
              {loadingResults ? (
                <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>IP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentResults?.filter(r =>
                      (r.assessments as any)?.title?.toLowerCase().includes(search.toLowerCase()) ||
                      r.user_id.includes(search)
                    ).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(log.completed_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{log.user_id.slice(0, 8)}...</TableCell>
                        <TableCell className="text-sm">{(log.assessments as any)?.title}</TableCell>
                        <TableCell className="font-semibold text-sm">{Number(log.percentage).toFixed(0)}%</TableCell>
                        <TableCell>
                          <Badge variant={log.passed ? "default" : "destructive"} className="text-[10px]">
                            {log.passed ? "Pass" : "Fail"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{log.ip_address || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardContent className="p-0">
              {loadingSessions ? (
                <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tab Switches</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSessions?.filter(s =>
                      (s.assessments as any)?.title?.toLowerCase().includes(search.toLowerCase()) ||
                      s.user_id.includes(search)
                    ).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {log.started_at ? new Date(log.started_at).toLocaleString() : "—"}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{log.user_id.slice(0, 8)}...</TableCell>
                        <TableCell className="text-sm">{(log.assessments as any)?.title}</TableCell>
                        <TableCell>
                          <Badge variant={log.completed ? "default" : "outline"} className="text-[10px]">
                            {log.completed ? "Completed" : "In Progress"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{log.tab_switches ?? 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
