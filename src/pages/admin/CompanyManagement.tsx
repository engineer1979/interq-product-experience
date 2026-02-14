import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyManagement() {
  const [search, setSearch] = useState("");

  const { data: companies, isLoading } = useQuery({
    queryKey: ["admin-companies"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .or("role.eq.recruiter,role.eq.enterprise,role.eq.company")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const filtered = companies?.filter((c) =>
    (c.full_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (c.company_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Company Management</h1>
        <p className="text-sm text-muted-foreground mt-1">{filtered.length} companies registered</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search companies..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
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
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.full_name || "—"}</TableCell>
                    <TableCell>{company.company_name || "—"}</TableCell>
                    <TableCell className="text-sm">{company.email}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{company.role}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(company.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                {!filtered.length && (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                    No companies found
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
