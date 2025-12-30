'use client';

import { GEOScore } from '@/lib/models/geo';

interface GeoScoreCardProps {
  score: GEOScore;
  title?: string;
}

export function GeoScoreCard({ score, title = 'GEO Score' }: GeoScoreCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 text-4xl font-bold">{score.overall}</div>
      <div className="mt-4 space-y-2">
        <div>
          <div className="flex justify-between text-sm">
            <span>Visibility</span>
            <span>{score.visibility.reach}% reach, Position {score.visibility.position}</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm">
            <span>Sentiment</span>
            <span className="capitalize">{score.sentiment.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

