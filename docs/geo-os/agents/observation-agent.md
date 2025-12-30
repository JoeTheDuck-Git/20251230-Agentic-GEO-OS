# Observation Agent

## Agent Definition

**Name**: Observation Agent  
**Purpose**: The Observation Agent is responsible for collecting and analyzing raw data about how brands appear in AI-generated answers. It samples questions, captures AI responses, and detects brand mentions with their context.

## Core Responsibilities

- **Question Sampling**: Generates representative questions for topics and regions
- **AI Answer Capture**: Retrieves AI-generated responses from various sources (AI Overviews, LLM responses, generative search)
- **Brand Mention Detection**: Identifies when and where brands are mentioned in AI answers
- **Position Inference**: Determines the relative ordering of brand mentions within answers
- **Sentiment Tagging**: Classifies the sentiment context surrounding brand mentions (positive/neutral/negative)
- **Context Extraction**: Captures surrounding text and context for each brand mention
- **Source Domain Tracking**: Identifies which domains are referenced in AI answers

## Inputs

- **Topics**: List of topics to analyze
- **Brands**: List of brands to track (primary brand + competitors)
- **Regions**: Geographic regions for question sampling
- **Question Templates**: Optional templates for question generation
- **Time Range**: Optional time window for historical analysis

## Outputs

- **Question List**: Sampled questions with metadata (topic, region, timestamp)
- **AI Answer Snapshots**: Complete AI-generated answers with:
  - Answer text
  - Timestamp
  - Source information
  - Brand mentions array
  - Source domains referenced
- **Brand Mention Records**: For each mention:
  - Brand ID
  - Position in answer (1-N)
  - Context text (surrounding sentences)
  - Sentiment classification
  - Confidence score

## Explicit Non-Responsibilities

- **Does NOT compute GEO Scores**: The Observation Agent only collects raw data
- **Does NOT aggregate metrics**: Aggregation is handled by Intelligence Agent
- **Does NOT identify gaps**: Gap analysis is handled by Reasoning Agent
- **Does NOT generate recommendations**: Recommendations are handled by Strategy Agent
- **Does NOT validate policies**: Policy validation is handled by Governance Agent
- **Does NOT prioritize actions**: Prioritization is handled by Strategy Agent

## Relationship to Other Agents

### Upstream Dependencies
- **Governance Agent**: Receives policy constraints on what questions can be sampled and what brands can be tracked

### Downstream Consumers
- **Intelligence Agent**: Consumes AI Answer Snapshots and Brand Mention Records to compute GEO Scores

### Data Flow
```
Governance Agent (policies)
         ↓
Observation Agent
         ↓
AI Answer Snapshots + Brand Mentions
         ↓
Intelligence Agent
```

## Example Question This Agent Answers

**"Are we being mentioned at all in AI answers?"**

The Observation Agent answers this by:
1. Sampling questions relevant to tracked topics
2. Capturing AI-generated answers for those questions
3. Detecting if the brand appears in any of those answers
4. Reporting the raw presence data (yes/no, position, context)

## Example Output (Mocked)

```json
{
  "questionId": "q-123",
  "questionText": "What are the best cloud infrastructure providers?",
  "topicId": "topic-1",
  "region": "US",
  "timestamp": "2024-01-15T10:30:00Z",
  "aiAnswer": {
    "text": "The leading cloud infrastructure providers include Acme Corp, which offers enterprise-grade solutions, TechRival with its scalable platform, and InnovateCo for specialized workloads.",
    "sourceDomains": ["example.com", "techreview.com"],
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "brandMentions": [
    {
      "brandId": "brand-1",
      "position": 1,
      "context": "The leading cloud infrastructure providers include Acme Corp, which offers enterprise-grade solutions",
      "sentiment": "positive",
      "confidence": 0.85
    },
    {
      "brandId": "brand-2",
      "position": 2,
      "context": "TechRival with its scalable platform",
      "sentiment": "neutral",
      "confidence": 0.70
    }
  ]
}
```

## Key Metrics Produced

- **Mention Count**: Total number of brand mentions detected
- **Question Coverage**: Percentage of sampled questions where brand appears
- **Position Distribution**: Distribution of mention positions (1st, 2nd, 3rd, etc.)
- **Sentiment Distribution**: Count of positive/neutral/negative mentions
- **Source Domain List**: Unique domains referenced in answers

## Operational Notes

- The Observation Agent operates on the **Question × Topic × Brand** analysis unit
- Each observation is timestamped for historical tracking
- Raw data is preserved for audit and re-analysis
- The agent does not filter or prioritize data; it captures everything within scope

