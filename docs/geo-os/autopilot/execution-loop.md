# Autopilot Execution Loop

## Overview

The Autopilot Execution Loop defines the step-by-step process for executing allowed capabilities within defined boundaries. The loop respects capability levels, enforces governance synchronously, and handles failures safely.

## Execution Loop Phases

### Phase 1: Entry Conditions

#### Prerequisites
- **Autopilot Enabled**: Autopilot mode must be enabled
- **Validated Scope**: Scope must be pre-validated by Governance
- **Capability Level Set**: Current capability level must be defined
- **No Active Blockers**: No governance violations or system errors

#### Entry Validation
1. Check Autopilot status (enabled/disabled)
2. Verify validated scope exists
3. Verify capability level is set
4. Check for active blockers
5. If all pass → proceed to Phase 2
6. If any fail → stop, log reason, notify user

---

### Phase 2: Governance Pre-Validation

#### Checkpoint: Pre-Action Validation
- **Location**: Before any agent action
- **Purpose**: Validate action is allowed
- **Checks**:
  1. Capability level check
  2. Scope validation
  3. Policy compliance
  4. Rate limit check

#### Validation Outcomes
- **Approved**: Proceed to Phase 3
- **Rejected**: Stop execution, log violation, notify user
- **Warning**: Proceed with warning logged

---

### Phase 3: Agent Action Execution

#### Level 1 Actions
- **Observation Agent**: Execute allowed actions
  - Sample questions
  - Capture AI answers
  - Detect brand mentions
  - Infer positions
  - Tag sentiment
- **Intelligence Agent**: Execute allowed actions
  - Compute GEO Scores
  - Aggregate metrics
  - Compare brands
  - Track trends

#### Level 2 Actions
- **Reasoning Agent**: Execute allowed actions
  - Identify gaps
  - Detect risks
  - Recognize patterns
  - Map opportunities
- **Strategy Agent**: Execute allowed actions
  - Generate recommendations
  - Prioritize actions
  - Estimate impact
  - Create action plans

#### Execution Rules
- Actions execute sequentially (no parallel execution)
- Each action completes before next begins
- Outputs are validated before use
- Failures trigger safe rollback

---

### Phase 4: Governance Post-Validation

#### Checkpoint: Post-Action Validation
- **Location**: After agent action execution
- **Purpose**: Validate outputs and compliance
- **Checks**:
  1. Output schema validation
  2. Compliance verification
  3. Audit logging
  4. Error detection

#### Validation Outcomes
- **Valid**: Proceed to Phase 5
- **Invalid**: Log error, rollback if needed, notify user
- **Compliance Issue**: Log violation, escalate if serious

---

### Phase 5: Human Checkpoint (If Required)

#### Level 3 Actions
- **Trigger**: Action requires Level 3 capability
- **Process**:
  1. Execution pauses
  2. Human approval request generated
  3. Approval/rejection awaited
  4. If approved → proceed (if applicable)
  5. If rejected → hard stop

#### Checkpoint Behavior
- **Approval**: Action may proceed (if within scope)
- **Rejection**: Hard stop, no retry, execution terminates
- **Timeout**: Hard stop after timeout period
- **No Response**: Hard stop after timeout

---

### Phase 6: Continuation or Exit

#### Continuation Conditions
- More actions in queue (Level 1/2)
- No human checkpoint required
- No failures or violations
- Autopilot still enabled

#### Exit Conditions
- All actions completed
- Human checkpoint rejected
- Failure occurred
- Autopilot disabled/stopped
- Governance violation detected

---

## Execution Loop Diagram

```
┌─────────────────────┐
│ Entry Conditions    │
│ - Autopilot enabled │
│ - Scope validated   │
│ - No blockers       │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│ Governance Pre-Val  │
│ - Capability check   │
│ - Scope validation   │
│ - Policy compliance  │
└──────────┬──────────┘
           │
      [Approved]
           │
           ↓
┌─────────────────────┐
│ Agent Action Exec    │
│ - Level 1/2 actions  │
│ - Sequential exec    │
│ - Output validation  │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│ Governance Post-Val  │
│ - Output validation  │
│ - Compliance check   │
│ - Audit logging      │
└──────────┬──────────┘
           │
      [Valid]
           │
           ↓
┌─────────────────────┐
│ Human Checkpoint?    │
│ - Level 3 required? │
└──────────┬──────────┘
           │
    [Yes]  │  [No]
           │     │
           ↓     ↓
┌──────────┐   ┌──────────┐
│ Approval │   │ Continue │
│ Required │   │ or Exit  │
└──────────┘   └──────────┘
```

## Execution State Management

### State Transitions
- **Idle**: Autopilot enabled but not executing
- **Validating**: Governance validation in progress
- **Executing**: Agent actions executing
- **Checkpoint**: Waiting for human approval
- **Paused**: Execution paused by user
- **Stopped**: Execution stopped
- **Failed**: Execution failed
- **Complete**: Execution completed successfully

### State Persistence
- Execution state is persisted
- State can be resumed after pause
- State is logged for audit
- State transitions are tracked

## Pause and Stop Mechanisms

### Pause
- **Trigger**: User-initiated or system-initiated
- **Behavior**: Execution pauses at current phase
- **State**: Preserved for resume
- **Resume**: Continues from pause point (if still valid)

### Stop
- **Trigger**: User-initiated or critical failure
- **Behavior**: Execution stops immediately
- **State**: Final state logged
- **Resume**: Not possible (must restart)

### Emergency Stop
- **Trigger**: Critical violation or system error
- **Behavior**: Immediate stop, all actions halted
- **State**: Error state logged
- **Recovery**: Requires manual intervention

## Rate Limiting

### Rate Limit Enforcement
- **Per-Action**: Each action type has rate limit
- **Per-Topic**: Topic-level rate limits
- **Per-Region**: Region-level rate limits
- **Time-Window**: Limits apply within time windows

### Rate Limit Behavior
- **Within Limit**: Action proceeds
- **Exceeded Limit**: Action blocked, logged, user notified
- **Rate Limit Reset**: Automatic reset at time window boundary

## Execution Metrics

### Tracked Metrics
- **Actions Executed**: Count of actions executed
- **Actions Blocked**: Count of actions blocked
- **Validation Time**: Time spent in governance validation
- **Execution Time**: Time spent executing actions
- **Checkpoint Time**: Time spent waiting for human approval
- **Failure Rate**: Percentage of actions that failed

### Metrics Logging
- All metrics logged per execution cycle
- Metrics aggregated over time
- Metrics available for audit review
- Metrics used for performance monitoring

## Documentation

- [Human Checkpoints](./human-checkpoints.md)
- [Failure States](./failure-states.md)
- [Audit Trail](./audit-trail.md)

