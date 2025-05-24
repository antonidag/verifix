import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Solution } from "@/data/solutions";
import { copySolutionToClipboard, formatSolutionSteps } from "@/lib/utils";
import { CheckCircle, AlertCircle, ExternalLink, Copy } from "lucide-react";

type KnowledgeDialogProps = {
  solution: Solution;
};

export const KnowledgeDialog = ({ solution }: KnowledgeDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
        View Details
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <div className="flex items-center justify-between mb-2">
          <DialogTitle className="text-xl">{solution.title}</DialogTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {solution.id}
            </Badge>
            {solution.status === "verified" ? (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            ) : (
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                <AlertCircle className="w-3 h-3 mr-1" />
                Pending Review
              </Badge>
            )}
          </div>
        </div>
        <DialogDescription className="text-base">{solution.description}</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-800">Solution Steps</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copySolutionToClipboard(solution)}
              className="text-slate-600"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700">
            {formatSolutionSteps(solution.steps)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Statistics</h4>
            <div className="space-y-1 text-sm text-slate-600">
              <div>Confidence: {Math.round(solution.confidence * 100)}%</div>
              <div>Usage Count: {solution.usageCount} times</div>
              <div>Last Used: {solution.lastUsed}</div>
              <div>Created: {new Date(solution.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-1">
              {solution.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {solution.documentationLinks && solution.documentationLinks.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Documentation Links</h4>
            <div className="space-y-2">
              {solution.documentationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  </Dialog>
);
