'use client';

import { TopicPerformance } from '@/lib/models/topic';

interface TopicPerformanceProps {
  performances: TopicPerformance[];
}

export function TopicPerformanceList({ performances }: TopicPerformanceProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Topic Performance</h3>
      <div className="space-y-3">
        {performances.length === 0 ? (
          <div className="text-sm text-muted-foreground">No topic performance data available</div>
        ) : (
          performances.map((perf) => (
            <div key={perf.topicId} className="p-3 border rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Topic {perf.topicId}</span>
                <span className="text-sm">GEO: {perf.geoScore.overall}</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {perf.questionCount} questions • Avg Position: {perf.avgPosition.toFixed(1)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

