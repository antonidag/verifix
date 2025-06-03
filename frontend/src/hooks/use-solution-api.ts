import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { AskRequestModel } from "@/api-client";

export const solutionKeys = {
  all: ["solutions"] as const,
  lists: () => [...solutionKeys.all, "list"] as const,
  list: (filters: string) => [...solutionKeys.lists(), { filters }] as const,
  details: () => [...solutionKeys.all, "detail"] as const,
  detail: (id: string) => [...solutionKeys.details(), id] as const,
  inventory: (id: string) => [...solutionKeys.all, "inventory", id] as const,
};

export const useSolutions = () => {
  return useQuery({
    queryKey: solutionKeys.lists(),
    queryFn: () => api.default.listSolutions(),
  });
};

export const useRecentSolutions = () => {
  return useQuery({
    queryKey: [...solutionKeys.lists(), "recent"],
    queryFn: () => api.default.listRecentSolutions(),
  });
};

export const useSolution = (id: string) => {
  return useQuery({
    queryKey: solutionKeys.detail(id),
    queryFn: () => api.default.getSolution(id),
    enabled: !!id,
  });
};

export const useVerifySolution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.default.verifySolution(id),
    onSuccess: (newSolution) => {
      // Invalidate all solution lists
      queryClient.invalidateQueries({ queryKey: solutionKeys.lists() });
      // Update the individual solution in cache
      queryClient.setQueryData(
        solutionKeys.detail(newSolution.id),
        newSolution
      );
    },
  });
};

export const useDeleteSolution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.default.deleteSolution(id),
    onSuccess: (_, id) => {
      // Invalidate all solution lists
      queryClient.invalidateQueries({ queryKey: solutionKeys.lists() });
      // Remove the deleted solution from cache
      queryClient.removeQueries({ queryKey: solutionKeys.detail(id) });
    },
  });
};

export const useAskQuestion = () => {
  return useMutation({
    mutationFn: (data: AskRequestModel) => api.default.ask(data),
  });
};

export const useInvestigate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AskRequestModel) => api.default.investigate(data),
    onSuccess: () => {
      // Invalidate solution lists since a new solution might have been created
      queryClient.invalidateQueries({ queryKey: solutionKeys.lists() });
    },
  });
};

export const useChat = () => {
  return useMutation({
    mutationFn: (request: AskRequestModel) => api.default.chat(request),
  });
};

export const useSolutionInventory = (id: string | null) => {
  return useQuery({
    queryKey: solutionKeys.inventory(id || ""),
    queryFn: () => api.default.getSolutionInventory(id!),
    enabled: !!id,
    retry: 2,
  });
};
