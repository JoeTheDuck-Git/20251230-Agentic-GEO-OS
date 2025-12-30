'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DriverKey,
  GapKey,
  getDriverLabel,
  getDriverTooltip,
  getGapLabel,
  getGapTooltip,
} from '@/lib/geo/driverDefinitions';

interface DriverChipProps {
  kind: 'driver' | 'gap';
  driverKey: DriverKey | GapKey;
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

export function DriverChip({
  kind,
  driverKey,
  size = 'md',
  showIcon = true,
  className = '',
}: DriverChipProps) {
  const label = kind === 'driver' ? getDriverLabel(driverKey as DriverKey) : getGapLabel(driverKey as GapKey);
  const tooltip = kind === 'driver' ? getDriverTooltip(driverKey as DriverKey) : getGapTooltip(driverKey as GapKey);

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2 py-1';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`inline-flex items-center gap-1 rounded border bg-muted text-muted-foreground cursor-help ${sizeClasses} ${className}`}
          >
            {label}
            {showIcon && (
              <span className="text-xs leading-none opacity-60">ⓘ</span>
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

