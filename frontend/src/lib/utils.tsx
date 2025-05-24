import { Solution } from "@/data/solutions";
import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copySolutionToClipboard = (solution: Solution) => {
  const text = `
Title: ${solution.title}
Description: ${solution.description}
Steps:
${solution.steps.join("\n")}
Confidence: ${Math.round(solution.confidence * 100)}%
Usage Count: ${solution.usageCount}
Last Used: ${solution.lastUsed}
Tags: ${solution.tags.join(", ")}
Documentation Links: ${solution.documentationLinks?.join(", ") || "None"}
Created At: ${new Date(solution.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })}
`.trim();

  navigator.clipboard.writeText(text);
  toast({
    title: "Copied to clipboard",
    description: "The solution has been copied to your clipboard",
  });
};

export const formatSolutionSteps = (steps: string[]) => {
  return steps.map((step, index) => (
    <div key={index} className="mb-2">
      {step.trim()}
    </div>
  ));
};
