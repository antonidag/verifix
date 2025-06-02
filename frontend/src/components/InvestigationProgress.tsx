import React, { useEffect, useState } from "react";
import { Bot, Brain, Lightbulb, Search, FileText, Target, Workflow, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const INVESTIGATION_STEPS = [
  {
    icon: Brain,
    text: "Analyzing problem context...",
    duration: 3000,
  },
  {
    icon: Search,
    text: "Gathering relevant information...",
    duration: 5000,
  },
  {
    icon: Target,
    text: "Identifying potential root causes...",
    duration: 4000, 
  },
  {
    icon: Workflow,
    text: "Planning investigation approach...",
    duration: 10000, 
  },
  {
    icon: Bot,
    text: "Generating AI solution...",
    duration: 20000,
  },
  {
    icon: FileText,
    text: "Writing detailed report...",
    duration: 30000,
  },
  {
    icon: CheckCircle2,
    text: "Validating solution...",
    duration: 40000, 
  },
  {
    icon: Lightbulb,
    text: "Finalizing...",
    duration: 1000
  }
];

const totalDuration = INVESTIGATION_STEPS.reduce((acc, step) => acc + step.duration, 0);

export const InvestigationProgress = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    let accumulatedDuration = 0;
    
    // Calculate the accumulated duration of all previous steps
    for (let i = 0; i < currentStepIndex; i++) {
      accumulatedDuration += INVESTIGATION_STEPS[i].duration;
    }

    const currentStep = INVESTIGATION_STEPS[currentStepIndex];
    const stepInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const stepProgressValue = Math.min((elapsed / currentStep.duration) * 100, 100);
      setStepProgress(stepProgressValue);

      const totalProgressValue = Math.min(
        ((accumulatedDuration + elapsed) / totalDuration) * 100,
        100
      );
      setProgress(totalProgressValue);

      if (stepProgressValue === 100 && currentStepIndex < INVESTIGATION_STEPS.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
        startTime = Date.now();
      }
    }, 50);

    return () => clearInterval(stepInterval);
  }, [currentStepIndex]);

  const currentStep = INVESTIGATION_STEPS[currentStepIndex];
  const Icon = currentStep.icon;

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-lg border border-slate-200">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-100 p-2 rounded-full">
              <Icon className="w-5 h-5 text-cyan-600 animate-pulse" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">Investigation in Progress</h3>
              <p className="text-sm text-slate-600">{currentStep.text}</p>
            </div>
          </div>
          <span className="text-sm font-medium text-cyan-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <Progress value={stepProgress} className="h-1 bg-cyan-100" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INVESTIGATION_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isComplete = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isCurrent
                    ? "bg-cyan-50 border border-cyan-200"
                    : isComplete
                    ? "text-slate-600 bg-slate-50"
                    : "text-slate-400"
                }`}
              >
                <StepIcon
                  className={`w-4 h-4 ${
                    isCurrent
                      ? "text-cyan-600 animate-pulse"
                      : isComplete
                      ? "text-green-600"
                      : "text-slate-400"
                  }`}
                />
                <span className="text-sm">{step.text.replace("...", "")}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 