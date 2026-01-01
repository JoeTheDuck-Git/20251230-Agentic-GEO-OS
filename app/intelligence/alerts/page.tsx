'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { alertsDemo, Alert, AlertSeverity, AlertType } from '@/lib/demo/geo/alerts.demo';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';
import { CiteShareDelta } from '@/components/geo/CiteShareDelta';
import { MetricDelta } from '@/components/ui/metric-delta';
import Link from 'next/link';
import { GeoLink } from '@/components/geo/GeoLink';
import { GeoJourneyHint } from '@/components/geo/GeoJourneyHint';
import { GeoDataFreshness } from '@/components/geo/GeoDataFreshness';
import { getAlertsMeta } from '@/lib/geo/meta/geoMeta';
import { parseGeoQuery } from '@/lib/geo/query/geoQuery';
import { useSearchParams } from 'next/navigation';
import { GeoEmptyState } from '@/components/geo/states/GeoEmptyState';
import { EMPTY_STATE_COPY } from '@/lib/geo/states/stateCopy';
import { SearchIcon } from '@/components/geo/icons/GeoIcons';
import { GeoPageActions } from '@/components/geo/GeoPageActions';

type SortOption = 'newest' | 'severity';

function AlertsContent() {
  const searchParams = useSearchParams();
  const geoQueryState = parseGeoQuery(searchParams);
  const freshnessMeta = getAlertsMeta(geoQueryState);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<AlertType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const filteredAndSortedAlerts = useMemo(() => {
    let filtered = [...alertsDemo];

    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchLower) ||
          alert.summary.toLowerCase().includes(searchLower) ||
          alert.topic?.toLowerCase().includes(searchLower) ||
          alert.competitor?.toLowerCase().includes(searchLower) ||
          alert.domain?.toLowerCase().includes(searchLower)
      );
    }

    if (severityFilter !== 'all') {
      filtered = filtered.filter((alert) => alert.severity === severityFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((alert) => alert.type === typeFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime();
      } else {
        const severityOrder = { High: 3, Medium: 2, Low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
    });

    return filtered;
  }, [searchQuery, severityFilter, typeFilter, sortBy]);

  useEffect(() => {
    if (filteredAndSortedAlerts.length > 0 && !selectedAlert) {
      setSelectedAlert(filteredAndSortedAlerts[0].id);
    }
  }, [filteredAndSortedAlerts, selectedAlert]);

  const selectedAlertData = useMemo(() => {
    if (!selectedAlert) return null;
    return filteredAndSortedAlerts.find((a) => a.id === selectedAlert) || null;
  }, [selectedAlert, filteredAndSortedAlerts]);

  const getSeverityBadgeClass = (severity: AlertSeverity) => {
    switch (severity) {
      case 'High':
        return 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400';
      case 'Medium':
        return 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-400';
      case 'Low':
        return 'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Alerts</h1>
            <p className="text-muted-foreground mt-2">
              Monitoring signals from GEO snapshots. Read-only.
            </p>
            <div className="mt-2">
              <GeoJourneyHint />
            </div>
          </div>
          <GeoPageActions
            exportContext={{
              title: 'Alerts',
              description: 'Export includes all alerts with severity, context, and recommended next steps.',
            }}
          />
        </div>
      </div>

      <GeoGlobalFilters />

      {/* Data Freshness */}
      <GeoDataFreshness {...freshnessMeta} />

      {/* Controls */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-muted-foreground">Search:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alerts..."
              className="px-3 py-1.5 text-sm border rounded-md bg-background flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Severity:</label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              <option value="all">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Type:</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              <option value="all">All</option>
              <option value="ReachDrop">Reach Drop</option>
              <option value="SentimentSpike">Sentiment Spike</option>
              <option value="CompetitorOvertake">Competitor Overtake</option>
              <option value="NewCompetitorOnlySource">New Competitor Source</option>
              <option value="VisibilityDrop">Visibility Drop</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              <option value="newest">Newest</option>
              <option value="severity">Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Alerts List */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="text-lg font-semibold">Alerts ({filteredAndSortedAlerts.length})</h3>
          </div>
          {filteredAndSortedAlerts.length === 0 ? (
            <div className="p-6">
              <GeoEmptyState
                title={EMPTY_STATE_COPY.NO_ALERTS.TITLE}
                description={EMPTY_STATE_COPY.NO_ALERTS.DESC}
                icon={<SearchIcon className="h-12 w-12 text-muted-foreground" />}
                actions={[
                  { label: 'Go to GEO Overview', href: '/intelligence/geo-overview', variant: 'default' },
                  { label: 'View Sources', href: '/intelligence/sources', variant: 'outline' },
                ]}
              />
            </div>
          ) : (
            <div className="divide-y max-h-[800px] overflow-y-auto">
              {filteredAndSortedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedAlert === alert.id
                      ? 'bg-blue-50 border-l-4 border-l-blue-500'
                      : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded border ${getSeverityBadgeClass(alert.severity)}`}
                    >
                      {alert.severity}
                    </span>
                    <span className="font-medium text-sm flex-1">{alert.title}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(alert.detectedAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Alert Detail */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="text-lg font-semibold">Alert Details</h3>
          </div>
          <div className="p-6 space-y-6 max-h-[800px] overflow-y-auto">
            {selectedAlertData ? (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs px-2 py-1 rounded border ${getSeverityBadgeClass(selectedAlertData.severity)}`}
                    >
                      {selectedAlertData.severity}
                    </span>
                    <span className="text-xs px-2 py-1 rounded border bg-muted/50 text-muted-foreground">
                      {selectedAlertData.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{selectedAlertData.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedAlertData.summary}</p>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Context</h5>
                  <div className="space-y-2 text-sm">
                    {selectedAlertData.topic && (
                      <div>
                        <span className="text-muted-foreground">Topic:</span>{' '}
                        <span className="font-medium">{selectedAlertData.topic}</span>
                      </div>
                    )}
                    {selectedAlertData.competitor && (
                      <div>
                        <span className="text-muted-foreground">Competitor:</span>{' '}
                        <span className="font-medium">{selectedAlertData.competitor}</span>
                      </div>
                    )}
                    {selectedAlertData.domain && (
                      <div>
                        <span className="text-muted-foreground">Domain:</span>{' '}
                        <span className="font-medium">{selectedAlertData.domain}</span>
                      </div>
                    )}
                    {selectedAlertData.deltaPp !== undefined && selectedAlertData.metricKey && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Delta:</span>
                        {selectedAlertData.metricKey === 'visibility' || selectedAlertData.metricKey === 'reach' ? (
                          <CiteShareDelta deltaPp={selectedAlertData.deltaPp} />
                        ) : (
                          <MetricDelta
                            type={selectedAlertData.metricKey}
                            current={0}
                            previous={-selectedAlertData.deltaPp}
                          />
                        )}
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Detected:</span>{' '}
                      <span>{new Date(selectedAlertData.detectedAt).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Snapshot:</span>{' '}
                      <span>{selectedAlertData.snapshot}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Recommended Next Steps</h5>
                  <div className="space-y-2">
                    {selectedAlertData.recommendedNextStep.map((step, index) => (
                      <GeoLink
                        key={index}
                        href={step.href}
                        className="block px-4 py-2 text-sm border rounded-md hover:bg-muted transition-colors"
                      >
                        {step.label} →
                      </GeoLink>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <p>Select an alert from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertsLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function AlertsPage() {
  return (
    <Suspense fallback={<AlertsLoading />}>
      <AlertsContent />
    </Suspense>
  );
}

