# GEO Overview Page

## Purpose

The GEO Overview page provides a high-level dashboard view of brand performance in AI-generated answers. It displays key metrics, competitive positioning, and insights to help users understand their overall GEO status at a glance.

## Page Route

`/intelligence/geo-overview`

## Data Source

- **Primary Agent**: Intelligence Agent
- **Supporting Agent**: Reasoning Agent (for "Why this changed" insights)
- **Data Type**: Read-only snapshots from agent outputs

## Page Sections

### A) Page Header
- Page title: "GEO Overview"
- Subtitle describing the page purpose
- Compact metadata row: "Questions: X · Topics: Y · Brands: Z · Last updated: <date>"
- **Note**: Snapshot ID is displayed in Topbar only (single source of truth)

### B) Page-Level Source Note
- Small text indicating all signals come from Intelligence Agent (read-only)
- Replaces individual "Source" labels on KPI cards to reduce visual noise

### C) KPI Row (4 Cards)
1. **GEO Score**: Overall percentage score (0-100%)
   - Tooltip: "Composite GEO performance score based on visibility and sentiment across tracked questions."
2. **Reach**: Percentage of AI answers where brand appears (0-100%)
   - Tooltip: "Share of tracked AI answers where your brand is mentioned at least once."
3. **Avg Position**: Average position in AI answers (lower is better)
   - Tooltip: "Average mention rank in answers where your brand appears (lower is better)."
4. **Sentiment**: Distribution of positive/neutral/negative mentions with visual progress bars
   - Includes one-line summary: "Predominantly positive sentiment with minimal negative mentions."

**KPI Tooltips**: Each KPI (GEO Score, Reach, Avg Position) includes an inline info icon (ⓘ) with a tooltip that provides concise definition and calculation context. Tooltips use shadcn/ui Tooltip component for consistent styling and accessibility.

### E) Top Question Patterns
- Card displaying top 3 question patterns
- Uses shared PatternChips component with tooltips showing example questions
- Patterns are from the canonical pattern library (see `/docs/ui/glossary-geo.md`)

### F) Top Topics Summary
- Compact card showing top 3-5 topics
- Displays topic name and visibility score %
- CTA link: "View all topics →" navigates to `/intelligence/topic-performance`
- Replaces any previous detailed topic performance drill-down
- Topics are read-only and for summary purposes only

### D) Summary Panels
- **Visibility Summary**: 2-3 lines describing visibility metrics and trends
- **Sentiment Summary**: 2-3 lines describing sentiment distribution and health

### E) Your Brand Rank + Competitors
- **Your Brand Rank**: Displays primary brand rank and visibility score in a highlighted section
- **Competitors Table**: Sortable table showing competitors only (excluding primary brand)
- Columns: Brand name, Visibility Score
- Sorting: By brand name or visibility score (ascending/descending)
- **Note**: Sorting is view-only and does not trigger agent calls

### G) Why This Changed (Collapsible - Default Collapsed)
- Collapsed by default showing one-line preview
- Expandable section explaining recent changes
- Source: Reasoning Agent
- Provides context for score improvements or declines

### H) Footer Notice
- Shortened copy: "Read-only intelligence. No execution or automation."
- Reduces visual noise while maintaining clear boundary

## Read-Only Boundary

### What This Page Does
- ✅ Displays intelligence metrics
- ✅ Shows competitive positioning
- ✅ Provides insights and summaries
- ✅ Allows table sorting (view-only)
- ✅ Provides KPI tooltips for metric definitions

### What This Page Does NOT Do
- ❌ Execute any actions
- ❌ Trigger agent calls
- ❌ Publish content
- ❌ Generate recommendations
- ❌ Modify data
- ❌ Track execution status

## UI Patterns

### Allowed Patterns
- View-only data display
- Sortable tables (client-side only)
- Collapsible sections (default collapsed)
- Simple progress bars for sentiment
- Card-based layout
- Compact metadata display
- Tooltips for KPI definitions (info icons)

### Forbidden Patterns
- Execution buttons
- "Generate" or "Execute" wording
- Publishing controls
- Autopilot status
- Action triggers
- Status tracking

## Data Structure

The page uses demo data from `/lib/demo/geo-os/geo-overview.ts` with the following structure:

- `meta`: Page metadata, snapshot ID, source agents
- `geo_score`: Overall score (0-100, percentage scale)
- `visibility`: Reach (0-1) and average position
- `sentiment`: Distribution of positive/neutral/negative (0-1 each)
- `your_brand_rank`: Primary brand rank and visibility score
- `top_competitors`: Array of competitor brands with visibility scores (excludes primary brand)
- `why_it_changed`: Optional summary from Reasoning Agent with preview text
- `metadata`: Questions count, topics count, brands count, last updated timestamp
- `topTopics`: Array of top topics with topicId, name, visibilityScorePct, and topPatternIds (for summary display)

## Information Hierarchy

### Visual Hierarchy
1. **Primary**: KPI cards (GEO Score, Reach, Position, Sentiment)
2. **Secondary**: Summary panels (Visibility, Sentiment)
3. **Tertiary**: Competitive ranking (Your brand + Competitors)
4. **Supporting**: Why this changed (collapsed by default)

### Reduced Complexity
- Removed duplicate snapshot display (Topbar is single source of truth)
- Removed individual source labels from KPI cards
- Added page-level source attribution
- Separated primary brand from competitors table
- Default collapsed "Why this changed" section
- Shortened footer notice
- Added KPI tooltips for clarity without visual clutter

## Agent Attribution

All metrics come from Intelligence Agent (displayed at page level):
- GEO Score: Intelligence Agent
- Visibility: Intelligence Agent
- Sentiment: Intelligence Agent
- Why This Changed: Reasoning Agent (when expanded)

This ensures transparency while reducing visual clutter.

## Related Pages

- **Topic Performance** (`/intelligence/topic-performance`): Detailed topic-level analysis with leaderboards and pattern coverage (linked from Top Topics CTA)

## Future Considerations

When backend integration is added:
- Replace demo data with API calls
- Add loading states
- Add error handling
- Implement snapshot selection (via Topbar)
- Add time range filtering
