import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface AssessmentQuestionProps {
  question: {
    id: string;
    question_text: string;
    options: string[];
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
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline">Question {questionNumber}</Badge>
            <Badge>{question.points} points</Badge>
          </div>
          <h3 className="text-lg font-semibold mb-4">{question.question_text}</h3>
        </div>
      </div>

      <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange} className="space-y-3">
        {Array.isArray(question.options) && question.options.map((option, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <RadioGroupItem value={option} id={`option-${question.id}-${index}`} />
            <Label 
              htmlFor={`option-${question.id}-${index}`} 
              className="flex-1 cursor-pointer font-normal"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
}