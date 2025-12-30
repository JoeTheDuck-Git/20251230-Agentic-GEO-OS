# Market Voice Page

## Purpose

The Market Voice page provides read-only intelligence about external market signals from forums, social media, and Q&A platforms. This data is explicitly excluded from GEO Score calculation to preserve measurement isolation. Market Voice helps understand narratives, objections, and recurring questions in the market.

## Page Route

`/intelligence/market-voice`

## Data Source

- **Primary Agent**: Observation Agent
- **Data Type**: Read-only market voice signals from external sources
- **Boundary**: `read_only_excluded_from_geo`

## Measurement Isolation

**Critical**: Market Voice data is analyzed separately from GEO Score to preserve measurement isolation. GEO Score measures AI answer presence only, while Market Voice measures external market signals (forums, social, Q&A). These two measurement systems must remain isolated.

## Page Sections

### A) Header
- Page title: "Market Voice"
- Subtitle: "External market signals (forums, social, Q&A). Read-only. Not included in GEO scoring."

### B) Callout Note
- **Measurement isolation notice**: "Market Voice is analyzed separately from GEO Score to preserve measurement isolation."
- **Usage guidance**: "Use it to understand narratives, objections, and recurring questions."

### C) KPI Row (4 Cards)
1. **Mentions (30d)**: Total mentions in the last 30 days
2. **Share of Voice**: Percentage share of total market mentions
   - Tooltip: "Share of total tracked mentions attributed to your brand within the selected time range and sources."
3. **Market Sentiment**: Distribution of positive/neutral/negative with visual progress bars
   - Tooltip: "Sentiment of market discussions (forums/social/Q&A). Separate from GEO sentiment in AI answers."
4. **Momentum**: Percentage change vs previous period (with trend indicator)
   - Tooltip: "Change in mentions vs the previous equivalent period (e.g., last 30 days vs prior 30 days)."

### D) Insights Grid (2 Columns)
- **Left: Top Narratives**
  - List of top narratives with:
    - Title
    - Share percentage
    - Sentiment chip (positive/neutral/negative)
    - Top source chips
- **Right: Recurring Questions**
  - List of recurring questions with:
    - Question text
    - Frequency (mention count)
    - Risk badge (low/medium/high) with tooltip:
      - Tooltip: "Heuristic severity based on volume and negative sentiment signals. Read-only."

### E) Source Breakdown Table
Columns:
- Source (Reddit, Stack Overflow, LinkedIn, etc.)
- Mentions (count)
- Share (percentage)
- Sentiment (chip)
- Trend (up/down/stable icon) with tooltip:
  - Up: "Up vs previous period."
  - Flat: "No significant change vs previous period."
  - Down: "Down vs previous period."

### F) Competitor Voice Comparison Table
Columns:
- Brand
- Mentions (count)
- SOV (Share of Voice, percentage)
- Sentiment (chip)
- Top Narrative

### G) Evidence Snippets
- Card title: "Evidence Snippets"
- "Anonymized" indicator badge
- 3-5 snippet rows with:
  - Source
  - Date
  - Text (anonymized)

### H) Boundary Footnote
- Footer note: "Read-only intelligence. Market Voice data is excluded from GEO Score calculation. No execution actions available."

## Read-Only Boundary

### What This Page Does
- ✅ Displays market voice intelligence
- ✅ Shows narratives and recurring questions
- ✅ Provides source breakdown and competitor comparison
- ✅ Displays evidence snippets (anonymized)
- ✅ Maintains measurement isolation from GEO Score
- ✅ Provides tooltip definitions for KPIs and indicators

### What This Page Does NOT Do
- ❌ Affect GEO Score calculation
- ❌ Influence Reach, Avg Position, or GEO Sentiment
- ❌ Execute any actions
- ❌ Trigger agent calls
- ❌ Generate recommendations
- ❌ Publish content
- ❌ Schedule tasks
- ❌ Modify data

## UI Patterns

### Allowed Patterns
- Read-only data display
- KPI cards (4 cards)
- Two-column insights grid
- Tables for structured data
- Sentiment chips (positive/neutral/negative)
- Risk badges (low/medium/high)
- Source chips
- Trend indicators with tooltips
- Anonymized indicators
- Info icon tooltips for definitions

### Forbidden Patterns
- Action buttons
- "Generate", "Publish", "Schedule" wording
- GEO Score integration
- Measurement feedback loops
- Execution controls
- Status tracking

## Data Structure

The page uses demo data from `/lib/demo/geo-os/market-voice.ts` with the following structure:

- `meta`: Page metadata, snapshot ID, source agent, boundary
- `kpis`:
  - `mentions_30d`: Total mentions in last 30 days
  - `share_of_voice`: Share percentage (0-1)
  - `market_sentiment`: Object with `positive`, `neutral`, `negative` (0-1 each)
  - `momentum`: Percentage change vs previous period (can be negative)
- `top_narratives[]`: Array of narratives, each containing:
  - `title`: Narrative title
  - `share`: Share percentage (0-1)
  - `sentiment`: "positive" | "neutral" | "negative"
  - `top_sources`: Array of source strings
- `recurring_questions[]`: Array of questions, each containing:
  - `question`: Question text
  - `frequency`: Mention count
  - `risk`: "low" | "medium" | "high"
- `source_breakdown[]`: Array of sources, each containing:
  - `source`: Source name
  - `mentions`: Mention count
  - `share`: Share percentage (0-1)
  - `sentiment`: "positive" | "neutral" | "negative"
  - `trend`: "up" | "down" | "stable"
- `competitor_voice_comparison[]`: Array of competitors, each containing:
  - `brand`: Brand name
  - `mentions`: Mention count
  - `sov`: Share of Voice (0-1)
  - `sentiment`: "positive" | "neutral" | "negative"
  - `top_narrative`: Top narrative text
- `evidence_snippets[]`: Array of snippets, each containing:
  - `source`: Source name
  - `date`: ISO date string
  - `text`: Snippet text (anonymized)

## Glossary

### Share of Voice (SOV)
Share of total tracked mentions attributed to your brand within the selected time range and sources. This metric indicates your brand's relative presence in market discussions compared to competitors.

### Market Sentiment
Sentiment of market discussions (forums/social/Q&A). Separate from GEO sentiment in AI answers. Market Sentiment measures how your brand is discussed in external community-driven platforms, while GEO Sentiment measures sentiment in AI-generated answers.

### Momentum
Change in mentions vs the previous equivalent period (e.g., last 30 days vs prior 30 days). Positive momentum indicates increasing mention volume, while negative momentum indicates decreasing volume.

### Risk (in Recurring Questions)
Heuristic severity based on volume and negative sentiment signals. Read-only. Risk levels (low/medium/high) help prioritize which recurring questions may require attention based on their frequency and associated sentiment patterns.

### Trend (in Source Breakdown)
Directional indicator showing change vs previous period:
- **Up (↑)**: Up vs previous period
- **Flat (→)**: No significant change vs previous period
- **Down (↓)**: Down vs previous period

## Measurement Isolation Rules

### Critical Isolation Requirements
1. **No GEO Score Impact**: Market Voice data must never influence GEO Score, Reach, Avg Position, or GEO Sentiment calculations.
2. **Separate Analysis**: Market Voice is analyzed separately using Observation Agent.
3. **No Feedback Loops**: Market Voice insights do not feed back into GEO measurement or strategy agents.
4. **Clear Boundaries**: UI explicitly states that Market Voice is excluded from GEO scoring.

### Why Isolation Matters
- GEO Score measures AI answer presence (structured, authoritative sources)
- Market Voice measures external signals (forums, social, Q&A - unstructured, community-driven)
- Mixing these would contaminate measurement accuracy
- Each serves different analytical purposes

## Agent Attribution

- **Observation Agent**: Primary source for all Market Voice data
- All data is read-only and snapshot-based
- Data is explicitly excluded from GEO Score calculation

## Future Considerations

When backend integration is added:
- Replace demo data with API calls
- Add loading states
- Add error handling
- Implement snapshot selection
- Add time range filtering
- Maintain strict measurement isolation boundary
- Ensure no data flows from Market Voice to GEO Score calculation systems

