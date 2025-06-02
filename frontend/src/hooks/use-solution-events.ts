import { useEffect } from "react";
import { SolutionModel, InventoryBase } from "@/api-client";
import { api } from "@/api/apiClient";
import { toast } from "@/hooks/use-toast";

type SolutionEventCallback = (
  solution: SolutionModel,
  inventory: InventoryBase | null
) => void;

export const useSolutionEvents = (
  solutionId: string,
  onSolutionReady: SolutionEventCallback
) => {
  useEffect(() => {
    if (!solutionId) return;

    const eventSource = new EventSource(
      `/api/v1/solutions/${solutionId}/status`
    );

    eventSource.addEventListener("solution_ready", async (event) => {
      const data = JSON.parse(event.data);
      if (data.solution) {
        onSolutionReady(data.solution, data.inventory || null);

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

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, [solutionId, onSolutionReady]);
};
