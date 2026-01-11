import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface ProctoringWarningProps {
  open: boolean;
  onClose: () => void;
  violations: string[];
}

export function ProctoringWarning({ open, onClose, violations }: ProctoringWarningProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-6 h-6" />
            <AlertDialogTitle>Proctoring Violation Detected</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-2">
            <p>
              Our proctoring system has detected suspicious activity during your assessment.
            </p>
            {violations.length > 0 && (
              <div className="mt-4 space-y-1">
                <p className="font-medium text-foreground">Detected violations:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {violations.slice(-3).map((violation, index) => (
                    <li key={index}>{violation}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-4 text-destructive font-medium">
              Continued violations may result in automatic submission of your assessment.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>I Understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}