'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trafficEngagementDemo } from '@/lib/demo/geo-os/measurement/traffic-engagement';

export default function TrafficEngagementPage() {
  const data = trafficEngagementDemo;
  
  // View-only filter state (local UI only)
  const [selectedTimeRange, setSelectedTimeRange] = useState(data.filters.time_range);
  const [selectedChannel, setSelectedChannel] = useState(data.filters.channel);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(1)}%`;
  };

  // Map URL path to content_id for navigation
  const getContentIdFromPath = (urlPath: string): string | null => {
    const pathMap: Record<string, string> = {
      '/cloud-infrastructure-guide': 'content_001',
      '/ai-automation-best-practices': 'content_002',
      '/llms-txt-implementation': 'content_003',
      '/cloud-security-fundamentals': 'content_004',
      '/infrastructure-comparison': 'content_005',
    };
    return pathMap[urlPath] || null;
  };

  const topLandingPageContentId = getContentIdFromPath(data.kpis.top_landing_page);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Traffic & Engagement</h1>
        <p className="text-muted-foreground mt-2">
          Traffic overview snapshot (demo). Read-only.
        </p>
      </div>

      {/* Filter Row (view-only local state) */}
      <div className="rounded-lg border bg-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Time Range</label>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Channel</label>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
            >
              <option>GA4 (demo)</option>
              <option>Organic</option>
              <option>Direct</option>
              <option>Referral</option>
            </select>
          </div>
        </div>
        {/* Source disclosure */}
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            Source: GA4 (demo) · Snapshot-based
          </p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Total Sessions</div>
          <div className="text-3xl font-bold">{formatNumber(data.kpis.total_sessions)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Organic Share</div>
          <div className="text-3xl font-bold">{formatPercentage(data.kpis.organic_share)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Returning Users</div>
          <div className="text-3xl font-bold">{formatPercentage(data.kpis.returning_users_share)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Top Landing Page</div>
          {topLandingPageContentId ? (
            <Link
              href={`/measurement/content-performance?content=${topLandingPageContentId}`}
              className="text-sm font-medium mt-2 truncate block text-blue-600 hover:text-blue-700 hover:underline"
              title={data.kpis.top_landing_page}
            >
              {data.kpis.top_landing_page}
            </Link>
          ) : (
            <Link
              href="#top-landing-pages"
              className="text-sm font-medium mt-2 truncate block text-blue-600 hover:text-blue-700 hover:underline"
              title={data.kpis.top_landing_page}
            >
              {data.kpis.top_landing_page}
            </Link>
          )}
        </div>
      </div>

      {/* Organic Share helper note */}
      <div className="rounded-lg border bg-muted/30 p-3">
        <p className="text-xs text-muted-foreground">
          Organic share is based on sessions labeled as 'organic' in source/medium (demo).
        </p>
      </div>

      {/* Source / Medium Breakdown Table */}
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Source / Medium Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4 font-medium text-sm">Source/Medium</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Sessions</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Engagement Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.source_medium_breakdown.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium">{row.source_medium}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm">{formatNumber(row.sessions)}</td>
                  <td className="py-3 px-4 text-right text-sm">{formatPercentage(row.engagement_rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Landing Pages Table */}
      <div id="top-landing-pages" className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Top Landing Pages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4 font-medium text-sm">Page</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Sessions</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Engagement Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.landing_pages.map((row, index) => {
                const contentId = getContentIdFromPath(row.url_path);
                return (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4">
                      {contentId ? (
                        <Link
                          href={`/measurement/content-performance?content=${contentId}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {row.url_path}
                        </Link>
                      ) : (
                        <span className="text-sm font-medium">{row.url_path}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-sm">{formatNumber(row.sessions)}</td>
                    <td className="py-3 px-4 text-right text-sm">{formatPercentage(row.engagement_rate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Boundary footnote */}
      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          Measurement only. This data does not feed back into strategy, decisions, or briefs.
        </p>
      </div>
    </div>
  );
}
