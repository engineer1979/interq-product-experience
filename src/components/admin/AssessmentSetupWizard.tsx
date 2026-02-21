import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    Brain,
    Database,
    Settings2,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Upload,
    Zap,
    ShieldCheck,
    Search,
    Plus,
    Trash2,
    ListChecks,
    Video,
    Code,
    Type,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const STEPS = [
    { id: 1, title: "Vision", description: "Role & Goal", icon: Briefcase },
    { id: 2, title: "Intelligence", description: "AI Configuration", icon: Brain },
    { id: 3, title: "Question Bank", description: "Skill Design", icon: Database },
    { id: 4, title: "Governance", description: "Security & Rules", icon: Settings2 },
    { id: 5, title: "Launch", description: "Final Review", icon: CheckCircle2 },
];

export interface AssessmentConfig {
    title: string;
    category: string;
    difficulty: string;
    description: string;
    jobDescription?: string;
    aiScoringEnabled: boolean;
    biasAwareMode: boolean;
    dynamicBranching: boolean;
    totalDuration: number;
    passingScore: number;
    proctoringEnabled: boolean;
    questions: any[];
}

export function AssessmentSetupWizard({
    onComplete,
    onCancel
}: {
    onComplete: (config: AssessmentConfig) => void;
    onCancel: () => void;
}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [config, setConfig] = useState<AssessmentConfig>({
        title: "",
        category: "Engineering",
        difficulty: "medium",
        description: "",
        aiScoringEnabled: true,
        biasAwareMode: true,
        dynamicBranching: false,
        totalDuration: 60,
        passingScore: 70,
        proctoringEnabled: true,
        questions: [
            { id: "1", type: "text", text: "Explain your experience with React Hooks.", points: 10 }
        ]
    });

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const updateConfig = (updates: Partial<AssessmentConfig>) => {
        setConfig(prev => ({ ...prev, ...updates }));
    };

    const addQuestion = (type: string = 'text') => {
        const newQ = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            text: "",
            points: 10
        };
        updateConfig({ questions: [...config.questions, newQ] });
    };

    const removeQuestion = (id: string) => {
        updateConfig({ questions: config.questions.filter(q => q.id !== id) });
    };

    const updateQuestion = (id: string, text: string) => {
        updateConfig({
            questions: config.questions.map(q => q.id === id ? { ...q, text } : q)
        });
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
            {/* Stepper Header */}
            <div className="flex items-center justify-between gap-4 px-2 overflow-x-auto pb-4 hide-scrollbar">
                {STEPS.map((step, idx) => (
                    <div key={step.id} className="flex items-center flex-1 min-w-fit">
                        <div
                            className={`flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 ${currentStep >= step.id ? "opacity-100" : "opacity-40"
                                }`}
                            onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                        >
                            <div className={`
                w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                ${currentStep === step.id ? "bg-primary text-primary-foreground shadow-glow scale-110" :
                                    currentStep > step.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}
              `}>
                                <step.icon size={22} className={currentStep === step.id ? "animate-pulse" : ""} />
                            </div>
                            <div className="text-center hidden md:block">
                                <p className="text-xs font-bold uppercase tracking-widest leading-none mb-1">{step.title}</p>
                                <p className="text-[10px] text-muted-foreground font-medium">{step.description}</p>
                            </div>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div className={`flex-1 min-w-[20px] h-[2px] mx-4 rounded-full transition-all duration-1000 ${currentStep > idx + 1 ? "bg-primary" : "bg-muted"
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Main Workspace */}
                <div className="lg:col-span-8 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold tracking-tight">Set the Vision</h2>
                                        <p className="text-muted-foreground">Define the role and primary focus of this assessment.</p>
                                    </div>

                                    <Card className="glass border-primary/20 bg-primary/5 shadow-glow-sm overflow-hidden">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-center gap-2 text-primary">
                                                <Zap size={18} />
                                                <span className="text-xs font-black uppercase tracking-widest">Enterprise Feature</span>
                                            </div>
                                            <CardTitle className="text-lg">Smart Ingestion</CardTitle>
                                            <CardDescription>Upload a Job Description to auto-generate the rubric and questions.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 flex flex-col items-center gap-4 bg-white/50 dark:bg-black/20 hover:bg-primary/5 transition-colors cursor-pointer group">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Upload className="text-primary" size={20} />
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-semibold">Drag & drop JD (PDF/DOCX)</p>
                                                    <p className="text-xs text-muted-foreground">AI will extract 12+ key skill vectors instantly</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-widest mb-1 block">Internal Title</Label>
                                            <Input
                                                placeholder="e.g. Senior Backend Engineer - Node.js"
                                                value={config.title}
                                                onChange={(e) => updateConfig({ title: e.target.value })}
                                                className="h-12 bg-background/50 border-primary/10 transition-smooth focus:border-primary/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-widest mb-1 block">Category</Label>
                                            <Select value={config.category} onValueChange={(val) => updateConfig({ category: val })}>
                                                <SelectTrigger className="h-12 bg-background/50 border-primary/10">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                                    <SelectItem value="Product">Product Management</SelectItem>
                                                    <SelectItem value="Design">UI/UX Design</SelectItem>
                                                    <SelectItem value="Marketing">Growth Marketing</SelectItem>
                                                    <SelectItem value="Leadership">Executive Leadership</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-widest mb-1 block">Executive Summary</Label>
                                        <Textarea
                                            placeholder="Visible to candidates. Set expectations..."
                                            className="min-h-[120px] bg-background/50 border-primary/10"
                                            value={config.description}
                                            onChange={(e) => updateConfig({ description: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold tracking-tight">AI Intelligence Layer</h2>
                                        <p className="text-muted-foreground">Configure how the AI evaluates and branches during the interview.</p>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl group transition-smooth hover:border-primary/30">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                    <Search size={20} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold">Real-time AI Scoring</h4>
                                                    <p className="text-xs text-muted-foreground">Evaluate responses instantly against the rubric.</p>
                                                </div>
                                            </div>
                                            <Switch checked={config.aiScoringEnabled} onCheckedChange={(val) => updateConfig({ aiScoringEnabled: val })} />
                                        </div>

                                        <div className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl group transition-smooth hover:border-primary/30">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                                                    <ShieldCheck size={20} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold">Bias-Aware Mode</h4>
                                                    <p className="text-xs text-muted-foreground">Automatically redacts PII and neutralizes gender/age signals in transcripts.</p>
                                                </div>
                                            </div>
                                            <Switch checked={config.biasAwareMode} onCheckedChange={(val) => updateConfig({ biasAwareMode: val })} />
                                        </div>

                                        <div className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl group transition-smooth hover:border-primary/30">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                                                    <Zap size={20} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold">Dynamic Question Branching</h4>
                                                    <p className="text-xs text-muted-foreground">AI asks follow-ups based on the depth of the candidate's last answer.</p>
                                                </div>
                                            </div>
                                            <Switch checked={config.dynamicBranching} onCheckedChange={(val) => updateConfig({ dynamicBranching: val })} />
                                        </div>
                                    </div>

                                    <div className="p-6 bg-secondary/30 rounded-2xl border border-primary/10 space-y-4">
                                        <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Evaluation Rubric (X-Factors)</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Technical Depth", "Strategic Clarity", "Communication", "Problem Solving", "Cultural Alignment"].map(tag => (
                                                <Badge key={tag} className="py-1 px-3 bg-white/50 border-primary/20 text-foreground" variant="outline">{tag}</Badge>
                                            ))}
                                            <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold">+ CUSTOM VECTOR</Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h2 className="text-2xl font-bold tracking-tight">Skill Design</h2>
                                            <p className="text-muted-foreground">Craft the questions that reveal true potential.</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="text-xs" onClick={() => addQuestion('text')}>
                                                <Plus size={14} className="mr-1" /> Custom
                                            </Button>
                                            <Button size="sm" className="text-xs font-bold gradient-primary border-0 shadow-glow animate-pulse">
                                                <Zap size={14} className="mr-1" /> Suggest via AI
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                        {config.questions.map((q, idx) => (
                                            <Card key={q.id} className="group relative border-border/50 transition-smooth hover:border-primary/40">
                                                <CardContent className="p-4 grid grid-cols-12 gap-4 items-center">
                                                    <div className="col-span-1 flex flex-col items-center">
                                                        <span className="text-xs font-black text-muted-foreground group-hover:text-primary transition-colors">#{idx + 1}</span>
                                                    </div>
                                                    <div className="col-span-10 space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest py-0">
                                                                {q.type}
                                                            </Badge>
                                                            <Input
                                                                value={q.text}
                                                                onChange={(e) => updateQuestion(q.id, e.target.value)}
                                                                className="h-9 bg-transparent border-0 focus-visible:ring-0 p-0 text-sm font-medium"
                                                                placeholder="Add question text here..."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 flex justify-end">
                                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeQuestion(q.id)}>
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        {[
                                            { icon: Type, label: "Text", type: 'text' },
                                            { icon: Video, label: "Video", type: 'video' },
                                            { icon: Code, label: "Code", type: 'code' },
                                            { icon: ListChecks, label: "MCQ", type: 'mcq' }
                                        ].map(btn => (
                                            <button
                                                key={btn.label}
                                                onClick={() => addQuestion(btn.type)}
                                                className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-border hover:bg-muted hover:border-primary/50 transition-smooth gap-1"
                                            >
                                                <btn.icon size={18} className="text-primary" />
                                                <span className="text-[10px] font-bold uppercase">{btn.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold tracking-tight">Security & Governance</h2>
                                        <p className="text-muted-foreground">Establish the rules of engagement and anti-fraud protocols.</p>
                                    </div>

                                    <Card className="p-6 space-y-6">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div className="space-y-1">
                                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Session Duration</Label>
                                                    <div className="flex items-center gap-4">
                                                        <Input
                                                            type="number"
                                                            value={config.totalDuration}
                                                            onChange={(e) => updateConfig({ totalDuration: parseInt(e.target.value) })}
                                                            className="w-24 h-12 text-center text-xl font-bold"
                                                        />
                                                        <span className="font-medium text-muted-foreground underline decoration-dotted">Minutes Total</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Minimum Passing Threshold</Label>
                                                    <div className="flex items-center gap-4">
                                                        <Input
                                                            type="number"
                                                            value={config.passingScore}
                                                            onChange={(e) => updateConfig({ passingScore: parseInt(e.target.value) })}
                                                            className="w-24 h-12 text-center text-xl font-bold"
                                                        />
                                                        <span className="font-medium text-muted-foreground underline decoration-dotted">% Score</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border">
                                                    <div className="flex gap-3 items-center">
                                                        <ShieldCheck size={18} className="text-primary" />
                                                        <div className="space-y-0.5">
                                                            <p className="text-sm font-bold">Smart Proctoring</p>
                                                            <p className="text-[10px] text-muted-foreground">Detect tab switching & audio aid.</p>
                                                        </div>
                                                    </div>
                                                    <Switch checked={config.proctoringEnabled} onCheckedChange={(val) => updateConfig({ proctoringEnabled: val })} />
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border opacity-50 cursor-not-allowed">
                                                    <div className="flex gap-3 items-center">
                                                        <Settings2 size={18} className="text-primary" />
                                                        <div className="space-y-0.5">
                                                            <p className="text-sm font-bold">Hard Deadline</p>
                                                            <p className="text-[10px] text-muted-foreground">No retries after first failure.</p>
                                                        </div>
                                                    </div>
                                                    <Switch checked={true} disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )}

                            {currentStep === 5 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold tracking-tight">The Final Check</h2>
                                        <p className="text-muted-foreground">Review your high-fidelity interview setup before deploying to live.</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Card className="border-primary/20 bg-background shadow-glass overflow-hidden">
                                            <div className="bg-primary/5 p-4 border-b border-primary/10 flex justify-between items-center">
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Manifest Summary</span>
                                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">LIVE-READY</Badge>
                                            </div>
                                            <CardContent className="p-6 space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground font-medium">Assessment Title</span>
                                                    <span className="text-sm font-bold">{config.title || "Untitled Assessment"}</span>
                                                </div>
                                                <Separator />
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground font-medium">Question Payload</span>
                                                    <span className="text-sm font-bold">{config.questions.length} Active Challenges</span>
                                                </div>
                                                <Separator />
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground font-medium">AI Intelligence Level</span>
                                                    <div className="flex gap-1">
                                                        <Zap size={14} className={config.aiScoringEnabled ? "text-primary" : "text-muted"} />
                                                        <Zap size={14} className={config.dynamicBranching ? "text-primary" : "text-muted"} />
                                                        <Zap size={14} className={config.biasAwareMode ? "text-primary" : "text-muted"} />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <div className="space-y-4">
                                            <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20 flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                                    <Brain size={20} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold">Predictive Relevance: 94%</p>
                                                    <p className="text-[10px] leading-relaxed text-muted-foreground">Based on current industry standards for {config.category}, this setup ensures high signal-to-noise ratio.</p>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/20 flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                                                    <CheckCircle2 size={20} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold">Compliance Passed</p>
                                                    <p className="text-[10px] leading-relaxed text-muted-foreground">SOC-2 and GDPR patterns detected in governance setup.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dynamic Sidebar */}
                <div className="lg:col-span-4 sticky top-24">
                    <Card className="glass shadow-elegant border-primary/20 overflow-hidden">
                        <div className="h-1 bg-primary/20 w-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                                className="h-full bg-primary shadow-glow transition-all duration-700"
                            />
                        </div>
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={16} className="text-primary" />
                                <span className="text-[10px] font-black tracking-widest uppercase opacity-60">Status Dashboard</span>
                            </div>
                            <CardTitle className="text-xl">Infrastructure Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                {STEPS.map(step => (
                                    <div key={step.id} className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${currentStep >= step.id ? "bg-primary shadow-glow scale-125" : "bg-muted"}`} />
                                        <span className={`text-xs font-bold transition-colors ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>{step.title}</span>
                                        {currentStep > step.id && <CheckCircle2 size={12} className="text-primary ml-auto" />}
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Button
                                    className="w-full h-12 text-sm font-bold shadow-glow gradient-primary border-0 transition-all duration-300 hover:scale-[1.02]"
                                    onClick={currentStep === 5 ? () => onComplete(config) : nextStep}
                                >
                                    {currentStep === 5 ? "Deploy Assessment" : "Move to Next Stage"}
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                                {currentStep > 1 && (
                                    <Button
                                        variant="ghost"
                                        className="w-full h-10 text-xs font-bold text-muted-foreground hover:text-foreground"
                                        onClick={prevStep}
                                    >
                                        <ArrowLeft size={14} className="mr-2" /> Previous Step
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-2xl border border-primary/10">
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-xl bg-white/50 backdrop-blur-md flex items-center justify-center text-primary shadow-sm">
                                <Zap size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-bold">Did you know?</p>
                                <p className="text-[10px] text-muted-foreground leading-relaxed">AI-Suggested questions have 3x higher retention signals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
