'use client';

import { Topic } from '@/lib/models/topic';

interface TopicListProps {
  topics: Topic[];
}

export function TopicList({ topics }: TopicListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {topics.map(topic => (
        <div key={topic.id} className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold">{topic.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
          <div className="mt-4 flex gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Visibility</span>
              <div className="text-2xl font-bold">--</div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Sentiment</span>
              <div className="text-2xl font-bold">--</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

