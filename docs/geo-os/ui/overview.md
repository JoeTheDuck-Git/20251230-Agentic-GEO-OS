# Agent-to-UI Projection - Overview

## Introduction

The Agent-to-UI Projection layer translates agent outputs into human-readable UI structures. The UI is a **presentation layer only** - it reflects agent outputs but does not control agents or trigger execution.

## Core Principles

### Principle 1: Reflection, Not Control
- UI reflects agent outputs; it does not control agents
- UI displays what agents have computed; it does not request new computations
- UI shows recommendations; it does not execute them

### Principle 2: Agent Attribution
- Every UI section must declare its source agent
- Users must know which agent produced each piece of information
- Agent attribution is visible and clear

### Principle 3: No Execution Triggers
- No UI action may trigger execution
- No buttons that imply automatic execution
- Recommendations are displayed, not executed

### Principle 4: Output Type Clarity
- Each section clearly indicates its output type:
  - **Metric**: Quantitative measurement
  - **Insight**: Analytical finding
  - **Recommendation**: Suggested action
  - **Warning**: Alert or constraint

### Principle 5: Decision Impact Transparency
- Each section indicates its decision impact level:
  - **Low**: Informational, no immediate action needed
  - **Medium**: Important, review recommended
  - **High**: Critical, action may be required

## UI Structure

### Page Hierarchy

1. **GEO Overview** (`/`)
   - Main dashboard
   - Aggregated metrics and high-level insights
   - Entry point for all users

2. **Topic Intelligence** (`/topics`)
   - Topic-level analysis
   - Performance breakdowns by topic
   - Competitive comparisons

3. **Question Explorer** (`/questions`)
   - Individual question analysis
   - AI answer previews
   - Brand mention details

4. **Suggestions & Actions** (`/suggestions`)
   - Prioritized recommendations
   - Action plans
   - Expected impact

## Agent Output Mapping

### Intelligence Agent Outputs
- **GEO Scores**: Overall and component scores
- **Topic Performance**: Aggregated metrics per topic
- **Brand Comparisons**: Competitive rankings
- **Historical Trends**: Time-series data

### Reasoning Agent Outputs
- **Visibility Gaps**: Identified gaps with severity
- **Sentiment Risks**: Risk assessments
- **Pattern Insights**: Recognized patterns
- **Opportunities**: Mapped opportunities

### Strategy Agent Outputs
- **Recommendations**: Prioritized action items
- **Action Plans**: Detailed execution steps
- **Impact Estimates**: Expected improvements
- **Timelines**: Estimated execution timeframes

### Observation Agent Outputs
- **Question Lists**: Sampled questions
- **AI Answer Snapshots**: Captured answers
- **Brand Mentions**: Detection results

### Governance Agent Outputs
- **Policy Validations**: Approval status
- **Warnings**: Policy warnings
- **Constraints**: Operational limits

## Section Metadata

Each UI section includes:

### Required Metadata
- **Source Agent**: Which agent produced the output
- **Output Type**: Metric / Insight / Recommendation / Warning
- **Decision Impact Level**: Low / Medium / High
- **Human Action Type**: View / Acknowledge / Review
- **Timestamp**: When the output was generated
- **Request ID**: Traceability to analysis request

### Optional Metadata
- **Confidence Score**: For insights and recommendations
- **Severity**: For warnings and risks
- **Priority**: For recommendations
- **Related Items**: Links to related sections

## Human Action Types

### View
- **Purpose**: Display information only
- **Interaction**: Read-only viewing
- **Example**: Viewing GEO Scores, metrics

### Acknowledge
- **Purpose**: Confirm awareness of information
- **Interaction**: User acknowledges they've seen it
- **Example**: Acknowledging warnings, policy constraints

### Review
- **Purpose**: Requires human review and decision
- **Interaction**: User reviews and may take action externally
- **Example**: Reviewing recommendations, high-impact insights

## Safety Constraints

### What UI MUST NOT Do

1. **No Execution Buttons**
   - No "Execute" or "Apply" buttons
   - No automatic execution triggers
   - Recommendations are displayed only

2. **No Agent Control**
   - No buttons to trigger agent actions
   - No requests for new analysis
   - No agent configuration changes

3. **No Policy Modification**
   - No UI to modify policies
   - No governance rule changes
   - No capability level modifications

4. **No Scope Expansion**
   - No UI to add topics/brands/regions
   - No question generation triggers
   - Scope changes require separate process

5. **No Data Modification**
   - No editing of agent outputs
   - No manual score adjustments
   - No data deletion

### What UI MUST Do

1. **Display Agent Outputs**
   - Show all relevant agent outputs
   - Maintain agent attribution
   - Preserve output integrity

2. **Provide Context**
   - Show related information
   - Link to source data
   - Display metadata

3. **Enable Navigation**
   - Link between related pages
   - Enable drill-down
   - Support exploration

4. **Maintain Auditability**
   - Show timestamps
   - Display request IDs
   - Preserve traceability

## Documentation

- [GEO Overview Page](./geo-overview.md)
- [Topic Intelligence Page](./topic-intelligence.md)
- [Question Explorer Page](./question-explorer.md)
- [Suggestions & Actions Page](./suggestions-actions.md)

