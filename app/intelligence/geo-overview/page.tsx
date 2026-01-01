'use client';

import { useState, Suspense } from 'react';
import { geoOverviewDemo } from '@/lib/demo/geo-os/geo-overview';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PatternChips } from '@/components/geo/PatternChips';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { MetricDelta } from '@/components/ui/metric-delta';
import { LowSampleBadge } from '@/components/ui/low-sample-badge';
import { MetricChip } from '@/components/geo/MetricChip';
import { getMetricDefinition, formatMetricValue } from '@/lib/geo/metrics/metricRegistry';
import Link from 'next/link';
import { sourcesDemo } from '@/lib/demo/geo-os/sources.demo';
import { SourceCategoryChips } from '@/components/geo/SourceCategoryChips';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';
import { MetricMethodologyDrawer } from '@/components/geo/MetricMethodologyDrawer';
import { ConfidenceStrip } from '@/components/geo/ConfidenceStrip';
import { alertsDemo } from '@/lib/demo/geo/alerts.demo';
import { GeoLink } from '@/components/geo/GeoLink';
import { GeoJourneyHint } from '@/components/geo/GeoJourneyHint';
import { GeoDataFreshness } from '@/components/geo/GeoDataFreshness';
import { getIntelligenceMeta } from '@/lib/geo/meta/geoMeta';
import { parseGeoQuery } from '@/lib/geo/query/geoQuery';
import { useSearchParams } from 'next/navigation';
import { GeoPageActions } from '@/components/geo/GeoPageActions';

function GeoOverviewContent() {
  const data = geoOverviewDemo;
  const searchParams = useSearchParams();
  const geoQueryState = parseGeoQuery(searchParams);
  const freshnessMeta = getIntelligenceMeta(geoQueryState);
  const [isWhyChangedOpen, setIsWhyChangedOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'brand' | 'score'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedCompetitors = [...data.top_competitors].sort((a, b) => {
    if (sortBy === 'brand') {
      return sortOrder === 'asc'
        ? a.brand.localeCompare(b.brand)
        : b.brand.localeCompare(a.brand);
    } else {
      return sortOrder === 'asc'
        ? a.visibility_score - b.visibility_score
        : b.visibility_score - a.visibility_score;
    }
  });

  const handleSort = (column: 'brand' | 'score') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
      {/* A) Page Header */}
      <div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">GEO Overview</h1>
            <p className="text-muted-foreground mt-2">
              High-level GEO performance metrics and competitive positioning
            </p>
            {/* Compact metadata row */}
            <div className="mt-3 text-xs text-muted-foreground">
              Questions: {data.metadata.questions_count} · Topics: {data.metadata.topics_count} · Brands: {data.metadata.brands_count} · Last updated: {new Date(data.metadata.last_updated).toLocaleDateString()}
            </div>
            <div className="mt-2">
              <GeoJourneyHint />
            </div>
          </div>
          <GeoPageActions
            exportContext={{
              title: 'GEO Overview',
              description: 'Export includes KPIs, competitive positioning, and top sources.',
            }}
          />
        </div>
      </div>

      {/* Global Filters */}
      <GeoGlobalFilters />

      {/* Data Freshness */}
      <GeoDataFreshness {...freshnessMeta} />

      {/* B) KPI Row with 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GEO Score Card */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="text-sm font-medium text-muted-foreground">GEO Score</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="GEO Score information"
                >
                  <span className="text-xs leading-none">ⓘ</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>{getMetricDefinition("geoScore").tooltip.body}</p>
              </TooltipContent>
            </Tooltip>
            <MetricMethodologyDrawer metricId="geoScore" />
          </div>
          <div className="text-4xl font-bold">
            <AnimatedNumber value={data.geo_score.value} format="percent" />
          </div>
          <div className="mt-2">
            <MetricDelta
              type="geoScore"
              current={72}
              previous={68}
            />
          </div>
          <div className="mt-3">
            <ConfidenceStrip
              answerUnits={data.metadata.questions_count}
              questions={data.metadata.questions_count}
              models={1}
              lastRunLabel={new Date(data.metadata.last_updated).toLocaleDateString()}
            />
          </div>
        </div>

        {/* Reach Card */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="text-sm font-medium text-muted-foreground">Reach</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Reach information"
                >
                  <span className="text-xs leading-none">ⓘ</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>{getMetricDefinition("reach").tooltip.body}</p>
              </TooltipContent>
            </Tooltip>
            <MetricMethodologyDrawer metricId="reach" />
          </div>
          <div className="text-4xl font-bold flex items-center gap-2">
            <AnimatedNumber 
              value={data.visibility.reach * 100} 
              format="percent" 
            />
            {data.visibility.totalAnswerUnits !== undefined && (
              <LowSampleBadge
                metricId="reach"
                sampleSize={data.visibility.totalAnswerUnits}
              />
            )}
          </div>
          <div className="mt-2">
            <MetricDelta
              type="reach"
              current={65}
              previous={61}
            />
          </div>
          <div className="mt-3">
            <ConfidenceStrip
              answerUnits={data.visibility.totalAnswerUnits || data.metadata.questions_count}
              questions={data.metadata.questions_count}
              models={1}
              lastRunLabel={new Date(data.metadata.last_updated).toLocaleDateString()}
              lowSample={data.visibility.totalAnswerUnits !== undefined && data.visibility.totalAnswerUnits < 30}
              metricId="reach"
            />
          </div>
        </div>

        {/* Avg Position Card */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="text-sm font-medium text-muted-foreground">Avg Position</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Avg Position information"
                >
                  <span className="text-xs leading-none">ⓘ</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>{getMetricDefinition("avgPosition").tooltip.body}</p>
              </TooltipContent>
            </Tooltip>
            <MetricMethodologyDrawer metricId="avgPosition" />
          </div>
          <div className="text-4xl font-bold">
            <AnimatedNumber 
              value={data.visibility.average_position} 
              format="decimal" 
              decimals={1}
            />
          </div>
          <div className="mt-2">
            <MetricDelta
              type="avgPosition"
              current={2.3}
              previous={2.7}
            />
          </div>
          <div className="mt-3">
            <ConfidenceStrip
              answerUnits={data.visibility.totalAnswerUnits || data.metadata.questions_count}
              questions={data.metadata.questions_count}
              models={1}
              lastRunLabel={new Date(data.metadata.last_updated).toLocaleDateString()}
            />
          </div>
        </div>

        {/* Sentiment Card */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="text-sm font-medium text-muted-foreground">{getMetricDefinition("sentiment").title}</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Sentiment Score information"
                >
                  <span className="text-xs leading-none">ⓘ</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <div>
                  <p className="font-medium mb-1">{getMetricDefinition("sentiment").tooltip.title}</p>
                  <p className="text-sm">{getMetricDefinition("sentiment").tooltip.body}</p>
                  {getMetricDefinition("sentiment").tooltip.note && (
                    <p className="text-xs text-muted-foreground mt-1">{getMetricDefinition("sentiment").tooltip.note}</p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
            <MetricMethodologyDrawer metricId="sentiment" />
          </div>
          {/* Show sentiment score if available */}
          {data.sentiment.sentimentScorePct !== undefined && (
            <div className="text-2xl font-bold mb-3 flex items-center gap-2">
              {formatMetricValue("sentiment", data.sentiment.sentimentScorePct)}
              {data.sentiment.sentimentMentionsSampleSize !== undefined && (
                <LowSampleBadge
                  metricId="sentiment"
                  sampleSize={data.sentiment.sentimentMentionsSampleSize}
                />
              )}
            </div>
          )}
          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-700">Positive</span>
              <span className="font-medium">{(data.sentiment.positive * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${data.sentiment.positive * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Neutral</span>
              <span className="font-medium">{(data.sentiment.neutral * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gray-400 h-2 rounded-full"
                style={{ width: `${data.sentiment.neutral * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-700">Negative</span>
              <span className="font-medium">{(data.sentiment.negative * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${data.sentiment.negative * 100}%` }}
              />
            </div>
          </div>
          {/* One-line sentiment summary */}
          <div className="mt-3 text-xs text-muted-foreground">
            Predominantly positive sentiment with minimal negative mentions.
          </div>
          <div className="mt-3">
            <ConfidenceStrip
              answerUnits={data.sentiment.sentimentMentionsSampleSize || data.metadata.questions_count}
              questions={data.metadata.questions_count}
              models={1}
              lastRunLabel={new Date(data.metadata.last_updated).toLocaleDateString()}
              lowSample={data.sentiment.sentimentMentionsSampleSize !== undefined && data.sentiment.sentimentMentionsSampleSize < 30}
              metricId="sentiment"
            />
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Active Alerts</h3>
          </div>
          <GeoLink
            href="/intelligence/alerts"
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            View alerts →
          </GeoLink>
        </div>
        <div className="space-y-2">
          {alertsDemo
            .filter((a) => a.severity === 'High' || a.severity === 'Medium')
            .slice(0, 3)
            .map((alert) => (
              <div key={alert.id} className="text-sm">
                <span className="font-medium">{alert.title}</span>
                <span className="text-muted-foreground ml-2">• {alert.severity}</span>
              </div>
            ))}
        </div>
        <div className="text-xs text-muted-foreground mt-3">
          {alertsDemo.length} total alerts
        </div>
      </div>

      {/* Top Question Patterns */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Top Question Patterns</h3>
        <PatternChips
          patternIds={data.top_pattern_ids || []}
          topN={3}
          showExamplesOnHover={true}
          size="sm"
        />
      </div>

      {/* Top Topics Summary */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Top Topics</h3>
            <p className="text-xs text-muted-foreground">
              Topics with highest visibility scores
            </p>
          </div>
          <Link
            href="/intelligence/topic-performance"
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            View all topics →
          </Link>
        </div>
        <div className="space-y-2">
          {data.topTopics?.slice(0, 5).map((topic) => (
            <div
              key={topic.topicId}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <span className="text-sm font-medium">{topic.name}</span>
              <span className="text-sm font-bold">
                {topic.visibilityScorePct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Cited Sources */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Top Cited Sources</h3>
          </div>
          <GeoLink
            href="/intelligence/sources"
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            View all sources →
          </GeoLink>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {sourcesDemo.brands.acme.domains
            .sort((a, b) => b.citeSharePct - a.citeSharePct)
            .slice(0, 5)
            .map((source) => (
              <div key={source.domain} className="flex items-center gap-1.5">
                <span className="text-xs px-2 py-1 rounded border bg-muted/50 text-muted-foreground">
                  {source.domain}
                </span>
                <SourceCategoryChips categories={source.categories} max={1} size="sm" />
              </div>
            ))}
        </div>
        <div className="text-xs text-muted-foreground">
          {sourcesDemo.brands.acme.domains.length} domains • Snapshot: {sourcesDemo.snapshotLabel}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          <GeoLink
            href="/intelligence/sources?mode=gaps&compareTo=techrival"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Competitor gaps detected →
          </GeoLink>
        </div>
      </div>

      {/* C) Two Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visibility Summary */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">Visibility Summary</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Brand appears in <strong className="text-foreground">{(data.visibility.reach * 100).toFixed(0)}%</strong> of AI-generated answers for tracked topics.
            </p>
            <p>
              Average position is <strong className="text-foreground">{data.visibility.average_position.toFixed(1)}</strong>, indicating strong visibility relative to competitors.
            </p>
            <p>
              Visibility has improved across Cloud Infrastructure and AI Automation topics over the past 30 days.
            </p>
          </div>
        </div>

        {/* Sentiment Summary */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">Sentiment Summary</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">{(data.sentiment.positive * 100).toFixed(0)}%</strong> of mentions are positive, reflecting strong brand perception in AI answers.
            </p>
            <p>
              <strong className="text-foreground">{(data.sentiment.neutral * 100).toFixed(0)}%</strong> are neutral, and <strong className="text-foreground">{(data.sentiment.negative * 100).toFixed(0)}%</strong> are negative.
            </p>
            <p>
              Sentiment distribution shows healthy brand representation with minimal negative mentions.
            </p>
          </div>
        </div>
      </div>

      {/* D) Your Brand Rank + Competitors Table */}
      <div className="rounded-lg border bg-card p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Your Brand Rank</h3>
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <span className="text-2xl font-bold text-muted-foreground">#{data.your_brand_rank.rank}</span>
            <div>
              <div className="font-medium">{data.your_brand_rank.brand}</div>
              <div className="text-sm text-muted-foreground">
                {getMetricDefinition("visibility").title}: {formatMetricValue("visibility", data.your_brand_rank.visibility_score * 100)}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Competitors</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">
                    <button
                      onClick={() => handleSort('brand')}
                      className="hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      Brand
                      {sortBy === 'brand' && (
                        <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                  <th className="text-right py-3 px-4 font-medium">
                    <button
                      onClick={() => handleSort('score')}
                      className="hover:text-foreground transition-colors flex items-center gap-2 ml-auto"
                    >
                      {getMetricDefinition("visibility").title}
                      {sortBy === 'score' && (
                        <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedCompetitors.map((competitor, index) => (
                  <tr key={competitor.brand} className="border-b last:border-0">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground w-6">
                          {index + 2}
                        </span>
                        <span className="font-medium">{competitor.brand}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium">{formatMetricValue("visibility", competitor.visibility_score * 100)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* E) Collapsible "Why this changed" Section - Collapsed by default */}
      {data.why_it_changed && (
        <div className="rounded-lg border bg-card">
          <button
            onClick={() => setIsWhyChangedOpen(!isWhyChangedOpen)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Why This Changed</h3>
              {!isWhyChangedOpen && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {data.why_it_changed.preview}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Source: {data.why_it_changed.source_agent}
              </p>
            </div>
            <span className="text-muted-foreground ml-4">
              {isWhyChangedOpen ? '▼' : '▶'}
            </span>
          </button>
          {isWhyChangedOpen && (
            <div className="px-6 pb-6 pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.why_it_changed.summary}
              </p>
            </div>
          )}
        </div>
      )}

      {/* F) Footer Notice - Shortened */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground text-center">
          Read-only intelligence. No execution or automation.
        </p>
      </div>
      </div>
    </TooltipProvider>
  );
}

function GeoOverviewLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function GeoOverviewPage() {
  return (
    <Suspense fallback={<GeoOverviewLoading />}>
      <GeoOverviewContent />
    </Suspense>
  );
}
