# Agentic GEO OS

Generative Engine Optimization Operating System - An autonomous system for understanding and improving brand presence in AI-generated answers.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # GEO Overview (dashboard)
│   ├── topics/            # Topic Intelligence
│   ├── questions/         # Question Explorer
│   ├── suggestions/       # Suggestions & Actions
│   ├── best-practices/    # Best Practices
│   └── trends/            # Historical Trends
├── components/            # React components
│   ├── geo/              # GEO-specific components
│   ├── topics/           # Topic components
│   ├── questions/        # Question components
│   └── suggestions/      # Recommendation components
├── lib/                  # Core logic
│   ├── models/           # Data models
│   ├── services/         # Service layer (Observation, Intelligence, Reasoning, Action)
│   └── demo-data.ts      # Mock data
└── docs/                 # Documentation
    └── geo-os/           # GEO OS documentation
```

## Documentation

- [GEO OS Overview](./docs/geo-os/README.md)
- [Architecture](./docs/geo-os/architecture.md)
- [Metrics](./docs/geo-os/metrics.md)
- [UI Map](./docs/geo-os/ui-map.md)

## Key Features

- **Observation Layer**: Captures AI answers and detects brand mentions
- **Intelligence Layer**: Computes GEO Scores and aggregates insights
- **Reasoning Layer**: Identifies gaps and prioritizes actions (agentic)
- **Action Layer**: Generates executable recommendations

## Technology Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

## License

Private project

# 20251230-Agentic-GEO-OS
