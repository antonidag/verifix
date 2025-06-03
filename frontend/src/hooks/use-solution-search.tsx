import { InventoryBase, SolutionModel } from "@/api-client";
import { api } from "@/api/apiClient";
import { useAskQuestion, useInvestigate } from "@/hooks/use-solution-api";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

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

  const { mutateAsync: askQuestion } = useAskQuestion();
  const { mutateAsync: getSolutionAsync } = useMutation({
    mutationFn: (id: string) => api.default.getSolution(id),
  });
  const { mutateAsync: getInventoryAsync } = useMutation({
    mutationFn: (id: string) => api.default.getSolutionInventory(id),
  });

  const handleSearch = (problem: string, imageData: string | null) => {
    if (!problem.trim() && !imageData) return;

    setIsSearching(true);
    setSolutions([]);

    askQuestion(
      {
        question: problem.trim(),
        image_data: imageData,
      },
      {
        onSuccess: async (data) => {
          if (!data || !data.matches || data.matches.length === 0) {
            // Automatically start an investigation when no solutions are found
            handleInvestigate(problem, imageData);
            return;
          }

          const solutions = await Promise.all(
            data.matches.map(async (match) => {
              try {
                const [solution, inventory] = await Promise.all([
                  getSolutionAsync(match.solution_id),
                  getInventoryAsync(match.solution_id).catch(() => {
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
              } catch (error) {
                console.error("Error fetching solution details:", error);
              }
              return null;
            })
          );

          setSolutions(solutions.filter((sol) => sol !== null));
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to search for solutions. Please try again.",
            variant: "destructive",
          });
        },
        onSettled: () => {
          setIsSearching(false);
        },
      }
    );
  };

  const investigateMutation = useInvestigate();

  const handleInvestigate = (problem: string, imageData: string | null) => {
    if (!problem.trim() && !imageData) return;
    clearSearch();
    setIsInvestigating(true);

    investigateMutation.mutate(
      {
        question: problem.trim(),
        image_data: imageData,
      },
      {
        onSuccess: (result) => {
          if (result.solution?.id) {
            setSolutionId(result.solution.id);
          }
        },
        onError: () => {
          setIsInvestigating(false);
          toast({
            title: "Error",
            description: "Failed to start investigation. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
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
