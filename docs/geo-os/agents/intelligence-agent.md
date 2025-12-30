# Intelligence Agent

## Agent Definition

**Name**: Intelligence Agent  
**Purpose**: The Intelligence Agent transforms raw observations into meaningful metrics and aggregated insights. It computes GEO Scores, aggregates performance by topic, compares brands, and tracks historical trends.

## Core Responsibilities

- **GEO Score Computation**: Calculates composite GEO Scores from visibility and sentiment data
- **Visibility Metrics**: Computes Reach (coverage percentage) and Position (average ordering)
- **Sentiment Metrics**: Aggregates sentiment scores with confidence levels
- **Topic Aggregation**: Summarizes performance across all questions within a topic
- **Brand Comparison**: Ranks brands within topics based on GEO Scores
- **Historical Tracking**: Maintains time-series snapshots of performance
- **Regional Analysis**: Aggregates metrics by geographic region
- **Competitive Benchmarking**: Compares primary brand against competitors

## Inputs

- **AI Answer Snapshots**: From Observation Agent
- **Brand Mention Records**: From Observation Agent
- **Topics**: Topic definitions for aggregation
- **Brands**: Brand definitions (primary + competitors)
- **Historical Snapshots**: Previous time-series data (optional)
- **Aggregation Parameters**: Time windows, regions, topic filters

## Outputs

- **GEO Scores**: For each Question × Topic × Brand combination:
  - Overall score (0-100)
  - Visibility score (reach + position)
  - Sentiment score (type + confidence)
- **Topic Performance**: Aggregated metrics per topic:
  - Average GEO Score
  - Question count
  - Average position
  - Sentiment distribution
- **Brand Comparisons**: Ranked brand performance within topics
- **Historical Trends**: Time-series data showing score changes over time
- **Regional Summaries**: Performance breakdowns by geographic region

## Explicit Non-Responsibilities

- **Does NOT sample questions**: Question sampling is handled by Observation Agent
- **Does NOT identify gaps**: Gap identification is handled by Reasoning Agent
- **Does NOT generate recommendations**: Recommendations are handled by Strategy Agent
- **Does NOT validate policies**: Policy validation is handled by Governance Agent
- **Does NOT prioritize actions**: Prioritization is handled by Strategy Agent
- **Does NOT interpret meaning**: Interpretation is handled by Reasoning Agent

## Relationship to Other Agents

### Upstream Dependencies
- **Observation Agent**: Consumes AI Answer Snapshots and Brand Mention Records

### Downstream Consumers
- **Reasoning Agent**: Consumes GEO Scores and aggregated metrics to identify gaps
- **Strategy Agent**: May consume aggregated metrics for recommendation context

### Data Flow
```
Observation Agent (raw data)
         ↓
Intelligence Agent
         ↓
GEO Scores + Aggregations
         ↓
Reasoning Agent
```

## Example Question This Agent Answers

**"How visible are we, and what's the sentiment?"**

The Intelligence Agent answers this by:
1. Computing Reach: percentage of questions where brand is mentioned
2. Computing Position: average position of mentions in answers
3. Computing Sentiment: distribution of positive/neutral/negative mentions
4. Combining into a composite GEO Score
5. Aggregating across topics and regions

## Example Output (Mocked)

```json
{
  "geoScore": {
    "overall": 72,
    "visibility": {
      "reach": 65,
      "position": 2.3,
      "score": 68
    },
    "sentiment": {
      "type": "positive",
      "confidence": 78,
      "score": 78
    }
  },
  "topicPerformance": {
    "topicId": "topic-1",
    "brandId": "brand-1",
    "region": "US",
    "questionCount": 45,
    "avgPosition": 2.3,
    "sentimentDistribution": {
      "positive": 28,
      "neutral": 12,
      "negative": 5
    },
    "geoScore": {
      "overall": 72,
      "visibility": { "reach": 65, "position": 2.3 },
      "sentiment": { "type": "positive", "confidence": 78 }
    }
  },
  "brandComparison": [
    {
      "brandId": "brand-1",
      "rank": 1,
      "geoScore": { "overall": 72 }
    },
    {
      "brandId": "brand-2",
      "rank": 2,
      "geoScore": { "overall": 58 }
    }
  ],
  "historicalTrend": [
    {
      "timestamp": "2024-01-01",
      "geoScore": { "overall": 65 }
    },
    {
      "timestamp": "2024-01-15",
      "geoScore": { "overall": 72 }
    }
  ]
}
```

## Key Metrics Computed

### Visibility Metrics
- **Reach**: `(Questions with Brand Mention / Total Questions) × 100`
- **Position**: Average position of brand mentions (1 = first, N = last)
- **Position Score**: `(N - Position + 1) / N × 100`
- **Visibility Score**: `(Reach × 0.6) + (Position Score × 0.4)`

### Sentiment Metrics
- **Sentiment Type**: Most common sentiment (positive/neutral/negative)
- **Sentiment Confidence**: Average confidence of sentiment classification
- **Sentiment Score**: Weighted by type (positive = 100%, neutral = 70%, negative = 30%)

### Composite GEO Score
- **GEO Score**: `(Visibility Score × 0.6) + (Sentiment Score × 0.4)`

## Aggregation Levels

The Intelligence Agent aggregates at multiple levels:
1. **Question Level**: Individual question performance
2. **Topic Level**: Aggregated across all questions in topic
3. **Brand Level**: Aggregated across all topics for brand
4. **Regional Level**: Filtered by geographic region
5. **Temporal Level**: Tracked over time with snapshots

## Operational Notes

- The Intelligence Agent operates on the **Question × Topic × Brand** analysis unit
- All aggregations preserve the minimum analysis unit for drill-down
- Historical snapshots enable trend analysis
- Metrics are deterministic and reproducible

