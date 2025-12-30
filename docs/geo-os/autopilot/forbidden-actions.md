# Autopilot Forbidden Actions - Explicit Blacklist

## Overview

This document defines the **explicit blacklist** of actions that are **NEVER** allowed autonomously in Autopilot mode. These actions either require explicit human approval (Level 3) or are permanently blocked.

## Blacklist Principles

1. **Explicit Prohibition**: Actions listed here are explicitly forbidden
2. **No Exceptions**: No agent may perform these actions autonomously
3. **Governance Enforcement**: Governance Agent blocks all blacklisted actions
4. **Audit Required**: All attempts are logged and audited

## Permanently Forbidden Actions

### Execution Actions

#### 1. Execute Recommendations
- **Action**: Execute recommendations in external systems
- **Reason**: Execution affects external systems and requires human oversight
- **Alternative**: Recommendations are outputs only, execution requires human approval
- **Governance Check**: Always blocked in Autopilot mode

#### 2. Modify Content
- **Action**: Modify content in external content systems
- **Reason**: Content modification requires human approval
- **Alternative**: Recommendations suggest content changes, but do not execute them
- **Governance Check**: Always blocked in Autopilot mode

#### 3. Deploy Changes
- **Action**: Deploy changes to production systems
- **Reason**: Deployment requires human approval and testing
- **Alternative**: Recommendations suggest changes, but deployment requires human action
- **Governance Check**: Always blocked in Autopilot mode

### Policy and Configuration Actions

#### 4. Modify Policies
- **Action**: Modify Governance policies or rules
- **Reason**: Policy changes affect system behavior and require human oversight
- **Alternative**: Policy modifications require explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

#### 5. Change Capability Levels
- **Action**: Modify Autopilot capability levels
- **Reason**: Capability level changes affect system autonomy and require human oversight
- **Alternative**: Capability level changes require explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

#### 6. Modify Governance Rules
- **Action**: Change Governance validation rules
- **Reason**: Governance rules ensure system safety and require human oversight
- **Alternative**: Governance rule changes require explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

### Scope and Configuration Actions

#### 7. Expand Analysis Scope
- **Action**: Add new topics, brands, or regions to analysis scope
- **Reason**: Scope expansion requires new Governance validation and human approval
- **Alternative**: Scope expansion requires new Analysis Request with human approval
- **Governance Check**: Always blocked in Autopilot mode

#### 8. Modify Question Generation Logic
- **Action**: Change how questions are sampled or generated
- **Reason**: Question generation logic affects data collection and requires human oversight
- **Alternative**: Question generation logic changes require explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

#### 9. Modify Agent Logic
- **Action**: Change agent processing logic or algorithms
- **Reason**: Agent logic changes affect system behavior and require human oversight
- **Alternative**: Agent logic changes require explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

### Data Management Actions

#### 10. Delete Data
- **Action**: Delete collected data or audit logs
- **Reason**: Data deletion affects auditability and requires human oversight
- **Alternative**: Data deletion requires explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

#### 11. Modify Audit Logs
- **Action**: Modify or delete audit log entries
- **Reason**: Audit logs ensure traceability and must not be modified
- **Alternative**: Audit logs are immutable, no modification allowed
- **Governance Check**: Always blocked in Autopilot mode

#### 12. Export Data Without Approval
- **Action**: Export data to external systems without approval
- **Reason**: Data export may contain sensitive information and requires human oversight
- **Alternative**: Data export requires explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

### System Integration Actions

#### 13. Integrate External Systems
- **Action**: Integrate with external systems or APIs
- **Reason**: External integrations affect system security and require human oversight
- **Alternative**: External integrations require explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

#### 14. Modify API Endpoints
- **Action**: Change API endpoints or interfaces
- **Reason**: API changes affect system integration and require human oversight
- **Alternative**: API changes require explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

### User and Access Actions

#### 15. Modify User Access
- **Action**: Change user permissions or access levels
- **Reason**: Access changes affect security and require human oversight
- **Alternative**: Access changes require explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

#### 16. Create or Delete Users
- **Action**: Create or delete user accounts
- **Reason**: User management affects security and requires human oversight
- **Alternative**: User management requires explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

### Feedback Loop Actions

#### 17. Create Strategy → Question Generation Feedback
- **Action**: Allow Strategy Agent to influence question generation
- **Reason**: Feedback loops can lead to uncontrolled expansion (Guardrail 3)
- **Alternative**: Question expansion requires new Analysis Request
- **Governance Check**: Always blocked in Autopilot mode

#### 18. Create Circular Dependencies
- **Action**: Create circular dependencies between agents
- **Reason**: Circular dependencies violate interaction rules
- **Alternative**: All interactions must be unidirectional
- **Governance Check**: Always blocked in Autopilot mode

#### 19. Skip Agents in Sequence
- **Action**: Skip agents in the canonical sequence
- **Reason**: Agent skipping violates interaction rules
- **Alternative**: All agents must process in sequence
- **Governance Check**: Always blocked in Autopilot mode

### Self-Modification Actions

#### 20. Self-Modify Capabilities
- **Action**: Agents modifying their own capabilities
- **Reason**: Self-modification can lead to unauthorized autonomy
- **Alternative**: Capability changes require explicit human approval (Level 3)
- **Governance Check**: Always blocked in Autopilot mode

#### 21. Bypass Governance
- **Action**: Agents bypassing Governance validation
- **Reason**: Governance ensures system safety and must not be bypassed
- **Alternative**: All actions must pass Governance validation
- **Governance Check**: Always blocked in Autopilot mode

## Level 3 Actions (Human-Required)

The following actions are **forbidden autonomously** but may be performed with explicit human approval:

### Execution Actions
- Execute recommendations
- Modify content
- Deploy changes

### Policy Actions
- Modify policies
- Change capability levels
- Modify governance rules

### Scope Actions
- Expand analysis scope
- Modify question generation logic
- Modify agent logic

### Data Actions
- Delete data
- Export data

### Integration Actions
- Integrate external systems
- Modify API endpoints

### Access Actions
- Modify user access
- Create or delete users

## Blacklist Enforcement

### Enforcement Mechanism
- **Governance Agent** enforces the blacklist
- **Pre-Action Check**: Governance checks blacklist before allowing action
- **Post-Action Audit**: Governance audits all actions for blacklist violations
- **Violation Detection**: Governance detects and blocks violations immediately

### Violation Handling
- **Immediate Block**: Violations are blocked immediately
- **Audit Logging**: All violations are logged
- **Notification**: Users are notified of violations
- **Review Required**: Violations require human review
- **Escalation**: Serious violations may require escalation

## Attempted Violation Logging

### Required Log Fields
- **Action ID**: Unique identifier for the attempted action
- **Agent**: Which agent attempted the action
- **Action Type**: Type of forbidden action
- **Timestamp**: When the attempt occurred
- **Inputs**: What inputs were used
- **Block Reason**: Why the action was blocked
- **Governance Status**: Governance validation result
- **User Notification**: Whether user was notified

## Blacklist Modification

### Modification Rules
- Blacklist modifications are **Level 3** actions (Human-Required)
- Modifications require explicit human approval
- Modifications must be documented and audited
- Modifications must comply with all policies
- Modifications must be reviewed by multiple stakeholders

