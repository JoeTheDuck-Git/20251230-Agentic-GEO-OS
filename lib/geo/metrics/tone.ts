import { Tone, Arrow } from "./metricRegistry";
import { cn } from "@/lib/utils";

// Map tone to badge variant classes (using existing pattern from project)
export function getBadgeVariantForTone(tone: Tone): string {
  switch (tone) {
    case "good":
      // Use secondary variant (subtle green)
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400";
    case "bad":
      // Use destructive variant (red)
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400";
    case "neutral":
      // Use outline variant (muted)
      return "border-muted bg-muted/50 text-muted-foreground";
    default:
      return "border-muted bg-muted/50 text-muted-foreground";
  }
}

// Get arrow icon/symbol
export function getArrowIcon(arrow: Arrow): string {
  switch (arrow) {
    case "up":
      return "▲";
    case "down":
      return "▼";
    case "none":
      return "—";
    default:
      return "—";
  }
}

// Combined helper for badge classes with tone
export function getToneBadgeClasses(tone: Tone, className?: string): string {
  return cn(
    "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border",
    getBadgeVariantForTone(tone),
    className
  );
}

