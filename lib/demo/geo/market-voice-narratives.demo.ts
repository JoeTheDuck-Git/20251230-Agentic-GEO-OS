export interface CreditedForItem {
  competitor: string;
  theme: string;
  support: {
    sharePct: number;
    topDomains: string[];
    topTopics: string[];
  };
  exampleQuestions: string[];
}

export interface Descriptors {
  acme: {
    positive: string[];
    neutral: string[];
    negative: string[];
  };
  rival: {
    positive: string[];
    neutral: string[];
    negative: string[];
  };
}

export interface Claim {
  claimId: string;
  claim: string;
  stance: "supporting" | "challenging" | "mixed";
  citedDomains: string[];
  patterns: string[];
  exampleQuestions: string[];
  notes: string[];
}

export interface MarketVoiceNarratives {
  meta: {
    brand: string;
    competitor: string;
    region: string;
    range: string;
    snapshot: string;
  };
  creditedFor: CreditedForItem[];
  descriptors: Descriptors;
  claims: Claim[];
}

export const marketVoiceNarrativesDemo: MarketVoiceNarratives = {
  meta: {
    brand: "Acme Corp",
    competitor: "TechRival",
    region: "US",
    range: "Last 30 days",
    snapshot: "2024-01-15 10:30 AM",
  },
  creditedFor: [
    {
      competitor: "TechRival",
      theme: "Compliance readiness",
      support: {
        sharePct: 42,
        topDomains: ["gartner.com", "nist.gov", "owasp.org"],
        topTopics: ["Data Security", "Compliance", "Enterprise Solutions"],
      },
      exampleQuestions: [
        "Which cloud provider has the best compliance certifications?",
        "What are TechRival's security compliance standards?",
        "How does TechRival handle GDPR compliance?",
      ],
    },
    {
      competitor: "TechRival",
      theme: "Lower TCO",
      support: {
        sharePct: 38,
        topDomains: ["techcrunch.com", "forrester.com", "gartner.com"],
        topTopics: ["Cloud Infrastructure", "Cost Optimization"],
      },
      exampleQuestions: [
        "Which cloud provider offers the best total cost of ownership?",
        "How does TechRival's pricing compare to competitors?",
        "What are the hidden costs of TechRival's platform?",
      ],
    },
    {
      competitor: "SecureNet",
      theme: "Enterprise security",
      support: {
        sharePct: 35,
        topDomains: ["nist.gov", "owasp.org", "securityweek.com"],
        topTopics: ["Data Security", "Enterprise Solutions"],
      },
      exampleQuestions: [
        "What enterprise security features does SecureNet offer?",
        "How does SecureNet compare for enterprise deployments?",
        "Which provider is best for enterprise security requirements?",
      ],
    },
    {
      competitor: "TechRival",
      theme: "Developer experience",
      support: {
        sharePct: 31,
        topDomains: ["stackoverflow.com", "github.com", "developer.techrival.com"],
        topTopics: ["API Management", "DevOps"],
      },
      exampleQuestions: [
        "Which cloud provider has the best developer tools?",
        "How does TechRival's API compare to alternatives?",
        "What developer resources does TechRival provide?",
      ],
    },
    {
      competitor: "CloudTech",
      theme: "Scalability",
      support: {
        sharePct: 28,
        topDomains: ["aws.amazon.com", "cloud.google.com", "kubernetes.io"],
        topTopics: ["Cloud Infrastructure", "Scalability"],
      },
      exampleQuestions: [
        "Which cloud provider scales best for high-traffic applications?",
        "How does CloudTech handle auto-scaling?",
        "What are the scalability limits of CloudTech?",
      ],
    },
    {
      competitor: "TechRival",
      theme: "AI/ML capabilities",
      support: {
        sharePct: 25,
        topDomains: ["techcrunch.com", "venturebeat.com", "ai.techrival.com"],
        topTopics: ["AI Automation", "Machine Learning"],
      },
      exampleQuestions: [
        "Which provider has the best AI/ML features?",
        "How does TechRival's AI compare to Acme?",
        "What AI capabilities does TechRival offer?",
      ],
    },
    {
      competitor: "SecureNet",
      theme: "Zero-trust architecture",
      support: {
        sharePct: 22,
        topDomains: ["nist.gov", "cisa.gov", "securityweek.com"],
        topTopics: ["Data Security", "Enterprise Solutions"],
      },
      exampleQuestions: [
        "Which provider implements zero-trust architecture?",
        "How does SecureNet's security model work?",
        "What are the zero-trust features of SecureNet?",
      ],
    },
    {
      competitor: "CloudTech",
      theme: "Multi-cloud support",
      support: {
        sharePct: 19,
        topDomains: ["gartner.com", "forrester.com", "cloudtech.com"],
        topTopics: ["Cloud Infrastructure", "Enterprise Solutions"],
      },
      exampleQuestions: [
        "Which provider supports multi-cloud deployments?",
        "How does CloudTech handle multi-cloud management?",
        "What multi-cloud features does CloudTech offer?",
      ],
    },
  ],
  descriptors: {
    acme: {
      positive: [
        "reliable",
        "scalable",
        "enterprise-grade",
        "well-documented",
        "innovative",
        "user-friendly",
        "robust",
        "comprehensive",
        "flexible",
        "mature",
        "trusted",
        "efficient",
        "powerful",
        "modern",
      ],
      neutral: [
        "cloud-based",
        "SaaS",
        "enterprise",
        "platform",
        "solution",
        "service",
        "tool",
        "system",
        "infrastructure",
        "technology",
      ],
      negative: [
        "expensive",
        "complex",
        "limited",
        "slow",
        "outdated",
        "rigid",
        "over-engineered",
      ],
    },
    rival: {
      positive: [
        "cost-effective",
        "compliant",
        "secure",
        "fast",
        "modern",
        "flexible",
        "innovative",
        "reliable",
        "scalable",
        "enterprise-ready",
        "developer-friendly",
        "comprehensive",
        "advanced",
        "cutting-edge",
      ],
      neutral: [
        "cloud provider",
        "platform",
        "solution",
        "service",
        "SaaS",
        "enterprise",
        "tool",
        "system",
        "infrastructure",
        "technology",
      ],
      negative: [
        "new",
        "unproven",
        "limited",
        "complex",
        "challenging",
        "steep learning curve",
      ],
    },
  },
  claims: [
    {
      claimId: "claim-001",
      claim: "Acme provides enterprise-grade security",
      stance: "supporting",
      citedDomains: ["docs.acmecorp.com", "nist.gov", "owasp.org"],
      patterns: ["pattern_definition", "pattern_trust"],
      exampleQuestions: [
        "What security features does Acme provide?",
        "Is Acme secure for enterprise use?",
        "How does Acme ensure data security?",
      ],
      notes: [
        "Strong support in official documentation",
        "Cited in compliance discussions",
        "Positive sentiment in security-focused questions",
      ],
    },
    {
      claimId: "claim-002",
      claim: "TechRival offers lower total cost of ownership",
      stance: "challenging",
      citedDomains: ["gartner.com", "forrester.com", "techrival.com"],
      patterns: ["pattern_comparison", "pattern_pricing"],
      exampleQuestions: [
        "Which provider has lower TCO: Acme or TechRival?",
        "How does TechRival's pricing compare?",
        "What are the hidden costs of Acme?",
      ],
      notes: [
        "Frequently cited in cost comparison questions",
        "TechRival often positioned as more cost-effective",
        "Acme needs stronger cost messaging",
      ],
    },
    {
      claimId: "claim-003",
      claim: "Acme has superior scalability",
      stance: "supporting",
      citedDomains: ["aws.amazon.com", "kubernetes.io", "docs.acmecorp.com"],
      patterns: ["pattern_comparison", "pattern_use_case"],
      exampleQuestions: [
        "Which provider scales better: Acme or TechRival?",
        "How does Acme handle high-traffic applications?",
        "What are Acme's scalability limits?",
      ],
      notes: [
        "Strong technical documentation support",
        "Positive mentions in scalability discussions",
        "Competitive advantage in this area",
      ],
    },
    {
      claimId: "claim-004",
      claim: "TechRival has better compliance certifications",
      stance: "challenging",
      citedDomains: ["gartner.com", "nist.gov", "compliance.techrival.com"],
      patterns: ["pattern_comparison", "pattern_definition"],
      exampleQuestions: [
        "Which provider has better compliance: Acme or TechRival?",
        "What compliance certifications does TechRival have?",
        "How does TechRival handle GDPR compliance?",
      ],
      notes: [
        "TechRival frequently credited for compliance",
        "Acme needs stronger compliance messaging",
        "Important for enterprise buyers",
      ],
    },
    {
      claimId: "claim-005",
      claim: "Acme provides better developer experience",
      stance: "mixed",
      citedDomains: ["stackoverflow.com", "github.com", "developer.acmecorp.com"],
      patterns: ["pattern_comparison", "pattern_how_to"],
      exampleQuestions: [
        "Which provider has better developer tools?",
        "How does Acme's API compare to TechRival?",
        "What developer resources does Acme provide?",
      ],
      notes: [
        "Mixed signals: strong documentation but TechRival also praised",
        "Developer community discussions favor both",
        "Opportunity to strengthen developer messaging",
      ],
    },
    {
      claimId: "claim-006",
      claim: "Acme offers comprehensive AI/ML capabilities",
      stance: "supporting",
      citedDomains: ["docs.acmecorp.com", "ai.acmecorp.com", "techcrunch.com"],
      patterns: ["pattern_definition", "pattern_use_case"],
      exampleQuestions: [
        "What AI features does Acme offer?",
        "How does Acme's AI compare to competitors?",
        "What are Acme's machine learning capabilities?",
      ],
      notes: [
        "Strong technical documentation",
        "Positive coverage in tech media",
        "Competitive strength in AI/ML",
      ],
    },
    {
      claimId: "claim-007",
      claim: "TechRival is easier to implement",
      stance: "challenging",
      citedDomains: ["forrester.com", "gartner.com", "techrival.com"],
      patterns: ["pattern_comparison", "pattern_how_to"],
      exampleQuestions: [
        "Which provider is easier to set up: Acme or TechRival?",
        "How long does it take to implement TechRival?",
        "What is the implementation complexity of Acme?",
      ],
      notes: [
        "TechRival positioned as easier to adopt",
        "Acme perceived as more complex",
        "Implementation ease is a key differentiator",
      ],
    },
    {
      claimId: "claim-008",
      claim: "Acme provides better customer support",
      stance: "supporting",
      citedDomains: ["docs.acmecorp.com", "support.acmecorp.com", "trustpilot.com"],
      patterns: ["pattern_comparison", "pattern_trust"],
      exampleQuestions: [
        "How does Acme's customer support compare?",
        "What support options does Acme provide?",
        "Is Acme's support responsive?",
      ],
      notes: [
        "Positive mentions in support discussions",
        "Strong documentation of support processes",
        "Competitive advantage in customer service",
      ],
    },
    {
      claimId: "claim-009",
      claim: "TechRival has better integration ecosystem",
      stance: "challenging",
      citedDomains: ["techrival.com", "integrations.techrival.com", "gartner.com"],
      patterns: ["pattern_integrations", "pattern_comparison"],
      exampleQuestions: [
        "Which provider has better integrations: Acme or TechRival?",
        "What integrations does TechRival support?",
        "How does Acme's integration ecosystem compare?",
      ],
      notes: [
        "TechRival frequently mentioned for integrations",
        "Acme needs stronger integration messaging",
        "Important for enterprise buyers",
      ],
    },
    {
      claimId: "claim-010",
      claim: "Acme offers superior performance",
      stance: "mixed",
      citedDomains: ["docs.acmecorp.com", "benchmarks.acmecorp.com", "stackoverflow.com"],
      patterns: ["pattern_comparison", "pattern_definition"],
      exampleQuestions: [
        "Which provider has better performance: Acme or TechRival?",
        "How does Acme's performance compare?",
        "What are Acme's performance benchmarks?",
      ],
      notes: [
        "Mixed signals: strong technical claims but limited public benchmarks",
        "Performance discussions favor both providers",
        "Opportunity to strengthen performance messaging with data",
      ],
    },
  ],
};

