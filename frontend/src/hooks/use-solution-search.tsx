import { useState } from "react";
import { api } from "@/api/apiClient";
import { toast } from "@/hooks/use-toast";
import {
  AskRequestModel,
  AskResponseModel,
  SolutionModel,
  SolutionPartModel,
} from "@/api-client";
import { Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SolutionWithMatch extends SolutionModel {
  matchScore: string;
}

export const useSolutionSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [solution, setSolution] = useState<SolutionWithMatch | null>(null);
  const [searchResults, setSearchResults] = useState<AskResponseModel>(null);
  const [solutionsList, setSolutionsList] = useState<SolutionModel[]>([]);

  const handleSearch = async (problem: string, imageData: string | null) => {
    if (!problem.trim() && !imageData) return;

    setIsSearching(true);
    setSolution(null);

    try {
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
              onClick={() => handleInvestigate(problem, imageData)}
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

  const handleInvestigate = async (
    problem: string,
    imageData: string | null
  ) => {
    if (!problem.trim() && !imageData) return;

    setIsInvestigating(true);
    try {
      const askRequest: AskRequestModel = {
        question: problem.trim(),
        solution: {} as SolutionPartModel,
        image_data: imageData,
      };

      const response = await api.default.investigate(askRequest);

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

  const clearSearch = () => {
    setSolution(null);
    setSearchResults(null);
    setSolutionsList([]);
  };

  return {
    isSearching,
    isInvestigating,
    solution,
    searchResults,
    solutionsList,
    handleSearch,
    handleInvestigate,
    clearSearch,
  } as const;
};
