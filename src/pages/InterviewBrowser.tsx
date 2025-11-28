import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, Code, Clock, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Interview {
  id: string;
  title: string;
  description: string;
  job_role: string;
  duration_minutes: number;
  is_published: boolean;
  created_at: string;
}

export default function InterviewBrowser() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInterviews(data || []);
    } catch (error: any) {
      console.error('Error fetching interviews:', error);
      toast({
        title: "Error",
        description: "Failed to load interviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredInterviews = interviews.filter(interview =>
    interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interview.job_role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartInterview = (interviewId: string) => {
    navigate(`/interview/${interviewId}`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  IT Technical Interviews
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Test your technical skills with AI-powered assessments designed for IT professionals
                </p>
                
                {/* Search */}
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by job role or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-6 text-lg"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Interviews Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredInterviews.length === 0 ? (
                <div className="text-center py-20">
                  <Code className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-2xl font-semibold mb-2">No interviews found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? "Try adjusting your search" : "Check back later for new opportunities"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInterviews.map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <Badge className="mb-2">{interview.job_role}</Badge>
                              <h3 className="text-xl font-semibold mb-2">
                                {interview.title}
                              </h3>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {interview.description}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {interview.duration_minutes} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Code className="h-4 w-4" />
                              Technical
                            </span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleStartInterview(interview.id)}
                          className="w-full gap-2"
                        >
                          <PlayCircle className="h-4 w-4" />
                          Start Interview
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}