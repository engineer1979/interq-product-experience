import { useOutletContext, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ClipboardList, Eye, Edit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyTests() {
  const { company } = useOutletContext<{ company: { id: string } }>();
  const navigate = useNavigate();

  const { data: tests, isLoading } = useQuery({
    queryKey: ["company-tests", company.id],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("assessments")
        .select("*, assessment_questions(id)")
        .eq("company_id", company.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tests & Question Bank</h1>
          <p className="text-sm text-muted-foreground">{tests?.length ?? 0} tests created</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Create Test</Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48" />)}</div>
      ) : tests?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No tests yet</h3>
            <p className="text-muted-foreground mb-4">Build your first assessment test for candidates.</p>
            <Button><Plus className="h-4 w-4 mr-2" /> Create Test</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tests?.map((test: any) => (
            <Card key={test.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{test.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{test.category} • {test.difficulty}</p>
                  </div>
                  <Badge variant={test.is_published ? "default" : "secondary"}>
                    {test.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{test.assessment_questions?.length ?? 0} questions</span>
                  <span>{test.duration_minutes} min • {test.passing_score}% pass</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1"><Eye className="h-3 w-3 mr-1" /> Preview</Button>
                  <Button variant="outline" size="sm" className="flex-1"><Edit className="h-3 w-3 mr-1" /> Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
