# Autopilot Allowed Actions - Explicit Whitelist

## Overview

This document defines the **explicit whitelist** of actions that may be performed autonomously in Autopilot mode. Only actions listed here are permitted. No action is allowed by default.

## Whitelist Principles

1. **Explicit Permission**: Only explicitly listed actions are allowed
2. **Capability Level**: Each action is assigned to a capability level
3. **Governance Validation**: All actions must pass Governance validation
4. **Audit Required**: All actions must be audited

## Level 1: Auto-Observe Actions

### Observation Agent Actions

#### 1. Sample Questions
- **Action**: Generate representative questions for topics
- **Capability Level**: Level 1
- **Inputs**: Validated scope, topic definitions, question templates
- **Outputs**: Question list with metadata
- **Governance Check**: Scope validation, rate limits
- **Audit Requirement**: Log all questions sampled

#### 2. Capture AI Answers
- **Action**: Retrieve AI-generated answers from approved sources
- **Capability Level**: Level 1
- **Inputs**: Question list, approved sources
- **Outputs**: AI Answer Snapshots
- **Governance Check**: Source validation, rate limits
- **Audit Requirement**: Log all answers captured

#### 3. Detect Brand Mentions
- **Action**: Identify brand mentions in AI answers
- **Capability Level**: Level 1
- **Inputs**: AI Answer Snapshots, brand lists
- **Outputs**: Brand Mention Records
- **Governance Check**: Brand list validation
- **Audit Requirement**: Log all mentions detected

#### 4. Infer Position
- **Action**: Determine relative ordering of brand mentions
- **Capability Level**: Level 1
- **Inputs**: Brand Mention Records
- **Outputs**: Position data
- **Governance Check**: Position calculation validation
- **Audit Requirement**: Log all positions inferred

#### 5. Tag Sentiment
- **Action**: Classify sentiment context (positive/neutral/negative)
- **Capability Level**: Level 1
- **Inputs**: Brand Mention Records, context text
- **Outputs**: Sentiment classifications
- **Governance Check**: Sentiment rules validation
- **Audit Requirement**: Log all sentiment tags

### Intelligence Agent Actions

#### 6. Compute GEO Scores
- **Action**: Calculate composite GEO Scores from visibility and sentiment
- **Capability Level**: Level 1
- **Inputs**: Brand Mention Records, position data, sentiment data
- **Outputs**: GEO Scores
- **Governance Check**: Score calculation validation
- **Audit Requirement**: Log all scores computed

#### 7. Aggregate Metrics
- **Action**: Aggregate performance metrics by topic, brand, region
- **Capability Level**: Level 1
- **Inputs**: GEO Scores, aggregation parameters
- **Outputs**: Aggregated metrics
- **Governance Check**: Aggregation rules validation
- **Audit Requirement**: Log all aggregations

#### 8. Compare Brands
- **Action**: Rank brands within topics based on GEO Scores
- **Capability Level**: Level 1
- **Inputs**: GEO Scores, brand definitions
- **Outputs**: Brand comparisons
- **Governance Check**: Comparison rules validation
- **Audit Requirement**: Log all comparisons

#### 9. Track Historical Trends
- **Action**: Maintain time-series snapshots of performance
- **Capability Level**: Level 1
- **Inputs**: GEO Scores, historical data
- **Outputs**: Historical trends
- **Governance Check**: Data retention policy compliance
- **Audit Requirement**: Log all trend calculations

## Level 2: Auto-Reason Actions

### Reasoning Agent Actions

#### 10. Identify Visibility Gaps
- **Action**: Detect topics/questions where visibility is below threshold
- **Capability Level**: Level 2
- **Inputs**: GEO Scores, thresholds
- **Outputs**: Visibility gaps list
- **Governance Check**: Threshold validation, policy compliance
- **Audit Requirement**: Log all gaps identified

#### 11. Detect Sentiment Risks
- **Action**: Identify topics/questions with negative sentiment patterns
- **Capability Level**: Level 2
- **Inputs**: GEO Scores, sentiment data
- **Outputs**: Sentiment risks list
- **Governance Check**: Risk threshold validation
- **Audit Requirement**: Log all risks detected

#### 12. Recognize Patterns
- **Action**: Identify trends across questions, topics, regions, time
- **Capability Level**: Level 2
- **Inputs**: GEO Scores, aggregated metrics, historical data
- **Outputs**: Pattern insights
- **Governance Check**: Pattern recognition rules validation
- **Audit Requirement**: Log all patterns recognized

#### 13. Analyze Root Causes
- **Action**: Understand why gaps exist
- **Capability Level**: Level 2
- **Inputs**: Gaps, patterns, context
- **Outputs**: Root cause analyses
- **Governance Check**: Analysis framework validation
- **Audit Requirement**: Log all root cause analyses

#### 14. Map Opportunities
- **Action**: Link topics to content opportunities
- **Capability Level**: Level 2
- **Inputs**: Gaps, patterns, root causes
- **Outputs**: Opportunity map
- **Governance Check**: Opportunity mapping rules validation
- **Audit Requirement**: Log all opportunities mapped

### Strategy Agent Actions

#### 15. Generate Recommendations
- **Action**: Create specific recommendations from gaps and opportunities
- **Capability Level**: Level 2
- **Inputs**: Gaps, opportunities, patterns
- **Outputs**: Recommendations list
- **Governance Check**: Recommendation template validation, policy compliance
- **Audit Requirement**: Log all recommendations generated

#### 16. Prioritize Actions
- **Action**: Rank recommendations by expected impact and feasibility
- **Capability Level**: Level 2
- **Inputs**: Recommendations, impact estimates
- **Outputs**: Prioritized recommendations
- **Governance Check**: Prioritization logic validation
- **Audit Requirement**: Log all prioritizations

#### 17. Estimate Impact
- **Action**: Predict expected improvement from recommendations
- **Capability Level**: Level 2
- **Inputs**: Recommendations, historical patterns
- **Outputs**: Impact estimates
- **Governance Check**: Impact model validation
- **Audit Requirement**: Log all impact estimates

#### 18. Create Action Plans
- **Action**: Break down recommendations into executable steps
- **Capability Level**: Level 2
- **Inputs**: Recommendations
- **Outputs**: Action plans
- **Governance Check**: Action plan template validation
- **Audit Requirement**: Log all action plans created

## Whitelist Summary

### Level 1 Actions (9 total)
- Question Sampling
- AI Answer Capture
- Brand Mention Detection
- Position Inference
- Sentiment Tagging
- GEO Score Computation
- Metric Aggregation
- Brand Comparison
- Historical Trend Tracking

### Level 2 Actions (9 total)
- Visibility Gap Identification
- Sentiment Risk Detection
- Pattern Recognition
- Root Cause Analysis
- Opportunity Mapping
- Recommendation Generation
- Action Prioritization
- Impact Estimation
- Action Plan Creation

### Total Allowed Actions: 18

## Action Dependencies

### Level 1 Dependencies
- All Level 1 actions depend on validated scope from Governance
- Observation actions must precede Intelligence actions
- Intelligence actions depend on Observation outputs

### Level 2 Dependencies
- All Level 2 actions depend on Level 1 outputs
- Reasoning actions depend on Intelligence outputs
- Strategy actions depend on Reasoning outputs

## Governance Validation Requirements

### Pre-Action Validation
- **Capability Level Check**: Action must be within allowed capability level
- **Scope Validation**: Action must be within validated scope
- **Policy Compliance**: Action must comply with all policies
- **Rate Limit Check**: Action must comply with rate limits

### Post-Action Validation
- **Output Validation**: Outputs must meet schema requirements
- **Audit Logging**: Action must be logged
- **Error Handling**: Errors must be handled appropriately

## Audit Requirements

### Required Audit Fields
- **Action ID**: Unique identifier for the action
- **Agent**: Which agent performed the action
- **Capability Level**: Level of the action
- **Timestamp**: When the action was performed
- **Inputs**: What inputs were used
- **Outputs**: What outputs were produced
- **Governance Status**: Whether governance validation passed
- **Warnings**: Any warnings generated
- **Errors**: Any errors encountered

## Whitelist Modification

### Modification Rules
- Whitelist modifications are **Level 3** actions (Human-Required)
- Modifications require explicit human approval
- Modifications must be documented and audited
- Modifications must comply with all policies

