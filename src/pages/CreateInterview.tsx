import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const IT_ROLES = [
  "Software Developer",
  "Frontend Developer", 
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Android Developer",
  "iOS Developer",
  "QA Engineer",
  "ML Engineer",
  "Cloud Architect",
  "Security Engineer"
];

export default function CreateInterview() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    job_role: "",
    duration_minutes: 60,
    difficulty: "medium",
    question_count: 10,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.job_role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Create interview
      const { data: interview, error: interviewError } = await supabase
        .from('interviews')
        .insert({
          title: formData.title,
          description: formData.description,
          job_role: formData.job_role,
          duration_minutes: formData.duration_minutes,
          is_published: true,
          created_by: user?.id,
          questions: {},
        })
        .select()
        .single();

      if (interviewError) throw interviewError;

      // Generate questions using AI
      setGenerating(true);
      const { data: genData, error: genError } = await supabase.functions.invoke('generate-interview-questions', {
        body: {
          interviewId: interview.id,
          jobRole: formData.job_role,
          difficulty: formData.difficulty,
          questionCount: formData.question_count,
        }
      });

      if (genError) throw genError;

      toast({
        title: "Success",
        description: `Interview created with ${genData.mcqCount} MCQs and ${genData.codingCount} coding challenges!`,
      });

      navigate('/ai-interview');

    } catch (error: any) {
      console.error('Error creating interview:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create AI Interview</h1>
              <p className="text-muted-foreground">
                Generate a custom technical interview with AI-powered questions
              </p>
            </div>

            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Interview Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., Senior Frontend Developer Assessment"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Describe what this interview will test..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="job_role">IT Job Role *</Label>
                    <Select
                      value={formData.job_role}
                      onValueChange={(value) => handleChange('job_role', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {IT_ROLES.map(role => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => handleChange('difficulty', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="15"
                      max="180"
                      value={formData.duration_minutes}
                      onChange={(e) => handleChange('duration_minutes', parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="questions">Number of Questions</Label>
                    <Input
                      id="questions"
                      type="number"
                      min="5"
                      max="30"
                      value={formData.question_count}
                      onChange={(e) => handleChange('question_count', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm mb-1">AI-Powered Generation</p>
                      <p className="text-sm text-muted-foreground">
                        Questions will be automatically generated based on the role and difficulty level.
                        This includes {Math.floor(formData.question_count * 0.6)} MCQs and {formData.question_count - Math.floor(formData.question_count * 0.6)} coding challenges.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/ai-interview')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || generating}
                    className="flex-1"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Questions...
                      </>
                    ) : loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Create Interview
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}