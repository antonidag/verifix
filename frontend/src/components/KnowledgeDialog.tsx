import { DialogDescription } from "@radix-ui/react-dialog";
import {
  AlertTriangle,
  Bot,
  CheckCircle,
  Copy,
  Database,
  ExternalLink,
  Link2,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

import { SolutionModel } from "@/api-client";
import { api } from "@/api/apiClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface KnowledgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  solution?: SolutionModel;
  onSolutionUpdate?: (solution: SolutionModel) => void;
}

const copyToClipboard = (solution: SolutionModel) => {
  navigator.clipboard.writeText(JSON.stringify(solution, null, 2));
  toast({
    title: "Copied to clipboard",
    description: "The solution has been copied to your clipboard",
  });
};

export const KnowledgeDialog = ({
  open,
  onOpenChange,
  solution,
  onSolutionUpdate,
}: KnowledgeDialogProps) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!solution) return;

    setIsVerifying(true);
    try {
      const verifiedSolution = await api.default.verifySolution(solution.id);
      toast({
        title: "Solution verified",
        description: "The solution has been marked as verified.",
      });
      onSolutionUpdate?.(verifiedSolution);
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Failed to verify the solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {solution?.verified ? (
              <Database className="w-5 h-5 text-green-600" />
            ) : (
              <Bot className="w-5 h-5 text-orange-600" />
            )}
            {solution?.title || solution?.text || "Solution Details"}
          </DialogTitle>
        </DialogHeader>

        {solution && (
          <div className="space-y-6">
            {/* Solution badges */}
            <div className="flex flex-wrap gap-2">
              {solution.verified ? (
                <>
                  <Badge className="bg-green-100 text-green-700">
                    Verified Solution
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    {solution.confidence ? solution.confidence : 0}% confidence
                  </Badge>
                </>
              ) : (
                <>
                  <Badge className="bg-orange-100 text-orange-700">
                    AI Generated
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-orange-600 border-orange-300"
                  >
                    {solution.confidence ? solution.confidence : 0}% confidence
                  </Badge>
                </>
              )}
              {solution.tags?.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Technical Details */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">
                Technical Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solution.error_code && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Error Code</div>
                    <div className="font-medium text-slate-800">
                      {solution.error_code}
                    </div>
                  </div>
                )}
                {solution.machine_name && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Machine Name</div>
                    <div className="font-medium text-slate-800">
                      {solution.machine_name}
                    </div>
                  </div>
                )}
                {solution.machine_type && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Machine Type</div>
                    <div className="font-medium text-slate-800">
                      {solution.machine_type}
                    </div>
                  </div>
                )}
                {solution.manufacturer && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Manufacturer</div>
                    <div className="font-medium text-slate-800">
                      {solution.manufacturer}
                    </div>
                  </div>
                )}
                {solution.model_number && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Model Number</div>
                    <div className="font-medium text-slate-800">
                      {solution.model_number}
                    </div>
                  </div>
                )}
                {solution.component && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Component</div>
                    <div className="font-medium text-slate-800">
                      {solution.component}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Operational Details */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">
                Operational Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solution.resolution_type && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">
                      Resolution Type
                    </div>
                    <div className="font-medium text-slate-800">
                      {solution.resolution_type}
                    </div>
                  </div>
                )}
                {solution.downtime_impact && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">
                      Downtime Impact
                    </div>
                    <div className="font-medium text-slate-800">
                      {solution.downtime_impact}
                    </div>
                  </div>
                )}
                {solution.created_at && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Created At</div>
                    <div className="font-medium text-slate-800">
                      {new Date(solution.created_at).toLocaleString()}
                    </div>
                  </div>
                )}
                {solution.updated_at && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Last Updated</div>
                    <div className="font-medium text-slate-800">
                      {new Date(solution.updated_at).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <DialogDescription>
              <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
              <div className="text-slate-700">
                <Markdown>{solution.description}</Markdown>
              </div>
            </DialogDescription>

            {/* Detailed Steps */}
            {solution.solution_steps && solution.solution_steps.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">
                  Solution Steps
                </h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <ol className="space-y-3">
                    {solution.solution_steps.map(
                      (step: string, index: number) => (
                        <li
                          key={index}
                          className="text-slate-700 text-sm flex items-start gap-3"
                        >
                          <span className="bg-blue-100 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="pt-1">{step}</span>
                        </li>
                      )
                    )}
                  </ol>
                </div>
              </div>
            )}

            {/* Links Section */}
            {solution.links?.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">
                  Helpful Links
                </h3>
                <div className="space-y-2">
                  {solution.links.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <Link2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          {link.title}
                        </a>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statistics for verified solutions */}
            {solution.verified ? (
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">
                  Solution Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {solution.confidence ? solution.confidence : 0}%
                    </div>
                    <div className="text-xs text-green-700">Match Rate</div>
                  </div>
                  {/* Note: These statistics might need to be added to the API model if needed */}
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">-</div>
                    <div className="text-xs text-blue-700">Times Used</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">-</div>
                    <div className="text-xs text-purple-700">Success Rate</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600">-</div>
                    <div className="text-xs text-orange-700">User Rating</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-orange-800 mb-1">
                    Important Disclaimer
                  </h4>
                  <p className="text-sm text-orange-700">
                    This solution was generated by AI based on common
                    troubleshooting patterns. Please verify with technical
                    documentation.
                  </p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                onClick={() => copyToClipboard(solution)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Solution
              </Button>
              {!solution.verified && (
                <Button
                  variant="secondary"
                  className="bg-green-100 text-green-700 hover:bg-green-200"
                  onClick={handleVerify}
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  {isVerifying ? "Verifying..." : "Verify Solution"}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
