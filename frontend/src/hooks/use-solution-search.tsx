import { Bot } from "lucide-react";
import { useState } from "react";

import {
  AskRequestModel,
  AskResponseModel,
  SolutionModel,
  SolutionPartModel,
} from "@/api-client";
import { api } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export interface SolutionWithMatch extends SolutionModel {
  matchScore: string;
}

export const useSolutionSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [solutions, setSolutions] = useState<SolutionWithMatch[]>([]);
  const [searchResults, setSearchResults] = useState<AskResponseModel>(null);

  const handleSearch = async (problem: string, imageData: string | null) => {
    if (!problem.trim() && !imageData) return;

    setIsSearching(true);
    setSolutions([]);

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
            >
              <Bot className="mr-2 h-4 w-4" />
              Start Investigation
            </Button>
          ),
        });
        return;
      }

      setSearchResults(data);

      const solutions = await Promise.all(
        data.matches.map(async (match) => {
          const foundSolution = await api.default.getSolution(
            match.solution_id
          );
          if (foundSolution) {
            return {
              ...foundSolution,
              matchScore: match.score.toString(),
            };
          }
          return null;
        })
      );

      setSolutions(solutions.filter((sol) => sol !== null));
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

    toast({
      title: "Investigation Started",
      description: "We'll notify you when the results are ready.",
    });
    try {
      const askRequest: AskRequestModel = {
        question: problem.trim(),
        solution: {} as SolutionPartModel,
        image_data: imageData,
      };

      const response = await api.default.investigate(askRequest);

      // Start polling for results
      if (response.solution?.id) {
        await pollInvestigationResults(response.solution.id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start investigation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const pollInvestigationResults = async (solutionId: string) => {
    try {
      const solution = await api.default.getSolution(solutionId);
      if (solution.text && solution.text !== "") {
        setSolutions([
          {
            ...solution,
            matchScore: "1.0", // AI-generated solutions get full confidence
          },
        ]);
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
    setSolutions([]);
    setSearchResults(null);
  };

  return {
    isSearching,
    solutions,
    searchResults,
    handleSearch,
    handleInvestigate,
    clearSearch,
  } as const;
};
