import { AlertTriangle, Bot, Database, Eye, FileText } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

import { SolutionModel } from "@/api-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aiDisclaimer } from "@/data/solutions";
import { Solution } from "@/hooks/use-solution-search";
import {
  getBadgeColors,
  getMatchScorePercentage,
} from "@/utils/matchScoreUtils";

interface KnowledgeBaseResultProps {
  solution: Solution;
  onViewDetails: (solution: SolutionModel & { matchScore: string }) => void;
}

export const KnowledgeBaseResult = ({
  solution,
  onViewDetails,
}: KnowledgeBaseResultProps) => {
  const isAiGenerated = !solution.verified;
  const [isStepsExpanded, setIsStepsExpanded] = useState(false);

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
          <div className="space-y-2 mb-4">
            <h3 className="font-semibold text-slate-800 break-words">
              {solution.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className={`${getBadgeColors(
                  solution.matchScore
                )} whitespace-nowrap`}
              >
                {getMatchScorePercentage(solution.matchScore)}% match
              </Badge>
              <Badge
                variant="secondary"
                className={`whitespace-nowrap ${
                  solution.verified
                    ? "bg-blue-100 text-blue-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {solution.confidence || "0"}% confidence
              </Badge>
              {solution.verified ? (
                <Badge className="bg-blue-100 text-blue-700 whitespace-nowrap">
                  Verified
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-700 whitespace-nowrap"
                >
                  AI Generated
                </Badge>
              )}
            </div>
          </div>

          <div className="text-slate-700 mb-4">
            <Markdown>{solution.description}</Markdown>
          </div>

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

          {/* Technical Details */}
          <Accordion
            type="single"
            collapsible
            className="bg-slate-50/70 rounded-lg mb-3"
          >
            <AccordionItem value="technical" className="border-none">
              <AccordionTrigger className="px-3 py-2 hover:no-underline">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-slate-800 text-sm">
                    Technical Details
                  </h4>
                  {solution.manufacturer && (
                    <Badge variant="outline" className="bg-slate-100 text-xs">
                      {solution.manufacturer}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {solution.machine_name && solution.machine_name !== "N/A" && (
                    <div className="bg-white/70 px-2.5 py-1.5 rounded-md">
                      <div className="text-xs text-slate-500">Machine Name</div>
                      <div className="font-medium text-slate-800 text-sm">
                        {solution.machine_name}
                      </div>
                    </div>
                  )}
                  {solution.machine_type && solution.machine_type !== "N/A" && (
                    <div className="bg-white/70 px-2.5 py-1.5 rounded-md">
                      <div className="text-xs text-slate-500">Machine Type</div>
                      <div className="font-medium text-slate-800 text-sm">
                        {solution.machine_type}
                      </div>
                    </div>
                  )}
                  {solution.component && solution.component !== "N/A" && (
                    <div className="bg-white/70 px-2.5 py-1.5 rounded-md">
                      <div className="text-xs text-slate-500">Component</div>
                      <div className="font-medium text-slate-800 text-sm">
                        {solution.component}
                      </div>
                    </div>
                  )}
                  {solution.model_number && solution.model_number !== "N/A" && (
                    <div className="bg-white/70 px-2.5 py-1.5 rounded-md">
                      <div className="text-xs text-slate-500">Model Number</div>
                      <div className="font-medium text-slate-800 text-sm">
                        {solution.model_number}
                      </div>
                    </div>
                  )}
                  {solution.error_code && solution.error_code !== "N/A" && (
                    <div className="bg-white/70 px-2.5 py-1.5 rounded-md">
                      <div className="text-xs text-slate-500">Error Code</div>
                      <div className="font-medium text-slate-800 text-sm">
                        {solution.error_code}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Operational Details */}
          <Accordion
            type="single"
            collapsible
            className="bg-slate-50/70 rounded-lg mb-3"
          >
            <AccordionItem value="operational" className="border-none">
              <AccordionTrigger className="px-3 py-2 hover:no-underline">
                <h4 className="font-medium text-slate-800 text-sm">
                  Operational Details
                </h4>
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {solution.resolution_type &&
                    solution.resolution_type !== "N/A" && (
                      <div className="bg-white/70 px-2.5 py-1.5 rounded-md">
                        <div className="text-xs text-slate-500">
                          Resolution Type
                        </div>
                        <div className="font-medium text-slate-800 text-sm">
                          {solution.resolution_type}
                        </div>
                      </div>
                    )}
                  {solution.downtime_impact &&
                    solution.downtime_impact !== "N/A" && (
                      <div className="bg-white/70 px-2.5 py-1.5 rounded-md">
                        <div className="text-xs text-slate-500">
                          Downtime Impact
                        </div>
                        <div className="font-medium text-slate-800 text-sm">
                          {solution.downtime_impact}
                        </div>
                      </div>
                    )}
                  {solution.created_at && (
                    <div className="bg-white/70 px-2.5 py-1.5 rounded-md">
                      <div className="text-xs text-slate-500">Created</div>
                      <div className="font-medium text-slate-800 text-sm">
                        {new Date(solution.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  {solution.updated_at && (
                    <div className="bg-white/70 px-2.5 py-1.5 rounded-md">
                      <div className="text-xs text-slate-500">Last Updated</div>
                      <div className="font-medium text-slate-800 text-sm">
                        {new Date(solution.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Document Link */}
          {solution.links?.length > 0 && (
            <div className="bg-white/70 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-slate-800 mb-2">
                Related Resources:
              </h4>
              <div className="space-y-2">
                {solution.links?.slice(0, 2).map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <FileText className="w-4 h-4" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {link.title}
                    </a>
                  </div>
                ))}
                {solution.links?.length > 2 && (
                  <div className="text-xs text-slate-500 mt-1">
                    + {solution.links.length - 2} more resources available
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
