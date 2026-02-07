import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

export default function ApplyPage() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    // Fetch Job Details
    useEffect(() => {
        const fetchJob = async () => {
            if (!jobId) return;
            // Try fetching from real DB
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .eq('id', jobId)
                .single();

            if (data) {
                setJob(data);
            } else {
                // Fallback to mock if DB is empty or fails
                console.log("Using fallback job data");
                setJob({
                    id: jobId,
                    title: "Senior React Developer",
                    department: "Engineering",
                    type: "Full-time"
                });
            }
        };
        fetchJob();
    }, [jobId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                toast({ title: "File too large", description: "Max 5MB allowed", variant: "destructive" });
                return;
            }
            setResumeFile(file);
        }
    };

    const handleApplicationStart = async () => {
        if (!resumeFile || !fullName || !email) {
            toast({ title: "Missing Information", description: "Please fill in all fields and upload resume.", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            // 1. Upload Resume
            setUploading(true);
            const fileExt = resumeFile.name.split('.').pop();
            const fileName = `${jobId}/${Date.now()}_${email.replace(/[^a-z0-9]/gi, '_')}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(fileName, resumeFile);

            if (uploadError) {
                // If bucket doesn't exist, we might fail here. 
                // For demo resilience, we'll log and proceed with a fake URL if it's a "Bucket not found" error, 
                // but ideally we throw.
                console.error("Upload failed:", uploadError);
                if ((uploadError as any).message?.includes("bucket")) {
                    throw new Error("System error: 'resumes' bucket missing. Please contact admin.");
                }
                throw uploadError;
            }

            const resumeUrl = uploadData?.path;

            // 2. Create Application Record
            const { data: appData, error: appError } = await supabase
                .from('applications')
                .insert({
                    job_id: jobId,
                    candidate_name: fullName,
                    candidate_email: email,
                    resume_url: resumeUrl,
                    status: 'applied',
                    score: 0
                })
                .select()
                .single();

            if (appError) throw appError;

            toast({
                title: "Application Received",
                description: "Redirecting you to the skills assessment...",
            });

            // 3. Redirect to Assessment
            // Pass the Application ID so the assessment can link results back
            navigate(`/live-interview?applicationId=${appData.id}`);

        } catch (error: any) {
            console.error(error);
            toast({
                title: "Application Error",
                description: error.message || "Failed to submit application",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    if (!job && !jobId) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navigation />

            <main className="flex-grow container mx-auto px-4 pt-32 pb-20 flex items-center justify-center">
                <Card className="w-full max-w-2xl shadow-xl border-primary/10">
                    <CardHeader className="text-center pb-8 border-b bg-secondary/10 rounded-t-xl">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Apply for {job?.title || "Position"}</CardTitle>
                        <CardDescription className="text-lg">
                            {job?.department} • {job?.type || "Full-time"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-8 space-y-6">
                        {/* Progress Steps */}
                        <div className="flex items-center justify-center gap-4 mb-8 text-sm font-medium text-muted-foreground">
                            <div className="flex items-center gap-2 text-primary">
                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">1</div>
                                Profile
                            </div>
                            <div className="h-[1px] w-12 bg-border"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">2</div>
                                Assessment
                            </div>
                            <div className="h-[1px] w-12 bg-border"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">3</div>
                                Complete
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="resume" className="text-base font-semibold">Upload Resume (PDF/DOCX)</Label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:bg-secondary/5 transition-colors cursor-pointer relative group">
                                <Input
                                    id="resume"
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                />
                                {resumeFile ? (
                                    <div className="flex flex-col items-center gap-2 text-primary">
                                        <CheckCircle2 className="w-8 h-8" />
                                        <p className="font-medium">{resumeFile.name}</p>
                                        <p className="text-xs text-muted-foreground">Click to change</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                                        <Upload className="w-8 h-8" />
                                        <p className="font-medium">Drag & drop or click to upload</p>
                                        <p className="text-xs">Max size: 5MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">What happens next?</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                After submitting your profile, you will be redirected to our AI-powered skills assessment.
                                Please ensure you are in a quiet environment.
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="p-8 pt-0">
                        <Button size="lg" className="w-full text-lg h-12" onClick={handleApplicationStart} disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> {uploading ? "Uploading Resume..." : "Creating Profile..."}
                                </>
                            ) : (
                                <>
                                    Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
