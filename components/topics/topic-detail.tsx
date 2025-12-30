'use client';

import { TopicPerformance } from '@/lib/models/topic';

interface TopicDetailProps {
  performance: TopicPerformance;
}

export function TopicDetail({ performance }: TopicDetailProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Topic Performance Details</h3>
      <div className="space-y-4">
        <div>
          <span className="text-sm text-muted-foreground">GEO Score</span>
          <div className="text-3xl font-bold">{performance.geoScore.overall}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Question Count</span>
            <div className="text-xl font-semibold">{performance.questionCount}</div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Avg Position</span>
            <div className="text-xl font-semibold">{performance.avgPosition.toFixed(1)}</div>
          </div>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Sentiment Distribution</span>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Positive</span>
              <span>{performance.sentimentDistribution.positive}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Neutral</span>
              <span>{performance.sentimentDistribution.neutral}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Negative</span>
              <span>{performance.sentimentDistribution.negative}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

