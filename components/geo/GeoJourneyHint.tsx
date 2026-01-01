'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type JourneyStep = 'Evidence' | 'Decision' | 'Execution Prep' | 'Measurement';

const JOURNEY_STEPS: JourneyStep[] = [
  'Evidence',
  'Decision',
  'Execution Prep',
  'Measurement',
];

export function GeoJourneyHint() {
  const pathname = usePathname();
  
  const getCurrentStep = (): JourneyStep | null => {
    if (pathname.startsWith('/intelligence/')) {
      return 'Evidence';
    }
    if (pathname.startsWith('/decisions/')) {
      return 'Decision';
    }
    if (pathname.startsWith('/execution-prep/')) {
      return 'Execution Prep';
    }
    if (pathname.startsWith('/measurement/')) {
      return 'Measurement';
    }
    return null;
  };

  const currentStep = getCurrentStep();
  
  if (!currentStep) {
    return null;
  }

  return (
    <div className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
      <span>Journey:</span>
      {JOURNEY_STEPS.map((step, index) => (
        <span key={step} className="flex items-center gap-1.5">
          <span
            className={cn(
              'transition-colors',
              step === currentStep
                ? 'font-semibold text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {step}
          </span>
          {index < JOURNEY_STEPS.length - 1 && (
            <span className="text-muted-foreground">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

