'use client';

import { Recommendation } from '@/lib/models/recommendation';

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  return (
    <div className="space-y-4">
      {recommendations.map(rec => (
        <div key={rec.id} className="rounded-lg border bg-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {rec.priority}
                </span>
                <span className="text-xs text-muted-foreground capitalize">{rec.type.replace('_', ' ')}</span>
              </div>
              <h3 className="text-lg font-semibold mt-2">{rec.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="text-sm font-medium">Actionable Steps:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {rec.actionableSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Expected Impact: {rec.expectedImpact}
          </div>
        </div>
      ))}
    </div>
  );
}

