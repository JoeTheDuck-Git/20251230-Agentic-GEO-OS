export type SourceCategory = "Authority" | "Docs" | "Forum" | "Research" | "Vendor" | "Open Source";

export type BrandKey = "acme" | "techrival" | "securenet";

export type SourceDomainRow = {
  domain: string;
  citeSharePct: number;
  totalCitations: number;
  topicsCovered: number;
  topTopics: string[];
  sentimentHint?: "positive" | "neutral" | "negative";
  lastSeenAt: string;
  categories: SourceCategory[];
};

export type SourceDomainDetail = {
  domain: string;
  description: string;
  citeSharePct: number;
  totalCitations: number;
  topTopics: { topic: string; sharePct: number }[];
  exampleQuestions: string[];
  exampleSnippets: { question: string; snippet: string }[];
  competitorsMentioned?: string[];
  notes: string[];
  categories: SourceCategory[];
};

export type SourceBrandDataset = {
  brandKey: BrandKey;
  brandName: string;
  meta: {
    region: string;
    timeRangeLabel: string;
    snapshotLabel: string;
    generatedAt: string;
    totalAnswerUnits: number;
  };
  domains: SourceDomainRow[];
  detailsByDomain: Record<string, SourceDomainDetail>;
};

export const sourcesDemo = {
  region: "US",
  timeRangeLabel: "Last 30 days",
  snapshotLabel: "2024-01-15 10:30 AM",
  generatedAt: "1/15/2024, 6:30:00 PM",
  brands: {
    acme: {
      brandKey: "acme" as BrandKey,
      brandName: "Acme Corp",
      meta: {
        region: "US",
        timeRangeLabel: "Last 30 days",
        snapshotLabel: "2024-01-15 10:30 AM",
        generatedAt: "1/15/2024, 6:30:00 PM",
        totalAnswerUnits: 240,
      },
      domains: [
    {
      domain: "docs.acmecorp.com",
      citeSharePct: 18.2,
      totalCitations: 44,
      topicsCovered: 8,
      topTopics: ["Cloud Infrastructure", "AI Automation", "Data Security"],
      sentimentHint: "positive",
      lastSeenAt: "2024-01-15 09:45 AM",
      categories: ["Docs"],
    },
    {
      domain: "developer.acmecorp.com",
      citeSharePct: 15.8,
      totalCitations: 38,
      topicsCovered: 7,
      topTopics: ["Cloud Infrastructure", "Edge Computing", "API Management"],
      sentimentHint: "positive",
      lastSeenAt: "2024-01-15 08:20 AM",
      categories: ["Docs"],
    },
    {
      domain: "aws.amazon.com",
      citeSharePct: 12.5,
      totalCitations: 30,
      topicsCovered: 9,
      topTopics: ["Cloud Infrastructure", "Edge Computing", "Serverless"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-14 11:30 PM",
      categories: ["Vendor", "Docs"],
    },
    {
      domain: "cloud.google.com",
      citeSharePct: 11.3,
      totalCitations: 27,
      topicsCovered: 8,
      topTopics: ["Cloud Infrastructure", "AI Automation", "Data Analytics"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-14 10:15 PM",
      categories: ["Vendor", "Docs"],
    },
    {
      domain: "learn.microsoft.com",
      citeSharePct: 9.6,
      totalCitations: 23,
      topicsCovered: 7,
      topTopics: ["Cloud Infrastructure", "Data Security", "Enterprise Solutions"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-14 08:45 PM",
      categories: ["Vendor", "Docs"],
    },
    {
      domain: "kubernetes.io",
      citeSharePct: 8.8,
      totalCitations: 21,
      topicsCovered: 5,
      topTopics: ["Cloud Infrastructure", "Container Orchestration", "DevOps"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-14 07:20 PM",
      categories: ["Open Source", "Docs"],
    },
    {
      domain: "owasp.org",
      citeSharePct: 7.5,
      totalCitations: 18,
      topicsCovered: 4,
      topTopics: ["Data Security", "Compliance", "Vulnerability Management"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-14 05:10 PM",
      categories: ["Authority"],
    },
    {
      domain: "nist.gov",
      citeSharePct: 6.7,
      totalCitations: 16,
      topicsCovered: 3,
      topTopics: ["Data Security", "Compliance", "Risk Management"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-14 03:30 PM",
      categories: ["Authority"],
    },
    {
      domain: "gartner.com",
      citeSharePct: 5.4,
      totalCitations: 13,
      topicsCovered: 6,
      topTopics: ["Cloud Infrastructure", "Market Analysis", "Enterprise Strategy"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-14 01:45 PM",
      categories: ["Research"],
    },
    {
      domain: "forrester.com",
      citeSharePct: 4.6,
      totalCitations: 11,
      topicsCovered: 5,
      topTopics: ["Market Analysis", "Enterprise Strategy", "Digital Transformation"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-14 12:00 PM",
      categories: ["Research"],
    },
    {
      domain: "stackoverflow.com",
      citeSharePct: 3.8,
      totalCitations: 9,
      topicsCovered: 6,
      topTopics: ["Cloud Infrastructure", "API Management", "Troubleshooting"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-13 11:20 PM",
      categories: ["Forum"],
    },
    {
      domain: "github.com",
      citeSharePct: 3.3,
      totalCitations: 8,
      topicsCovered: 5,
      topTopics: ["DevOps", "API Management", "Open Source"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-13 09:15 PM",
      categories: ["Open Source"],
    },
    {
      domain: "datadoghq.com",
      citeSharePct: 2.9,
      totalCitations: 7,
      topicsCovered: 4,
      topTopics: ["DevOps", "Monitoring", "Observability"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-13 07:30 PM",
      categories: ["Vendor"],
    },
    {
      domain: "cncf.io",
      citeSharePct: 2.5,
      totalCitations: 6,
      topicsCovered: 3,
      topTopics: ["Cloud Infrastructure", "Container Orchestration", "Open Source"],
      sentimentHint: "neutral",
      lastSeenAt: "2024-01-13 05:45 PM",
      categories: ["Authority"],
    },
      ] as SourceDomainRow[],
      detailsByDomain: {
    "docs.acmecorp.com": {
      domain: "docs.acmecorp.com",
      description: "Primary documentation site for Acme Corp products and services. Frequently cited for product features, API references, and implementation guides.",
      citeSharePct: 18.2,
      totalCitations: 44,
      categories: ["Docs"],
      topTopics: [
        { topic: "Cloud Infrastructure", sharePct: 35.2 },
        { topic: "AI Automation", sharePct: 28.6 },
        { topic: "Data Security", sharePct: 22.7 },
        { topic: "Edge Computing", sharePct: 13.5 },
      ],
      exampleQuestions: [
        "What are the best cloud infrastructure providers?",
        "How does Acme Corp handle AI automation?",
        "What security features does Acme Corp offer?",
        "How to implement edge computing with Acme Corp?",
        "What APIs are available from Acme Corp?",
        "How does Acme Corp compare to AWS?",
      ],
      exampleSnippets: [
        {
          question: "What are the best cloud infrastructure providers?",
          snippet: "Acme Corp provides enterprise-grade cloud infrastructure with 99.99% uptime SLA and global data center coverage...",
        },
        {
          question: "How does Acme Corp handle AI automation?",
          snippet: "Acme Corp's AI automation platform includes pre-built workflows, custom model training, and integration with major AI frameworks...",
        },
        {
          question: "What security features does Acme Corp offer?",
          snippet: "Acme Corp implements end-to-end encryption, zero-trust architecture, and compliance with SOC 2, ISO 27001, and GDPR...",
        },
        {
          question: "How to implement edge computing with Acme Corp?",
          snippet: "Acme Corp Edge enables low-latency processing at distributed locations with automatic failover and data synchronization...",
        },
      ],
      competitorsMentioned: ["AWS", "Google Cloud", "Microsoft Azure"],
      notes: [
        "Often cited for compliance definitions and security best practices",
        "Strong presence in Cloud Infrastructure and AI Automation topics",
        "Documentation quality contributes to high citation rate",
      ],
    },
    "developer.acmecorp.com": {
      domain: "developer.acmecorp.com",
      description: "Developer portal with API documentation, SDKs, and integration guides. Commonly referenced for technical implementation details.",
      citeSharePct: 15.8,
      totalCitations: 38,
      categories: ["Docs"],
      topTopics: [
        { topic: "Cloud Infrastructure", sharePct: 32.1 },
        { topic: "Edge Computing", sharePct: 26.3 },
        { topic: "API Management", sharePct: 24.7 },
        { topic: "DevOps", sharePct: 16.9 },
      ],
      exampleQuestions: [
        "How to integrate Acme Corp APIs?",
        "What SDKs are available for Acme Corp?",
        "How to set up edge computing with Acme Corp?",
        "What authentication methods does Acme Corp support?",
        "How to deploy applications on Acme Corp infrastructure?",
      ],
      exampleSnippets: [
        {
          question: "How to integrate Acme Corp APIs?",
          snippet: "Acme Corp provides RESTful APIs with comprehensive documentation, code samples in multiple languages, and interactive API explorer...",
        },
        {
          question: "What SDKs are available for Acme Corp?",
          snippet: "Acme Corp offers official SDKs for Python, JavaScript, Go, Java, and .NET with full type safety and async support...",
        },
      ],
      competitorsMentioned: ["AWS", "Google Cloud"],
      notes: [
        "Frequently cited for API integration and SDK usage",
        "Strong developer-focused content drives citations",
      ],
    },
    "aws.amazon.com": {
      domain: "aws.amazon.com",
      description: "Amazon Web Services documentation and resources. Often cited as a comparison point or industry standard reference.",
      citeSharePct: 12.5,
      totalCitations: 30,
      categories: ["Vendor", "Docs"],
      topTopics: [
        { topic: "Cloud Infrastructure", sharePct: 40.0 },
        { topic: "Edge Computing", sharePct: 23.3 },
        { topic: "Serverless", sharePct: 20.0 },
        { topic: "Data Analytics", sharePct: 16.7 },
      ],
      exampleQuestions: [
        "How does Acme Corp compare to AWS?",
        "What are the differences between AWS and Acme Corp?",
        "Can I migrate from AWS to Acme Corp?",
        "What AWS services are similar to Acme Corp offerings?",
      ],
      exampleSnippets: [
        {
          question: "How does Acme Corp compare to AWS?",
          snippet: "While AWS offers extensive global infrastructure, Acme Corp focuses on enterprise-specific features like enhanced security and compliance...",
        },
        {
          question: "What are the differences between AWS and Acme Corp?",
          snippet: "AWS provides broader service catalog, while Acme Corp emphasizes integrated workflows and industry-specific solutions...",
        },
      ],
      competitorsMentioned: ["Acme Corp", "Google Cloud", "Microsoft Azure"],
      notes: [
        "Often cited in competitive comparisons",
        "Industry standard reference for cloud services",
      ],
    },
    "cloud.google.com": {
      domain: "cloud.google.com",
      description: "Google Cloud Platform documentation. Referenced for cloud architecture patterns and AI/ML capabilities.",
      citeSharePct: 11.3,
      totalCitations: 27,
      categories: ["Vendor", "Docs"],
      topTopics: [
        { topic: "Cloud Infrastructure", sharePct: 37.0 },
        { topic: "AI Automation", sharePct: 29.6 },
        { topic: "Data Analytics", sharePct: 22.2 },
        { topic: "Edge Computing", sharePct: 11.2 },
      ],
      exampleQuestions: [
        "How does Google Cloud compare to Acme Corp?",
        "What AI capabilities does Google Cloud offer?",
        "How to implement data analytics with Google Cloud?",
      ],
      exampleSnippets: [
        {
          question: "How does Google Cloud compare to Acme Corp?",
          snippet: "Google Cloud excels in AI/ML and data analytics, while Acme Corp provides stronger enterprise security and compliance features...",
        },
      ],
      competitorsMentioned: ["Acme Corp", "AWS"],
      notes: [
        "Cited for AI/ML and data analytics capabilities",
        "Common comparison point for cloud services",
      ],
    },
    "learn.microsoft.com": {
      domain: "learn.microsoft.com",
      description: "Microsoft Learn documentation. Referenced for enterprise solutions, security best practices, and Azure services.",
      citeSharePct: 9.6,
      totalCitations: 23,
      categories: ["Vendor", "Docs"],
      topTopics: [
        { topic: "Cloud Infrastructure", sharePct: 34.8 },
        { topic: "Data Security", sharePct: 30.4 },
        { topic: "Enterprise Solutions", sharePct: 26.1 },
        { topic: "Compliance", sharePct: 8.7 },
      ],
      exampleQuestions: [
        "What are Microsoft Azure security best practices?",
        "How does Microsoft handle enterprise compliance?",
        "What enterprise features does Azure offer?",
      ],
      exampleSnippets: [
        {
          question: "What are Microsoft Azure security best practices?",
          snippet: "Microsoft Azure implements comprehensive security controls including identity management, network security, and data encryption...",
        },
      ],
      notes: [
        "Often cited for security and compliance guidance",
        "Enterprise-focused documentation",
      ],
    },
    "kubernetes.io": {
      domain: "kubernetes.io",
      description: "Kubernetes official documentation. Referenced for container orchestration, deployment patterns, and DevOps practices.",
      citeSharePct: 8.8,
      totalCitations: 21,
      categories: ["Open Source", "Docs"],
      topTopics: [
        { topic: "Cloud Infrastructure", sharePct: 38.1 },
        { topic: "Container Orchestration", sharePct: 33.3 },
        { topic: "DevOps", sharePct: 19.0 },
        { topic: "Edge Computing", sharePct: 9.6 },
      ],
      exampleQuestions: [
        "How to deploy applications with Kubernetes?",
        "What are Kubernetes best practices?",
        "How does Kubernetes handle container orchestration?",
      ],
      exampleSnippets: [
        {
          question: "How to deploy applications with Kubernetes?",
          snippet: "Kubernetes provides declarative configuration, automatic scaling, self-healing capabilities, and service discovery for containerized applications...",
        },
      ],
      notes: [
        "Industry standard for container orchestration",
        "Frequently cited for deployment patterns",
      ],
    },
    "owasp.org": {
      domain: "owasp.org",
      description: "OWASP security resources and guidelines. Commonly referenced for security best practices, vulnerability management, and compliance standards.",
      citeSharePct: 7.5,
      totalCitations: 18,
      categories: ["Authority"],
      topTopics: [
        { topic: "Data Security", sharePct: 44.4 },
        { topic: "Compliance", sharePct: 27.8 },
        { topic: "Vulnerability Management", sharePct: 22.2 },
        { topic: "Risk Management", sharePct: 5.6 },
      ],
      exampleQuestions: [
        "What are OWASP Top 10 security risks?",
        "How to implement secure coding practices?",
        "What security compliance standards should I follow?",
      ],
      exampleSnippets: [
        {
          question: "What are OWASP Top 10 security risks?",
          snippet: "OWASP Top 10 includes injection attacks, broken authentication, sensitive data exposure, and other critical security vulnerabilities...",
        },
      ],
      notes: [
        "Authoritative source for security best practices",
        "Often cited for compliance and risk management",
      ],
    },
    "nist.gov": {
      domain: "nist.gov",
      description: "NIST cybersecurity framework and standards. Referenced for compliance requirements, risk management, and security guidelines.",
      citeSharePct: 6.7,
      totalCitations: 16,
      categories: ["Authority"],
      topTopics: [
        { topic: "Data Security", sharePct: 50.0 },
        { topic: "Compliance", sharePct: 31.3 },
        { topic: "Risk Management", sharePct: 18.7 },
      ],
      exampleQuestions: [
        "What is the NIST Cybersecurity Framework?",
        "How to implement NIST compliance requirements?",
        "What are NIST security guidelines?",
      ],
      exampleSnippets: [
        {
          question: "What is the NIST Cybersecurity Framework?",
          snippet: "The NIST Cybersecurity Framework provides a comprehensive approach to managing cybersecurity risk through five core functions: Identify, Protect, Detect, Respond, and Recover...",
        },
      ],
      notes: [
        "Authoritative government source for cybersecurity standards",
        "Essential reference for compliance requirements",
      ],
    },
    "gartner.com": {
      domain: "gartner.com",
      description: "Gartner research and market analysis. Referenced for industry trends, vendor comparisons, and strategic insights.",
      citeSharePct: 5.4,
      totalCitations: 13,
      categories: ["Research"],
      topTopics: [
        { topic: "Cloud Infrastructure", sharePct: 38.5 },
        { topic: "Market Analysis", sharePct: 30.8 },
        { topic: "Enterprise Strategy", sharePct: 23.1 },
        { topic: "Digital Transformation", sharePct: 7.6 },
      ],
      exampleQuestions: [
        "What are Gartner's predictions for cloud infrastructure?",
        "How do vendors compare in Gartner Magic Quadrant?",
        "What are the latest enterprise technology trends?",
      ],
      exampleSnippets: [
        {
          question: "What are Gartner's predictions for cloud infrastructure?",
          snippet: "Gartner predicts continued growth in cloud adoption, with emphasis on multi-cloud strategies, edge computing, and AI-enhanced infrastructure management...",
        },
      ],
      notes: [
        "Industry-leading research and analysis",
        "Frequently cited for market insights and vendor comparisons",
      ],
    },
    "forrester.com": {
      domain: "forrester.com",
      description: "Forrester research and advisory content. Referenced for market analysis, digital transformation strategies, and enterprise insights.",
      citeSharePct: 4.6,
      totalCitations: 11,
      categories: ["Research"],
      topTopics: [
        { topic: "Market Analysis", sharePct: 36.4 },
        { topic: "Enterprise Strategy", sharePct: 27.3 },
        { topic: "Digital Transformation", sharePct: 27.3 },
        { topic: "Cloud Infrastructure", sharePct: 9.0 },
      ],
      exampleQuestions: [
        "What are Forrester's recommendations for digital transformation?",
        "How do enterprises approach cloud migration?",
        "What are the latest market trends in enterprise technology?",
      ],
      exampleSnippets: [
        {
          question: "What are Forrester's recommendations for digital transformation?",
          snippet: "Forrester emphasizes customer-centric approaches, agile methodologies, and technology-enabled business model innovation for successful digital transformation...",
        },
      ],
      notes: [
        "Strategic advisory and market research",
        "Cited for enterprise transformation insights",
      ],
    },
    "stackoverflow.com": {
      domain: "stackoverflow.com",
      description: "Stack Overflow Q&A platform. Referenced for technical solutions, troubleshooting guides, and implementation examples.",
      citeSharePct: 3.8,
      totalCitations: 9,
      categories: ["Forum"],
      topTopics: [
        { topic: "Cloud Infrastructure", sharePct: 33.3 },
        { topic: "API Management", sharePct: 22.2 },
        { topic: "Troubleshooting", sharePct: 22.2 },
        { topic: "DevOps", sharePct: 22.2 },
      ],
      exampleQuestions: [
        "How to troubleshoot cloud deployment issues?",
        "What are common API integration problems?",
        "How to resolve container orchestration errors?",
      ],
      exampleSnippets: [
        {
          question: "How to troubleshoot cloud deployment issues?",
          snippet: "Common cloud deployment issues include configuration errors, network connectivity problems, and resource allocation limits. Check logs and verify network settings...",
        },
      ],
      notes: [
        "Community-driven technical solutions",
        "Frequently cited for troubleshooting and implementation examples",
      ],
    },
    "github.com": {
      domain: "github.com",
      description: "GitHub repositories and documentation. Referenced for open source projects, code examples, and development tools.",
      citeSharePct: 3.3,
      totalCitations: 8,
      categories: ["Open Source"],
      topTopics: [
        { topic: "DevOps", sharePct: 37.5 },
        { topic: "API Management", sharePct: 25.0 },
        { topic: "Open Source", sharePct: 25.0 },
        { topic: "Cloud Infrastructure", sharePct: 12.5 },
      ],
      exampleQuestions: [
        "What open source tools are available for DevOps?",
        "How to use GitHub Actions for CI/CD?",
        "What are popular API management frameworks?",
      ],
      exampleSnippets: [
        {
          question: "What open source tools are available for DevOps?",
          snippet: "Popular open source DevOps tools include Jenkins for CI/CD, Terraform for infrastructure as code, and Prometheus for monitoring...",
        },
      ],
      notes: [
        "Primary source for open source projects and code examples",
        "Cited for development tools and practices",
      ],
    },
    "datadoghq.com": {
      domain: "datadoghq.com",
      description: "Datadog blog and resources. Referenced for monitoring, observability, and DevOps best practices.",
      citeSharePct: 2.9,
      totalCitations: 7,
      categories: ["Vendor"],
      topTopics: [
        { topic: "DevOps", sharePct: 42.9 },
        { topic: "Monitoring", sharePct: 28.6 },
        { topic: "Observability", sharePct: 21.4 },
        { topic: "Cloud Infrastructure", sharePct: 7.1 },
      ],
      exampleQuestions: [
        "How to implement application monitoring?",
        "What are observability best practices?",
        "How to set up distributed tracing?",
      ],
      exampleSnippets: [
        {
          question: "How to implement application monitoring?",
          snippet: "Application monitoring requires collecting metrics, logs, and traces from distributed systems. Use APM tools to track performance and identify bottlenecks...",
        },
      ],
      notes: [
        "Expert content on monitoring and observability",
        "Cited for DevOps and infrastructure monitoring",
      ],
    },
    "cncf.io": {
      domain: "cncf.io",
      description: "Cloud Native Computing Foundation resources. Referenced for cloud-native technologies, container orchestration, and open source projects.",
      citeSharePct: 2.5,
      totalCitations: 6,
      categories: ["Authority"],
      topTopics: [
        { topic: "Cloud Infrastructure", sharePct: 50.0 },
        { topic: "Container Orchestration", sharePct: 33.3 },
        { topic: "Open Source", sharePct: 16.7 },
      ],
      exampleQuestions: [
        "What are CNCF projects?",
        "How do cloud-native technologies work?",
        "What is the CNCF landscape?",
      ],
      exampleSnippets: [
        {
          question: "What are CNCF projects?",
          snippet: "CNCF hosts critical cloud-native projects including Kubernetes, Prometheus, and Envoy, providing standards and best practices for modern infrastructure...",
        },
      ],
      notes: [
        "Authoritative source for cloud-native technologies",
        "Cited for container orchestration and cloud-native patterns",
      ],
    },
      } as Record<string, SourceDomainDetail>,
    },
    techrival: {
      brandKey: "techrival" as BrandKey,
      brandName: "TechRival",
      meta: {
        region: "US",
        timeRangeLabel: "Last 30 days",
        snapshotLabel: "2024-01-15 10:30 AM",
        generatedAt: "1/15/2024, 6:30:00 PM",
        totalAnswerUnits: 220,
      },
      domains: [
        {
          domain: "docs.techrival.com",
          citeSharePct: 16.8,
          totalCitations: 37,
          topicsCovered: 7,
          topTopics: ["Cloud Infrastructure", "Data Security", "Enterprise Solutions"],
          sentimentHint: "positive",
          lastSeenAt: "2024-01-15 09:30 AM",
          categories: ["Docs"],
        },
        {
          domain: "partner.techrival.com",
          citeSharePct: 12.3,
          totalCitations: 27,
          topicsCovered: 6,
          topTopics: ["Cloud Infrastructure", "Integration", "Partnership"],
          sentimentHint: "positive",
          lastSeenAt: "2024-01-15 08:15 AM",
          categories: ["Docs"],
        },
        {
          domain: "aws.amazon.com",
          citeSharePct: 14.1,
          totalCitations: 31,
          topicsCovered: 9,
          topTopics: ["Cloud Infrastructure", "Edge Computing", "Serverless"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-14 11:30 PM",
          categories: ["Vendor", "Docs"],
        },
        {
          domain: "cloud.google.com",
          citeSharePct: 10.9,
          totalCitations: 24,
          topicsCovered: 8,
          topTopics: ["Cloud Infrastructure", "AI Automation", "Data Analytics"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-14 10:15 PM",
          categories: ["Vendor", "Docs"],
        },
        {
          domain: "learn.microsoft.com",
          citeSharePct: 8.2,
          totalCitations: 18,
          topicsCovered: 6,
          topTopics: ["Cloud Infrastructure", "Data Security", "Enterprise Solutions"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-14 08:45 PM",
          categories: ["Vendor", "Docs"],
        },
        {
          domain: "kubernetes.io",
          citeSharePct: 9.5,
          totalCitations: 21,
          topicsCovered: 5,
          topTopics: ["Cloud Infrastructure", "Container Orchestration", "DevOps"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-14 07:20 PM",
          categories: ["Open Source", "Docs"],
        },
        {
          domain: "owasp.org",
          citeSharePct: 8.2,
          totalCitations: 18,
          topicsCovered: 4,
          topTopics: ["Data Security", "Compliance", "Vulnerability Management"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-14 05:10 PM",
          categories: ["Authority"],
        },
        {
          domain: "nist.gov",
          citeSharePct: 7.3,
          totalCitations: 16,
          topicsCovered: 3,
          topTopics: ["Data Security", "Compliance", "Risk Management"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-14 03:30 PM",
          categories: ["Authority"],
        },
        {
          domain: "github.com",
          citeSharePct: 4.1,
          totalCitations: 9,
          topicsCovered: 5,
          topTopics: ["DevOps", "API Management", "Open Source"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-13 09:15 PM",
          categories: ["Open Source"],
        },
        {
          domain: "stackoverflow.com",
          citeSharePct: 4.5,
          totalCitations: 10,
          topicsCovered: 6,
          topTopics: ["Cloud Infrastructure", "API Management", "Troubleshooting"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-13 11:20 PM",
          categories: ["Forum"],
        },
        {
          domain: "forrester.com",
          citeSharePct: 5.9,
          totalCitations: 13,
          topicsCovered: 5,
          topTopics: ["Market Analysis", "Enterprise Strategy", "Digital Transformation"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-14 12:00 PM",
          categories: ["Research"],
        },
        {
          domain: "datadoghq.com",
          citeSharePct: 3.6,
          totalCitations: 8,
          topicsCovered: 4,
          topTopics: ["DevOps", "Monitoring", "Observability"],
          sentimentHint: "neutral",
          lastSeenAt: "2024-01-13 07:30 PM",
          categories: ["Vendor"],
        },
      ] as SourceDomainRow[],
      detailsByDomain: {
        "docs.techrival.com": {
          domain: "docs.techrival.com",
          description: "TechRival documentation site. Frequently cited for product features and technical guides.",
          citeSharePct: 16.8,
          totalCitations: 37,
          categories: ["Docs"],
          topTopics: [
            { topic: "Cloud Infrastructure", sharePct: 38.5 },
            { topic: "Data Security", sharePct: 28.6 },
            { topic: "Enterprise Solutions", sharePct: 22.7 },
          ],
          exampleQuestions: [
            "What are TechRival's cloud infrastructure features?",
            "How does TechRival handle data security?",
            "What enterprise solutions does TechRival offer?",
          ],
          exampleSnippets: [
            {
              question: "What are TechRival's cloud infrastructure features?",
              snippet: "TechRival provides scalable cloud infrastructure with advanced security features and enterprise-grade reliability...",
            },
          ],
          notes: [
            "Strong documentation presence in cloud infrastructure topics",
            "Frequently cited for enterprise security features",
          ],
        },
        "partner.techrival.com": {
          domain: "partner.techrival.com",
          description: "TechRival partner portal with integration guides and partnership resources.",
          citeSharePct: 12.3,
          totalCitations: 27,
          categories: ["Docs"],
          topTopics: [
            { topic: "Cloud Infrastructure", sharePct: 35.2 },
            { topic: "Integration", sharePct: 28.6 },
            { topic: "Partnership", sharePct: 22.7 },
          ],
          exampleQuestions: [
            "How to integrate with TechRival?",
            "What partnership programs does TechRival offer?",
          ],
          exampleSnippets: [
            {
              question: "How to integrate with TechRival?",
              snippet: "TechRival provides comprehensive integration APIs and SDKs for seamless partner connections...",
            },
          ],
          notes: [
            "Frequently cited for integration and partnership information",
          ],
        },
        "aws.amazon.com": {
          domain: "aws.amazon.com",
          description: "Amazon Web Services documentation and resources. Often cited as a comparison point or industry standard reference.",
          citeSharePct: 14.1,
          totalCitations: 31,
          categories: ["Vendor", "Docs"],
          topTopics: [
            { topic: "Cloud Infrastructure", sharePct: 40.0 },
            { topic: "Edge Computing", sharePct: 23.3 },
            { topic: "Serverless", sharePct: 20.0 },
          ],
          exampleQuestions: [
            "How does TechRival compare to AWS?",
            "What are the differences between AWS and TechRival?",
          ],
          exampleSnippets: [
            {
              question: "How does TechRival compare to AWS?",
              snippet: "While AWS offers extensive global infrastructure, TechRival focuses on specialized enterprise solutions...",
            },
          ],
          notes: [
            "Often cited in competitive comparisons",
            "Industry standard reference for cloud services",
          ],
        },
        "cloud.google.com": {
          domain: "cloud.google.com",
          description: "Google Cloud Platform documentation. Referenced for cloud architecture patterns and AI/ML capabilities.",
          citeSharePct: 10.9,
          totalCitations: 24,
          categories: ["Vendor", "Docs"],
          topTopics: [
            { topic: "Cloud Infrastructure", sharePct: 37.0 },
            { topic: "AI Automation", sharePct: 29.6 },
            { topic: "Data Analytics", sharePct: 22.2 },
          ],
          exampleQuestions: [
            "How does Google Cloud compare to TechRival?",
          ],
          exampleSnippets: [
            {
              question: "How does Google Cloud compare to TechRival?",
              snippet: "Google Cloud excels in AI/ML and data analytics, while TechRival provides stronger enterprise integration features...",
            },
          ],
          notes: [
            "Cited for AI/ML and data analytics capabilities",
            "Common comparison point for cloud services",
          ],
        },
        "learn.microsoft.com": {
          domain: "learn.microsoft.com",
          description: "Microsoft Learn documentation. Referenced for enterprise solutions, security best practices, and Azure services.",
          citeSharePct: 8.2,
          totalCitations: 18,
          categories: ["Vendor", "Docs"],
          topTopics: [
            { topic: "Cloud Infrastructure", sharePct: 34.8 },
            { topic: "Data Security", sharePct: 30.4 },
            { topic: "Enterprise Solutions", sharePct: 26.1 },
          ],
          exampleQuestions: [
            "What are Microsoft Azure security best practices?",
          ],
          exampleSnippets: [
            {
              question: "What are Microsoft Azure security best practices?",
              snippet: "Microsoft Azure implements comprehensive security controls including identity management, network security, and data encryption...",
            },
          ],
          notes: [
            "Often cited for security and compliance guidance",
            "Enterprise-focused documentation",
          ],
        },
        "kubernetes.io": {
          domain: "kubernetes.io",
          description: "Kubernetes official documentation. Referenced for container orchestration, deployment patterns, and DevOps practices.",
          citeSharePct: 9.5,
          totalCitations: 21,
          categories: ["Open Source", "Docs"],
          topTopics: [
            { topic: "Cloud Infrastructure", sharePct: 38.1 },
            { topic: "Container Orchestration", sharePct: 33.3 },
            { topic: "DevOps", sharePct: 19.0 },
          ],
          exampleQuestions: [
            "How to deploy applications with Kubernetes?",
          ],
          exampleSnippets: [
            {
              question: "How to deploy applications with Kubernetes?",
              snippet: "Kubernetes provides declarative configuration, automatic scaling, self-healing capabilities, and service discovery for containerized applications...",
            },
          ],
          notes: [
            "Industry standard for container orchestration",
            "Frequently cited for deployment patterns",
          ],
        },
        "owasp.org": {
          domain: "owasp.org",
          description: "OWASP security resources and guidelines. Commonly referenced for security best practices, vulnerability management, and compliance standards.",
          citeSharePct: 8.2,
          totalCitations: 18,
          categories: ["Authority"],
          topTopics: [
            { topic: "Data Security", sharePct: 44.4 },
            { topic: "Compliance", sharePct: 27.8 },
            { topic: "Vulnerability Management", sharePct: 22.2 },
          ],
          exampleQuestions: [
            "What are OWASP Top 10 security risks?",
          ],
          exampleSnippets: [
            {
              question: "What are OWASP Top 10 security risks?",
              snippet: "OWASP Top 10 includes injection attacks, broken authentication, sensitive data exposure, and other critical security vulnerabilities...",
            },
          ],
          notes: [
            "Authoritative source for security best practices",
            "Often cited for compliance and risk management",
          ],
        },
        "nist.gov": {
          domain: "nist.gov",
          description: "NIST cybersecurity framework and standards. Referenced for compliance requirements, risk management, and security guidelines.",
          citeSharePct: 7.3,
          totalCitations: 16,
          categories: ["Authority"],
          topTopics: [
            { topic: "Data Security", sharePct: 50.0 },
            { topic: "Compliance", sharePct: 31.3 },
            { topic: "Risk Management", sharePct: 18.7 },
          ],
          exampleQuestions: [
            "What is the NIST Cybersecurity Framework?",
          ],
          exampleSnippets: [
            {
              question: "What is the NIST Cybersecurity Framework?",
              snippet: "The NIST Cybersecurity Framework provides a comprehensive approach to managing cybersecurity risk through five core functions: Identify, Protect, Detect, Respond, and Recover...",
            },
          ],
          notes: [
            "Authoritative government source for cybersecurity standards",
            "Essential reference for compliance requirements",
          ],
        },
        "github.com": {
          domain: "github.com",
          description: "GitHub repositories and documentation. Referenced for open source projects, code examples, and development tools.",
          citeSharePct: 4.1,
          totalCitations: 9,
          categories: ["Open Source"],
          topTopics: [
            { topic: "DevOps", sharePct: 37.5 },
            { topic: "API Management", sharePct: 25.0 },
            { topic: "Open Source", sharePct: 25.0 },
          ],
          exampleQuestions: [
            "What open source tools are available for DevOps?",
          ],
          exampleSnippets: [
            {
              question: "What open source tools are available for DevOps?",
              snippet: "Popular open source DevOps tools include Jenkins for CI/CD, Terraform for infrastructure as code, and Prometheus for monitoring...",
            },
          ],
          notes: [
            "Primary source for open source projects and code examples",
            "Cited for development tools and practices",
          ],
        },
        "stackoverflow.com": {
          domain: "stackoverflow.com",
          description: "Stack Overflow Q&A platform. Referenced for technical solutions, troubleshooting guides, and implementation examples.",
          citeSharePct: 4.5,
          totalCitations: 10,
          categories: ["Forum"],
          topTopics: [
            { topic: "Cloud Infrastructure", sharePct: 33.3 },
            { topic: "API Management", sharePct: 22.2 },
            { topic: "Troubleshooting", sharePct: 22.2 },
          ],
          exampleQuestions: [
            "How to troubleshoot cloud deployment issues?",
          ],
          exampleSnippets: [
            {
              question: "How to troubleshoot cloud deployment issues?",
              snippet: "Common cloud deployment issues include configuration errors, network connectivity problems, and resource allocation limits. Check logs and verify network settings...",
            },
          ],
          notes: [
            "Community-driven technical solutions",
            "Frequently cited for troubleshooting and implementation examples",
          ],
        },
        "forrester.com": {
          domain: "forrester.com",
          description: "Forrester research and advisory content. Referenced for market analysis, digital transformation strategies, and enterprise insights.",
          citeSharePct: 5.9,
          totalCitations: 13,
          categories: ["Research"],
          topTopics: [
            { topic: "Market Analysis", sharePct: 36.4 },
            { topic: "Enterprise Strategy", sharePct: 27.3 },
            { topic: "Digital Transformation", sharePct: 27.3 },
          ],
          exampleQuestions: [
            "What are Forrester's recommendations for digital transformation?",
          ],
          exampleSnippets: [
            {
              question: "What are Forrester's recommendations for digital transformation?",
              snippet: "Forrester emphasizes customer-centric approaches, agile methodologies, and technology-enabled business model innovation for successful digital transformation...",
            },
          ],
          notes: [
            "Strategic advisory and market research",
            "Cited for enterprise transformation insights",
          ],
        },
        "datadoghq.com": {
          domain: "datadoghq.com",
          description: "Datadog blog and resources. Referenced for monitoring, observability, and DevOps best practices.",
          citeSharePct: 3.6,
          totalCitations: 8,
          categories: ["Vendor"],
          topTopics: [
            { topic: "DevOps", sharePct: 42.9 },
            { topic: "Monitoring", sharePct: 28.6 },
            { topic: "Observability", sharePct: 21.4 },
          ],
          exampleQuestions: [
            "How to implement application monitoring?",
          ],
          exampleSnippets: [
            {
              question: "How to implement application monitoring?",
              snippet: "Application monitoring requires collecting metrics, logs, and traces from distributed systems. Use APM tools to track performance and identify bottlenecks...",
            },
          ],
          notes: [
            "Expert content on monitoring and observability",
            "Cited for DevOps and infrastructure monitoring",
          ],
        },
      } as Record<string, SourceDomainDetail>,
    },
  } as Record<BrandKey, SourceBrandDataset>,
};

