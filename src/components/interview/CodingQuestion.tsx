import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, Square, RotateCcw, Save, Code, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [showHint, setShowHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const getLanguageOptions = () => {
    if (Array.isArray(question.language_options)) return question.language_options;
    if (typeof question.language_options === 'string') {
      try {
        return JSON.parse(question.language_options);
      } catch {
        return ['javascript', 'python'];
      }
    }
    return ['javascript', 'python'];
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
      hasCode: localCode.trim().length > 0
    });
  }, [localCode, selectedLanguage, onCodeChange]);

  const handleCodeChange = (value: string) => {
    setLocalCode(value);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    toast({
      title: "Language Changed",
      description: `Switched to ${language}`,
    });
  };

  const runCode = async () => {
    if (!localCode.trim()) {
      toast({
        title: "No Code",
        description: "Please write some code before running",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setOutput("Running...");

    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock output based on simple validation
      const hasFunction = localCode.includes('function') || localCode.includes('def');
      const hasReturn = localCode.includes('return');
      
      if (hasFunction && hasReturn) {
        setOutput("✅ Code executed successfully!\n\nYour solution looks good. The function structure is correct.");
      } else if (hasFunction) {
        setOutput("⚠️  Code executed with warnings:\n\nConsider adding a return statement to your function.");
      } else {
        setOutput("ℹ️  Code executed:\n\nBasic structure validated. Consider wrapping your logic in a function.");
      }
    } catch (error) {
      setOutput("❌ Error executing code. Please check your syntax.");
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setLocalCode(question.starter_code || "");
    setOutput("");
    toast({
      title: "Code Reset",
      description: "Starter code restored",
    });
  };

  const formatCode = () => {
    // Basic formatting - add proper indentation
    const lines = localCode.split('\n');
    let formatted = '';
    let indent = 0;
    
    for (let line of lines) {
      line = line.trim();
      if (line.includes('}')) indent = Math.max(0, indent - 1);
      formatted += '  '.repeat(indent) + line + '\n';
      if (line.includes('{')) indent++;
    }
    
    setLocalCode(formatted.trim());
    toast({
      title: "Code Formatted",
      description: "Basic formatting applied",
    });
  };

  const hasStarterCode = question.starter_code && question.starter_code.trim().length > 0;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold leading-relaxed">{question.question_text}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">{question.difficulty}</Badge>
              <Badge className="text-xs">{question.points} points</Badge>
              {question.time_limit_minutes && (
                <Badge variant="secondary" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {question.time_limit_minutes} min
                </Badge>
              )}
              {hasCode && (
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Code written
                </Badge>
              )}
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Language:</span>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang: string) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Code Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Your Solution</span>
            </div>
            
            <div className="flex gap-2">
              {hasStarterCode && (
                <Button variant="outline" size="sm" onClick={resetCode}>
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={formatCode}>
                Format
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={runCode}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Running
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 mr-1" />
                    Run
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <Textarea
            ref={textareaRef}
            value={localCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            placeholder="Write your code here..."
            className="min-h-[300px] font-mono text-sm bg-muted/50 resize-vertical"
            style={{ fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace' }}
          />
        </div>

        {/* Output Section */}
        {output && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Output</span>
              <Badge variant="outline" className="text-xs">Console</Badge>
            </div>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
              {output}
            </div>
          </motion.div>
        )}

        {/* Test Cases */}
        {question.test_cases && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Test Cases</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? 'Hide' : 'Show'} Hint
              </Button>
            </div>
            
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-muted p-4 rounded-lg"
                >
                  <p className="text-sm text-muted-foreground">
                    Consider edge cases and validate your input. Test your function with different scenarios.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Validation hint */}
        {!hasCode && (
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please write your code solution before proceeding to the next question.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
}