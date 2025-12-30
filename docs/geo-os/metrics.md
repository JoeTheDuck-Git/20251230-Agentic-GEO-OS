# GEO OS Metrics

## GEO Score Definition

The GEO Score is a composite metric (0-100) that measures brand presence in AI-generated answers.

### Components

#### Visibility (60% weight)

**Reach** (0-100)
- Percentage of sampled questions where brand is mentioned
- Formula: `(Questions with Brand Mention / Total Questions) × 100`

**Position** (1-N)
- Average position of brand mention in AI answers
- Lower is better (1 = first mention)
- Converted to score: `(N - Position + 1) / N × 100`

**Visibility Score**: `(Reach × 0.6) + (Position Score × 0.4)`

#### Sentiment (40% weight)

**Type**: `positive` | `neutral` | `negative`

**Confidence** (0-100)
- Confidence level of sentiment classification

**Sentiment Score**:
- Positive: `Confidence`
- Neutral: `Confidence × 0.7`
- Negative: `Confidence × 0.3`

### Overall GEO Score

```
GEO Score = (Visibility Score × 0.6) + (Sentiment Score × 0.4)
```

## Analysis Dimensions

### Minimum Analysis Unit

**Question × Topic × Brand**

Every analysis must consider:
- The specific question asked
- The topic category
- The brand being evaluated

### Aggregation Levels

1. **Question Level**: Individual question performance
2. **Topic Level**: Aggregated across all questions in topic
3. **Brand Level**: Aggregated across all topics for brand
4. **Regional Level**: Filtered by geographic region
5. **Temporal Level**: Tracked over time with snapshots

## Visibility Logic

### Reach Calculation

```
Reach = (Brand Mentions / Total Questions) × 100
```

### Position Calculation

```
Position = Average(First Mention Position across all answers)
```

Position 1 = First brand mentioned
Position N = Last brand mentioned

## Sentiment Logic

### Classification

- **Positive**: Brand mentioned favorably (e.g., "leading provider", "best solution")
- **Neutral**: Factual mention without strong opinion
- **Negative**: Brand mentioned unfavorably (e.g., "has limitations", "reported issues")

### Confidence

Based on:
- Contextual keywords
- Comparative language
- Overall answer tone

## Historical Tracking

Each snapshot includes:
- Timestamp
- GEO Score components
- Question count
- Topic distribution

Enables trend analysis and performance tracking over time.

