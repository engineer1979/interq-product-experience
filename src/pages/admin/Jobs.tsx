import { useState, useEffect } from "react";
import { Plus, Search, Filter, MoreHorizontal, Briefcase, Users, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateJobDialog } from "@/components/admin/CreateJobDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

// Data Type
interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    employment_type: string; // Changed from 'type' to match DB
    status: "active" | "draft" | "closed";
    created_at: string; // Changed from 'posted_at'
    candidate_count?: number; // Optional derived field
}

// Fallback Mock Data
const MOCK_JOBS: Job[] = [
    {
        id: "mock-1",
        title: "Senior React Developer (Demo)",
        department: "Engineering",
        location: "Remote",
        employment_type: "Full-time",
        status: "active",
        candidate_count: 12,
        created_at: new Date().toISOString(),
    },
    // ... more mocks if needed
];

export default function JobsPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("active");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    // Real Data State
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.warn("Using mock data due to DB error:", error);
                setJobs(MOCK_JOBS);
            } else {
                setJobs(data || []);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setJobs(MOCK_JOBS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        (activeTab === "all" ||
            (activeTab === "active" && (job.status === "active" || !job.status)) || // Handle potential nulls
            (activeTab === "draft" && job.status === "draft") ||
            (activeTab === "closed" && job.status === "closed")) &&
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const activeCount = jobs.filter(j => j.status === 'active').length;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
                    <p className="text-muted-foreground mt-1">Manage your job postings and applicant pipelines.</p>
                </div>
                <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Create New Job
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeCount}</div>
                        <p className="text-xs text-muted-foreground">Open positions</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {/* In a real app, calculate this via SQL count */}
                            {jobs.length * 4}
                        </div>
                        <p className="text-xs text-muted-foreground">Across all roles</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Time to Hire</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-- Days</div>
                        <p className="text-xs text-muted-foreground">Not enough data</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search jobs..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            <Tabs defaultValue="active" onValueChange={setActiveTab} className="w-full">
                <TabsList>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                    <TabsTrigger value="all">All Jobs</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-4">
                    <Card>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Job Title</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Posted Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                                <div className="flex justify-center items-center gap-2">
                                                    <Loader2 className="animate-spin h-5 w-5" /> Loading jobs...
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredJobs.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                                No jobs found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredJobs.map((job) => (
                                            <TableRow key={job.id}>
                                                <TableCell className="font-medium">{job.title}</TableCell>
                                                <TableCell>{job.department}</TableCell>
                                                <TableCell>{job.location}</TableCell>
                                                <TableCell>{job.employment_type}</TableCell>
                                                <TableCell>
                                                    {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={job.status === 'active' ? 'default' : job.status === 'draft' ? 'secondary' : 'outline'}>
                                                        {job.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                                            <DropdownMenuItem>View Candidates</DropdownMenuItem>
                                                            <DropdownMenuItem>Edit Job</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            <CreateJobDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onJobCreated={() => {
                    fetchJobs(); // Refresh list on create
                }}
            />
        </div>
    );
}
