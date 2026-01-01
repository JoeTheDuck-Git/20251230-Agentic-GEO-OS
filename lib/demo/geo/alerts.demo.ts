export type AlertSeverity = "High" | "Medium" | "Low";

export type AlertType =
  | "ReachDrop"
  | "SentimentSpike"
  | "CompetitorOvertake"
  | "NewCompetitorOnlySource"
  | "VisibilityDrop";

export interface Alert {
  id: string;
  severity: AlertSeverity;
  type: AlertType;
  title: string;
  summary: string;
  metricKey?: "reach" | "visibility" | "sentiment" | "avgPosition";
  deltaPp?: number;
  topic?: string;
  competitor?: string;
  domain?: string;
  detectedAt: string;
  snapshot: string;
  recommendedNextStep: { label: string; href: string }[];
}

export const alertsDemo: Alert[] = [
  {
    id: "alert-001",
    severity: "High",
    type: "CompetitorOvertake",
    title: "Competitor overtook Acme on 'Data Security'",
    summary: "TechRival now leads Acme Corp in Visibility for Data Security topic. Visibility gap: -9pp.",
    metricKey: "visibility",
    deltaPp: -9,
    topic: "Data Security",
    competitor: "TechRival",
    detectedAt: "2024-01-15T10:30:00Z",
    snapshot: "2024-01-15 10:30 AM",
    recommendedNextStep: [
      { label: "View Topic Performance", href: "/intelligence/topic-performance?topic=Data Security" },
      { label: "Opportunity Analysis", href: "/decisions/opportunity-analysis" },
    ],
  },
  {
    id: "alert-002",
    severity: "High",
    type: "VisibilityDrop",
    title: "Visibility dropped on 'Cloud Infrastructure'",
    summary: "Visibility decreased by 12pp on Cloud Infrastructure topic over last 7 days.",
    metricKey: "visibility",
    deltaPp: -12,
    topic: "Cloud Infrastructure",
    detectedAt: "2024-01-15T09:15:00Z",
    snapshot: "2024-01-15 10:30 AM",
    recommendedNextStep: [
      { label: "View Topic Performance", href: "/intelligence/topic-performance?topic=Cloud Infrastructure" },
      { label: "Actionable Items", href: "/decisions/actionable-items" },
    ],
  },
  {
    id: "alert-003",
    severity: "Medium",
    type: "NewCompetitorOnlySource",
    title: "New competitor-only source detected",
    summary: "gartner.com appears in TechRival citations but not in Acme citations.",
    domain: "gartner.com",
    competitor: "TechRival",
    detectedAt: "2024-01-15T08:45:00Z",
    snapshot: "2024-01-15 10:30 AM",
    recommendedNextStep: [
      { label: "View Sources Gaps", href: "/intelligence/sources?mode=gaps&compareTo=techrival" },
      { label: "Opportunity Analysis", href: "/decisions/opportunity-analysis" },
    ],
  },
  {
    id: "alert-004",
    severity: "Medium",
    type: "ReachDrop",
    title: "Reach decreased on 'API Reliability'",
    summary: "Reach decreased by 6pp on API Reliability topic. Current reach: 58%.",
    metricKey: "reach",
    deltaPp: -6,
    topic: "API Reliability",
    detectedAt: "2024-01-14T16:20:00Z",
    snapshot: "2024-01-15 10:30 AM",
    recommendedNextStep: [
      { label: "View Topic Performance", href: "/intelligence/topic-performance?topic=API Reliability" },
      { label: "Execution Briefs", href: "/execution-prep/execution-briefs" },
    ],
  },
  {
    id: "alert-005",
    severity: "Medium",
    type: "SentimentSpike",
    title: "Negative sentiment spike detected",
    summary: "Negative sentiment mentions increased by 8pp on Edge Computing topic.",
    metricKey: "sentiment",
    deltaPp: -8,
    topic: "Edge Computing",
    detectedAt: "2024-01-14T14:10:00Z",
    snapshot: "2024-01-15 10:30 AM",
    recommendedNextStep: [
      { label: "View Topic Performance", href: "/intelligence/topic-performance?topic=Edge Computing" },
      { label: "Competitor Intelligence", href: "/intelligence/competitor-intelligence" },
    ],
  },
  {
    id: "alert-006",
    severity: "Low",
    type: "ReachDrop",
    title: "Reach decreased on 'API Reliability'",
    summary: "Reach decreased by 4pp on API Reliability topic.",
    metricKey: "reach",
    deltaPp: -4,
    topic: "API Reliability",
    detectedAt: "2024-01-13T11:30:00Z",
    snapshot: "2024-01-15 10:30 AM",
    recommendedNextStep: [
      { label: "View Topic Performance", href: "/intelligence/topic-performance" },
    ],
  },
  {
    id: "alert-007",
    severity: "Low",
    type: "NewCompetitorOnlySource",
    title: "New competitor-only source: partner.techrival.com",
    summary: "partner.techrival.com appears in TechRival citations.",
    domain: "partner.techrival.com",
    competitor: "TechRival",
    detectedAt: "2024-01-13T09:00:00Z",
    snapshot: "2024-01-15 10:30 AM",
    recommendedNextStep: [
      { label: "View Sources Gaps", href: "/intelligence/sources?mode=gaps&compareTo=techrival" },
    ],
  },
  {
    id: "alert-008",
    severity: "Low",
    type: "VisibilityDrop",
    title: "Visibility dropped on 'DevOps'",
    summary: "Visibility decreased by 3pp on DevOps topic.",
    metricKey: "visibility",
    deltaPp: -3,
    topic: "DevOps",
    detectedAt: "2024-01-12T15:45:00Z",
    snapshot: "2024-01-15 10:30 AM",
    recommendedNextStep: [
      { label: "View Topic Performance", href: "/intelligence/topic-performance" },
    ],
  },
];

