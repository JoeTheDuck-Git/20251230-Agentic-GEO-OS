# Agentic GEO OS Architecture

## System Layers

### 1. Observation Layer

**Purpose**: Capture and analyze AI-generated answers

**Components**:
- Question Sampling Engine: Generates representative questions for topics
- AI Answer Capture: Retrieves AI-generated responses (mocked for demo)
- Brand Mention Detection: Identifies brand references in answers
- Position Inference: Determines relative ordering of brand mentions
- Sentiment Tagging: Classifies sentiment context (positive/neutral/negative)

**Data Flow**:
```
Question → AI Answer → Brand Mentions → Position + Sentiment
```

### 2. Intelligence Layer

**Purpose**: Compute metrics and aggregate insights

**Components**:
- GEO Score Computation: Calculates visibility and sentiment scores
- Topic Aggregation: Summarizes performance by topic
- Competitor Comparison: Ranks brands within topics
- Historical Tracking: Maintains time-series snapshots

**Key Metrics**:
- Visibility: Reach (coverage) + Position (ordering)
- Sentiment: Type + Confidence
- GEO Score: Weighted combination

### 3. Reasoning Layer (Agentic)

**Purpose**: Identify gaps and prioritize actions

**Components**:
- Gap Identification: Detects visibility and sentiment issues
- Opportunity Mapping: Links topics to content needs
- Action Prioritization: Ranks recommendations by impact

**Agent Responsibilities**:
- Analyze Question × Topic × Brand combinations
- Identify patterns across regions and time
- Generate actionable insights

### 4. Action Layer

**Purpose**: Generate executable recommendations

**Components**:
- Content Recommendations: Topic-specific content gaps
- Structural Improvements: Technical best practices (llms.txt, schema)
- Authority Benchmarks: Referenced domain targets
- Execution Handoff: Integration with content systems

## Data Flow

```
Observation → Intelligence → Reasoning → Action
     ↓            ↓              ↓          ↓
  Questions   GEO Scores    Gaps      Recommendations
  AI Answers  Aggregations  Patterns  Actionable Steps
```

## Agent Responsibilities

The Reasoning Layer acts as the "agentic brain" of the system:

1. **Pattern Recognition**: Identifies trends across questions, topics, and brands
2. **Gap Analysis**: Compares current state to desired state
3. **Prioritization**: Ranks actions by expected impact
4. **Context Awareness**: Considers region, time, and competitive landscape

