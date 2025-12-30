# Agent Interaction Flow - Overview

## Introduction

The Agentic GEO OS uses a deterministic, pull-based interaction flow where agents communicate through explicit handoffs. All flows begin with an Analysis Request and proceed through a canonical sequence with validation checkpoints.

## Design Principles

### 1. Explicit Entry Point
- All flows start from an **Analysis Request**
- No agent activates spontaneously
- Every interaction is traceable to an initial request

### 2. Sequential Processing
- Agents process in a fixed sequence: Governance → Observation → Intelligence → Reasoning → Strategy → Governance
- No agent may skip another agent in the sequence
- Each agent must complete before the next begins

### 3. Pull-Based Communication
- Downstream agents pull outputs from upstream agents
- Agents do not push data; they produce outputs that are consumed
- No event-driven or reactive patterns

### 4. Governance Validation
- Governance Agent validates but does not decide analysis scope
- Governance provides constraints, not directives
- Validation checkpoints occur at entry and exit

### 5. No Automatic Execution
- No agent executes actions automatically
- Recommendations are outputs, not commands
- Execution handoff is outside agent scope

## Canonical Interaction Sequence

### Phase 1: Request Validation
1. **Analysis Request** arrives
2. **Governance Agent** validates scope, topics, brands, regions
3. **Governance Agent** outputs validated scope + constraints

### Phase 2: Data Collection
4. **Observation Agent** receives validated scope
5. **Observation Agent** samples questions and captures AI answers
6. **Observation Agent** outputs AI Answer Snapshots + Brand Mentions

### Phase 3: Metrics Computation
7. **Intelligence Agent** receives raw observations
8. **Intelligence Agent** computes GEO Scores and aggregates
9. **Intelligence Agent** outputs GEO Scores + Aggregations

### Phase 4: Gap Analysis
10. **Reasoning Agent** receives GEO Scores
11. **Reasoning Agent** identifies gaps and opportunities
12. **Reasoning Agent** outputs Gaps + Opportunities + Patterns

### Phase 5: Recommendation Generation
13. **Strategy Agent** receives gaps and opportunities
14. **Strategy Agent** generates prioritized recommendations
15. **Strategy Agent** outputs Recommendations + Action Plans

### Phase 6: Final Validation
16. **Governance Agent** receives recommendations
17. **Governance Agent** validates against policies
18. **Governance Agent** outputs Validated Recommendations

## Entry and Exit Points

### Entry Point
- **Analysis Request**: External request to analyze topics/brands/regions
- Format: `{ topics: [], brands: [], regions: [], timeRange?: {} }`
- Always enters through Governance Agent

### Exit Point
- **Validated Recommendations**: Final output ready for execution handoff
- Format: `{ recommendations: [], validated: true, warnings: [] }`
- Always exits from Governance Agent

## Validation Checkpoints

### Checkpoint 1: Analysis Request Validation
- **Location**: After Analysis Request, before Observation
- **Agent**: Governance Agent
- **Validates**: Scope, topics, brands, regions, limits
- **Outcome**: Approved → Continue | Rejected → Stop with reason

### Checkpoint 2: Recommendation Validation
- **Location**: After Strategy Agent, before exit
- **Agent**: Governance Agent
- **Validates**: Policy compliance, brand guidelines, ethical boundaries
- **Outcome**: Approved → Exit | Approved with Warnings → Exit with warnings | Rejected → Return to Strategy

## Semantic Guardrails

### Guardrail 1: Rejection Retry Hard Stop

**Purpose**: Prevent infinite retry loops when recommendations are rejected.

**Constraint**: 
- Recommendation rejections from Governance Agent may only be retried a **limited number of times** (conceptually defined, not yet implemented)
- After exceeding the retry limit, the flow **MUST terminate** immediately
- Further continuation requires **explicit human intervention**
- The system **MUST NOT** self-correct indefinitely or attempt automatic remediation beyond the retry limit

**Application**:
- Applies to Checkpoint 2 (Recommendation Validation)
- When Strategy Agent receives rejection, it may revise and resubmit
- Maximum retry attempts are bounded (conceptually: 1-3 attempts)
- After limit exceeded: flow stops, error returned, human review required

**Future Autopilot Safety Note**: When Autopilot mode is implemented, this guardrail prevents the system from entering infinite correction loops. The retry limit must be enforced at the orchestration layer, not within individual agents.

### Guardrail 2: Strategy ↔ Intelligence Context Boundary

**Purpose**: Prevent Strategy Agent from making decisions based on raw metrics, ensuring all prioritization comes from Reasoning Agent.

**Constraint**:
- Strategy Agent may access Intelligence Agent outputs **ONLY as read-only context**
- Strategy Agent **MUST NOT** derive priorities, rankings, or decisions directly from raw metrics
- All prioritization logic **MUST** come from the Reasoning Agent's gap analysis and opportunity mapping
- Intelligence metrics are **non-decisive references** for Strategy Agent (e.g., for impact estimation, not for prioritization)

**Application**:
- Strategy Agent receives GEO Scores from Intelligence Agent for context only
- Strategy Agent uses Reasoning Agent's prioritized gaps and opportunities for decision-making
- Strategy Agent may reference Intelligence metrics for impact estimation or timeline planning
- Strategy Agent **MUST NOT** re-rank or re-prioritize based on Intelligence outputs

**Future Autopilot Safety Note**: This boundary ensures that when Autopilot is implemented, Strategy Agent cannot bypass Reasoning Agent's analysis by making direct decisions from metrics. The separation of concerns is maintained: Intelligence computes, Reasoning analyzes, Strategy plans.

### Guardrail 3: Question Generation Responsibility Lock

**Purpose**: Prevent Strategy Agent from influencing question generation, maintaining clear responsibility boundaries.

**Constraint**:
- Question generation and sampling belong **exclusively** to the Observation Agent
- Strategy Agent **MUST NOT** influence, expand, or optimize question selection
- **No feedback loop** from Strategy → Question generation is allowed
- Any future Question-related agent must remain **upstream of Observation** and **downstream of Governance only**

**Application**:
- Observation Agent owns all question sampling logic
- Strategy Agent outputs recommendations that may reference topics, but **MUST NOT** suggest new questions to sample
- Strategy Agent **MUST NOT** request additional question sampling based on gaps
- If question expansion is needed, it must come from a new Analysis Request, not from Strategy feedback

**Future Autopilot Safety Note**: This lock prevents Strategy Agent from creating feedback loops that could lead to uncontrolled question expansion. When Autopilot is implemented, this ensures that question generation remains a controlled, governance-validated process, not an agent-driven expansion.

## Flow Characteristics

### Deterministic
- Same inputs always produce same outputs
- No randomness or non-deterministic behavior
- All decisions are rule-based

### Synchronous
- Agents process sequentially
- No parallel processing within a single flow
- Each agent waits for upstream completion

### Traceable
- Every output is linked to its input
- Full audit trail of agent interactions
- Request ID tracks entire flow

### Idempotent
- Re-running same request produces same results
- No side effects from repeated execution
- Safe to retry failed flows (within retry limits)

## Error Handling

### Validation Failures
- **Scope Rejection**: Flow stops, returns rejection reason
- **Policy Violation**: Flow stops, returns violation details
- **Constraint Warning**: Flow continues with warnings attached

### Processing Failures
- **Agent Error**: Flow stops, returns error details
- **Data Inconsistency**: Flow stops, returns inconsistency report
- **Timeout**: Flow stops, returns timeout notification

### Retry Limits
- **Recommendation Rejection**: Limited retries (conceptually 1-3 attempts)
- **After Retry Limit**: Flow terminates, requires human intervention
- **No Infinite Loops**: System cannot self-correct indefinitely

## Interaction Rules

### Allowed Interactions
- Governance → Observation (validated scope)
- Observation → Intelligence (raw data)
- Intelligence → Reasoning (GEO Scores)
- Reasoning → Strategy (gaps + opportunities)
- Strategy → Governance (recommendations)

### Forbidden Interactions
- No direct Observation → Reasoning (must go through Intelligence)
- No direct Intelligence → Strategy (must go through Reasoning)
- No direct Reasoning → Governance (must go through Strategy)
- No circular dependencies
- No agent skipping
- **No Strategy → Question Generation** (Guardrail 3)
- **No Strategy → Intelligence decision-making** (Guardrail 2)

## Data Contracts

Each agent interaction has a well-defined data contract:
- **Input Schema**: What the agent expects
- **Output Schema**: What the agent produces
- **Validation Rules**: What makes data valid
- **Error Formats**: How errors are communicated

## Future Considerations

While not implemented, the interaction flow is designed to support:
- **Parallel Processing**: Multiple topics processed in parallel (future)
- **Caching**: Intermediate results cached for reuse (future)
- **Streaming**: Large datasets processed incrementally (future)
- **Autopilot**: Automatic orchestration of flows (future)

**Note**: All future implementations must respect the semantic guardrails defined above to ensure system safety and prevent misuse.

