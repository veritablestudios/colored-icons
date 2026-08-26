import { Icon } from "@/interfaces";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind and conditional class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ensure a URL string has a protocol. Defaults to https.
 * Examples:
 *  - example.com -> https://example.com
 *  - http://example.com -> http://example.com
 */
export function ensureProtocol(url: string, protocol: "https" | "http" = "https"): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `${protocol}://${trimmed}`;
}

// Compute a good display size for an icon based on its classes and category
export const computeIconSize = (icon: Icon): number => {
  const iconClass = icon.classes[0] ?? "";
  const iconCategory = (icon.category || "").toLowerCase();

  if (iconClass.includes("horizontal") || iconClass.includes("wordmark")) return 5;
  if (iconClass.includes("vertical")) return 4;
  if (iconCategory === "animals") return 3;
  return 2;
};
