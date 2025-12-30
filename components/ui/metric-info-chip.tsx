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
  MetricKey,
} from "@/lib/geo/metric-definitions";

interface MetricInfoChipProps {
  metric: MetricKey;
  variant?: "ghost" | "secondary";
  size?: "sm" | "md";
  className?: string;
}

export function MetricInfoChip({
  metric,
  variant = "ghost",
  size = "sm",
  className,
}: MetricInfoChipProps) {
  const definition = getMetricDefinition(metric);
  const tooltip = definition.tooltip;

  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2 py-1";
  const variantClasses =
    variant === "ghost"
      ? "border-muted bg-muted/50 text-muted-foreground"
      : "border bg-secondary text-secondary-foreground";

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
            {definition.label}
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
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

