import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between px-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  "text-sm font-semibold",
                  isCompleted && "gradient-primary text-primary-foreground",
                  isCurrent && "bg-primary/20 text-primary border-2 border-primary",
                  !isCompleted && !isCurrent && "bg-secondary text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className={cn(
                "text-xs font-medium hidden sm:block",
                isCurrent ? "text-primary" : "text-muted-foreground"
              )}>
                {labels[index]}
              </span>
            </div>

            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "w-8 sm:w-12 h-0.5 mx-1 transition-colors duration-300",
                  index < currentStep ? "bg-primary" : "bg-secondary"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
