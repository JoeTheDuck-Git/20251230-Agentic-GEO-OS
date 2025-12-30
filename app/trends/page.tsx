export default function TrendsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Historical Trends</h1>
        <p className="text-muted-foreground mt-2">
          Track GEO Score changes over time
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">GEO Score Over Time</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Time series chart placeholder
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Visibility Trend</h3>
            <div className="h-48 flex items-center justify-center text-muted-foreground">
              Chart placeholder
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Sentiment Trend</h3>
            <div className="h-48 flex items-center justify-center text-muted-foreground">
              Chart placeholder
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Topic Movement</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Topic movement visualization placeholder
          </div>
        </div>
      </div>
    </div>
  );
}

