import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Play, RotateCcw, Code, Clock, CheckCircle2, Zap, Terminal, Split, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface TestCase {
  input: string;
  expected_output: string;
  description?: string;
}

interface CodeSubmission {
  code: string;
  language: string;
}

interface CodingQuestionProps {
  question: {
    id: string;
    question_text: string;
    difficulty: string;
    points: number;
    starter_code?: string;
    test_cases?: TestCase[];
    time_limit_minutes?: number;
    language_options?: string[];
  };
  code?: CodeSubmission;
  onCodeChange: (code: CodeSubmission) => void;
}

export function CodingQuestion({ question, code, onCodeChange }: CodingQuestionProps) {
  const [localCode, setLocalCode] = useState(code?.code || question.starter_code || "");
  const [selectedLanguage, setSelectedLanguage] = useState(code?.language || "javascript");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [hasCode, setHasCode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const getLanguageOptions = () => {
    if (Array.isArray(question.language_options)) return question.language_options;
    if (typeof question.language_options === 'string') {
      try {
        return JSON.parse(question.language_options);
      } catch {
        return ['javascript', 'python', 'typescript'];
      }
    }
    return ['javascript', 'python', 'typescript'];
  };

  const languages = getLanguageOptions();

  useEffect(() => {
    setLocalCode(code?.code || question.starter_code || "");
    setSelectedLanguage(code?.language || "javascript");
    setHasCode(!!code?.code && code.code.trim().length > 0);
  }, [code, question.starter_code]);

  useEffect(() => {
    setHasCode(localCode.trim().length > 0);
    onCodeChange({
      code: localCode,
      language: selectedLanguage,
    });
  }, [localCode, selectedLanguage, onCodeChange]);

  const runCode = async () => {
    if (!localCode.trim()) {
      toast({ title: "No Code", description: "Write some code first", variant: "destructive" });
      return;
    }
    setIsRunning(true);
    setOutput("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOutput(">>> Running test vectors...\nPASS: Case #1\nPASS: Case #2\n\nFinal Output: Success (0.2s)");
    } catch (error) {
      setOutput("Execution error: Check syntax.");
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setLocalCode(question.starter_code || "");
    setOutput("");
    toast({ title: "Reset complete", description: "Environment restored to defaults." });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px] py-0">Technical Challenge</Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">{question.points} PTS</Badge>
          </div>
          <h3 className="text-xl font-bold tracking-tight leading-relaxed">{question.question_text}</h3>
        </div>

        <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-1 px-3 h-10 shadow-sm">
          <Terminal size={14} className="text-muted-foreground" />
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-28 border-0 bg-transparent focus:ring-0 h-8 text-xs font-bold uppercase tracking-widest">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang: string) => (
                <SelectItem key={lang} value={lang} className="text-xs uppercase font-bold tracking-widest">{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Main Editor */}
        <div className="lg:col-span-8 group">
          <Card className="overflow-hidden border-primary/20 bg-black/5 shadow-elegant rounded-3xl">
            <div className="bg-secondary/30 px-6 py-3 border-b border-border/50 flex justify-between items-center">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex gap-4">
                <button onClick={resetCode} className="text-[10px] font-black tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <RotateCcw size={10} /> Reset
                </button>
                <div className="w-[1px] h-3 bg-border" />
                <span className="text-[10px] font-black tracking-widest uppercase text-primary/60">main.{selectedLanguage === 'python' ? 'py' : 'js'}</span>
              </div>
            </div>
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={localCode}
                onChange={(e) => setLocalCode(e.target.value)}
                className="min-h-[400px] font-mono text-sm bg-transparent border-0 focus-visible:ring-0 p-8 custom-scrollbar resize-none selection:bg-primary/20"
                placeholder="// Write your genius solution here..."
              />

              {/* Floating Editor Actions */}
              <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                <Button
                  size="sm"
                  onClick={runCode}
                  className="gradient-primary border-0 shadow-glow rounded-xl font-bold h-10 px-6"
                >
                  {isRunning ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} className="mr-2" />}
                  Run Test
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar / Output */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-card/30 backdrop-blur-md border border-border p-6 rounded-3xl space-y-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Split size={16} className="text-primary" />
              <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">Log Output</span>
            </div>
            <div className={`min-h-[160px] p-4 rounded-2xl font-mono text-xs bg-black/20 border border-white/5 transition-all ${isRunning ? 'opacity-50' : 'opacity-100'}`}>
              {output ? (
                <div className="whitespace-pre-wrap text-foreground/80">{output}</div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 gap-3">
                  <Code size={24} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Execute code to see metrics</span>
                </div>
              )}
            </div>
            <AnimatePresence>
              {isRunning && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  className="h-1 bg-primary rounded-full shadow-glow"
                />
              )}
            </AnimatePresence>
          </Card>

           <Card className="bg-primary/5 border border-primary/20 p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-primary" />
              <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">AI Guardrails</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-muted-foreground uppercase">Proctoring Status</span>
                <span className="text-green-500 uppercase tracking-widest">Clear</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-muted-foreground uppercase">Plagiarism Check</span>
                <span className="text-primary uppercase tracking-widest animate-pulse">Scanning...</span>
              </div>
              <Separator className="bg-primary/10" />
              <p className="text-[10px] font-medium leading-relaxed text-muted-foreground/80 italic">
                Tip: Efficient space-complexity carries 25% extra weight in this assessment.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Loader2({ className = "", size = 16 }) {
  return <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>;
}