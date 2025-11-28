import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Filter, Clock, FileQuestion } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration_minutes: number;
  is_published: boolean;
}

const Assessments = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load assessments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAssessments = assessments.filter((assessment) =>
    assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assessment.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">Assessments</h1>
                  <p className="text-muted-foreground">
                    3,400+ skills tested across 2,500+ job roles
                  </p>
                </div>
                <Button size="lg" className="gap-2">
                  <Plus className="w-5 h-5" />
                  Create Assessment
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search assessments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </Button>
              </div>

              {/* Assessment Grid */}
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-64 bg-card border border-border rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : filteredAssessments.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAssessments.map((assessment) => (
                    <Card key={assessment.id} className="p-6 hover:shadow-elegant transition-smooth cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileQuestion className="w-6 h-6 text-primary" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          assessment.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          assessment.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {assessment.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{assessment.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {assessment.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {assessment.duration_minutes} min
                        </span>
                        <span className="text-primary font-medium">{assessment.category}</span>
                      </div>
                      <Button className="w-full mt-4">Start Assessment</Button>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <FileQuestion className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No assessments found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Try adjusting your search" : "Get started by creating your first assessment"}
                  </p>
                  <Button>
                    <Plus className="w-5 h-5 mr-2" />
                    Create Assessment
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Assessments;
