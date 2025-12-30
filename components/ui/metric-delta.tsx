"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  getMetricDefinition,
  getDeltaTooltipContent,
  MetricId,
} from "@/lib/geo/metrics/metricRegistry";
import { getArrowIcon, getToneBadgeClasses } from "@/lib/geo/metrics/tone";

interface MetricDeltaProps {
  type: MetricId | "geoScore" | "reach" | "avgPosition"; // Support both for backward compatibility
  current: number;
  previous: number;
  unit?: "percent" | "number";
  decimals?: number;
  className?: string;
}

// Format delta value helper
function formatDeltaValue(value: number, decimals: number, metricId: MetricId): string {
  const absValue = Math.abs(value);
  const def = getMetricDefinition(metricId);
  
  if (metricId === "avgPosition") {
    // For avgPosition: show "0.4 better" or "0.4 worse"
    if (value < 0) {
      return `${absValue.toFixed(decimals)} better`;
    } else if (value > 0) {
      return `${absValue.toFixed(decimals)} worse`;
    }
    return "no change";
  } else {
    // For other metrics: show "+4 pts" or "-4 pts"
    const formatted = decimals === 0 ? absValue.toString() : absValue.toFixed(decimals);
    return value > 0 ? `+${formatted} pts` : `${formatted} pts`;
  }
}

export function MetricDelta({
  type,
  current,
  previous,
  unit,
  decimals,
  className,
}: MetricDeltaProps) {
  // Normalize type to MetricId
  const metricId: MetricId =
    type === "geoScore"
      ? "geoScore"
      : type === "reach"
      ? "reach"
      : type === "avgPosition"
      ? "avgPosition"
      : type;

  const definition = getMetricDefinition(metricId);
  const delta = current - previous;
  const defaultDecimals = decimals !== undefined 
    ? decimals 
    : metricId === "avgPosition" ? 1 : 0;
  
  // Evaluate tone and arrow using registry
  const { tone, arrow } = definition.evaluateDelta(delta);
  
  // Format display text
  const displayText = formatDeltaValue(delta, defaultDecimals, metricId);
  const arrowIcon = getArrowIcon(arrow);
  
  const tooltipContent = getDeltaTooltipContent(metricId);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              getToneBadgeClasses(tone),
              "cursor-help",
              className
            )}
          >
            <span>{arrowIcon}</span>
            <span>{displayText}</span>
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div>
            <p className="font-medium mb-1">Delta vs previous period</p>
            <p className="text-sm">{tooltipContent}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
