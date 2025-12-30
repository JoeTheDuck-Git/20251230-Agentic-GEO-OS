'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getPattern, getPatternExamples, formatPatternChipLabel } from '@/lib/geo/patternLibrary';

interface PatternChipsProps {
  patternIds: string[];
  topN?: number;
  showExamplesOnHover?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function PatternChips({
  patternIds,
  topN = 3,
  showExamplesOnHover = true,
  size = 'sm',
  className = '',
}: PatternChipsProps) {
  const displayIds = patternIds.slice(0, topN);
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2 py-1';

  return (
    <TooltipProvider>
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {displayIds.map((id) => {
          const pattern = getPattern(id);
          const label = formatPatternChipLabel(id);
          const examples = showExamplesOnHover ? getPatternExamples(id, 3) : [];

          const chip = (
            <span
              className={`inline-flex items-center rounded border bg-muted text-muted-foreground ${sizeClasses}`}
            >
              {label}
            </span>
          );

          if (showExamplesOnHover && examples.length > 0) {
            return (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  {chip}
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{label}</div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      {examples.map((example, i) => (
                        <div key={i}>• {example}</div>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }

          return <span key={id}>{chip}</span>;
        })}
      </div>
    </TooltipProvider>
  );
}

