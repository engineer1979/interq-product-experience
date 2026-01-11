import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
}

export function AssessmentProgress({ 
  currentQuestion, 
  totalQuestions, 
  answeredQuestions 
}: AssessmentProgressProps) {
  const percentage = (currentQuestion / totalQuestions) * 100;

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{answeredQuestions} answered</span>
        </div>
      </div>
      
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div 
          className="bg-primary h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center gap-1 mt-3">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-1 rounded-full transition-colors ${
              index < currentQuestion 
                ? 'bg-primary' 
                : index === currentQuestion - 1
                ? 'bg-primary/60'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </Card>
  );
}