export const trafficEngagementDemo = {
  meta: {
    page: 'traffic_engagement',
    generated_at: '2025-12-30T14:30:00Z',
    snapshot_id: 'snap_measurement_002',
    source: 'GA4 (demo)',
    boundary: 'read_only_no_feedback',
  },
  filters: {
    time_range: 'Last 30 days',
    channel: 'GA4 (demo)',
  },
  kpis: {
    total_sessions: 28350,
    organic_share: 0.65,
    returning_users_share: 0.42,
    top_landing_page: '/cloud-infrastructure-guide',
  },
  source_medium_breakdown: [
    {
      source_medium: 'google / organic',
      sessions: 18430,
      engagement_rate: 0.71,
    },
    {
      source_medium: 'direct / (none)',
      sessions: 5230,
      engagement_rate: 0.68,
    },
    {
      source_medium: 'bing / organic',
      sessions: 2890,
      engagement_rate: 0.64,
    },
    {
      source_medium: 'referral / other',
      sessions: 1250,
      engagement_rate: 0.58,
    },
    {
      source_medium: 'social / linkedin',
      sessions: 550,
      engagement_rate: 0.52,
    },
  ],
  landing_pages: [
    {
      url_path: '/cloud-infrastructure-guide',
      sessions: 8450,
      engagement_rate: 0.72,
    },
    {
      url_path: '/ai-automation-best-practices',
      sessions: 6230,
      engagement_rate: 0.65,
    },
    {
      url_path: '/llms-txt-implementation',
      sessions: 5120,
      engagement_rate: 0.58,
    },
    {
      url_path: '/cloud-security-fundamentals',
      sessions: 4850,
      engagement_rate: 0.71,
    },
    {
      url_path: '/infrastructure-comparison',
      sessions: 3700,
      engagement_rate: 0.63,
    },
  ],
  notes: [
    'Data is read-only and does not feed back into strategy, decisions, or briefs.',
    'Traffic metrics are measured separately from GEO analysis.',
  ],
};

