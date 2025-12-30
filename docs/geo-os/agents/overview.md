# Agentic GEO OS - Core Agents Overview

## Introduction

The Agentic GEO OS operates through five core agents, each with distinct responsibilities that together form a complete reasoning loop for understanding and improving brand presence in AI-generated answers.

## Agent Architecture

```
┌─────────────────┐
│ Governance      │ ← Policy & Constraints
│ Agent           │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Observation     │ ← "What's happening?"
│ Agent           │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Intelligence    │ ← "What does it mean?"
│ Agent           │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Reasoning       │ ← "What's wrong? What's missing?"
│ Agent           │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Strategy        │ ← "What should we do?"
│ Agent           │
└─────────────────┘
```

## Agent List

### 1. Observation Agent
**Role**: Data Collector and Analyzer  
**Primary Question**: "Are we being mentioned at all in AI answers?"  
**Output**: Raw observations of brand presence in AI-generated content

### 2. Intelligence Agent
**Role**: Metrics Computer and Aggregator  
**Primary Question**: "How visible are we, and what's the sentiment?"  
**Output**: GEO Scores, aggregated metrics, and performance summaries

### 3. Reasoning Agent
**Role**: Gap Analyzer and Pattern Recognizer  
**Primary Question**: "Where are we missing, and why?"  
**Output**: Identified gaps, opportunities, and prioritized issues

### 4. Strategy Agent
**Role**: Action Planner and Recommendation Generator  
**Primary Question**: "What specific actions should we take?"  
**Output**: Executable recommendations with priorities and expected impact

### 5. Governance Agent
**Role**: Policy Enforcer and Constraint Manager  
**Primary Question**: "Are we operating within acceptable boundaries?"  
**Output**: Policy validations, constraints, and compliance checks

## Agent Interaction Flow

### Standard Reasoning Loop

1. **Governance Agent** validates the analysis scope and constraints
2. **Observation Agent** samples questions and captures AI answers
3. **Intelligence Agent** computes GEO Scores and aggregates metrics
4. **Reasoning Agent** identifies gaps and patterns
5. **Strategy Agent** generates prioritized recommendations
6. **Governance Agent** validates recommendations against policies

### Data Flow

```
Questions → Observation Agent → AI Answer Snapshots
                                    ↓
Intelligence Agent ← Brand Mentions + Position + Sentiment
         ↓
    GEO Scores + Aggregations
         ↓
Reasoning Agent ← Topic Performance + Competitor Data
         ↓
    Gaps + Opportunities
         ↓
Strategy Agent ← Gap Analysis + Historical Context
         ↓
Recommendations → Governance Agent → Validated Actions
```

## Agent Principles

### Separation of Concerns
Each agent has a single, well-defined responsibility and does not overlap with others.

### Data Ownership
- **Observation Agent**: Owns raw AI answer data
- **Intelligence Agent**: Owns computed metrics and scores
- **Reasoning Agent**: Owns gap analysis and pattern recognition
- **Strategy Agent**: Owns recommendations and action plans
- **Governance Agent**: Owns policy definitions and validations

### Upstream/Downstream Relationships
- Agents consume outputs from upstream agents
- Agents produce outputs for downstream agents
- No circular dependencies

### Non-Overlapping Responsibilities
- Observation does not compute scores
- Intelligence does not identify gaps
- Reasoning does not generate recommendations
- Strategy does not execute actions
- Governance does not perform analysis

## Future Autopilot Support

While not implemented yet, the agent architecture is designed to support an Autopilot mode where:
- Agents can be orchestrated automatically
- The reasoning loop can run continuously
- Recommendations can be auto-prioritized
- Policies can trigger automatic constraints

## Documentation

- [Observation Agent](./observation-agent.md)
- [Intelligence Agent](./intelligence-agent.md)
- [Reasoning Agent](./reasoning-agent.md)
- [Strategy Agent](./strategy-agent.md)
- [Governance Agent](./governance-agent.md)

