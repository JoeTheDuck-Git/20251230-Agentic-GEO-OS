'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contentPerformanceDemo } from '@/lib/demo/geo-os/measurement/content-performance';

export default function ContentPerformancePage() {
  const data = contentPerformanceDemo;
  
  // View-only filter state (local UI only)
  const [selectedContent, setSelectedContent] = useState(data.filters.content_id);
  const [selectedTimeRange, setSelectedTimeRange] = useState(data.filters.time_range);
  const [selectedChannel, setSelectedChannel] = useState(data.filters.channel);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(1)}%`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Content Performance</h1>
        <p className="text-muted-foreground mt-2">
          Read-only measurement snapshot. Does not change decisions or briefs.
        </p>
      </div>

      {/* Filter Row (view-only local state) */}
      <div className="rounded-lg border bg-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Content</label>
            <select
              value={selectedContent}
              onChange={(e) => setSelectedContent(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
            >
              <option>All content</option>
              {data.content_rows.map((row) => (
                <option key={row.content_id} value={row.content_id}>
                  {row.title}
                </option>
              ))}
            </select>
          </div>
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

      {/* KPI Row (4 cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Pageviews</div>
          <div className="text-3xl font-bold">{formatNumber(data.kpis.pageviews)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Sessions</div>
          <div className="text-3xl font-bold">{formatNumber(data.kpis.sessions)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Engagement Rate</div>
          <div className="text-3xl font-bold">{formatPercentage(data.kpis.engagement_rate)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Avg Time on Page</div>
          <div className="text-3xl font-bold">{formatTime(data.kpis.avg_time_on_page_sec)}</div>
        </div>
      </div>

      {/* Content Table */}
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Content Performance</h2>
            <p className="text-xs text-muted-foreground">Showing top 5 items (demo).</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4 font-medium text-sm">Content</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Linked Brief</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Sessions</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Engagement Rate</th>
                <th className="text-right py-3 px-4 font-medium text-sm">Avg Time</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.content_rows.map((row) => (
                <tr key={row.content_id} className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-sm">{row.title}</div>
                      <div className="text-xs text-muted-foreground">{row.url_path}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/execution-prep/execution-briefs?brief=${row.brief_id}`}
                      className="inline-block text-xs px-2 py-1 rounded border bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                    >
                      {row.brief_id}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-right text-sm">{formatNumber(row.sessions)}</td>
                  <td className="py-3 px-4 text-right text-sm">{formatPercentage(row.engagement_rate)}</td>
                  <td className="py-3 px-4 text-right text-sm">{formatTime(row.avg_time_on_page_sec)}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {new Date(row.last_updated).toLocaleDateString()}
                  </td>
                </tr>
              ))}
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
