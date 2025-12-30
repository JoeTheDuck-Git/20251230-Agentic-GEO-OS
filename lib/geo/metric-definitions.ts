export type MetricKey =
  | "geoScore"
  | "reach"
  | "avgPosition"
  | "sentiment"
  | "visibility"
  | "reachGap"
  | "positionGap"
  | "sentimentGap"
  | "visibilityGap";

export type MetricIntent = "kpi" | "gapChip" | "driverChip" | "topicDetail";

export type MetricDirection = "higherBetter" | "lowerBetter";
export type MetricUnit = "pp" | "percent" | "number" | "score";

export interface MetricDeltaFormat {
  text: string;
  tone: "good" | "bad" | "neutral";
  arrow?: "up" | "down" | "none";
}

export interface MetricTooltip {
  title: string;
  body: string;
  note?: string;
}

export interface MetricDefinition {
  key: MetricKey;
  label: string;
  shortLabel?: string;
  direction: MetricDirection;
  unit: MetricUnit;
  formatValue: (value: number, decimals?: number) => string;
  formatDelta?: (current: number, previous: number, decimals?: number) => MetricDeltaFormat;
  tooltip: MetricTooltip;
}

// Format delta value helper
function formatDeltaValue(value: number, decimals: number): string {
  const absValue = Math.abs(value);
  if (decimals === 0) {
    return absValue.toString();
  }
  return absValue.toFixed(decimals);
}

// Metric definitions registry
export const METRIC_DEFINITIONS: Record<MetricKey, MetricDefinition> = {
  geoScore: {
    key: "geoScore",
    label: "GEO Score",
    direction: "higherBetter",
    unit: "pp",
    formatValue: (value, decimals = 0) => `${Math.round(value)}%`,
    formatDelta: (current, previous, decimals = 0) => {
      const delta = current - previous;
      if (delta > 0) {
        return {
          text: `+${formatDeltaValue(delta, decimals)} pts`,
          tone: "good",
          arrow: "up",
        };
      } else if (delta < 0) {
        return {
          text: `${formatDeltaValue(delta, decimals)} pts`,
          tone: "bad",
          arrow: "down",
        };
      }
      return { text: "0 pts", tone: "neutral", arrow: "none" };
    },
    tooltip: {
      title: "GEO Score",
      body: "Composite GEO performance score based on visibility and sentiment across tracked questions.",
    },
  },
  reach: {
    key: "reach",
    label: "Reach",
    shortLabel: "Reach",
    direction: "higherBetter",
    unit: "pp",
    formatValue: (value, decimals = 0) => `${Math.round(value)}%`,
    formatDelta: (current, previous, decimals = 0) => {
      const delta = current - previous;
      if (delta > 0) {
        return {
          text: `+${formatDeltaValue(delta, decimals)} pts`,
          tone: "good",
          arrow: "up",
        };
      } else if (delta < 0) {
        return {
          text: `${formatDeltaValue(delta, decimals)} pts`,
          tone: "bad",
          arrow: "down",
        };
      }
      return { text: "0 pts", tone: "neutral", arrow: "none" };
    },
    tooltip: {
      title: "Reach",
      body: "Share of tracked AI answers where your brand is mentioned at least once.",
    },
  },
  avgPosition: {
    key: "avgPosition",
    label: "Avg Position",
    shortLabel: "Position",
    direction: "lowerBetter",
    unit: "number",
    formatValue: (value, decimals = 1) => value.toFixed(decimals),
    formatDelta: (current, previous, decimals = 1) => {
      const delta = current - previous;
      if (delta < 0) {
        // Improvement (current is lower)
        return {
          text: `${formatDeltaValue(delta, decimals)} better`,
          tone: "good",
          arrow: "down",
        };
      } else if (delta > 0) {
        // Worse (current is higher)
        return {
          text: `${formatDeltaValue(delta, decimals)} worse`,
          tone: "bad",
          arrow: "up",
        };
      }
      return { text: "no change", tone: "neutral", arrow: "none" };
    },
    tooltip: {
      title: "Avg Position",
      body: "Average rank of your brand within AI answers where your brand is mentioned. Lower is better (1 = top-ranked).",
      note: "Computed only on answers where your brand appears. Use Reach to understand coverage.",
    },
  },
  sentiment: {
    key: "sentiment",
    label: "Sentiment",
    direction: "higherBetter",
    unit: "percent",
    formatValue: (value, decimals = 0) => `${Math.round(value * 100)}%`,
    tooltip: {
      title: "Sentiment",
      body: "Tone of mentions in AI answers (positive/neutral/negative). Separate from market-voice sentiment.",
    },
  },
  visibility: {
    key: "visibility",
    label: "Visibility",
    direction: "higherBetter",
    unit: "score",
    formatValue: (value, decimals = 0) => `${Math.round(value * 100)}%`,
    tooltip: {
      title: "Visibility",
      body: "Composite visibility driven by reach and position in AI answers for this topic.",
    },
  },
  reachGap: {
    key: "reachGap",
    label: "Reach gap",
    shortLabel: "Reach gap",
    direction: "higherBetter",
    unit: "pp",
    formatValue: (value, decimals = 0) => `${Math.round(value)}%`,
    tooltip: {
      title: "What this gap means",
      body: "Difference in Reach between your brand and the benchmark (leader or selected competitor) for this topic. Positive means they appear in more AI answers.",
    },
  },
  positionGap: {
    key: "positionGap",
    label: "Position gap",
    shortLabel: "Position gap",
    direction: "lowerBetter",
    unit: "number",
    formatValue: (value, decimals = 1) => value.toFixed(decimals),
    tooltip: {
      title: "What this gap means",
      body: "Difference in Avg Position between your brand and the benchmark for this topic. Lower position is better.",
      note: "Position gap = Your Avg Position − Benchmark Avg Position. Negative means you rank higher (better).",
    },
  },
  sentimentGap: {
    key: "sentimentGap",
    label: "Sentiment gap",
    shortLabel: "Sentiment gap",
    direction: "higherBetter",
    unit: "percent",
    formatValue: (value, decimals = 0) => `${Math.round(value * 100)}%`,
    tooltip: {
      title: "What this gap means",
      body: "Difference in sentiment mix between your brand and the benchmark within AI answers for this topic.",
    },
  },
  visibilityGap: {
    key: "visibilityGap",
    label: "Visibility gap",
    shortLabel: "Visibility gap",
    direction: "higherBetter",
    unit: "score",
    formatValue: (value, decimals = 0) => `${Math.round(value * 100)}%`,
    tooltip: {
      title: "What this gap means",
      body: "Difference in overall Visibility Score between your brand and the benchmark for this topic.",
    },
  },
};

// Helper functions
export function getMetricDefinition(key: MetricKey): MetricDefinition {
  return METRIC_DEFINITIONS[key];
}

export function getMetricLabel(key: MetricKey, useShort = false): string {
  const def = METRIC_DEFINITIONS[key];
  return useShort && def.shortLabel ? def.shortLabel : def.label;
}

export function getMetricTooltip(key: MetricKey): MetricTooltip {
  return METRIC_DEFINITIONS[key].tooltip;
}

// Delta tooltip content for KPI metrics
export function getDeltaTooltipContent(key: MetricKey): string {
  switch (key) {
    case "geoScore":
      return "Change in GEO Score compared to the previous time range (same duration). Measured in percentage points.";
    case "reach":
      return "Change in Reach compared to the previous time range (same duration). Measured in percentage points.";
    case "avgPosition":
      return "Change in average position compared to the previous time range (same duration). Lower is better.";
    default:
      return "";
  }
}

