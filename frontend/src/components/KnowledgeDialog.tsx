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
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

import { SolutionModel } from "@/api-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteSolution, useVerifySolution } from "@/hooks/use-solution-api";
import { toast } from "@/hooks/use-toast";

interface KnowledgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  solution?: SolutionModel;
  onSolutionUpdate?: (solution: SolutionModel) => void;
  onSolutionDelete?: () => void;
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
  onSolutionDelete,
}: KnowledgeDialogProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { mutateAsync: verifySolution, isPending: isVerifying } =
    useVerifySolution();
  const { mutateAsync: deleteSolution, isPending: isDeleting } =
    useDeleteSolution();

  const handleVerify = async () => {
    if (!solution) return;

    try {
      const verifiedSolution = await verifySolution(solution.id);
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
    }
  };

  const handleDelete = async () => {
    if (!solution) return;

    try {
      await deleteSolution(solution.id);
      toast({
        title: "Solution deleted",
        description: "The solution has been permanently deleted.",
      });
      onSolutionDelete?.();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: "Failed to delete the solution. Please try again.",
        variant: "destructive",
      });
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
            <div className="bg-slate-50/70 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-800">
                  Technical Details
                </h4>
                {solution.manufacturer && (
                  <Badge variant="outline" className="bg-slate-100">
                    {solution.manufacturer}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {solution.machine_name && (
                  <div className="bg-white/70 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Machine Name</div>
                    <div className="font-medium text-slate-800">
                      {solution.machine_name}
                    </div>
                  </div>
                )}
                {solution.machine_type && (
                  <div className="bg-white/70 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Machine Type</div>
                    <div className="font-medium text-slate-800">
                      {solution.machine_type}
                    </div>
                  </div>
                )}
                {solution.component && (
                  <div className="bg-white/70 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Component</div>
                    <div className="font-medium text-slate-800">
                      {solution.component}
                    </div>
                  </div>
                )}
                {solution.model_number && (
                  <div className="bg-white/70 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Model Number</div>
                    <div className="font-medium text-slate-800">
                      {solution.model_number}
                    </div>
                  </div>
                )}
                {solution.error_code && (
                  <div className="bg-white/70 p-3 rounded-lg">
                    <div className="text-sm text-slate-500">Error Code</div>
                    <div className="font-medium text-slate-800">
                      {solution.error_code}
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

            {!solution.verified && (
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
              <Button
                variant="destructive"
                onClick={() => setShowDeleteAlert(true)}
                disabled={isDeleting}
                className="sm:ml-auto"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                {isDeleting ? "Deleting..." : "Delete Solution"}
              </Button>
            </div>
          </div>
        )}

        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                solution and all related data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete Solution
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
};
