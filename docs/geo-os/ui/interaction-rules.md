# UI Interaction Rules

## Introduction

UI Interaction Rules define what users can and cannot do in the UI, ensuring that interactions never trigger agent execution, bypass governance, or imply autonomous decision-making. These rules preserve human accountability and system safety.

## Core Principles

### Principle 1: UI Expresses Intent, Not Execution
- UI interactions express user intent to view, acknowledge, or review
- UI interactions do NOT trigger execution
- UI interactions do NOT modify agent state
- UI interactions do NOT change system behavior

### Principle 2: Read-Only by Default
- All agent outputs are read-only by default
- No editing of agent outputs
- No modification of computed metrics
- No adjustment of recommendations

### Principle 3: Navigation Only
- UI interactions enable navigation between pages
- UI interactions enable drill-down into details
- UI interactions enable exploration of data
- UI interactions do NOT trigger new analysis

### Principle 4: Explicit Gating
- Any future execution must be explicitly gated elsewhere
- Execution is outside UI scope
- UI shows what to do, not how to do it
- Execution handoff is separate from UI

## Interaction Types

### View
- **Definition**: Display information only, no user action required
- **Allowed Actions**: 
  - Scroll to view content
  - Expand/collapse sections
  - Navigate to related pages
- **Forbidden Actions**:
  - Edit content
  - Trigger computation
  - Execute actions

### Acknowledge
- **Definition**: User confirms awareness of information
- **Allowed Actions**:
  - Mark warning as acknowledged
  - Confirm receipt of information
  - Dismiss non-critical alerts
- **Forbidden Actions**:
  - Modify the information
  - Skip required acknowledgments
  - Auto-acknowledge

### Review
- **Definition**: User reviews information for decision-making
- **Allowed Actions**:
  - View detailed information
  - Navigate to related data
  - Export for external review
- **Forbidden Actions**:
  - Execute from review
  - Auto-approve
  - Skip review

### Propose
- **Definition**: User proposes action (future capability, not yet implemented)
- **Allowed Actions**:
  - Create proposal for external execution
  - Document intent
  - Request approval
- **Forbidden Actions**:
  - Execute proposal directly
  - Auto-approve proposals
  - Bypass approval

## Agent Safety Mapping

### UI Interactions Never Call Agents
- **Rule**: No UI interaction directly calls any agent
- **Rationale**: Agents are triggered through separate analysis request process
- **Enforcement**: UI layer has no agent API access
- **Exception**: None

### UI Interactions Never Change Agent State
- **Rule**: No UI interaction modifies agent state or configuration
- **Rationale**: Agent state is managed separately, not through UI
- **Enforcement**: UI has read-only access to agent outputs
- **Exception**: None

### UI Interactions Never Modify Autopilot Capabilities
- **Rule**: No UI interaction changes Autopilot capability levels
- **Rationale**: Autopilot capabilities are governance-controlled
- **Enforcement**: UI has no Autopilot configuration access
- **Exception**: None

### UI Interactions Never Bypass Governance
- **Rule**: No UI interaction bypasses Governance validation
- **Rationale**: Governance ensures system safety
- **Enforcement**: UI cannot trigger actions that require governance
- **Exception**: None

## Interaction Safety Guarantees

### Guarantee 1: No Execution Triggers
- UI interactions never trigger execution
- No buttons that execute actions
- No automatic execution on interaction
- Execution is always external to UI

### Guarantee 2: No State Modification
- UI interactions never modify agent outputs
- UI interactions never modify computed metrics
- UI interactions never modify recommendations
- All data is read-only

### Guarantee 3: No Background Actions
- UI interactions are synchronous and visible
- No hidden background processes
- No automatic data fetching
- All actions are user-initiated and visible

### Guarantee 4: No Optimistic UI
- UI never implies action has happened
- No "Applying..." or "Executing..." states
- No success messages for non-executed actions
- UI only shows what agents have computed

## Page-Specific Rules

### GEO Overview Page
- **Allowed**: View metrics, navigate to topics, acknowledge warnings
- **Forbidden**: Edit scores, trigger analysis, execute recommendations

### Topic Intelligence Page
- **Allowed**: View topic metrics, navigate to questions, review gaps
- **Forbidden**: Edit metrics, mark gaps resolved, generate questions

### Question Explorer Page
- **Allowed**: View questions and answers, navigate to related questions
- **Forbidden**: Edit answers, modify mentions, regenerate questions

### Suggestions & Actions Page
- **Allowed**: Review recommendations, view action plans, acknowledge warnings
- **Forbidden**: Execute recommendations, edit priorities, modify action plans

## Copy Constraints

### Required Wording
- Use "View" for display actions
- Use "Review" for decision-making contexts
- Use "Acknowledge" for confirmations
- Use "Generated by [Agent]" for attribution

### Forbidden Phrases
- "Execute" / "Run" / "Apply" / "Auto-fix"
- "Trigger" / "Activate" / "Enable"
- "Modify" / "Edit" / "Change" (for agent outputs)
- "Save" / "Update" (for agent outputs)
- "Complete" / "Finish" (implying execution)

### Safe Alternatives
- Instead of "Execute": "Review recommendation"
- Instead of "Apply": "Consider this recommendation"
- Instead of "Run": "View analysis"
- Instead of "Auto-fix": "Review suggested fix"

## Future Execution Gating

### Execution is Outside UI Scope
- UI shows recommendations
- Execution happens in external systems
- UI does not integrate with execution systems
- Handoff is manual and explicit

### If Execution is Added Later
- Execution must be explicitly gated
- Execution requires separate approval process
- Execution is logged and audited
- UI remains read-only for agent outputs

## Documentation

- [Interaction Matrix](./interaction-matrix.md)
- [Forbidden UI Patterns](./forbidden-ui-patterns.md)

