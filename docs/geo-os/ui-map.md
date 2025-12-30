# GEO OS UI Map

## Page List

### 1. GEO Overview (`/`)
**Purpose**: Core dashboard showing overall GEO performance

**Components**:
- GEO Score card
- Visibility vs Sentiment chart
- Top competitors comparison
- Topic performance summary
- High-level suggestions

**User Journey Entry Point**: Primary landing page

---

### 2. Topic Intelligence (`/topics`)
**Purpose**: Deep dive into topic-level performance

**Components**:
- Topic list with performance metrics
- Visibility & sentiment by topic
- Sample AI questions per topic
- Brand comparison within topics

**User Journey**: Click topic from Overview → See detailed topic analysis

---

### 3. Question Explorer (`/questions`)
**Purpose**: Explore individual questions and AI answers

**Components**:
- Question list with filters
- AI answer preview (mocked)
- Brand mentions with ordering
- Sentiment annotations per mention

**User Journey**: Click question from Topic → See answer details

---

### 4. Suggestions & Actions (`/suggestions`)
**Purpose**: Prioritized recommendations for improvement

**Components**:
- Topic-level recommendations
- Content gap identification
- Structural improvement suggestions
- Authority target domains

**User Journey**: Review recommendations → Execute actions

---

### 5. Best Practices (`/best-practices`)
**Purpose**: Technical readiness checklist

**Components**:
- llms.txt readiness status
- Schema markup checklist
- Content structure guidelines
- Authority signal indicators

**User Journey**: Technical audit → Implement improvements

---

### 6. Historical Trends (`/trends`)
**Purpose**: Track performance over time

**Components**:
- GEO Score time series
- Visibility trend chart
- Sentiment trend chart
- Topic movement visualization

**User Journey**: Monitor progress → Identify patterns

## User Journey Flow

```
GEO Overview
    ↓
    ├─→ Topic Intelligence → Question Explorer
    ├─→ Suggestions & Actions
    ├─→ Best Practices
    └─→ Historical Trends
```

## Navigation Structure

- **Primary Navigation**: Horizontal menu with all 6 pages
- **Breadcrumbs**: Show current location in hierarchy
- **Quick Actions**: Contextual actions from any page

