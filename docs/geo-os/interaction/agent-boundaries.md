# Agent Interaction Boundaries

## Interaction Matrix

### Allowed Interactions

| From Agent | To Agent | Output Type | Trigger Condition |
|------------|----------|-------------|-------------------|
| External | Governance | Analysis Request | User/system request |
| Governance | Observation | Validated Scope | Request approved |
| Observation | Intelligence | AI Answer Snapshots | Data collection complete |
| Intelligence | Reasoning | GEO Scores | Metrics computed |
| Reasoning | Strategy | Gaps + Opportunities | Gap analysis complete |
| Strategy | Governance | Recommendations | Recommendations generated |
| Governance | External | Validated Recommendations | Final validation complete |

### Forbidden Interactions

| From Agent | To Agent | Reason |
|------------|----------|--------|
| Observation | Reasoning | Must go through Intelligence |
| Observation | Strategy | Must go through Intelligence + Reasoning |
| Intelligence | Strategy | Must go through Reasoning |
| Intelligence | Governance | Must go through Reasoning + Strategy |
| Reasoning | Governance | Must go through Strategy |
| Reasoning | Observation | Circular dependency |
| Strategy | Intelligence | Reverse flow not allowed |
| Strategy | Observation | Reverse flow not allowed |
| Strategy | Question Generation | **Guardrail 3: Question generation responsibility lock** |
| Any Agent | Any Agent (skip) | No agent skipping allowed |

## Agent Interaction Specifications

### Governance Agent

#### Trigger Condition
- **Entry**: Receives Analysis Request from external source
- **Exit Checkpoint**: Receives Recommendations from Strategy Agent

#### Inputs
- **From External**: Analysis Request `{ topics, brands, regions, timeRange? }`
- **From Strategy**: Recommendations `{ recommendations: [] }`

#### Outputs
- **To Observation**: Validated Scope `{ validatedScope, constraints, warnings? }`
- **To External**: Validated Recommendations `{ recommendations, warnings?, status }`

#### Allowed Next Agents
- **After Request Validation**: Observation Agent (if approved)
- **After Recommendation Validation**: External (exit)

#### Forbidden Interactions
- Cannot skip to Intelligence, Reasoning, or Strategy
- Cannot receive inputs from Observation, Intelligence, Reasoning
- Cannot output directly to Intelligence, Reasoning, Strategy

### Observation Agent

#### Trigger Condition
- Receives Validated Scope from Governance Agent

#### Inputs
- **From Governance**: Validated Scope + Constraints

#### Outputs
- **To Intelligence**: AI Answer Snapshots + Brand Mentions

#### Allowed Next Agents
- **After Data Collection**: Intelligence Agent (only)

#### Forbidden Interactions
- Cannot skip to Reasoning or Strategy
- Cannot output to Governance, Reasoning, or Strategy
- Cannot receive inputs from Intelligence, Reasoning, or Strategy
- Cannot output back to Governance
- **Cannot receive question generation requests from Strategy** (Guardrail 3)

### Intelligence Agent

#### Trigger Condition
- Receives AI Answer Snapshots from Observation Agent

#### Inputs
- **From Observation**: AI Answer Snapshots + Brand Mentions

#### Outputs
- **To Reasoning**: GEO Scores + Aggregations
- **To Strategy** (read-only context only): GEO Scores for reference

#### Allowed Next Agents
- **After Metrics Computation**: Reasoning Agent (primary)
- **Context Access**: Strategy Agent (read-only, non-decisive)

#### Explicit Constraints

**Guardrail 2: Strategy ↔ Intelligence Context Boundary**

- Intelligence Agent outputs to Strategy Agent are **read-only context only**
- Strategy Agent **MUST NOT** derive priorities, rankings, or decisions from Intelligence outputs
- Strategy Agent may use Intelligence metrics for:
  - Impact estimation
  - Timeline planning
  - Contextual reference
- Strategy Agent **MUST NOT** use Intelligence metrics for:
  - Prioritization (must come from Reasoning Agent)
  - Ranking (must come from Reasoning Agent)
  - Decision-making (must come from Reasoning Agent)

#### Forbidden Interactions
- Cannot skip to Strategy (must go through Reasoning)
- Cannot output to Governance, Observation, or External
- Cannot receive inputs from Reasoning, Strategy, or Governance
- Cannot output back to Observation
- **Cannot provide decisive inputs to Strategy** (only read-only context)

### Reasoning Agent

#### Trigger Condition
- Receives GEO Scores from Intelligence Agent

#### Inputs
- **From Intelligence**: GEO Scores + Aggregations

#### Outputs
- **To Strategy**: Gaps + Opportunities + Patterns (with priorities)

#### Allowed Next Agents
- **After Gap Analysis**: Strategy Agent (only)

#### Forbidden Interactions
- Cannot skip to Governance
- Cannot output to Governance, Observation, Intelligence, or External
- Cannot receive inputs from Strategy, Observation, or Governance
- Cannot output back to Intelligence

### Strategy Agent

#### Trigger Condition
- Receives Gaps + Opportunities from Reasoning Agent

#### Inputs
- **From Reasoning**: Gaps + Opportunities + Patterns (with priorities) - **PRIMARY INPUT**
- **From Intelligence** (optional): GEO Scores for read-only context only

#### Outputs
- **To Governance**: Recommendations + Action Plans

#### Explicit Constraints

**Guardrail 2: Strategy ↔ Intelligence Context Boundary**

- Strategy Agent receives Intelligence outputs **ONLY as read-only context**
- Strategy Agent **MUST NOT** derive priorities, rankings, or decisions directly from raw metrics
- All prioritization logic **MUST** come from Reasoning Agent's gap analysis and opportunity mapping
- Intelligence metrics are **non-decisive references** for Strategy Agent

**Guardrail 3: Question Generation Responsibility Lock**

- Question generation and sampling belong **exclusively** to Observation Agent
- Strategy Agent **MUST NOT** influence, expand, or optimize question selection
- **No feedback loop** from Strategy → Question generation is allowed
- Strategy Agent outputs recommendations that may reference topics, but **MUST NOT** suggest new questions to sample
- If question expansion is needed, it must come from a new Analysis Request, not from Strategy feedback

#### Allowed Next Agents
- **After Recommendation Generation**: Governance Agent (only)

#### Forbidden Interactions
- Cannot skip to External
- Cannot output to Observation, Intelligence, Reasoning, or External
- Cannot receive inputs from Governance or Observation
- Cannot receive decisive inputs from Intelligence (only read-only context)
- **Cannot influence question generation** (Guardrail 3)
- **Cannot make decisions based on Intelligence metrics** (Guardrail 2)

## Interaction Rules Summary

### Rule 1: Sequential Processing
- Agents must process in order: Governance → Observation → Intelligence → Reasoning → Strategy → Governance
- No parallel processing within a single flow
- Each agent completes before next begins

### Rule 2: No Agent Skipping
- Observation cannot skip to Reasoning (must go through Intelligence)
- Intelligence cannot skip to Strategy (must go through Reasoning)
- No agent can skip any other agent

### Rule 3: No Reverse Flow
- Agents cannot send outputs back to upstream agents
- No circular dependencies
- Flow is unidirectional: forward only

### Rule 4: Single Output Path
- Each agent has exactly one allowed next agent (except Governance at exit)
- No branching or multiple output paths
- Deterministic flow path

### Rule 5: Governance Checkpoints
- Governance validates at entry (Checkpoint 1)
- Governance validates at exit (Checkpoint 2)
- No other agent performs validation

### Rule 6: Context Boundary (Guardrail 2)
- Intelligence → Strategy: Read-only context only
- Strategy prioritization must come from Reasoning Agent
- Intelligence metrics are non-decisive

### Rule 7: Question Generation Lock (Guardrail 3)
- Question generation belongs exclusively to Observation Agent
- No Strategy → Question Generation feedback loop
- Question expansion requires new Analysis Request

## Data Contract Enforcement

### Input Validation
- Each agent validates its inputs before processing
- Invalid inputs cause flow to stop
- Error returned to requester

### Output Guarantees
- Each agent guarantees output schema compliance
- Outputs are always valid for downstream agent
- No partial or incomplete outputs

### Schema Contracts
- Each interaction has defined input/output schema
- Schemas are versioned
- Schema mismatches cause flow to stop

### Context vs. Decision Inputs
- **Decision Inputs**: Used for prioritization, ranking, decision-making (e.g., Reasoning → Strategy)
- **Context Inputs**: Read-only reference, non-decisive (e.g., Intelligence → Strategy)
- Agents must distinguish between decision inputs and context inputs
- Context inputs cannot override decision inputs

## Error Propagation

### Error Handling Rules
1. **Agent Error**: Flow stops, error returned to requester
2. **Validation Error**: Flow stops at checkpoint, error returned
3. **Data Error**: Flow stops, error returned with data details
4. **Timeout**: Flow stops, timeout error returned
5. **Retry Limit Exceeded**: Flow stops, requires human intervention (Guardrail 1)

### Error Format
```json
{
  "error": true,
  "requestId": "req-123",
  "agent": "Intelligence Agent",
  "errorType": "processing_error",
  "message": "Failed to compute GEO Score",
  "details": {...},
  "retryCount": 0
}
```

## Future Autopilot Safety Notes

### Guardrail 1: Rejection Retry Hard Stop
When Autopilot mode is implemented, the retry limit must be enforced at the orchestration layer. The system must not attempt to self-correct indefinitely. After the retry limit is exceeded, the flow must terminate and require explicit human intervention.

### Guardrail 2: Strategy ↔ Intelligence Context Boundary
When Autopilot is implemented, Strategy Agent must not bypass Reasoning Agent's analysis by making direct decisions from Intelligence metrics. The separation of concerns must be maintained: Intelligence computes, Reasoning analyzes, Strategy plans. Any attempt by Strategy Agent to use Intelligence outputs for prioritization must be prevented.

### Guardrail 3: Question Generation Responsibility Lock
When Autopilot is implemented, this lock prevents Strategy Agent from creating feedback loops that could lead to uncontrolled question expansion. Question generation must remain a controlled, governance-validated process, not an agent-driven expansion. Any future Question-related agent must remain upstream of Observation and downstream of Governance only.

## Interaction Boundaries Diagram

```
┌─────────────┐
│  EXTERNAL   │
└──────┬──────┘
       │ Analysis Request
       ↓
┌─────────────┐
│ GOVERNANCE │ ← Checkpoint 1
└──────┬──────┘
       │ Validated Scope
       ↓
┌─────────────┐
│ OBSERVATION │ ← Question Generation (exclusive)
└──────┬──────┘
       │ AI Answers
       ↓
┌─────────────┐
│INTELLIGENCE │
└──────┬──────┘
       │ GEO Scores (primary)
       │ GEO Scores (context) ───┐
       ↓                          │
┌─────────────┐                  │
│  REASONING  │                  │
└──────┬──────┘                  │
       │ Gaps + Priorities        │
       ↓                          │
┌─────────────┐                  │
│  STRATEGY   │ ←────────────────┘ (read-only context)
└──────┬──────┘
       │ Recommendations
       ↓
┌─────────────┐
│ GOVERNANCE │ ← Checkpoint 2 (retry limited)
└──────┬──────┘
       │ Validated Recommendations
       ↓
┌─────────────┐
│  EXTERNAL   │
└─────────────┘

Allowed: → (forward only)
Forbidden: ← (reverse), ↕ (skip), ↻ (circular)
Context: ─── (read-only, non-decisive)
Lock: ⛔ (Strategy → Question Generation)
```

## Summary

- **5 Agents**: Governance, Observation, Intelligence, Reasoning, Strategy
- **7 Allowed Interactions**: Sequential forward flow
- **9+ Forbidden Interactions**: No skipping, no reverse, no circular
- **2 Checkpoints**: Entry and exit validation
- **1 Entry Point**: Analysis Request
- **1 Exit Point**: Validated Recommendations
- **3 Semantic Guardrails**: Retry limits, context boundaries, responsibility locks

