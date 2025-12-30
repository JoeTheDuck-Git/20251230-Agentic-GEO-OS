"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MetricId, getMetricDefinition, isLowSample } from "@/lib/geo/metrics/metricRegistry";
import { cn } from "@/lib/utils";

interface LowSampleBadgeProps {
  metricId: MetricId;
  sampleSize?: number;
  className?: string;
}

export function LowSampleBadge({
  metricId,
  sampleSize,
  className,
}: LowSampleBadgeProps) {
  const definition = getMetricDefinition(metricId);
  if (!definition.sampleSpec || !isLowSample(metricId, sampleSize)) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "inline-flex items-center text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800 cursor-help",
              className
            )}
          >
            {definition.sampleSpec.lowSampleLabel}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{definition.sampleSpec.lowSampleTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

