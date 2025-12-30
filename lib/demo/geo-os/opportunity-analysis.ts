export interface OpportunityAnalysisDemo {
  meta: {
    page: string;
    generated_at: string;
    snapshot_id: string;
    source_agent: 'reasoning_agent';
    boundary: 'read_only_no_execution';
  };
  kpis: {
    opportunities_count: number;
    high_priority_count: number;
    estimated_geo_lift: {
      min: number;
      max: number;
    };
    avg_confidence: number;
  };
  opportunities: Opportunity[];
  pattern_insights: PatternInsight[];
}

export interface Opportunity {
  opportunity_id: string;
  title: string;
  topic_id: string;
  topic_name: string;
  driver: 'reach' | 'position' | 'sentiment' | 'visibility';
  drivers: Array<'reach_gap' | 'position_gap' | 'sentiment_gap' | 'visibility_gap'>;
  current_state: {
    reach: number;
    avg_position: number;
  };
  target_state: {
    reach: number;
    avg_position: number;
  };
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  effort: 'S' | 'M' | 'L';
  patternCoverage: {
    patternsCount: number;
    topPatternIds: string[];
    examples: string[];
  };
  rationale: string;
  signals_used: string[];
  evidence_snapshot: {
    question_patterns?: string[];
    competitor_advantage?: string;
    sentiment_notes?: string;
  };
  related_actionable_item_id?: string;
  related_execution_brief_id?: string;
}

export interface PatternInsight {
  pattern_id: string;
  type: 'correlation' | 'gap_cluster' | 'volatility' | 'sentiment_risk';
  statement: string;
  confidence: number;
  what_to_watch: string;
  related_topics: string[];
}

export const opportunityAnalysisDemo: OpportunityAnalysisDemo = {
  meta: {
    page: '/decisions/opportunity-analysis',
    generated_at: '2025-12-30T14:00:00Z',
    snapshot_id: 'snap_opp_analysis_001',
    source_agent: 'reasoning_agent',
    boundary: 'read_only_no_execution',
  },
  kpis: {
    opportunities_count: 6,
    high_priority_count: 3,
    estimated_geo_lift: {
      min: 8,
      max: 22,
    },
    avg_confidence: 0.78,
  },
  opportunities: [
    {
      opportunity_id: 'opp-1',
      title: 'Expand data security content to improve visibility',
      topic_id: 'topic-3',
      topic_name: 'Data Security',
      driver: 'reach',
      drivers: ['reach_gap', 'position_gap'],
      current_state: {
        reach: 25,
        avg_position: 4.2,
      },
      target_state: {
        reach: 60,
        avg_position: 2.0,
      },
      priority: 'high',
      confidence: 0.85,
      effort: 'M',
      patternCoverage: {
        patternsCount: 15,
        topPatternIds: [
          'pattern_definition',
          'pattern_how_to',
          'pattern_use_case',
        ],
        examples: [
          'How to implement data encryption?',
          'What are best practices for data security compliance?',
          'How to secure cloud data storage?',
          'What is data encryption at rest?',
          'How to ensure GDPR compliance?',
          'What are data security best practices?',
          'How to protect sensitive data?',
          'What is data loss prevention?',
        ],
      },
      rationale: 'Data security questions show high search volume but low brand presence. Competitors are capturing 3x more mentions in this topic.',
      signals_used: [
        'Question volume trend: +45% YoY',
        'Competitor SOV: 68% vs our 25%',
        'Position gap: avg 4.2 vs target 2.0',
        'Market Voice sentiment: neutral-to-positive',
      ],
      evidence_snapshot: {
        question_patterns: [
          'How to implement data encryption?',
          'What are best practices for data security compliance?',
          'How to secure cloud data storage?',
        ],
        competitor_advantage: 'Acme Corp appears in 68% of data security answers with avg position 1.8',
        sentiment_notes: 'Market discussions show positive sentiment toward comprehensive security content',
      },
      related_actionable_item_id: 'item-3',
      related_execution_brief_id: 'brief-2',
    },
    {
      opportunity_id: 'opp-2',
      title: 'Improve average position in cloud infrastructure topics',
      topic_id: 'topic-1',
      topic_name: 'Cloud Infrastructure',
      driver: 'position',
      drivers: ['position_gap', 'visibility_gap'],
      current_state: {
        reach: 45,
        avg_position: 3.5,
      },
      target_state: {
        reach: 45,
        avg_position: 1.8,
      },
      priority: 'high',
      confidence: 0.82,
      effort: 'L',
      patternCoverage: {
        patternsCount: 32,
        topPatternIds: [
          'pattern_comparison',
          'pattern_recommendation',
          'pattern_checklist',
        ],
        examples: [
          'What is the best cloud infrastructure setup?',
          'How to choose cloud providers?',
          'What are cloud infrastructure best practices?',
          'How to design scalable cloud architecture?',
          'What is multi-cloud strategy?',
          'How to optimize cloud costs?',
          'What are cloud security considerations?',
          'How to migrate to cloud infrastructure?',
        ],
      },
      rationale: 'Strong reach but weak positioning. Content exists but needs optimization for better ranking in AI answers.',
      signals_used: [
        'Reach: 45% (above threshold)',
        'Position gap: 3.5 vs target 1.8',
        'Content freshness: last updated 8 months ago',
        'Competitor position advantage: avg 1.6',
      ],
      evidence_snapshot: {
        question_patterns: [
          'What is the best cloud infrastructure setup?',
          'How to choose cloud providers?',
        ],
        competitor_advantage: 'TechCorp maintains avg position 1.6 with similar reach',
        sentiment_notes: 'Neutral sentiment, opportunity for positive differentiation',
      },
      related_actionable_item_id: 'item-5',
    },
    {
      opportunity_id: 'opp-3',
      title: 'Address sentiment gap in AI automation discussions',
      topic_id: 'topic-2',
      topic_name: 'AI Automation',
      driver: 'sentiment',
      drivers: ['sentiment_gap', 'reach_gap'],
      current_state: {
        reach: 30,
        avg_position: 3.8,
      },
      target_state: {
        reach: 50,
        avg_position: 2.5,
      },
      priority: 'high',
      confidence: 0.79,
      effort: 'M',
      patternCoverage: {
        patternsCount: 18,
        topPatternIds: [
          'pattern_pros_cons',
          'pattern_trust',
          'pattern_use_case',
        ],
        examples: [
          'What are the risks of AI automation?',
          'How to avoid AI automation failures?',
          'What are AI automation best practices?',
          'How to implement AI automation?',
          'What are AI automation use cases?',
          'How to measure AI automation ROI?',
          'What are AI automation challenges?',
          'How to choose AI automation tools?',
        ],
      },
      rationale: 'AI automation content shows neutral-to-negative sentiment in market discussions. Opportunity to improve brand perception through thought leadership.',
      signals_used: [
        'Market Voice sentiment: 35% negative, 45% neutral',
        'GEO Sentiment: 60% neutral, 20% positive',
        'Reach gap: 30% vs market leader 55%',
        'Recurring questions about implementation challenges',
      ],
      evidence_snapshot: {
        question_patterns: [
          'What are the risks of AI automation?',
          'How to avoid AI automation failures?',
        ],
        sentiment_notes: 'Market discussions focus on challenges rather than benefits. Opportunity for positive narrative.',
      },
      related_actionable_item_id: 'item-7',
    },
    {
      opportunity_id: 'opp-4',
      title: 'Increase visibility in LLM implementation topics',
      topic_id: 'topic-4',
      topic_name: 'LLM Implementation',
      driver: 'visibility',
      drivers: ['visibility_gap', 'reach_gap', 'position_gap'],
      current_state: {
        reach: 18,
        avg_position: 5.2,
      },
      target_state: {
        reach: 40,
        avg_position: 3.0,
      },
      priority: 'medium',
      confidence: 0.72,
      effort: 'L',
      patternCoverage: {
        patternsCount: 28,
        topPatternIds: [
          'pattern_how_to',
          'pattern_definition',
          'pattern_integrations',
        ],
        examples: [
          'How to implement LLMs in production?',
          'What are LLM best practices?',
          'How to fine-tune LLMs?',
          'What are LLM deployment strategies?',
          'How to optimize LLM performance?',
          'What are LLM security considerations?',
          'How to evaluate LLM models?',
          'What are LLM use cases?',
        ],
      },
      rationale: 'Emerging topic with growing question volume. Early content investment can establish strong position.',
      signals_used: [
        'Question volume: +120% YoY',
        'Current reach: 18% (below threshold)',
        'Position: 5.2 (weak)',
        'Competitor presence: minimal (opportunity)',
      ],
      evidence_snapshot: {
        question_patterns: [
          'How to implement LLMs in production?',
          'What are LLM best practices?',
        ],
        sentiment_notes: 'Positive sentiment toward practical implementation guidance',
      },
    },
    {
      opportunity_id: 'opp-5',
      title: 'Optimize content structure for better position in compliance topics',
      topic_id: 'topic-5',
      topic_name: 'Compliance',
      driver: 'position',
      drivers: ['position_gap'],
      current_state: {
        reach: 35,
        avg_position: 4.0,
      },
      target_state: {
        reach: 35,
        avg_position: 2.2,
      },
      priority: 'medium',
      confidence: 0.75,
      effort: 'S',
      patternCoverage: {
        patternsCount: 6,
        topPatternIds: [
          'pattern_definition',
          'pattern_checklist',
          'pattern_how_to',
        ],
        examples: [
          'What are compliance requirements?',
          'How to ensure compliance?',
          'What are compliance best practices?',
          'How to maintain compliance?',
          'What is compliance auditing?',
        ],
      },
      rationale: 'Content exists but structure doesn\'t align with how AI answers extract information. Structural improvements can improve position without new content.',
      signals_used: [
        'Reach: 35% (adequate)',
        'Position gap: 4.0 vs target 2.2',
        'Content structure analysis: weak semantic markup',
        'Competitor advantage: better structured content',
      ],
      evidence_snapshot: {
        question_patterns: [
          'What are compliance requirements?',
          'How to ensure compliance?',
        ],
        competitor_advantage: 'ComplianceCorp uses structured data markup, avg position 2.0',
      },
    },
    {
      opportunity_id: 'opp-6',
      title: 'Expand reach in multi-cloud strategy discussions',
      topic_id: 'topic-6',
      topic_name: 'Multi-Cloud Strategy',
      driver: 'reach',
      drivers: ['reach_gap', 'visibility_gap'],
      current_state: {
        reach: 22,
        avg_position: 4.5,
      },
      target_state: {
        reach: 48,
        avg_position: 3.5,
      },
      priority: 'low',
      confidence: 0.68,
      effort: 'M',
      patternCoverage: {
        patternsCount: 12,
        topPatternIds: [
          'pattern_comparison',
          'pattern_alternatives',
          'pattern_use_case',
        ],
        examples: [
          'How to manage multi-cloud environments?',
          'What are multi-cloud best practices?',
          'How to implement multi-cloud strategy?',
          'What are multi-cloud challenges?',
          'How to optimize multi-cloud costs?',
          'What is multi-cloud governance?',
        ],
      },
      rationale: 'Growing topic with moderate opportunity. Lower priority due to smaller question volume compared to core topics.',
      signals_used: [
        'Question volume: +30% YoY',
        'Current reach: 22%',
        'Market leader reach: 52%',
        'Position: 4.5 (needs improvement)',
      ],
      evidence_snapshot: {
        question_patterns: [
          'How to manage multi-cloud environments?',
          'What are multi-cloud best practices?',
        ],
        sentiment_notes: 'Neutral sentiment, opportunity for differentiation',
      },
    },
  ],
  pattern_insights: [
    {
      pattern_id: 'pattern-1',
      type: 'correlation',
      statement: 'Strong performance in cloud infrastructure correlates with weak performance in data security',
      confidence: 0.75,
      what_to_watch: 'Monitor if data security improvements impact cloud infrastructure positioning',
      related_topics: ['Cloud Infrastructure', 'Data Security'],
    },
    {
      pattern_id: 'pattern-2',
      type: 'gap_cluster',
      statement: 'Three topics (LLM Implementation, Multi-Cloud Strategy, Compliance) show similar reach gaps below 40%',
      confidence: 0.82,
      what_to_watch: 'Consider coordinated content strategy across these topics for efficiency',
      related_topics: ['LLM Implementation', 'Multi-Cloud Strategy', 'Compliance'],
    },
    {
      pattern_id: 'pattern-3',
      type: 'volatility',
      statement: 'AI Automation topic shows high position volatility (3.2 to 4.8 range) over last 90 days',
      confidence: 0.71,
      what_to_watch: 'Position stability may indicate content quality inconsistency or competitor activity',
      related_topics: ['AI Automation'],
    },
    {
      pattern_id: 'pattern-4',
      type: 'sentiment_risk',
      statement: 'Market Voice sentiment for AI Automation is 35% negative, highest among tracked topics',
      confidence: 0.88,
      what_to_watch: 'Negative sentiment may impact GEO Sentiment if not addressed through content strategy',
      related_topics: ['AI Automation', 'Market Voice'],
    },
  ],
};
