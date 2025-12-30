'use client';

import { Question } from '@/lib/models/question';

interface QuestionListProps {
  questions: Question[];
}

export function QuestionList({ questions }: QuestionListProps) {
  return (
    <div className="space-y-4">
      {questions.map(question => (
        <div key={question.id} className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold">{question.text}</h3>
          <div className="mt-4 space-y-2">
            <div className="text-sm text-muted-foreground">AI Answer Preview</div>
            <div className="p-4 bg-muted rounded">Mock AI answer content...</div>
            <div className="text-sm text-muted-foreground">Brand Mentions & Ordering</div>
            <div className="text-sm text-muted-foreground">Sentiment Annotations</div>
          </div>
        </div>
      ))}
    </div>
  );
}

