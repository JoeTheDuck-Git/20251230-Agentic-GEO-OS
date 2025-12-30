# Forbidden UI Patterns

## Overview

This document explicitly defines UI patterns, phrases, and interactions that are **FORBIDDEN** in the Agentic GEO OS UI. These patterns prevent future misuse and ensure system safety.

## Forbidden Button Labels

### Execution-Related Buttons
- ❌ "Execute"
- ❌ "Apply"
- ❌ "Run"
- ❌ "Auto-fix"
- ❌ "Implement"
- ❌ "Deploy"
- ❌ "Activate"
- ❌ "Enable"
- ❌ "Start"
- ❌ "Go"

### Modification-Related Buttons
- ❌ "Edit"
- ❌ "Modify"
- ❌ "Change"
- ❌ "Update"
- ❌ "Save" (for agent outputs)
- ❌ "Adjust"
- ❌ "Override"
- ❌ "Customize"

### Action-Related Buttons
- ❌ "Fix Now"
- ❌ "Resolve"
- ❌ "Complete"
- ❌ "Finish"
- ❌ "Done"
- ❌ "Submit" (for execution)
- ❌ "Confirm" (for execution)

### Generation-Related Buttons
- ❌ "Generate"
- ❌ "Create"
- ❌ "Add"
- ❌ "New"
- ❌ "Refresh" (for agent outputs)
- ❌ "Recompute"
- ❌ "Recalculate"

## Forbidden UI Patterns

### Pattern 1: Execution Buttons
**Forbidden**: Any button that implies execution of recommendations
**Example**: "Execute Recommendation", "Apply Changes", "Run Fix"
**Rationale**: Execution is outside UI scope
**Safe Alternative**: "Review Recommendation" (navigation only)

### Pattern 2: Status Toggles
**Forbidden**: Toggles or checkboxes that mark items as "complete" or "in progress"
**Example**: Checkbox to mark recommendation as "Done"
**Rationale**: Status tracking is outside UI scope
**Safe Alternative**: Display status from external system (read-only)

### Pattern 3: Auto-Apply Patterns
**Forbidden**: "Apply to all" or "Auto-apply" options
**Example**: "Apply this recommendation to all topics"
**Rationale**: No automatic execution allowed
**Safe Alternative**: Show recommendation scope (read-only)

### Pattern 4: Optimistic UI
**Forbidden**: UI that shows "Applying..." or "Executing..." states
**Example**: Loading spinner with "Applying recommendation..."
**Rationale**: UI never executes, so no execution states
**Safe Alternative**: Show "Viewing recommendation details..."

### Pattern 5: Success Messages for Non-Actions
**Forbidden**: Success messages for actions that didn't execute
**Example**: "Recommendation applied successfully" (when nothing was executed)
**Rationale**: Misleading, implies execution happened
**Safe Alternative**: "Recommendation reviewed" or no message

### Pattern 6: Edit-In-Place
**Forbidden**: Inline editing of agent outputs
**Example**: Clicking on GEO Score to edit it
**Rationale**: Agent outputs are read-only
**Safe Alternative**: Show score details (read-only)

### Pattern 7: Drag-and-Drop Reordering
**Forbidden**: Drag-and-drop to reorder recommendations or priorities
**Example**: Dragging recommendations to change priority
**Rationale**: Priorities are agent-determined, not user-editable
**Safe Alternative**: Display priorities (read-only)

### Pattern 8: Bulk Actions
**Forbidden**: "Select all" and bulk execute/modify
**Example**: "Select all recommendations and apply"
**Rationale**: No bulk execution allowed
**Safe Alternative**: Display all recommendations (read-only)

### Pattern 9: Auto-Save
**Forbidden**: Auto-saving user modifications to agent outputs
**Example**: Auto-saving edited recommendation text
**Rationale**: Agent outputs cannot be modified
**Safe Alternative**: No editing, no auto-save

### Pattern 10: Confirmation Dialogs for Non-Actions
**Forbidden**: "Are you sure you want to execute?" dialogs
**Example**: Confirmation dialog before "applying" recommendation
**Rationale**: No execution, so no confirmation needed
**Safe Alternative**: No confirmation dialogs (no execution to confirm)

## Forbidden Phrases in UI Copy

### Execution Phrases
- ❌ "Execute this recommendation"
- ❌ "Apply changes"
- ❌ "Run this fix"
- ❌ "Implement now"
- ❌ "Auto-fix this issue"
- ❌ "Deploy changes"
- ❌ "Activate recommendation"

### Modification Phrases
- ❌ "Edit this recommendation"
- ❌ "Modify this score"
- ❌ "Change priority"
- ❌ "Update metrics"
- ❌ "Adjust settings"
- ❌ "Override agent decision"

### Generation Phrases
- ❌ "Generate new questions"
- ❌ "Create new analysis"
- ❌ "Refresh data"
- ❌ "Recalculate scores"
- ❌ "Trigger new analysis"

### Status Phrases
- ❌ "Mark as complete"
- ❌ "Resolve this gap"
- ❌ "Finish this task"
- ❌ "Done"
- ❌ "In progress"

## Safe Alternative Phrases

### Instead of Execution
- ✅ "Review recommendation"
- ✅ "View details"
- ✅ "See action plan"
- ✅ "Consider this suggestion"

### Instead of Modification
- ✅ "View calculation"
- ✅ "See methodology"
- ✅ "Show details"
- ✅ "Display breakdown"

### Instead of Generation
- ✅ "View questions"
- ✅ "See analysis"
- ✅ "Display data"
- ✅ "Show results"

### Instead of Status
- ✅ "View status"
- ✅ "See current state"
- ✅ "Display information"
- ✅ "Review details"

## Forbidden Interaction Patterns

### Pattern 1: Click-to-Execute
**Forbidden**: Clicking on recommendation executes it
**Rationale**: No execution in UI
**Safe Alternative**: Clicking navigates to detailed view

### Pattern 2: Hover-to-Preview-Action
**Forbidden**: Hovering shows "Click to execute" tooltip
**Rationale**: No execution implied
**Safe Alternative**: Hover shows "Click to view details"

### Pattern 3: Keyboard Shortcuts for Actions
**Forbidden**: Keyboard shortcuts like Cmd+E for "Execute"
**Rationale**: No execution actions
**Safe Alternative**: Keyboard shortcuts for navigation only

### Pattern 4: Right-Click Context Menus with Actions
**Forbidden**: Right-click menu with "Execute", "Edit", "Delete"
**Rationale**: No modification or execution
**Safe Alternative**: Right-click menu with "View details", "Copy", "Navigate"

### Pattern 5: Form Inputs for Agent Outputs
**Forbidden**: Input fields to edit agent outputs
**Rationale**: Agent outputs are read-only
**Safe Alternative**: Display only, no inputs

### Pattern 6: Progress Indicators for Execution
**Forbidden**: Progress bars showing "Executing recommendation..."
**Rationale**: No execution happens
**Safe Alternative**: No progress indicators (no execution to track)

### Pattern 7: Undo/Redo for Actions
**Forbidden**: Undo/redo functionality for "executed" actions
**Rationale**: No actions to undo
**Safe Alternative**: No undo/redo (no actions performed)

### Pattern 8: Action History
**Forbidden**: "Recent actions" showing executed items
**Rationale**: No actions executed in UI
**Safe Alternative**: "Recent views" showing viewed items

## Forbidden Visual Patterns

### Pattern 1: Green Checkmarks for Execution
**Forbidden**: Green checkmark indicating "executed" or "applied"
**Rationale**: No execution, so no success indicators
**Safe Alternative**: Checkmark only for "acknowledged" (read-only state)

### Pattern 2: Loading Spinners for Execution
**Forbidden**: Spinner with "Executing..." text
**Rationale**: No execution happens
**Safe Alternative**: Spinner only for data loading (if needed)

### Pattern 3: Success Animations
**Forbidden**: Success animation after "applying" recommendation
**Rationale**: No execution, so no success
**Safe Alternative**: No success animations

### Pattern 4: Disabled States Implying Future Execution
**Forbidden**: Disabled "Execute" button (implying it could be enabled)
**Rationale**: Execution is never available
**Safe Alternative**: No execute button at all

### Pattern 5: Action Buttons in Cards
**Forbidden**: "Apply" or "Execute" buttons in recommendation cards
**Rationale**: No execution buttons allowed
**Safe Alternative**: "View details" link only

## Agent Safety Mapping

### UI Never Calls Agents
**Forbidden Pattern**: UI button that calls agent API
**Example**: "Analyze Now" button that triggers Intelligence Agent
**Rationale**: Agents are triggered through separate process
**Enforcement**: UI has no agent API access

### UI Never Modifies Agent State
**Forbidden Pattern**: UI that changes agent configuration
**Example**: Toggle to enable/disable Reasoning Agent
**Rationale**: Agent state is managed separately
**Enforcement**: UI has read-only access

### UI Never Triggers Autopilot
**Forbidden Pattern**: UI button to enable Autopilot
**Example**: "Enable Autopilot" toggle
**Rationale**: Autopilot is governance-controlled
**Enforcement**: UI has no Autopilot controls

### UI Never Bypasses Governance
**Forbidden Pattern**: UI that skips governance validation
**Example**: "Force apply" button that bypasses validation
**Rationale**: Governance ensures safety
**Enforcement**: UI cannot bypass governance

## Copy Guidelines

### Required Attribution
- ✅ "Generated by [Agent Name]"
- ✅ "Computed by [Agent Name]"
- ✅ "Analyzed by [Agent Name]"
- ✅ "Recommended by [Agent Name]"

### Required Disclaimers
- ✅ "Recommendations are for review only"
- ✅ "Execution happens outside this system"
- ✅ "This is a read-only view"
- ✅ "No actions are executed in this UI"

### Forbidden Disclaimers
- ❌ "Click to execute"
- ❌ "Apply changes"
- ❌ "This will modify..."
- ❌ "Changes will be saved"

## Future-Proofing

### If Execution is Added Later
- Execution must be in separate system
- UI remains read-only for agent outputs
- Execution requires explicit approval process
- UI shows execution status from external system (read-only)

### If Autopilot is Added Later
- Autopilot controls are outside UI
- UI shows Autopilot status (read-only)
- UI does not trigger Autopilot
- Autopilot is governance-controlled

## Summary

### Forbidden Categories
- **Execution**: 10+ forbidden button labels
- **Modification**: 7+ forbidden button labels
- **Generation**: 6+ forbidden button labels
- **Status**: 5+ forbidden button labels

### Forbidden Patterns
- **10 Major Patterns**: Execution buttons, status toggles, auto-apply, etc.
- **8 Interaction Patterns**: Click-to-execute, hover-to-preview-action, etc.
- **5 Visual Patterns**: Green checkmarks, loading spinners, etc.

### Safety Guarantees
- UI never calls agents
- UI never modifies agent state
- UI never triggers Autopilot
- UI never bypasses governance

