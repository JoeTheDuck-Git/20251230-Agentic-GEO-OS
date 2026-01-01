'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { opportunityAnalysisDemo, Opportunity } from '@/lib/demo/geo-os/opportunity-analysis';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DriverChip } from '@/components/geo/DriverChip';
import { MetricChip } from '@/components/geo/MetricChip';
import { PatternChips } from '@/components/geo/PatternChips';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';
import { GeoLink } from '@/components/geo/GeoLink';
import { GeoJourneyHint } from '@/components/geo/GeoJourneyHint';
import { GeoDataFreshness } from '@/components/geo/GeoDataFreshness';
import { getOpportunityAnalysisMeta } from '@/lib/geo/meta/geoMeta';
import { parseGeoQuery } from '@/lib/geo/query/geoQuery';
import { useSearchParams } from 'next/navigation';
import { GeoEmptyState } from '@/components/geo/states/GeoEmptyState';
import { EMPTY_STATE_COPY } from '@/lib/geo/states/stateCopy';
import { AlertCircleIcon } from '@/components/geo/icons/GeoIcons';
import { GeoPageActions } from '@/components/geo/GeoPageActions';

function OpportunityAnalysisContent() {
  const data = opportunityAnalysisDemo;
  const searchParams = useSearchParams();
  const geoQueryState = parseGeoQuery(searchParams);
  const freshnessMeta = getOpportunityAnalysisMeta(geoQueryState);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(
    data.opportunities[0]?.opportunity_id || null
  );
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [driverFilter, setDriverFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'impact' | 'confidence' | 'priority' | 'effort'>('impact');

  const selectedOpportunity = useMemo(() => {
    return data.opportunities.find((opp) => opp.opportunity_id === selectedOpportunityId) || null;
  }, [selectedOpportunityId]);

  const filteredAndSortedOpportunities = useMemo(() => {
    let filtered = [...data.opportunities];

    // Apply filters
    if (topicFilter !== 'all') {
      filtered = filtered.filter((opp) => opp.topic_id === topicFilter);
    }
    if (driverFilter !== 'all') {
      filtered = filtered.filter((opp) => opp.driver === driverFilter);
    }
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((opp) => opp.priority === priorityFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'impact':
          const impactA = (a.target_state.reach - a.current_state.reach) + (a.current_state.avg_position - a.target_state.avg_position);
          const impactB = (b.target_state.reach - b.current_state.reach) + (b.current_state.avg_position - b.target_state.avg_position);
          return impactB - impactA;
        case 'confidence':
          return b.confidence - a.confidence;
        case 'priority':
          const priorityOrder: Record<'high' | 'medium' | 'low', number> = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'effort':
          const effortOrder: Record<'S' | 'M' | 'L', number> = { S: 1, M: 2, L: 3 };
          return effortOrder[a.effort] - effortOrder[b.effort];
        default:
          return 0;
      }
    });

    return filtered;
  }, [topicFilter, driverFilter, priorityFilter, sortBy, data.opportunities]);

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };


  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'S':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'M':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'L':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPatternTypeColor = (type: string) => {
    switch (type) {
      case 'correlation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'gap_cluster':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'volatility':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'sentiment_risk':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const uniqueTopics = useMemo(() => {
    const topics = new Set(data.opportunities.map((opp) => opp.topic_name));
    return Array.from(topics).sort();
  }, [data.opportunities]);

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Opportunity Analysis</h1>
              <p className="text-muted-foreground mt-2">
                Identified opportunities and pattern insights for improving GEO performance.
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                Generated by {data.meta.source_agent} at {new Date(data.meta.generated_at).toLocaleString()}
              </div>
              <div className="mt-2">
                <GeoJourneyHint />
              </div>
            </div>
            <GeoPageActions
              exportContext={{
                title: 'Opportunity Analysis',
                description: 'Export includes opportunities, pattern insights, and evidence.',
              }}
            />
          </div>
        </div>

        <GeoGlobalFilters />

        {/* Data Freshness */}
        <GeoDataFreshness {...freshnessMeta} />

        {/* Read-only callout */}
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Read-only view:</strong> Opportunities are identified by Reasoning Agent. No execution actions available.
          </p>
        </div>

        {/* KPI Row (4 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Opportunities</div>
            <div className="text-3xl font-bold">{data.kpis.opportunities_count}</div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">High Priority</div>
            <div className="text-3xl font-bold">{data.kpis.high_priority_count}</div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Estimated GEO Lift</div>
            <div className="text-3xl font-bold">
              {data.kpis.estimated_geo_lift.min}-{data.kpis.estimated_geo_lift.max}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">Demo range</div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Avg Confidence</div>
            <div className="text-3xl font-bold">{formatPercentage(data.kpis.avg_confidence * 100)}</div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-4 p-4 border rounded-lg bg-card">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Topic:</label>
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              <option value="all">All Topics</option>
              {uniqueTopics.map((topic) => (
                <option key={topic} value={data.opportunities.find((opp) => opp.topic_name === topic)?.topic_id}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Driver:</label>
            <select
              value={driverFilter}
              onChange={(e) => setDriverFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              <option value="all">All Drivers</option>
              <option value="reach">Reach</option>
              <option value="position">Position</option>
              <option value="sentiment">Sentiment</option>
              <option value="visibility">Visibility</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Priority:</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              <option value="impact">Impact</option>
              <option value="confidence">Confidence</option>
              <option value="priority">Priority</option>
              <option value="effort">Effort</option>
            </select>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: Opportunities List */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b bg-muted/50">
              <h3 className="text-lg font-semibold">Opportunities ({filteredAndSortedOpportunities.length})</h3>
            </div>
            {filteredAndSortedOpportunities.length === 0 ? (
              <div className="p-6">
                <GeoEmptyState
                  title={EMPTY_STATE_COPY.NO_OPPORTUNITIES.TITLE}
                  description={EMPTY_STATE_COPY.NO_OPPORTUNITIES.DESC}
                  icon={<AlertCircleIcon className="h-12 w-12 text-muted-foreground" />}
                  actions={[
                    { label: 'Open Topic Performance', href: '/intelligence/topic-performance', variant: 'default' },
                    { label: 'Open Content Gap Matrix', href: '/intelligence/content-gap-matrix', variant: 'outline' },
                  ]}
                />
              </div>
            ) : (
              <div className="divide-y max-h-[800px] overflow-y-auto">
                {filteredAndSortedOpportunities.map((opp) => (
                <div
                  key={opp.opportunity_id}
                  onClick={() => setSelectedOpportunityId(opp.opportunity_id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedOpportunityId === opp.opportunity_id
                      ? 'bg-blue-50 border-l-4 border-l-blue-500'
                      : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">{opp.title}</div>
                      <div className="text-xs text-muted-foreground mb-2">{opp.topic_name}</div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {opp.drivers.map((driver) => {
                          // Map gap key to metric id
                          const metricIdMap: Record<string, string> = {
                            reach_gap: "reachGap",
                            position_gap: "positionGap",
                            sentiment_gap: "sentimentGap",
                            visibility_gap: "visibilityGap",
                          };
                          const metricId = metricIdMap[driver] as any;
                          return (
                            <MetricChip
                              key={driver}
                              metricId={metricId}
                              variant="ghost"
                              size="sm"
                            />
                          );
                        })}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded border capitalize ${getPriorityColor(opp.priority)}`}>
                      {opp.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="text-muted-foreground">
                      Current: {formatPercentage(opp.current_state.reach)} reach, {opp.current_state.avg_position.toFixed(1)} pos
                    </div>
                    <div className="text-muted-foreground">→</div>
                    <div className="text-muted-foreground">
                      Target: {formatPercentage(opp.target_state.reach)} reach, {opp.target_state.avg_position.toFixed(1)} pos
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-muted-foreground">
                      Confidence: {formatPercentage(opp.confidence * 100)}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        Patterns: {opp.patternCoverage.patternsCount}
                      </span>
                      <PatternChips
                        patternIds={opp.patternCoverage.topPatternIds}
                        topN={3}
                        showExamplesOnHover={true}
                        size="sm"
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className={`text-xs px-2 py-0.5 rounded border cursor-help ${getEffortColor(opp.effort)}`}>
                            Effort: {opp.effort}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>Effort estimates content scope + pattern coverage: S = 1 primary page (3–8 question patterns), M = 1 pillar + 2–4 supporting pages (10–20 patterns), L = 1 pillar + 6–12 supporting pages (25–50 patterns). Read-only.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>

          {/* Right Panel: Selected Opportunity Details */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b bg-muted/50">
              <h3 className="text-lg font-semibold">Opportunity Details</h3>
            </div>
            <div className="p-6 space-y-6 max-h-[800px] overflow-y-auto">
              {selectedOpportunity ? (
                <>
                  <div>
                    <h4 className="font-semibold mb-2">{selectedOpportunity.title}</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-2 py-1 rounded border bg-muted text-muted-foreground">
                        {selectedOpportunity.topic_name}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded border capitalize ${getPriorityColor(selectedOpportunity.priority)}`}>
                        {selectedOpportunity.priority} priority
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className={`text-xs px-2 py-1 rounded border cursor-help ${getEffortColor(selectedOpportunity.effort)}`}>
                            Effort: {selectedOpportunity.effort}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>Effort estimates content scope + pattern coverage: S = 1 primary page (3–8 question patterns), M = 1 pillar + 2–4 supporting pages (10–20 patterns), L = 1 pillar + 6–12 supporting pages (25–50 patterns). Read-only.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Driver</h5>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <MetricChip
                        metricId={selectedOpportunity.driver as any}
                        variant="ghost"
                        size="sm"
                      />
                      {selectedOpportunity.drivers.map((driver, idx) => {
                        const metricIdMap: Record<string, string> = {
                          reach_gap: "reachGap",
                          position_gap: "positionGap",
                          sentiment_gap: "sentimentGap",
                          visibility_gap: "visibilityGap",
                        };
                        const metricId = metricIdMap[driver] as any;
                        return (
                          <MetricChip
                            key={idx}
                            metricId={metricId}
                            mode="gap"
                            variant="ghost"
                            size="sm"
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Rationale</h5>
                    <p className="text-sm text-muted-foreground">{selectedOpportunity.rationale}</p>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Signals Used</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedOpportunity.signals_used.map((signal, i) => (
                        <li key={i}>{signal}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Evidence Snapshot</h5>
                    <div className="space-y-3 text-sm">
                      {selectedOpportunity.evidence_snapshot.question_patterns && (
                        <div>
                          <div className="font-medium text-muted-foreground mb-1">Question Patterns:</div>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {selectedOpportunity.evidence_snapshot.question_patterns.map((pattern, i) => (
                              <li key={i}>{pattern}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedOpportunity.evidence_snapshot.competitor_advantage && (
                        <div>
                          <div className="font-medium text-muted-foreground mb-1">Competitor Advantage:</div>
                          <p className="text-muted-foreground">{selectedOpportunity.evidence_snapshot.competitor_advantage}</p>
                        </div>
                      )}
                      {selectedOpportunity.evidence_snapshot.sentiment_notes && (
                        <div>
                          <div className="font-medium text-muted-foreground mb-1">Sentiment Notes:</div>
                          <p className="text-muted-foreground">{selectedOpportunity.evidence_snapshot.sentiment_notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Pattern Coverage</h5>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium text-muted-foreground mb-2">
                          Patterns: {selectedOpportunity.patternCoverage.patternsCount}
                        </div>
                        <PatternChips
                          patternIds={selectedOpportunity.patternCoverage.topPatternIds}
                          topN={3}
                          showExamplesOnHover={true}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h5 className="font-medium mb-2">Links</h5>
                    <div className="space-y-2">
                      {selectedOpportunity.related_actionable_item_id && (
                        <GeoLink
                          href={`/decisions/actionable-items?from=${selectedOpportunity.related_actionable_item_id}`}
                          className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          View related Actionable Item →
                        </GeoLink>
                      )}
                      {selectedOpportunity.related_execution_brief_id && (
                        <GeoLink
                          href={`/execution-prep/execution-briefs?brief=${selectedOpportunity.related_execution_brief_id}`}
                          className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          View Execution Brief →
                        </GeoLink>
                      )}
                      {!selectedOpportunity.related_actionable_item_id && !selectedOpportunity.related_execution_brief_id && (
                        <p className="text-sm text-muted-foreground">No related items available</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <p>Select an opportunity from the list to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pattern Insights */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pattern Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.pattern_insights.map((pattern) => (
              <div key={pattern.pattern_id} className="rounded-lg border bg-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded border capitalize ${getPatternTypeColor(pattern.type)}`}>
                    {pattern.type.replace('_', ' ')}
                  </span>
                  <div className="text-xs text-muted-foreground">
                    {formatPercentage(pattern.confidence * 100)} confidence
                  </div>
                </div>
                <p className="text-sm font-medium mb-3">{pattern.statement}</p>
                <div className="mb-3">
                  <div className="text-xs font-medium text-muted-foreground mb-1">What to watch:</div>
                  <p className="text-xs text-muted-foreground">{pattern.what_to_watch}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pattern.related_topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2 py-0.5 rounded border bg-muted text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Boundary Footnote */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Read-only intelligence. Opportunities are identified by Reasoning Agent. No execution actions available.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}

function OpportunityAnalysisLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function OpportunityAnalysisPage() {
  return (
    <Suspense fallback={<OpportunityAnalysisLoading />}>
      <OpportunityAnalysisContent />
    </Suspense>
  );
}
