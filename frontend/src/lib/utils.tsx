import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatSolutionSteps = (steps: string[]) => {
  return steps.map((step, index) => (
    <div key={index} className="mb-2">
      {step.trim()}
    </div>
  ));
};
