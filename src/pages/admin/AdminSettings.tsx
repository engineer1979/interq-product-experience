import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IntegrationsTab } from "@/components/admin/IntegrationsTab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground mt-2">Manage workspace preferences, integrations, and notifications.</p>
                </div>
                <Button>Save Changes</Button>
            </div>

            <Tabs defaultValue="integrations" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Workspace Settings</CardTitle>
                            <CardDescription>
                                Configure your team name and primary contact details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="workspace-name">Workspace Name</Label>
                                <Input id="workspace-name" defaultValue="InterQ Recruitment Team" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="workspace-email">Contact Email</Label>
                                <Input id="workspace-email" defaultValue="admin@interq.ai" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="integrations">
                    <IntegrationsTab />
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>
                                Choose what updates you want to receive.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Notification settings coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
