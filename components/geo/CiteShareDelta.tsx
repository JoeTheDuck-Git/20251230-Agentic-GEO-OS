'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { getToneBadgeClasses } from '@/lib/geo/metrics/tone';

interface CiteShareDeltaProps {
  deltaPp: number; // percentage points (Acme - Competitor)
  className?: string;
}

export function CiteShareDelta({ deltaPp, className }: CiteShareDeltaProps) {
  // For cite share: higher is better for Acme
  // deltaPp = Acme - Competitor
  // positive => good (Acme advantage)
  // negative => bad (Acme behind)
  const tone = deltaPp > 0 ? 'good' : deltaPp < 0 ? 'bad' : 'neutral';
  const arrow = deltaPp > 0 ? 'up' : deltaPp < 0 ? 'down' : 'none';
  
  const absDelta = Math.abs(deltaPp);
  const displayText = deltaPp > 0 
    ? `+${absDelta.toFixed(1)} pp` 
    : deltaPp < 0 
    ? `-${absDelta.toFixed(1)} pp` 
    : '0 pp';
  
  const arrowIcon = arrow === 'up' ? '▲' : arrow === 'down' ? '▼' : '—';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              getToneBadgeClasses(tone),
              "cursor-help text-xs",
              className
            )}
          >
            <span>Δ</span>
            <span>{displayText}</span>
            {arrow !== 'none' && <span className="ml-0.5">{arrowIcon}</span>}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div>
            <p className="font-medium mb-1">Cite Share Delta</p>
            <p className="text-sm">
              Difference in cite share between Acme and the selected competitor (percentage points).
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

