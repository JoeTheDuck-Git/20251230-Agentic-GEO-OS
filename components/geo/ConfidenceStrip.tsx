'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LowSampleBadge } from '@/components/ui/low-sample-badge';

interface ConfidenceStripProps {
  answerUnits: number;
  questions: number;
  models: number;
  lastRunLabel: string;
  lowSample?: boolean;
  metricId?: string;
  className?: string;
}

export function ConfidenceStrip({
  answerUnits,
  questions,
  models,
  lastRunLabel,
  lowSample = false,
  metricId,
  className,
}: ConfidenceStripProps) {
  return (
    <TooltipProvider>
      <div className={`text-xs text-muted-foreground flex items-center gap-2 flex-wrap ${className || ''}`}>
        <span>{answerUnits} answers</span>
        <span>•</span>
        <span>{questions} questions</span>
        <span>•</span>
        <span>{models} model{models !== 1 ? 's' : ''}</span>
        <span>•</span>
        <span>Last run: {lastRunLabel}</span>
        {lowSample && metricId && (
          <>
            <span>•</span>
            <LowSampleBadge metricId={metricId as any} sampleSize={answerUnits} />
          </>
        )}
      </div>
    </TooltipProvider>
  );
}

