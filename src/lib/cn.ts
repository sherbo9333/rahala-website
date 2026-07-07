import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names safely, resolving Tailwind conflicts
 * (e.g. cn("p-4", condition && "p-6") -> "p-6" wins, not both applied).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
