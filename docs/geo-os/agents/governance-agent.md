# Governance Agent

## Agent Definition

**Name**: Governance Agent  
**Purpose**: The Governance Agent ensures all operations and recommendations comply with policies, constraints, and ethical boundaries. It acts as a lightweight policy enforcer and validator.

## Core Responsibilities

- **Policy Validation**: Validates that questions, topics, and brands are within acceptable scope
- **Constraint Enforcement**: Ensures recommendations comply with brand guidelines and constraints
- **Ethical Boundaries**: Validates that analysis and recommendations respect ethical boundaries
- **Scope Management**: Defines what can and cannot be analyzed
- **Recommendation Review**: Reviews recommendations for policy compliance before execution
- **Risk Flagging**: Flags potential risks or policy violations
- **Audit Trail**: Maintains records of policy validations and constraints applied

## Inputs

- **Analysis Requests**: Requests to analyze specific topics, brands, or regions
- **Recommendations**: Recommendations from Strategy Agent
- **Policy Definitions**: Brand policies, constraints, and ethical guidelines
- **Scope Definitions**: What topics, brands, and regions are in scope
- **Brand Guidelines**: Brand-specific guidelines and constraints

## Outputs

- **Policy Validations**: Approval or rejection of analysis requests
- **Constraint Warnings**: Warnings when recommendations approach boundaries
- **Compliance Reports**: Reports on policy compliance across operations
- **Validated Recommendations**: Recommendations that pass policy checks
- **Risk Flags**: Flags for potential policy violations or risks
- **Audit Logs**: Records of all policy validations and decisions

## Explicit Non-Responsibilities

- **Does NOT collect data**: Data collection is handled by Observation Agent
- **Does NOT compute scores**: Score computation is handled by Intelligence Agent
- **Does NOT identify gaps**: Gap identification is handled by Reasoning Agent
- **Does NOT generate recommendations**: Recommendation generation is handled by Strategy Agent
- **Does NOT execute actions**: Action execution is outside agent scope
- **Does NOT perform analysis**: Analysis is handled by other agents

## Relationship to Other Agents

### Upstream Dependencies
- **Strategy Agent**: Receives recommendations for validation
- **Observation Agent**: May receive analysis requests for validation

### Downstream Consumers
- **All Agents**: All agents respect policy constraints from Governance Agent
- **Observation Agent**: Receives validated scope and constraints
- **Strategy Agent**: Receives validated recommendations for execution handoff

### Data Flow
```
Analysis Request / Recommendation
         ↓
Governance Agent (validation)
         ↓
Policy Constraints / Validated Output
         ↓
Other Agents (compliance)
```

## Example Question This Agent Answers

**"Are we operating within acceptable boundaries?"**

The Governance Agent answers this by:
1. Validating that requested topics are within scope
2. Checking that brand tracking complies with policies
3. Ensuring recommendations align with brand guidelines
4. Flagging any potential ethical or policy violations
5. Providing approval or rejection with reasons

## Example Output (Mocked)

```json
{
  "policyValidation": {
    "requestId": "req-123",
    "status": "approved",
    "scope": {
      "topics": ["topic-1", "topic-2", "topic-3"],
      "brands": ["brand-1", "brand-2", "brand-3"],
      "regions": ["US", "UK"]
    },
    "constraints": {
      "maxQuestionsPerTopic": 100,
      "allowedRegions": ["US", "UK", "CA"],
      "competitorTracking": true
    }
  },
  "recommendationValidation": [
    {
      "recommendationId": "rec-1",
      "status": "approved",
      "constraints": [],
      "warnings": []
    },
    {
      "recommendationId": "rec-2",
      "status": "approved_with_warnings",
      "constraints": [],
      "warnings": [
        "Recommendation may require brand guideline review for content tone"
      ]
    },
    {
      "recommendationId": "rec-3",
      "status": "rejected",
      "constraints": [
        "Topic expansion to 'topic-4' is outside approved scope"
      ],
      "warnings": []
    }
  ],
  "riskFlags": [
    {
      "type": "scope_violation",
      "severity": "medium",
      "description": "Requested analysis includes topic outside approved scope",
      "recommendation": "Review and update scope policy"
    }
  ],
  "complianceReport": {
    "totalRequests": 50,
    "approved": 48,
    "rejected": 2,
    "warnings": 5,
    "complianceRate": 0.96
  }
}
```

## Policy Types

### Scope Policies
- **Topic Scope**: Which topics can be analyzed
- **Brand Scope**: Which brands can be tracked (primary + competitors)
- **Regional Scope**: Which geographic regions are allowed
- **Question Limits**: Maximum questions per topic/region

### Brand Guidelines
- **Content Guidelines**: Tone, style, messaging constraints
- **Competitive Guidelines**: Rules for competitor tracking and comparison
- **Ethical Boundaries**: What analysis and recommendations are ethically acceptable

### Operational Constraints
- **Rate Limits**: Maximum analysis frequency
- **Data Retention**: How long data can be stored
- **Access Controls**: Who can request analysis and view results

## Validation Rules

### Analysis Request Validation
1. Topics must be in approved scope
2. Brands must be in approved tracking list
3. Regions must be in approved regional scope
4. Question count must not exceed limits
5. Request must comply with rate limits

### Recommendation Validation
1. Recommendations must align with brand guidelines
2. Content recommendations must respect tone and style constraints
3. Topic expansions must be within approved scope
4. Structural changes must comply with technical policies
5. No recommendations that violate ethical boundaries

## Operational Notes

- The Governance Agent is lightweight and focused on validation
- Policies are defined externally and consumed by the agent
- The agent does not create policies; it enforces them
- All validations are logged for audit purposes
- The agent can flag risks without blocking operations (warnings vs. rejections)

## Future Autopilot Considerations

When Autopilot mode is implemented, the Governance Agent will:
- Automatically validate all analysis requests
- Auto-approve routine operations within policy
- Escalate policy violations for human review
- Maintain continuous compliance monitoring

