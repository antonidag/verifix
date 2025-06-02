import React, { useEffect, useState } from "react";
import { Bot, Brain, Lightbulb, Search, FileText, Target, Workflow, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

// Map backend status to step configuration
const STATUS_TO_STEP = {
  created: {
    icon: Brain,
    text: "Initializing investigation...",
    index: 0
  },
  researching: {
    icon: Search,
    text: "Gathering relevant information...",
    index: 1
  },
  writing: {
    icon: FileText,
    text: "Writing detailed report...",
    index: 2
  },
  processing: {
    icon: Target,
    text: "Analyzing problem context...",
    index: 3
  },
  analyzing: {
    icon: Bot,
    text: "Validating solution...",
    index: 4
  },
  storing: {
    icon: Workflow,
    text: "Finalizing...",
    index: 5
  },
  ready: {
    icon: CheckCircle2,
    text: "Investigation complete",
    index: 6
  },
  error: {
    icon: Lightbulb,
    text: "Investigation error",
    index: -1
  }
};

const INVESTIGATION_STEPS = [
  {
    icon: Brain,
    text: "Initializing investigation",
  },
  {
    icon: Search,
    text: "Gathering relevant information",
  },
  {
    icon: FileText,
    text: "Writing detailed report",
  },
  {
    icon: Target,
    text: "Analyzing problem context",
  },
  {
    icon: Bot,
    text: "Validating solution",
  },
  {
    icon: Workflow,
    text: "Finalizing",
  },
  {
    icon: CheckCircle2,
    text: "Investigation complete",
  }
];

interface InvestigationSkeletonProps {
  solutionId?: string;
  onComplete?: (solution: any) => void;
  onError?: (error: string) => void;
}

interface StatusEventData {
  status: string;
  message?: string;
  solution?: any;
  event?: string;
}

export const InvestigationSkeleton: React.FC<InvestigationSkeletonProps> = ({
  solutionId,
  onComplete,
  onError
}) => {
  const [currentStatus, setCurrentStatus] = useState<string>("created");
  const [progressMessage, setProgressMessage] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!solutionId) return;

    const eventSource = new EventSource(`/api/solutions/${solutionId}/status`);

    // Handle all messages
    eventSource.onmessage = (event: MessageEvent) => {
      try {
        const data: StatusEventData = JSON.parse(event.data);
        
        // Update status and message
        setCurrentStatus(data.status);
        setProgressMessage(data.message || "");

        // Calculate progress based on current step index
        const currentStep = STATUS_TO_STEP[data.status];
        if (currentStep) {
          const progressValue = (currentStep.index / (INVESTIGATION_STEPS.length - 1)) * 100;
          setProgress(progressValue);
        }

        // Handle specific events
        if (data.event === 'solution_ready' || data.status === 'ready') {
          setProgress(100);
          if (onComplete && data.solution) {
            onComplete(data.solution);
          }
          eventSource.close();
        }
      } catch (err) {
        console.error('Error parsing SSE message:', err);
      }
    };

    // Handle connection errors
    eventSource.onerror = () => {
      const errorMessage = "Error connecting to status updates";
      setError(errorMessage);
      setCurrentStatus('error');
      if (onError) onError(errorMessage);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [solutionId, onComplete, onError]);

  if (!solutionId) {
    return (
      <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-orange-50 rounded-lg border border-slate-200 animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-orange-100 p-2 rounded-full animate-pulse">
            <Bot className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-orange-600 animate-pulse" />
            <span className="text-sm text-slate-600">
              AI is investigating your problem...
            </span>
          </div>

          <div className="bg-white/70 p-4 rounded-lg animate-pulse">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-8 w-24 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const currentStep = STATUS_TO_STEP[currentStatus];
  const Icon = currentStep?.icon || Brain;

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-orange-50 rounded-lg border border-slate-200">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Icon className="w-5 h-5 text-orange-600 animate-pulse" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">
                {error ? "Investigation Error" : "Investigation in Progress"}
              </h3>
              <p className="text-sm text-slate-600">
                {error || progressMessage || currentStep?.text}
              </p>
            </div>
          </div>
          <span className="text-sm font-medium text-orange-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INVESTIGATION_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const currentStepIndex = STATUS_TO_STEP[currentStatus]?.index ?? 0;
            const isComplete = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isError = currentStatus === "error";

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isError
                    ? index === currentStepIndex
                      ? "bg-red-50 border border-red-200"
                      : "text-slate-400"
                    : isCurrent
                    ? "bg-orange-50 border border-orange-200"
                    : isComplete
                    ? "text-slate-600 bg-slate-50"
                    : "text-slate-400"
                }`}
              >
                <StepIcon
                  className={`w-4 h-4 ${
                    isError
                      ? index === currentStepIndex
                        ? "text-red-600"
                        : "text-slate-400"
                      : isCurrent
                      ? "text-orange-600 animate-pulse"
                      : isComplete
                      ? "text-green-600"
                      : "text-slate-400"
                  }`}
                />
                <span className="text-sm">{step.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
