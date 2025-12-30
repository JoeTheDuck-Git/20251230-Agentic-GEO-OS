export const competitorIntelligenceDemo = {
  meta: {
    page: '/intelligence/competitor-intelligence',
    generated_at: '2024-01-15T10:30:00Z',
    source_agent: 'intelligence_agent',
  },
  competitive_landscape: {
    primary_brand: {
      brand_id: 'brand-1',
      brand_name: 'Acme Corp',
      overall_geo_score: 72,
      market_position: 'leader',
    },
    competitors: [
      {
        brand_id: 'brand-2',
        brand_name: 'TechRival',
        geo_score: 58,
        rank: 2,
        strengths: [
          'Strong content coverage across cloud infrastructure topics',
          'High visibility in AI-generated answers for technical queries',
          'Comprehensive documentation and technical guides',
          'Strong presence in comparison and evaluation questions',
          'Effective schema markup and structured data implementation',
        ],
        weaknesses: [
          'Lower sentiment scores in automation discussions',
          'Limited AI Automation topic coverage',
          'Weak presence in FAQ-style question patterns',
          'Insufficient coverage of security-focused queries',
          'Lower engagement rates in long-form content',
        ],
      },
      {
        brand_id: 'brand-3',
        brand_name: 'InnovateCo',
        geo_score: 52,
        rank: 3,
        strengths: [
          'Good sentiment positioning in security discussions',
          'Strong presence in Data Security topics',
          'Effective coverage of compliance and governance questions',
          'High-quality technical case studies',
          'Strong brand mention frequency in relevant contexts',
        ],
        weaknesses: [
          'Lower overall visibility across tracked topics',
          'Limited topic coverage compared to competitors',
          'Weak presence in cloud infrastructure comparisons',
          'Insufficient content depth for technical queries',
          'Lower reach in AI-generated answers overall',
        ],
      },
    ],
    competitive_gaps: [
      {
        topic_id: 'topic-1',
        topic_name: 'Cloud Infrastructure',
        gap_statement: 'TechRival has +15% higher reach in Cloud Infrastructure topics',
        why_it_matters: 'Cloud Infrastructure is a high-volume topic with significant brand visibility impact.',
        focus: 'Expand content coverage to match competitor depth and breadth in this topic area.',
        signals: ['Reach gap', 'Position gap'],
      },
      {
        topic_id: 'topic-2',
        topic_name: 'AI Automation',
        gap_statement: 'InnovateCo has +8% better sentiment positioning in AI Automation discussions',
        why_it_matters: 'Sentiment quality affects brand perception and answer inclusion rates.',
        focus: 'Develop content that addresses automation concerns while positioning solutions constructively.',
        signals: ['Sentiment gap'],
      },
      {
        topic_id: 'topic-3',
        topic_name: 'Data Security',
        gap_statement: 'InnovateCo leads with +12% visibility in Data Security topics',
        why_it_matters: 'Security is a critical decision factor for enterprise customers.',
        focus: 'Increase security-focused content depth and coverage of compliance questions.',
        signals: ['Reach gap', 'Visibility gap'],
      },
    ],
  },
  brand_comparison_by_topic: [
    {
      topic_id: 'topic-1',
      topic_name: 'Cloud Infrastructure',
      rankings: [
        { brand_id: 'brand-1', brand_name: 'Acme Corp', geo_score: 72, rank: 1 },
        { brand_id: 'brand-2', brand_name: 'TechRival', geo_score: 68, rank: 2 },
        { brand_id: 'brand-3', brand_name: 'InnovateCo', geo_score: 55, rank: 3 },
      ],
    },
  ],
};
