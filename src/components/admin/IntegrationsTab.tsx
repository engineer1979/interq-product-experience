
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, Video, Calendar, Database, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

// Types matching our database schema
interface Integration {
    id: string;
    name: string;
    description: string;
    provider: string;
    category: 'video_conferencing' | 'calendar' | 'ats' | 'auth';
    logo_url?: string;
    is_connected: boolean;
    is_enabled: boolean;
}

// Temporary mock data reflecting the migration
const INITIAL_INTEGRATIONS: Integration[] = [
    {
        id: "1",
        provider: "zoom",
        category: "video_conferencing",
        name: "Zoom",
        description: "Automatically generate meeting links for interviews.",
        is_connected: false,
        is_enabled: true
    },
    {
        id: "2",
        provider: "google_meet",
        category: "video_conferencing",
        name: "Google Meet",
        description: "Schedule interviews directly on Google Calendar.",
        is_connected: true,
        is_enabled: true
    },
    {
        id: "3",
        provider: "google_calendar",
        category: "calendar",
        name: "Google Calendar",
        description: "Sync interviewer availability and prevent double-booking.",
        is_connected: true,
        is_enabled: true
    },
    {
        id: "4",
        provider: "outlook",
        category: "calendar",
        name: "Outlook Calendar",
        description: "Connect your Microsoft Outlook calendar for scheduling.",
        is_connected: false,
        is_enabled: false
    },
    {
        id: "5",
        provider: "greenhouse",
        category: "ats",
        name: "Greenhouse",
        description: "Sync candidates and interview results with Greenhouse ATS.",
        is_connected: false,
        is_enabled: true
    },
    {
        id: "6",
        provider: "lever",
        category: "ats",
        name: "Lever",
        description: "Automate candidate workflows between InterQ and Lever.",
        is_connected: false,
        is_enabled: false
    }
];

export function IntegrationsTab() {
    const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);

    const toggleIntegration = (id: string) => {
        setIntegrations(prev => prev.map(int =>
            int.id === id ? { ...int, is_enabled: !int.is_enabled } : int
        ));
        // In real app, this would make an API call to Supabase
    };

    const getIcon = (category: string) => {
        switch (category) {
            case 'video_conferencing': return <Video className="h-5 w-5" />;
            case 'calendar': return <Calendar className="h-5 w-5" />;
            case 'ats': return <Database className="h-5 w-5" />;
            default: return <Cloud className="h-5 w-5" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Connected Apps</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your connections to third-party tools and services.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {integrations.map((integration) => (
                    <Card key={integration.id} className={cn("flex flex-col transition-all duration-200", integration.is_enabled ? "border-primary/20 bg-card" : "opacity-80 bg-muted/30")}>
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="p-2 bg-secondary/50 rounded-lg">
                                    {getIcon(integration.category)}
                                </div>
                                <Switch
                                    checked={integration.is_enabled}
                                    onCheckedChange={() => toggleIntegration(integration.id)}
                                />
                            </div>
                            <CardTitle className="mt-4 text-base">{integration.name}</CardTitle>
                            <CardDescription className="min-h-[40px]">{integration.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="mt-auto pt-0">
                            {integration.is_connected ? (
                                <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full dark:bg-green-900/20">
                                    <Check className="h-3 w-3" />
                                    Connected
                                </div>
                            ) : (
                                <Button variant="outline" size="sm" className="w-full" disabled={!integration.is_enabled}>
                                    Connect
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="rounded-lg border p-4 bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-500 mb-1 flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    Enterprise Connectors
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Need to connect with Workday, SAP, or specific HRIS systems?
                    <a href="/get-started" className="underline ml-1 font-medium">Contact our Sales Team</a> to enable enterprise integration packages.
                </p>
            </div>
        </div>
    );
}
