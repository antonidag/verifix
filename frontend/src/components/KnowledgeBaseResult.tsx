import {
  AlertTriangle,
  Bot,
  Database,
  Eye,
  FileText,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Markdown from "react-markdown";

import { SolutionModel } from "@/api-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getMatchGradient,
  getIconBgColor,
  getIconColor,
  getBadgeColors,
  getMatchScorePercentage,
} from "@/utils/matchScoreUtils";
import { aiDisclaimer } from "@/data/solutions";

interface KnowledgeBaseResultProps {
  match: {
    score: number;
    solution_id: string;
  };
  matchedSolution: SolutionModel;
  feedback: {
    [key: string]: "helpful" | "not-helpful" | null;
  };
  onFeedback: (
    solutionId: string | null,
    type: "helpful" | "not-helpful"
  ) => void;
  onViewDetails: (solution: SolutionModel & { matchScore: string }) => void;
}

export const KnowledgeBaseResult = ({
  match,
  matchedSolution,
  feedback,
  onFeedback,
  onViewDetails,
}: KnowledgeBaseResultProps) => {
  const isAiGenerated = !matchedSolution.verified;

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
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-slate-800">
              {matchedSolution.title}
            </h3>
            <Badge
              variant="secondary"
              className={getBadgeColors(match.score.toString())}
            >
              {getMatchScorePercentage(match.score.toString())}% match
            </Badge>
            <Badge
              variant="secondary"
              className={
                matchedSolution.verified
                  ? "bg-blue-100 text-blue-700"
                  : "bg-orange-100 text-orange-700"
              }
            >
              {matchedSolution.confidence || "0"}% confidence
            </Badge>
            {matchedSolution.verified ? (
              <Badge className="bg-blue-100 text-blue-700">Verified</Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-700"
              >
                AI
              </Badge>
            )}
          </div>
          <p className="text-slate-700 mb-4">
            <Markdown>{matchedSolution.description}</Markdown>
          </p>

          {/* Solution Steps Preview */}
          <div className="bg-white/70 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-slate-800 mb-2">Solution Steps:</h4>
            <ul className="space-y-1">
              {(matchedSolution.solution_steps || [])
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
            </ul>
            <div className="mt-3 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onViewDetails({
                    ...matchedSolution,
                    matchScore: match.score.toString(),
                  })
                }
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
          {matchedSolution.document_link && (
            <div className="bg-white/70 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-slate-800 mb-2">
                Related Documents:
              </h4>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FileText className="w-4 h-4" />
                <a
                  href={matchedSolution.document_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  View Documentation
                </a>
              </div>
            </div>
          )}

          {/* Feedback Section */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Was this solution helpful?
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`border-slate-200 ${
                  matchedSolution.id !== null &&
                  feedback[matchedSolution.id.toString()] === "helpful"
                    ? "bg-green-50 text-green-600"
                    : ""
                }`}
                onClick={() => onFeedback(matchedSolution.id, "helpful")}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                Yes
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`border-slate-200 ${
                  matchedSolution.id !== null &&
                  feedback[matchedSolution.id.toString()] === "not-helpful"
                    ? "bg-red-50 text-red-600"
                    : ""
                }`}
                onClick={() => onFeedback(matchedSolution.id, "not-helpful")}
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                No
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
