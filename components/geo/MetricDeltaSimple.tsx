'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getToneBadgeClasses } from '@/lib/geo/metrics/tone';

interface MetricDeltaSimpleProps {
  current: number;
  baseline: number;
  format?: 'number' | 'percentage' | 'time';
  higherIsBetter?: boolean;
  className?: string;
}

export function MetricDeltaSimple({
  current,
  baseline,
  format = 'number',
  higherIsBetter = true,
  className,
}: MetricDeltaSimpleProps) {
  const delta = current - baseline;
  const deltaPct = baseline !== 0 ? ((delta / baseline) * 100) : 0;
  
  const tone = higherIsBetter
    ? (delta > 0 ? 'good' : delta < 0 ? 'bad' : 'neutral')
    : (delta < 0 ? 'good' : delta > 0 ? 'bad' : 'neutral');

  const formatValue = (value: number): string => {
    switch (format) {
      case 'percentage':
        return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
      case 'time':
        const mins = Math.floor(Math.abs(value) / 60);
        const secs = Math.floor(Math.abs(value) % 60);
        return `${delta >= 0 ? '+' : '-'}${mins}m ${secs}s`;
      default:
        return `${delta >= 0 ? '+' : ''}${new Intl.NumberFormat('en-US').format(Math.round(value))}`;
    }
  };

  const displayText = formatValue(delta);
  const displayPct = format !== 'percentage' && baseline !== 0
    ? ` (${deltaPct >= 0 ? '+' : ''}${deltaPct.toFixed(1)}%)`
    : '';

  const formatDisplayValue = (value: number): string => {
    switch (format) {
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'time':
        const mins = Math.floor(value / 60);
        const secs = Math.floor(value % 60);
        return `${mins}m ${secs}s`;
      default:
        return String(value);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`${getToneBadgeClasses(tone)} text-xs cursor-help ${className || ''}`}
          >
            {displayText}{displayPct}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div>
            <p className="font-medium mb-1">Delta vs Baseline</p>
            <p className="text-sm">
              Difference vs baseline period (same duration). Current: {formatDisplayValue(current)}. Baseline: {formatDisplayValue(baseline)}.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

