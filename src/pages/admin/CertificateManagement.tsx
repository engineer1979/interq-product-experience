import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function CertificateManagement() {
  const [search, setSearch] = useState("");

  // Certificates are derived from passed assessment results
  const { data: certificates, isLoading } = useQuery({
    queryKey: ["admin-certificates"],
    queryFn: async () => {
      const { data } = await supabase
        .from("assessment_results")
        .select("*, assessments(title, category)")
        .eq("passed", true)
        .order("completed_at", { ascending: false });
      return data ?? [];
    },
  });

  const filtered = certificates?.filter((c) => {
    const title = (c.assessments as any)?.title?.toLowerCase() ?? "";
    return title.includes(search.toLowerCase()) || c.id.includes(search.toLowerCase());
  }) ?? [];

  const getAchievement = (pct: number) => {
    if (pct >= 90) return { label: "Excellence", variant: "default" as const };
    if (pct >= 80) return { label: "Distinction", variant: "secondary" as const };
    return { label: "Completed", variant: "outline" as const };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Certificate Management</h1>
        <p className="text-sm text-muted-foreground mt-1">{filtered.length} certificates issued</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by test or certificate ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Achievement</TableHead>
                  <TableHead>Issued</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((cert) => {
                  const achievement = getAchievement(Number(cert.percentage));
                  return (
                    <TableRow key={cert.id}>
                      <TableCell className="font-mono text-xs">{cert.id.slice(0, 12)}...</TableCell>
                      <TableCell className="font-medium text-sm">{(cert.assessments as any)?.title}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{(cert.assessments as any)?.category}</Badge></TableCell>
                      <TableCell className="font-semibold">{Number(cert.percentage).toFixed(0)}%</TableCell>
                      <TableCell><Badge variant={achievement.variant} className="text-[10px]">{achievement.label}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{new Date(cert.completed_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  );
                })}
                {!filtered.length && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    <Award className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                    No certificates found
                  </TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
