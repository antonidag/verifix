import { useEffect, useState } from "react";
import { SolutionModel, InventoryBase } from "@/api-client";
import { api } from "@/api/apiClient";
import { toast } from "@/hooks/use-toast";

export type SolutionStatus =
  | "analyzing"
  | "processing"
  | "identifying"
  | "validating"
  | "storing"
  | "complete"
  | "error";

type SolutionEventCallback = (
  solution: SolutionModel,
  inventory: InventoryBase | null
) => void;

export const useSolutionEvents = (
  solutionId: string,
  onSolutionReady: SolutionEventCallback
) => {
  const [status, setStatus] = useState<SolutionStatus>("analyzing");

  useEffect(() => {
    if (!solutionId) return;

    const eventSource = new EventSource(
      `/api/v1/solutions/${solutionId}/status`
    );

    // Handle all status events
    const statuses: SolutionStatus[] = [
      "analyzing",
      "processing",
      "identifying",
      "validating",
      "storing",
    ];

    statuses.forEach((eventStatus) => {
      eventSource.addEventListener(eventStatus, (event) => {
        const data = JSON.parse(event.data);
        setStatus(data.status);
      });
    });

    // Handle complete status
    eventSource.addEventListener("complete", (event) => {
      const data = JSON.parse(event.data);
      setStatus("complete");
      if (data.solution) {
        onSolutionReady(data.solution, data.inventory || null);
        toast({
          title: "Investigation Complete",
          description: "We've found a potential solution for your problem.",
        });
        eventSource.close();
      }
    });

    // Handle error status
    eventSource.addEventListener("error", (event) => {
      const data = typeof event === "string" ? JSON.parse(event) : event;
      console.error("SSE Error:", data);
      setStatus("error");
      toast({
        title: "Error",
        description:
          data.error ||
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

  return {
    status,
    isComplete: status === "complete",
    isError: status === "error",
  };
};
