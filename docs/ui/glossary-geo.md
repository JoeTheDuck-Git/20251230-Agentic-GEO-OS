# GEO Glossary

## Driver Definitions

### Reach
**Definition**: Mention rate: how often the brand is included in tracked AI answers for this topic.

**Calculation**: Percentage of sampled questions where brand is mentioned at least once.

**Context**: Part of Visibility component in GEO Score calculation.

---

### Position
**Definition**: Average rank when mentioned (lower is better): earlier placement in the AI answer.

**Calculation**: Average position of brand mention in AI answers. Position 1 = first mention, Position N = last mention.

**Context**: Part of Visibility component in GEO Score calculation.

---

### Sentiment
**Definition**: Tone of mentions in AI answers (positive/neutral/negative). Separate from market-voice sentiment.

**Note**: Market Voice sentiment is separate from GEO sentiment in AI answers. Market Voice measures external signals (forums, social, Q&A), while GEO Sentiment measures sentiment in AI-generated answers.

**Context**: Part of Sentiment component in GEO Score calculation.

---

### Visibility
**Definition**: Composite visibility driven by reach and position in AI answers for this topic.

**Calculation**: Weighted combination of Reach (60%) and Position Score (40%).

**Context**: Primary component of GEO Score (60% weight).

---

## Gap Definitions

### Reach Gap
**Definition**: Competitor is mentioned in a higher share of tracked AI answers for this topic.

**Context**: Indicates opportunity to increase brand presence in AI-generated answers.

---

### Position Gap
**Definition**: When mentioned, competitor appears earlier in the answer (lower average rank).

**Context**: Indicates opportunity to improve ranking/positioning in AI answers.

---

### Sentiment Gap
**Definition**: Competitor is described more positively (or less negatively) in AI answers for this topic.

**Context**: Indicates opportunity to improve brand perception in AI-generated answers.

---

### Visibility Gap
**Definition**: Overall visibility delta driven by reach and position in AI answers for this topic.

**Context**: Indicates comprehensive visibility opportunity combining both reach and position improvements.

---

## Related Concepts

### Market Voice Sentiment vs GEO Sentiment
- **Market Voice Sentiment**: Measures sentiment in external market signals (forums, social media, Q&A platforms). Analyzed separately from GEO scoring.
- **GEO Sentiment**: Measures sentiment in AI-generated answers only. Part of GEO Score calculation.

These two sentiment measurements are kept separate to preserve measurement isolation.

---

## Effort Definitions

### Effort (S/M/L)
**Definition**: Relative implementation effort estimate based on content scope and question pattern coverage. Read-only guidance provided by Reasoning Agent.

**GEO-Native Definition**: Effort estimates are based on:
- **Content Volume**: Number of pages/content pieces required
- **Pattern Coverage**: Number of question patterns that need to be addressed

**Levels**:
- **S (Small)**: 1 primary page covering 3–8 question patterns. Examples: Content structure optimization, single-page content updates, focused metadata improvements.
- **M (Medium)**: 1 pillar page + 2–4 supporting pages covering 10–20 question patterns. Examples: Creating new content pieces, expanding topic coverage, improving content depth across multiple pages.
- **L (Large)**: 1 pillar page + 6–12 supporting pages covering 25–50 question patterns. Examples: Comprehensive content strategy overhaul, major topic expansion, significant content creation initiatives across multiple pages.

**Note**: Effort estimates are guidance only and do not represent scheduling commitments, task assignments, or project timelines. They are provided to help prioritize opportunities but should not be used for resource planning or deadline setting.

**Context**: Used in Opportunity Analysis to help users understand the relative complexity of addressing identified opportunities based on content volume and question pattern coverage. Not part of GEO Score calculation.

---

## Question Patterns

### Question Patterns
**Definition**: Recurring templates of how users ask questions within a topic in AI answers. Question patterns represent common question structures, phrasings, and intent variations that appear in AI-generated answer contexts.

**The 12 Canonical Patterns**:
1. Definition
2. Best-for / Recommendation
3. Comparison
4. Alternatives
5. Pricing / Cost
6. Use Case Fit
7. How-to / Setup
8. Checklist / Framework
9. Pros & Cons
10. Integrations
11. Troubleshooting
12. Trust / Proof

**Note**: Patterns are used to guide content structure and coverage; they are not tasks. Pattern coverage helps estimate content scope and implementation effort, but does not represent scheduling commitments or task assignments.

**Context**: Question patterns are identified by the Reasoning Agent through analysis of tracked AI answers. They help determine the scope of content needed to address opportunities. Pattern coverage (number of patterns) is used alongside content volume to estimate implementation effort.

**Usage**: 
- In GEO Overview: Shows top 3 patterns to indicate common question types
- In Opportunity Analysis: Pattern coverage indicates how many distinct question patterns need to be addressed
- In Execution Briefs: Pattern IDs guide content structure requirements
- In Content Planning: Patterns displayed for planning scope (human-owned planning)

