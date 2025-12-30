# Execution Handoff UI

## Overview

This document defines **allowed and forbidden UI patterns** for the Execution Handoff feature in GEO OS. All UI patterns must preserve the read-only, context-only, one-way nature of the handoff and never imply execution or automation.

## Core UI Principles

### Principle 1: Handoff is Explicit Action
- **Requirement**: Handoff requires explicit user action
- **UI Pattern**: Dedicated "Approve Handoff" button or action
- **Forbidden**: Automatic or implicit handoff

### Principle 2: No Execution Implication
- **Requirement**: UI must never imply execution happens in GEO OS
- **UI Pattern**: Clear messaging that execution is external
- **Forbidden**: Buttons or messages that imply execution

### Principle 3: Read-Only Context Display
- **Requirement**: UI shows context that will be transferred
- **UI Pattern**: Preview of ExecutionHandoffContext
- **Forbidden**: Editable context or execution controls

### Principle 4: Clear Boundaries
- **Requirement**: UI clearly shows GEO OS vs SEO OS boundaries
- **UI Pattern**: Visual separation and clear labeling
- **Forbidden**: Blurred boundaries or implied integration

## Allowed UI Patterns

### Pattern 1: Handoff Approval Button

#### Allowed Implementation
```typescript
// ✅ ALLOWED: Explicit approval button
<Button onClick={handleApproveHandoff}>
  Approve Handoff to SEO OS
</Button>
```

#### Allowed Labels
- ✅ "Approve Handoff"
- ✅ "Approve Transfer"
- ✅ "Send to SEO OS"
- ✅ "Transfer Context"
- ✅ "Export for SEO Review"

#### Allowed Placement
- ✅ In recommendation detail view
- ✅ In recommendations list (bulk approval)
- ✅ In handoff review page
- ✅ In settings/preferences (if handoff enabled)

### Pattern 2: Handoff Preview

#### Allowed Implementation
```typescript
// ✅ ALLOWED: Preview of context before handoff
<HandoffPreview context={handoffContext} />
```

#### Allowed Content
- ✅ List of recommendations to be transferred
- ✅ Topic context summary
- ✅ Metric context summary
- ✅ Governance status and warnings
- ✅ Audit trail preview

#### Allowed Interactions
- ✅ Expand/collapse sections
- ✅ Scroll to view content
- ✅ Navigate to recommendation details
- ✅ View full context (read-only)

### Pattern 3: Handoff Status Display

#### Allowed Implementation
```typescript
// ✅ ALLOWED: Status of handoff (not execution)
<HandoffStatus 
  status="transferred" 
  timestamp="2024-01-15T10:30:00Z"
/>
```

#### Allowed Status Values
- ✅ "pending_approval" - Awaiting human approval
- ✅ "approved" - Approved but not yet transferred
- ✅ "transferred" - Successfully transferred to SEO OS
- ✅ "failed" - Transfer failed (technical error)
- ✅ "cancelled" - User cancelled handoff

#### Allowed Information
- ✅ Handoff ID
- ✅ Transfer timestamp
- ✅ Approval timestamp
- ✅ Approved by (user)
- ✅ Transfer method (if applicable)

### Pattern 4: Handoff History

#### Allowed Implementation
```typescript
// ✅ ALLOWED: History of handoffs
<HandoffHistory handoffs={handoffHistory} />
```

#### Allowed Content
- ✅ List of past handoffs
- ✅ Handoff timestamps
- ✅ Number of recommendations transferred
- ✅ Approval metadata
- ✅ Link to audit trail

#### Allowed Interactions
- ✅ View handoff details (read-only)
- ✅ View transferred context (read-only)
- ✅ Export handoff record
- ✅ Navigate to audit trail

### Pattern 5: Handoff Configuration (Optional)

#### Allowed Implementation
```typescript
// ✅ ALLOWED: Enable/disable handoff feature
<HandoffSettings 
  enabled={handoffEnabled}
  onToggle={handleToggleHandoff}
/>
```

#### Allowed Settings
- ✅ Enable/disable handoff feature
- ✅ Default approval behavior (if any)
- ✅ Handoff destination (SEO OS endpoint, if applicable)
- ✅ Notification preferences

#### Allowed Interactions
- ✅ Toggle handoff feature on/off
- ✅ Configure handoff destination
- ✅ Set notification preferences

## Forbidden UI Patterns

### Pattern 1: Execution Buttons

#### Forbidden Implementation
```typescript
// ❌ FORBIDDEN: Execution button
<Button onClick={handleExecute}>
  Execute Recommendation
</Button>
```

#### Forbidden Labels
- ❌ "Execute"
- ❌ "Apply"
- ❌ "Run"
- ❌ "Implement"
- ❌ "Deploy"
- ❌ "Auto-fix"
- ❌ "Apply Changes"
- ❌ "Execute Now"

### Pattern 2: Execution Status

#### Forbidden Implementation
```typescript
// ❌ FORBIDDEN: Execution status in GEO OS
<ExecutionStatus 
  status="executing"
  progress={50}
/>
```

#### Forbidden Status Values
- ❌ "executing" - Implies execution in GEO OS
- ❌ "in_progress" - Implies ongoing execution
- ❌ "completed" - Implies execution completed
- ❌ "failed_execution" - Implies execution failed

### Pattern 3: Feedback from SEO OS

#### Forbidden Implementation
```typescript
// ❌ FORBIDDEN: Status from SEO OS
<SEOExecutionStatus 
  recommendationId="rec-001"
  status="executed"
/>
```

#### Forbidden Content
- ❌ Execution status from SEO OS
- ❌ Progress updates from SEO OS
- ❌ Success/failure notifications from SEO OS
- ❌ Execution results from SEO OS

### Pattern 4: Bidirectional Sync

#### Forbidden Implementation
```typescript
// ❌ FORBIDDEN: Sync with SEO OS
<SyncButton onClick={handleSyncWithSEO}>
  Sync with SEO OS
</Button>
```

#### Forbidden Features
- ❌ Sync button
- ❌ Refresh from SEO OS
- ❌ Update status from SEO OS
- ❌ Pull execution results

### Pattern 5: Execution Controls

#### Forbidden Implementation
```typescript
// ❌ FORBIDDEN: Execution controls
<ExecutionControls 
  onStart={handleStartExecution}
  onPause={handlePauseExecution}
  onStop={handleStopExecution}
/>
```

#### Forbidden Controls
- ❌ Start execution
- ❌ Pause execution
- ❌ Stop execution
- ❌ Retry execution
- ❌ Cancel execution

### Pattern 6: Optimistic UI for Execution

#### Forbidden Implementation
```typescript
// ❌ FORBIDDEN: Optimistic execution UI
<Button onClick={handleExecute}>
  {isExecuting ? "Executing..." : "Execute"}
</Button>
```

#### Forbidden States
- ❌ "Executing..." loading state
- ❌ Progress bar for execution
- ❌ Success animation after "execution"
- ❌ Error message for "execution failure"

### Pattern 7: Execution Preview

#### Forbidden Implementation
```typescript
// ❌ FORBIDDEN: Preview of execution
<ExecutionPreview 
  whatWillExecute={recommendations}
  estimatedTime="5 minutes"
/>
```

#### Forbidden Content
- ❌ "What will execute" preview
- ❌ Estimated execution time
- ❌ Execution plan visualization
- ❌ "This will modify..." warnings

## Allowed Wording

### Handoff Actions
- ✅ "Approve Handoff"
- ✅ "Transfer Context"
- ✅ "Send to SEO OS"
- ✅ "Export for Review"
- ✅ "Prepare Handoff"

### Handoff Status
- ✅ "Handoff Approved"
- ✅ "Context Transferred"
- ✅ "Ready for SEO Review"
- ✅ "Handoff Pending"
- ✅ "Handoff Completed"

### Context Description
- ✅ "Context will be transferred to SEO OS"
- ✅ "Recommendations for SEO review"
- ✅ "Read-only context data"
- ✅ "Informational context only"

### Boundaries
- ✅ "Execution happens in SEO OS"
- ✅ "GEO OS provides context only"
- ✅ "No execution in GEO OS"
- ✅ "One-way transfer only"

## Forbidden Wording

### Execution Phrases
- ❌ "Execute recommendation"
- ❌ "Apply changes"
- ❌ "Run fix"
- ❌ "Implement now"
- ❌ "Deploy changes"
- ❌ "Auto-fix issue"

### Status Phrases
- ❌ "Executing..."
- ❌ "Execution in progress"
- ❌ "Execution completed"
- ❌ "Execution failed"
- ❌ "Retrying execution"

### Integration Phrases
- ❌ "Sync with SEO OS"
- ❌ "Update from SEO OS"
- ❌ "Pull execution status"
- ❌ "Bidirectional sync"

### Implication Phrases
- ❌ "This will execute..."
- ❌ "Changes will be applied..."
- ❌ "This will modify..."
- ❌ "Execution will start..."

## UI Component Examples

### Allowed: Handoff Approval Component

```typescript
// ✅ ALLOWED: Handoff approval component
function HandoffApproval({ recommendations, onApprove }) {
  return (
    <div className="handoff-approval">
      <h3>Approve Handoff to SEO OS</h3>
      <p>
        {recommendations.length} recommendations will be transferred 
        as read-only context to SEO OS for human review.
      </p>
      <p className="disclaimer">
        Execution happens in SEO OS, not in GEO OS.
      </p>
      <HandoffPreview recommendations={recommendations} />
      <Button onClick={onApprove}>
        Approve Handoff
      </Button>
    </div>
  );
}
```

### Allowed: Handoff Status Component

```typescript
// ✅ ALLOWED: Handoff status component
function HandoffStatus({ handoff }) {
  return (
    <div className="handoff-status">
      <StatusBadge status={handoff.status} />
      <p>Handoff ID: {handoff.handoffId}</p>
      <p>Transferred: {handoff.transferredAt}</p>
      <p>Approved by: {handoff.approvedBy}</p>
      <p className="note">
        Context transferred to SEO OS. Execution status 
        is tracked in SEO OS, not in GEO OS.
      </p>
    </div>
  );
}
```

### Forbidden: Execution Component

```typescript
// ❌ FORBIDDEN: Execution component
function ExecutionControl({ recommendation, onExecute }) {
  return (
    <div className="execution-control">
      <Button onClick={onExecute}>
        Execute Recommendation
      </Button>
      {isExecuting && (
        <ProgressBar progress={executionProgress} />
      )}
    </div>
  );
}
```

## UI Flow Examples

### Allowed: Handoff Flow

1. User views recommendations
2. User clicks "Approve Handoff" button
3. Handoff preview modal appears
4. User reviews context to be transferred
5. User clicks "Confirm Approval"
6. Handoff is transferred
7. Status shows "Transferred"
8. User can view handoff history

### Forbidden: Execution Flow

1. ❌ User views recommendations
2. ❌ User clicks "Execute" button
3. ❌ Execution starts in GEO OS
4. ❌ Progress bar shows execution progress
5. ❌ Success message shows "Execution completed"

## Visual Design Guidelines

### Allowed Visual Patterns
- ✅ Clear separation between GEO OS and SEO OS
- ✅ "Handoff" or "Transfer" iconography
- ✅ Read-only indicators (lock icons, etc.)
- ✅ Context preview with expand/collapse
- ✅ Audit trail visualization

### Forbidden Visual Patterns
- ❌ Execution buttons (play icons, etc.)
- ❌ Progress bars for execution
- ❌ Success animations for execution
- ❌ Sync indicators (bidirectional arrows)
- ❌ Status badges for execution

## Accessibility

### Required Accessibility Features
- ✅ Screen reader labels for handoff actions
- ✅ Keyboard navigation for approval flow
- ✅ Focus management in modals
- ✅ ARIA labels for status information

### Forbidden Accessibility Patterns
- ❌ Auto-focus on execution buttons
- ❌ Auto-submit forms
- ❌ Hidden execution triggers

## Summary

### Allowed UI Patterns
- ✅ Explicit approval buttons
- ✅ Handoff preview
- ✅ Handoff status (transfer status, not execution)
- ✅ Handoff history
- ✅ Handoff configuration (optional)

### Forbidden UI Patterns
- ❌ Execution buttons
- ❌ Execution status
- ❌ Feedback from SEO OS
- ❌ Bidirectional sync
- ❌ Execution controls
- ❌ Optimistic execution UI
- ❌ Execution preview

### Key Principles
- ✅ Handoff is explicit action
- ✅ No execution implication
- ✅ Read-only context display
- ✅ Clear boundaries
- ✅ One-way transfer only

