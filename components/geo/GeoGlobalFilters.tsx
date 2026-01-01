'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  GeoQueryState,
  parseGeoQuery,
  toGeoQueryString,
  defaultGeoQueryState,
  GeoBrandKey,
  GeoRegionKey,
  GeoTimeRangeKey,
  GeoModelKey,
} from '@/lib/geo/query/geoQuery';

const BRAND_OPTIONS: { value: GeoBrandKey; label: string }[] = [
  { value: 'acme', label: 'Acme Corp' },
  { value: 'techrival', label: 'TechRival' },
  { value: 'securenet', label: 'SecureNet' },
];

const REGION_OPTIONS: { value: GeoRegionKey; label: string }[] = [
  { value: 'US', label: 'US' },
  { value: 'EU', label: 'EU' },
  { value: 'APAC', label: 'APAC' },
];

const TIME_RANGE_OPTIONS: { value: GeoTimeRangeKey; label: string }[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

const MODEL_OPTIONS: { value: GeoModelKey; label: string }[] = [
  { value: 'gpt', label: 'GPT' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'claude', label: 'Claude' },
];

const SNAPSHOT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: '2024-01-15T10:30:00Z', label: '2024-01-15 10:30 AM' },
  { value: '2024-01-14T10:30:00Z', label: '2024-01-14 10:30 AM' },
  { value: '2024-01-13T10:30:00Z', label: '2024-01-13 10:30 AM' },
];

export function GeoGlobalFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryState, setQueryState] = useState<GeoQueryState>(defaultGeoQueryState());

  // Parse initial state from URL
  useEffect(() => {
    const parsed = parseGeoQuery(searchParams);
    setQueryState(parsed);
  }, [searchParams]);

  const updateQuery = (updates: Partial<GeoQueryState>) => {
    const newState = { ...queryState, ...updates };
    setQueryState(newState);
    
    const queryString = toGeoQueryString(newState);
    const newUrl = queryString 
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
    
    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="rounded-lg border bg-card p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Brand:</label>
          <select
            value={queryState.brand}
            onChange={(e) => updateQuery({ brand: e.target.value as GeoBrandKey })}
            className="px-3 py-1.5 text-sm border rounded-md bg-background"
          >
            {BRAND_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Region:</label>
          <select
            value={queryState.region}
            onChange={(e) => updateQuery({ region: e.target.value as GeoRegionKey })}
            className="px-3 py-1.5 text-sm border rounded-md bg-background"
          >
            {REGION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Time Range:</label>
          <select
            value={queryState.timeRange}
            onChange={(e) => updateQuery({ timeRange: e.target.value as GeoTimeRangeKey })}
            className="px-3 py-1.5 text-sm border rounded-md bg-background"
          >
            {TIME_RANGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Model:</label>
          <select
            value={queryState.model}
            onChange={(e) => updateQuery({ model: e.target.value as GeoModelKey })}
            className="px-3 py-1.5 text-sm border rounded-md bg-background"
          >
            {MODEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Snapshot:</label>
          <select
            value={queryState.snapshot}
            onChange={(e) => updateQuery({ snapshot: e.target.value })}
            className="px-3 py-1.5 text-sm border rounded-md bg-background"
          >
            {SNAPSHOT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

