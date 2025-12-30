export type MetricId =
  | "geoScore"
  | "reach"
  | "avgPosition"
  | "sentiment"
  | "visibility"
  | "reachGap"
  | "positionGap"
  | "sentimentGap"
  | "visibilityGap";

export type MetricDirection = "higherBetter" | "lowerBetter";
export type Tone = "good" | "bad" | "neutral";
export type Arrow = "up" | "down" | "none";

export interface ToneEvaluation {
  tone: Tone;
  arrow: Arrow;
}

export interface MetricTooltip {
  title: string;
  body: string;
  note?: string;
}

export interface CalcSpec {
  answerUnit?: string;
  snapshotRule?: string;
  mentionRule?: string;
  reachMode?: "any_rank" | "top_k";
  topK?: number | null;
  weighting?: string;
  denominator: string;
  numerator: string;
  missing?: string; // Display value when denominator is 0
  // Rank weights for visibility calculation
  rankWeights?: {
    rank1: number;
    rank2: number;
    rank3: number;
    rank4: number;
    rank5: number;
    rank6plus: number;
  };
  formula?: string;
  // Sentiment-specific fields
  scope?: "mentioned_only" | "all";
  sentimentLabelSource?: string;
  aggregationRule?: string;
  distribution?: {
    p_pos: string;
    p_neu: string;
    p_neg: string;
  };
  index?: string;
}

export interface SampleSpec {
  minSample: number;
  lowSampleLabel: string;
  lowSampleTooltip: string;
}

export interface MetricDefinition {
  id: MetricId;
  title: string;
  unit: string;
  direction: MetricDirection;
  decimals: number;
  tooltip: MetricTooltip;
  calcSpec: CalcSpec;
  sampleSpec?: SampleSpec;
  // Tone evaluation functions
  evaluateDelta: (delta: number) => ToneEvaluation;
  evaluateGap: (gap: number) => ToneEvaluation;
}

export const METRIC_REGISTRY: Record<MetricId, MetricDefinition> = {
  reach: {
    id: "reach",
    title: "Reach",
    unit: "%",
    direction: "higherBetter",
    decimals: 0,
    tooltip: {
      title: "Reach",
      body: "Share of evaluated AI answers that mention your brand at least once. Higher is better.",
      note: "Reach = mentioned answer units / total answer units. An answer unit is one AI response for a question × model within the selected snapshot and filters. Default: any-rank mention (not citation-only).",
    },
    calcSpec: {
      answerUnit: "question_id × model_id × run_id",
      snapshotRule: "latest run within snapshot",
      mentionRule: "canonical brand_id match in ranked_mentions[]; citation-only excluded",
      reachMode: "any_rank",
      topK: null,
      weighting: "equal_per_answer_unit",
      denominator: "all evaluated answer units under filters",
      numerator: "answer units with mentioned==true under reachMode",
    },
    sampleSpec: {
      minSample: 30,
      lowSampleLabel: "Low sample",
      lowSampleTooltip: "Fewer than 30 evaluated answers in this range. Interpret cautiously.",
    },
    evaluateDelta: (delta: number) => evaluateMetricChange(delta, "higherBetter"),
    evaluateGap: (gap: number) => evaluateMetricChange(gap, "higherBetter"),
  },
  avgPosition: {
    id: "avgPosition",
    title: "Avg Position",
    unit: "",
    direction: "lowerBetter",
    decimals: 1,
    tooltip: {
      title: "Avg Position",
      body: "Average rank of your brand within AI answers where your brand is mentioned. Lower is better (1 = top-ranked).",
      note: "Computed only on answers where your brand appears. Use Reach to understand coverage.",
    },
    calcSpec: {
      denominator: "answer units where mentioned==true",
      numerator: "sum(rank) across those units",
      missing: "—",
    },
    evaluateDelta: (delta: number) => evaluateMetricChange(delta, "lowerBetter"),
    evaluateGap: (gap: number) => evaluateMetricChange(gap, "lowerBetter"),
  },
  geoScore: {
    id: "geoScore",
    title: "GEO Score",
    unit: "%",
    direction: "higherBetter",
    decimals: 0,
    tooltip: {
      title: "GEO Score",
      body: "Composite GEO performance score based on visibility and sentiment across tracked questions.",
    },
    calcSpec: {
      denominator: "all evaluated questions",
      numerator: "weighted composite of visibility (60%) and sentiment (40%)",
    },
    evaluateDelta: (delta: number) => evaluateMetricChange(delta, "higherBetter"),
    evaluateGap: (gap: number) => evaluateMetricChange(gap, "higherBetter"),
  },
  sentiment: {
    id: "sentiment",
    title: "Sentiment Score",
    unit: "%",
    direction: "higherBetter",
    decimals: 0,
    tooltip: {
      title: "Sentiment Score",
      body: "Index derived from positive vs negative brand sentiment in AI answers where the brand is mentioned. Higher is better.",
      note: "Computed only on mentioned answers. Score = (0.5 + 0.5 × (P(positive) − P(negative))) × 100. Neutral contributes to the middle (50).",
    },
    calcSpec: {
      answerUnit: "question_id × model_id × run_id",
      scope: "mentioned_only",
      sentimentLabelSource: "brand mention context label per answer unit: positive | neutral | negative",
      aggregationRule: "If multiple mentions in one answer: majority vote across mention labels; ties => neutral",
      distribution: {
        p_pos: "pos / total",
        p_neu: "neu / total",
        p_neg: "neg / total",
      },
      index: "sentimentPct = clamp((0.5 + 0.5*(p_pos - p_neg))*100, 0, 100)",
      denominator: "all mentioned answer units",
      numerator: "sentiment-labeled mentions",
    },
    sampleSpec: {
      minSample: 30,
      lowSampleLabel: "Low sample",
      lowSampleTooltip: "Fewer than 30 sentiment-labeled mentions in this range. Interpret cautiously.",
    },
    evaluateDelta: (delta: number) => evaluateMetricChange(delta, "higherBetter"),
    evaluateGap: (gap: number) => evaluateMetricChange(gap, "higherBetter"),
  },
  visibility: {
    id: "visibility",
    title: "Visibility Score",
    unit: "%",
    direction: "higherBetter",
    decimals: 0,
    tooltip: {
      title: "Visibility Score",
      body: "Composite visibility index combining Reach and ranking strength. Higher is better.",
      note: "Computed per answer unit: unmentioned = 0. Mentioned uses a rank-weight. Visibility Score = (sum(weighted mentions) / total answer units) × 100.",
    },
    calcSpec: {
      answerUnit: "question_id × model_id × run_id",
      mentionRule: "canonical brand_id match in ranked_mentions[]; citation-only excluded",
      weighting: "equal_per_answer_unit",
      rankWeights: {
        rank1: 1.00,
        rank2: 0.70,
        rank3: 0.50,
        rank4: 0.35,
        rank5: 0.25,
        rank6plus: 0.15,
      },
      formula: "contribution = 0 if not mentioned else weight(rank); visibilityPct = (sum(contribution)/total_answer_units)*100",
      denominator: "all evaluated answer units",
      numerator: "sum(weighted mentions) across all answer units",
    },
    sampleSpec: {
      minSample: 30,
      lowSampleLabel: "Low sample",
      lowSampleTooltip: "Fewer than 30 evaluated answers in this range. Interpret cautiously.",
    },
    evaluateDelta: (delta: number) => evaluateMetricChange(delta, "higherBetter"),
    evaluateGap: (gap: number) => evaluateMetricChange(gap, "higherBetter"),
  },
  reachGap: {
    id: "reachGap",
    title: "Reach gap",
    unit: "pp",
    direction: "higherBetter",
    decimals: 0,
    tooltip: {
      title: "What this gap means",
      body: "Difference in Reach between your brand and the benchmark (leader or selected competitor) for this topic. Positive means they appear in more AI answers.",
      note: "Gap = Your Reach − Benchmark Reach. Positive means benchmark has higher reach.",
    },
    calcSpec: {
      denominator: "all evaluated answer units",
      numerator: "your reach − benchmark reach",
    },
    evaluateDelta: (delta: number) => evaluateMetricChange(delta, "higherBetter"),
    evaluateGap: (gap: number) => evaluateMetricChange(gap, "higherBetter"),
  },
  positionGap: {
    id: "positionGap",
    title: "Position gap",
    unit: "",
    direction: "lowerBetter",
    decimals: 1,
    tooltip: {
      title: "What this gap means",
      body: "Difference in Avg Position between your brand and the benchmark for this topic. Lower position is better.",
      note: "Position gap = Your Avg Position − Benchmark Avg Position. Negative means you rank higher (better).",
    },
    calcSpec: {
      denominator: "answer units where mentioned==true",
      numerator: "your avg position − benchmark avg position",
      missing: "—",
    },
    evaluateDelta: (delta: number) => evaluateMetricChange(delta, "lowerBetter"),
    evaluateGap: (gap: number) => evaluateMetricChange(gap, "lowerBetter"),
  },
  sentimentGap: {
    id: "sentimentGap",
    title: "Sentiment gap",
    unit: "%",
    direction: "higherBetter",
    decimals: 0,
    tooltip: {
      title: "What this gap means",
      body: "Difference in Sentiment Score between your brand and the benchmark within AI answers for this topic.",
      note: "Gap = your − benchmark. Higher is better.",
    },
    calcSpec: {
      denominator: "all mentioned answer units",
      numerator: "your sentiment score − benchmark sentiment score",
    },
    evaluateDelta: (delta: number) => evaluateMetricChange(delta, "higherBetter"),
    evaluateGap: (gap: number) => evaluateMetricChange(gap, "higherBetter"),
  },
  visibilityGap: {
    id: "visibilityGap",
    title: "Visibility gap",
    unit: "%",
    direction: "higherBetter",
    decimals: 0,
    tooltip: {
      title: "What this gap means",
      body: "Difference in overall Visibility Score between your brand and the benchmark for this topic.",
      note: "Gap = Your Visibility − Benchmark Visibility. Positive means higher visibility.",
    },
    calcSpec: {
      denominator: "all evaluated answer units",
      numerator: "your visibility score − benchmark visibility score",
    },
    evaluateDelta: (delta: number) => evaluateMetricChange(delta, "higherBetter"),
    evaluateGap: (gap: number) => evaluateMetricChange(gap, "higherBetter"),
  },
};

// Helper function to evaluate delta/gap based on direction
function evaluateMetricChange(
  value: number,
  direction: MetricDirection
): ToneEvaluation {
  if (value === 0) {
    return { tone: "neutral", arrow: "none" };
  }

  if (direction === "higherBetter") {
    return value > 0
      ? { tone: "good", arrow: "up" }
      : { tone: "bad", arrow: "down" };
  } else {
    // lowerBetter
    return value < 0
      ? { tone: "good", arrow: "down" }
      : { tone: "bad", arrow: "up" };
  }
}

// Helper functions
export function getMetricDefinition(id: MetricId): MetricDefinition {
  return METRIC_REGISTRY[id];
}

// Get delta tooltip content
export function getDeltaTooltipContent(metricId: MetricId): string {
  const def = METRIC_REGISTRY[metricId];
  return `Change in ${def.title} compared to the previous time range (same duration). ${def.direction === "higherBetter" ? "Higher is better." : "Lower is better."}`;
}

export function isLowSample(metricId: MetricId, sampleSize: number | undefined): boolean {
  const def = METRIC_REGISTRY[metricId];
  if (!def.sampleSpec || sampleSize === undefined) return false;
  return sampleSize < def.sampleSpec.minSample;
}

// Format metric value helper
export function formatMetricValue(metricId: MetricId, value: number): string {
  const def = METRIC_REGISTRY[metricId];
  if (def.decimals === 0) {
    return `${Math.round(value)}${def.unit}`;
  }
  return `${value.toFixed(def.decimals)}${def.unit}`;
}

// Format visibility value helper (specific for visibility)
export function formatVisibilityValue(value: number): string {
  return `${Math.round(value)}%`;
}

// Format sentiment value helper (specific for sentiment)
export function formatSentimentValue(value: number): string {
  return `${Math.round(value)}%`;
}

