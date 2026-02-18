import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Users, Upload } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const statusColors: Record<string, string> = {
  applied: "bg-blue-100 text-blue-800",
  screened: "bg-yellow-100 text-yellow-800",
  assessment_sent: "bg-purple-100 text-purple-800",
  assessment_completed: "bg-green-100 text-green-800",
  interview_scheduled: "bg-indigo-100 text-indigo-800",
  hired: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

export default function CompanyCandidates() {
  const { company } = useOutletContext<{ company: { id: string } }>();
  const [search, setSearch] = useState("");

  const { data: candidates, isLoading } = useQuery({
    queryKey: ["company-candidates", company.id],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("candidates")
        .select("*, jobs(title)")
        .eq("company_id", company.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const filtered = candidates?.filter((c: any) =>
    c.full_name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Candidates (ATS)</h1>
          <p className="text-sm text-muted-foreground">{candidates?.length ?? 0} candidates total</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Upload className="h-4 w-4 mr-2" /> Import CSV</Button>
          <Button><Plus className="h-4 w-4 mr-2" /> Add Candidate</Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search candidates..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No candidates found</h3>
              <p className="text-muted-foreground">Add candidates manually or import via CSV.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c: any) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.full_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.email}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{c.jobs?.title || "—"}</Badge></TableCell>
                    <TableCell><Badge className={`text-[10px] ${statusColors[c.status] || 'bg-muted'}`}>{c.status.replace("_", " ")}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
