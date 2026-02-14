import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, Eye, Plus, Pencil, Trash2 } from "lucide-react";

interface Permission {
  id: string;
  role: string;
  module_name: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
}

const modules = ["assessments", "interviews", "analytics", "users", "settings"];
const roles = ["admin", "company", "job_seeker"];

export function PermissionManagement() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const { data, error } = await supabase
        .from("module_permissions")
        .select("*")
        .order("role", { ascending: true });

      if (error) throw error;
      setPermissions(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load permissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePermission = async (
    permissionId: string,
    field: "can_view" | "can_create" | "can_edit" | "can_delete",
    value: boolean
  ) => {
    try {
      const { error } = await supabase
        .from("module_permissions")
        .update({ [field]: value })
        .eq("id", permissionId);

      if (error) throw error;

      setPermissions((prev) =>
        prev.map((p) => (p.id === permissionId ? { ...p, [field]: value } : p))
      );

      toast({
        title: "Success!",
        description: "Permission updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update permission",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
      case "company":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
      case "job_seeker":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const groupedPermissions = roles.map((role) => ({
    role,
    permissions: permissions.filter((p) => p.role === role),
  }));

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Module Permissions</h2>
          <p className="text-muted-foreground">
            Configure which modules each role can access and what actions they can perform
          </p>
        </div>

        <div className="space-y-8">
          {groupedPermissions.map(({ role, permissions: rolePermissions }) => (
            <div key={role} className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(role)}`}>
                  {role === 'job_seeker' ? 'Job Seeker' : role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Plus className="w-4 h-4" />
                          Create
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Pencil className="w-4 h-4" />
                          Edit
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rolePermissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium capitalize">
                          {permission.module_name}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={permission.can_view}
                              onCheckedChange={(checked) =>
                                updatePermission(permission.id, "can_view", checked)
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={permission.can_create}
                              onCheckedChange={(checked) =>
                                updatePermission(permission.id, "can_create", checked)
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={permission.can_edit}
                              onCheckedChange={(checked) =>
                                updatePermission(permission.id, "can_edit", checked)
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={permission.can_delete}
                              onCheckedChange={(checked) =>
                                updatePermission(permission.id, "can_delete", checked)
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
