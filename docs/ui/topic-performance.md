# Topic Performance Page

## Purpose

The Topic Performance page provides topic-level Reach and Position analysis for all tracked topics. It displays competitive leaderboards, question patterns, and example questions for each topic.

## Page Route

`/intelligence/topic-performance`

## Data Source

- **Primary Agent**: Intelligence Agent
- **Data Type**: Read-only topic performance snapshots

## Page Sections

### A) Header
- Page title: "Topic Performance"
- Subtitle: "Topic-level Reach and Position analysis (read-only)."
- Metadata: Brand, Region, Time Range, Snapshot

### B) Read-only Banner
- Clear statement: "Topic performance is for analysis only. No execution actions available."

### C) Filters Row
- Brand (read-only display)
- Region (read-only display)
- Time Range (read-only display)
- Topic Search (client-side filter only)

### D) Two-Column Layout

#### Left Panel: Topic List
- Table/list of topics
- Columns: Rank, Topic name, Visibility Score (%)
- Each row is selectable
- Selected row highlights

#### Right Panel: Topic Detail
- Topic title
- Visibility Score (large display)
- Two-column leaderboards:
  - Reach Leaderboard (brands with %)
  - Position Leaderboard (brands with %)
- Top Question Patterns (Top 5):
  - Uses PatternChips component
  - Shows top 5 patterns with hover tooltips
  - Helper text: "Hover a pattern to see example questions."
- Topic Question Examples:
  - Shows 1-3 example questions

## Read-Only Boundary

### What This Page Does
- ✅ Displays topic-level performance metrics
- ✅ Shows competitive leaderboards
- ✅ Displays question patterns using shared Pattern Library
- ✅ Allows client-side topic search
- ✅ Provides topic selection and detail view

### What This Page Does NOT Do
- ❌ Execute any actions
- ❌ Trigger agent calls
- ❌ Modify data
- ❌ Schedule or assign tasks
- ❌ Track execution status

## Data Structure

The page uses demo data from `/lib/demo/geo-os/topic-performance.ts` with the following structure:

- `meta`: Brand, region, time range, snapshot, generatedAt
- `topics[]`: Array of topics, each containing:
  - `topicId`: Unique identifier
  - `name`: Topic name
  - `visibilityScorePct`: Visibility score as percentage
  - `reach`: Array of { brand, pct } objects
  - `position`: Array of { brand, pct } objects
  - `topPatternIds`: Array of pattern IDs (length >= 5) from canonical pattern library
  - `questionExamples`: Array of example question strings (1-3)

## Agent Attribution

- **Intelligence Agent**: Primary source for all topic performance data
- All data is read-only and snapshot-based

## Related Pages

- **GEO Overview** (`/intelligence/geo-overview`): Shows Top Topics summary with CTA link to this page
- **Opportunity Analysis** (`/decisions/opportunity-analysis`): Uses pattern coverage for opportunity identification
- **Execution Briefs** (`/execution-prep/execution-briefs`): Uses pattern IDs to guide content structure

## Pattern Library Integration

This page uses the shared Pattern Library (`/lib/geo/patternLibrary.ts`) and PatternChips component (`/components/geo/PatternChips.tsx`) to display question patterns consistently across the application.

For pattern definitions, see `/docs/ui/glossary-geo.md`.

