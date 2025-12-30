# Strategy Agent

## Agent Definition

**Name**: Strategy Agent  
**Purpose**: The Strategy Agent transforms gap analysis and opportunities into specific, executable recommendations. It prioritizes actions, estimates impact, and generates actionable steps for improving GEO performance.

## Core Responsibilities

- **Recommendation Generation**: Creates specific recommendations from gaps and opportunities
- **Action Prioritization**: Ranks recommendations by expected impact and feasibility
- **Impact Estimation**: Predicts expected improvement from each recommendation
- **Actionable Step Creation**: Breaks down recommendations into concrete, executable steps
- **Content Strategy**: Maps topics to content recommendations (create, expand, improve)
- **Structural Strategy**: Identifies technical improvements (llms.txt, schema, structure)
- **Authority Strategy**: Suggests authority signal improvements (citations, references)
- **Timeline Planning**: Estimates timeframes for recommendation execution

## Inputs

- **Visibility Gaps**: From Reasoning Agent
- **Sentiment Risks**: From Reasoning Agent
- **Opportunities**: From Reasoning Agent
- **Pattern Insights**: From Reasoning Agent
- **GEO Scores**: From Intelligence Agent (for context)
- **Historical Performance**: From Intelligence Agent (for trend context)
- **Brand Goals**: Optional brand-specific goals or targets

## Outputs

- **Recommendations**: Prioritized list of recommendations with:
  - Type (content_gap, structural_improvement, authority_signal, topic_expansion)
  - Priority (high, medium, low)
  - Title and description
  - Actionable steps
  - Expected impact
  - Timeline estimate
- **Action Plans**: Detailed execution plans for high-priority recommendations
- **Content Roadmap**: Topic-by-topic content recommendations
- **Technical Checklist**: Structural and technical improvement items

## Explicit Non-Responsibilities

- **Does NOT collect data**: Data collection is handled by Observation Agent
- **Does NOT compute scores**: Score computation is handled by Intelligence Agent
- **Does NOT identify gaps**: Gap identification is handled by Reasoning Agent
- **Does NOT execute actions**: Action execution is outside agent scope (handoff to content systems)
- **Does NOT validate policies**: Policy validation is handled by Governance Agent
- **Does NOT schedule execution**: Scheduling is outside agent scope

## Relationship to Other Agents

### Upstream Dependencies
- **Reasoning Agent**: Consumes gaps, opportunities, and pattern insights
- **Intelligence Agent**: May consume GEO Scores for context

### Downstream Consumers
- **Governance Agent**: Recommendations are validated against policies before execution

### Data Flow
```
Reasoning Agent (gaps + opportunities)
         ↓
Strategy Agent
         ↓
Recommendations + Action Plans
         ↓
Governance Agent (validation)
```

## Example Question This Agent Answers

**"What specific actions should we take?"**

The Strategy Agent answers this by:
1. Converting gaps into specific recommendations
2. Prioritizing recommendations by impact and feasibility
3. Creating actionable steps for each recommendation
4. Estimating expected improvement
5. Providing execution timelines

## Example Output (Mocked)

```json
{
  "recommendations": [
    {
      "id": "rec-1",
      "type": "content_gap",
      "priority": "high",
      "title": "Expand Cloud Infrastructure Content",
      "description": "Your brand has low visibility (25% reach) for cloud infrastructure questions. Create comprehensive guides to improve presence.",
      "topicId": "topic-1",
      "actionableSteps": [
        "Create 'Complete Guide to Cloud Infrastructure' (5,000+ words)",
        "Add schema markup (Organization, Product) to service pages",
        "Publish 3 case studies with technical depth",
        "Create FAQ page addressing top 10 cloud infrastructure questions"
      ],
      "expectedImpact": "Increase visibility reach from 25% to 60% within 30 days",
      "timeline": "4-6 weeks",
      "estimatedGEOScoreImprovement": 15
    },
    {
      "id": "rec-2",
      "type": "structural_improvement",
      "priority": "medium",
      "title": "Implement llms.txt",
      "description": "Add llms.txt file to improve AI discoverability and answer inclusion rate",
      "actionableSteps": [
        "Create /llms.txt endpoint",
        "List key content pages (top 20 by topic)",
        "Include topic taxonomy and content structure",
        "Add sitemap reference"
      ],
      "expectedImpact": "Improve AI answer inclusion rate by 20%",
      "timeline": "1 week",
      "estimatedGEOScoreImprovement": 5
    },
    {
      "id": "rec-3",
      "type": "sentiment_improvement",
      "priority": "high",
      "title": "Address Negative Sentiment in AI Automation",
      "description": "8 out of 30 mentions show negative sentiment. Create positive content addressing limitations.",
      "topicId": "topic-2",
      "actionableSteps": [
        "Publish 'Addressing Common Misconceptions' article",
        "Create comparison content highlighting strengths",
        "Add customer success stories for AI automation",
        "Update existing content to address mentioned limitations"
      ],
      "expectedImpact": "Reduce negative mentions from 8 to 2 within 45 days",
      "timeline": "6-8 weeks",
      "estimatedGEOScoreImprovement": 12
    }
  ],
  "contentRoadmap": [
    {
      "topicId": "topic-1",
      "priority": "high",
      "recommendedContent": [
        "Comprehensive guide (5,000+ words)",
        "3 case studies",
        "FAQ page (10+ questions)",
        "Technical deep-dive articles (3-5 articles)"
      ]
    }
  ],
  "technicalChecklist": [
    {
      "item": "llms.txt implementation",
      "priority": "medium",
      "status": "pending"
    },
    {
      "item": "Schema markup for services",
      "priority": "high",
      "status": "pending"
    },
    {
      "item": "Content structure optimization",
      "priority": "medium",
      "status": "pending"
    }
  ]
}
```

## Recommendation Types

### Content Gap
- **Purpose**: Address missing or insufficient content for topics
- **Actions**: Create new content, expand existing content, improve depth
- **Impact**: Improves visibility reach and position

### Structural Improvement
- **Purpose**: Improve technical readiness for AI discovery
- **Actions**: Implement llms.txt, add schema markup, optimize structure
- **Impact**: Improves AI answer inclusion rate

### Authority Signal
- **Purpose**: Enhance authority and credibility signals
- **Actions**: Add citations, references, expert authorship
- **Impact**: Improves sentiment and positioning

### Topic Expansion
- **Purpose**: Expand coverage to new related topics
- **Actions**: Create content for adjacent topics, build topic clusters
- **Impact**: Increases overall visibility across topic ecosystem

### Sentiment Improvement
- **Purpose**: Address negative sentiment patterns
- **Actions**: Create positive content, address misconceptions, highlight strengths
- **Impact**: Improves sentiment scores and reduces negative mentions

## Prioritization Logic

Recommendations are prioritized based on:
1. **Severity**: High-priority gaps get high-priority recommendations
2. **Expected Impact**: Recommendations with higher GEO Score improvement
3. **Feasibility**: Easier-to-execute recommendations may be prioritized
4. **Timeline**: Quick wins may be prioritized for momentum
5. **Dependencies**: Recommendations that enable others are prioritized

## Operational Notes

- The Strategy Agent operates on gaps and opportunities from Reasoning Agent
- All recommendations are specific and actionable
- Expected impact is estimated based on historical patterns
- Recommendations can be handed off to content systems for execution
- The agent does not execute; it only plans

