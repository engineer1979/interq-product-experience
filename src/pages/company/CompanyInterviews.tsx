import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function CompanyInterviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Interviews</h1>
        <p className="text-sm text-muted-foreground">Schedule and manage live interviews with candidates</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Interview Management</h3>
          <p className="text-muted-foreground">Schedule and track candidate interviews here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
