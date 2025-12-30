export type PatternIntent =
  | 'definition'
  | 'recommendation'
  | 'comparison'
  | 'alternatives'
  | 'pricing'
  | 'use_case'
  | 'how_to'
  | 'checklist'
  | 'pros_cons'
  | 'integrations'
  | 'troubleshooting'
  | 'trust';

export type FunnelStage = 'awareness' | 'consideration' | 'decision' | 'post_purchase';

export interface PatternDefinition {
  pattern_id: string;
  label: string;
  intent: PatternIntent;
  stage: FunnelStage;
  template: string;
  required_structure: string[];
  primary_signals: Array<'reach' | 'position' | 'sentiment' | 'visibility'>;
  examples: string[];
}

export const PATTERN_LIBRARY: PatternDefinition[] = [
  {
    pattern_id: 'pattern_definition',
    label: 'Definition',
    intent: 'definition',
    stage: 'awareness',
    template: 'What is [topic/concept]?',
    required_structure: [
      'Clear, concise definition',
      'Key characteristics or components',
      'Context or use cases where applicable',
    ],
    primary_signals: ['reach', 'position'],
    examples: [
      'What is cloud infrastructure?',
      'What is data encryption?',
      'What is AI automation?',
    ],
  },
  {
    pattern_id: 'pattern_recommendation',
    label: 'Best-for / Recommendation',
    intent: 'recommendation',
    stage: 'consideration',
    template: 'What is the best [solution] for [use case]?',
    required_structure: [
      'Criteria for evaluation',
      'Recommended solution with rationale',
      'Alternative considerations',
    ],
    primary_signals: ['position', 'sentiment'],
    examples: [
      'What is the best cloud provider for startups?',
      'What is the best data security solution for healthcare?',
      'What is the best AI automation tool for small businesses?',
    ],
  },
  {
    pattern_id: 'pattern_comparison',
    label: 'Comparison',
    intent: 'comparison',
    stage: 'consideration',
    template: 'How does [X] compare to [Y]?',
    required_structure: [
      'Side-by-side comparison',
      'Key differences and similarities',
      'Use case recommendations',
    ],
    primary_signals: ['position', 'visibility'],
    examples: [
      'How does cloud infrastructure compare to on-premise?',
      'How does AI automation compare to traditional automation?',
      'How does data encryption compare to data masking?',
    ],
  },
  {
    pattern_id: 'pattern_alternatives',
    label: 'Alternatives',
    intent: 'alternatives',
    stage: 'consideration',
    template: 'What are alternatives to [solution]?',
    required_structure: [
      'List of alternative solutions',
      'Pros and cons of each',
      'Situational recommendations',
    ],
    primary_signals: ['reach', 'position'],
    examples: [
      'What are alternatives to AWS?',
      'What are alternatives to traditional automation?',
      'What are alternatives to on-premise data storage?',
    ],
  },
  {
    pattern_id: 'pattern_pricing',
    label: 'Pricing / Cost',
    intent: 'pricing',
    stage: 'decision',
    template: 'How much does [solution] cost?',
    required_structure: [
      'Pricing structure overview',
      'Cost factors and variables',
      'Value proposition context',
    ],
    primary_signals: ['position', 'sentiment'],
    examples: [
      'How much does cloud infrastructure cost?',
      'What is the cost of AI automation?',
      'How much does data security compliance cost?',
    ],
  },
  {
    pattern_id: 'pattern_use_case',
    label: 'Use Case Fit',
    intent: 'use_case',
    stage: 'consideration',
    template: 'Is [solution] suitable for [use case]?',
    required_structure: [
      'Use case requirements',
      'Solution fit assessment',
      'Implementation considerations',
    ],
    primary_signals: ['reach', 'sentiment'],
    examples: [
      'Is cloud infrastructure suitable for enterprise?',
      'Is AI automation suitable for manufacturing?',
      'Is data encryption suitable for healthcare?',
    ],
  },
  {
    pattern_id: 'pattern_how_to',
    label: 'How-to / Setup',
    intent: 'how_to',
    stage: 'post_purchase',
    template: 'How to [action] [topic]?',
    required_structure: [
      'Step-by-step instructions',
      'Prerequisites and requirements',
      'Common pitfalls and troubleshooting',
    ],
    primary_signals: ['position', 'visibility'],
    examples: [
      'How to set up cloud infrastructure?',
      'How to implement data encryption?',
      'How to deploy AI automation?',
    ],
  },
  {
    pattern_id: 'pattern_checklist',
    label: 'Checklist / Framework',
    intent: 'checklist',
    stage: 'consideration',
    template: 'What should I consider when [action]?',
    required_structure: [
      'Comprehensive checklist items',
      'Priority or sequence guidance',
      'Best practices summary',
    ],
    primary_signals: ['position', 'reach'],
    examples: [
      'What should I consider when choosing cloud infrastructure?',
      'What should I consider when implementing data security?',
      'What should I consider when automating processes?',
    ],
  },
  {
    pattern_id: 'pattern_pros_cons',
    label: 'Pros & Cons',
    intent: 'pros_cons',
    stage: 'consideration',
    template: 'What are the pros and cons of [solution]?',
    required_structure: [
      'Balanced pros and cons list',
      'Context for each point',
      'Mitigation strategies for cons',
    ],
    primary_signals: ['sentiment', 'position'],
    examples: [
      'What are the pros and cons of cloud infrastructure?',
      'What are the pros and cons of AI automation?',
      'What are the pros and cons of data encryption?',
    ],
  },
  {
    pattern_id: 'pattern_integrations',
    label: 'Integrations',
    intent: 'integrations',
    stage: 'post_purchase',
    template: 'How does [solution] integrate with [other]?',
    required_structure: [
      'Integration methods and options',
      'Compatibility requirements',
      'Implementation guidance',
    ],
    primary_signals: ['reach', 'position'],
    examples: [
      'How does cloud infrastructure integrate with existing systems?',
      'How does AI automation integrate with CRM?',
      'How does data encryption integrate with databases?',
    ],
  },
  {
    pattern_id: 'pattern_troubleshooting',
    label: 'Troubleshooting',
    intent: 'troubleshooting',
    stage: 'post_purchase',
    template: 'How to fix [problem] with [solution]?',
    required_structure: [
      'Problem identification',
      'Step-by-step resolution',
      'Prevention strategies',
    ],
    primary_signals: ['position', 'sentiment'],
    examples: [
      'How to fix cloud infrastructure performance issues?',
      'How to fix AI automation errors?',
      'How to fix data encryption compatibility issues?',
    ],
  },
  {
    pattern_id: 'pattern_trust',
    label: 'Trust / Proof',
    intent: 'trust',
    stage: 'decision',
    template: 'Is [solution] reliable / secure / proven?',
    required_structure: [
      'Reliability indicators',
      'Security measures',
      'Proof points and evidence',
    ],
    primary_signals: ['sentiment', 'visibility'],
    examples: [
      'Is cloud infrastructure secure?',
      'Is AI automation reliable?',
      'Is data encryption proven?',
    ],
  },
];

export const PATTERN_BY_ID: Record<string, PatternDefinition> = PATTERN_LIBRARY.reduce(
  (acc, pattern) => {
    acc[pattern.pattern_id] = pattern;
    return acc;
  },
  {} as Record<string, PatternDefinition>
);

// Helper functions
export function getPattern(id: string): PatternDefinition | undefined {
  return PATTERN_BY_ID[id];
}

export function getPatternLabel(id: string): string {
  const pattern = getPattern(id);
  return pattern?.label || id;
}

export function getPatternExamples(id: string, topN: number = 3): string[] {
  const pattern = getPattern(id);
  if (!pattern) return [];
  return pattern.examples.slice(0, topN);
}

export function formatPatternChipLabel(id: string): string {
  return getPatternLabel(id);
}

