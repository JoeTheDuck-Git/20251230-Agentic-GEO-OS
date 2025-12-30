# Execution Handoff Context

## Overview

The **ExecutionHandoffContext** is the data structure that contains all information transferred from GEO OS to SEO OS during handoff. This context is **read-only, context-only, and immutable** after handoff.

## Core Properties

### Property 1: Read-Only
- **Requirement**: Context contains no executable commands
- **Enforcement**: No API calls, no triggers, no automation instructions
- **Rationale**: GEO OS provides insights, not execution directives

### Property 2: Context-Only
- **Requirement**: Context provides informational context only
- **Enforcement**: No operational data, no system state, no execution state
- **Rationale**: SEO OS makes execution decisions independently

### Property 3: Immutable
- **Requirement**: Context does not change after handoff
- **Enforcement**: Context is frozen at handoff time
- **Rationale**: Preserves audit trail and prevents confusion

### Property 4: Self-Contained
- **Requirement**: Context contains all necessary information
- **Enforcement**: No external dependencies or references
- **Rationale**: SEO OS can use context without querying GEO OS

## Context Structure

### Top-Level Schema

```typescript
interface ExecutionHandoffContext {
  // Metadata
  handoffId: string;
  handoffTimestamp: string; // ISO 8601
  handoffVersion: string; // Schema version
  
  // Approval metadata
  approvedBy: string; // User ID
  approvalTimestamp: string; // ISO 8601
  approvalReason?: string; // Optional reason
  
  // Source metadata
  sourceRequestId: string; // Original Analysis Request ID
  sourceAnalysisTimestamp: string; // When analysis was completed
  governanceStatus: 'approved' | 'approved_with_warnings';
  governanceWarnings?: GovernanceWarning[];
  
  // Recommendations
  recommendations: HandoffRecommendation[];
  
  // Supporting context
  topicContext?: TopicContext[];
  questionContext?: QuestionContext[];
  metricContext?: MetricContext;
  
  // Audit metadata
  auditTrail: HandoffAuditEntry[];
}
```

### Recommendation Schema

```typescript
interface HandoffRecommendation {
  // Identification
  recommendationId: string; // GEO OS recommendation ID
  type: 'content_gap' | 'structural_improvement' | 'authority_signal' | 'topic_expansion';
  priority: 'high' | 'medium' | 'low';
  
  // Content
  title: string;
  description: string;
  actionableSteps: string[]; // Read-only steps, not executable commands
  
  // Context
  topicId?: string;
  topicName?: string;
  questionId?: string;
  questionText?: string;
  
  // Impact
  expectedImpact: string; // Text description, not executable
  
  // Metadata
  createdAt: string; // ISO 8601
  generatedBy: 'strategy_agent';
  
  // Warnings (if any)
  warnings?: RecommendationWarning[];
}
```

### Topic Context Schema

```typescript
interface TopicContext {
  topicId: string;
  topicName: string;
  
  // Metrics (read-only)
  geoScore?: number;
  visibilityScore?: number;
  sentimentScore?: number;
  
  // Competitive context
  brandRank?: number; // Position in topic
  competitorCount?: number;
  
  // Question context
  questionCount?: number;
  sampleQuestions?: string[]; // Sample question texts only
}
```

### Question Context Schema

```typescript
interface QuestionContext {
  questionId: string;
  questionText: string;
  
  // Answer context (read-only)
  aiAnswerExcerpt?: string; // Excerpt only, not full answer
  brandMentioned: boolean;
  brandPosition?: number; // If mentioned
  sentiment?: 'positive' | 'neutral' | 'negative';
  
  // Metadata
  topicId: string;
  topicName: string;
}
```

### Metric Context Schema

```typescript
interface MetricContext {
  // Overall metrics (read-only)
  overallGeoScore?: number;
  overallVisibilityScore?: number;
  overallSentimentScore?: number;
  
  // Time range
  analysisTimeRange: {
    start: string; // ISO 8601
    end: string; // ISO 8601
  };
  
  // Scope
  topicsAnalyzed: number;
  questionsAnalyzed: number;
  brandsAnalyzed: number;
}
```

### Governance Warning Schema

```typescript
interface GovernanceWarning {
  warningId: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  recommendationId?: string; // If warning applies to specific recommendation
}
```

### Recommendation Warning Schema

```typescript
interface RecommendationWarning {
  warningId: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
}
```

### Audit Entry Schema

```typescript
interface HandoffAuditEntry {
  entryId: string;
  timestamp: string; // ISO 8601
  event: 'handoff_initiated' | 'handoff_approved' | 'handoff_transferred' | 'handoff_completed';
  actor: string; // User ID or 'system'
  details?: Record<string, any>; // Additional event details
}
```

## Data Constraints

### Constraint 1: No Executable Commands
- **Forbidden**: API endpoints, function calls, executable scripts
- **Forbidden**: Automation triggers, webhook URLs, callback URLs
- **Forbidden**: Execution instructions, "run this" commands
- **Allowed**: Descriptive text, read-only data, informational context

### Constraint 2: No System State
- **Forbidden**: Current execution state, pending actions, queue status
- **Forbidden**: System configuration, feature flags, environment variables
- **Forbidden**: User permissions, access tokens, credentials
- **Allowed**: Analysis results, recommendations, metrics (read-only)

### Constraint 3: No External References
- **Forbidden**: URLs to GEO OS resources (except for documentation)
- **Forbidden**: API endpoints to query GEO OS
- **Forbidden**: Database IDs that require GEO OS lookup
- **Allowed**: Self-contained data, copied values, static references

### Constraint 4: No Feedback Mechanisms
- **Forbidden**: Callback URLs, webhook endpoints, status update endpoints
- **Forbidden**: Request IDs for status queries
- **Forbidden**: Bidirectional communication channels
- **Allowed**: One-way transfer only, no return path

## Context Examples

### Example 1: Content Gap Recommendation

```json
{
  "handoffId": "handoff-2024-01-15-abc123",
  "handoffTimestamp": "2024-01-15T10:30:00Z",
  "handoffVersion": "1.0.0",
  "approvedBy": "user-456",
  "approvalTimestamp": "2024-01-15T10:29:45Z",
  "sourceRequestId": "req-789",
  "sourceAnalysisTimestamp": "2024-01-15T10:25:00Z",
  "governanceStatus": "approved",
  "recommendations": [
    {
      "recommendationId": "rec-001",
      "type": "content_gap",
      "priority": "high",
      "title": "Create comprehensive guide on topic X",
      "description": "Brand has low visibility in AI answers for topic X. Creating comprehensive content would improve visibility.",
      "actionableSteps": [
        "Research topic X thoroughly",
        "Create 3000+ word comprehensive guide",
        "Include structured data markup",
        "Optimize for question-based queries"
      ],
      "topicId": "topic-123",
      "topicName": "Topic X",
      "expectedImpact": "Expected 40% improvement in visibility score for topic X",
      "createdAt": "2024-01-15T10:27:00Z",
      "generatedBy": "strategy_agent"
    }
  ],
  "topicContext": [
    {
      "topicId": "topic-123",
      "topicName": "Topic X",
      "geoScore": 45,
      "visibilityScore": 40,
      "sentimentScore": 75,
      "brandRank": 3,
      "competitorCount": 5,
      "questionCount": 25
    }
  ],
  "metricContext": {
    "overallGeoScore": 52,
    "analysisTimeRange": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-15T00:00:00Z"
    },
    "topicsAnalyzed": 10,
    "questionsAnalyzed": 250,
    "brandsAnalyzed": 1
  },
  "auditTrail": [
    {
      "entryId": "audit-001",
      "timestamp": "2024-01-15T10:29:00Z",
      "event": "handoff_initiated",
      "actor": "user-456"
    },
    {
      "entryId": "audit-002",
      "timestamp": "2024-01-15T10:29:45Z",
      "event": "handoff_approved",
      "actor": "user-456"
    }
  ]
}
```

### Example 2: Structural Improvement Recommendation

```json
{
  "recommendationId": "rec-002",
  "type": "structural_improvement",
  "priority": "medium",
  "title": "Add llms.txt file",
  "description": "Adding llms.txt file would improve AI model understanding of site structure.",
  "actionableSteps": [
    "Create llms.txt file in site root",
    "Include site structure information",
    "List key content pages",
    "Include brand information"
  ],
  "expectedImpact": "Expected 15% improvement in AI model understanding",
  "createdAt": "2024-01-15T10:27:30Z",
  "generatedBy": "strategy_agent"
}
```

## Context Validation

### Validation Rule 1: Schema Compliance
- **Requirement**: Context must match ExecutionHandoffContext schema
- **Validation**: JSON schema validation
- **Rejection**: Invalid schema blocks handoff

### Validation Rule 2: Required Fields
- **Requirement**: All required fields must be present
- **Validation**: Required field check
- **Rejection**: Missing required fields block handoff

### Validation Rule 3: No Executable Content
- **Requirement**: No executable commands in context
- **Validation**: Content scan for forbidden patterns
- **Rejection**: Executable content blocks handoff

### Validation Rule 4: Governance Status
- **Requirement**: Governance status must be "approved" or "approved_with_warnings"
- **Validation**: Status check
- **Rejection**: Rejected recommendations cannot be handed off

## Context Versioning

### Version Format
- **Format**: Semantic versioning (e.g., "1.0.0")
- **Major**: Breaking schema changes
- **Minor**: New optional fields
- **Patch**: Documentation or metadata changes

### Version Compatibility
- **Requirement**: SEO OS must support context version
- **Validation**: Version check before handoff
- **Rejection**: Unsupported version blocks handoff

### Version History
- **1.0.0**: Initial specification
  - Basic context structure
  - Recommendation support
  - Topic and question context
  - Audit trail

## Context Size Limits

### Recommended Limits
- **Maximum recommendations**: 100 per handoff
- **Maximum context size**: 10 MB (JSON)
- **Maximum topic context**: 50 topics
- **Maximum question context**: 500 questions

### Handling Large Contexts
- **Option 1**: Split into multiple handoffs
- **Option 2**: Include only high-priority recommendations
- **Option 3**: Summarize context (lose detail)

## Summary

The ExecutionHandoffContext is:

- ✅ **Read-only**: No executable commands
- ✅ **Context-only**: Informational data only
- ✅ **Immutable**: Frozen at handoff time
- ✅ **Self-contained**: All necessary information included
- ✅ **Validated**: Schema and content validation
- ✅ **Versioned**: Semantic versioning support
- ✅ **Auditable**: Complete audit trail included

