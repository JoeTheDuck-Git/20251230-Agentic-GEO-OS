# Reasoning Agent

## Agent Definition

**Name**: Reasoning Agent  
**Purpose**: The Reasoning Agent is the "agentic brain" of the system. It analyzes GEO Scores and aggregated metrics to identify gaps, recognize patterns, and understand why certain topics or questions show poor performance.

## Core Responsibilities

- **Gap Identification**: Detects visibility gaps (low reach, poor position) and sentiment risks (negative mentions)
- **Pattern Recognition**: Identifies trends across questions, topics, regions, and time
- **Root Cause Analysis**: Understands why gaps exist (content missing, poor positioning, negative sentiment)
- **Opportunity Mapping**: Links topics to content opportunities and improvement areas
- **Competitive Analysis**: Identifies where competitors outperform the primary brand
- **Risk Assessment**: Flags negative sentiment trends and visibility declines
- **Contextual Understanding**: Considers regional differences, topic relationships, and temporal patterns

## Inputs

- **GEO Scores**: From Intelligence Agent (all Question × Topic × Brand combinations)
- **Topic Performance**: Aggregated metrics from Intelligence Agent
- **Brand Comparisons**: Competitive rankings from Intelligence Agent
- **Historical Trends**: Time-series data from Intelligence Agent
- **Question Context**: Question text and topic associations
- **Thresholds**: Optional thresholds for gap detection (e.g., visibility < 50)

## Outputs

- **Visibility Gaps**: List of topics/questions where visibility is below threshold
- **Sentiment Risks**: Topics/questions with negative sentiment patterns
- **Opportunity Map**: Topics mapped to content gaps and improvement areas
- **Pattern Insights**: Recognized patterns (e.g., "Brand performs well in Topic A but poorly in Topic B")
- **Root Cause Analysis**: Explanations for why gaps exist
- **Priority Rankings**: Gaps and opportunities ranked by severity/impact
- **Competitive Insights**: Areas where competitors outperform

## Explicit Non-Responsibilities

- **Does NOT collect data**: Data collection is handled by Observation Agent
- **Does NOT compute scores**: Score computation is handled by Intelligence Agent
- **Does NOT generate recommendations**: Recommendation generation is handled by Strategy Agent
- **Does NOT execute actions**: Action execution is outside agent scope
- **Does NOT validate policies**: Policy validation is handled by Governance Agent
- **Does NOT schedule analysis**: Scheduling is outside agent scope

## Relationship to Other Agents

### Upstream Dependencies
- **Intelligence Agent**: Consumes GEO Scores and aggregated metrics

### Downstream Consumers
- **Strategy Agent**: Consumes gap analysis and opportunities to generate recommendations
- **Governance Agent**: May receive risk flags for policy review

### Data Flow
```
Intelligence Agent (GEO Scores)
         ↓
Reasoning Agent
         ↓
Gaps + Opportunities + Patterns
         ↓
Strategy Agent
```

## Example Question This Agent Answers

**"Where are we missing, and why?"**

The Reasoning Agent answers this by:
1. Comparing current GEO Scores to thresholds or benchmarks
2. Identifying topics/questions with low visibility (reach < threshold, poor position)
3. Identifying topics/questions with negative sentiment
4. Analyzing patterns to understand root causes
5. Mapping gaps to content opportunities
6. Ranking gaps by severity and impact

## Example Output (Mocked)

```json
{
  "visibilityGaps": [
    {
      "topicId": "topic-3",
      "brandId": "brand-1",
      "severity": "high",
      "currentReach": 25,
      "threshold": 50,
      "avgPosition": 4.2,
      "questionCount": 20,
      "rootCause": "Limited content coverage for data security topics",
      "pattern": "Brand has strong presence in cloud infrastructure but weak in security"
    }
  ],
  "sentimentRisks": [
    {
      "topicId": "topic-2",
      "brandId": "brand-1",
      "riskLevel": "medium",
      "negativeMentions": 8,
      "totalMentions": 30,
      "trend": "increasing",
      "rootCause": "Recent mentions focus on limitations rather than strengths"
    }
  ],
  "opportunities": [
    {
      "topicId": "topic-3",
      "opportunityType": "content_gap",
      "description": "Expand data security content to improve visibility",
      "expectedImpact": "Increase reach from 25% to 60%",
      "priority": "high",
      "relatedQuestions": ["q-15", "q-16", "q-17"]
    },
    {
      "topicId": "topic-2",
      "opportunityType": "sentiment_improvement",
      "description": "Address negative sentiment in AI automation discussions",
      "expectedImpact": "Reduce negative mentions from 8 to 2",
      "priority": "medium"
    }
  ],
  "patterns": [
    {
      "patternType": "topic_correlation",
      "description": "Strong performance in cloud infrastructure correlates with weak performance in data security",
      "confidence": 0.75
    },
    {
      "patternType": "regional_difference",
      "description": "Brand performs better in US region (GEO 72) than UK region (GEO 58)",
      "confidence": 0.82
    }
  ],
  "competitiveInsights": [
    {
      "topicId": "topic-1",
      "competitorBrandId": "brand-2",
      "gap": "Competitor has 15% higher reach in cloud infrastructure",
      "reason": "More comprehensive content coverage"
    }
  ]
}
```

## Key Analysis Methods

### Gap Detection
- **Visibility Gap**: Reach < threshold OR position > threshold
- **Sentiment Gap**: Negative sentiment percentage > threshold
- **Competitive Gap**: Primary brand rank > competitor rank

### Pattern Recognition
- **Topic Correlation**: Performance patterns across related topics
- **Regional Patterns**: Geographic performance differences
- **Temporal Patterns**: Trends over time (improving/declining)
- **Question Patterns**: Common characteristics of high/low performing questions

### Root Cause Analysis
- **Content Gap**: Missing or insufficient content for topic
- **Positioning Issue**: Brand mentioned but in poor position
- **Sentiment Issue**: Negative context in mentions
- **Competitive Disadvantage**: Competitors have better coverage

## Operational Notes

- The Reasoning Agent operates on the **Question × Topic × Brand** analysis unit
- All gaps are traceable back to specific questions and topics
- Pattern recognition considers multiple dimensions (topic, region, time)
- Root cause analysis provides actionable insights
- Opportunities are prioritized by expected impact

