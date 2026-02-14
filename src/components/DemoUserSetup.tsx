import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const demoUsers = [
  {
    role: "Admin",
    description: "Full system access and user management",
    color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  {
    role: "Company",
    description: "Create assessments and manage hiring pipeline",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    role: "Job Seeker",
    description: "Take assessments and attend interviews",
    color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
];

export function DemoUserSetup() {
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const createDemoUsers = async () => {
    setCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-demo-users', {
        body: {},
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Demo users have been created. Credentials have been sent to the administrator.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create demo users",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Demo User Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Create demo accounts to explore the platform functionalities.
        </p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
        <Button
          onClick={createDemoUsers}
          disabled={creating}
          className="w-full"
          size="lg"
        >
          <Users className="w-5 h-5 mr-2" />
          {creating ? "Creating Demo Users..." : "Create All Demo Users"}
        </Button>
      </div>

      <div className="grid gap-4">
        {demoUsers.map((user) => (
          <Card key={user.role} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${user.color}`}>
                    {user.role}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{user.description}</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded p-3 flex items-center gap-3 text-sm text-muted-foreground italic border border-dashed">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Credentials will be provided after successful demo user creation.</span>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
