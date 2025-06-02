import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "lucide-react";

export const InvestigationSkeleton = () => {
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
};
