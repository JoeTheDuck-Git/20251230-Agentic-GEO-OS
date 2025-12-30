# Page-Level Agent Output JSON Schemas

## Overview

This document defines the canonical JSON schemas for agent outputs displayed on each page. All schemas must include metadata fields, and no schema may include execution, publishing, or automation fields. Autopilot output must never appear in any schema.

## Schema Rules

### Required Metadata Fields
Every schema must include a `meta` object with:
- `page`: Page identifier (route path)
- `generated_at`: ISO 8601 timestamp of agent output generation
- `source_agent`: Agent name that generated the output

### Forbidden Fields
No schema may include:
- `execute`, `execution`, `execute_command`, `run`, `apply`
- `publish`, `publishing`, `deploy`, `deployment`
- `generate_content`, `create_content`, `auto_generate`
- `autopilot`, `autopilot_status`, `autopilot_enabled`
- `webhook`, `callback`, `trigger`, `automation`
- `status_tracking`, `execution_status`, `progress`

### Allowed Agents
Each page schema specifies which agents are allowed to contribute data.

### Forbidden Agents
Each page schema specifies which agents are explicitly forbidden.

---

## Page: GEO Overview

**Route**: `/`  
**Purpose**: High-level GEO performance dashboard with metrics, competitive positioning, and top recommendations.

### Allowed Agents
- Intelligence Agent (primary)
- Strategy Agent (supporting, high-level only)
- Governance Agent (supporting, warnings only)

### Forbidden Agents
- Observation Agent
- Reasoning Agent (indirect only)
- Autopilot

### Schema

```json
{
  "meta": {
    "page": "/",
    "generated_at": "2024-01-15T10:30:00Z",
    "source_agent": "intelligence_agent"
  },
  "geo_score_summary": {
    "overall": 72,
    "visibility": {
      "reach": 65,
      "position": 2.3,
      "score": 68
    },
    "sentiment": {
      "type": "positive",
      "confidence": 78,
      "score": 78
    },
    "trend": "improving"
  },
  "visibility_sentiment_chart": {
    "data_points": [
      {
        "topic_id": "topic-1",
        "visibility": 68,
        "sentiment": 78
      }
    ],
    "time_range": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-15T00:00:00Z"
    }
  },
  "competitor_comparison": {
    "brands": [
      {
        "brand_id": "brand-1",
        "brand_name": "Primary Brand",
        "geo_score": 72,
        "rank": 1
      },
      {
        "brand_id": "brand-2",
        "brand_name": "Competitor A",
        "geo_score": 58,
        "rank": 2
      }
    ],
    "comparison_scope": {
      "topics": ["topic-1", "topic-2"],
      "regions": ["US", "UK"]
    }
  },
  "topic_performance_summary": {
    "topics": [
      {
        "topic_id": "topic-1",
        "topic_name": "Cloud Infrastructure",
        "geo_score": 72,
        "question_count": 45,
        "avg_position": 2.3,
        "sentiment_distribution": {
          "positive": 28,
          "neutral": 12,
          "negative": 5
        }
      }
    ],
    "total_topics": 10
  },
  "high_level_suggestions": {
    "recommendations": [
      {
        "recommendation_id": "rec-1",
        "title": "Expand Cloud Infrastructure Content",
        "priority": "high",
        "expected_impact": "Increase visibility reach from 25% to 60%",
        "type": "content_gap"
      }
    ],
    "source_agent": "strategy_agent",
    "generated_at": "2024-01-15T10:25:00Z"
  },
  "critical_warnings": {
    "warnings": [
      {
        "warning_id": "warn-1",
        "type": "policy_violation",
        "severity": "high",
        "message": "Recommendation violates brand guidelines",
        "source_agent": "governance_agent"
      }
    ],
    "source_agent": "governance_agent",
    "generated_at": "2024-01-15T10:28:00Z"
  }
}
```

---

## Page: Topic Intelligence

**Route**: `/topics`  
**Purpose**: Detailed topic-level performance analysis with gaps, opportunities, and competitive positioning.

### Allowed Agents
- Intelligence Agent (primary)
- Reasoning Agent (supporting)
- Observation Agent (supporting, sample questions only)

### Forbidden Agents
- Strategy Agent
- Governance Agent
- Autopilot

### Schema

```json
{
  "meta": {
    "page": "/topics",
    "generated_at": "2024-01-15T10:30:00Z",
    "source_agent": "intelligence_agent"
  },
  "topic_overview": {
    "topic_id": "topic-1",
    "topic_name": "Cloud Infrastructure",
    "description": "Cloud computing infrastructure and services",
    "geo_score": {
      "overall": 72,
      "visibility": {
        "reach": 65,
        "position": 2.3
      },
      "sentiment": {
        "type": "positive",
        "confidence": 78
      }
    },
    "question_count": 45,
    "time_range": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-15T00:00:00Z"
    },
    "regions": ["US", "UK"]
  },
  "performance_metrics": {
    "visibility": {
      "reach": 65,
      "avg_position": 2.3,
      "position_distribution": {
        "1": 15,
        "2": 12,
        "3": 8,
        "4+": 10
      }
    },
    "sentiment": {
      "distribution": {
        "positive": 28,
        "neutral": 12,
        "negative": 5
      },
      "avg_confidence": 78,
      "trend": "improving"
    },
    "geo_score_components": {
      "visibility_weight": 0.6,
      "sentiment_weight": 0.4
    }
  },
  "brand_comparison": {
    "brands": [
      {
        "brand_id": "brand-1",
        "brand_name": "Primary Brand",
        "geo_score": 72,
        "rank": 1,
        "position": 2.3
      },
      {
        "brand_id": "brand-2",
        "brand_name": "Competitor A",
        "geo_score": 58,
        "rank": 2,
        "position": 3.1
      }
    ],
    "total_brands": 5
  },
  "visibility_gaps": {
    "gaps": [
      {
        "gap_id": "gap-1",
        "severity": "high",
        "current_reach": 25,
        "threshold": 50,
        "avg_position": 4.2,
        "question_count": 20,
        "root_cause": "Limited content coverage for data security topics",
        "pattern": "Brand has strong presence in cloud infrastructure but weak in security"
      }
    ],
    "source_agent": "reasoning_agent",
    "generated_at": "2024-01-15T10:27:00Z"
  },
  "sentiment_risks": {
    "risks": [
      {
        "risk_id": "risk-1",
        "risk_level": "medium",
        "negative_mentions": 8,
        "total_mentions": 30,
        "trend": "increasing",
        "root_cause": "Recent mentions focus on limitations rather than strengths"
      }
    ],
    "source_agent": "reasoning_agent",
    "generated_at": "2024-01-15T10:27:00Z"
  },
  "pattern_insights": {
    "patterns": [
      {
        "pattern_id": "pattern-1",
        "pattern_type": "topic_correlation",
        "description": "Strong performance in cloud infrastructure correlates with weak performance in data security",
        "confidence": 0.75
      }
    ],
    "source_agent": "reasoning_agent",
    "generated_at": "2024-01-15T10:27:00Z"
  },
  "opportunities": {
    "opportunities": [
      {
        "opportunity_id": "opp-1",
        "opportunity_type": "content_gap",
        "description": "Expand data security content to improve visibility",
        "expected_impact": "Increase reach from 25% to 60%",
        "priority": "high",
        "related_questions": ["q-15", "q-16", "q-17"]
      }
    ],
    "source_agent": "reasoning_agent",
    "generated_at": "2024-01-15T10:27:00Z"
  },
  "sample_questions": {
    "questions": [
      {
        "question_id": "q-123",
        "question_text": "What are the best cloud infrastructure providers?",
        "region": "US",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ],
    "total_questions": 45,
    "source_agent": "observation_agent",
    "generated_at": "2024-01-15T10:25:00Z"
  }
}
```

---

## Page: Question Explorer

**Route**: `/questions`  
**Purpose**: Individual question analysis with AI answers, brand mentions, and question-level metrics.

### Allowed Agents
- Observation Agent (primary)
- Intelligence Agent (supporting, question-level GEO Score only)

### Forbidden Agents
- Reasoning Agent
- Strategy Agent
- Governance Agent
- Autopilot

### Schema

```json
{
  "meta": {
    "page": "/questions",
    "generated_at": "2024-01-15T10:30:00Z",
    "source_agent": "observation_agent"
  },
  "question_details": {
    "question_id": "q-123",
    "question_text": "What are the best cloud infrastructure providers?",
    "topic_id": "topic-1",
    "topic_name": "Cloud Infrastructure",
    "region": "US",
    "sampling_timestamp": "2024-01-15T10:25:00Z",
    "related_topics": ["topic-2", "topic-3"]
  },
  "ai_answer_snapshot": {
    "answer_text": "The leading cloud infrastructure providers include Acme Corp, which offers enterprise-grade solutions, TechRival with its scalable platform, and InnovateCo for specialized workloads.",
    "timestamp": "2024-01-15T10:30:00Z",
    "source_domains": ["example.com", "techreview.com"],
    "answer_length": 156,
    "answer_hash": "sha256:abc123..."
  },
  "brand_mentions": {
    "mentions": [
      {
        "brand_id": "brand-1",
        "brand_name": "Primary Brand",
        "position": 1,
        "context": "The leading cloud infrastructure providers include Acme Corp, which offers enterprise-grade solutions",
        "mention_type": "direct"
      },
      {
        "brand_id": "brand-2",
        "brand_name": "Competitor A",
        "position": 2,
        "context": "TechRival with its scalable platform",
        "mention_type": "direct"
      }
    ],
    "total_mentions": 2,
    "source_agent": "observation_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "position_analysis": {
    "primary_brand_position": 1,
    "total_brands_mentioned": 3,
    "position_relative_to_competitors": {
      "ahead_of": ["brand-2", "brand-3"],
      "behind_of": []
    },
    "position_trend": "stable",
    "source_agent": "observation_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "sentiment_analysis": {
    "mentions": [
      {
        "brand_id": "brand-1",
        "sentiment": "positive",
        "confidence": 0.85,
        "context": "enterprise-grade solutions"
      }
    ],
    "overall_sentiment": "positive",
    "sentiment_distribution": {
      "positive": 1,
      "neutral": 0,
      "negative": 0
    },
    "source_agent": "observation_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "geo_score": {
    "overall": 82,
    "visibility": {
      "reach": 100,
      "position": 1,
      "score": 100
    },
    "sentiment": {
      "type": "positive",
      "confidence": 85,
      "score": 85
    },
    "source_agent": "intelligence_agent",
    "generated_at": "2024-01-15T10:28:00Z"
  },
  "related_questions": {
    "questions": [
      {
        "question_id": "q-124",
        "question_text": "Which cloud providers offer the best scalability?",
        "similarity_score": 0.75
      }
    ],
    "source_agent": "observation_agent",
    "generated_at": "2024-01-15T10:25:00Z"
  }
}
```

---

## Page: Suggestions & Actions

**Route**: `/suggestions`  
**Purpose**: Prioritized recommendations, action plans, and execution context for improving GEO performance.

### Allowed Agents
- Strategy Agent (primary)
- Governance Agent (supporting, warnings only)

### Forbidden Agents
- Observation Agent
- Intelligence Agent (indirect use only)
- Reasoning Agent (indirect use only)
- Autopilot

### Schema

```json
{
  "meta": {
    "page": "/suggestions",
    "generated_at": "2024-01-15T10:30:00Z",
    "source_agent": "strategy_agent"
  },
  "recommendations_summary": {
    "total_recommendations": 15,
    "priority_distribution": {
      "high": 5,
      "medium": 7,
      "low": 3
    },
    "type_distribution": {
      "content_gap": 8,
      "structural_improvement": 4,
      "authority_signal": 2,
      "topic_expansion": 1
    },
    "overall_expected_impact": "Estimated 25-point GEO Score improvement",
    "last_update": "2024-01-15T10:30:00Z"
  },
  "high_priority_recommendations": {
    "recommendations": [
      {
        "recommendation_id": "rec-1",
        "type": "content_gap",
        "priority": "high",
        "title": "Expand Cloud Infrastructure Content",
        "description": "Your brand has low visibility (25% reach) for cloud infrastructure questions. Create comprehensive guides to improve presence.",
        "topic_id": "topic-1",
        "topic_name": "Cloud Infrastructure",
        "expected_impact": "Increase visibility reach from 25% to 60% within 30 days",
        "estimated_geo_score_improvement": 15,
        "timeline_estimate": "4-6 weeks",
        "actionable_steps": [
          "Create 'Complete Guide to Cloud Infrastructure' (5,000+ words)",
          "Add schema markup (Organization, Product) to service pages",
          "Publish 3 case studies with technical depth",
          "Create FAQ page addressing top 10 cloud infrastructure questions"
        ]
      }
    ],
    "source_agent": "strategy_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "medium_priority_recommendations": {
    "recommendations": [
      {
        "recommendation_id": "rec-2",
        "type": "structural_improvement",
        "priority": "medium",
        "title": "Implement llms.txt",
        "description": "Add llms.txt file to improve AI discoverability and answer inclusion rate",
        "expected_impact": "Improve AI answer inclusion rate by 20%",
        "estimated_geo_score_improvement": 5,
        "timeline_estimate": "1 week",
        "actionable_steps": [
          "Create /llms.txt endpoint",
          "List key content pages (top 20 by topic)",
          "Include topic taxonomy and content structure",
          "Add sitemap reference"
        ]
      }
    ],
    "source_agent": "strategy_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "low_priority_recommendations": {
    "recommendations": [
      {
        "recommendation_id": "rec-3",
        "type": "authority_signal",
        "priority": "low",
        "title": "Add Expert Author Citations",
        "description": "Include expert author information to improve authority signals",
        "expected_impact": "Improve sentiment confidence by 5%",
        "estimated_geo_score_improvement": 2,
        "timeline_estimate": "2-3 weeks",
        "actionable_steps": [
          "Add author schema markup to key articles",
          "Include author bio pages",
          "Link to expert credentials"
        ]
      }
    ],
    "source_agent": "strategy_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "action_plans": {
    "plans": [
      {
        "plan_id": "plan-1",
        "recommendation_id": "rec-1",
        "steps": [
          {
            "step_id": "step-1",
            "order": 1,
            "description": "Research topic thoroughly",
            "estimated_time": "1 week",
            "dependencies": []
          },
          {
            "step_id": "step-2",
            "order": 2,
            "description": "Create comprehensive guide (5,000+ words)",
            "estimated_time": "2 weeks",
            "dependencies": ["step-1"]
          }
        ],
        "total_steps": 4,
        "estimated_complexity": "high"
      }
    ],
    "source_agent": "strategy_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "impact_estimates": {
    "geo_score_improvements": {
      "overall": 25,
      "visibility": 18,
      "sentiment": 7
    },
    "timeline_for_results": "30-45 days",
    "confidence_levels": {
      "high": 0.75,
      "medium": 0.20,
      "low": 0.05
    },
    "source_agent": "strategy_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "content_roadmap": {
    "topics": [
      {
        "topic_id": "topic-1",
        "topic_name": "Cloud Infrastructure",
        "priority": "high",
        "recommended_content": [
          "Comprehensive guide (5,000+ words)",
          "3 case studies",
          "FAQ page (10+ questions)",
          "Technical deep-dive articles (3-5 articles)"
        ]
      }
    ],
    "source_agent": "strategy_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "technical_checklist": {
    "items": [
      {
        "item_id": "item-1",
        "item": "llms.txt implementation",
        "priority": "medium",
        "status": "pending",
        "expected_impact": "Improve AI answer inclusion rate by 20%"
      },
      {
        "item_id": "item-2",
        "item": "Schema markup for services",
        "priority": "high",
        "status": "pending",
        "expected_impact": "Improve structured data recognition"
      }
    ],
    "source_agent": "strategy_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "governance_warnings": {
    "warnings": [
      {
        "warning_id": "warn-1",
        "recommendation_id": "rec-1",
        "type": "content_tone",
        "severity": "low",
        "message": "Recommendation may require brand guideline review for content tone"
      }
    ],
    "source_agent": "governance_agent",
    "generated_at": "2024-01-15T10:28:00Z"
  }
}
```

---

## Page: Best Practices

**Route**: `/best-practices`  
**Purpose**: Technical readiness checklist and structural improvement guidance.

### Allowed Agents
- Strategy Agent (primary, technical checklist)
- Intelligence Agent (supporting, readiness indicators)

### Forbidden Agents
- Observation Agent
- Reasoning Agent
- Governance Agent
- Autopilot

### Schema

```json
{
  "meta": {
    "page": "/best-practices",
    "generated_at": "2024-01-15T10:30:00Z",
    "source_agent": "strategy_agent"
  },
  "technical_checklist": {
    "items": [
      {
        "item_id": "item-1",
        "category": "llms_txt",
        "item": "llms.txt file implementation",
        "description": "Create /llms.txt endpoint with site structure information",
        "priority": "medium",
        "status": "pending",
        "expected_impact": "Improve AI answer inclusion rate by 20%",
        "guidance": "Include key content pages, topic taxonomy, and sitemap reference"
      },
      {
        "item_id": "item-2",
        "category": "schema_markup",
        "item": "Schema markup for services",
        "description": "Add Organization and Product schema markup to service pages",
        "priority": "high",
        "status": "pending",
        "expected_impact": "Improve structured data recognition",
        "guidance": "Use JSON-LD format for Organization and Product schemas"
      },
      {
        "item_id": "item-3",
        "category": "content_structure",
        "item": "Content structure optimization",
        "description": "Optimize content structure for AI model understanding",
        "priority": "medium",
        "status": "pending",
        "expected_impact": "Improve answer inclusion and positioning",
        "guidance": "Use clear headings, structured lists, and semantic HTML"
      }
    ],
    "source_agent": "strategy_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "readiness_indicators": {
    "overall_readiness": 45,
    "category_scores": {
      "llms_txt": 0,
      "schema_markup": 60,
      "content_structure": 75
    },
    "completion_status": {
      "completed": 1,
      "pending": 2,
      "not_started": 0
    },
    "source_agent": "intelligence_agent",
    "generated_at": "2024-01-15T10:28:00Z"
  }
}
```

---

## Page: Historical Trends

**Route**: `/trends`  
**Purpose**: Time-series performance data, trends, and historical patterns.

### Allowed Agents
- Intelligence Agent (primary, time series)
- Reasoning Agent (supporting, temporal patterns only)

### Forbidden Agents
- Observation Agent
- Strategy Agent
- Governance Agent
- Autopilot

### Schema

```json
{
  "meta": {
    "page": "/trends",
    "generated_at": "2024-01-15T10:30:00Z",
    "source_agent": "intelligence_agent"
  },
  "geo_score_time_series": {
    "data_points": [
      {
        "timestamp": "2024-01-01T00:00:00Z",
        "geo_score": 65,
        "visibility": {
          "reach": 55,
          "position": 3.2
        },
        "sentiment": {
          "type": "neutral",
          "confidence": 70
        }
      },
      {
        "timestamp": "2024-01-15T00:00:00Z",
        "geo_score": 72,
        "visibility": {
          "reach": 65,
          "position": 2.3
        },
        "sentiment": {
          "type": "positive",
          "confidence": 78
        }
      }
    ],
    "time_range": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-15T00:00:00Z"
    },
    "trend_direction": "improving",
    "source_agent": "intelligence_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "visibility_trends": {
    "reach_trend": {
      "data_points": [
        {
          "timestamp": "2024-01-01T00:00:00Z",
          "value": 55
        },
        {
          "timestamp": "2024-01-15T00:00:00Z",
          "value": 65
        }
      ],
      "trend": "improving",
      "velocity": 0.67
    },
    "position_trend": {
      "data_points": [
        {
          "timestamp": "2024-01-01T00:00:00Z",
          "value": 3.2
        },
        {
          "timestamp": "2024-01-15T00:00:00Z",
          "value": 2.3
        }
      ],
      "trend": "improving",
      "velocity": -0.06
    },
    "source_agent": "intelligence_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "sentiment_trends": {
    "sentiment_distribution_trend": {
      "data_points": [
        {
          "timestamp": "2024-01-01T00:00:00Z",
          "positive": 20,
          "neutral": 25,
          "negative": 10
        },
        {
          "timestamp": "2024-01-15T00:00:00Z",
          "positive": 28,
          "neutral": 12,
          "negative": 5
        }
      ],
      "trend": "improving"
    },
    "confidence_trend": {
      "data_points": [
        {
          "timestamp": "2024-01-01T00:00:00Z",
          "value": 70
        },
        {
          "timestamp": "2024-01-15T00:00:00Z",
          "value": 78
        }
      ],
      "trend": "improving",
      "velocity": 0.53
    },
    "source_agent": "intelligence_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "topic_movement": {
    "topics": [
      {
        "topic_id": "topic-1",
        "topic_name": "Cloud Infrastructure",
        "movement": {
          "start_score": 65,
          "end_score": 72,
          "change": 7,
          "direction": "improving"
        }
      }
    ],
    "source_agent": "intelligence_agent",
    "generated_at": "2024-01-15T10:30:00Z"
  },
  "temporal_patterns": {
    "patterns": [
      {
        "pattern_id": "pattern-1",
        "pattern_type": "temporal_correlation",
        "description": "GEO Score improvements correlate with content publication dates",
        "confidence": 0.82,
        "time_range": {
          "start": "2024-01-01T00:00:00Z",
          "end": "2024-01-15T00:00:00Z"
        }
      }
    ],
    "source_agent": "reasoning_agent",
    "generated_at": "2024-01-15T10:27:00Z"
  }
}
```

---

## Schema Validation Rules

### Rule 1: Metadata Must Be Present
- Every schema must include `meta` object
- `meta.page` must match the page route
- `meta.generated_at` must be valid ISO 8601 timestamp
- `meta.source_agent` must be a valid agent name

### Rule 2: Forbidden Fields Must Be Absent
- No schema may contain any forbidden field names
- Validation must reject schemas with forbidden fields
- Violations must be logged and audited

### Rule 3: Agent Attribution Must Match Allowed Agents
- `meta.source_agent` must be in allowed agents list for the page
- Supporting agent outputs must include `source_agent` field
- Validation must reject outputs from forbidden agents

### Rule 4: No Execution Fields
- No fields may imply execution, publishing, or automation
- All actionable steps are descriptive only
- No API endpoints, webhooks, or triggers allowed

### Rule 5: Autopilot Must Never Appear
- No `autopilot` field in any schema
- No `autopilot_status` field in any schema
- Validation must reject any schema containing autopilot references

---

## Summary

This document defines canonical JSON schemas for all pages:

- **GEO Overview**: Intelligence Agent (primary), Strategy Agent (supporting), Governance Agent (supporting)
- **Topic Intelligence**: Intelligence Agent (primary), Reasoning Agent (supporting), Observation Agent (supporting)
- **Question Explorer**: Observation Agent (primary), Intelligence Agent (supporting)
- **Suggestions & Actions**: Strategy Agent (primary), Governance Agent (supporting)
- **Best Practices**: Strategy Agent (primary), Intelligence Agent (supporting)
- **Historical Trends**: Intelligence Agent (primary), Reasoning Agent (supporting, temporal patterns only)

All schemas include required metadata, exclude forbidden fields, and never include Autopilot references.

