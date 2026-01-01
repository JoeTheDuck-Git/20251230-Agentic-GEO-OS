'use client';

import { Suspense } from 'react';
import { watchlistDemo } from '@/lib/demo/geo/watchlist.demo';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';

function WatchlistContent() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <GeoGlobalFilters />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Watchlist</h1>
        <p className="text-muted-foreground mt-2">
          Tracked items for monitoring. Read-only (managed externally in demo mode).
        </p>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          Watchlist items are managed externally. This view shows current tracked items for monitoring.
        </p>
      </div>

      {/* Topics Section */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Topics ({watchlistDemo.topics.length})</h3>
        <div className="flex flex-wrap gap-2">
          {watchlistDemo.topics.map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-1 rounded border bg-muted/50 text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Managed externally in demo mode.
        </p>
      </div>

      {/* Competitors Section */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Competitors ({watchlistDemo.competitors.length})</h3>
        <div className="flex flex-wrap gap-2">
          {watchlistDemo.competitors.map((competitor) => (
            <span
              key={competitor}
              className="text-xs px-2 py-1 rounded border bg-muted/50 text-muted-foreground"
            >
              {competitor}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Managed externally in demo mode.
        </p>
      </div>

      {/* Domains Section */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Domains ({watchlistDemo.domains.length})</h3>
        <div className="flex flex-wrap gap-2">
          {watchlistDemo.domains.map((domain) => (
            <span
              key={domain}
              className="text-xs px-2 py-1 rounded border bg-muted/50 text-muted-foreground"
            >
              {domain}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Managed externally in demo mode.
        </p>
      </div>

      {/* Patterns Section */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Patterns ({watchlistDemo.patterns.length})</h3>
        <div className="flex flex-wrap gap-2">
          {watchlistDemo.patterns.map((pattern) => (
            <span
              key={pattern}
              className="text-xs px-2 py-1 rounded border bg-muted/50 text-muted-foreground"
            >
              {pattern}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Managed externally in demo mode.
        </p>
      </div>
    </div>
  );
}

function WatchlistLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function WatchlistPage() {
  return (
    <Suspense fallback={<WatchlistLoading />}>
      <WatchlistContent />
    </Suspense>
  );
}

