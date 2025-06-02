import { useEffect } from "react";
import { SolutionModel } from "@/api-client";

type SolutionEventCallback = (solution: SolutionModel) => void;

export const useSolutionEvents = (
  solutionId: string,
  onSolutionReady: SolutionEventCallback,
  onError?: (error: Error) => void
) => {
  useEffect(() => {
    const eventSource = new EventSource(
      `/api/v1/solutions/${solutionId}/status`
    );

    eventSource.addEventListener("solution_ready", (event) => {
      const data = JSON.parse(event.data);
      if (data.solution) {
        onSolutionReady(data.solution);
        eventSource.close();
      }
    });

    eventSource.addEventListener("error", (error) => {
      console.error("SSE Error:", error);
      onError?.(new Error("Failed to connect to solution status stream"));
      eventSource.close();
    });

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, [solutionId, onSolutionReady, onError]);
};
