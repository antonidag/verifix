import { Skeleton } from "@/components/ui/skeleton";
import { Database, Search } from "lucide-react";

export const SearchSkeleton = () => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-100 p-2 rounded-full animate-pulse duration-1000">
          <Search className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-6 w-48 mb-2 animate-pulse duration-1000" />
          <Skeleton className="h-4 w-32 animate-pulse duration-1000" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600 animate-pulse duration-1000" />
          <span className="text-sm text-slate-600">
            Searching knowledge base...
          </span>
        </div>

        <div className="bg-white/70 p-4 rounded-lg animate-pulse duration-1000">
          <Skeleton className="h-4 w-40 mb-3" />
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
              <Skeleton className="h-3 flex-1" />
            </div>
            <div className="flex items-start gap-2">
              <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
              <Skeleton className="h-3 flex-1" />
            </div>
            <div className="flex items-start gap-2">
              <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
              <Skeleton className="h-3 w-3/4" />
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
