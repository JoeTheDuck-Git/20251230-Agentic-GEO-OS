'use client';

import { useState } from 'react';
import { MetricId, getMetricDefinition } from '@/lib/geo/metrics/metricRegistry';
import { resolveSnapshot } from '@/lib/geo/query/geoQuery';
import { useSearchParams } from 'next/navigation';

interface MetricMethodologyDrawerProps {
  metricId: MetricId;
  trigger?: React.ReactNode;
}

export function MetricMethodologyDrawer({ 
  metricId, 
  trigger 
}: MetricMethodologyDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const snapshot = searchParams.get('snapshot') || 'latest';
  
  const definition = getMetricDefinition(metricId);
  const resolvedSnapshot = resolveSnapshot(snapshot);

  const formatCalcSpec = (calcSpec: typeof definition.calcSpec): string[] => {
    const bullets: string[] = [];
    
    if (calcSpec.answerUnit) {
      bullets.push(`Answer Unit: ${calcSpec.answerUnit}`);
    }
    if (calcSpec.snapshotRule) {
      bullets.push(`Snapshot Rule: ${calcSpec.snapshotRule}`);
    }
    if (calcSpec.mentionRule) {
      bullets.push(`Mention Rule: ${calcSpec.mentionRule}`);
    }
    if (calcSpec.reachMode) {
      bullets.push(`Reach Mode: ${calcSpec.reachMode}`);
    }
    if (calcSpec.scope) {
      bullets.push(`Scope: ${calcSpec.scope === 'mentioned_only' ? 'Mentioned answers only' : 'All answer units'}`);
    }
    if (calcSpec.denominator) {
      bullets.push(`Denominator: ${calcSpec.denominator}`);
    }
    if (calcSpec.numerator) {
      bullets.push(`Numerator: ${calcSpec.numerator}`);
    }
    if (calcSpec.formula) {
      bullets.push(`Formula: ${calcSpec.formula}`);
    }
    if (calcSpec.rankWeights) {
      const weights = Object.entries(calcSpec.rankWeights)
        .map(([rank, weight]) => `${rank}: ${weight}`)
        .join(', ');
      bullets.push(`Rank Weights: ${weights}`);
    }
    if (calcSpec.distribution) {
      bullets.push(`Distribution: P(pos)=${calcSpec.distribution.p_pos}, P(neu)=${calcSpec.distribution.p_neu}, P(neg)=${calcSpec.distribution.p_neg}`);
    }
    if (calcSpec.index) {
      bullets.push(`Index: ${calcSpec.index}`);
    }
    
    return bullets;
  };

  const defaultTrigger = (
    <button
      type="button"
      className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
      onClick={() => setIsOpen(true)}
    >
      Methodology
    </button>
  );

  return (
    <>
      {trigger || defaultTrigger}
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setIsOpen(false)}>
          <div 
            className="bg-background rounded-lg border shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{definition.title} Methodology</h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Definition</h3>
                  <p className="text-sm text-muted-foreground">{definition.tooltip.body}</p>
                  {definition.tooltip.note && (
                    <p className="text-xs text-muted-foreground mt-2">{definition.tooltip.note}</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Calculation</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    {formatCalcSpec(definition.calcSpec).map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                {definition.sampleSpec && (
                  <div>
                    <h3 className="font-semibold mb-2">Sample Requirements</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Minimum Sample: {definition.sampleSpec.minSample} answer units</p>
                      <p>Low Sample Label: {definition.sampleSpec.lowSampleLabel}</p>
                      <p className="text-xs">{definition.sampleSpec.lowSampleTooltip}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Applies To</h3>
                  <p className="text-sm text-muted-foreground">
                    {definition.calcSpec.scope === 'mentioned_only' 
                      ? 'Mentioned answer units only (where brand appears)'
                      : 'All evaluated answer units under selected filters'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Last Updated</h3>
                  <p className="text-sm text-muted-foreground">
                    Snapshot: {resolvedSnapshot}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm border rounded-md hover:bg-muted"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

