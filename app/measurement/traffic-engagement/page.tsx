'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { measurementDemo } from '@/lib/demo/geo/measurement.demo';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';
import { GeoLink } from '@/components/geo/GeoLink';
import { GeoJourneyHint } from '@/components/geo/GeoJourneyHint';
import { parseAssetId, defaultAssetId, filterAssetsByQuery } from '@/lib/geo/measurement/assetSelection';
import { parseGeoQuery } from '@/lib/geo/query/geoQuery';
import { MetricDeltaSimple } from '@/components/geo/MetricDeltaSimple';
import { GeoDataFreshness } from '@/components/geo/GeoDataFreshness';
import { getMeasurementMeta } from '@/lib/geo/meta/geoMeta';
import { GeoEmptyState } from '@/components/geo/states/GeoEmptyState';
import { EMPTY_STATE_COPY } from '@/lib/geo/states/stateCopy';
import { FileXIcon } from '@/components/geo/states/GeoEmptyState';

function TrafficEngagementContent() {
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
    router.replace(`/measurement/traffic-engagement?${params.toString()}`, { scroll: false });
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
        <h1 className="text-3xl font-bold">Traffic & Engagement</h1>
        <p className="text-muted-foreground mt-2">
          Traffic overview snapshot (demo). Read-only.
        </p>
        <div className="mt-2">
          <GeoJourneyHint />
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
              <div className="text-sm font-medium text-muted-foreground mb-2">CTR</div>
              <div className="text-3xl font-bold">{metrics.current.ctrPct.toFixed(1)}%</div>
              <div className="mt-2">
                <MetricDeltaSimple
                  current={metrics.current.ctrPct}
                  baseline={metrics.baseline.ctrPct}
                  format="percentage"
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
              <div className="text-sm font-medium text-muted-foreground mb-2">Conversion Rate</div>
              <div className="text-3xl font-bold">{metrics.current.conversionRatePct.toFixed(2)}%</div>
              <div className="mt-2">
                <MetricDeltaSimple
                  current={metrics.current.conversionRatePct}
                  baseline={metrics.baseline.conversionRatePct}
                  format="percentage"
                  higherIsBetter={true}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Channel Mix */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Channel Mix</h3>
              <div className="space-y-3">
                {metrics.current.topChannels.map((channel, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm">{channel.channel}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatNumber(channel.sessions)}</span>
                      <span className="text-xs text-muted-foreground">({channel.sharePct.toFixed(1)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Notes */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Engagement Notes</h3>
              {metrics.current.notes && metrics.current.notes.length > 0 ? (
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {metrics.current.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No engagement notes available.</p>
              )}
            </div>
          </div>

          {/* Top Landing Keywords Table */}
          {metrics.current.topLandingKeywords.length > 0 && (
            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b bg-muted/50">
                <h3 className="text-lg font-semibold">Top Landing Keywords</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium text-sm">Keyword</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Impressions</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.current.topLandingKeywords.map((keyword, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted/30">
                        <td className="py-3 px-4 text-sm">{keyword.keyword}</td>
                        <td className="py-3 px-4 text-right text-sm">{formatNumber(keyword.impressions)}</td>
                        <td className="py-3 px-4 text-right text-sm">{formatNumber(keyword.clicks)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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

function TrafficEngagementLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function TrafficEngagementPage() {
  return (
    <Suspense fallback={<TrafficEngagementLoading />}>
      <TrafficEngagementContent />
    </Suspense>
  );
}
