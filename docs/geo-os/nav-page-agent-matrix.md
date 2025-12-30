# Nav × Page × Agent Output Matrix

## Overview

This document defines the canonical mapping between navigation groups, pages, and agent outputs. It establishes which agents are allowed, forbidden, and required for each page to maintain system boundaries and prevent unauthorized agent access.

## Navigation Groups

### Intelligence
Pages that display metrics, scores, and analytical insights.

### Decisions
Pages that present recommendations, opportunities, and actionable insights.

### Execution Prep
Pages that provide technical readiness, structural guidance, and execution context.

### Measurement
Pages that display historical trends, time-series data, and performance tracking.

---

## Page: GEO Overview

**Nav Group**: Intelligence  
**Route**: `/`

### Primary Agent Output
- **Intelligence Agent**: GEO Score summary, visibility vs sentiment chart, topic performance summary, competitor comparison

### Supporting Agent Outputs
- **Strategy Agent**: High-level suggestions (top 3-5 recommendations)
- **Governance Agent**: Critical warnings and policy violations
- **Reasoning Agent**: Risk warnings (indirect, through Governance Agent)

### Explicitly Forbidden Agents
- **Observation Agent**: Raw question/answer data not displayed on overview
- **Autopilot**: Never appears in UI

### Why This Separation Matters
GEO Overview aggregates Intelligence Agent outputs to provide high-level performance visibility. Strategy Agent recommendations are included for context but are not the primary focus. Raw observation data is excluded to maintain abstraction and prevent information overload.

---

## Page: Topic Intelligence

**Nav Group**: Intelligence  
**Route**: `/topics`

### Primary Agent Output
- **Intelligence Agent**: Topic-level GEO Scores, performance metrics, brand comparison

### Supporting Agent Outputs
- **Reasoning Agent**: Visibility gaps, sentiment risks, pattern insights, opportunities
- **Observation Agent**: Sample questions for the topic

### Explicitly Forbidden Agents
- **Strategy Agent**: Recommendations not displayed on topic detail page
- **Governance Agent**: Warnings not displayed on topic detail page
- **Autopilot**: Never appears in UI

### Why This Separation Matters
Topic Intelligence focuses on analytical insights (Intelligence + Reasoning) with supporting raw data (Observation). Strategy recommendations are excluded to maintain separation between analysis and action planning. Governance warnings are excluded to keep the page focused on topic-specific insights.

---

## Page: Question Explorer

**Nav Group**: Intelligence  
**Route**: `/questions`

### Primary Agent Output
- **Observation Agent**: Question details, AI answer snapshots, brand mentions, position analysis, sentiment analysis

### Supporting Agent Outputs
- **Intelligence Agent**: Question-level GEO Score, position analysis (derived from Observation data)

### Explicitly Forbidden Agents
- **Reasoning Agent**: Gap analysis not displayed at question level
- **Strategy Agent**: Recommendations not displayed at question level
- **Governance Agent**: Warnings not displayed at question level
- **Autopilot**: Never appears in UI

### Why This Separation Matters
Question Explorer displays raw observation data with computed metrics. Higher-level analysis (Reasoning, Strategy) is excluded to maintain focus on individual question-level insights. This preserves the data hierarchy: Observation → Intelligence → Reasoning → Strategy.

---

## Page: Suggestions & Actions

**Nav Group**: Decisions  
**Route**: `/suggestions`

### Primary Agent Output
- **Strategy Agent**: Recommendations (all priorities), action plans, content roadmap, technical checklist, impact estimates

### Supporting Agent Outputs
- **Governance Agent**: Governance warnings for recommendations

### Explicitly Forbidden Agents
- **Observation Agent**: Raw data not displayed on recommendations page
- **Intelligence Agent**: Metrics not displayed on recommendations page (used indirectly for context)
- **Reasoning Agent**: Gaps and opportunities not displayed directly (used indirectly to generate recommendations)
- **Autopilot**: Never appears in UI

### Why This Separation Matters
Suggestions & Actions displays Strategy Agent outputs exclusively. Lower-level agents (Observation, Intelligence, Reasoning) are excluded to maintain clear separation between analysis and decision-making. Governance warnings are included to ensure policy compliance is visible when reviewing recommendations.

---

## Page: Best Practices

**Nav Group**: Execution Prep  
**Route**: `/best-practices`

### Primary Agent Output
- **Strategy Agent**: Technical checklist items (llms.txt, schema markup, content structure)

### Supporting Agent Outputs
- **Intelligence Agent**: Readiness indicators (derived from current state analysis)

### Explicitly Forbidden Agents
- **Observation Agent**: Raw data not relevant for technical readiness
- **Reasoning Agent**: Gap analysis not displayed on technical checklist
- **Governance Agent**: Warnings not displayed on technical checklist
- **Autopilot**: Never appears in UI

### Why This Separation Matters
Best Practices focuses on technical execution readiness from Strategy Agent. Intelligence Agent provides context about current state, but detailed analysis (Reasoning) and raw data (Observation) are excluded to maintain focus on actionable technical guidance.

---

## Page: Historical Trends

**Nav Group**: Measurement  
**Route**: `/trends`

### Primary Agent Output
- **Intelligence Agent**: Historical GEO Score time series, visibility trends, sentiment trends, topic movement

### Supporting Agent Outputs
- **Reasoning Agent**: Pattern insights (temporal patterns only)

### Explicitly Forbidden Agents
- **Observation Agent**: Raw historical snapshots not displayed (aggregated by Intelligence Agent)
- **Strategy Agent**: Recommendations not displayed on trends page
- **Governance Agent**: Warnings not displayed on trends page
- **Autopilot**: Never appears in UI

### Why This Separation Matters
Historical Trends displays aggregated time-series data from Intelligence Agent. Raw observation data is excluded because it is already aggregated. Strategy recommendations are excluded because trends focus on measurement, not decision-making. Reasoning Agent pattern insights are included only for temporal pattern recognition, not gap analysis.

---

## Agent Output Summary

### Observation Agent
**Allowed Pages**: Topic Intelligence (supporting), Question Explorer (primary)  
**Forbidden Pages**: GEO Overview, Suggestions & Actions, Best Practices, Historical Trends  
**Rationale**: Raw observation data is displayed only at detailed levels (topic, question). Aggregated views use Intelligence Agent outputs.

### Intelligence Agent
**Allowed Pages**: GEO Overview (primary), Topic Intelligence (primary), Best Practices (supporting), Historical Trends (primary)  
**Forbidden Pages**: Suggestions & Actions (indirect use only), Question Explorer (supporting only)  
**Rationale**: Intelligence Agent outputs are the primary data source for metrics and aggregated insights. They are excluded from decision pages to maintain separation of concerns.

### Reasoning Agent
**Allowed Pages**: Topic Intelligence (supporting), Historical Trends (supporting, temporal patterns only)  
**Forbidden Pages**: GEO Overview (indirect only), Question Explorer, Suggestions & Actions (indirect only), Best Practices  
**Rationale**: Reasoning Agent outputs (gaps, opportunities) are displayed only on analysis pages. They inform Strategy Agent but are not displayed on decision pages.

### Strategy Agent
**Allowed Pages**: GEO Overview (supporting, high-level only), Suggestions & Actions (primary), Best Practices (primary)  
**Forbidden Pages**: Topic Intelligence, Question Explorer, Historical Trends  
**Rationale**: Strategy Agent outputs (recommendations) are displayed only on decision and execution prep pages. They are excluded from analysis and measurement pages to maintain clear boundaries.

### Governance Agent
**Allowed Pages**: GEO Overview (supporting, warnings only), Suggestions & Actions (supporting, warnings only)  
**Forbidden Pages**: Topic Intelligence, Question Explorer, Best Practices, Historical Trends  
**Rationale**: Governance warnings are displayed only on overview and decision pages where policy compliance is critical. They are excluded from detailed analysis pages to maintain focus.

### Autopilot
**Allowed Pages**: None (explicitly forbidden in all UI)  
**Forbidden Pages**: All pages  
**Rationale**: Autopilot is a system-level capability, not a UI feature. It must never appear in any page output or schema.

---

## Enforcement Rules

### Rule 1: Primary Agent Output Must Be Present
- Every page must have a primary agent output
- Pages cannot render without primary agent data
- Missing primary agent output results in page error state

### Rule 2: Supporting Agent Outputs Are Optional
- Supporting agent outputs may be missing without causing page errors
- Pages should gracefully handle missing supporting data
- Supporting data enhances but does not define page functionality

### Rule 3: Forbidden Agents Must Be Blocked
- Backend must reject requests for forbidden agent outputs on specific pages
- Frontend must not request forbidden agent data
- Violations must be logged and audited

### Rule 4: Agent Output Hierarchy Must Be Preserved
- Lower-level agents (Observation, Intelligence) cannot be bypassed
- Higher-level agents (Reasoning, Strategy) cannot access raw data directly
- Agent dependencies must be respected

### Rule 5: Autopilot Must Never Appear
- Autopilot output must never be included in any page schema
- Autopilot status must never be displayed in UI
- Autopilot controls must never exist in UI

---

## Summary

This matrix establishes clear boundaries between navigation groups, pages, and agent outputs. It ensures that:

- **Intelligence pages** display metrics and analysis (Intelligence, Reasoning, Observation)
- **Decisions pages** display recommendations and actions (Strategy, Governance)
- **Execution Prep pages** display technical guidance (Strategy, Intelligence)
- **Measurement pages** display historical data (Intelligence, Reasoning patterns)

All pages explicitly forbid Autopilot, and agent outputs are restricted to maintain proper data flow and separation of concerns.

