# Governance Checkpoints

## Overview

The Governance Agent provides two validation checkpoints in the interaction flow:
1. **Checkpoint 1**: Analysis Request Validation (entry)
2. **Checkpoint 2**: Recommendation Validation (exit)

## Checkpoint 1: Analysis Request Validation

### Location
- **Position**: Immediately after Analysis Request, before Observation Agent
- **Purpose**: Validate that the requested analysis is within policy boundaries

### Validation Rules

#### Scope Validation
- **Topics**: All requested topics must be in approved topic scope
- **Brands**: All requested brands must be in approved brand tracking list
- **Regions**: All requested regions must be in approved regional scope
- **Time Range**: Time range must be within data retention policy

#### Limit Validation
- **Question Count**: Total questions must not exceed `maxQuestionsPerTopic × topicCount`
- **Rate Limits**: Request must comply with analysis frequency limits
- **Concurrent Limits**: No more than N concurrent analyses

### Validation Outcomes

#### Approved
```json
{
  "status": "approved",
  "requestId": "req-123",
  "validatedScope": {
    "topics": ["topic-1", "topic-2"],
    "brands": ["brand-1", "brand-2"],
    "regions": ["US", "UK"]
  },
  "constraints": {
    "maxQuestionsPerTopic": 100,
    "allowedRegions": ["US", "UK", "CA"]
  },
  "warnings": []
}
```
**Action**: Flow continues to Observation Agent

#### Rejected
```json
{
  "status": "rejected",
  "requestId": "req-123",
  "reason": "Topic 'topic-4' is outside approved scope",
  "violations": [
    {
      "type": "scope_violation",
      "field": "topics",
      "value": "topic-4",
      "message": "Topic not in approved scope"
    }
  ]
}
```
**Action**: Flow stops, returns rejection to requester

### What Happens on Rejection
- Flow terminates immediately
- No agents downstream are activated
- Rejection reason is returned to requester
- Audit log records the rejection

## Checkpoint 2: Recommendation Validation

### Location
- **Position**: After Strategy Agent, before final exit
- **Purpose**: Validate that recommendations comply with policies and guidelines

### Validation Rules

#### Policy Compliance
- **Content Guidelines**: Recommendations must align with brand content guidelines
- **Tone and Style**: Content recommendations must respect tone constraints
- **Topic Scope**: Topic expansions must be within approved scope
- **Technical Policies**: Structural changes must comply with technical policies

#### Ethical Boundaries
- **No Manipulation**: Recommendations must not attempt to manipulate AI systems
- **Transparency**: All recommendations must be transparent and ethical
- **Competitive Fairness**: Competitor analysis must be fair and factual

#### Brand Guidelines
- **Messaging**: Recommendations must align with brand messaging
- **Voice**: Content must match brand voice and style
- **Values**: Recommendations must respect brand values

### Validation Outcomes

#### Approved
```json
{
  "status": "approved",
  "requestId": "req-123",
  "recommendations": [...],
  "warnings": [],
  "validatedAt": "2024-01-15T10:30:00Z"
}
```
**Action**: Flow exits with validated recommendations

#### Approved with Warnings
```json
{
  "status": "approved_with_warnings",
  "requestId": "req-123",
  "recommendations": [...],
  "warnings": [
    {
      "recommendationId": "rec-2",
      "type": "content_tone",
      "message": "Recommendation may require brand guideline review for content tone",
      "severity": "low"
    }
  ],
  "validatedAt": "2024-01-15T10:30:00Z"
}
```
**Action**: Flow exits with recommendations and warnings attached

#### Rejected
```json
{
  "status": "rejected",
  "requestId": "req-123",
  "reason": "Recommendation violates brand guidelines",
  "violations": [
    {
      "recommendationId": "rec-3",
      "type": "scope_violation",
      "message": "Topic expansion to 'topic-4' is outside approved scope"
    }
  ]
}
```
**Action**: Flow returns to Strategy Agent for revision (if supported) or stops

### What Happens on Rejection

#### Option 1: Return to Strategy
- Rejected recommendations are returned to Strategy Agent
- Strategy Agent may revise recommendations
- Revised recommendations go through validation again
- **Retry limit applies** (see Semantic Guardrails below)

#### Option 2: Stop with Error
- Flow terminates
- Rejection reason is returned
- No recommendations are output
- Audit log records the rejection

## Semantic Guardrails

### Guardrail 1: Rejection Retry Hard Stop

**Purpose**: Prevent infinite retry loops when recommendations are repeatedly rejected.

**Explicit Constraint**:
- Recommendation rejections from Checkpoint 2 may only be retried a **limited number of times**
- The retry limit is **conceptually defined** (not yet implemented) as a bounded number (e.g., 1-3 attempts)
- After exceeding the retry limit, the flow **MUST terminate** immediately
- Further continuation requires **explicit human intervention**
- The system **MUST NOT** self-correct indefinitely or attempt automatic remediation beyond the retry limit

**Implementation Note**: This is a conceptual safeguard. When implemented, the retry limit must be enforced at the orchestration layer, not within individual agents. The retry counter must be tracked per request and reset only on explicit human intervention.

**Retry Flow**:
1. Strategy Agent receives rejection from Governance
2. Strategy Agent may revise recommendations (if retry count < limit)
3. Revised recommendations resubmitted to Governance
4. If rejected again: retry count incremented
5. If retry count >= limit: **HARD STOP**, flow terminates, human intervention required

**Future Autopilot Safety Note**: When Autopilot mode is implemented, this guardrail is critical to prevent the system from entering infinite correction loops. The retry limit must be a hard constraint that cannot be bypassed by any agent or automation layer.

## Warning vs Rejection

### Warnings
- **Non-blocking**: Flow continues despite warnings
- **Attached to Output**: Warnings are included in final output
- **Human Review**: Warnings flag items for human review
- **Examples**: Content tone, minor guideline concerns

### Rejections
- **Blocking**: Flow stops or returns on rejection
- **Must Fix**: Rejections must be addressed before proceeding
- **Policy Violation**: Rejections indicate policy violations
- **Retry Limited**: Rejections may be retried, but only within the retry limit (see Guardrail 1)

## Validation Decision Matrix

| Condition | Outcome | Action |
|-----------|---------|--------|
| All validations pass | Approved | Continue/Exit |
| Minor concerns | Approved with Warnings | Continue/Exit with warnings |
| Scope violation | Rejected | Stop/Return |
| Policy violation | Rejected | Stop/Return (retry limited) |
| Ethical violation | Rejected | Stop/Return (retry limited) |
| Rate limit exceeded | Rejected | Stop/Return |
| Retry limit exceeded | Hard Stop | Terminate, human intervention required |

## Audit Trail

All validation decisions are logged:
- Request ID
- Validation timestamp
- Validation outcome
- Warnings or violations
- Validator (Governance Agent)
- Policy version used
- **Retry count** (for Checkpoint 2 rejections)

## Policy Versioning

- Policies are versioned
- Validation uses specific policy version
- Policy changes require version update
- Audit trail includes policy version

