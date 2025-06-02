import { useState } from "react";
import { AskRequestModel, InventoryBase, SolutionModel } from "@/api-client";
import { api } from "@/api/apiClient";
import { toast } from "@/hooks/use-toast";

import { useSolutionEvents } from "./use-solution-events";

export interface SolutionWithMatch extends SolutionModel {
  matchScore: string;
  inventory?: InventoryBase;
}

export const useSolutionSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [solutions, setSolutions] = useState<SolutionWithMatch[]>([]);
  const [solutionId, setSolutionId] = useState<string | null>(null);

  const { status } = useSolutionEvents(solutionId, (solution, inventory) => {
    setSolutionId(null);
    setIsInvestigating(false);
    setSolutions([
      {
        ...solution,
        matchScore: "1.0", // AI-generated solutions get full confidence
        inventory: inventory,
      },
    ]);
  });

  const handleSearch = async (problem: string, imageData: string | null) => {
    if (!problem.trim() && !imageData) return;

    setIsSearching(true);
    setSolutions([]);

    try {
      const askRequest: AskRequestModel = {
        question: problem.trim(),
        image_data: imageData,
      };

      const data = await api.default.ask(askRequest);
      if (!data || !data.matches || data.matches.length === 0) {
        // Automatically start an investigation when no solutions are found
        await handleInvestigate(problem, imageData);
        return;
      }

      const solutions = await Promise.all(
        data.matches.map(async (match) => {
          const [solution, inventory] = await Promise.all([
            api.default.getSolution(match.solution_id),
            api.default.getSolutionInventory(match.solution_id).catch(() => {
              console.log(
                "No inventory data found for solution:",
                match.solution_id
              );
              return null;
            }),
          ]);

          if (solution) {
            return {
              ...solution,
              matchScore: match.score.toString(),
              inventory: inventory,
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
    clearSearch();
    setIsInvestigating(true);

    try {
      const result = await api.default.investigate({
        question: problem.trim(),
        image_data: imageData,
      });

      if (result.solution?.id) {
        setSolutionId(result.solution.id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start investigation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const clearSearch = () => {
    setSolutionId(null);
    setSolutions([]);
    setIsSearching(false);
    setIsInvestigating(false);
  };

  return {
    isSearching,
    isInvestigating,
    investigationStatus: status,
    solutions,
    handleSearch,
    handleInvestigate,
    clearSearch,
  } as const;
};
