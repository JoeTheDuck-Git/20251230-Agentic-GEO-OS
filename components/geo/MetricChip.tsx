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
  MetricId,
  isLowSample,
} from "@/lib/geo/metrics/metricRegistry";
import { getArrowIcon, getToneBadgeClasses, getBadgeVariantForTone } from "@/lib/geo/metrics/tone";

interface MetricChipProps {
  metricId: MetricId;
  value?: number;
  yourValue?: number;
  benchmarkValue?: number;
  sampleSize?: number;
  mode?: "kpi" | "driver" | "gap";
  compact?: boolean;
  variant?: "ghost" | "secondary";
  size?: "sm" | "md";
  className?: string;
  showLowSampleBadge?: boolean;
}

export function MetricChip({
  metricId,
  value,
  yourValue,
  benchmarkValue,
  sampleSize,
  mode = "driver",
  compact = false,
  variant = "ghost",
  size = "sm",
  className,
  showLowSampleBadge = true,
}: MetricChipProps) {
  const definition = getMetricDefinition(metricId);
  const tooltip = definition.tooltip;
  const lowSample = showLowSampleBadge && isLowSample(metricId, sampleSize);

  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2 py-1";
  
  // Determine tone and arrow based on mode
  let tone: "good" | "bad" | "neutral" = "neutral";
  let arrow: "up" | "down" | "none" = "none";
  let gapText: string | undefined;
  let badgeClasses: string;

  if (mode === "gap" && yourValue !== undefined && benchmarkValue !== undefined) {
    const gap = yourValue - benchmarkValue;
    const evaluation = definition.evaluateGap(gap);
    tone = evaluation.tone;
    arrow = evaluation.arrow;
    
    // Format gap text
    const absGap = Math.abs(gap);
    if (definition.decimals === 0) {
      gapText = gap > 0 ? `+${absGap}` : `${gap}`;
    } else {
      gapText = gap > 0 
        ? `+${absGap.toFixed(definition.decimals)}` 
        : gap.toFixed(definition.decimals);
    }
    badgeClasses = getToneBadgeClasses(tone);
  } else if (mode === "gap" && value !== undefined && benchmarkValue !== undefined) {
    // Fallback: use value if yourValue not provided
    const gap = value - benchmarkValue;
    const evaluation = definition.evaluateGap(gap);
    tone = evaluation.tone;
    arrow = evaluation.arrow;
    
    const absGap = Math.abs(gap);
    if (definition.decimals === 0) {
      gapText = gap > 0 ? `+${absGap}` : `${gap}`;
    } else {
      gapText = gap > 0 
        ? `+${absGap.toFixed(definition.decimals)}` 
        : gap.toFixed(definition.decimals);
    }
    badgeClasses = getToneBadgeClasses(tone);
  } else {
    // Driver or KPI mode: use neutral styling
    badgeClasses = variant === "ghost"
      ? "border-muted bg-muted/50 text-muted-foreground"
      : "border bg-secondary text-secondary-foreground";
  }

  const label = definition.title;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded border cursor-help",
              sizeClasses,
              variantClasses,
              className
            )}
          >
            {label}
            {gapText && (
              <>
                <span className="text-xs opacity-75">({gapText})</span>
                <span>{getArrowIcon(arrow)}</span>
              </>
            )}
            {lowSample && definition.sampleSpec && (
              <span className="text-xs px-1 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800">
                {definition.sampleSpec.lowSampleLabel}
              </span>
            )}
            <span className="text-xs leading-none opacity-60">ⓘ</span>
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div>
            <p className="font-medium mb-1">{tooltip.title}</p>
            <p className="text-sm">{tooltip.body}</p>
            {tooltip.note && (
              <p className="text-xs text-muted-foreground mt-1">{tooltip.note}</p>
            )}
            {lowSample && definition.sampleSpec && (
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 font-medium">
                {definition.sampleSpec.lowSampleTooltip}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

