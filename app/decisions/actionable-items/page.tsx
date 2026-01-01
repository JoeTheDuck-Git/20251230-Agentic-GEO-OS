'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { actionableItemsDemo } from '@/lib/demo/geo-os/actionable-items';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';
import { GeoLink } from '@/components/geo/GeoLink';
import { GeoJourneyHint } from '@/components/geo/GeoJourneyHint';
import { GeoDataFreshness } from '@/components/geo/GeoDataFreshness';
import { getActionableItemsMeta } from '@/lib/geo/meta/geoMeta';
import { parseGeoQuery } from '@/lib/geo/query/geoQuery';
import { useSearchParams } from 'next/navigation';
import { GeoEmptyState, FileXIcon } from '@/components/geo/states/GeoEmptyState';
import { EMPTY_STATE_COPY } from '@/lib/geo/states/stateCopy';

type FocusArea = 'all' | 'Content Coverage' | 'Structural Improvement' | 'Sentiment Improvement' | 'Authority Signal' | 'Topic Expansion';
type RiskLevel = 'all' | 'low' | 'medium' | 'high';
type SortBy = 'confidence' | 'priority';

function ActionableItemsContent() {
  const data = actionableItemsDemo;
  const searchParams = useSearchParams();
  const geoQueryState = parseGeoQuery(searchParams);
  const freshnessMeta = getActionableItemsMeta(geoQueryState);
  const [focusAreaFilter, setFocusAreaFilter] = useState<FocusArea>('all');
  const [riskFilter, setRiskFilter] = useState<RiskLevel>('all');
  const [sortBy, setSortBy] = useState<SortBy>('confidence');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [acknowledgedItems, setAcknowledgedItems] = useState<Set<string>>(new Set());

  const focusAreas = Array.from(new Set(data.items.map(item => item.focus_area)));
  const highPriorityCount = data.items.filter(item => item.priority === 'high').length;
  const governanceWarnings = data.items.filter(item => item.governance.status === 'warning').length;

  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...data.items];

    // Apply filters
    if (focusAreaFilter !== 'all') {
      filtered = filtered.filter(item => item.focus_area === focusAreaFilter);
    }
    if (riskFilter !== 'all') {
      filtered = filtered.filter(item => item.risk_level === riskFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'confidence') {
        return b.confidence - a.confidence;
      } else {
        // Priority sorting: high > medium > low
        const priorityOrder: Record<'high' | 'medium' | 'low', number> = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });

    return filtered;
  }, [data.items, focusAreaFilter, riskFilter, sortBy]);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const toggleAcknowledged = (itemId: string) => {
    const newAcknowledged = new Set(acknowledgedItems);
    if (newAcknowledged.has(itemId)) {
      newAcknowledged.delete(itemId);
    } else {
      newAcknowledged.add(itemId);
    }
    setAcknowledgedItems(newAcknowledged);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* A) Header */}
      <div>
        <h1 className="text-3xl font-bold">Actionable Items</h1>
        <p className="text-muted-foreground mt-2">
          Decision prompts derived from GEO signals. Review-only — no execution.
        </p>
        <div className="mt-2">
          <GeoJourneyHint />
        </div>
      </div>

      <GeoGlobalFilters />

      {/* Data Freshness */}
      <GeoDataFreshness {...freshnessMeta} />

      {/* B) Summary strip */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">
            Items: <strong className="text-foreground">{data.items.length}</strong> · 
            High priority: <strong className="text-foreground">{highPriorityCount}</strong> · 
            Governance warnings: <strong className="text-foreground">{governanceWarnings}</strong>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Primary output: Strategy Agent (non-executable).
        </div>
      </div>

      {/* C) Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 border rounded-lg bg-card">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Focus Area:</label>
          <select
            value={focusAreaFilter}
            onChange={(e) => setFocusAreaFilter(e.target.value as FocusArea)}
            className="px-3 py-1.5 text-sm border rounded-md bg-background"
          >
            <option value="all">All</option>
            {focusAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Risk:</label>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value as RiskLevel)}
            className="px-3 py-1.5 text-sm border rounded-md bg-background"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-3 py-1.5 text-sm border rounded-md bg-background"
          >
            <option value="confidence">Confidence</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      {/* D) Items list as Cards */}
      {filteredAndSortedItems.length === 0 ? (
        <GeoEmptyState
          title={EMPTY_STATE_COPY.NO_ACTIONABLE_ITEMS.TITLE}
          description={EMPTY_STATE_COPY.NO_ACTIONABLE_ITEMS.DESC}
          icon={<FileXIcon className="h-12 w-12 text-muted-foreground" />}
          actions={[
            { label: 'Open Opportunity Analysis', href: '/decisions/opportunity-analysis', variant: 'default' },
            { label: 'View Topic Performance', href: '/intelligence/topic-performance', variant: 'outline' },
          ]}
        />
      ) : (
        <div className="space-y-4">
          {filteredAndSortedItems.map((item) => {
          const isGovernanceExpanded = expandedItems.has(`${item.id}-governance`);
          
          return (
            <div key={item.id} className="rounded-lg border bg-card p-6">
              {/* Title + badges */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded border bg-muted text-muted-foreground">
                      {item.focus_area}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded border capitalize ${getPriorityColor(item.priority)}`}>
                      {item.priority} priority
                    </span>
                    <span className={`text-xs px-2 py-1 rounded border capitalize ${getRiskColor(item.risk_level)}`}>
                      {item.risk_level} risk
                    </span>
                    {item.governance.status === 'warning' && (
                      <span className="text-xs px-2 py-1 rounded border bg-orange-100 text-orange-800 border-orange-200">
                        Governance Warning
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Confidence indicator - more compact */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Confidence: {(item.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className="bg-blue-600 h-1 rounded-full transition-all"
                    style={{ width: `${item.confidence * 100}%` }}
                  />
                </div>
              </div>

              {/* Accordion: Rationale (Reasoning Agent) */}
              <div className="mb-3">
                <button
                  onClick={() => toggleExpanded(`${item.id}-rationale`)}
                  className="w-full flex items-center justify-between text-left p-3 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium">Rationale (Reasoning Agent)</span>
                  <span className="text-muted-foreground">
                    {expandedItems.has(`${item.id}-rationale`) ? '▼' : '▶'}
                  </span>
                </button>
                {expandedItems.has(`${item.id}-rationale`) && (
                  <div className="px-3 pb-3 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.rationale.summary}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion: Evidence (Signals) */}
              <div className="mb-4">
                <button
                  onClick={() => toggleExpanded(`${item.id}-evidence`)}
                  className="w-full flex items-center justify-between text-left p-3 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium">Evidence (Signals)</span>
                  <span className="text-muted-foreground">
                    {expandedItems.has(`${item.id}-evidence`) ? '▼' : '▶'}
                  </span>
                </button>
                {expandedItems.has(`${item.id}-evidence`) && (
                  <div className="px-3 pb-3 pt-0">
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {item.evidence.map((evidence, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-muted-foreground mt-1">•</span>
                          <span>{evidence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Governance warning note - compact and collapsible */}
              {item.governance.status === 'warning' && item.governance.notes && (
                <div className="mb-4">
                  <button
                    onClick={() => toggleExpanded(`${item.id}-governance`)}
                    className="w-full flex items-center justify-between text-left p-2 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-orange-900">Governance Note</span>
                      {!isGovernanceExpanded && (
                        <span className="text-xs text-orange-800 line-clamp-1">
                          {item.governance.notes}
                        </span>
                      )}
                    </div>
                    <span className="text-orange-800 text-xs ml-2">
                      {isGovernanceExpanded ? '▼' : '▶'}
                    </span>
                  </button>
                  {isGovernanceExpanded && (
                    <div className="px-2 pt-2 pb-2 bg-orange-50 border-x border-b border-orange-200 rounded-b-lg">
                      <p className="text-xs text-orange-800 leading-relaxed">
                        {item.governance.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Footer: Acknowledge toggle + CTA */}
              <div className="flex items-center justify-between pt-4 border-t">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acknowledgedItems.has(item.id)}
                    onChange={() => toggleAcknowledged(item.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-muted-foreground">Acknowledge</span>
                </label>
                <GeoLink
                  href={`/execution-prep/execution-briefs?from=${item.id}`}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  View Execution Brief →
                </GeoLink>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* F) Footer boundary */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground text-center">
          Decision-only. No execution.
        </p>
      </div>
    </div>
  );
}

function ActionableItemsLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function ActionableItemsPage() {
  return (
    <Suspense fallback={<ActionableItemsLoading />}>
      <ActionableItemsContent />
    </Suspense>
  );
}
