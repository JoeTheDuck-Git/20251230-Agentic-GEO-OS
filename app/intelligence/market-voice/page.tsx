'use client';

import { marketVoiceDemo } from '@/lib/demo/geo-os/market-voice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function MarketVoicePage() {
  const data = marketVoiceDemo;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(1)}%`;
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const getTrendTooltip = (trend: string): string => {
    switch (trend.toLowerCase()) {
      case 'up':
        return 'Up vs previous period.';
      case 'down':
        return 'Down vs previous period.';
      default:
        return 'No significant change vs previous period.';
    }
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Market Voice</h1>
        <p className="text-muted-foreground mt-2">
          External market signals (forums, social, Q&A). Read-only. Not included in GEO scoring.
        </p>
      </div>

      {/* Callout note */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Measurement isolation:</strong> Market Voice is analyzed separately from GEO Score to preserve measurement isolation.
        </p>
        <p className="text-sm text-muted-foreground">
          Use it to understand narratives, objections, and recurring questions.
        </p>
      </div>

      {/* KPI Row (4 cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Mentions (30d)</div>
          <div className="text-3xl font-bold">{formatNumber(data.kpis.mentions_30d)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="text-sm font-medium text-muted-foreground">Share of Voice</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Share of Voice information"
                >
                  <span className="text-xs leading-none">ⓘ</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>Share of total tracked mentions attributed to your brand within the selected time range and sources.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-3xl font-bold">{formatPercentage(data.kpis.share_of_voice)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="text-sm font-medium text-muted-foreground">Market Sentiment</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Market Sentiment information"
                >
                  <span className="text-xs leading-none">ⓘ</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>Sentiment of market discussions (forums/social/Q&A). Separate from GEO sentiment in AI answers.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-700">Positive</span>
              <span className="font-medium">{formatPercentage(data.kpis.market_sentiment.positive)}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${data.kpis.market_sentiment.positive * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Neutral</span>
              <span className="font-medium">{formatPercentage(data.kpis.market_sentiment.neutral)}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gray-400 h-2 rounded-full"
                style={{ width: `${data.kpis.market_sentiment.neutral * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-700">Negative</span>
              <span className="font-medium">{formatPercentage(data.kpis.market_sentiment.negative)}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${data.kpis.market_sentiment.negative * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="text-sm font-medium text-muted-foreground">Momentum</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Momentum information"
                >
                  <span className="text-xs leading-none">ⓘ</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>Change in mentions vs the previous equivalent period (e.g., last 30 days vs prior 30 days).</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {data.kpis.momentum > 0 ? '+' : ''}{formatPercentage(data.kpis.momentum)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">vs previous period</div>
        </div>
      </div>

      {/* Insights Grid (2 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Narratives */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Top Narratives</h3>
          <div className="space-y-3">
            {data.top_narratives.map((narrative, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-sm mb-1">{narrative.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatPercentage(narrative.share)} of mentions
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded border ${getSentimentColor(narrative.sentiment)}`}>
                    {narrative.sentiment}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {narrative.top_sources.map((source, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded border bg-muted text-muted-foreground"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recurring Questions */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recurring Questions</h3>
          <div className="space-y-3">
            {data.recurring_questions.map((item, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm mb-1">{item.question}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatNumber(item.frequency)} mentions
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className={`text-xs px-2 py-1 rounded border capitalize cursor-help ${getRiskColor(item.risk)}`}>
                        {item.risk} risk
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>Heuristic severity based on volume and negative sentiment signals. Read-only.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Source Breakdown Table */}
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Source Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4 font-medium text-sm">Source</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Mentions</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Share</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Sentiment</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.source_breakdown.map((row, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium">{row.source}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm">{formatNumber(row.mentions)}</td>
                  <td className="py-3 px-4 text-right text-sm">{formatPercentage(row.share)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded border ${getSentimentColor(row.sentiment)}`}>
                      {row.sentiment}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-muted-foreground cursor-help">
                          {getTrendIcon(row.trend)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p>{getTrendTooltip(row.trend)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Competitor Voice Comparison Table */}
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Competitor Voice Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4 font-medium text-sm">Brand</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Mentions</th>
                <th className="text-right py-3 px-4 font-medium text-sm">SOV</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Sentiment</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Top Narrative</th>
              </tr>
            </thead>
            <tbody>
              {data.competitor_voice_comparison.map((row, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium">{row.brand}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm">{formatNumber(row.mentions)}</td>
                  <td className="py-3 px-4 text-right text-sm">{formatPercentage(row.sov)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded border ${getSentimentColor(row.sentiment)}`}>
                      {row.sentiment}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted-foreground">{row.top_narrative}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evidence Snippets */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Evidence Snippets</h3>
          <span className="text-xs px-2 py-1 rounded border bg-muted text-muted-foreground">
            Anonymized
          </span>
        </div>
        <div className="space-y-3">
          {data.evidence_snippets.map((snippet, i) => (
            <div key={i} className="p-3 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">{snippet.source}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(snippet.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{snippet.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Boundary footnote */}
      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          Read-only intelligence. Market Voice data is excluded from GEO Score calculation. No execution actions available.
        </p>
      </div>
      </div>
    </TooltipProvider>
  );
}
