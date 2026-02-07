import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface MCQQuestionProps {
  question: {
    id: string;
    question_text: string;
    difficulty: string;
    points: number;
    options?: any;
    correct_answer?: string;
  };
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
}

export function MCQQuestion({ question, selectedAnswer, onAnswerChange }: MCQQuestionProps) {
  const getOptions = () => {
    if (Array.isArray(question.options)) return question.options;
    if (typeof question.options === 'string') {
      try {
        return JSON.parse(question.options);
      } catch {
        return [];
      }
    }
    return [];
  };

  const options = getOptions();
  const hasAnswer = selectedAnswer !== undefined;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Question Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold leading-relaxed">{question.question_text}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">{question.difficulty}</Badge>
              <Badge className="text-xs">{question.points} points</Badge>
              {hasAnswer && (
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Answered
                </Badge>
              )}
            </div>
          </div>
          
          {/* Answer Status */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {hasAnswer ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>Answered</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <span>Not answered</span>
              </div>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="mt-4">
          <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange} className="space-y-3">
            {options.map((option: string, index: number) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer hover:bg-muted/50 ${
                  selectedAnswer === option 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border'
                }`}
              >
                <RadioGroupItem 
                  value={option} 
                  id={`option-${question.id}-${index}`} 
                  className="flex-shrink-0"
                />
                <Label 
                  htmlFor={`option-${question.id}-${index}`} 
                  className="flex-1 cursor-pointer text-sm sm:text-base font-normal leading-relaxed"
                >
                  {option}
                </Label>
                
                {/* Visual indicator for selected option */}
                {selectedAnswer === option && (
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Validation hint */}
        {!hasAnswer && (
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please select an answer before proceeding to the next question.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
}