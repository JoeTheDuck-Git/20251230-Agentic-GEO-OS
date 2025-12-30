# Competitor Intelligence Page

## Purpose

The Competitor Intelligence page provides competitive landscape analysis and brand positioning insights. It displays competitor strengths, weaknesses, and competitive gaps derived from AI answer analysis. The page is strictly read-only and intelligence-only.

## Page Route

`/intelligence/competitor-intelligence`

## Data Source

- **Primary Agent**: Intelligence Agent
- **Data Type**: Read-only competitive intelligence from agent outputs

## Page Sections

### A) Header
- Page title: "Competitor Intelligence"
- Subtitle: "Competitive landscape analysis and brand positioning"
- Metadata: Source agent and generation timestamp

### B) Read-Only Notice
- Boundary notice: "Read-only view: Competitive intelligence for analysis only. No execution actions available."

### C) Primary Brand Position
- Displays primary brand name, GEO Score (as percentage), and market position
- GEO Score format: `72%` (consistent with GEO Overview)

### D) Competitors Section
Each competitor card displays:
- **Brand name** and rank
- **GEO Score** (as percentage, e.g., "58%")
  - Tooltip: "Same scoring scale as GEO Overview."
- **Strengths** (exactly 5 items)
  - Green bullet points
  - Derived from AI answer analysis
- **Weaknesses** (exactly 5 items)
  - Orange bullet points
  - Derived from AI answer analysis
- **Helper text**: "Derived from AI answer analysis (snapshot-based)."

### E) Competitive Gaps Section
Section description: "Topic-level deltas based on AI answer signals. Read-only guidance."

Each gap card displays:
- **Topic name**: The topic where the gap exists
- **Gap statement**: Clear statement of the competitive delta (e.g., "TechRival has +15% higher reach")
- **Why it matters** (callout box):
  - Muted background callout with info icon
  - Explains the significance of the gap
  - Responsive: 2 columns on desktop, stacked on mobile
- **Focus** (callout box):
  - Primary-tinted background callout with target icon
  - Provides guidance on what to focus on
  - Responsive: 2 columns on desktop, stacked on mobile
- **Signals** (optional): Chips indicating gap types with tooltips. Uses shared driver/gap definitions from `/docs/ui/glossary-geo.md`.
  - **Reach gap**: See glossary for definition
  - **Position gap**: See glossary for definition
  - **Sentiment gap**: See glossary for definition
  - **Visibility gap**: See glossary for definition

All gap chips use the shared `DriverChip` component with consistent tooltips across the application.

## Read-Only Boundary

### What This Page Does
- ✅ Displays competitive intelligence
- ✅ Shows competitor strengths and weaknesses
- ✅ Identifies competitive gaps
- ✅ Provides topic-level analysis
- ✅ Shows GEO Score with consistent percentage formatting
- ✅ Provides tooltip definitions for gap signals

### What This Page Does NOT Do
- ❌ Execute any actions
- ❌ Trigger agent calls
- ❌ Generate recommendations
- ❌ Publish content
- ❌ Schedule tasks
- ❌ Assign owners
- ❌ Modify data
- ❌ Track execution status

## UI Patterns

### Allowed Patterns
- Read-only data display
- Tooltips for GEO Score clarification
- Tooltips for gap signal definitions
- Bullet lists for strengths/weaknesses
- Signal chips for gap types
- Callout boxes for "Why it matters" and "Focus"
- Helper text for data source attribution
- Section descriptions for clarity
- Responsive grid layouts

### Forbidden Patterns
- Action buttons
- "Generate", "Publish", "Schedule" wording
- Task assignment fields
- Timeline displays
- Owner/assignee fields
- Execution controls
- Status tracking

## Data Structure

The page uses demo data from `/lib/demo/geo-os/competitor-intelligence.ts` with the following structure:

- `meta`: Page metadata, source agent, generation timestamp
- `competitive_landscape`:
  - `primary_brand`: Brand ID, name, GEO Score (0-100), market position
  - `competitors[]`: Array of competitors, each containing:
    - `brand_id`: Unique identifier
    - `brand_name`: Competitor name
    - `geo_score`: GEO Score (0-100, displayed as percentage)
    - `rank`: Competitor rank
    - `strengths`: Array of exactly 5 strength strings
    - `weaknesses`: Array of exactly 5 weakness strings
  - `competitive_gaps[]`: Array of gaps, each containing:
    - `topic_id`: Unique topic identifier
    - `topic_name`: Topic name
    - `gap_statement`: Clear statement of the competitive delta
    - `why_it_matters`: One-line explanation
    - `focus`: One-line guidance
    - `signals`: Optional array of signal strings (e.g., ["Reach gap", "Position gap"])

## GEO Score Formatting

- **Consistency**: GEO Score is displayed as percentage (e.g., "58%") across all sections
- **Tooltip**: Competitor GEO Score includes tooltip: "Same scoring scale as GEO Overview."
- **Format**: Matches GEO Overview page formatting for consistency

## Strengths and Weaknesses

- **Count**: Each competitor has exactly 5 strengths and 5 weaknesses in demo data
- **Source**: Derived from AI answer analysis
- **Display**: Bullet lists with consistent spacing
- **Attribution**: Helper text indicates snapshot-based analysis

## Competitive Gaps

- **Structure**: Each gap includes topic, statement, why it matters, focus, and optional signals
- **Purpose**: Provides topic-level deltas based on AI answer signals
- **Boundary**: Read-only guidance only, no execution actions
- **Callouts**: "Why it matters" and "Focus" are displayed in callout boxes:
  - "Why it matters": Muted background (`bg-muted/40`) with info icon
  - "Focus": Primary-tinted background (`bg-primary/5`) with target icon
  - Responsive: 2 columns on desktop (`md:grid-cols-2`), stacked on mobile
- **Signals**: Optional chips indicate gap types with tooltip definitions. All gap chips use the shared `DriverChip` component with consistent tooltips from `/docs/ui/glossary-geo.md`.

## Agent Attribution

- **Intelligence Agent**: Primary source for all competitive intelligence data
- All data is read-only and snapshot-based

## Future Considerations

When backend integration is added:
- Replace demo data with API calls
- Add loading states
- Add error handling
- Implement snapshot selection
- Add time range filtering
- Maintain strict read-only boundary

