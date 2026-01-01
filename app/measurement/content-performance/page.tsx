'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { measurementDemo, ContentAsset } from '@/lib/demo/geo/measurement.demo';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';
import { GeoLink } from '@/components/geo/GeoLink';
import { GeoJourneyHint } from '@/components/geo/GeoJourneyHint';
import { parseAssetId, defaultAssetId, filterAssetsByQuery } from '@/lib/geo/measurement/assetSelection';
import { parseGeoQuery } from '@/lib/geo/query/geoQuery';
import { MetricDeltaSimple } from '@/components/geo/MetricDeltaSimple';
import { PatternChips } from '@/components/geo/PatternChips';
import { GeoDataFreshness } from '@/components/geo/GeoDataFreshness';
import { getMeasurementMeta } from '@/lib/geo/meta/geoMeta';
import { GeoEmptyState } from '@/components/geo/states/GeoEmptyState';
import { EMPTY_STATE_COPY } from '@/lib/geo/states/stateCopy';
import { FileXIcon } from '@/components/geo/states/GeoEmptyState';
import { GeoPageActions } from '@/components/geo/GeoPageActions';

export default function ContentPerformancePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const assetIdFromUrl = parseAssetId(searchParams);
  const geoQueryState = parseGeoQuery(searchParams);
  const freshnessMeta = getMeasurementMeta(geoQueryState);
  
  const filteredAssets = useMemo(
    () => filterAssetsByQuery(measurementDemo.assets, geoQueryState),
    [geoQueryState]
  );
  
  const defaultId = useMemo(() => defaultAssetId(filteredAssets), [filteredAssets]);
  const selectedAssetId = assetIdFromUrl || defaultId;
  
  const selectedAsset = useMemo(
    () => filteredAssets.find(a => a.id === selectedAssetId) || null,
    [filteredAssets, selectedAssetId]
  );
  
  const metrics = selectedAsset
    ? measurementDemo.metricsByAsset[selectedAsset.id]
    : null;

  const updateAsset = (newAssetId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('asset', newAssetId);
    router.replace(`/measurement/content-performance?${params.toString()}`, { scroll: false });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Content Performance</h1>
            <p className="text-muted-foreground mt-2">
              Performance of generated content assets (demo GA4). Read-only.
            </p>
            <div className="mt-2">
              <GeoJourneyHint />
            </div>
          </div>
          <GeoPageActions
            exportContext={{
              title: 'Content Performance',
              description: 'Export includes asset metrics, KPIs, and baseline comparisons.',
            }}
          />
        </div>
      </div>

      <GeoGlobalFilters />

      {/* Top Controls Row */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Content Asset:</label>
            <select
              value={selectedAssetId || ''}
              onChange={(e) => updateAsset(e.target.value)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background min-w-[300px]"
            >
              {filteredAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.title} ({asset.status})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Baseline:</label>
            <select
              value="previous"
              disabled
              className="px-3 py-1.5 text-sm border rounded-md bg-muted text-muted-foreground"
            >
              <option>Previous period (same duration)</option>
            </select>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t">
          <GeoDataFreshness {...freshnessMeta} />
        </div>
      </div>

      {selectedAsset && metrics ? (
        <>
          {/* KPI Cards with Deltas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">Sessions</div>
              <div className="text-3xl font-bold">{formatNumber(metrics.current.sessions)}</div>
              <div className="mt-2">
                <MetricDeltaSimple
                  current={metrics.current.sessions}
                  baseline={metrics.baseline.sessions}
                  format="number"
                  higherIsBetter={true}
                />
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">Clicks</div>
              <div className="text-3xl font-bold">{formatNumber(metrics.current.clicks)}</div>
              <div className="mt-2">
                <MetricDeltaSimple
                  current={metrics.current.clicks}
                  baseline={metrics.baseline.clicks}
                  format="number"
                  higherIsBetter={true}
                />
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">Avg Engagement Time</div>
              <div className="text-3xl font-bold">{formatTime(metrics.current.avgEngagementTimeSec)}</div>
              <div className="mt-2">
                <MetricDeltaSimple
                  current={metrics.current.avgEngagementTimeSec}
                  baseline={metrics.baseline.avgEngagementTimeSec}
                  format="time"
                  higherIsBetter={true}
                />
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">Conversions</div>
              <div className="text-3xl font-bold">{formatNumber(metrics.current.conversions)}</div>
              <div className="mt-2">
                <MetricDeltaSimple
                  current={metrics.current.conversions}
                  baseline={metrics.baseline.conversions}
                  format="number"
                  higherIsBetter={true}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Tables */}
            <div className="lg:col-span-2 space-y-6">
              {/* Top Queries Table */}
              <div className="rounded-lg border bg-card">
                <div className="p-4 border-b bg-muted/50">
                  <h3 className="text-lg font-semibold">Top Queries</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-3 px-4 font-medium text-sm">Query</th>
                        <th className="text-right py-3 px-4 font-medium text-sm">Clicks</th>
                        <th className="text-right py-3 px-4 font-medium text-sm">CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.current.topQueries.map((query, idx) => (
                        <tr key={idx} className="border-b hover:bg-muted/30">
                          <td className="py-3 px-4 text-sm">{query.query}</td>
                          <td className="py-3 px-4 text-right text-sm">{formatNumber(query.clicks)}</td>
                          <td className="py-3 px-4 text-right text-sm">{query.ctrPct.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Channels Table */}
              <div className="rounded-lg border bg-card">
                <div className="p-4 border-b bg-muted/50">
                  <h3 className="text-lg font-semibold">Top Channels</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-3 px-4 font-medium text-sm">Channel</th>
                        <th className="text-right py-3 px-4 font-medium text-sm">Sessions</th>
                        <th className="text-right py-3 px-4 font-medium text-sm">Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.current.topChannels.map((channel, idx) => (
                        <tr key={idx} className="border-b hover:bg-muted/30">
                          <td className="py-3 px-4 text-sm">{channel.channel}</td>
                          <td className="py-3 px-4 text-right text-sm">{formatNumber(channel.sessions)}</td>
                          <td className="py-3 px-4 text-right text-sm">{channel.sharePct.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: Asset Details */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Asset Details</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Target URL</div>
                  <div className="font-medium">{selectedAsset.targetUrl}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Topic</div>
                  <div className="font-medium">{selectedAsset.topicName}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Pattern</div>
                  <PatternChips patternIds={[selectedAsset.pattern]} topN={1} size="sm" />
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Status</div>
                  <span className="text-xs px-2 py-1 rounded border bg-muted/50 text-muted-foreground">
                    {selectedAsset.status}
                  </span>
                </div>
                {selectedAsset.createdFrom.briefId && (
                  <div>
                    <div className="text-muted-foreground mb-1">Created from Brief</div>
                    <GeoLink
                      href={`/execution-prep/execution-briefs?brief=${selectedAsset.createdFrom.briefId}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                    >
                      View Brief →
                    </GeoLink>
                  </div>
                )}
                {selectedAsset.createdFrom.specId && (
                  <div>
                    <div className="text-muted-foreground mb-1">Created from Spec</div>
                    <GeoLink
                      href={`/execution-prep/content-specs?spec=${selectedAsset.createdFrom.specId}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                    >
                      View Spec →
                    </GeoLink>
                  </div>
                )}
                {selectedAsset.createdFrom.claimId && (
                  <div>
                    <div className="text-muted-foreground mb-1">Created from Claim</div>
                    <span className="text-xs text-muted-foreground">{selectedAsset.createdFrom.claimId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <GeoEmptyState
          title={EMPTY_STATE_COPY.NO_ASSET_SELECTED.TITLE}
          description={EMPTY_STATE_COPY.NO_ASSET_SELECTED.DESC}
          icon={<FileXIcon className="h-12 w-12 text-muted-foreground" />}
          actions={[
            { label: 'Go to Content Specs', href: '/execution-prep/content-specs', variant: 'default' },
          ]}
        />
      )}

      {/* Boundary footnote */}
      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          Measurement only. This data does not feed back into strategy, decisions, or briefs.
        </p>
      </div>
    </div>
  );
}
