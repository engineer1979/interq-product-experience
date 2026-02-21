import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminResults() {
  const [search, setSearch] = useState("");
  const [passFilter, setPassFilter] = useState("all");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 25;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-all-results", page],
    queryFn: async () => {
      const { data, count } = await supabase
        .from("assessment_results")
        .select("*, assessments(title, category)", { count: "exact" })
        .order("completed_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
      return { results: data ?? [], total: count ?? 0 };
    },
  });

  const filtered = data?.results.filter((r) => {
    const title = (r.assessments as any)?.title?.toLowerCase() ?? "";
    const matchSearch = title.includes(search.toLowerCase()) || r.user_id.includes(search);
    const matchPass = passFilter === "all" || (passFilter === "passed" ? r.passed : !r.passed);
    return matchSearch && matchPass;
  }) ?? [];

  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);

  const exportCSV = () => {
    if (!filtered.length) return;
    const header = "ID,Assessment,Category,Score,Percentage,Passed,Date\n";
    const rows = filtered.map(r =>
      `${r.id},"${(r.assessments as any)?.title}","${(r.assessments as any)?.category}",${r.score}/${r.total_points},${Number(r.percentage).toFixed(1)}%,${r.passed},${r.completed_at}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interq-results.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Test Results</h1>
          <p className="text-sm text-muted-foreground mt-1">{data?.total ?? 0} total results</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCSV}>
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by test name or user ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={passFilter} onValueChange={setPassFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Results</SelectItem>
            <SelectItem value="passed">Passed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium text-sm max-w-[200px] truncate">{(r.assessments as any)?.title}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{(r.assessments as any)?.category}</Badge></TableCell>
                    <TableCell className="font-mono text-xs">{r.user_id.slice(0, 8)}...</TableCell>
                    <TableCell className="text-sm font-semibold">{r.score}/{r.total_points} ({Number(r.percentage).toFixed(0)}%)</TableCell>
                    <TableCell>
                      <Badge variant={r.passed ? "default" : "destructive"} className="text-[10px]">
                        {r.passed ? "Pass" : "Fail"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(r.completed_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                {!filtered.length && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No results found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Page {page + 1} of {totalPages}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Previous</Button>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
