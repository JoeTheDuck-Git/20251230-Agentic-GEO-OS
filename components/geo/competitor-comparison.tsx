'use client';

import { BrandComparison } from '@/lib/models/brand';

interface CompetitorComparisonProps {
  comparisons: BrandComparison[];
}

export function CompetitorComparison({ comparisons }: CompetitorComparisonProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Competitors</h3>
      <div className="space-y-2">
        {comparisons.length === 0 ? (
          <div className="text-sm text-muted-foreground">No competitor data available</div>
        ) : (
          comparisons.map((comp) => (
            <div key={comp.brandId} className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Rank {comp.rank}</span>
              <span className="text-sm font-medium">GEO Score: {comp.geoScore.overall}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

