import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function CompanyResults() {
  const { company } = useOutletContext<{ company: { id: string } }>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Results & Reports</h1>
        <p className="text-sm text-muted-foreground">View candidate scores and export reports</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Results Dashboard</h3>
          <p className="text-muted-foreground">Candidate results will appear here once assessments are completed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
