export interface TopicPerformanceTopic {
  topicId: string;
  name: string;
  visibilityScorePct: number;
  reach: Array<{ brand: string; pct: number }>;
  position: Array<{ brand: string; pct: number }>;
  topPatternIds: string[]; // length >= 5, must be valid pattern IDs
  questionExamples: string[];
}

export interface TopicPerformanceDemo {
  meta: {
    brand: string;
    region: string;
    timeRangeLabel: string;
    snapshot: string;
    generatedAt: string;
  };
  topics: TopicPerformanceTopic[];
}

export const topicPerformanceDemo: TopicPerformanceDemo = {
  meta: {
    brand: 'Acme Corp',
    region: 'US',
    timeRangeLabel: 'Last 30 days',
    snapshot: '2024-01-15 10:30 AM',
    generatedAt: '1/15/2024, 6:30:00 PM',
  },
  topics: [
    {
      topicId: 'topic-1',
      name: 'Cloud Infrastructure',
      visibilityScorePct: 72,
      reach: [
        { brand: 'Acme Corp', pct: 85 },
        { brand: 'TechRival', pct: 78 },
        { brand: 'CloudTech', pct: 82 },
        { brand: 'InnovateCo', pct: 70 },
        { brand: 'ScaleUp', pct: 65 },
      ],
      position: [
        { brand: 'CloudTech', pct: 55 },
        { brand: 'Acme Corp', pct: 48 },
        { brand: 'TechRival', pct: 42 },
        { brand: 'InnovateCo', pct: 38 },
        { brand: 'ScaleUp', pct: 35 },
      ],
      topPatternIds: [
        'pattern_comparison',
        'pattern_recommendation',
        'pattern_use_case',
        'pattern_pricing',
        'pattern_how_to',
      ],
      questionExamples: [
        'What is the best cloud infrastructure platform for mid-sized SaaS teams?',
        'Acme Corp vs TechRival: which is better for reliability and scaling?',
        'How do I choose a cloud provider for compliance-heavy workloads?',
      ],
    },
    {
      topicId: 'topic-2',
      name: 'AI Automation',
      visibilityScorePct: 68,
      reach: [
        { brand: 'InnovateCo', pct: 82 },
        { brand: 'Acme Corp', pct: 70 },
        { brand: 'TechRival', pct: 65 },
        { brand: 'CloudTech', pct: 58 },
        { brand: 'ScaleUp', pct: 52 },
      ],
      position: [
        { brand: 'InnovateCo', pct: 48 },
        { brand: 'Acme Corp', pct: 42 },
        { brand: 'TechRival', pct: 35 },
        { brand: 'CloudTech', pct: 32 },
        { brand: 'ScaleUp', pct: 28 },
      ],
      topPatternIds: [
        'pattern_definition',
        'pattern_use_case',
        'pattern_pros_cons',
        'pattern_how_to',
        'pattern_integrations',
      ],
      questionExamples: [
        'Will AI automation reduce DevOps workload without increasing risk?',
        'Best practices for AI automation governance and audit trails',
        'Acme Corp alternatives for workflow automation in enterprise IT',
      ],
    },
    {
      topicId: 'topic-3',
      name: 'Data Security',
      visibilityScorePct: 65,
      reach: [
        { brand: 'SecureNet', pct: 88 },
        { brand: 'Acme Corp', pct: 60 },
        { brand: 'CloudTech', pct: 72 },
        { brand: 'TechRival', pct: 55 },
        { brand: 'ScaleUp', pct: 48 },
      ],
      position: [
        { brand: 'SecureNet', pct: 52 },
        { brand: 'CloudTech', pct: 45 },
        { brand: 'Acme Corp', pct: 38 },
        { brand: 'TechRival', pct: 32 },
        { brand: 'ScaleUp', pct: 28 },
      ],
      topPatternIds: [
        'pattern_definition',
        'pattern_how_to',
        'pattern_trust',
        'pattern_checklist',
        'pattern_troubleshooting',
      ],
      questionExamples: [
        'How do I evaluate data security posture for a cloud vendor?',
        'What security controls matter most for SOC 2 and ISO 27001?',
        'Acme Corp vs SecureNet for encryption and access controls',
      ],
    },
    {
      topicId: 'topic-4',
      name: 'Compliance & Governance',
      visibilityScorePct: 58,
      reach: [
        { brand: 'SecureNet', pct: 85 },
        { brand: 'Acme Corp', pct: 50 },
        { brand: 'CloudTech', pct: 68 },
        { brand: 'TechRival', pct: 45 },
        { brand: 'InnovateCo', pct: 40 },
      ],
      position: [
        { brand: 'SecureNet', pct: 50 },
        { brand: 'CloudTech', pct: 42 },
        { brand: 'Acme Corp', pct: 35 },
        { brand: 'TechRival', pct: 30 },
        { brand: 'InnovateCo', pct: 25 },
      ],
      topPatternIds: [
        'pattern_definition',
        'pattern_checklist',
        'pattern_how_to',
        'pattern_trust',
        'pattern_use_case',
      ],
      questionExamples: [
        'What compliance frameworks should B2B SaaS companies prioritize?',
        'How to ensure GDPR and SOC 2 compliance in cloud infrastructure?',
        'What should I consider when choosing compliance solutions for enterprise?',
      ],
    },
    {
      topicId: 'topic-5',
      name: 'Observability & Monitoring',
      visibilityScorePct: 62,
      reach: [
        { brand: 'CloudTech', pct: 75 },
        { brand: 'Acme Corp', pct: 55 },
        { brand: 'TechRival', pct: 70 },
        { brand: 'InnovateCo', pct: 58 },
        { brand: 'ScaleUp', pct: 50 },
      ],
      position: [
        { brand: 'CloudTech', pct: 45 },
        { brand: 'TechRival', pct: 40 },
        { brand: 'Acme Corp', pct: 38 },
        { brand: 'InnovateCo', pct: 32 },
        { brand: 'ScaleUp', pct: 28 },
      ],
      topPatternIds: [
        'pattern_definition',
        'pattern_use_case',
        'pattern_comparison',
        'pattern_how_to',
        'pattern_integrations',
      ],
      questionExamples: [
        'What observability tools are best for distributed cloud systems?',
        'How to set up monitoring for multi-region SaaS deployments?',
        'Acme Corp vs CloudTech for application performance monitoring',
      ],
    },
    {
      topicId: 'topic-6',
      name: 'Identity & Access Management',
      visibilityScorePct: 55,
      reach: [
        { brand: 'SecureNet', pct: 80 },
        { brand: 'Acme Corp', pct: 48 },
        { brand: 'CloudTech', pct: 65 },
        { brand: 'TechRival', pct: 52 },
        { brand: 'InnovateCo', pct: 45 },
      ],
      position: [
        { brand: 'SecureNet', pct: 48 },
        { brand: 'CloudTech', pct: 40 },
        { brand: 'TechRival', pct: 35 },
        { brand: 'Acme Corp', pct: 32 },
        { brand: 'InnovateCo', pct: 28 },
      ],
      topPatternIds: [
        'pattern_definition',
        'pattern_how_to',
        'pattern_trust',
        'pattern_checklist',
        'pattern_troubleshooting',
      ],
      questionExamples: [
        'What IAM features are essential for B2B SaaS security?',
        'How to implement SSO and role-based access control?',
        'Acme Corp vs SecureNet for enterprise identity management',
      ],
    },
    {
      topicId: 'topic-7',
      name: 'API Reliability & Rate Limits',
      visibilityScorePct: 60,
      reach: [
        { brand: 'TechRival', pct: 72 },
        { brand: 'Acme Corp', pct: 58 },
        { brand: 'CloudTech', pct: 68 },
        { brand: 'InnovateCo', pct: 55 },
        { brand: 'ScaleUp', pct: 48 },
      ],
      position: [
        { brand: 'TechRival', pct: 42 },
        { brand: 'CloudTech', pct: 38 },
        { brand: 'Acme Corp', pct: 35 },
        { brand: 'InnovateCo', pct: 30 },
        { brand: 'ScaleUp', pct: 26 },
      ],
      topPatternIds: [
        'pattern_definition',
        'pattern_how_to',
        'pattern_use_case',
        'pattern_troubleshooting',
        'pattern_integrations',
      ],
      questionExamples: [
        'How to design API rate limits for B2B SaaS platforms?',
        'What are best practices for API reliability and error handling?',
        'Acme Corp vs TechRival for API gateway and throttling',
      ],
    },
    {
      topicId: 'topic-8',
      name: 'Disaster Recovery & Business Continuity',
      visibilityScorePct: 52,
      reach: [
        { brand: 'CloudTech', pct: 78 },
        { brand: 'Acme Corp', pct: 45 },
        { brand: 'SecureNet', pct: 70 },
        { brand: 'TechRival', pct: 58 },
        { brand: 'ScaleUp', pct: 42 },
      ],
      position: [
        { brand: 'CloudTech', pct: 50 },
        { brand: 'SecureNet', pct: 45 },
        { brand: 'TechRival', pct: 38 },
        { brand: 'Acme Corp', pct: 30 },
        { brand: 'ScaleUp', pct: 25 },
      ],
      topPatternIds: [
        'pattern_definition',
        'pattern_checklist',
        'pattern_how_to',
        'pattern_use_case',
        'pattern_trust',
      ],
      questionExamples: [
        'What disaster recovery strategies work best for cloud-native SaaS?',
        'How to achieve RTO and RPO targets for critical business systems?',
        'Acme Corp vs CloudTech for backup and failover capabilities',
      ],
    },
    {
      topicId: 'topic-9',
      name: 'Cost Optimization (FinOps)',
      visibilityScorePct: 64,
      reach: [
        { brand: 'Acme Corp', pct: 68 },
        { brand: 'CloudTech', pct: 75 },
        { brand: 'TechRival', pct: 62 },
        { brand: 'ScaleUp', pct: 58 },
        { brand: 'InnovateCo', pct: 52 },
      ],
      position: [
        { brand: 'CloudTech', pct: 48 },
        { brand: 'Acme Corp', pct: 42 },
        { brand: 'TechRival', pct: 38 },
        { brand: 'ScaleUp', pct: 32 },
        { brand: 'InnovateCo', pct: 28 },
      ],
      topPatternIds: [
        'pattern_definition',
        'pattern_pricing',
        'pattern_how_to',
        'pattern_use_case',
        'pattern_checklist',
      ],
      questionExamples: [
        'How to optimize cloud costs for B2B SaaS without sacrificing performance?',
        'What FinOps practices help reduce infrastructure spend?',
        'Acme Corp vs CloudTech for cost visibility and optimization tools',
      ],
    },
    {
      topicId: 'topic-10',
      name: 'Vendor Evaluation & Comparisons',
      visibilityScorePct: 70,
      reach: [
        { brand: 'Acme Corp', pct: 78 },
        { brand: 'TechRival', pct: 72 },
        { brand: 'CloudTech', pct: 80 },
        { brand: 'InnovateCo', pct: 65 },
        { brand: 'SecureNet', pct: 68 },
      ],
      position: [
        { brand: 'CloudTech', pct: 52 },
        { brand: 'Acme Corp', pct: 48 },
        { brand: 'TechRival', pct: 42 },
        { brand: 'SecureNet', pct: 38 },
        { brand: 'InnovateCo', pct: 35 },
      ],
      topPatternIds: [
        'pattern_comparison',
        'pattern_alternatives',
        'pattern_recommendation',
        'pattern_checklist',
        'pattern_pros_cons',
      ],
      questionExamples: [
        'How to evaluate cloud infrastructure vendors for enterprise SaaS?',
        'What criteria matter most when comparing B2B SaaS platforms?',
        'Acme Corp vs TechRival vs CloudTech: comprehensive vendor comparison',
      ],
    },
  ],
};

