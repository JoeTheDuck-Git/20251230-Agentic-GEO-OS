'use client';

import { useState, useMemo, useEffect } from 'react';
import { topicPerformanceDemo } from '@/lib/demo/geo-os/topic-performance';
import { PatternChips } from '@/components/geo/PatternChips';
import { DriverChip } from '@/components/geo/DriverChip';
import { MetricChip } from '@/components/geo/MetricChip';
import { LowSampleBadge } from '@/components/ui/low-sample-badge';
import { getMetricDefinition, formatMetricValue } from '@/lib/geo/metrics/metricRegistry';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';
import { GeoDataFreshness } from '@/components/geo/GeoDataFreshness';
import { getTopicPerformanceMeta } from '@/lib/geo/meta/geoMeta';
import { parseGeoQuery } from '@/lib/geo/query/geoQuery';
import { useSearchParams } from 'next/navigation';
import { GeoPageActions } from '@/components/geo/GeoPageActions';

type SortOption = 'visibility_desc' | 'reach_desc' | 'position_asc' | 'name_asc';

export default function TopicPerformancePage() {
  const data = topicPerformanceDemo;
  const searchParams = useSearchParams();
  const geoQueryState = parseGeoQuery(searchParams);
  const freshnessMeta = getTopicPerformanceMeta(geoQueryState);
  const primaryBrand = data.meta.brand; // 'Acme Corp'
  const [topicSearch, setTopicSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('visibility_desc');

  // Compute derived values for sorting
  const topicsWithSortValues = useMemo(() => {
    const primaryBrand = data.meta.brand;
    return data.topics.map((topic) => {
      const primaryBrandReach = topic.reach.find((b) => b.brand === primaryBrand)?.pct ?? 0;
      const primaryBrandPosition = topic.position.find((b) => b.brand === primaryBrand)?.pct ?? 0;
      // Convert position share to position score proxy (higher share = better position = lower number)
      const positionScoreProxy = 100 - primaryBrandPosition;
      return {
        ...topic,
        primaryBrandReachPct: primaryBrandReach,
        positionScoreProxy,
      };
    });
  }, [data.topics, data.meta.brand]);

  // Filter and sort topics
  const filteredAndSortedTopics = useMemo(() => {
    let filtered = topicsWithSortValues;

    // Apply search filter
    if (topicSearch.trim()) {
      const searchLower = topicSearch.toLowerCase();
      filtered = filtered.filter((topic) =>
        topic.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'visibility_desc':
          return b.visibilityScorePct - a.visibilityScorePct;
        case 'reach_desc':
          return b.primaryBrandReachPct - a.primaryBrandReachPct;
        case 'position_asc':
          return a.positionScoreProxy - b.positionScoreProxy;
        case 'name_asc':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [topicsWithSortValues, topicSearch, sortBy]);

  // Default selected topic is first in sorted list
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Update selected topic when sort/filter changes (if current selection is filtered out, use first)
  useEffect(() => {
    if (filteredAndSortedTopics.length > 0) {
      const currentSelected = filteredAndSortedTopics.find(
        (t) => t.topicId === selectedTopicId
      );
      if (!currentSelected) {
        setSelectedTopicId(filteredAndSortedTopics[0].topicId);
      }
    } else {
      setSelectedTopicId(null);
    }
  }, [filteredAndSortedTopics, selectedTopicId]);

  const selectedTopic = useMemo(() => {
    return filteredAndSortedTopics.find((topic) => topic.topicId === selectedTopicId) || null;
  }, [selectedTopicId, filteredAndSortedTopics]);

  const formatPercentage = (num: number) => {
    return `${num.toFixed(0)}%`;
  };

  // Helper to sort and pin primary brand to top
  const sortWithPrimaryFirst = <T extends { brand: string; pct: number }>(
    items: T[],
    primaryBrandName: string
  ): T[] => {
    const primary = items.find((item) => item.brand === primaryBrandName);
    const others = items
      .filter((item) => item.brand !== primaryBrandName)
      .sort((a, b) => b.pct - a.pct); // Sort others by pct desc

    if (primary) {
      return [primary, ...others];
    }
    // Fallback: sort all by pct desc if primary not found
    return [...items].sort((a, b) => b.pct - a.pct);
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Topic Performance</h1>
              <p className="text-muted-foreground mt-2">
                Topic-level Reach and Position analysis (read-only).
              </p>
            </div>
            <GeoPageActions
              exportContext={{
                title: 'Topic Performance',
                description: 'Export includes topic metrics, reach, position, and pattern coverage.',
              }}
            />
          </div>
        </div>

        <GeoGlobalFilters />

        {/* Data Freshness */}
        <GeoDataFreshness {...freshnessMeta} />

        {/* Read-only banner */}
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Read-only view:</strong> Topic performance is for analysis only. No execution actions available.
          </p>
        </div>

        {/* Top Controls Row */}
        <div className="rounded-lg border bg-card p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Read-only metadata */}
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Brand:</span>{' '}
                <span className="font-medium">{data.meta.brand}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Region:</span>{' '}
                <span className="font-medium">{data.meta.region}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Time Range:</span>{' '}
                <span className="font-medium">{data.meta.timeRangeLabel}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Snapshot:</span>{' '}
                <span className="font-medium">{data.meta.snapshot}</span>
              </div>
            </div>

            {/* Search and Sort */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-muted-foreground">Search:</label>
                <input
                  type="text"
                  value={topicSearch}
                  onChange={(e) => setTopicSearch(e.target.value)}
                  placeholder="Search topics..."
                  className="px-3 py-1.5 text-sm border rounded-md bg-background w-48"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-muted-foreground">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 text-sm border rounded-md bg-background"
                >
                  <option value="visibility_desc">{getMetricDefinition("visibility").title} (High to Low)</option>
                  <option value="reach_desc">Reach (High to Low)</option>
                  <option value="position_asc">Avg Position (Low to High)</option>
                  <option value="name_asc">Name (A to Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Topic List */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b bg-muted/50">
              <h3 className="text-lg font-semibold">Topics ({filteredAndSortedTopics.length})</h3>
            </div>
            <div className="divide-y max-h-[800px] overflow-y-auto">
              {filteredAndSortedTopics.map((topic, index) => (
                <div
                  key={topic.topicId}
                  onClick={() => setSelectedTopicId(topic.topicId)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedTopicId === topic.topicId
                      ? 'bg-blue-50 border-l-4 border-l-blue-500'
                      : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xs font-medium text-muted-foreground w-8">
                        #{index + 1}
                      </span>
                      <span className="font-medium text-sm">{topic.name}</span>
                    </div>
                    <span className="text-sm font-bold ml-4">
                      {formatMetricValue("visibility", topic.visibilityScorePct)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Topic Detail Panel */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b bg-muted/50">
              <h3 className="text-lg font-semibold">Topic Details</h3>
            </div>
            <div className="p-6 space-y-6 max-h-[800px] overflow-y-auto">
              {selectedTopic ? (
                <>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{selectedTopic.name}</h4>
                    <div className="text-3xl font-bold mb-1 flex items-center gap-2">
                      <span>
                        {getMetricDefinition("visibility").title}: {formatMetricValue("visibility", selectedTopic.visibilityScorePct)}
                      </span>
                      <MetricChip metricId="visibility" variant="ghost" size="sm" />
                    </div>
                  </div>

                  {/* Two Columns: Reach and Top Slot Share Leaderboards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Reach */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <h5 className="font-medium">Reach</h5>
                        <MetricChip metricId="reach" variant="ghost" size="sm" />
                      </div>
                      <div className="space-y-2">
                        {sortWithPrimaryFirst(selectedTopic.reach, primaryBrand).map((item, index) => (
                          <div
                            key={item.brand}
                            className="flex items-center justify-between p-2 border rounded"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted-foreground w-6">
                                #{index + 1}
                              </span>
                              <span className="text-sm">{item.brand}</span>
                            </div>
                            <span className="text-sm font-medium">
                              {formatPercentage(item.pct)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Position */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <h5 className="font-medium">Position</h5>
                        <MetricChip metricId="avgPosition" variant="ghost" size="sm" />
                      </div>
                      <div className="space-y-2">
                        {sortWithPrimaryFirst(selectedTopic.position, primaryBrand).map((item, index) => (
                          <div
                            key={item.brand}
                            className="flex items-center justify-between p-2 border rounded"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted-foreground w-6">
                                #{index + 1}
                              </span>
                              <span className="text-sm">{item.brand}</span>
                            </div>
                            <span className="text-sm font-medium">
                              {formatPercentage(item.pct)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Question Patterns */}
                  <div>
                    <h5 className="font-medium mb-2">Top Question Patterns (Top 5)</h5>
                    <p className="text-xs text-muted-foreground mb-3">
                      Top Question Patterns reflect recurring ways users ask about this topic in AI answers.
                    </p>
                    <PatternChips
                      patternIds={selectedTopic.topPatternIds}
                      topN={5}
                      showExamplesOnHover={true}
                      size="sm"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Hover a pattern to see example questions.
                    </p>
                  </div>

                  {/* Topic Question Examples */}
                  <div>
                    <h5 className="font-medium mb-2">Topic Question Examples</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {selectedTopic.questionExamples.map((question, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <p>Select a topic from the list to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Boundary Footnote */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Read-only intelligence. Topic performance data is for analysis only. No execution actions available.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}
