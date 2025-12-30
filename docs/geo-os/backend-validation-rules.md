# Backend Validation & Safety Enforcement Rules

## Overview

This document defines the backend validation and safety enforcement rules for the Agentic GEO OS. It serves as a backend contract, security specification, and future enterprise audit reference. All validation follows TypeScript-oriented, Zod-style validation philosophy.

## Global System Validation Principles

### Principle 1: Strict Type Safety
- **Requirement**: All agent outputs must conform to strict TypeScript types
- **Enforcement**: Runtime validation using Zod or similar schema validation
- **Rationale**: Prevents type errors, ensures data consistency, enables compile-time safety

### Principle 2: Immutable Agent Outputs
- **Requirement**: Agent outputs are immutable once generated
- **Enforcement**: No update or delete operations on agent outputs
- **Rationale**: Preserves audit trail, prevents data corruption, maintains analysis integrity

### Principle 3: Read-Only Page Data
- **Requirement**: All page data is read-only; no write operations through page APIs
- **Enforcement**: All page endpoints are GET-only; POST/PUT/PATCH rejected
- **Rationale**: Agent outputs are analysis results, not user-editable data

### Principle 4: Agent Output Hierarchy
- **Requirement**: Agents must respect data flow hierarchy (Observation → Intelligence → Reasoning → Strategy)
- **Enforcement**: Backend validates agent dependencies before processing
- **Rationale**: Maintains separation of concerns, prevents circular dependencies

### Principle 5: Explicit Forbidden Fields
- **Requirement**: No execution, publishing, automation, or autopilot fields allowed
- **Enforcement**: Schema validation rejects any forbidden field names
- **Rationale**: Prevents accidental execution triggers, maintains system boundaries

---

## Zod-Style Validation Philosophy

### Type-First Approach
- All validation schemas defined as TypeScript types first
- Zod schemas generated from TypeScript types
- Runtime validation matches compile-time types

### Strict Validation
- No `any` types allowed
- No optional fields without explicit `undefined` union
- All enums must be literal string unions

### Error Messages
- Validation errors must be descriptive and actionable
- Error messages include field path and expected type
- Errors logged for audit trail

### Example Validation Pattern

```typescript
import { z } from 'zod';

const GEOScoreSchema = z.object({
  overall: z.number().min(0).max(100),
  visibility: z.object({
    reach: z.number().min(0).max(100),
    position: z.number().min(1),
    score: z.number().min(0).max(100)
  }),
  sentiment: z.object({
    type: z.enum(['positive', 'neutral', 'negative']),
    confidence: z.number().min(0).max(100),
    score: z.number().min(0).max(100)
  })
});

const PageMetaSchema = z.object({
  page: z.string().regex(/^\/[a-z-]+$/),
  generated_at: z.string().datetime(),
  source_agent: z.enum(['observation_agent', 'intelligence_agent', 'reasoning_agent', 'strategy_agent', 'governance_agent'])
});
```

---

## Page-Level Validation Rules

### Page: GEO Overview (`/`)

#### Required Validation
1. **Intelligence Agent Output Validation**
   - GEO Score summary must be present
   - Visibility vs sentiment chart data must be valid
   - Competitor comparison must include at least primary brand
   - Topic performance summary must include at least one topic

2. **Strategy Agent Output Validation** (if present)
   - High-level suggestions must be array of recommendations
   - Each recommendation must have valid ID, title, priority
   - Recommendations must not exceed 5 items

3. **Governance Agent Output Validation** (if present)
   - Critical warnings must be array
   - Each warning must have valid ID, type, severity, message

4. **Metadata Validation**
   - `meta.page` must equal `/`
   - `meta.source_agent` must be `intelligence_agent` for primary output
   - `meta.generated_at` must be valid ISO 8601 timestamp

#### Forbidden Fields Validation
- Must reject any field containing: `execute`, `execution`, `publish`, `autopilot`
- Must reject `autopilot_status` or `autopilot_enabled` fields
- Must reject `webhook`, `callback`, `trigger` fields

#### Agent Attribution Validation
- Primary output must be from Intelligence Agent
- Supporting outputs must include `source_agent` field
- Must reject outputs from Observation Agent or Autopilot

---

### Page: Topic Intelligence (`/topics`)

#### Required Validation
1. **Intelligence Agent Output Validation**
   - Topic overview must include topic_id, topic_name, geo_score
   - Performance metrics must include visibility and sentiment data
   - Brand comparison must include at least primary brand

2. **Reasoning Agent Output Validation** (if present)
   - Visibility gaps must be array
   - Sentiment risks must be array
   - Pattern insights must be array
   - Opportunities must be array

3. **Observation Agent Output Validation** (if present)
   - Sample questions must be array
   - Each question must have valid question_id, question_text

4. **Metadata Validation**
   - `meta.page` must equal `/topics`
   - `meta.source_agent` must be `intelligence_agent` for primary output

#### Forbidden Fields Validation
- Must reject any field containing: `execute`, `execution`, `publish`, `autopilot`
- Must reject Strategy Agent recommendations (displayed on separate page)
- Must reject Governance Agent warnings (not displayed on topic page)

#### Agent Attribution Validation
- Primary output must be from Intelligence Agent
- Must reject outputs from Strategy Agent or Governance Agent
- Must reject outputs from Autopilot

---

### Page: Question Explorer (`/questions`)

#### Required Validation
1. **Observation Agent Output Validation**
   - Question details must include question_id, question_text, topic_id
   - AI answer snapshot must include answer_text, timestamp
   - Brand mentions must be array with valid structure
   - Position analysis must include primary_brand_position
   - Sentiment analysis must include overall_sentiment

2. **Intelligence Agent Output Validation** (if present)
   - Question-level GEO Score must be valid GEOScore structure

3. **Metadata Validation**
   - `meta.page` must equal `/questions`
   - `meta.source_agent` must be `observation_agent` for primary output

#### Forbidden Fields Validation
- Must reject any field containing: `execute`, `execution`, `publish`, `autopilot`
- Must reject Reasoning Agent gaps (displayed on topic page)
- Must reject Strategy Agent recommendations (displayed on separate page)

#### Agent Attribution Validation
- Primary output must be from Observation Agent
- Must reject outputs from Reasoning Agent, Strategy Agent, Governance Agent
- Must reject outputs from Autopilot

---

### Page: Suggestions & Actions (`/suggestions`)

#### Required Validation
1. **Strategy Agent Output Validation**
   - Recommendations summary must include total_recommendations, priority_distribution
   - High/medium/low priority recommendations must be arrays
   - Each recommendation must have valid ID, type, priority, title, description
   - Action plans must include step arrays
   - Impact estimates must include geo_score_improvements
   - Content roadmap must include topic arrays
   - Technical checklist must include item arrays

2. **Governance Agent Output Validation** (if present)
   - Governance warnings must be array
   - Each warning must have valid ID, type, severity, message

3. **Metadata Validation**
   - `meta.page` must equal `/suggestions`
   - `meta.source_agent` must be `strategy_agent` for primary output

#### Forbidden Fields Validation
- Must reject any field containing: `execute`, `execution`, `publish`, `autopilot`
- Must reject `actionable_steps` that contain executable commands (API calls, webhooks)
- Must reject `actionable_steps` that contain automation triggers
- Must reject Observation Agent raw data (displayed on separate pages)
- Must reject Intelligence Agent metrics (used indirectly only)

#### Agent Attribution Validation
- Primary output must be from Strategy Agent
- Must reject outputs from Observation Agent, Intelligence Agent, Reasoning Agent (direct display)
- Must reject outputs from Autopilot

#### Actionable Steps Validation
- Actionable steps must be descriptive text only
- Must reject steps containing: `POST`, `PUT`, `PATCH`, `DELETE`, `webhook`, `callback`
- Must reject steps containing: `execute`, `run`, `trigger`, `automate`

---

### Page: Best Practices (`/best-practices`)

#### Required Validation
1. **Strategy Agent Output Validation**
   - Technical checklist must include item arrays
   - Each item must have valid ID, category, item, description, priority, status

2. **Intelligence Agent Output Validation** (if present)
   - Readiness indicators must include overall_readiness, category_scores

3. **Metadata Validation**
   - `meta.page` must equal `/best-practices`
   - `meta.source_agent` must be `strategy_agent` for primary output

#### Forbidden Fields Validation
- Must reject any field containing: `execute`, `execution`, `publish`, `autopilot`
- Must reject Observation Agent raw data
- Must reject Reasoning Agent gap analysis
- Must reject full Strategy Agent recommendations (only technical items)

#### Agent Attribution Validation
- Primary output must be from Strategy Agent
- Must reject outputs from Observation Agent, Reasoning Agent, Governance Agent
- Must reject outputs from Autopilot

---

### Page: Historical Trends (`/trends`)

#### Required Validation
1. **Intelligence Agent Output Validation**
   - GEO Score time series must include data_points array
   - Each data point must have timestamp, geo_score
   - Visibility trends must include reach_trend, position_trend
   - Sentiment trends must include sentiment_distribution_trend, confidence_trend
   - Topic movement must include topics array

2. **Reasoning Agent Output Validation** (if present)
   - Temporal patterns must be array
   - Each pattern must have pattern_id, pattern_type, description, confidence

3. **Metadata Validation**
   - `meta.page` must equal `/trends`
   - `meta.source_agent` must be `intelligence_agent` for primary output

#### Forbidden Fields Validation
- Must reject any field containing: `execute`, `execution`, `publish`, `autopilot`
- Must reject Observation Agent raw snapshots (aggregated by Intelligence Agent)
- Must reject Strategy Agent recommendations (focus on measurement, not decisions)

#### Agent Attribution Validation
- Primary output must be from Intelligence Agent
- Reasoning Agent output allowed only for temporal patterns
- Must reject outputs from Observation Agent, Strategy Agent, Governance Agent
- Must reject outputs from Autopilot

---

## Explicit Forbidden Fields List

### Execution Fields
- `execute`, `execution`, `execute_command`, `run`, `apply`, `deploy`
- `execution_status`, `execution_progress`, `execution_result`
- `execute_now`, `auto_execute`, `trigger_execution`

### Publishing Fields
- `publish`, `publishing`, `publish_status`, `publish_date`
- `deploy`, `deployment`, `deploy_status`
- `go_live`, `release`, `launch`

### Generation Fields
- `generate_content`, `create_content`, `auto_generate`
- `generate_now`, `trigger_generation`
- `content_generation_status`

### Automation Fields
- `autopilot`, `autopilot_status`, `autopilot_enabled`
- `automation`, `automation_status`, `auto_trigger`
- `webhook`, `callback`, `trigger`, `automation_rule`

### Status Tracking Fields
- `execution_status`, `progress`, `completion_status`
- `in_progress`, `completed`, `failed_execution`
- `tracking_id`, `execution_id`

### Validation Enforcement
- Backend must reject any schema containing forbidden field names (case-insensitive)
- Validation must check nested objects recursively
- Violations must be logged with field path and value
- Error response must include forbidden field names

---

## Agent-to-Page Enforcement Rules

### Rule 1: Primary Agent Must Match Page
- Each page has a designated primary agent
- Backend must validate that primary output comes from correct agent
- Reject requests for primary agent outputs from wrong agent

### Rule 2: Supporting Agents Must Be Allowed
- Supporting agent outputs must be in allowed agents list for page
- Backend must validate `source_agent` field in supporting outputs
- Reject supporting outputs from forbidden agents

### Rule 3: Forbidden Agents Must Be Blocked
- Backend must reject any output from forbidden agents for specific page
- Validation must check `meta.source_agent` and nested `source_agent` fields
- Return 403 Forbidden with clear error message

### Rule 4: Agent Output Hierarchy Must Be Preserved
- Backend must validate agent dependencies
- Higher-level agents (Reasoning, Strategy) cannot access raw data directly
- Lower-level agents (Observation, Intelligence) cannot be bypassed

### Rule 5: Autopilot Must Never Appear
- Backend must reject any output containing `autopilot` field
- Validation must check all nested objects recursively
- Return 400 Bad Request with clear error message

---

## Measurement Isolation Rules

### Rule 1: Google Analytics Data Must Not Influence Strategy
- **Requirement**: Google Analytics data must never be used as input to Reasoning Agent or Strategy Agent
- **Validation**: Backend must reject agent requests that include GA data in inputs
- **Enforcement**: Input validation must check for GA data fields and reject

### Rule 2: Google Analytics Data Is Measurement-Only
- **Requirement**: If GA data is displayed, it must be in separate measurement endpoints only
- **Validation**: Backend must validate that GA data endpoints are separate from GEO OS pages
- **Enforcement**: GA data cannot be included in page schemas

### Rule 3: Market Voice Data Is Excluded
- **Requirement**: Forum, social, Q&A data must not be included in any page output
- **Validation**: Backend must reject outputs containing market voice data fields
- **Enforcement**: Schema validation must check for market voice field names

### Rule 4: Execution Status Is Excluded
- **Requirement**: Status from external execution systems must not be included in page outputs
- **Validation**: Backend must reject outputs containing execution status fields
- **Enforcement**: Schema validation must check for execution status field names

---

## Audit and Logging Expectations

### Required Audit Fields
- **Request ID**: Unique identifier for each request
- **Timestamp**: ISO 8601 timestamp of request
- **User ID**: User making the request (if authenticated)
- **Page Route**: Page being accessed
- **Agent Outputs Requested**: List of agents requested
- **Validation Status**: Passed or failed
- **Validation Errors**: Array of validation errors (if failed)
- **Forbidden Fields Detected**: Array of forbidden field names (if any)
- **Agent Attribution Violations**: Array of agent violations (if any)

### Audit Log Immutability
- Audit logs must be append-only
- No update or delete operations allowed
- Logs must be stored in immutable storage

### Audit Log Retention
- Minimum retention: 7 years (or as required by compliance)
- Logs must be searchable and queryable
- Logs must support compliance reviews

### Logging Requirements
- All validation failures must be logged
- All forbidden field violations must be logged
- All agent attribution violations must be logged
- All measurement isolation violations must be logged

---

## Validation Error Response Format

### Error Response Schema

```typescript
interface ValidationErrorResponse {
  error: {
    code: 'VALIDATION_ERROR' | 'FORBIDDEN_FIELD' | 'AGENT_VIOLATION' | 'MEASUREMENT_ISOLATION_VIOLATION';
    message: string;
    details: {
      field_path?: string;
      expected_type?: string;
      actual_value?: any;
      forbidden_fields?: string[];
      agent_violations?: string[];
    };
    request_id: string;
    timestamp: string;
  };
}
```

### Error Codes
- `VALIDATION_ERROR`: Schema validation failed (missing fields, wrong types)
- `FORBIDDEN_FIELD`: Forbidden field detected in output
- `AGENT_VIOLATION`: Agent attribution violation (wrong agent for page)
- `MEASUREMENT_ISOLATION_VIOLATION`: Measurement isolation rule violated

---

## Summary

This document defines comprehensive backend validation and safety enforcement rules:

- **Global Principles**: Strict type safety, immutable outputs, read-only data, agent hierarchy, forbidden fields
- **Page-Level Validation**: Required fields, forbidden fields, agent attribution for each page
- **Forbidden Fields**: Explicit list of execution, publishing, automation, autopilot fields
- **Agent-to-Page Enforcement**: Rules ensuring correct agent outputs for each page
- **Measurement Isolation**: Rules preventing GA data and market voice data from influencing GEO analysis
- **Audit and Logging**: Complete audit trail requirements for compliance

All validation follows TypeScript-oriented, Zod-style validation philosophy with strict type safety and descriptive error messages.

