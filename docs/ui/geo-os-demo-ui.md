# GEO OS Demo UI

## Overview

This document describes the demo UI implementation for the Agentic GEO OS. The UI is read-only and displays demo data following canonical page schemas. No backend integration or agent execution is included.

## Navigation Structure

### Topbar
- **Brand Selector**: Displays selected brand (view-only)
- **Region Selector**: Displays selected region (view-only)
- **Time Range Selector**: Displays selected time range (view-only)
- **Snapshot Selector**: Displays selected snapshot timestamp (view-only)
- **Read-only Notice**: "Read-only / No execution" badge

### Sidebar Navigation Groups

#### Intelligence
- GEO Overview (`/intelligence/geo-overview`)
- Competitor Intelligence (`/intelligence/competitor-intelligence`)
- Market Voice (`/intelligence/market-voice`)

#### Decisions
- Actionable Items (`/decisions/actionable-items`)
- Opportunity Analysis (`/decisions/opportunity-analysis`)

#### Execution Prep
- Execution Briefs (`/execution-prep/execution-briefs`)
- Content Planning (`/execution-prep/content-planning`)
- Publishing (`/execution-prep/publishing`) - Coming soon (disabled)

#### Measurement
- Content Performance (`/measurement/content-performance`) - Demo stub
- Traffic & Engagement (`/measurement/traffic-engagement`) - Demo stub

## Pages

### Intelligence Pages

#### GEO Overview
- Displays high-level GEO performance metrics
- Shows GEO Score summary, trend indicators
- Topic performance summary
- High-level suggestions (top recommendations)
- **Data Source**: Intelligence Agent (primary), Strategy Agent (supporting)

#### Competitor Intelligence
- Competitive landscape analysis
- Primary brand position
- Competitor strengths and weaknesses
- Competitive gaps identification
- **Data Source**: Intelligence Agent

#### Market Voice
- Placeholder page
- Explains that market voice data is excluded from GEO OS
- **Note**: Market voice data (forums, social, Q&A) is explicitly excluded per measurement isolation rules

### Decisions Pages

#### Actionable Items
- Prioritized recommendations (high/medium/low)
- Recommendation summaries and statistics
- Actionable steps for each recommendation
- Expected impact and timeline estimates
- **Data Source**: Strategy Agent (primary), Governance Agent (supporting)

#### Opportunity Analysis
- Identified opportunities with current/target states
- Pattern insights from Reasoning Agent
- Opportunity descriptions and expected impact
- **Data Source**: Reasoning Agent

### Execution Prep Pages

#### Execution Briefs
- Detailed execution context for recommendations
- Action plans with step-by-step guidance
- Resources needed
- Expected outcomes
- **Data Source**: Strategy Agent

#### Content Planning
- Content roadmap by topic
- Recommended content types
- Content calendar with timeline
- **Data Source**: Strategy Agent

#### Publishing
- Coming soon (disabled)
- Will provide publishing guidance when implemented

### Measurement Pages

#### Content Performance
- Demo stub
- Will display content-level GEO metrics once content is published
- **Note**: Tracks GEO performance of published content over time

#### Traffic & Engagement
- Demo stub
- Explains that traffic/engagement data is excluded from GEO OS
- **Note**: Per measurement isolation rules, Google Analytics data must not influence GEO analysis

## UI Principles

### Read-Only Design
- All pages display data only
- No execution, publishing, or automation actions
- Clear "Read-only / No execution" notices
- No "Generate", "Execute", "Publish", "Autopilot" wording

### Demo Data Structure
- Each page has a corresponding demo data file in `/lib/demo/geo-os/`
- Demo data follows canonical page schemas from `page-agent-output-schemas.md`
- All demo data includes required `meta` fields (page, generated_at, source_agent)

### Component Patterns
- Stat cards for metrics
- Tables for structured data
- Collapsible panels for detailed information
- Clean, minimal layouts
- Consistent styling with Tailwind CSS

## Implementation Notes

- All pages are client-side rendered (no server-side data fetching)
- Demo data is imported directly from TypeScript modules
- Navigation uses Next.js App Router
- Sidebar highlights active page
- Topbar displays view-only selectors (no actual selection functionality in demo)
- All agent attribution is displayed (source_agent, generated_at)

## Forbidden Patterns

The following patterns are explicitly forbidden:
- Execution buttons or actions
- Publishing controls
- Autopilot status or controls
- Content generation triggers
- Webhook or callback configurations
- Status tracking for execution
- Any wording implying execution or automation

## Future Enhancements

When backend integration is added:
- Replace demo data with API calls
- Add loading states
- Add error handling
- Implement actual filtering for Brand/Region/Time Range
- Add snapshot selection functionality

