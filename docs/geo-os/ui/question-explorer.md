# Question Explorer Page - Agent-to-UI Projection

## Page Purpose

The Question Explorer page displays individual questions and their corresponding AI-generated answers. It shows how brands are mentioned, their positions, and sentiment context to help users understand specific instances of brand presence in AI answers.

## Intended Audience

- **Primary**: Content creators, analysts, brand managers
- **Secondary**: Researchers, strategists
- **Use Case**: Detailed question analysis, brand mention review, answer quality assessment

## Page Sections (Ordered Top to Bottom)

### Section 1: Question Details

| Property | Value |
|----------|-------|
| **Section Name** | Question Details |
| **Source Agent** | Observation Agent |
| **Output Type** | Metric |
| **Decision Impact Level** | Low |
| **Human Action Type** | View |

**Content**:
- Question text
- Topic association
- Region
- Question ID
- Sampling timestamp
- Related topics

**Agent Attribution**: "Sampled by Observation Agent"

**Metadata**:
- Question ID
- Sampling method
- Question template (if applicable)

---

### Section 2: AI Answer Preview

| Property | Value |
|----------|-------|
| **Section Name** | AI Answer Preview |
| **Source Agent** | Observation Agent |
| **Output Type** | Metric |
| **Decision Impact Level** | Low |
| **Human Action Type** | View |

**Content**:
- Full AI-generated answer text
- Answer timestamp
- Source domains referenced
- Answer length
- Answer quality indicators (if available)

**Agent Attribution**: "Captured by Observation Agent"

**Metadata**:
- Capture timestamp
- Source information
- Answer version/hash

---

### Section 3: Brand Mentions

| Property | Value |
|----------|-------|
| **Section Name** | Brand Mentions |
| **Source Agent** | Observation Agent |
| **Output Type** | Metric |
| **Decision Impact Level** | Medium |
| **Human Action Type** | Review |

**Content**:
- List of all brand mentions in answer
- Brand name and ID
- Position in answer (1st, 2nd, 3rd, etc.)
- Mention context (surrounding text)
- Mention type (direct/indirect)

**Agent Attribution**: "Detected by Observation Agent"

**Metadata**:
- Detection confidence
- Mention extraction method
- Context window size

---

### Section 4: Position Analysis

| Property | Value |
|----------|-------|
| **Section Name** | Position Analysis |
| **Source Agent** | Observation Agent, Intelligence Agent |
| **Output Type** | Insight |
| **Decision Impact Level** | Medium |
| **Human Action Type** | View |

**Content**:
- Primary brand position in answer
- Position relative to competitors
- Position trend (if historical data available)
- Position impact on visibility score

**Agent Attribution**: "Inferred by Observation Agent, Analyzed by Intelligence Agent"

**Metadata**:
- Position calculation method
- Total brands mentioned
- Position ranking

---

### Section 5: Sentiment Analysis

| Property | Value |
|----------|-------|
| **Section Name** | Sentiment Analysis |
| **Source Agent** | Observation Agent |
| **Output Type** | Insight |
| **Decision Impact Level** | Medium |
| **Human Action Type** | Review |

**Content**:
- Sentiment classification for each mention:
  - Positive / Neutral / Negative
  - Confidence score
  - Context text
- Overall sentiment for primary brand
- Sentiment distribution across all mentions

**Agent Attribution**: "Tagged by Observation Agent"

**Metadata**:
- Sentiment classification confidence
- Classification method
- Context analysis details

---

### Section 6: GEO Score for This Question

| Property | Value |
|----------|-------|
| **Section Name** | GEO Score for This Question |
| **Source Agent** | Intelligence Agent |
| **Output Type** | Metric |
| **Decision Impact Level** | Low |
| **Human Action Type** | View |

**Content**:
- Question-level GEO Score
- Visibility component (reach, position)
- Sentiment component (type, confidence)
- Score breakdown explanation

**Agent Attribution**: "Computed by Intelligence Agent"

**Metadata**:
- Score calculation timestamp
- Component weights
- Score methodology

---

### Section 7: Related Questions

| Property | Value |
|----------|-------|
| **Section Name** | Related Questions |
| **Source Agent** | Observation Agent |
| **Output Type** | Metric |
| **Decision Impact Level** | Low |
| **Human Action Type** | View |

**Content**:
- List of related questions (same topic, similar themes)
- Links to other question pages
- Question similarity indicators

**Agent Attribution**: "Identified by Observation Agent"

**Metadata**:
- Relatedness criteria
- Number of related questions

---

## Page Layout

```
┌─────────────────────────────────────────┐
│  Question Details (Section 1)           │
│  [Question header]                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  AI Answer Preview (Section 2)          │
│  [Answer text display]                    │
└─────────────────────────────────────────┘

┌──────────────┬──────────────────────────┐
│ Brand        │ Position Analysis (S4)   │
│ Mentions     │                          │
│ (S3)         │                          │
└──────────────┴──────────────────────────┘

┌──────────────┬──────────────────────────┐
│ Sentiment    │ GEO Score (S6)           │
│ Analysis (S5) │                          │
└──────────────┴──────────────────────────┘

┌─────────────────────────────────────────┐
│  Related Questions (Section 7)           │
│  [Question links]                        │
└─────────────────────────────────────────┘
```

## What This Page MUST NOT Allow

1. **No Answer Editing**
   - Users cannot edit AI-generated answers
   - Answers are captured outputs, not editable

2. **No Mention Annotation**
   - Users cannot manually add or remove brand mentions
   - Mentions are detected outputs, not editable

3. **No Sentiment Override**
   - Users cannot manually change sentiment classifications
   - Sentiment is tagged output, not editable

4. **No Position Adjustment**
   - Users cannot manually adjust position rankings
   - Positions are inferred outputs, not editable

5. **No Question Regeneration**
   - No UI to request new questions
   - Question sampling is controlled by Observation Agent

6. **No Answer Re-capture**
   - No buttons to trigger new answer capture
   - Answer capture is controlled by Observation Agent

## Navigation Links

- **To Topic Intelligence**: Link to topic page
- **To GEO Overview**: Back to main dashboard
- **To Related Questions**: Click on any question in Section 7
- **To Suggestions & Actions**: If question has related recommendations

## Agent Output Dependencies

- **Observation Agent**: Sections 1, 2, 3, 4, 5, 7
- **Intelligence Agent**: Sections 4, 6

