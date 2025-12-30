# Execution Briefs Page

## Purpose

The Execution Briefs page provides execution-ready context derived from approved decision prompts. These briefs contain only context fields needed for execution planning, with no action plans, timelines, or KPI promises. The page is strictly read-only and context-only.

## Page Route

`/execution-prep/execution-briefs`

## Data Source

- **Primary Agent**: Strategy Agent
- **Supporting Agent**: Governance Agent (for approval status)
- **Data Type**: Read-only execution context from agent outputs

## Page Sections

### A) Header
- Page title: "Execution Briefs"
- Subtitle: "Execution-ready context derived from approved decision prompts. Read-only."

### B) List + Detail Layout
- **Left Panel**: List of available briefs
  - Clickable brief titles
  - Warning indicator for non-approved briefs
  - Active state highlighting
- **Right Panel**: Detailed brief view
  - All canonical context fields
  - Governance status and notes
  - Source attribution line
  - Navigation CTAs

### C) Brief Detail Sections (in order)
1. **Title and Governance**
   - Brief title
   - Source line: "Source: Strategy Agent · Validated: Governance Agent"
   - Approved/Warning badge
   - Governance notes (if warning)

2. **Objective**
   - Clear statement of execution objective

3. **Target Audience**
   - Description of intended audience

4. **Question Patterns**
   - Pattern chips from the canonical pattern library (3-6 patterns displayed)
   - Tooltips on chips show example questions for each pattern
   - Uses shared PatternChips component

5. **Competitive Context**
   - Competitive landscape information
   - Market positioning context
   - Uses qualitative or range-based language (avoids precise KPI numbers unless clearly labeled as snapshot-based directional signals)

6. **Coverage Requirements**
   - Bullet list of content coverage needs
   - Uses depth/format descriptors (e.g., "Long-form technical guide", "FAQ-style section")
   - Avoids word-count specifications

7. **Tone Guidelines**
   - Bullet list of tone and style guidance

8. **Constraints**
   - Helper text: "Policy constraints (not tasks)."
   - Two-column layout:
     - **Required Constraints**: Required elements (green checkmarks)
     - **Prohibited Constraints**: Forbidden elements (red X marks)

9. **Navigation CTAs**
   - "View Content Planning →" - Links to Content Planning page with `?brief=<brief_id>`
   - "Back to Actionable Items" - Links to Actionable Items page

10. **Boundary Copy**
    - Footer note: "Context only. No content is generated, scheduled, or published here."

## Query Parameter Support

### ?brief=<brief_id>
- Automatically selects the brief matching `brief_id`
- Priority: Higher than `?from` parameter
- Shows non-blocking notice if brief not found
- Notice auto-dismisses after 5 seconds
- Falls back to first brief if no match

### ?from=<item_id>
- Automatically selects the brief matching `from_item_id`
- Priority: Lower than `?brief` parameter
- Shows non-blocking notice if brief not found
- Notice auto-dismisses after 5 seconds
- Falls back to first brief if no match

## Navigation Handoffs

### To Content Planning
- CTA: "View Content Planning →"
- Link: `/execution-prep/content-planning?brief=<brief_id>`
- Navigation-only action (no data transfer)

### To Actionable Items
- CTA: "Back to Actionable Items"
- Link: `/decisions/actionable-items`
- Navigation-only action

## Read-Only Boundary

### What This Page Does
- ✅ Displays execution context from Strategy Agent
- ✅ Shows governance approval status
- ✅ Provides navigation from Actionable Items page
- ✅ Provides navigation to Content Planning page
- ✅ Lists all available briefs
- ✅ Shows source attribution
- ✅ Navigation-only CTAs (no execution)

### What This Page Does NOT Do
- ❌ Generate content
- ❌ Schedule publishing
- ❌ Execute actions
- ❌ Trigger agent calls
- ❌ Show action plans or timelines
- ❌ Display KPI promises or target scores
- ❌ Show resource assignments
- ❌ Display project management semantics
- ❌ Present precise KPI numbers (uses qualitative language instead)

## Strictly Forbidden Fields

The following fields are explicitly removed from Execution Briefs:

- ❌ Action Plan (steps, order, dependencies)
- ❌ Timeline estimates
- ❌ Target GEO scores
- ❌ Expected outcomes (score improvements, % increases)
- ❌ Resources needed
- ❌ Task assignments
- ❌ Due dates
- ❌ Execution status
- ❌ Progress tracking
- ❌ Word-count specifications

## Allowed Context Fields Only

Execution Briefs contain only these canonical fields:

- ✅ Objective
- ✅ Target Audience
- ✅ Question Patterns
- ✅ Competitive Context (qualitative language)
- ✅ Coverage Requirements (format/depth descriptors, no word counts)
- ✅ Tone Guidelines
- ✅ Constraints (policy constraints, not tasks)
- ✅ Governance Status

## Language Guidelines

### Competitive Context
- Avoid precise KPI-like numbers unless clearly labeled as snapshot-based directional signals
- Prefer qualitative language: "higher presence", "limited presence", "significantly higher", "above industry average"
- Use range-based language when appropriate: "notable improvement", "lower levels"

### Coverage Requirements
- Remove word-count specs (e.g., "5,000+ words")
- Use depth/format descriptors instead:
  - "Long-form technical guide"
  - "FAQ-style section"
  - "Comprehensive guide"
  - "Short-form overview"

### Constraints
- Labeled as "Required Constraints" and "Prohibited Constraints" (not "Must Do" / "Must Not Do")
- Helper text clarifies: "Policy constraints (not tasks)"
- Emphasizes policy/guidance nature, not task completion

## UI Patterns

### Allowed Patterns
- List + detail layout
- Read-only context display
- Badges for governance status
- Chips for question patterns
- Two-column constraints layout
- Source attribution
- Navigation links (navigation-only, no execution)
- Navigation CTAs with clear "View" or "Back" wording

### Forbidden Patterns
- Action buttons
- Timeline displays
- Progress indicators
- KPI metrics
- Resource assignments
- Task lists
- Execution controls
- Publishing controls
- "Generate", "Execute", "Publish", "Schedule", "Autopilot" wording
- Word-count specifications
- Precise KPI numbers (unless clearly labeled as snapshot-based)

## Data Structure

The page uses demo data from `/lib/demo/geo-os/execution-briefs.ts` with the following structure:

- `meta`: Page metadata, snapshot ID, source agents
- `execution_briefs[]`: Array of briefs, each containing:
  - `brief_id`: Unique identifier
  - `from_item_id`: Link to originating actionable item
  - `title`: Brief title
  - `objective`: Execution objective
  - `target_audience`: Audience description
  - `pattern_ids`: Array of pattern IDs from the canonical pattern library (see `/docs/ui/glossary-geo.md`)
  - `competitive_context`: Competitive landscape text (qualitative language)
  - `coverage_requirements`: Array of requirement strings (format/depth descriptors)
  - `tone_guidelines`: Array of guideline strings
  - `constraints`: Object with `must_do` and `must_not_do` arrays (labeled as Required/Prohibited Constraints)
  - `governance`: Object with `approved` (boolean) and optional `notes`

## Agent Attribution

- **Strategy Agent**: Primary source for all execution briefs (displayed in source line)
- **Governance Agent**: Provides approval status and warnings (displayed in source line as "Validated")

## Future Considerations

When backend integration is added:
- Replace demo data with API calls
- Add loading states
- Add error handling
- Implement snapshot selection
- Add time range filtering
