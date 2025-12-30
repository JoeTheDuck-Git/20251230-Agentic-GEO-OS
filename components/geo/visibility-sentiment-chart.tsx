'use client';

import { GEOScore } from '@/lib/models/geo';

interface VisibilitySentimentChartProps {
  scores: GEOScore[];
}

export function VisibilitySentimentChart({ scores }: VisibilitySentimentChartProps) {
  // Placeholder for chart visualization
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold">Visibility vs Sentiment</h3>
      <div className="mt-4 h-64 flex items-center justify-center text-muted-foreground">
        Chart visualization placeholder
      </div>
    </div>
  );
}

