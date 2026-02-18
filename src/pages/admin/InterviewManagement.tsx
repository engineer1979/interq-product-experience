import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function InterviewManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: interviews, isLoading } = useQuery({
    queryKey: ["admin-interviews"],
    queryFn: async () => {
      const { data } = await supabase
        .from("interviews")
        .select("*, interview_sessions(id, status, completed, final_score, user_id)")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const filtered = interviews?.filter((i) => {
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) || i.job_role.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  }) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Interview Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage live interviews across the platform</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Interviews", value: interviews?.length ?? 0 },
          { label: "Published", value: interviews?.filter(i => i.is_published).length ?? 0 },
          { label: "Total Sessions", value: interviews?.reduce((sum, i) => sum + ((i.interview_sessions as any[])?.length ?? 0), 0) ?? 0 },
          { label: "Completed", value: interviews?.reduce((sum, i) => sum + ((i.interview_sessions as any[])?.filter((s: any) => s.completed).length ?? 0), 0) ?? 0 },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search interviews..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell className="font-medium">{interview.title}</TableCell>
                    <TableCell>{interview.job_role}</TableCell>
                    <TableCell>{interview.duration_minutes}m</TableCell>
                    <TableCell>{(interview.interview_sessions as any[])?.length ?? 0}</TableCell>
                    <TableCell>
                      <Badge variant={interview.is_published ? "default" : "outline"} className="text-[10px]">
                        {interview.is_published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(interview.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
                {!filtered.length && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No interviews found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
