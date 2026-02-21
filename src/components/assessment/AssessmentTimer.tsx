import { Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AssessmentTimerProps {
  timeRemaining: number;
  totalTime: number;
  onTimeout?: () => void;
}

export function AssessmentTimer({ timeRemaining, totalTime }: AssessmentTimerProps) {
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const percentage = (timeRemaining / totalTime) * 100;
  const isWarning = percentage <= 25;
  const isCritical = percentage <= 10;

  return (
    <Card className={`p-4 ${isCritical ? 'border-destructive' : isWarning ? 'border-orange-500' : ''}`}>
      <div className="flex items-center gap-3">
        <Clock className={`w-5 h-5 ${isCritical ? 'text-destructive' : isWarning ? 'text-orange-500' : 'text-primary'}`} />
        <div>
          <div className="text-sm text-muted-foreground mb-1">Time Remaining</div>
          <div className={`text-2xl font-bold font-mono ${isCritical ? 'text-destructive' : isWarning ? 'text-orange-500' : ''}`}>
            {hours > 0 && `${hours.toString().padStart(2, '0')}:`}
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          {isWarning && (
            <div className="flex items-center gap-1 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              <span>{isCritical ? 'Time almost up!' : 'Less than 25% time left'}</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all ${isCritical ? 'bg-destructive' : isWarning ? 'bg-orange-500' : 'bg-primary'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  );
}