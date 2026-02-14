import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function CompanyNotifications() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-sm text-muted-foreground">Manage automated and manual candidate notifications</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Notification Center</h3>
          <p className="text-muted-foreground">Configure automated triggers and send manual messages to candidates.</p>
        </CardContent>
      </Card>
    </div>
  );
}
