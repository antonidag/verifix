import { Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import {
  AskRequestModel,
  AskResponseModel,
  InventoryBase,
  SolutionModel,
  SolutionPartModel,
} from "@/api-client";
import { api } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export interface SolutionWithMatch extends SolutionModel {
  matchScore: string;
  inventory?: InventoryBase;
}

export const useSolutionSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [solutions, setSolutions] = useState<SolutionWithMatch[]>([]);
  const [searchResults, setSearchResults] = useState<AskResponseModel>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Cleanup any existing event source on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const setupSolutionEventSource = (solutionId: string) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(
      `/api/v1/solutions/${solutionId}/status`
    );
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("solution_ready", async (event) => {
      const data = JSON.parse(event.data);
      if (data.solution) {
        // Fetch inventory data for the solution
        let inventory = null;
        try {
          inventory = await api.default.getSolutionInventory(solutionId);
        } catch (error) {
          console.log("No inventory data found for solution:", solutionId);
        }

        setSolutions([
          {
            ...data.solution,
            matchScore: "1.0", // AI-generated solutions get full confidence
            inventory: inventory,
          },
        ]);

        toast({
          title: "Investigation Complete",
          description: "We've found a potential solution for your problem.",
        });

        eventSource.close();
      }
    });

    eventSource.addEventListener("error", (error) => {
      console.error("SSE Error:", error);
      toast({
        title: "Error",
        description:
          "Failed to monitor investigation progress. Please try again.",
        variant: "destructive",
      });
      eventSource.close();
    });
  };

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
            // Fetch inventory data for the solution
            let inventory = null;
            try {
              inventory = await api.default.getSolutionInventory(
                match.solution_id
              );
            } catch (error) {
              console.log(
                "No inventory data found for solution:",
                match.solution_id
              );
            }

            return {
              ...foundSolution,
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

      if (response.solution?.id) {
        setupSolutionEventSource(response.solution.id);
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
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
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
