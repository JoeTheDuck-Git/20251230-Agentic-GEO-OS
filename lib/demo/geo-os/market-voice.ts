export const marketVoiceDemo = {
  meta: {
    page: 'market_voice',
    generated_at: '2025-12-30T15:00:00Z',
    snapshot_id: 'snap_market_voice_001',
    source_agent: 'observation_agent',
    boundary: 'read_only_excluded_from_geo',
  },
  kpis: {
    mentions_30d: 12450,
    share_of_voice: 0.28,
    market_sentiment: {
      positive: 0.45,
      neutral: 0.38,
      negative: 0.17,
    },
    momentum: 0.12, // +12% vs previous period
  },
  top_narratives: [
    {
      title: 'Cloud migration challenges and solutions',
      share: 0.22,
      sentiment: 'neutral',
      top_sources: ['Reddit', 'Stack Overflow'],
    },
    {
      title: 'AI automation workforce concerns',
      share: 0.18,
      sentiment: 'negative',
      top_sources: ['LinkedIn', 'Twitter'],
    },
    {
      title: 'Infrastructure scalability discussions',
      share: 0.15,
      sentiment: 'positive',
      top_sources: ['HackerNews', 'Reddit'],
    },
    {
      title: 'Security and compliance requirements',
      share: 0.12,
      sentiment: 'neutral',
      top_sources: ['Stack Overflow', 'Quora'],
    },
    {
      title: 'Cost optimization strategies',
      share: 0.10,
      sentiment: 'positive',
      top_sources: ['Reddit', 'LinkedIn'],
    },
  ],
  recurring_questions: [
    {
      question: 'How to choose the right cloud infrastructure provider?',
      frequency: 245,
      risk: 'low',
    },
    {
      question: 'What are the security implications of cloud migration?',
      frequency: 189,
      risk: 'medium',
    },
    {
      question: 'Will AI automation replace my job?',
      frequency: 156,
      risk: 'high',
    },
    {
      question: 'How to optimize cloud costs effectively?',
      frequency: 134,
      risk: 'low',
    },
    {
      question: 'What compliance standards apply to cloud infrastructure?',
      frequency: 112,
      risk: 'medium',
    },
  ],
  source_breakdown: [
    {
      source: 'Reddit',
      mentions: 4520,
      share: 0.36,
      sentiment: 'neutral',
      trend: 'up',
    },
    {
      source: 'Stack Overflow',
      mentions: 3120,
      share: 0.25,
      sentiment: 'positive',
      trend: 'stable',
    },
    {
      source: 'LinkedIn',
      mentions: 2340,
      share: 0.19,
      sentiment: 'neutral',
      trend: 'up',
    },
    {
      source: 'Twitter',
      mentions: 1560,
      share: 0.13,
      sentiment: 'negative',
      trend: 'down',
    },
    {
      source: 'HackerNews',
      mentions: 910,
      share: 0.07,
      sentiment: 'positive',
      trend: 'stable',
    },
  ],
  competitor_voice_comparison: [
    {
      brand: 'Acme Corp',
      mentions: 3480,
      sov: 0.28,
      sentiment: 'positive',
      top_narrative: 'Cloud migration challenges and solutions',
    },
    {
      brand: 'TechRival',
      mentions: 4120,
      sov: 0.33,
      sentiment: 'neutral',
      top_narrative: 'Infrastructure scalability discussions',
    },
    {
      brand: 'InnovateCo',
      mentions: 2850,
      sov: 0.23,
      sentiment: 'positive',
      top_narrative: 'Security and compliance requirements',
    },
    {
      brand: 'CloudTech',
      mentions: 2000,
      sov: 0.16,
      sentiment: 'neutral',
      top_narrative: 'Cost optimization strategies',
    },
  ],
  evidence_snippets: [
    {
      source: 'Reddit',
      date: '2025-12-28T10:30:00Z',
      text: 'We migrated to Acme Corp last quarter and saw significant improvements in our infrastructure reliability. The support team was very responsive.',
    },
    {
      source: 'Stack Overflow',
      date: '2025-12-27T14:20:00Z',
      text: 'Has anyone experienced issues with Acme Corp\'s API rate limits? We\'re hitting limits more frequently than expected.',
    },
    {
      source: 'LinkedIn',
      date: '2025-12-26T09:15:00Z',
      text: 'The AI automation features from Acme Corp are impressive, but I\'m concerned about the learning curve for our team.',
    },
    {
      source: 'Twitter',
      date: '2025-12-25T16:45:00Z',
      text: 'Acme Corp\'s security documentation is comprehensive. Helped us pass our compliance audit.',
    },
    {
      source: 'HackerNews',
      date: '2025-12-24T11:30:00Z',
      text: 'Interesting discussion about Acme Corp\'s pricing model. Seems competitive for enterprise use cases.',
    },
  ],
};
