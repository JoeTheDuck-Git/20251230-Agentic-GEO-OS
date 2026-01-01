export const EMPTY_STATE_COPY = {
  LOW_SAMPLE: {
    TITLE: 'Low sample size',
    DESC: 'Insufficient data points to generate reliable metrics. Consider expanding your time range or filters.',
  },
  NO_ALERTS: {
    TITLE: 'No alerts for the selected filters',
    DESC: 'Try a different time range, snapshot, or region.',
  },
  NO_SOURCES: {
    TITLE: 'No sources found',
    DESC: 'No cited domains are available for the selected mode and filters.',
  },
  NO_OPPORTUNITIES: {
    TITLE: 'No opportunities detected',
    DESC: 'Try a different snapshot or explore Topic Performance.',
  },
  NO_ACTIONABLE_ITEMS: {
    TITLE: 'No actionable items',
    DESC: 'No decision prompts available for the current filters.',
  },
  NO_TOPICS: {
    TITLE: 'No topics match your search',
    DESC: 'Try adjusting your search query or filters.',
  },
  BRIEF_NOT_FOUND: {
    TITLE: 'Brief not found in demo data',
    DESC: 'This demo link references a brief that isn\'t seeded yet.',
  },
  SPEC_NOT_FOUND: {
    TITLE: 'Spec not found in demo data',
    DESC: 'This demo link references a spec that isn\'t seeded yet.',
  },
  NO_ASSET_SELECTED: {
    TITLE: 'Select a content asset',
    DESC: 'Choose a content asset from the dropdown to view performance metrics.',
  },
  MISSING_ASSET_MAPPING: {
    TITLE: 'No linked content asset',
    DESC: 'This brief/spec doesn\'t have a linked content asset in demo data.',
  },
} as const;

export const INLINE_NOTICE_COPY = {
  LOW_SAMPLE: {
    LABEL: 'Low sample',
    TOOLTIP_TITLE: 'Low Sample Size',
    TOOLTIP_BODY: 'Insufficient data points for reliable metrics. Consider expanding time range or filters.',
  },
  DEMO_ONLY: {
    LABEL: 'Demo-only',
    TOOLTIP_TITLE: 'Demo Mode',
    TOOLTIP_BODY: 'This is read-only demo data. No real data connections.',
  },
  MISSING_MAPPING: {
    LABEL: 'No asset mapping',
    TOOLTIP_TITLE: 'Missing Asset Mapping',
    TOOLTIP_BODY: 'No linked content asset in demo data.',
  },
} as const;

