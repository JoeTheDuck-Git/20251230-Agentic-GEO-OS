# Autopilot Capability Levels

## Overview

Autopilot capabilities are organized into three levels that determine what actions may be performed autonomously. Each level has explicit allowed actions, forbidden actions, and governance requirements.

## Level 1: Auto-Observe (Safe)

### Definition
Level 1 represents the **safest** level of autonomy, limited to data collection and observation only. No analysis, reasoning, or recommendations are generated autonomously at this level.

### Allowed Actions

1. **Question Sampling**
   - Observation Agent may autonomously sample questions for approved topics
   - Questions must be within validated scope from Governance
   - Sampling follows predefined templates and patterns

2. **AI Answer Capture**
   - Observation Agent may autonomously capture AI-generated answers
   - Answers are captured from approved sources only
   - Capture follows rate limits and constraints

3. **Brand Mention Detection**
   - Observation Agent may autonomously detect brand mentions in answers
   - Detection uses predefined brand lists
   - All mentions are logged

4. **Position Inference**
   - Observation Agent may autonomously infer mention positions
   - Position calculation follows deterministic rules
   - Results are logged

5. **Sentiment Tagging**
   - Observation Agent may autonomously tag sentiment
   - Sentiment classification uses predefined rules
   - All tags are logged

6. **GEO Score Computation**
   - Intelligence Agent may autonomously compute GEO Scores
   - Computation uses deterministic formulas
   - Scores are logged

7. **Metric Aggregation**
   - Intelligence Agent may autonomously aggregate metrics
   - Aggregation follows predefined rules
   - Results are logged

### Forbidden Actions

1. **Gap Analysis**
   - Reasoning Agent may NOT autonomously identify gaps
   - Gap analysis requires Level 2 capability

2. **Pattern Recognition**
   - Reasoning Agent may NOT autonomously recognize patterns
   - Pattern recognition requires Level 2 capability

3. **Recommendation Generation**
   - Strategy Agent may NOT autonomously generate recommendations
   - Recommendation generation requires Level 2 capability

4. **Any Execution**
   - No agent may execute any recommendations
   - Execution is always Level 3 (Human-Required)

### Required Inputs

- **Validated Scope**: From Governance Agent (must be pre-approved)
- **Brand Lists**: Predefined and approved
- **Topic Definitions**: Predefined and approved
- **Question Templates**: Predefined and approved

### Required Outputs

- **AI Answer Snapshots**: Complete with metadata
- **Brand Mention Records**: Complete with position and sentiment
- **GEO Scores**: Computed and logged
- **Aggregated Metrics**: Computed and logged

### Governance Checks

1. **Scope Validation**: All actions must be within validated scope
2. **Rate Limits**: Actions must comply with rate limits
3. **Data Retention**: Data must comply with retention policies
4. **Audit Logging**: All actions must be logged

### Audit Requirements

- **Action Log**: Every action logged with timestamp, agent, and result
- **Data Log**: All data collected logged with metadata
- **Validation Log**: All governance checks logged
- **Error Log**: All errors and violations logged

## Level 2: Auto-Reason (Restricted)

### Definition
Level 2 represents **conditional autonomy** for analysis and reasoning. Agents may identify gaps, recognize patterns, and generate recommendations, but execution is still blocked.

### Allowed Actions

1. **Gap Identification**
   - Reasoning Agent may autonomously identify visibility gaps
   - Gap detection uses predefined thresholds
   - All gaps are logged

2. **Sentiment Risk Detection**
   - Reasoning Agent may autonomously detect sentiment risks
   - Risk detection uses predefined rules
   - All risks are logged

3. **Pattern Recognition**
   - Reasoning Agent may autonomously recognize patterns
   - Pattern recognition uses predefined algorithms
   - All patterns are logged

4. **Root Cause Analysis**
   - Reasoning Agent may autonomously analyze root causes
   - Analysis uses predefined frameworks
   - All analyses are logged

5. **Opportunity Mapping**
   - Reasoning Agent may autonomously map opportunities
   - Mapping uses predefined criteria
   - All opportunities are logged

6. **Recommendation Generation**
   - Strategy Agent may autonomously generate recommendations
   - Recommendations follow predefined templates
   - All recommendations are logged

7. **Action Prioritization**
   - Strategy Agent may autonomously prioritize actions
   - Prioritization uses predefined logic
   - All priorities are logged

8. **Impact Estimation**
   - Strategy Agent may autonomously estimate impact
   - Estimation uses predefined models
   - All estimates are logged

### Forbidden Actions

1. **Recommendation Execution**
   - Strategy Agent may NOT execute recommendations
   - Execution is always Level 3 (Human-Required)

2. **Policy Modification**
   - No agent may modify policies
   - Policy modification is always Level 3 (Human-Required)

3. **Scope Expansion**
   - No agent may expand analysis scope
   - Scope expansion requires new Governance validation

4. **Question Generation Modification**
   - No agent may modify question generation logic
   - Question generation is locked to Observation Agent

### Required Inputs

- **GEO Scores**: From Intelligence Agent (Level 1 output)
- **Aggregated Metrics**: From Intelligence Agent (Level 1 output)
- **Validated Scope**: From Governance Agent (pre-approved)
- **Thresholds**: Predefined and approved

### Required Outputs

- **Visibility Gaps**: Identified and logged
- **Sentiment Risks**: Identified and logged
- **Pattern Insights**: Recognized and logged
- **Recommendations**: Generated and logged
- **Action Plans**: Created and logged

### Governance Checks

1. **Capability Level Check**: Action must be within Level 2 capability
2. **Policy Compliance**: All actions must comply with policies
3. **Threshold Validation**: Thresholds must be within approved ranges
4. **Recommendation Validation**: Recommendations must pass governance checks

### Audit Requirements

- **Analysis Log**: Every analysis logged with inputs, outputs, and reasoning
- **Gap Log**: All gaps logged with severity and root causes
- **Recommendation Log**: All recommendations logged with priorities and impact
- **Validation Log**: All governance checks logged
- **Warning Log**: All warnings and violations logged

## Level 3: Human-Required (Blocked)

### Definition
Level 3 represents actions that **MUST** have explicit human approval before execution. These are high-impact actions that affect system behavior, policies, or external systems.

### Allowed Actions

**NONE** - All Level 3 actions are blocked without human approval.

### Forbidden Actions (Without Human Approval)

1. **Recommendation Execution**
   - No agent may execute recommendations autonomously
   - Execution requires explicit human approval
   - Execution handoff to content systems requires human confirmation

2. **Policy Modification**
   - No agent may modify policies autonomously
   - Policy changes require explicit human approval
   - Governance rules cannot be changed autonomously

3. **Scope Expansion**
   - No agent may expand analysis scope autonomously
   - Scope expansion requires new Governance validation and human approval
   - New topics, brands, or regions require human approval

4. **Capability Level Changes**
   - No agent may change capability levels autonomously
   - Capability level changes require explicit human approval
   - Autopilot enable/disable requires human action

5. **Question Generation Logic Changes**
   - No agent may modify question generation logic autonomously
   - Question generation changes require explicit human approval
   - Observation Agent logic changes require human approval

6. **External System Integration**
   - No agent may integrate with external systems autonomously
   - External integrations require explicit human approval
   - Content system handoffs require human confirmation

7. **Data Deletion**
   - No agent may delete data autonomously
   - Data deletion requires explicit human approval
   - Audit logs cannot be deleted autonomously

8. **User Access Changes**
   - No agent may change user access autonomously
   - Access changes require explicit human approval
   - Permission modifications require human action

### Required Inputs

- **Human Approval**: Explicit approval for each Level 3 action
- **Approval Metadata**: Who approved, when, and why
- **Risk Assessment**: Risk level and mitigation plans
- **Impact Analysis**: Expected impact of the action

### Required Outputs

- **Approval Records**: Complete approval documentation
- **Execution Logs**: Complete execution documentation
- **Impact Reports**: Post-execution impact analysis
- **Audit Trails**: Complete audit trail of action

### Governance Checks

1. **Human Approval Verification**: Action must have explicit human approval
2. **Approval Validity**: Approval must be valid and not expired
3. **Risk Assessment**: Risk must be acceptable
4. **Policy Compliance**: Action must comply with all policies
5. **Impact Analysis**: Impact must be understood and acceptable

### Audit Requirements

- **Approval Log**: Every approval logged with approver, timestamp, and reason
- **Execution Log**: Every execution logged with complete details
- **Impact Log**: Impact analysis logged before and after execution
- **Violation Log**: Any violations logged immediately
- **Review Log**: All reviews and audits logged

## Capability Level Matrix

| Action | Level 1 | Level 2 | Level 3 |
|--------|---------|---------|---------|
| Question Sampling | ✅ Allowed | ✅ Allowed | ❌ Blocked |
| AI Answer Capture | ✅ Allowed | ✅ Allowed | ❌ Blocked |
| Brand Mention Detection | ✅ Allowed | ✅ Allowed | ❌ Blocked |
| GEO Score Computation | ✅ Allowed | ✅ Allowed | ❌ Blocked |
| Gap Identification | ❌ Blocked | ✅ Allowed | ❌ Blocked |
| Pattern Recognition | ❌ Blocked | ✅ Allowed | ❌ Blocked |
| Recommendation Generation | ❌ Blocked | ✅ Allowed | ❌ Blocked |
| Recommendation Execution | ❌ Blocked | ❌ Blocked | ⚠️ Human-Required |
| Policy Modification | ❌ Blocked | ❌ Blocked | ⚠️ Human-Required |
| Scope Expansion | ❌ Blocked | ❌ Blocked | ⚠️ Human-Required |

**Legend**:
- ✅ Allowed: Action may be performed autonomously
- ❌ Blocked: Action may NOT be performed autonomously
- ⚠️ Human-Required: Action requires explicit human approval

## Capability Level Enforcement

### Enforcement Mechanism
- **Governance Agent** enforces capability levels
- **Pre-Action Check**: Governance checks capability level before allowing action
- **Post-Action Audit**: Governance audits all actions for compliance
- **Violation Detection**: Governance detects and blocks violations

### Violation Handling
- **Immediate Block**: Violations are blocked immediately
- **Audit Logging**: All violations are logged
- **Notification**: Users are notified of violations
- **Review Required**: Violations require human review

