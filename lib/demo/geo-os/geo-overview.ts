export const geoOverviewDemo = {
  meta: {
    page: 'geo_overview',
    generated_at: '2024-01-15T10:30:00Z',
    snapshot_id: 'snapshot-2024-01-15-103000',
    source_agents: ['intelligence_agent', 'reasoning_agent'],
  },
  geo_score: {
    value: 72,
    scale: 'percentage' as const,
    source_agent: 'Intelligence',
  },
  visibility: {
    reach: 0.65,
    average_position: 2.3,
    source_agent: 'Intelligence',
    // Sample information for low sample detection
    totalAnswerUnits: 250,
    mentionedAnswerUnits: 163, // 65% of 250
    positionDenominator: 163, // Same as mentionedAnswerUnits for avgPosition
  },
  sentiment: {
    positive: 0.62,
    neutral: 0.27,
    negative: 0.11,
    source_agent: 'Intelligence',
    // Sentiment breakdown and sample size
    sentimentBreakdown: {
      positivePct: 62,
      neutralPct: 27,
      negativePct: 11,
    },
    sentimentMentionsSampleSize: 163, // Same as mentionedAnswerUnits
    // Calculate sentiment score: (0.5 + 0.5 * (0.62 - 0.11)) * 100 = 75.5
    sentimentScorePct: 76, // Rounded
  },
  top_competitors: [
    { brand: 'TechRival', visibility_score: 0.58 },
    { brand: 'InnovateCo', visibility_score: 0.52 },
    { brand: 'CloudTech', visibility_score: 0.48 },
    { brand: 'DataFlow', visibility_score: 0.45 },
    { brand: 'SecureNet', visibility_score: 0.42 },
    { brand: 'ScaleUp', visibility_score: 0.38 },
  ],
  your_brand_rank: {
    brand: 'Acme Corp',
    rank: 1,
    visibility_score: 0.72,
  },
  why_it_changed: {
    summary: 'GEO Score improved by 7 points due to increased content coverage in Cloud Infrastructure topics. Visibility reach increased from 55% to 65% over the past 30 days, primarily driven by new comprehensive guides and improved AI answer inclusion rates.',
    source_agent: 'Reasoning',
    preview: 'GEO Score improved by 7 points due to increased content coverage in Cloud Infrastructure topics.',
  },
  metadata: {
    questions_count: 250,
    topics_count: 10,
    brands_count: 7,
    last_updated: '2024-01-15T10:30:00Z',
  },
  top_pattern_ids: [
    'pattern_definition',
    'pattern_how_to',
    'pattern_comparison',
  ],
  topTopics: [
    {
      topicId: 'topic-1',
      name: 'Smart Home Devices: Automated Mopping Systems',
      visibilityScorePct: 79,
      topPatternIds: ['pattern_comparison', 'pattern_alternatives', 'pattern_recommendation'],
    },
    {
      topicId: 'topic-2',
      name: 'Cloud Infrastructure',
      visibilityScorePct: 72,
      topPatternIds: ['pattern_definition', 'pattern_comparison', 'pattern_use_case'],
    },
    {
      topicId: 'topic-3',
      name: 'Data Security',
      visibilityScorePct: 65,
      topPatternIds: ['pattern_definition', 'pattern_how_to', 'pattern_trust'],
    },
    {
      topicId: 'topic-4',
      name: 'AI Automation',
      visibilityScorePct: 68,
      topPatternIds: ['pattern_definition', 'pattern_use_case', 'pattern_pros_cons'],
    },
    {
      topicId: 'topic-5',
      name: 'Edge Computing',
      visibilityScorePct: 71,
      topPatternIds: ['pattern_definition', 'pattern_use_case', 'pattern_comparison'],
    },
  ],
};
