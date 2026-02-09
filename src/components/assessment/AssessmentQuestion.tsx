import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Video, Code } from "lucide-react";

interface AssessmentQuestionProps {
  question: {
    id: string;
    question_text: string;
    question_type?: string;
    options?: any;
    points: number;
  };
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
  questionNumber: number;
}

export function AssessmentQuestion({ 
  question, 
  selectedAnswer, 
  onAnswerChange,
  questionNumber 
}: AssessmentQuestionProps) {
  
  const getOptions = (): string[] => {
    if (Array.isArray(question.options)) return question.options;
    if (typeof question.options === 'string') {
        try { return JSON.parse(question.options); } catch { return []; }
    }
    return [];
  };

  const getStarterCode = (): string => {
    if (typeof question.options === 'string') {
        try { const parsed = JSON.parse(question.options); return parsed?.starterCode || ''; } catch { return ''; }
    }
    if (question.options && typeof question.options === 'object' && !Array.isArray(question.options)) {
        return (question.options as any)?.starterCode || '';
    }
    return '';
  };

  const renderQuestionInput = () => {
    const type = question.question_type || 'mcq';

    switch (type) {
      case 'text':
        return <Textarea placeholder="Type your answer here..." className="min-h-[150px]" value={selectedAnswer || ''} onChange={(e) => onAnswerChange(e.target.value)} />;
      case 'code':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded"><Code className="w-4 h-4" /><span>Write your code below</span></div>
            <Textarea placeholder="// Write your code here..." className="min-h-[300px] font-mono" value={selectedAnswer !== undefined ? selectedAnswer : getStarterCode()} onChange={(e) => onAnswerChange(e.target.value)} />
          </div>
        );
      case 'video':
        return (
          <div className="space-y-4">
            <Alert><Video className="h-4 w-4" /><AlertDescription>Video recording is simulated. Please describe what you would say.</AlertDescription></Alert>
            <Textarea placeholder="[Simulation] Describe your video response..." className="min-h-[150px]" value={selectedAnswer || ''} onChange={(e) => onAnswerChange(e.target.value)} />
          </div>
        );
      case 'mcq':
      default: {
        const options = getOptions();
        return (
          <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange} className="space-y-3">
            {options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value={option} id={`option-${question.id}-${index}`} />
                <Label htmlFor={`option-${question.id}-${index}`} className="flex-1 cursor-pointer font-normal">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      }
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline">Question {questionNumber}</Badge>
            <Badge>{question.points} points</Badge>
            {question.question_type && <Badge variant="secondary" className="uppercase text-xs">{question.question_type}</Badge>}
          </div>
          <h3 className="text-lg font-semibold mb-4 whitespace-pre-wrap">{question.question_text}</h3>
        </div>
      </div>
      {renderQuestionInput()}
    </Card>
  );
}
