import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, Search, ArrowRight, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    employment_type: string;
    description: string;
    tags?: string[];
}

const MOCK_JOBS: Job[] = [
    { id: "mock-1", title: "Senior React Developer (Demo)", department: "Engineering", location: "Remote", employment_type: "Full-time", description: "We are looking for an experienced React developer to lead our frontend initiatives.", tags: ["React", "TypeScript", "Node.js"] },
    { id: "mock-2", title: "Product Manager (Demo)", department: "Product", location: "New York, NY", employment_type: "Full-time", description: "Drive the product vision and strategy for our core assessment platform.", tags: ["Strategy", "Agile", "UX"] },
];

export default function Careers() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDept, setSelectedDept] = useState("All");
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data, error } = await (supabase as any)
                    .from('jobs')
                    .select('*')
                    .eq('status', 'active')
                    .order('created_at', { ascending: false });

                if (error || !data || data.length === 0) {
                    setJobs(MOCK_JOBS);
                } else {
                    setJobs(data as Job[]);
                }
            } catch {
                setJobs(MOCK_JOBS);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = selectedDept === "All" || job.department === selectedDept;
        return matchesSearch && matchesDept;
    });

    const departments = ["All", ...Array.from(new Set(jobs.map(j => j.department))).filter(Boolean)];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navigation />
            <main className="flex-grow">
                <section className="pt-32 pb-20 px-4 bg-secondary/20">
                    <div className="container mx-auto text-center max-w-3xl">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Build the Future of <br /><span className="text-primary">Hiring Intelligence</span>
                        </motion.h1>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-xl mx-auto relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search roles..." className="pl-10 h-12 text-lg shadow-lg border-primary/20" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </motion.div>
                    </div>
                </section>
                <section className="py-20 px-4 container mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
                    ) : (
                        <>
                            <div className="flex flex-wrap gap-2 justify-center mb-12">
                                {departments.map(dept => (
                                    <Button key={dept} variant={selectedDept === dept ? "default" : "outline"} onClick={() => setSelectedDept(dept)} className="rounded-full">{dept}</Button>
                                ))}
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredJobs.length === 0 ? (
                                    <div className="col-span-full text-center py-20 text-muted-foreground">No roles found.</div>
                                ) : (
                                    filteredJobs.map((job, index) => (
                                        <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-primary/10">
                                                <CardHeader>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <Badge variant="secondary">{job.department}</Badge>
                                                        <Badge variant="outline" className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.employment_type}</Badge>
                                                    </div>
                                                    <CardTitle className="text-xl">{job.title}</CardTitle>
                                                    <CardDescription className="flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{job.location}</CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex-grow">
                                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{job.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {job.tags?.map(tag => <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">{tag}</span>)}
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <Button className="w-full gap-2 group" onClick={() => navigate(`/apply/${job.id}`)}>Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
