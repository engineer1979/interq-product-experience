import React from "react";
import { motion } from "framer-motion";
import { Search, FileText, Play, CheckCircle, Award, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const STEPS: Step[] = [
  { id: 1, title: "Select", subtitle: "Choose an assessment", icon: Search },
  { id: 2, title: "Instructions", subtitle: "Read guidelines", icon: FileText },
  { id: 3, title: "Start", subtitle: "Begin immediately", icon: Play },
  { id: 4, title: "Complete", subtitle: "Submit answers", icon: CheckCircle },
  { id: 5, title: "Results", subtitle: "Get feedback", icon: Award },
];

interface WorkflowStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  canProceedToStep: (step: number) => boolean;
}

type StepState = "completed" | "active" | "disabled";

function getStepState(stepId: number, currentStep: number): StepState {
  if (stepId < currentStep) return "completed";
  if (stepId === currentStep) return "active";
  return "disabled";
}

export function WorkflowStepper({ currentStep, onStepClick, canProceedToStep }: WorkflowStepperProps) {
  return (
    <TooltipProvider delayDuration={200}>
      {/* Desktop (≥768px) */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Connector line */}
          <div className="absolute top-7 left-[10%] right-[10%] h-0.5 bg-border z-0" />
          <div
            className="absolute top-7 left-[10%] h-0.5 bg-primary z-[1] transition-all duration-500"
            style={{ width: `${Math.max(0, ((currentStep - 1) / (STEPS.length - 1)) * 80)}%` }}
          />

          {STEPS.map((step) => {
            const state = getStepState(step.id, currentStep);
            const Icon = step.icon;
            const clickable = state === "completed" || state === "active";

            return (
              <Tooltip key={step.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => clickable && onStepClick(step.id)}
                    disabled={state === "disabled" && !canProceedToStep(step.id)}
                    aria-current={state === "active" ? "step" : undefined}
                    aria-disabled={state === "disabled"}
                    className={cn(
                      "relative z-10 flex flex-col items-center gap-2 group outline-none min-w-[100px] transition-all duration-200",
                      clickable && "cursor-pointer",
                      state === "disabled" && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <motion.div
                      whileHover={clickable ? { scale: 1.08 } : {}}
                      whileTap={clickable ? { scale: 0.96 } : {}}
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm",
                        state === "active" && "bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-4 ring-primary/10",
                        state === "completed" && "bg-primary/10 text-primary border-2 border-primary/30",
                        state === "disabled" && "bg-muted text-muted-foreground border border-border"
                      )}
                    >
                      {state === "completed" ? (
                        <Check className="w-6 h-6" strokeWidth={3} />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </motion.div>
                    <div className="text-center">
                      <p className={cn(
                        "text-sm font-bold tracking-tight",
                        state === "active" && "text-primary",
                        state === "completed" && "text-foreground",
                        state === "disabled" && "text-muted-foreground"
                      )}>
                        {step.id}. {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.subtitle}</p>
                    </div>
                    {/* Focus ring */}
                    <span className="absolute -inset-2 rounded-2xl ring-2 ring-primary/0 group-focus-visible:ring-primary/50 transition-all" />
                  </button>
                </TooltipTrigger>
                {state === "disabled" && (
                  <TooltipContent>
                    <p>Complete previous step first</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Mobile (<768px) — horizontal scroll stepper */}
      <div className="md:hidden">
        <div className="flex gap-1 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none -mx-1 px-1">
          {STEPS.map((step) => {
            const state = getStepState(step.id, currentStep);
            const Icon = step.icon;
            const clickable = state === "completed" || state === "active";

            return (
              <button
                key={step.id}
                onClick={() => clickable && onStepClick(step.id)}
                disabled={state === "disabled" && !canProceedToStep(step.id)}
                aria-current={state === "active" ? "step" : undefined}
                aria-disabled={state === "disabled"}
                className={cn(
                  "snap-center flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200 min-w-[44px] outline-none",
                  state === "active" && "bg-primary text-primary-foreground shadow-md",
                  state === "completed" && "bg-primary/10 text-primary",
                  state === "disabled" && "bg-muted/50 text-muted-foreground opacity-60 cursor-not-allowed",
                  clickable && state !== "active" && "hover:bg-primary/15"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  state === "active" && "bg-primary-foreground/20",
                  state === "completed" && "bg-primary/15",
                  state === "disabled" && "bg-muted"
                )}>
                  {state === "completed" ? (
                    <Check className="w-4 h-4" strokeWidth={3} />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className={cn(
                  "text-left whitespace-nowrap",
                  state === "active" ? "block" : "hidden sm:block"
                )}>
                  <p className="text-xs font-bold leading-tight">{step.title}</p>
                  {state === "active" && (
                    <p className="text-[10px] opacity-80 leading-tight">{step.subtitle}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
