# Content Planning Page

## Purpose

The Content Planning page provides planning guidance derived from execution briefs. These plans contain only planning context and guidance, with no task assignments, scheduling, or status tracking. The page is strictly read-only and context-only.

## Page Route

`/execution-prep/content-planning`

## Data Source

- **Primary Agent**: Strategy Agent
- **Supporting Agent**: Governance Agent (for approval status)
- **Data Type**: Read-only planning guidance from agent outputs

## Page Sections

### A) Header
- Page title: "Content Planning"
- Subtitle: "Planning guidance derived from execution briefs. Context-only — no scheduling or task assignment."

### B) List + Detail Layout
- **Left Panel**: List of available content plans
  - Clickable plan titles
  - Content type badges
  - Patterns count (compact display)
  - Warning indicator for non-approved plans
  - Active state highlighting
- **Right Panel**: Detailed plan view
  - All planning guidance fields
  - Pattern coverage section (patterns count + top 3 pattern chips)
  - Governance status and notes
  - Source attribution line
  - Navigation CTA

### C) Plan Detail Sections (in order)
1. **Title and Governance**
   - Plan title (brief title)
   - Source line: "Source: Strategy Agent · Validated: Governance Agent"
   - Content type badge
   - Approved/Warning badge
   - Governance notes (if warning)

2. **Patterns**
   - Patterns count: Total number of question patterns to address
   - Top 3 pattern chips: Pattern chips from the canonical pattern library (see `/docs/ui/glossary-geo.md`)
   - Tooltips on chips show example questions for each pattern
   - Patterns displayed for planning scope (human-owned planning, read-only display)

3. **Planning Guidance**
   - **Focus**: Primary planning focus area
   - **Tone Notes**: Tone and style guidance
   - **Structure Notes**: Structural recommendations
   - **Constraints**: Planning constraints and requirements

4. **Navigation CTA**
   - "View Execution Brief →" - Links to Execution Briefs page with `?brief=<brief_id>`

5. **Boundary Copy**
   - Footer note: "Planning guidance only. No content is scheduled, assigned, or published here."

## Query Parameter Support

### ?brief=<brief_id>
- Automatically selects the plan matching `brief_id`
- Shows non-blocking notice if plan not found
- Notice auto-dismisses after 5 seconds
- Falls back to first plan if no match

## Navigation Handoffs

### To Execution Briefs
- CTA: "View Execution Brief →"
- Link: `/execution-prep/execution-briefs?brief=<brief_id>`
- Navigation-only action (no data transfer)

## Read-Only Boundary

### What This Page Does
- ✅ Displays planning guidance from Strategy Agent
- ✅ Shows governance approval status
- ✅ Provides navigation from Execution Briefs page
- ✅ Lists all available plans
- ✅ Shows source attribution
- ✅ Navigation-only CTAs (no execution)

### What This Page Does NOT Do
- ❌ Schedule content
- ❌ Assign tasks
- ❌ Track status
- ❌ Generate content
- ❌ Execute actions
- ❌ Trigger agent calls
- ❌ Show timelines or deadlines
- ❌ Display task assignments
- ❌ Show project management semantics

## Strictly Forbidden Fields

The following fields are explicitly removed from Content Planning:

- ❌ Owner/assignee
- ❌ Effort estimates
- ❌ Status tracking (Planned, In Review, Draft, etc.)
- ❌ Timeline/deadlines
- ❌ Task lists
- ❌ Progress tracking
- ❌ Updated timestamps (for status tracking)
- ❌ Content calendars
- ❌ Roadmaps with timelines

## Allowed Context Fields Only

Content Plans contain only these canonical fields:

- ✅ Plan ID and Brief ID
- ✅ Brief title
- ✅ Content type
- ✅ Planning guidance (focus, tone_notes, structure_notes, constraints)
- ✅ Governance Status

## UI Patterns

### Allowed Patterns
- List + detail layout
- Read-only context display
- Badges for content type and governance status
- Source attribution
- Navigation links (navigation-only, no execution)
- Navigation CTAs with clear "View" wording

### Forbidden Patterns
- Action buttons
- Status indicators
- Timeline displays
- Progress indicators
- Task assignments
- Owner/assignee fields
- Effort estimates
- Execution controls
- Publishing controls
- "Generate", "Write", "Publish", "Schedule", "Autopilot" wording
- Task management UI

## Data Structure

The page uses demo data from `/lib/demo/geo-os/content-planning.ts` with the following structure:

- `meta`: Page metadata, snapshot ID, source agents
- `content_plans[]`: Array of plans, each containing:
  - `plan_id`: Unique identifier
  - `brief_id`: Link to originating execution brief
  - `brief_title`: Brief title
  - `content_type`: Content type (landing, faq, blog, etc.)
  - `patternCoverage`: Object with `patternsCount` and `topPatternIds` (array of pattern IDs from canonical library)
  - `planning_guidance`: Object with `focus`, `tone_notes`, `structure_notes`, `constraints`
  - `governance`: Object with `approved` (boolean) and optional `notes`

## Agent Attribution

- **Strategy Agent**: Primary source for all content plans (displayed in source line)
- **Governance Agent**: Provides approval status and warnings (displayed in source line as "Validated")

## Future Considerations

When backend integration is added:
- Replace demo data with API calls
- Add loading states
- Add error handling
- Implement snapshot selection
- Add time range filtering

