export const contentSpecsDemo = {
  meta: {
    page: 'content_specs',
    generated_at: '2024-01-15T14:30:00Z',
    snapshot_id: 'snapshot-2024-01-15-143000',
    source_agents: ['spec_agent', 'governance_agent'],
  },
  content_specs: [
    {
      id: 'spec-1',
      title: 'Cloud Infrastructure Buyer\'s Guide (Mid-market)',
      type: 'landing',
      status: 'approved',
      priority: 'high',
      confidence: 86,
      primaryTopic: 'Cloud Infrastructure',
      targetSlug: '/cloud-infrastructure/buyers-guide',
      audience: 'Mid-market technical decision-makers evaluating cloud infrastructure solutions, including DevOps engineers, IT directors, and CTOs.',
      patternsTop5: [
        'pattern_definition',
        'pattern_comparison',
        'pattern_recommendation',
        'pattern_use_case',
        'pattern_pricing',
      ],
      objective: 'Create a comprehensive buyer\'s guide that helps mid-market organizations evaluate cloud infrastructure solutions, addressing key decision criteria and common questions identified in AI-generated answers.',
      successCriteria: [
        'Increase answer inclusion rate for cloud infrastructure definition questions by 25%',
        'Improve reach within cloud infrastructure topic cluster by 30%',
        'Achieve top 3 position in comparison queries for mid-market cloud solutions',
        'Increase internal link authority signals from this page to product pages',
      ],
      outline: [
        {
          heading: 'What is Cloud Infrastructure?',
          bullets: [
            'Core components and architecture',
            'Key service models (IaaS, PaaS, SaaS)',
            'Deployment models (public, private, hybrid)',
          ],
        },
        {
          heading: 'Key Considerations for Mid-market Organizations',
          bullets: [
            'Scalability requirements',
            'Cost optimization strategies',
            'Security and compliance needs',
            'Integration capabilities',
          ],
        },
        {
          heading: 'Comparing Cloud Infrastructure Solutions',
          bullets: [
            'Feature comparison matrix',
            'Use case scenarios',
            'Pricing models',
          ],
        },
        {
          heading: 'Implementation Best Practices',
        },
        {
          heading: 'FAQ Section',
        },
      ],
      coverageRequirements: [
        'Address definition questions with clear, authoritative explanations',
        'Provide comparison frameworks for evaluating solutions',
        'Include real-world use cases and implementation examples',
        'Cover security, compliance, and governance considerations',
        'Address cost optimization and FinOps practices',
        'Include migration and integration guidance',
      ],
      constraints: {
        mustDo: [
          'Include schema markup (Organization, Product, FAQPage)',
          'Reference authoritative sources and industry standards',
          'Address security and compliance considerations',
          'Provide actionable technical guidance',
          'Include internal links to related product pages',
        ],
        mustNotDo: [
          'Make unsubstantiated performance claims',
          'Disparage competitor solutions',
          'Include promotional language or aggressive CTAs',
          'Omit technical depth in favor of brevity',
          'Use fear-based messaging',
        ],
      },
      evidenceRequirements: [
        'Industry standards documentation (ISO, NIST)',
        'Third-party benchmarks and case studies',
        'Technical documentation and architecture diagrams',
        'Compliance certifications and audit reports',
      ],
      claimsChecklist: [
        {
          claim: '99.9% uptime SLA guarantee',
          risk: 'high',
        },
        {
          claim: 'Industry-leading security standards',
          risk: 'medium',
        },
        {
          claim: 'Cost savings of up to 40% compared to on-premises',
          risk: 'high',
        },
        {
          claim: 'Compatible with major cloud providers',
          risk: 'low',
        },
        {
          claim: 'Used by Fortune 500 companies',
          risk: 'medium',
        },
      ],
      seoAiDiscoverability: {
        schema: [
          'Organization',
          'Product',
          'FAQPage',
          'BreadcrumbList',
        ],
        internalLinks: [
          '/products/cloud-infrastructure',
          '/solutions/enterprise-cloud',
          '/resources/cloud-migration-guide',
          '/security/compliance',
          '/pricing/cloud-infrastructure',
        ],
        llmsTxtNote: 'Include in llms.txt under "Cloud Infrastructure" topic category',
      },
      ctaBlocks: {
        primary: {
          label: 'Learn more about our cloud solutions',
          href: '/products/cloud-infrastructure',
        },
        secondary: {
          label: 'Schedule a consultation',
          href: '/contact',
        },
        toneNote: 'Neutral, informational tone. No promotional language.',
      },
      linkedBriefId: 'brief-1',
      generatedAt: '2024-01-15T14:30:00Z',
      validatedAt: '2024-01-15T14:35:00Z',
      snapshotId: 'snapshot-2024-01-15-143000',
    },
    {
      id: 'spec-2',
      title: 'Cloud Cost Optimization (FinOps) FAQ Cluster',
      type: 'faq',
      status: 'approved',
      priority: 'medium',
      confidence: 78,
      primaryTopic: 'Cloud Cost Optimization',
      targetSlug: '/cloud-cost-optimization/faq',
      audience: 'Finance and technical teams managing cloud costs, including FinOps practitioners, cloud architects, and CFOs.',
      patternsTop5: [
        'pattern_definition',
        'pattern_how_to',
        'pattern_checklist',
        'pattern_comparison',
        'pattern_use_case',
      ],
      objective: 'Create a comprehensive FAQ cluster addressing common questions about cloud cost optimization and FinOps practices, improving answer inclusion for cost-related queries.',
      successCriteria: [
        'Increase answer inclusion rate for FinOps and cost optimization questions by 20%',
        'Improve reach within cloud cost optimization topic by 25%',
        'Achieve featured snippet position for "What is FinOps?" query',
      ],
      outline: [
        {
          heading: 'What is FinOps?',
        },
        {
          heading: 'How to reduce cloud costs?',
        },
        {
          heading: 'What are the best practices for cloud cost management?',
        },
        {
          heading: 'How to implement FinOps in your organization?',
        },
        {
          heading: 'Cloud cost optimization tools and strategies',
        },
      ],
      coverageRequirements: [
        'Define FinOps and its core principles',
        'Provide actionable cost optimization strategies',
        'Address common cost management challenges',
        'Include tool recommendations and comparisons',
        'Cover organizational implementation guidance',
      ],
      constraints: {
        mustDo: [
          'Include FAQPage schema markup',
          'Reference FinOps Foundation standards',
          'Provide data-driven examples',
          'Include internal links to cost management resources',
        ],
        mustNotDo: [
          'Make specific cost savings promises',
          'Disparage competitor pricing models',
          'Include promotional language',
          'Omit technical depth',
        ],
      },
      evidenceRequirements: [
        'FinOps Foundation documentation',
        'Industry cost optimization benchmarks',
        'Case studies with anonymized data',
        'Third-party tool comparisons',
      ],
      claimsChecklist: [
        {
          claim: 'Average cost savings of 30-50%',
          risk: 'high',
        },
        {
          claim: 'Industry-standard FinOps practices',
          risk: 'low',
        },
        {
          claim: 'Compatible with all major cloud providers',
          risk: 'medium',
        },
      ],
      seoAiDiscoverability: {
        schema: [
          'FAQPage',
          'Organization',
        ],
        internalLinks: [
          '/resources/finops-guide',
          '/solutions/cost-optimization',
          '/tools/cloud-cost-management',
        ],
      },
      ctaBlocks: {
        primary: {
          label: 'Explore cost optimization solutions',
          href: '/solutions/cost-optimization',
        },
        toneNote: 'Neutral, educational tone.',
      },
      linkedBriefId: 'brief-1',
      generatedAt: '2024-01-15T14:32:00Z',
      validatedAt: '2024-01-15T14:37:00Z',
      snapshotId: 'snapshot-2024-01-15-143000',
    },
    {
      id: 'spec-3',
      title: 'API Reliability & Rate Limits: Best Practices',
      type: 'blog',
      status: 'warning',
      priority: 'medium',
      confidence: 72,
      primaryTopic: 'API Reliability',
      targetSlug: '/blog/api-reliability-rate-limits',
      audience: 'Developers and technical architects building and consuming APIs, including backend engineers, platform teams, and API product managers.',
      patternsTop5: [
        'pattern_how_to',
        'pattern_definition',
        'pattern_troubleshooting',
        'pattern_use_case',
        'pattern_checklist',
      ],
      objective: 'Create authoritative content on API reliability and rate limiting best practices, addressing common developer questions and improving visibility in API-related queries.',
      successCriteria: [
        'Increase answer inclusion rate for API reliability questions by 15%',
        'Improve reach within API topics by 20%',
        'Establish authority signals for technical API content',
      ],
      outline: [
        {
          heading: 'Understanding API Reliability',
        },
        {
          heading: 'Rate Limiting Strategies',
        },
        {
          heading: 'Best Practices for API Design',
        },
        {
          heading: 'Monitoring and Observability',
        },
        {
          heading: 'Common Pitfalls and Solutions',
        },
      ],
      coverageRequirements: [
        'Define API reliability metrics and SLAs',
        'Explain rate limiting algorithms and strategies',
        'Provide implementation examples',
        'Cover monitoring and alerting practices',
        'Address common reliability challenges',
      ],
      constraints: {
        mustDo: [
          'Include technical code examples',
          'Reference industry standards (REST, GraphQL)',
          'Provide actionable implementation guidance',
          'Include internal links to API documentation',
        ],
        mustNotDo: [
          'Make unsubstantiated uptime claims',
          'Disparage competitor APIs',
          'Include promotional language',
          'Omit technical depth',
        ],
      },
      evidenceRequirements: [
        'Technical documentation and specifications',
        'Industry best practices documentation',
        'Code examples and implementation guides',
      ],
      claimsChecklist: [
        {
          claim: '99.99% API uptime',
          risk: 'high',
        },
        {
          claim: 'Industry-leading rate limit handling',
          risk: 'medium',
        },
        {
          claim: 'Compatible with all major API frameworks',
          risk: 'low',
        },
      ],
      seoAiDiscoverability: {
        schema: [
          'Article',
          'Organization',
        ],
        internalLinks: [
          '/docs/api',
          '/developers/api-reference',
          '/resources/api-best-practices',
        ],
      },
      ctaBlocks: {
        primary: {
          label: 'View API documentation',
          href: '/docs/api',
        },
        toneNote: 'Technical, educational tone. No promotional language.',
      },
      linkedBriefId: 'brief-3',
      generatedAt: '2024-01-15T14:34:00Z',
      validatedAt: '2024-01-15T14:39:00Z',
      snapshotId: 'snapshot-2024-01-15-143000',
    },
    {
      id: 'spec-4',
      title: 'Compliance & Governance for Cloud Workloads',
      type: 'blog',
      status: 'approved',
      priority: 'low',
      confidence: 66,
      primaryTopic: 'Cloud Compliance',
      targetSlug: '/blog/cloud-compliance-governance',
      audience: 'Compliance officers, security teams, and IT governance professionals managing cloud workloads, including CISOs and risk management teams.',
      patternsTop5: [
        'pattern_definition',
        'pattern_checklist',
        'pattern_how_to',
        'pattern_trust',
        'pattern_use_case',
      ],
      objective: 'Create comprehensive content on cloud compliance and governance practices, addressing regulatory requirements and common governance questions.',
      successCriteria: [
        'Increase answer inclusion rate for compliance questions by 10%',
        'Improve reach within compliance topics by 15%',
        'Establish authority for governance content',
      ],
      outline: [
        {
          heading: 'Understanding Cloud Compliance Requirements',
        },
        {
          heading: 'Key Regulatory Frameworks',
        },
        {
          heading: 'Governance Best Practices',
        },
        {
          heading: 'Implementation Checklist',
        },
        {
          heading: 'Common Compliance Challenges',
        },
      ],
      coverageRequirements: [
        'Define major compliance frameworks (SOC 2, ISO 27001, GDPR, HIPAA)',
        'Provide governance implementation guidance',
        'Address common compliance challenges',
        'Include audit and assessment best practices',
      ],
      constraints: {
        mustDo: [
          'Reference official compliance standards',
          'Provide accurate framework information',
          'Include internal links to compliance resources',
          'Use authoritative, legal-appropriate language',
        ],
        mustNotDo: [
          'Make compliance certification guarantees',
          'Provide legal advice',
          'Include promotional language',
          'Omit important regulatory nuances',
        ],
      },
      evidenceRequirements: [
        'Official compliance framework documentation',
        'Regulatory guidance documents',
        'Industry best practices documentation',
      ],
      claimsChecklist: [
        {
          claim: 'Fully compliant with all major frameworks',
          risk: 'high',
        },
        {
          claim: 'SOC 2 Type II certified',
          risk: 'low',
        },
        {
          claim: 'GDPR compliant by design',
          risk: 'medium',
        },
      ],
      seoAiDiscoverability: {
        schema: [
          'Article',
          'Organization',
        ],
        internalLinks: [
          '/security/compliance',
          '/resources/compliance-guide',
          '/security/certifications',
        ],
      },
      ctaBlocks: {
        primary: {
          label: 'Learn about our compliance certifications',
          href: '/security/compliance',
        },
        toneNote: 'Authoritative, informational tone. Legal-appropriate language.',
      },
      linkedBriefId: 'brief-2',
      generatedAt: '2024-01-15T14:36:00Z',
      validatedAt: '2024-01-15T14:41:00Z',
      snapshotId: 'snapshot-2024-01-15-143000',
    },
  ],
};

