# Measurement Stub Pages

## Purpose

The Measurement pages provide read-only GA4-like measurement data for content performance and traffic engagement. These pages are strictly read-only and do not feed back into strategy, decisions, or briefs. They serve as measurement snapshots only.

## Pages

### 1. Content Performance
**Route**: `/measurement/content-performance`

Displays content-level performance metrics derived from GA4-like data:
- Pageviews, sessions, engagement rate, average time on page
- Performance breakdown by content piece
- Clickable links to execution briefs (navigation-only, no feedback)
- Filter controls (view-only local state)
- Source disclosure: "Source: GA4 (demo) · Snapshot-based"
- Helper text: "Showing top 5 items (demo)."

**Data Source**: GA4 (demo)
**Boundary**: `read_only_no_feedback`

**Key Features**:
- Channel filter defaults to "GA4 (demo)" to match demo source
- KPI values represent current filter scope (All content)
- Linked Brief badges are clickable and navigate to `/execution-prep/execution-briefs?brief=<brief_id>`
- Source disclosure appears below filters
- Table helper text clarifies demo scope

### 2. Traffic & Engagement
**Route**: `/measurement/traffic-engagement`

Displays traffic and engagement overview:
- Total sessions, organic share, returning users, top landing page
- Source/medium breakdown
- Top landing pages performance
- Filter controls (view-only local state)
- Source disclosure: "Source: GA4 (demo) · Snapshot-based"
- Organic share calculation helper note

**Data Source**: GA4 (demo)
**Boundary**: `read_only_no_feedback`

**Key Features**:
- Channel filter defaults to "GA4 (demo)" to match demo source
- Top Landing Page KPI is clickable (links to content performance page or page anchor)
- Top Landing Pages table rows are clickable (links to content performance page)
- Organic share helper note explains calculation method
- Source disclosure appears below filters

## Strict Boundaries

### What These Pages Do
- ✅ Display measurement data (GA4-like metrics)
- ✅ Show content performance metrics
- ✅ Display traffic and engagement statistics
- ✅ Provide filter controls (view-only local state)
- ✅ Navigate to execution briefs (navigation-only, no feedback)
- ✅ Navigate to content performance page (navigation-only, no feedback)

### What These Pages Do NOT Do
- ❌ Feed data back into strategy agents
- ❌ Update decisions or briefs
- ❌ Trigger agent calls
- ❌ Optimize content based on metrics
- ❌ Apply changes to strategy
- ❌ Regenerate briefs
- ❌ Enable autopilot actions
- ❌ Publish content (publishing is not implemented)

## Boundary Copy

Each page includes explicit boundary copy at the bottom:

> "Measurement only. This data does not feed back into strategy, decisions, or briefs."

This copy is displayed prominently to ensure users understand the read-only, no-feedback nature of these pages.

## Data Structure

### Content Performance
- `meta`: Page metadata, snapshot ID, source, boundary
- `filters`: Time range, channel (defaults to "GA4 (demo)"), content_id (view-only)
- `kpis`: Pageviews, sessions, engagement_rate, avg_time_on_page_sec (represents current filter scope)
- `content_rows[]`: Content performance data with brief_id links (top 5 items in demo)
- `notes[]`: Boundary and calculation notes

### Traffic & Engagement
- `meta`: Page metadata, snapshot ID, source, boundary
- `filters`: Time range, channel (defaults to "GA4 (demo)") (view-only)
- `kpis`: Total sessions, organic_share, returning_users_share, top_landing_page
- `source_medium_breakdown[]`: Source/medium performance data
- `landing_pages[]`: Top landing pages performance
- `notes[]`: Boundary and calculation notes

## UI Patterns

### Allowed Patterns
- Read-only data display
- KPI cards (4 cards per page)
- Tables for structured data
- Filter controls (view-only local state)
- Clickable badges for brief IDs (navigation-only)
- Clickable landing page links (navigation-only)
- Number formatting (commas, percentages, time)
- Boundary footnotes
- Source disclosure
- Helper text for table scope
- Helper notes for calculation clarity

### Forbidden Patterns
- Action buttons
- "Optimize", "Apply changes", "Regenerate" wording
- "Autopilot" controls
- Publishing controls
- Strategy update triggers
- Agent call buttons
- Feedback mechanisms

## Publishing Status

**Publishing is not implemented.** These measurement pages are stubs that display demo data. When publishing is implemented in the future, these pages will track performance of published content, but will remain read-only with no feedback into strategy or decision-making.

## Future Considerations

When backend integration is added:
- Replace demo data with real GA4 API calls
- Add loading states
- Add error handling
- Implement snapshot selection
- Add time range filtering (backend)
- Maintain strict no-feedback boundary

