import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Trash2, GripVertical, Video, Code, Type, CheckCircle2, ListChecks } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type QuestionType = 'text' | 'video' | 'code' | 'mcq';

interface QuestionDraft {
  id: string;
  type: QuestionType;
  text: string;
  timeLimit: number; // seconds
  points: number;
  options?: string[]; // For MCQ
  correctAnswer?: string; // For MCQ
  starterCode?: string; // For Code
}

export default function CreateAssessment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Engineering",
    difficulty: "medium",
    duration_minutes: 60,
    passing_score: 70,
    is_published: true,
  });

  const [questions, setQuestions] = useState<QuestionDraft[]>([
    { id: '1', type: 'text', text: 'Tell me about yourself.', timeLimit: 120, points: 10 }
  ]);

  const addQuestion = () => {
    const newQ: QuestionDraft = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      text: '',
      timeLimit: 120,
      points: 10
    };
    setQuestions([...questions, newQ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, field: keyof QuestionDraft, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const addOption = (qId: string) => {
    const q = questions.find(qu => qu.id === qId);
    if (q) {
      const currentOptions = q.options || [];
      updateQuestion(qId, 'options', [...currentOptions, `Option ${currentOptions.length + 1}`]);
    }
  };

  const updateOption = (qId: string, index: number, val: string) => {
    const q = questions.find(qu => qu.id === qId);
    if (q && q.options) {
      const newOpts = [...q.options];
      newOpts[index] = val;
      updateQuestion(qId, 'options', newOpts);
    }
  };

  const removeOption = (qId: string, index: number) => {
    const q = questions.find(qu => qu.id === qId);
    if (q && q.options) {
      const newOpts = q.options.filter((_, i) => i !== index);
      updateQuestion(qId, 'options', newOpts);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 1. Insert Assessment
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          title: formData.title,
          category: formData.category,
          difficulty: formData.difficulty,
          description: formData.description,
          duration_minutes: formData.duration_minutes,
          passing_score: formData.passing_score,
          created_by: user.id,
          is_published: formData.is_published
        })
        .select()
        .single();

      if (assessmentError) throw assessmentError;

      const assessmentId = assessmentData.id;

      // 2. Insert Questions
      const questionsPayload = questions.map((q, index) => ({
        assessment_id: assessmentId,
        question_text: q.text,
        question_type: q.type,
        points: q.points,
        order_index: index,
        options: q.type === 'mcq' ? JSON.stringify(q.options) : (q.type === 'code' ? JSON.stringify({ starterCode: q.starterCode }) : null),
        correct_answer: q.correctAnswer || '',
      }));

      const { error: qError } = await supabase.from('assessment_questions').insert(questionsPayload);
      if (qError) throw qError;

      toast({
        title: "Success",
        description: "Assessment created successfully.",
      });
      navigate('/assessments'); 

    } catch (error: any) {
      console.error(error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-8">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Assessment</h1>
            <p className="text-muted-foreground">Design a structured assessment with various question types.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Steps */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Details</CardTitle>
                  <CardDescription>Basic information about this test.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. React Frontend Assessment"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select value={formData.difficulty} onValueChange={(val) => setFormData({ ...formData, difficulty: val })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="What does this assessment cover?"
                    />
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Duration (Minutes)</Label>
                      <Input
                        type="number"
                        value={formData.duration_minutes}
                        onChange={e => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                     <div className="space-y-2">
                      <Label>Passing Score (%)</Label>
                      <Input
                        type="number"
                        value={formData.passing_score}
                        onChange={e => setFormData({ ...formData, passing_score: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                   </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
                  <Button variant="outline" size="sm" onClick={addQuestion}>
                    <Plus className="w-4 h-4 mr-2" /> Add Question
                  </Button>
                </div>

                {questions.map((q, index) => (
                  <Card key={q.id} className="relative group">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-grab">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <CardContent className="p-4 pl-10 space-y-4">
                      <div className="flex gap-4">
                        <div className="w-1/3 space-y-2">
                          <Label>Type</Label>
                          <Select
                            value={q.type}
                            onValueChange={(val) => updateQuestion(q.id, 'type', val)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text"><div className="flex items-center gap-2"><Type className="w-4 h-4" /> Text Answer</div></SelectItem>
                              <SelectItem value="mcq"><div className="flex items-center gap-2"><ListChecks className="w-4 h-4" /> Multiple Choice</div></SelectItem>
                              <SelectItem value="video"><div className="flex items-center gap-2"><Video className="w-4 h-4" /> Video Response</div></SelectItem>
                              <SelectItem value="code"><div className="flex items-center gap-2"><Code className="w-4 h-4" /> Coding Challenge</div></SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-2/3 space-y-2">
                          <Label>Question Text</Label>
                          <Input
                            value={q.text}
                            onChange={e => updateQuestion(q.id, 'text', e.target.value)}
                            placeholder="Enter question text..."
                          />
                        </div>
                      </div>

                      {/* Specific Inputs based on Type */}
                      {q.type === 'mcq' && (
                        <div className="space-y-3 pl-2 border-l-2 border-primary/20">
                            <Label>Options</Label>
                             <RadioGroup value={q.correctAnswer} onValueChange={(val) => updateQuestion(q.id, 'correctAnswer', val)}>
                                {(q.options || []).map((opt, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <RadioGroupItem value={opt} id={`${q.id}-opt-${i}`} />
                                        <Input 
                                            value={opt} 
                                            onChange={(e) => updateOption(q.id, i, e.target.value)}
                                            className="h-8"
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => removeOption(q.id, i)}><Trash2 className="w-3 h-3" /></Button>
                                    </div>
                                ))}
                             </RadioGroup>
                             <Button variant="outline" size="sm" onClick={() => addOption(q.id)} className="mt-2">Add Option</Button>
                        </div>
                      )}

                      {q.type === 'code' && (
                          <div className="space-y-2">
                              <Label>Starter Code</Label>
                              <Textarea 
                                value={q.starterCode} 
                                onChange={(e) => updateQuestion(q.id, 'starterCode', e.target.value)}
                                className="font-mono text-sm"
                                placeholder="// Write starter code here..."
                              />
                          </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Points</Label>
                          <Input
                            type="number"
                            value={q.points}
                            onChange={e => updateQuestion(q.id, 'points', parseInt(e.target.value))}
                          />
                        </div>
                         {/* Removed time limit per question as it's usually per assessment, but kept in data model if needed later */}
                      </div>
                    </CardContent>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
                      onClick={() => removeQuestion(q.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Col: Summary & Save */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Points:</span>
                    <span className="font-medium">{questions.reduce((acc, q) => acc + (q.points || 0), 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Questions:</span>
                    <span className="font-medium">{questions.length}</span>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                      Publish Assessment
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      This will make it available in the assessment catalog.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
