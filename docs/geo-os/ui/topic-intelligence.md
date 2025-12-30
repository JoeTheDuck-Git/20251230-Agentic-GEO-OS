# Topic Intelligence Page - Agent-to-UI Projection

## Page Purpose

The Topic Intelligence page provides detailed analysis of brand performance within specific topics. It shows topic-level metrics, competitive positioning, gaps, and opportunities to help users understand where their brand stands in AI-generated answers for each topic.

## Intended Audience

- **Primary**: Content strategists, topic owners, marketing managers
- **Secondary**: Analysts, brand managers
- **Use Case**: Topic-level performance analysis, competitive analysis, gap identification

## Page Sections (Ordered Top to Bottom)

### Section 1: Topic Overview

| Property | Value |
|----------|-------|
| **Section Name** | Topic Overview |
| **Source Agent** | Intelligence Agent |
| **Output Type** | Metric |
| **Decision Impact Level** | Medium |
| **Human Action Type** | View |

**Content**:
- Topic name and description
- Overall GEO Score for this topic
- Question count analyzed
- Time period of analysis
- Region(s) analyzed

**Agent Attribution**: "Metrics from Intelligence Agent"

**Metadata**:
- Topic ID
- Analysis timestamp
- Request ID

---

### Section 2: Performance Metrics

| Property | Value |
|----------|-------|
| **Section Name** | Performance Metrics |
| **Source Agent** | Intelligence Agent |
| **Output Type** | Metric |
| **Decision Impact Level** | Medium |
| **Human Action Type** | View |

**Content**:
- Visibility metrics:
  - Reach percentage
  - Average position
  - Position distribution
- Sentiment metrics:
  - Sentiment distribution (positive/neutral/negative counts)
  - Average sentiment confidence
  - Sentiment trend
- GEO Score components breakdown

**Agent Attribution**: "Computed by Intelligence Agent"

**Metadata**:
- Metric calculation methodology
- Data freshness
- Sample size

---

### Section 3: Brand Comparison

| Property | Value |
|----------|-------|
| **Section Name** | Brand Comparison |
| **Source Agent** | Intelligence Agent |
| **Output Type** | Insight |
| **Decision Impact Level** | Medium |
| **Human Action Type** | Review |

**Content**:
- Ranked list of brands in this topic
- GEO Score for each brand
- Primary brand rank and position
- Competitive gaps (score differences)
- Market share indicators (if applicable)

**Agent Attribution**: "Analysis by Intelligence Agent"

**Metadata**:
- Number of competitors tracked
- Comparison methodology
- Ranking criteria

---

### Section 4: Visibility Gaps

| Property | Value |
|----------|-------|
| **Section Name** | Visibility Gaps |
| **Source Agent** | Reasoning Agent |
| **Output Type** | Insight |
| **Decision Impact Level** | High |
| **Human Action Type** | Review |

**Content**:
- List of identified visibility gaps
- Gap severity (high/medium/low)
- Current reach vs threshold
- Average position issues
- Root cause analysis
- Affected question count

**Agent Attribution**: "Identified by Reasoning Agent"

**Metadata**:
- Gap detection thresholds
- Root cause analysis confidence
- Related questions

---

### Section 5: Sentiment Risks

| Property | Value |
|----------|-------|
| **Section Name** | Sentiment Risks |
| **Source Agent** | Reasoning Agent |
| **Output Type** | Warning |
| **Decision Impact Level** | High |
| **Human Action Type** | Review |

**Content**:
- Risk level (high/medium/low)
- Negative mention count and percentage
- Sentiment trend (improving/declining/stable)
- Root cause of negative sentiment
- Risk pattern description

**Agent Attribution**: "Assessed by Reasoning Agent"

**Metadata**:
- Risk assessment confidence
- Trend analysis period
- Related mentions

---

### Section 6: Pattern Insights

| Property | Value |
|----------|-------|
| **Section Name** | Pattern Insights |
| **Source Agent** | Reasoning Agent |
| **Output Type** | Insight |
| **Decision Impact Level** | Medium |
| **Human Action Type** | View |

**Content**:
- Recognized patterns:
  - Topic correlations
  - Regional differences
  - Temporal patterns
  - Question patterns
- Pattern confidence scores
- Pattern descriptions

**Agent Attribution**: "Recognized by Reasoning Agent"

**Metadata**:
- Pattern recognition confidence
- Pattern type
- Related topics/questions

---

### Section 7: Opportunities

| Property | Value |
|----------|-------|
| **Section Name** | Opportunities |
| **Source Agent** | Reasoning Agent |
| **Output Type** | Insight |
| **Decision Impact Level** | High |
| **Human Action Type** | Review |

**Content**:
- Mapped opportunities:
  - Opportunity type (content_gap, sentiment_improvement, etc.)
  - Description
  - Expected impact
  - Priority
  - Related questions
- Opportunity ranking

**Agent Attribution**: "Mapped by Reasoning Agent"

**Metadata**:
- Opportunity mapping confidence
- Expected impact estimates
- Related gaps

---

### Section 8: Sample Questions

| Property | Value |
|----------|-------|
| **Section Name** | Sample Questions |
| **Source Agent** | Observation Agent |
| **Output Type** | Metric |
| **Decision Impact Level** | Low |
| **Human Action Type** | View |

**Content**:
- List of sample questions for this topic
- Question text
- Links to detailed question pages
- Question metadata (region, timestamp)

**Agent Attribution**: "Sampled by Observation Agent"

**Metadata**:
- Total questions sampled
- Sampling methodology
- Question selection criteria

---

## Page Layout

```
┌─────────────────────────────────────────┐
│  Topic Overview (Section 1)            │
│  [Topic header with key metrics]        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Performance Metrics (Section 2)        │
│  [Detailed metrics display]              │
└─────────────────────────────────────────┘

┌──────────────┬──────────────────────────┐
│ Brand        │ Visibility Gaps (S4)     │
│ Comparison   │                          │
│ (S3)         │                          │
└──────────────┴──────────────────────────┘

┌──────────────┬──────────────────────────┐
│ Sentiment    │ Pattern Insights (S6)    │
│ Risks (S5)   │                          │
└──────────────┴──────────────────────────┘

┌─────────────────────────────────────────┐
│  Opportunities (Section 7)               │
│  [Opportunity cards]                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Sample Questions (Section 8)            │
│  [Question list]                         │
└─────────────────────────────────────────┘
```

## What This Page MUST NOT Allow

1. **No Topic Modification**
   - Users cannot edit topic definitions
   - Topics are predefined and governance-validated

2. **No Score Adjustment**
   - Users cannot manually adjust GEO Scores or metrics
   - All metrics are computed outputs

3. **No Gap Resolution Marking**
   - No UI to mark gaps as "resolved"
   - Gap status is determined by agent analysis, not user input

4. **No Question Generation**
   - No UI to request new questions for this topic
   - Question sampling is controlled by Observation Agent

5. **No Opportunity Execution**
   - No buttons to execute opportunities
   - Opportunities are insights, not actions

6. **No Competitive Data Editing**
   - No manual competitor data entry
   - Competitor data comes from agent analysis

## Navigation Links

- **To GEO Overview**: Back to main dashboard
- **To Question Explorer**: Click on any question in Section 8
- **To Suggestions & Actions**: Click on opportunities in Section 7
- **To Other Topics**: Topic selector or navigation menu

## Agent Output Dependencies

- **Intelligence Agent**: Sections 1, 2, 3
- **Reasoning Agent**: Sections 4, 5, 6, 7
- **Observation Agent**: Section 8

