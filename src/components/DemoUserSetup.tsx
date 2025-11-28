import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const demoUsers = [
  {
    role: "Admin",
    email: "admin@interq.demo",
    password: "Admin@123",
    description: "Full system access and user management",
    color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  {
    role: "Recruiter",
    email: "recruiter@interq.demo",
    password: "Recruiter@123",
    description: "Create assessments and view candidate results",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    role: "Enterprise",
    email: "enterprise@interq.demo",
    password: "Enterprise@123",
    description: "Manage organization-wide hiring",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  {
    role: "Candidate",
    email: "candidate@interq.demo",
    password: "Candidate@123",
    description: "Take assessments and interviews",
    color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
];

export function DemoUserSetup() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast({
      title: "Copied!",
      description: `${field} copied to clipboard`,
    });
  };

  const createDemoUsers = async () => {
    setCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-demo-users', {
        body: {},
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Demo users have been created. You can now sign in with any of the accounts.",
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
          First, create the demo users. Then copy credentials to sign in.
        </p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
        <p className="text-sm font-medium text-center mb-2">
          ⚠️ Step 1: Click this button first!
        </p>
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

      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <p className="text-sm text-center">
          Step 2: After creation succeeds, copy any credentials below and sign in on the left →
        </p>
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

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 bg-muted p-2 rounded">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-mono truncate">{user.email}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(user.email, `${user.role} email`)}
                  className="flex-shrink-0"
                >
                  {copiedField === `${user.role} email` ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between gap-2 bg-muted p-2 rounded">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Password</p>
                  <p className="text-sm font-mono">{user.password}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(user.password, `${user.role} password`)}
                  className="flex-shrink-0"
                >
                  {copiedField === `${user.role} password` ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
