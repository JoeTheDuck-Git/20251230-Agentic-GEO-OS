# UI Interaction Matrix

## Overview

This document defines the interaction matrix for each page and section, specifying what clicking or interacting with UI elements DOES and MUST NOT do.

## GEO Overview Page

### Section 1: GEO Score Summary

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display score breakdown details | Edit score, trigger recomputation |
| **Hover** | Show score calculation methodology | Modify calculation |
| **Click Score** | Expand to show component breakdown | Recalculate score |
| **Click Trend** | Navigate to Historical Trends page | Trigger new analysis |

**Allowed Interactions**:
- View score details
- Expand/collapse breakdown
- Navigate to trends page

**Forbidden Interactions**:
- Edit score value
- Trigger score recalculation
- Modify score components

---

### Section 2: Visibility vs Sentiment Chart

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display chart visualization | Modify data points |
| **Hover Data Point** | Show tooltip with details | Edit data point |
| **Click Data Point** | Navigate to related topic/question | Trigger new analysis |
| **Zoom/Pan** | Adjust chart view | Modify underlying data |

**Allowed Interactions**:
- View chart
- Hover for details
- Navigate to related pages
- Adjust view (zoom/pan)

**Forbidden Interactions**:
- Edit data points
- Modify chart data
- Trigger data refresh

---

### Section 3: Top Competitors Comparison

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display competitor rankings | Edit competitor data |
| **Click Competitor** | Show competitor details (if available) | Modify competitor list |
| **Click Rank** | Sort by different metric | Change ranking algorithm |
| **Expand Row** | Show detailed comparison | Edit comparison data |

**Allowed Interactions**:
- View rankings
- Expand for details
- Navigate to competitor analysis

**Forbidden Interactions**:
- Add/remove competitors
- Edit competitor scores
- Modify ranking logic

---

### Section 4: Topic Performance Summary

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display topic list with metrics | Edit topic metrics |
| **Click Topic** | Navigate to Topic Intelligence page | Trigger new topic analysis |
| **Click Question Count** | Navigate to Question Explorer (filtered) | Generate new questions |
| **Click Score** | Show topic score details | Modify score |
| **Sort** | Reorder topics by metric | Modify underlying data |

**Allowed Interactions**:
- View topics
- Navigate to topic details
- Navigate to questions
- Sort/filter display

**Forbidden Interactions**:
- Edit topic metrics
- Add/remove topics
- Trigger new analysis
- Generate questions

---

### Section 5: High-Level Suggestions

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display recommendation cards | Execute recommendations |
| **Click Recommendation** | Navigate to Suggestions & Actions page | Auto-apply recommendation |
| **Click Priority** | Show priority explanation | Modify priority |
| **Click Impact** | Show impact details | Edit impact estimate |
| **Expand Card** | Show full recommendation details | Modify recommendation |

**Allowed Interactions**:
- View recommendations
- Navigate to detailed view
- Expand for details

**Forbidden Interactions**:
- Execute recommendation
- Edit recommendation
- Modify priority
- Apply automatically

---

### Section 6: Critical Warnings

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display warning alerts | Dismiss without acknowledgment |
| **Click Warning** | Show warning details | Modify warning |
| **Acknowledge** | Mark warning as acknowledged | Auto-acknowledge |
| **Click Policy Link** | Show policy reference | Modify policy |

**Allowed Interactions**:
- View warnings
- Acknowledge warnings
- View policy references

**Forbidden Interactions**:
- Dismiss without acknowledgment
- Modify warnings
- Edit policies

---

## Topic Intelligence Page

### Section 1: Topic Overview

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display topic information | Edit topic definition |
| **Click Topic Name** | Show topic metadata | Modify topic |
| **Click Region** | Filter by region (if applicable) | Add new regions |
| **Click Time Period** | Show analysis period details | Modify time range |

**Allowed Interactions**:
- View topic info
- Filter display
- View metadata

**Forbidden Interactions**:
- Edit topic definition
- Modify topic scope
- Add regions

---

### Section 2: Performance Metrics

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display metrics | Edit metric values |
| **Click Metric** | Show metric calculation details | Recalculate metric |
| **Click Trend** | Show trend visualization | Modify trend data |
| **Expand Breakdown** | Show component details | Edit components |

**Allowed Interactions**:
- View metrics
- View calculation details
- View trends

**Forbidden Interactions**:
- Edit metrics
- Recalculate
- Modify data

---

### Section 3: Brand Comparison

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display brand rankings | Edit competitor data |
| **Click Brand** | Show brand details | Modify brand list |
| **Click Rank** | Sort by different metric | Change ranking |
| **Expand Comparison** | Show detailed comparison | Edit comparison |

**Allowed Interactions**:
- View rankings
- View brand details
- Sort display

**Forbidden Interactions**:
- Edit competitor data
- Modify rankings
- Add/remove brands

---

### Section 4: Visibility Gaps

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display gap list | Mark gaps as resolved |
| **Click Gap** | Show gap details | Edit gap severity |
| **Click Root Cause** | Show root cause analysis | Modify root cause |
| **Click Related Questions** | Navigate to Question Explorer | Generate new questions |

**Allowed Interactions**:
- View gaps
- View details
- Navigate to questions

**Forbidden Interactions**:
- Mark as resolved
- Edit gap data
- Modify severity

---

### Section 5: Sentiment Risks

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display risk alerts | Dismiss risks |
| **Click Risk** | Show risk details | Modify risk level |
| **Click Trend** | Show sentiment trend | Edit trend data |
| **Acknowledge** | Mark risk as acknowledged | Auto-acknowledge |

**Allowed Interactions**:
- View risks
- View details
- Acknowledge risks

**Forbidden Interactions**:
- Dismiss risks
- Modify risk level
- Edit trend data

---

### Section 6: Pattern Insights

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display pattern list | Edit patterns |
| **Click Pattern** | Show pattern details | Modify pattern |
| **Click Confidence** | Show confidence calculation | Edit confidence |
| **Click Related** | Navigate to related topics/questions | Trigger new analysis |

**Allowed Interactions**:
- View patterns
- View details
- Navigate to related items

**Forbidden Interactions**:
- Edit patterns
- Modify confidence
- Trigger analysis

---

### Section 7: Opportunities

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display opportunity list | Execute opportunities |
| **Click Opportunity** | Show opportunity details | Modify opportunity |
| **Click Expected Impact** | Show impact calculation | Edit impact estimate |
| **Click Related Questions** | Navigate to Question Explorer | Generate questions |

**Allowed Interactions**:
- View opportunities
- View details
- Navigate to questions

**Forbidden Interactions**:
- Execute opportunities
- Edit opportunities
- Modify impact

---

### Section 8: Sample Questions

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display question list | Generate new questions |
| **Click Question** | Navigate to Question Explorer | Trigger question sampling |
| **Filter** | Filter questions by criteria | Modify question list |
| **Sort** | Sort questions | Edit questions |

**Allowed Interactions**:
- View questions
- Navigate to question details
- Filter/sort display

**Forbidden Interactions**:
- Generate questions
- Edit questions
- Trigger sampling

---

## Question Explorer Page

### Section 1: Question Details

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display question information | Edit question text |
| **Click Topic** | Navigate to Topic Intelligence | Modify topic |
| **Click Region** | Filter by region | Add regions |
| **Click Timestamp** | Show sampling details | Modify timestamp |

**Allowed Interactions**:
- View question info
- Navigate to topic
- View metadata

**Forbidden Interactions**:
- Edit question
- Modify topic
- Change timestamp

---

### Section 2: AI Answer Preview

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display answer text | Edit answer |
| **Click Source Domain** | Show source information | Modify sources |
| **Expand/Collapse** | Show full/truncated answer | Edit answer text |
| **Copy** | Copy answer text (for external use) | Modify answer |

**Allowed Interactions**:
- View answer
- Expand/collapse
- Copy text
- View sources

**Forbidden Interactions**:
- Edit answer
- Modify sources
- Regenerate answer

---

### Section 3: Brand Mentions

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display mention list | Add/remove mentions |
| **Click Mention** | Highlight mention in answer | Edit mention |
| **Click Context** | Show full context | Modify context |
| **Click Brand** | Show brand details | Modify brand |

**Allowed Interactions**:
- View mentions
- View context
- View brand details

**Forbidden Interactions**:
- Add/remove mentions
- Edit mentions
- Modify context

---

### Section 4: Position Analysis

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display position data | Edit position |
| **Click Position** | Show position calculation | Modify position |
| **Click Trend** | Show position trend | Edit trend |
| **Click Competitor** | Show competitor position | Modify competitor data |

**Allowed Interactions**:
- View position
- View calculation
- View trends

**Forbidden Interactions**:
- Edit position
- Modify calculation
- Change position

---

### Section 5: Sentiment Analysis

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display sentiment classifications | Edit sentiment |
| **Click Sentiment** | Show sentiment details | Modify classification |
| **Click Confidence** | Show confidence calculation | Edit confidence |
| **Click Context** | Show sentiment context | Modify context |

**Allowed Interactions**:
- View sentiment
- View details
- View context

**Forbidden Interactions**:
- Edit sentiment
- Modify classification
- Change confidence

---

### Section 6: GEO Score for This Question

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display question-level score | Edit score |
| **Click Score** | Show score breakdown | Modify score |
| **Click Component** | Show component calculation | Edit component |
| **Click Methodology** | Show calculation methodology | Modify methodology |

**Allowed Interactions**:
- View score
- View breakdown
- View methodology

**Forbidden Interactions**:
- Edit score
- Modify components
- Change methodology

---

### Section 7: Related Questions

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display related questions | Generate related questions |
| **Click Question** | Navigate to related question | Trigger question generation |
| **Filter** | Filter related questions | Modify question list |
| **Sort** | Sort related questions | Edit questions |

**Allowed Interactions**:
- View related questions
- Navigate to questions
- Filter/sort

**Forbidden Interactions**:
- Generate questions
- Edit questions
- Trigger generation

---

## Suggestions & Actions Page

### Section 1: Recommendations Summary

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display summary metrics | Edit summary |
| **Click Metric** | Show metric details | Modify metric |
| **Click Distribution** | Show distribution breakdown | Edit distribution |
| **Click Timestamp** | Show generation details | Trigger regeneration |

**Allowed Interactions**:
- View summary
- View details
- View breakdown

**Forbidden Interactions**:
- Edit summary
- Modify metrics
- Trigger generation

---

### Section 2: High Priority Recommendations

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display recommendation cards | Execute recommendations |
| **Click Recommendation** | Expand to show full details | Auto-apply recommendation |
| **Click Priority** | Show priority explanation | Modify priority |
| **Click Impact** | Show impact details | Edit impact |
| **Click Steps** | Show actionable steps | Modify steps |
| **Click Topic** | Navigate to Topic Intelligence | Trigger topic analysis |

**Allowed Interactions**:
- View recommendations
- Expand for details
- Navigate to topics
- View steps

**Forbidden Interactions**:
- Execute recommendation
- Edit recommendation
- Modify priority
- Modify steps

---

### Section 3: Medium Priority Recommendations

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display recommendation cards | Execute recommendations |
| **Click Recommendation** | Expand to show full details | Auto-apply recommendation |
| **Same as High Priority** | Same interaction rules | Same forbidden actions |

**Allowed Interactions**: Same as High Priority
**Forbidden Interactions**: Same as High Priority

---

### Section 4: Low Priority Recommendations

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display recommendation list (may be collapsed) | Execute recommendations |
| **Click Recommendation** | Expand to show details | Auto-apply recommendation |
| **Collapse/Expand** | Toggle list visibility | Modify recommendations |
| **Same as High Priority** | Same interaction rules | Same forbidden actions |

**Allowed Interactions**: Same as High Priority
**Forbidden Interactions**: Same as High Priority

---

### Section 5: Action Plans

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display action plan steps | Execute action plan |
| **Click Step** | Show step details | Mark step as complete |
| **Click Dependencies** | Show dependency graph | Modify dependencies |
| **Click Timeline** | Show timeline visualization | Edit timeline |
| **Expand Plan** | Show full action plan | Modify plan |

**Allowed Interactions**:
- View action plans
- View step details
- View dependencies
- View timeline

**Forbidden Interactions**:
- Execute action plan
- Mark steps complete
- Edit plan
- Modify timeline

---

### Section 6: Impact Estimates

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display impact estimates | Edit estimates |
| **Click Estimate** | Show estimation methodology | Modify estimate |
| **Click Confidence** | Show confidence calculation | Edit confidence |
| **Click Historical** | Show historical pattern references | Modify patterns |

**Allowed Interactions**:
- View estimates
- View methodology
- View confidence
- View historical data

**Forbidden Interactions**:
- Edit estimates
- Modify methodology
- Change confidence

---

### Section 7: Content Roadmap

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display roadmap visualization | Execute roadmap |
| **Click Topic** | Navigate to Topic Intelligence | Trigger topic analysis |
| **Click Content Type** | Show content recommendations | Generate content |
| **Click Priority** | Show priority explanation | Modify priority |
| **Expand Roadmap** | Show detailed roadmap | Edit roadmap |

**Allowed Interactions**:
- View roadmap
- Navigate to topics
- View content types
- View priorities

**Forbidden Interactions**:
- Execute roadmap
- Generate content
- Edit roadmap
- Modify priorities

---

### Section 8: Technical Checklist

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display checklist items | Mark items as complete |
| **Click Item** | Show item details | Execute item |
| **Click Priority** | Show priority explanation | Modify priority |
| **Click Impact** | Show expected impact | Edit impact |
| **Filter** | Filter by status/priority | Modify status |

**Allowed Interactions**:
- View checklist
- View item details
- Filter display

**Forbidden Interactions**:
- Mark items complete
- Execute items
- Edit checklist
- Modify status

---

### Section 9: Governance Warnings

| Interaction Type | What Clicking DOES | What Clicking MUST NOT Do |
|------------------|-------------------|---------------------------|
| **View** | Display warning alerts | Dismiss warnings |
| **Click Warning** | Show warning details | Modify warning |
| **Click Policy** | Show policy reference | Edit policy |
| **Acknowledge** | Mark warning as acknowledged | Auto-acknowledge |

**Allowed Interactions**:
- View warnings
- View details
- View policies
- Acknowledge warnings

**Forbidden Interactions**:
- Dismiss warnings
- Modify warnings
- Edit policies

---

## Summary

### Total Sections: 30
### Allowed Interaction Types: View, Acknowledge, Review, Navigate
### Forbidden Interaction Types: Execute, Edit, Modify, Trigger, Generate

