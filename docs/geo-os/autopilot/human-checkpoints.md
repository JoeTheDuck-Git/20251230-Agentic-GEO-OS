# Autopilot Human Checkpoints

## Overview

Human Checkpoints are mandatory approval points in Autopilot execution where high-impact actions require explicit human approval before proceeding. Checkpoints ensure human oversight and accountability for critical decisions.

## Checkpoint Types

### Checkpoint Type 1: Level 3 Action Approval

#### Trigger Condition
- Action requires Level 3 capability (Human-Required)
- Action affects system behavior, policies, or external systems
- Action cannot be executed autonomously

#### Approval Process
1. Execution pauses
2. Approval request generated with:
   - Action description
   - Expected impact
   - Risk assessment
   - Policy references
3. Human reviews request
4. Human approves or rejects
5. If approved → action may proceed (if still valid)
6. If rejected → hard stop

#### Approval Metadata
- **Who**: User ID who approved/rejected
- **When**: Timestamp of decision
- **Why**: Reason for approval/rejection (optional)
- **Risk Assessment**: Risk level and mitigation
- **Policy References**: Related policies

---

### Checkpoint Type 2: Scope Expansion Approval

#### Trigger Condition
- Autopilot attempts to expand analysis scope
- New topics, brands, or regions requested
- Scope expansion requires new Governance validation

#### Approval Process
1. Scope expansion request generated
2. New scope validated by Governance
3. If validation passes → human approval required
4. Human reviews expanded scope
5. Human approves or rejects
6. If approved → scope expanded, execution continues
7. If rejected → hard stop, original scope maintained

#### Approval Metadata
- **Original Scope**: Scope before expansion
- **Requested Scope**: Scope after expansion
- **Expansion Details**: What is being added
- **Impact Assessment**: Impact of scope expansion

---

### Checkpoint Type 3: Policy Exception Approval

#### Trigger Condition
- Action requires policy exception
- Standard policy would block action
- Exception is justified but requires approval

#### Approval Process
1. Policy exception request generated
2. Exception justification provided
3. Human reviews exception
4. Human approves or rejects
5. If approved → action proceeds with exception
6. If rejected → action blocked, standard policy applies

#### Approval Metadata
- **Policy**: Policy requiring exception
- **Exception Reason**: Justification for exception
- **Risk Assessment**: Risk of granting exception
- **Alternative Options**: Alternatives to exception

---

## What Approval Does NOT Do

### Approval Does NOT Execute Actions
- Approval allows action to proceed through governance
- Approval does NOT automatically execute in external systems
- Execution handoff is separate from approval
- Approval is logged but does not trigger execution

### Approval Does NOT Modify Policies
- Approval does NOT change policies
- Approval does NOT create permanent exceptions
- Approval applies to specific action only
- Policies remain unchanged

### Approval Does NOT Bypass Governance
- Approval does NOT skip governance validation
- Approval does NOT override governance rules
- Approval is additional check, not replacement
- Governance still validates after approval

### Approval Does NOT Expand Capabilities
- Approval does NOT change capability levels
- Approval does NOT enable new capabilities
- Approval applies to specific action only
- Capability boundaries remain unchanged

## Rejection Handling

### Hard Stop on Rejection
- **Behavior**: Execution stops immediately
- **No Retry**: Rejection does not trigger retry
- **State Preserved**: Final state before rejection is logged
- **User Notified**: User is notified of rejection

### Rejection Reasons
- **Policy Violation**: Action violates policies
- **Risk Too High**: Risk assessment unacceptable
- **Scope Invalid**: Requested scope is invalid
- **User Decision**: User explicitly rejects

### Rejection Metadata
- **Who**: User ID who rejected
- **When**: Timestamp of rejection
- **Why**: Reason for rejection
- **Action**: Action that was rejected
- **State**: System state at rejection

## Checkpoint Timeout

### Timeout Behavior
- **Timeout Period**: Defined timeout for checkpoint response
- **Timeout Action**: Hard stop if no response
- **Timeout Notification**: User notified of timeout
- **Timeout Logging**: Timeout logged as rejection

### Timeout Configuration
- **Default Timeout**: Configurable (e.g., 24 hours)
- **Timeout Warning**: Warning before timeout
- **Timeout Extension**: User can extend timeout
- **Maximum Timeout**: Hard limit on timeout extension

## Checkpoint Audit

### Required Audit Fields
- **Checkpoint ID**: Unique identifier
- **Checkpoint Type**: Type of checkpoint
- **Action**: Action requiring approval
- **Request Timestamp**: When approval was requested
- **Response Timestamp**: When approval/rejection occurred
- **Responder**: User who approved/rejected
- **Decision**: Approve or reject
- **Reason**: Reason for decision
- **Risk Assessment**: Risk level assessed

### Audit Immutability
- Checkpoint audit logs are immutable
- Logs cannot be modified or deleted
- Logs are preserved for compliance
- Logs are accessible for review

## Checkpoint Examples

### Example 1: Recommendation Execution (Blocked)
- **Action**: Execute recommendation in external system
- **Capability Level**: Level 3 (Human-Required)
- **Checkpoint**: Required
- **Approval**: User must approve
- **Rejection**: Hard stop, recommendation not executed

### Example 2: Scope Expansion (Blocked)
- **Action**: Add new topic to analysis scope
- **Capability Level**: Level 3 (Human-Required)
- **Checkpoint**: Required
- **Approval**: User must approve expanded scope
- **Rejection**: Hard stop, scope not expanded

### Example 3: Policy Exception (Blocked)
- **Action**: Action requiring policy exception
- **Capability Level**: Level 3 (Human-Required)
- **Checkpoint**: Required
- **Approval**: User must approve exception
- **Rejection**: Hard stop, action blocked

## Safety Guarantees

### Guarantee 1: Mandatory for Level 3
- All Level 3 actions require human checkpoint
- No Level 3 action can bypass checkpoint
- Checkpoint cannot be skipped
- Approval is explicit and logged

### Guarantee 2: Hard Stop on Rejection
- Rejection triggers immediate hard stop
- No retry after rejection
- No automatic remediation
- Human intervention required to continue

### Guarantee 3: No Implied Approval
- Approval must be explicit
- No auto-approval mechanisms
- No approval by default
- Approval requires human action

### Guarantee 4: Complete Audit Trail
- Every checkpoint is logged
- Every approval/rejection is logged
- Every timeout is logged
- Audit trail is complete and immutable

