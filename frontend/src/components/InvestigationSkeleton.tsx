import {
  AlertCircle,
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  Database,
  Lightbulb,
  Search,
} from "lucide-react";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { SolutionStatus } from "@/hooks/use-solution-events";

interface StatusInfo {
  icon: React.FC<{ className?: string }>;
  message: string;
}

const statusConfig: Record<SolutionStatus, StatusInfo> = {
  analyzing: {
    icon: Search,
    message:
      "GPTResearcher model is conducting comprehensive research on your problem. Using advanced LLMs to gather and analyze technical documentation and solutions.",
  },
  processing: {
    icon: BookOpen,
    message:
      "Converting research into a structured report using GPT-based text generation. Synthesizing information into a coherent solution narrative.",
  },
  identifying: {
    icon: Lightbulb,
    message:
      "Extracting key solution components using parallel LLM processing. Identifying technical details like error codes, machine specs, and step-by-step procedures.",
  },
  validating: {
    icon: CheckCircle2,
    message:
      "Running confidence scoring algorithm through LLM evaluation. Analyzing solution completeness, technical accuracy, and verification status to generate confidence score (0-100).",
  },
  storing: {
    icon: Database,
    message:
      "Creating vector embeddings for semantic search and storing in database. Updating inventory data and linking solution with machine learning knowledge base.",
  },
  complete: {
    icon: Check,
    message:
      "Solution processing complete. Vector embeddings and inventory data stored successfully.",
  },
  error: {
    icon: AlertCircle,
    message:
      "Error in solution processing pipeline. Check backend logs for detailed error trace.",
  },
};

interface Props {
  status?: SolutionStatus | null;
}

export const InvestigationSkeleton = ({ status = "analyzing" }: Props) => {
  const steps: SolutionStatus[] = [
    "analyzing",
    "processing",
    "identifying",
    "validating",
    "storing",
  ];
  const currentStepIndex = steps.indexOf(status as SolutionStatus);
  const progress =
    status === "complete"
      ? 100
      : status === "error"
      ? 0
      : Math.round(((currentStepIndex + 1) / (steps.length + 1)) * 100);

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-orange-50 rounded-lg border border-slate-200 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-orange-100 p-2 rounded-full animate-pulse">
          <Bot className="w-6 h-6 text-orange-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-lg text-slate-900">
              AI Investigation
            </h3>
            <div className="text-orange-600 text-sm font-medium">
              {progress}%
            </div>
          </div>
          <div className="text-sm text-slate-600 flex items-start gap-2">
            {status && (
              <div className="flex-shrink-0 mt-0.5">
                {(() => {
                  const IconComponent = statusConfig[status].icon;
                  return (
                    <IconComponent
                      className={`w-4 h-4 ${
                        status === "error" ? "text-red-500" : "text-orange-500"
                      } ${
                        status !== "complete" && status !== "error"
                          ? "animate-pulse"
                          : ""
                      }`}
                    />
                  );
                })()}
              </div>
            )}
            <span className="flex-1">
              {statusConfig[status]?.message || "Starting investigation..."}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              status === "error" ? "bg-red-500" : "bg-orange-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="relative mt-2">
          <div className="absolute left-0 right-0 flex">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex-1 flex flex-col items-center ${
                  currentStepIndex >= index ? "text-orange-600 font-medium" : "text-slate-500"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mb-1 ${
                    currentStepIndex > index
                      ? "bg-orange-500"
                      : currentStepIndex === index
                      ? "bg-orange-500 animate-pulse"
                      : "bg-slate-300"
                  }`}
                />
                <span className="text-xs text-center capitalize whitespace-nowrap">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {status !== "complete" && status !== "error" && (
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
        )}
      </div>
    </div>
  );
};
