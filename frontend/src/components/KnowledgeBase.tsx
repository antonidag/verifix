import { Clock, Database, FileText, TrendingUp } from "lucide-react";
import { useState } from "react";

import { SolutionModel } from "@/api-client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecentSolutions } from "@/hooks/use-solution-api";
import Markdown from "react-markdown";
import { KnowledgeDialog } from "./KnowledgeDialog";
import { Button } from "./ui/button";

export const KnowledgeBase = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] =
    useState<SolutionModel | null>(null);

  const { data: solutions = [], isLoading } = useRecentSolutions();

  const handleViewDetails = (solution: SolutionModel) => {
    setSelectedSolution(solution);
    setIsDetailModalOpen(true);
  };

  return (
    <section id="knowledge" className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Knowledge Base
        </h2>
        <p className="text-slate-600">
          Self-learning system that grows smarter over time
        </p>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Latest Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-slate-500">
              Loading solutions...
            </div>
          ) : solutions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No solutions found
            </div>
          ) : (
            solutions.map((solution) => (
              <div
                key={solution.id}
                className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-800">
                    {solution.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
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
                      <Badge className="bg-blue-100 text-blue-700">
                        Verified
                      </Badge>
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
                {solution.tags?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {solution.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="prose-sm prose-slate max-w-none text-sm text-slate-600 mb-3">
                  <Markdown>
                    {(solution.description || "").slice(0, 150) + "..."}
                  </Markdown>
                </div>
                {solution.solution_steps?.length > 0 && (
                  <div className="bg-white/70 p-3 rounded-lg mb-3">
                    <h4 className="text-sm font-medium text-slate-800 mb-2">
                      Solution Steps:
                    </h4>
                    <ul className="space-y-1">
                      {solution.solution_steps
                        .slice(0, 2)
                        .map((step, stepIndex) => (
                          <li
                            key={stepIndex}
                            className="text-sm text-slate-700 flex items-start gap-2"
                          >
                            <span
                              className={`${
                                solution.verified
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-orange-100 text-orange-700"
                              } rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5`}
                            >
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      {solution.solution_steps.length > 2 && (
                        <li className="text-xs text-slate-500">
                          ... and {solution.solution_steps.length - 2} more
                          steps
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {solution.links?.length > 0 && (
                  <div className="bg-white/70 p-3 rounded-lg mb-3">
                    <div className="space-y-1">
                      {solution.links.slice(0, 1).map((link, index) => (
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
                      {solution.links.length > 1 && (
                        <div className="text-xs text-slate-500">
                          + {solution.links.length - 1} more resources
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    {solution.created_at && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(solution.created_at).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => handleViewDetails(solution)}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <KnowledgeDialog
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        solution={selectedSolution}
      />
    </section>
  );
};
