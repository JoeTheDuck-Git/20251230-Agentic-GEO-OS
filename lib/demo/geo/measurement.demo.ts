export type ContentAssetId = string;
export type PeriodKey = "current" | "baseline";

export interface ContentAsset {
  id: ContentAssetId;
  title: string;
  topicId: string;
  topicName: string;
  pattern: string;
  intent: "SEO Page" | "Blog" | "Landing Page";
  targetUrl: string;
  createdFrom: {
    briefId?: string;
    specId?: string;
    claimId?: string;
    matrixCell?: { topicId: string; pattern: string };
  };
  status: "Draft" | "Spec Ready" | "Published (stub)";
  createdAt: string;
  lastUpdatedAt: string;
}

export interface AssetMetrics {
  assetId: ContentAssetId;
  period: PeriodKey;
  dateRangeLabel: string;
  sessions: number;
  clicks: number;
  avgEngagementTimeSec: number;
  conversions: number;
  conversionRatePct: number;
  ctrPct: number;
  topChannels: { channel: string; sessions: number; sharePct: number }[];
  topQueries: { query: string; clicks: number; ctrPct: number }[];
  topLandingKeywords: { keyword: string; impressions: number; clicks: number }[];
  notes?: string[];
}

export interface AssetTimeseriesPoint {
  date: string;
  sessions: number;
  clicks: number;
  conversions: number;
}

export interface MeasurementDemo {
  meta: {
    brandName: string;
    dataSourceLabel: string;
    baselineMode: string;
    generatedAt: string;
  };
  assets: ContentAsset[];
  metricsByAsset: Record<ContentAssetId, { current: AssetMetrics; baseline: AssetMetrics }>;
  timeseriesByAsset: Record<ContentAssetId, AssetTimeseriesPoint[]>;
}

export const measurementDemo: MeasurementDemo = {
  meta: {
    brandName: "Acme Corp",
    dataSourceLabel: "Demo GA4",
    baselineMode: "Previous period (same duration)",
    generatedAt: "2024-01-15T16:00:00Z",
  },
  assets: [
    {
      id: "asset-001",
      title: "Cloud Infrastructure Buyer's Guide",
      topicId: "cloud-infrastructure",
      topicName: "Cloud Infrastructure",
      pattern: "pattern_comparison",
      intent: "Landing Page",
      targetUrl: "/cloud-infrastructure/buyers-guide",
      createdFrom: {
        briefId: "brief-1",
        specId: "spec-1",
      },
      status: "Published (stub)",
      createdAt: "2024-01-10T10:00:00Z",
      lastUpdatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "asset-002",
      title: "Cloud Cost Optimization FAQ Cluster",
      topicId: "cloud-cost-optimization",
      topicName: "Cloud Cost Optimization",
      pattern: "pattern_definition",
      intent: "SEO Page",
      targetUrl: "/cloud-cost-optimization/faq",
      createdFrom: {
        briefId: "brief-1",
        specId: "spec-2",
      },
      status: "Published (stub)",
      createdAt: "2024-01-11T14:00:00Z",
      lastUpdatedAt: "2024-01-15T11:00:00Z",
    },
    {
      id: "asset-003",
      title: "llms.txt Implementation Guide",
      topicId: "ai-discoverability",
      topicName: "AI Discoverability",
      pattern: "pattern_how_to",
      intent: "Blog",
      targetUrl: "/guides/llms-txt-implementation",
      createdFrom: {
        briefId: "brief-2",
        specId: "spec-3",
      },
      status: "Published (stub)",
      createdAt: "2024-01-12T09:00:00Z",
      lastUpdatedAt: "2024-01-15T12:00:00Z",
    },
    {
      id: "asset-004",
      title: "AI Automation Workforce Transition Guide",
      topicId: "ai-automation",
      topicName: "AI Automation",
      pattern: "pattern_pros_cons",
      intent: "Landing Page",
      targetUrl: "/ai-automation/workforce-transition",
      createdFrom: {
        briefId: "brief-3",
        specId: "spec-4",
      },
      status: "Published (stub)",
      createdAt: "2024-01-13T10:00:00Z",
      lastUpdatedAt: "2024-01-15T13:00:00Z",
    },
    {
      id: "asset-005",
      title: "SOC 2 Compliance Checklist for Cloud Teams",
      topicId: "data-security",
      topicName: "Data Security",
      pattern: "pattern_checklist",
      intent: "SEO Page",
      targetUrl: "/guides/soc2-checklist",
      createdFrom: {
        briefId: "brief-1",
      },
      status: "Published (stub)",
      createdAt: "2024-01-14T08:00:00Z",
      lastUpdatedAt: "2024-01-15T14:00:00Z",
    },
    {
      id: "asset-006",
      title: "Cloud Infrastructure vs On-Premise Comparison",
      topicId: "cloud-infrastructure",
      topicName: "Cloud Infrastructure",
      pattern: "pattern_comparison",
      intent: "Landing Page",
      targetUrl: "/cloud-infrastructure/comparison",
      createdFrom: {
        briefId: "brief-1",
      },
      status: "Published (stub)",
      createdAt: "2024-01-14T15:00:00Z",
      lastUpdatedAt: "2024-01-15T15:00:00Z",
    },
    {
      id: "asset-007",
      title: "Data Security Best Practices",
      topicId: "data-security",
      topicName: "Data Security",
      pattern: "pattern_recommendation",
      intent: "Blog",
      targetUrl: "/blog/data-security-best-practices",
      createdFrom: {
        claimId: "claim-001",
      },
      status: "Published (stub)",
      createdAt: "2024-01-15T09:00:00Z",
      lastUpdatedAt: "2024-01-15T16:00:00Z",
    },
    {
      id: "asset-008",
      title: "API Reliability Troubleshooting Guide",
      topicId: "api-management",
      topicName: "API Management",
      pattern: "pattern_troubleshooting",
      intent: "SEO Page",
      targetUrl: "/guides/api-reliability-troubleshooting",
      createdFrom: {
        briefId: "brief-2",
      },
      status: "Draft",
      createdAt: "2024-01-15T10:00:00Z",
      lastUpdatedAt: "2024-01-15T16:00:00Z",
    },
  ],
  metricsByAsset: {
    "asset-001": {
      current: {
        assetId: "asset-001",
        period: "current",
        dateRangeLabel: "Last 30 days",
        sessions: 8450,
        clicks: 12300,
        avgEngagementTimeSec: 180,
        conversions: 142,
        conversionRatePct: 1.68,
        ctrPct: 145.6,
        topChannels: [
          { channel: "Organic Search", sessions: 5120, sharePct: 60.6 },
          { channel: "Direct", sessions: 1890, sharePct: 22.4 },
          { channel: "Referral", sessions: 980, sharePct: 11.6 },
          { channel: "Social", sessions: 460, sharePct: 5.4 },
        ],
        topQueries: [
          { query: "cloud infrastructure comparison", clicks: 890, ctrPct: 12.3 },
          { query: "best cloud infrastructure", clicks: 720, ctrPct: 10.5 },
          { query: "cloud infrastructure guide", clicks: 650, ctrPct: 9.2 },
          { query: "cloud infrastructure solutions", clicks: 580, ctrPct: 8.1 },
        ],
        topLandingKeywords: [
          { keyword: "cloud infrastructure", impressions: 12500, clicks: 890 },
          { keyword: "cloud solutions", impressions: 9800, clicks: 720 },
          { keyword: "infrastructure guide", impressions: 7600, clicks: 650 },
        ],
        notes: [
          "Strong organic performance in comparison queries",
          "High engagement time indicates content depth",
        ],
      },
      baseline: {
        assetId: "asset-001",
        period: "baseline",
        dateRangeLabel: "Previous 30 days",
        sessions: 7200,
        clicks: 10200,
        avgEngagementTimeSec: 165,
        conversions: 118,
        conversionRatePct: 1.64,
        ctrPct: 141.7,
        topChannels: [
          { channel: "Organic Search", sessions: 4320, sharePct: 60.0 },
          { channel: "Direct", sessions: 1620, sharePct: 22.5 },
          { channel: "Referral", sessions: 900, sharePct: 12.5 },
          { channel: "Social", sessions: 360, sharePct: 5.0 },
        ],
        topQueries: [
          { query: "cloud infrastructure comparison", clicks: 750, ctrPct: 11.2 },
          { query: "best cloud infrastructure", clicks: 620, ctrPct: 9.8 },
          { query: "cloud infrastructure guide", clicks: 580, ctrPct: 9.1 },
        ],
        topLandingKeywords: [
          { keyword: "cloud infrastructure", impressions: 11000, clicks: 750 },
          { keyword: "cloud solutions", impressions: 8500, clicks: 620 },
        ],
      },
    },
    "asset-002": {
      current: {
        assetId: "asset-002",
        period: "current",
        dateRangeLabel: "Last 30 days",
        sessions: 6230,
        clicks: 8900,
        avgEngagementTimeSec: 165,
        conversions: 98,
        conversionRatePct: 1.57,
        ctrPct: 142.9,
        topChannels: [
          { channel: "Organic Search", sessions: 4980, sharePct: 79.9 },
          { channel: "Direct", sessions: 870, sharePct: 14.0 },
          { channel: "Referral", sessions: 380, sharePct: 6.1 },
        ],
        topQueries: [
          { query: "cloud cost optimization", clicks: 1120, ctrPct: 15.8 },
          { query: "finops best practices", clicks: 890, ctrPct: 12.6 },
          { query: "reduce cloud costs", clicks: 750, ctrPct: 10.6 },
        ],
        topLandingKeywords: [
          { keyword: "cloud cost optimization", impressions: 9800, clicks: 1120 },
          { keyword: "finops", impressions: 7200, clicks: 890 },
        ],
        notes: [
          "FAQ format drives high organic search traffic",
          "Strong performance in FinOps-related queries",
        ],
      },
      baseline: {
        assetId: "asset-002",
        period: "baseline",
        dateRangeLabel: "Previous 30 days",
        sessions: 5800,
        clicks: 8200,
        avgEngagementTimeSec: 152,
        conversions: 85,
        conversionRatePct: 1.47,
        ctrPct: 141.4,
        topChannels: [
          { channel: "Organic Search", sessions: 4560, sharePct: 78.6 },
          { channel: "Direct", sessions: 870, sharePct: 15.0 },
          { channel: "Referral", sessions: 370, sharePct: 6.4 },
        ],
        topQueries: [
          { query: "cloud cost optimization", clicks: 980, ctrPct: 14.2 },
          { query: "finops best practices", clicks: 780, ctrPct: 11.3 },
        ],
        topLandingKeywords: [
          { keyword: "cloud cost optimization", impressions: 9200, clicks: 980 },
          { keyword: "finops", impressions: 6800, clicks: 780 },
        ],
      },
    },
    "asset-003": {
      current: {
        assetId: "asset-003",
        period: "current",
        dateRangeLabel: "Last 30 days",
        sessions: 5120,
        clicks: 7200,
        avgEngagementTimeSec: 120,
        conversions: 68,
        conversionRatePct: 1.33,
        ctrPct: 140.6,
        topChannels: [
          { channel: "Organic Search", sessions: 3840, sharePct: 75.0 },
          { channel: "Direct", sessions: 870, sharePct: 17.0 },
          { channel: "Referral", sessions: 410, sharePct: 8.0 },
        ],
        topQueries: [
          { query: "llms.txt implementation", clicks: 890, ctrPct: 15.2 },
          { query: "how to create llms.txt", clicks: 720, ctrPct: 12.3 },
          { query: "llms.txt guide", clicks: 580, ctrPct: 9.9 },
        ],
        topLandingKeywords: [
          { keyword: "llms.txt", impressions: 8500, clicks: 890 },
          { keyword: "ai discoverability", impressions: 6200, clicks: 720 },
        ],
        notes: [
          "Growing interest in AI discoverability standards",
          "Technical how-to content performs well",
        ],
      },
      baseline: {
        assetId: "asset-003",
        period: "baseline",
        dateRangeLabel: "Previous 30 days",
        sessions: 4850,
        clicks: 6800,
        avgEngagementTimeSec: 115,
        conversions: 62,
        conversionRatePct: 1.28,
        ctrPct: 140.2,
        topChannels: [
          { channel: "Organic Search", sessions: 3640, sharePct: 75.1 },
          { channel: "Direct", sessions: 820, sharePct: 16.9 },
          { channel: "Referral", sessions: 390, sharePct: 8.0 },
        ],
        topQueries: [
          { query: "llms.txt implementation", clicks: 820, ctrPct: 14.5 },
          { query: "how to create llms.txt", clicks: 680, ctrPct: 12.0 },
        ],
        topLandingKeywords: [
          { keyword: "llms.txt", impressions: 8000, clicks: 820 },
          { keyword: "ai discoverability", impressions: 5800, clicks: 680 },
        ],
      },
    },
    "asset-004": {
      current: {
        assetId: "asset-004",
        period: "current",
        dateRangeLabel: "Last 30 days",
        sessions: 4850,
        clicks: 6800,
        avgEngagementTimeSec: 195,
        conversions: 72,
        conversionRatePct: 1.48,
        ctrPct: 140.2,
        topChannels: [
          { channel: "Organic Search", sessions: 3200, sharePct: 66.0 },
          { channel: "Direct", sessions: 980, sharePct: 20.2 },
          { channel: "Social", sessions: 480, sharePct: 9.9 },
          { channel: "Referral", sessions: 190, sharePct: 3.9 },
        ],
        topQueries: [
          { query: "ai automation workforce", clicks: 650, ctrPct: 11.2 },
          { query: "automation job impact", clicks: 520, ctrPct: 9.0 },
          { query: "ai workforce transition", clicks: 480, ctrPct: 8.3 },
        ],
        topLandingKeywords: [
          { keyword: "ai automation", impressions: 7200, clicks: 650 },
          { keyword: "workforce automation", impressions: 5800, clicks: 520 },
        ],
        notes: [
          "High engagement time suggests content addresses concerns effectively",
          "Social channel shows interest in workforce impact topics",
        ],
      },
      baseline: {
        assetId: "asset-004",
        period: "baseline",
        dateRangeLabel: "Previous 30 days",
        sessions: 4520,
        clicks: 6300,
        avgEngagementTimeSec: 180,
        conversions: 65,
        conversionRatePct: 1.44,
        ctrPct: 139.4,
        topChannels: [
          { channel: "Organic Search", sessions: 2980, sharePct: 65.9 },
          { channel: "Direct", sessions: 950, sharePct: 21.0 },
          { channel: "Social", sessions: 450, sharePct: 10.0 },
          { channel: "Referral", sessions: 140, sharePct: 3.1 },
        ],
        topQueries: [
          { query: "ai automation workforce", clicks: 580, ctrPct: 10.5 },
          { query: "automation job impact", clicks: 480, ctrPct: 8.7 },
        ],
        topLandingKeywords: [
          { keyword: "ai automation", impressions: 6800, clicks: 580 },
          { keyword: "workforce automation", impressions: 5500, clicks: 480 },
        ],
      },
    },
    "asset-005": {
      current: {
        assetId: "asset-005",
        period: "current",
        dateRangeLabel: "Last 30 days",
        sessions: 4200,
        clicks: 5800,
        avgEngagementTimeSec: 210,
        conversions: 88,
        conversionRatePct: 2.10,
        ctrPct: 138.1,
        topChannels: [
          { channel: "Organic Search", sessions: 3360, sharePct: 80.0 },
          { channel: "Direct", sessions: 630, sharePct: 15.0 },
          { channel: "Referral", sessions: 210, sharePct: 5.0 },
        ],
        topQueries: [
          { query: "soc 2 compliance checklist", clicks: 980, ctrPct: 16.9 },
          { query: "soc 2 requirements", clicks: 720, ctrPct: 12.4 },
          { query: "soc 2 checklist", clicks: 650, ctrPct: 11.2 },
        ],
        topLandingKeywords: [
          { keyword: "soc 2", impressions: 9200, clicks: 980 },
          { keyword: "compliance checklist", impressions: 6800, clicks: 720 },
        ],
        notes: [
          "High conversion rate for compliance-focused content",
          "Checklist format drives engagement",
        ],
      },
      baseline: {
        assetId: "asset-005",
        period: "baseline",
        dateRangeLabel: "Previous 30 days",
        sessions: 3850,
        clicks: 5300,
        avgEngagementTimeSec: 195,
        conversions: 75,
        conversionRatePct: 1.95,
        ctrPct: 137.7,
        topChannels: [
          { channel: "Organic Search", sessions: 3080, sharePct: 79.9 },
          { channel: "Direct", sessions: 580, sharePct: 15.1 },
          { channel: "Referral", sessions: 190, sharePct: 4.9 },
        ],
        topQueries: [
          { query: "soc 2 compliance checklist", clicks: 850, ctrPct: 15.2 },
          { query: "soc 2 requirements", clicks: 680, ctrPct: 12.1 },
        ],
        topLandingKeywords: [
          { keyword: "soc 2", impressions: 8800, clicks: 850 },
          { keyword: "compliance checklist", impressions: 6500, clicks: 680 },
        ],
      },
    },
    "asset-006": {
      current: {
        assetId: "asset-006",
        period: "current",
        dateRangeLabel: "Last 30 days",
        sessions: 3700,
        clicks: 5030,
        avgEngagementTimeSec: 150,
        conversions: 58,
        conversionRatePct: 1.57,
        ctrPct: 135.9,
        topChannels: [
          { channel: "Organic Search", sessions: 2590, sharePct: 70.0 },
          { channel: "Direct", sessions: 740, sharePct: 20.0 },
          { channel: "Referral", sessions: 370, sharePct: 10.0 },
        ],
        topQueries: [
          { query: "cloud vs on premise", clicks: 720, ctrPct: 14.3 },
          { query: "cloud infrastructure comparison", clicks: 580, ctrPct: 11.5 },
        ],
        topLandingKeywords: [
          { keyword: "cloud comparison", impressions: 6800, clicks: 720 },
          { keyword: "on premise vs cloud", impressions: 5200, clicks: 580 },
        ],
      },
      baseline: {
        assetId: "asset-006",
        period: "baseline",
        dateRangeLabel: "Previous 30 days",
        sessions: 3450,
        clicks: 4680,
        avgEngagementTimeSec: 145,
        conversions: 52,
        conversionRatePct: 1.51,
        ctrPct: 135.7,
        topChannels: [
          { channel: "Organic Search", sessions: 2415, sharePct: 70.0 },
          { channel: "Direct", sessions: 690, sharePct: 20.0 },
          { channel: "Referral", sessions: 345, sharePct: 10.0 },
        ],
        topQueries: [
          { query: "cloud vs on premise", clicks: 680, ctrPct: 14.0 },
          { query: "cloud infrastructure comparison", clicks: 550, ctrPct: 11.3 },
        ],
        topLandingKeywords: [
          { keyword: "cloud comparison", impressions: 6500, clicks: 680 },
          { keyword: "on premise vs cloud", impressions: 5000, clicks: 550 },
        ],
      },
    },
    "asset-007": {
      current: {
        assetId: "asset-007",
        period: "current",
        dateRangeLabel: "Last 30 days",
        sessions: 3200,
        clicks: 4500,
        avgEngagementTimeSec: 175,
        conversions: 64,
        conversionRatePct: 2.00,
        ctrPct: 140.6,
        topChannels: [
          { channel: "Organic Search", sessions: 2560, sharePct: 80.0 },
          { channel: "Direct", sessions: 480, sharePct: 15.0 },
          { channel: "Referral", sessions: 160, sharePct: 5.0 },
        ],
        topQueries: [
          { query: "data security best practices", clicks: 720, ctrPct: 16.0 },
          { query: "security best practices", clicks: 580, ctrPct: 12.9 },
        ],
        topLandingKeywords: [
          { keyword: "data security", impressions: 7200, clicks: 720 },
          { keyword: "security best practices", impressions: 5800, clicks: 580 },
        ],
      },
      baseline: {
        assetId: "asset-007",
        period: "baseline",
        dateRangeLabel: "Previous 30 days",
        sessions: 2980,
        clicks: 4200,
        avgEngagementTimeSec: 168,
        conversions: 58,
        conversionRatePct: 1.95,
        ctrPct: 140.9,
        topChannels: [
          { channel: "Organic Search", sessions: 2384, sharePct: 80.0 },
          { channel: "Direct", sessions: 447, sharePct: 15.0 },
          { channel: "Referral", sessions: 149, sharePct: 5.0 },
        ],
        topQueries: [
          { query: "data security best practices", clicks: 680, ctrPct: 15.5 },
          { query: "security best practices", clicks: 550, ctrPct: 12.6 },
        ],
        topLandingKeywords: [
          { keyword: "data security", impressions: 6800, clicks: 680 },
          { keyword: "security best practices", impressions: 5500, clicks: 550 },
        ],
      },
    },
    "asset-008": {
      current: {
        assetId: "asset-008",
        period: "current",
        dateRangeLabel: "Last 30 days",
        sessions: 0,
        clicks: 0,
        avgEngagementTimeSec: 0,
        conversions: 0,
        conversionRatePct: 0,
        ctrPct: 0,
        topChannels: [],
        topQueries: [],
        topLandingKeywords: [],
        notes: ["Draft status - no published metrics available"],
      },
      baseline: {
        assetId: "asset-008",
        period: "baseline",
        dateRangeLabel: "Previous 30 days",
        sessions: 0,
        clicks: 0,
        avgEngagementTimeSec: 0,
        conversions: 0,
        conversionRatePct: 0,
        ctrPct: 0,
        topChannels: [],
        topQueries: [],
        topLandingKeywords: [],
      },
    },
  },
  timeseriesByAsset: {
    "asset-001": Array.from({ length: 30 }, (_, i) => {
      const date = new Date("2024-01-15");
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split("T")[0],
        sessions: Math.floor(280 + Math.random() * 40),
        clicks: Math.floor(400 + Math.random() * 60),
        conversions: Math.floor(4 + Math.random() * 2),
      };
    }),
    "asset-002": Array.from({ length: 30 }, (_, i) => {
      const date = new Date("2024-01-15");
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split("T")[0],
        sessions: Math.floor(200 + Math.random() * 30),
        clicks: Math.floor(290 + Math.random() * 40),
        conversions: Math.floor(3 + Math.random() * 1),
      };
    }),
    "asset-003": Array.from({ length: 30 }, (_, i) => {
      const date = new Date("2024-01-15");
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split("T")[0],
        sessions: Math.floor(165 + Math.random() * 25),
        clicks: Math.floor(235 + Math.random() * 35),
        conversions: Math.floor(2 + Math.random() * 1),
      };
    }),
    "asset-004": Array.from({ length: 30 }, (_, i) => {
      const date = new Date("2024-01-15");
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split("T")[0],
        sessions: Math.floor(155 + Math.random() * 20),
        clicks: Math.floor(220 + Math.random() * 30),
        conversions: Math.floor(2 + Math.random() * 1),
      };
    }),
    "asset-005": Array.from({ length: 30 }, (_, i) => {
      const date = new Date("2024-01-15");
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split("T")[0],
        sessions: Math.floor(135 + Math.random() * 20),
        clicks: Math.floor(190 + Math.random() * 25),
        conversions: Math.floor(3 + Math.random() * 1),
      };
    }),
    "asset-006": Array.from({ length: 30 }, (_, i) => {
      const date = new Date("2024-01-15");
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split("T")[0],
        sessions: Math.floor(120 + Math.random() * 15),
        clicks: Math.floor(165 + Math.random() * 20),
        conversions: Math.floor(2 + Math.random() * 1),
      };
    }),
    "asset-007": Array.from({ length: 30 }, (_, i) => {
      const date = new Date("2024-01-15");
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split("T")[0],
        sessions: Math.floor(105 + Math.random() * 15),
        clicks: Math.floor(148 + Math.random() * 18),
        conversions: Math.floor(2 + Math.random() * 1),
      };
    }),
    "asset-008": [],
  },
};

