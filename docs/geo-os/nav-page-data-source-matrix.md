# Nav × Page × Data Source Matrix

## Overview

This document defines the canonical data sources for each page in the GEO OS. It specifies primary data sources, secondary/derived signals, explicitly excluded data sources, and engineering notes about data access patterns.

---

## Page: GEO Overview

**Nav Group**: Intelligence  
**Route**: `/`  
**Page Purpose**: Display high-level GEO performance metrics, competitive positioning, and top recommendations.

### Primary Data Sources
- **Intelligence Agent Output**: GEO Score summary, visibility vs sentiment metrics, topic performance aggregations, brand comparison rankings
- **Strategy Agent Output**: Top 3-5 high-priority recommendations
- **Governance Agent Output**: Critical warnings and policy violations

### Secondary / Derived Signals
- **Topic Performance Trends**: Derived from Intelligence Agent historical snapshots (last 30 days)
- **Competitive Gap Indicators**: Derived from brand comparison rankings
- **Recommendation Impact Estimates**: Derived from Strategy Agent expected impact calculations

### Explicitly Excluded Data Sources
- **AI Answer Snapshots**: Raw answer text not displayed on overview
- **Individual Question Data**: Question-level details excluded from overview
- **Market Voice Data**: Forum, social, Q&A data not displayed on overview
- **Google Analytics Data**: Traffic and engagement metrics excluded (measurement isolation)
- **Execution Status**: Status from external execution systems excluded
- **Autopilot Status**: Autopilot state never displayed

### Engineering Notes
- **Read-Only**: All data is read-only snapshots from agent outputs
- **Snapshot-Based**: Data is point-in-time snapshots, not real-time streams
- **Aggregated**: All metrics are pre-aggregated by Intelligence Agent
- **Cached**: GEO Score summaries can be cached (TTL: 5 minutes)
- **No Direct Database Access**: Frontend must not query database directly; all data comes through agent output APIs

---

## Page: Topic Intelligence

**Nav Group**: Intelligence  
**Route**: `/topics`  
**Page Purpose**: Display detailed topic-level performance analysis, competitive positioning, gaps, and opportunities.

### Primary Data Sources
- **Intelligence Agent Output**: Topic-level GEO Scores, performance metrics, brand comparison within topic
- **Reasoning Agent Output**: Visibility gaps, sentiment risks, pattern insights, opportunities for the topic
- **Observation Agent Output**: Sample questions for the topic

### Secondary / Derived Signals
- **Gap Severity Indicators**: Derived from Reasoning Agent gap analysis (high/medium/low)
- **Sentiment Trend Indicators**: Derived from Intelligence Agent historical snapshots (improving/declining/stable)
- **Competitive Position Changes**: Derived from Intelligence Agent brand comparison over time

### Explicitly Excluded Data Sources
- **Individual AI Answer Text**: Full answer text not displayed (only excerpts in question context)
- **Market Voice Data**: Forum, social, Q&A data not displayed on topic page
- **Google Analytics Data**: Traffic and engagement metrics excluded (measurement isolation)
- **Execution Status**: Status from external execution systems excluded
- **Strategy Recommendations**: Recommendations excluded (displayed on separate page)
- **Autopilot Status**: Autopilot state never displayed

### Engineering Notes
- **Read-Only**: All data is read-only snapshots from agent outputs
- **Snapshot-Based**: Data is point-in-time snapshots, not real-time streams
- **Topic-Scoped**: All data is filtered to specific topic ID
- **No Direct Database Access**: Frontend must not query database directly; all data comes through agent output APIs
- **Lazy Loading**: Sample questions can be loaded on-demand (pagination)

---

## Page: Question Explorer

**Nav Group**: Intelligence  
**Route**: `/questions`  
**Page Purpose**: Display individual questions, AI answers, brand mentions, and question-level metrics.

### Primary Data Sources
- **Observation Agent Output**: Question details, AI answer snapshots, brand mentions, position data, sentiment classifications
- **Intelligence Agent Output**: Question-level GEO Score

### Secondary / Derived Signals
- **Position Ranking**: Derived from Observation Agent position data (relative to other brands)
- **Sentiment Confidence**: Derived from Observation Agent sentiment classifications
- **Related Question Links**: Derived from Observation Agent question similarity analysis

### Explicitly Excluded Data Sources
- **Topic Aggregations**: Topic-level metrics excluded (displayed on topic page)
- **Gap Analysis**: Reasoning Agent gaps excluded (displayed on topic page)
- **Recommendations**: Strategy Agent recommendations excluded
- **Market Voice Data**: Forum, social, Q&A data not displayed on question page
- **Google Analytics Data**: Traffic and engagement metrics excluded (measurement isolation)
- **Execution Status**: Status from external execution systems excluded
- **Autopilot Status**: Autopilot state never displayed

### Engineering Notes
- **Read-Only**: All data is read-only snapshots from agent outputs
- **Snapshot-Based**: Data is point-in-time snapshots (AI answers are immutable once captured)
- **Question-Scoped**: All data is filtered to specific question ID
- **No Direct Database Access**: Frontend must not query database directly; all data comes through agent output APIs
- **Immutable Answers**: AI answer snapshots cannot be modified or re-captured through UI

---

## Page: Suggestions & Actions

**Nav Group**: Decisions  
**Route**: `/suggestions`  
**Page Purpose**: Display prioritized recommendations, action plans, and execution context for improving GEO performance.

### Primary Data Sources
- **Strategy Agent Output**: Recommendations (all priorities), action plans, content roadmap, technical checklist, impact estimates
- **Governance Agent Output**: Governance warnings for recommendations

### Secondary / Derived Signals
- **Recommendation Priority Distribution**: Derived from Strategy Agent priority assignments
- **Expected Impact Aggregations**: Derived from Strategy Agent impact estimates
- **Action Plan Step Counts**: Derived from Strategy Agent action plans

### Explicitly Excluded Data Sources
- **Raw Observation Data**: AI answer snapshots, brand mentions excluded (used indirectly)
- **Intelligence Metrics**: GEO Scores excluded (used indirectly for context)
- **Reasoning Gaps**: Gap analysis excluded (used indirectly to generate recommendations)
- **Market Voice Data**: Forum, social, Q&A data not displayed on recommendations page
- **Google Analytics Data**: Traffic and engagement metrics excluded (measurement isolation)
- **Execution Status**: Status from external execution systems excluded (execution handoff is separate)
- **Autopilot Status**: Autopilot state never displayed

### Engineering Notes
- **Read-Only**: All data is read-only snapshots from agent outputs
- **Snapshot-Based**: Data is point-in-time snapshots, not real-time streams
- **No Direct Database Access**: Frontend must not query database directly; all data comes through agent output APIs
- **No Execution Triggers**: Page displays recommendations only; no execution API calls allowed
- **Handoff Context**: Recommendations can be packaged for execution handoff (separate process)

---

## Page: Best Practices

**Nav Group**: Execution Prep  
**Route**: `/best-practices`  
**Page Purpose**: Display technical readiness checklist and structural improvement guidance.

### Primary Data Sources
- **Strategy Agent Output**: Technical checklist items (llms.txt, schema markup, content structure)
- **Intelligence Agent Output**: Readiness indicators (current state analysis)

### Secondary / Derived Signals
- **Checklist Completion Status**: Derived from Intelligence Agent current state vs. Strategy Agent requirements
- **Readiness Score**: Derived from checklist completion percentage

### Explicitly Excluded Data Sources
- **Raw Observation Data**: AI answer snapshots, brand mentions excluded
- **Gap Analysis**: Reasoning Agent gaps excluded
- **Recommendations**: Full Strategy Agent recommendations excluded (only technical items)
- **Market Voice Data**: Forum, social, Q&A data not displayed on best practices page
- **Google Analytics Data**: Traffic and engagement metrics excluded (measurement isolation)
- **Execution Status**: Status from external execution systems excluded
- **Autopilot Status**: Autopilot state never displayed

### Engineering Notes
- **Read-Only**: All data is read-only snapshots from agent outputs
- **Snapshot-Based**: Data is point-in-time snapshots, not real-time streams
- **No Direct Database Access**: Frontend must not query database directly; all data comes through agent output APIs
- **Static Guidance**: Best practices include static guidance content (not agent-generated)

---

## Page: Historical Trends

**Nav Group**: Measurement  
**Route**: `/trends`  
**Page Purpose**: Display time-series performance data, trends, and historical patterns.

### Primary Data Sources
- **Intelligence Agent Output**: Historical GEO Score time series, visibility trends, sentiment trends, topic movement over time
- **Reasoning Agent Output**: Temporal pattern insights (pattern recognition over time)

### Secondary / Derived Signals
- **Trend Direction Indicators**: Derived from Intelligence Agent time series (improving/declining/stable)
- **Pattern Confidence Scores**: Derived from Reasoning Agent pattern recognition
- **Velocity Metrics**: Rate of change calculations (derived from time series)

### Explicitly Excluded Data Sources
- **Raw Historical Snapshots**: Individual observation snapshots excluded (aggregated by Intelligence Agent)
- **Current Recommendations**: Strategy Agent recommendations excluded (focus on measurement, not decisions)
- **Market Voice Data**: Forum, social, Q&A data not displayed on trends page
- **Google Analytics Data**: Traffic and engagement metrics excluded (measurement isolation)
- **Execution Status**: Status from external execution systems excluded
- **Autopilot Status**: Autopilot state never displayed

### Engineering Notes
- **Read-Only**: All data is read-only snapshots from agent outputs
- **Time-Series**: Data is time-series format (timestamp + value pairs)
- **Aggregated**: All metrics are pre-aggregated by Intelligence Agent (no raw data)
- **No Direct Database Access**: Frontend must not query database directly; all data comes through agent output APIs
- **Time Range Filters**: Data can be filtered by time range (last 7/30/90 days, custom range)

---

## Measurement Isolation Rules

### Rule 1: Google Analytics Data Must Not Influence Strategy
- **Requirement**: Google Analytics data (traffic, engagement) must never be used as input to Reasoning Agent or Strategy Agent
- **Rationale**: GEO OS measures AI answer presence, not web traffic. Mixing metrics would corrupt GEO analysis.
- **Enforcement**: Backend must reject any attempt to use GA data in agent inputs

### Rule 2: Google Analytics Data Is Measurement-Only
- **Requirement**: If GA data is displayed, it must be in separate measurement pages only
- **Rationale**: GA data measures execution outcomes, not GEO performance
- **Enforcement**: GA data can only appear on measurement pages, never on intelligence or decision pages

### Rule 3: Market Voice Data Is Excluded
- **Requirement**: Forum, social, Q&A data must not be displayed on any GEO OS page
- **Rationale**: GEO OS measures AI answer presence, not social media or forum presence
- **Enforcement**: Backend must reject any attempt to include market voice data in page outputs

### Rule 4: Execution Status Is Excluded
- **Requirement**: Status from external execution systems must not be displayed on any GEO OS page
- **Rationale**: GEO OS provides intelligence and recommendations; execution is outside scope
- **Enforcement**: Backend must reject any attempt to include execution status in page outputs

---

## Data Source Access Patterns

### Pattern 1: Agent Output APIs Only
- **Requirement**: All page data must come through agent output APIs
- **Rationale**: Maintains separation of concerns and ensures data consistency
- **Implementation**: Frontend calls `/api/agents/{agent}/outputs` endpoints only

### Pattern 2: Snapshot-Based (Not Real-Time)
- **Requirement**: All data is point-in-time snapshots, not real-time streams
- **Rationale**: Agent outputs are computed at analysis time, not continuously updated
- **Implementation**: Data includes `snapshot_timestamp` field; frontend displays "Data as of {timestamp}"

### Pattern 3: Read-Only Access
- **Requirement**: All page data is read-only; no write operations allowed
- **Rationale**: Agent outputs are immutable; modifications would corrupt analysis
- **Implementation**: All API endpoints are GET-only; no POST/PUT/PATCH allowed

### Pattern 4: No Direct Database Access
- **Requirement**: Frontend must never query database directly
- **Rationale**: Maintains abstraction and ensures data consistency
- **Implementation**: Frontend has no database connection; all data comes through APIs

---

## Summary

This matrix establishes clear data source boundaries for each page:

- **Intelligence pages** use Intelligence, Reasoning, and Observation agent outputs
- **Decisions pages** use Strategy and Governance agent outputs
- **Execution Prep pages** use Strategy and Intelligence agent outputs
- **Measurement pages** use Intelligence and Reasoning (temporal patterns) agent outputs

All pages explicitly exclude:
- Market voice data (forums, social, Q&A)
- Google Analytics data (measurement isolation)
- Execution status (outside GEO OS scope)
- Autopilot status (never displayed)

All data access follows read-only, snapshot-based patterns through agent output APIs only.

