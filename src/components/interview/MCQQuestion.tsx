import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface MCQQuestionProps {
  question: {
    id: string;
    question_text: string;
    options?: string[];
    difficulty: string;
    points: number;
  };
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
}

export function MCQQuestion({ question, selectedAnswer, onAnswerChange }: MCQQuestionProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{question.question_text}</h3>
          <div className="flex gap-2">
            <Badge variant={
              question.difficulty === 'easy' ? 'default' :
              question.difficulty === 'medium' ? 'secondary' : 'destructive'
            }>
              {question.difficulty}
            </Badge>
            <Badge variant="outline">{question.points} points</Badge>
          </div>
        </div>
      </div>

      <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange}>
        {Array.isArray(question.options) ? question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label 
              htmlFor={`option-${index}`} 
              className="flex-1 cursor-pointer"
            >
              {option}
            </Label>
          </div>
        )) : null}
      </RadioGroup>
    </Card>
  );
}