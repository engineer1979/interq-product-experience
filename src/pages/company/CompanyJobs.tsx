import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Briefcase } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyJobs() {
  const { company } = useOutletContext<{ company: { id: string } }>();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["company-jobs", company.id],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("jobs")
        .select("*")
        .eq("company_id", company.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Jobs & Job Descriptions</h1>
          <p className="text-sm text-muted-foreground">{jobs?.length ?? 0} job postings</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Create Job</Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}</div>
      ) : jobs?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No jobs yet</h3>
            <p className="text-muted-foreground mb-4">Create your first job posting to start hiring.</p>
            <Button><Plus className="h-4 w-4 mr-2" /> Create Job</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs?.map((job: any) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <div className="flex gap-2 mt-1">
                    {job.department && <Badge variant="outline" className="text-xs">{job.department}</Badge>}
                    {job.location && <Badge variant="secondary" className="text-xs">{job.location}</Badge>}
                    <Badge className={job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}>{job.status}</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
