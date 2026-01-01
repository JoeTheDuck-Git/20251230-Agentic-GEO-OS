export interface Watchlist {
  topics: string[];
  competitors: string[];
  domains: string[];
  patterns: string[];
}

export const watchlistDemo: Watchlist = {
  topics: [
    "Cloud Infrastructure",
    "Data Security",
    "AI Automation",
    "Edge Computing",
    "API Management",
    "DevOps",
    "Compliance",
    "Enterprise Solutions",
  ],
  competitors: [
    "TechRival",
    "SecureNet",
    "CloudTech",
    "DataFlow",
    "InnovateCo",
  ],
  domains: [
    "docs.acmecorp.com",
    "developer.acmecorp.com",
    "aws.amazon.com",
    "cloud.google.com",
    "kubernetes.io",
    "owasp.org",
    "nist.gov",
  ],
  patterns: [
    "pattern_definition",
    "pattern_comparison",
    "pattern_how_to",
    "pattern_alternatives",
  ],
};

