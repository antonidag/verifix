import {
  AlertTriangle,
  Bot,
  CalendarDays,
  Database,
  Eye,
  FileText,
  Wrench,
} from "lucide-react";
import Markdown from "react-markdown";

import { SolutionModel } from "@/api-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aiDisclaimer } from "@/data/solutions";
import { SolutionWithMatch } from "@/hooks/use-solution-search";
import {
  getBadgeColors,
  getMatchScorePercentage,
} from "@/utils/matchScoreUtils";

interface KnowledgeBaseResultProps {
  solution: SolutionWithMatch;
  onViewDetails: (solution: SolutionModel & { matchScore: string }) => void;
}

export const KnowledgeBaseResult = ({
  solution,
  onViewDetails,
}: KnowledgeBaseResultProps) => {
  const isAiGenerated = !solution.verified;

  const containerClasses = `mt-8 p-6 bg-gradient-to-r ${
    isAiGenerated
      ? "from-orange-50 to-yellow-50 border-orange-200"
      : "from-blue-50 to-green-50 border-green-200"
  } rounded-lg border animate-scale-in`;

  const iconBgClass = isAiGenerated ? "bg-orange-100" : "bg-blue-100";
  const iconColorClass = isAiGenerated ? "text-orange-600" : "text-blue-600";

  return (
    <div className={containerClasses}>
      <div className="flex items-start gap-4">
        <div className={`${iconBgClass} p-2 rounded-full`}>
          {isAiGenerated ? (
            <Bot className={`w-6 h-6 ${iconColorClass}`} />
          ) : (
            <Database className={`w-6 h-6 ${iconColorClass}`} />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap md:flex-nowrap overflow-x-auto">
            <h3 className="font-semibold text-slate-800 min-w-0 truncate flex-shrink">
              {solution.title}
            </h3>
            <div className="flex items-center gap-2 flex-nowrap flex-shrink-0">
              <Badge
                variant="secondary"
                className={getBadgeColors(solution.matchScore)}
              >
                {getMatchScorePercentage(solution.matchScore)}% match
              </Badge>
              <Badge
                variant="secondary"
                className={
                  solution.verified
                    ? "bg-blue-100 text-blue-700"
                    : "bg-orange-100 text-orange-700"
                }
              >
                {solution.confidence || "0"}% confidence
              </Badge>
              {solution.verified ? (
                <Badge className="bg-blue-100 text-blue-700">Verified</Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-700"
                >
                  AI Generated
                </Badge>
              )}
            </div>
          </div>
          {/* Add inventory details if available */}
          {solution.inventory && (
            <div className="bg-slate-50/70 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-800">
                  Component Details
                </h4>
                {solution.inventory.manufacturer && (
                  <Badge variant="outline" className="bg-slate-100">
                    {solution.inventory.manufacturer}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {solution.inventory.component_type && (
                  <div>
                    <span className="text-slate-500">Component Type:</span>
                    <p className="text-slate-800">
                      {solution.inventory.component_type}
                    </p>
                  </div>
                )}
                {solution.inventory.model_name && (
                  <div>
                    <span className="text-slate-500">Model:</span>
                    <p className="text-slate-800">
                      {solution.inventory.model_name}
                    </p>
                  </div>
                )}
                {solution.inventory.firmware_version && (
                  <div>
                    <span className="text-slate-500">Firmware Version:</span>
                    <p className="text-slate-800">
                      {solution.inventory.firmware_version}
                    </p>
                  </div>
                )}
                {solution.inventory.metadata?.machine_type && (
                  <div>
                    <span className="text-slate-500">Machine Type:</span>
                    <p className="text-slate-800">
                      {solution.inventory.metadata.machine_type}
                    </p>
                  </div>
                )}
                {solution.inventory.metadata?.error_code && (
                  <div>
                    <span className="text-slate-500">Error Code:</span>
                    <p className="text-slate-800">
                      {solution.inventory.metadata.error_code}
                    </p>
                  </div>
                )}
                {Object.entries(solution.inventory.specifications || {}).map(
                  ([key, value]) => (
                    <div key={key}>
                      <span className="text-slate-500">{key}:</span>
                      <p className="text-slate-800">{String(value)}</p>
                    </div>
                  )
                )}
              </div>
              {solution.inventory.metadata && (
                <div className="mt-3 text-xs flex items-center gap-3 text-slate-500">
                  {solution.inventory.metadata.installation_date && (
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      <span>
                        Installed:{" "}
                        {new Date(
                          solution.inventory.metadata.installation_date
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {solution.inventory.metadata.last_service && (
                    <div className="flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      <span>
                        Last Service:{" "}
                        {new Date(
                          solution.inventory.metadata.last_service
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <p className="text-slate-700 mb-4">
            <Markdown>{solution.description}</Markdown>
          </p>
          {/* Solution Steps Preview */}
          <div className="bg-white/70 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-slate-800 mb-2">Solution Steps:</h4>
            <ul className="space-y-1">
              {(solution.solution_steps || [])
                .slice(0, 3)
                .map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    className="text-sm text-slate-700 flex items-start gap-2"
                  >
                    <span
                      className={`${
                        isAiGenerated
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      } rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5`}
                    >
                      {stepIndex + 1}
                    </span>
                    {step}
                  </li>
                ))}
              {solution.solution_steps.length > 3 && (
                <li className="text-sm text-slate-500">
                  ... and {solution.solution_steps.length - 3} more steps
                </li>
              )}
            </ul>
            <div className="mt-3 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(solution)}
                className={
                  isAiGenerated
                    ? "text-orange-600 hover:text-orange-700"
                    : "text-blue-600 hover:text-blue-700"
                }
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </div>
          </div>
          {/* AI Disclaimer */}
          {isAiGenerated && (
            <div className="flex items-start gap-2 p-3 bg-orange-100/50 rounded-lg flex-1 mb-4">
              <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-orange-700">
                <strong>AI Disclaimer:</strong> {aiDisclaimer}
              </p>
            </div>
          )}
          {/* Document Link */}
          {solution.document_link && (
            <div className="bg-white/70 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-slate-800 mb-2">
                Related Documents:
              </h4>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FileText className="w-4 h-4" />
                <a
                  href={solution.document_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  View Documentation
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
