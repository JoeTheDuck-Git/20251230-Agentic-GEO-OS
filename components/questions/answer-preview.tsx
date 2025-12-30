'use client';

import { AIAnswerSnapshot } from '@/lib/models/question';

interface AnswerPreviewProps {
  snapshot: AIAnswerSnapshot;
}

export function AnswerPreview({ snapshot }: AnswerPreviewProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="text-sm text-muted-foreground mb-2">
        AI Answer from {snapshot.timestamp.toLocaleDateString()}
      </div>
      <div className="p-4 bg-muted rounded mb-4">
        {snapshot.answerText}
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Brand Mentions ({snapshot.brandMentions.length})</div>
        {snapshot.brandMentions.map((mention, idx) => (
          <div key={idx} className="text-sm p-2 border rounded">
            <div className="flex justify-between">
              <span>Brand {mention.brandId}</span>
              <span className="capitalize">{mention.sentiment}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{mention.context}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

