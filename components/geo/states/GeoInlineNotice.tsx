'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InfoIcon, AlertTriangleIcon, HelpCircleIcon } from '@/components/geo/icons/GeoIcons';
import { cn } from '@/lib/utils';

interface GeoInlineNoticeProps {
  tone: 'info' | 'warning' | 'neutral';
  label: string;
  tooltipTitle?: string;
  tooltipBody?: string;
  className?: string;
}

const toneConfig = {
  info: {
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800',
    icon: InfoIcon,
  },
  warning: {
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800',
    icon: AlertTriangleIcon,
  },
  neutral: {
    badgeClass: 'bg-muted text-muted-foreground border-muted',
    icon: HelpCircleIcon,
  },
};

export function GeoInlineNotice({
  tone,
  label,
  tooltipTitle,
  tooltipBody,
  className,
}: GeoInlineNoticeProps) {
  const config = toneConfig[tone];
  const Icon = config.icon;

  const badge = (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded border',
        config.badgeClass,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );

  if (tooltipTitle || tooltipBody) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help">{badge}</span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            {tooltipTitle && <p className="font-medium mb-1">{tooltipTitle}</p>}
            {tooltipBody && <p className="text-sm">{tooltipBody}</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
}

