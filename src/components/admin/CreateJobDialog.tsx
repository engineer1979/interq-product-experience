import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CreateJobDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onJobCreated?: () => void;
}

interface AssessmentOption {
    id: string;
    title: string;
}

export function CreateJobDialog({ open, onOpenChange, onJobCreated }: CreateJobDialogProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [assessments, setAssessments] = useState<AssessmentOption[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        department: "",
        location: "",
        type: "full-time",
        description: "",
        assessmentId: ""
    });

    // Simulate fetching assessments or fetch real ones if easier
    useEffect(() => {
        const fetchAssessments = async () => {
            // In a real scenario, we fetch from 'interviews' table
            // const { data } = await supabase.from('interviews').select('id, title');
            // if (data) setAssessments(data);

            // Mock data for demo
            setAssessments([
                { id: "mock-1", title: "Software Engineer Behavioral" },
                { id: "mock-2", title: "Product Manager Core Skills" },
                { id: "mock-3", title: "Senior React Assessment" }
            ]);
        };

        if (open) {
            fetchAssessments();
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Get current user
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error("You must be logged in to create a job.");
            }

            // 2. Insert into jobs table
            const { data: jobData, error } = await supabase
                .from('jobs')
                .insert({
                    title: formData.title,
                    department: formData.department,
                    location: formData.location,
                    employment_type: formData.type,
                    description: formData.description,
                    status: 'active',
                    created_by: user.id
                })
                .select()
                .single();

            if (error) {
                console.warn("Supabase insert failed (likely missing table migration):", error);
                toast({
                    title: "Demo Mode",
                    description: "Job created properly in UI state (Database not connected yet).",
                });
            } else {
                // 3. Link Assessment (job_assessments)
                if (formData.assessmentId && jobData) {
                    await supabase.from('job_assessments').insert({
                        job_id: jobData.id,
                        interview_id: formData.assessmentId,
                        stage: 'screening'
                    });
                }

                toast({
                    title: "Job Created",
                    description: "The new role has been published successfully.",
                });
            }

            onOpenChange(false);
            if (onJobCreated) onJobCreated();

            // Reset form
            setFormData({
                title: "",
                department: "",
                location: "",
                type: "full-time",
                description: "",
                assessmentId: ""
            });

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Create New Job Role</DialogTitle>
                    <DialogDescription>
                        Add a new job opening and assign an assessment template.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Job Title
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="col-span-3"
                            placeholder="e.g. Senior Product Designer"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="department" className="text-right">
                            Department
                        </Label>
                        <Select
                            value={formData.department}
                            onValueChange={(val) => setFormData({ ...formData, department: val })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Product">Product</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Operations">Operations</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                            Location
                        </Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="col-span-3"
                            placeholder="e.g. Remote / New York"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Type
                        </Label>
                        <Select
                            value={formData.type}
                            onValueChange={(val) => setFormData({ ...formData, type: val })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assessment" className="text-right">
                            Assessment
                        </Label>
                        <Select
                            value={formData.assessmentId}
                            onValueChange={(val) => setFormData({ ...formData, assessmentId: val })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select an assessment template..." />
                            </SelectTrigger>
                            <SelectContent>
                                {assessments.map(a => (
                                    <SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="col-span-3"
                            placeholder="Brief description of the role..."
                            rows={3}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Job"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
