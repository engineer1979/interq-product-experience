import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobSeekerManagement() {
  const [search, setSearch] = useState("");

  const { data: seekers, isLoading } = useQuery({
    queryKey: ["admin-job-seekers"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "candidate")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const filtered = seekers?.filter((s) =>
    (s.full_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Job Seeker Management</h1>
        <p className="text-sm text-muted-foreground mt-1">{filtered.length} job seekers registered</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search job seekers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((seeker) => (
                  <TableRow key={seeker.id}>
                    <TableCell className="font-medium">{seeker.full_name || "—"}</TableCell>
                    <TableCell className="text-sm">{seeker.email}</TableCell>
                    <TableCell className="text-sm">{seeker.phone_number || "—"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(seeker.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                {!filtered.length && (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    <GraduationCap className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                    No job seekers found
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
