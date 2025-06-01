import {
  Bot,
  Database,
  Eye,
  FileText,
  Loader2,
  Mic,
  Search,
  ThumbsDown,
  ThumbsUp,
  Upload,
  X,
} from "lucide-react";
import React, { useState } from "react";
import Markdown from "react-markdown";

import {
  AskRequestModel,
  AskResponseModel,
  SolutionModel,
  SolutionPartModel,
} from "@/api-client";
import { api } from "@/api/apiClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { KnowledgeDialog } from "./KnowledgeDialog";
import { SearchSkeleton } from "./SearchSkeleton";

// Helper function to add match score to the SolutionModel type
interface SolutionWithMatch extends SolutionModel {
  matchScore: string;
}

// Add a helper function to safely convert match score to percentage
const getMatchScorePercentage = (score: string): number => {
  const parsed = parseFloat(score);
  return isNaN(parsed) ? 0 : Math.floor(parsed * 100);
};

// Helper function to get gradient colors based on match score
const getMatchGradient = (score: string): string => {
  const percentage = getMatchScorePercentage(score);
  if (percentage >= 80) {
    return "from-green-50 to-blue-50";
  } else if (percentage >= 60) {
    return "from-green-50 to-emerald-50";
  } else if (percentage >= 40) {
    return "from-yellow-50 to-amber-50";
  } else if (percentage >= 20) {
    return "from-orange-50 to-amber-50";
  } else {
    return "from-red-50 to-orange-50";
  }
};

// Helper function to get icon background color based on match score
const getIconBgColor = (score: string): string => {
  const percentage = getMatchScorePercentage(score);
  if (percentage >= 80) {
    return "bg-green-100";
  } else if (percentage >= 60) {
    return "bg-emerald-100";
  } else if (percentage >= 40) {
    return "bg-yellow-100";
  } else if (percentage >= 20) {
    return "bg-orange-100";
  } else {
    return "bg-red-100";
  }
};

// Helper function to get icon color based on match score
const getIconColor = (score: string): string => {
  const percentage = getMatchScorePercentage(score);
  if (percentage >= 80) {
    return "text-green-600";
  } else if (percentage >= 60) {
    return "text-emerald-600";
  } else if (percentage >= 40) {
    return "text-yellow-600";
  } else if (percentage >= 20) {
    return "text-orange-600";
  } else {
    return "text-red-600";
  }
};

// Helper function to get badge colors based on match score
const getBadgeColors = (score: string): string => {
  const percentage = getMatchScorePercentage(score);
  if (percentage >= 80) {
    return "bg-green-100 text-green-700";
  } else if (percentage >= 60) {
    return "bg-emerald-100 text-emerald-700";
  } else if (percentage >= 40) {
    return "bg-yellow-100 text-yellow-700";
  } else if (percentage >= 20) {
    return "bg-orange-100 text-orange-700";
  } else {
    return "bg-red-100 text-red-700";
  }
};

export const ProblemSubmission = () => {
  const [problem, setProblem] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [solution, setSolution] = useState<SolutionWithMatch | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<{
    [key: string]: "helpful" | "not-helpful" | null;
  }>({});
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [investigationId, setInvestigationId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<AskResponseModel>(null);
  const [solutionsList, setSolutionsList] = useState<SolutionModel[]>([]);

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setProblem("PLC error 4096 on line 3 - conveyor belt stopped");
      setIsListening(false);
      toast({
        title: "Voice input captured",
        description: "Problem description has been transcribed",
      });
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages((prev) => [...prev, ...files]);
    toast({
      title: "Images uploaded",
      description: `${files.length} image(s) added to your problem description`,
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!problem.trim() && uploadedImages.length === 0) return;

    setIsSearching(true);
    setSolution(null);
    setInvestigationId(null);

    try {
      // Convert first image to base64 if available
      let imageData = null;
      if (uploadedImages.length > 0) {
        const file = uploadedImages[0];
        const reader = new FileReader();
        imageData = await new Promise((resolve) => {
          reader.onloadend = () => {
            const base64String = reader.result as string;
            // Remove data URL prefix
            resolve(base64String.split(",")[1]);
          };
          reader.readAsDataURL(file);
        });
      }

      const askRequest: AskRequestModel = {
        question: problem.trim(),
        solution: {} as SolutionPartModel,
        image_data: imageData,
      };

      const data = await api.default.ask(askRequest);
      if (!data || !data.matches || data.matches.length === 0) {
        toast({
          title: "No solution found",
          description: "Would you like to start an AI investigation?",
          action: (
            <Button
              variant="secondary"
              onClick={() => handleInvestigate()}
              disabled={isInvestigating}
            >
              {isInvestigating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Investigating...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Start Investigation
                </>
              )}
            </Button>
          ),
        });
        return;
      }

      const solutions = await api.default.listSolutions();
      setSearchResults(data);
      setSolutionsList(solutions);

      // Process all matches
      for (const match of data.matches) {
        const foundSolution = solutions.find((s) => s.id === match.solution_id);
        if (foundSolution) {
          setSolution({
            ...foundSolution,
            matchScore: match.score.toString(),
          });
          break; // Keep existing behavior of showing first match first
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for solutions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleInvestigate = async () => {
    if (!problem.trim() && uploadedImages.length === 0) return;

    setIsInvestigating(true);
    try {
      // Convert first image to base64 if available
      let imageData = null;
      if (uploadedImages.length > 0) {
        const file = uploadedImages[0];
        const reader = new FileReader();
        imageData = await new Promise((resolve) => {
          reader.onloadend = () => {
            const base64String = reader.result as string;
            // Remove data URL prefix
            resolve(base64String.split(",")[1]);
          };
          reader.readAsDataURL(file);
        });
      }

      const askRequest: AskRequestModel = {
        question: problem.trim(),
        solution: {} as SolutionPartModel,
        image_data: imageData,
      };

      const response = await api.default.investigate(askRequest);
      setInvestigationId(response.solution?.id || null);

      toast({
        title: "Investigation Started",
        description: "We'll notify you when the results are ready.",
      });

      // Start polling for results
      if (response.solution?.id) {
        pollInvestigationResults(response.solution.id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start investigation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsInvestigating(false);
    }
  };

  const pollInvestigationResults = async (solutionId: string) => {
    try {
      const solution = await api.default.getSolution(solutionId);
      if (solution.text && solution.text !== "") {
        setSolution({
          ...solution,
          matchScore: "1.0", // AI-generated solutions get full confidence
        });
        setInvestigationId(null);
        toast({
          title: "Investigation Complete",
          description: "We've found a potential solution for your problem.",
        });
      } else {
        // If solution is not ready, poll again in 5 seconds
        setTimeout(() => pollInvestigationResults(solutionId), 5000);
      }
    } catch (error) {
      console.error("Error polling for results:", error);
    }
  };

  const clearForm = () => {
    setProblem("");
    setUploadedImages([]);
    setSolution(null);
    setSearchResults(null);
    setSolutionsList([]);
  };

  const handleViewDetails = () => {
    setIsDetailModalOpen(true);
  };

  const handleFeedback = (
    solutionId: string | null,
    type: "helpful" | "not-helpful"
  ) => {
    if (solutionId === null || solutionId === undefined) return;

    setFeedback((prev) => ({ ...prev, [solutionId.toString()]: type }));
    toast({
      title: "Feedback submitted",
      description: `Thank you for rating this solution as ${
        type === "helpful" ? "helpful" : "not helpful"
      }`,
    });
  };

  return (
    <section id="submit" className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Troubleshooting Hub
          </h2>
          <p className="text-slate-600">
            Search for solutions or contribute to our knowledge base
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Problem Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe the problem: alarms, error codes, symptoms..."
                className="min-h-24 pr-12 border-slate-300 focus:border-blue-500"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 ${
                  isListening
                    ? "text-red-500 animate-pulse"
                    : "text-slate-400 hover:text-blue-500"
                }`}
                onClick={handleVoiceInput}
              >
                <Mic className="w-5 h-5" />
              </Button>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">
                  Add Images
                </span>
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">
                      Click to upload images or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <p className="text-xs text-slate-500 mt-1 truncate">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSubmit}
                disabled={
                  (!problem.trim() && uploadedImages.length === 0) ||
                  isSearching
                }
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 w-4 h-4" />
                    Find Solution
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="border-slate-300"
                onClick={clearForm}
              >
                Clear
              </Button>
            </div>

            {/* Search Loading Skeleton */}
            {isSearching && <SearchSkeleton />}

            {/* Knowledge Base Results */}
            {searchResults?.matches?.map((match, index) => {
              const matchedSolution = solutionsList?.find(
                (s) => s.id === match.solution_id
              );
              if (!matchedSolution) return null;

              const gradientClass = getMatchGradient(match.score.toString());
              const iconBgClass = getIconBgColor(match.score.toString());
              const iconColorClass = getIconColor(match.score.toString());

              return (
                <div
                  key={index}
                  className={`mt-8 p-6 bg-gradient-to-r ${gradientClass} rounded-lg border border-green-200 animate-scale-in`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${iconBgClass} p-2 rounded-full`}>
                      <Database className={`w-6 h-6 ${iconColorClass}`} />
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
                          {getMatchScorePercentage(match.score.toString())}%
                          match
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700"
                        >
                          {matchedSolution.confidence || "0"}% confidence
                        </Badge>
                        {matchedSolution.verified && (
                          <Badge className="bg-blue-100 text-blue-700">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-700 mb-4">
                        <Markdown>{matchedSolution.description}</Markdown>
                      </p>

                      {/* Solution Steps Preview */}
                      <div className="bg-white/70 p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-slate-800 mb-2">
                          Solution Steps:
                        </h4>
                        <ul className="space-y-1">
                          {(matchedSolution.solution_steps || [])
                            .slice(0, 3)
                            .map((step, stepIndex) => (
                              <li
                                key={stepIndex}
                                className="text-sm text-slate-700 flex items-start gap-2"
                              >
                                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
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
                            onClick={() => {
                              setSolution({
                                ...matchedSolution,
                                matchScore: match.score.toString(),
                              });
                              handleViewDetails();
                            }}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>

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
                              feedback[matchedSolution.id.toString()] ===
                                "helpful"
                                ? "bg-green-50 text-green-600"
                                : ""
                            }`}
                            onClick={() =>
                              handleFeedback(matchedSolution.id, "helpful")
                            }
                          >
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Yes
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`border-slate-200 ${
                              matchedSolution.id !== null &&
                              feedback[matchedSolution.id.toString()] ===
                                "not-helpful"
                                ? "bg-red-50 text-red-600"
                                : ""
                            }`}
                            onClick={() =>
                              handleFeedback(matchedSolution.id, "not-helpful")
                            }
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
            })}

            <div className="text-center">
              {solution && (
                <>
                  <div className="text-3xl font-bold text-blue-600">1</div>
                  <div className="text-sm text-blue-700">Match Found</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <KnowledgeDialog
          solution={solution}
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
        />
      </div>
    </section>
  );
};
