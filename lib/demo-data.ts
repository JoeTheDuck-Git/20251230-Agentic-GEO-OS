import { Brand, Topic, Question, GEOScore, Recommendation } from './models';

export const DEMO_BRANDS: Brand[] = [
  { id: 'brand-1', name: 'Acme Corp', domain: 'acme.com', isPrimary: true },
  { id: 'brand-2', name: 'TechRival', domain: 'techrival.com', isPrimary: false },
  { id: 'brand-3', name: 'InnovateCo', domain: 'innovateco.com', isPrimary: false },
];

export const DEMO_TOPICS: Topic[] = [
  { id: 'topic-1', name: 'Cloud Infrastructure', description: 'Enterprise cloud solutions', category: 'Technology', createdAt: new Date('2024-01-01') },
  { id: 'topic-2', name: 'AI Automation', description: 'AI-powered business automation', category: 'Technology', createdAt: new Date('2024-01-02') },
  { id: 'topic-3', name: 'Data Security', description: 'Enterprise data protection', category: 'Security', createdAt: new Date('2024-01-03') },
];

export const DEMO_QUESTIONS: Question[] = [
  { id: 'q-1', text: 'What are the best cloud infrastructure providers?', topicId: 'topic-1', region: 'US', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-01-15') },
  { id: 'q-2', text: 'How does AI automation improve business efficiency?', topicId: 'topic-2', region: 'US', createdAt: new Date('2024-01-16'), updatedAt: new Date('2024-01-16') },
  { id: 'q-3', text: 'What are the top data security solutions?', topicId: 'topic-3', region: 'US', createdAt: new Date('2024-01-17'), updatedAt: new Date('2024-01-17') },
];

export function generateGEOScore(brandId: string, topicId: string): GEOScore {
  // Deterministic mock scoring
  const seed = brandId.charCodeAt(0) + topicId.charCodeAt(0);
  const reach = 30 + (seed % 50);
  const position = 1 + (seed % 5);
  const sentimentType = seed % 3 === 0 ? 'positive' : seed % 3 === 1 ? 'neutral' : 'negative';
  const confidence = 60 + (seed % 40);
  const overall = (reach * 0.6) + ((6 - position) * 10 * 0.4);
  
  return {
    visibility: { reach, position },
    sentiment: { type: sentimentType, confidence },
    overall: Math.round(overall),
  };
}

export const DEMO_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'content_gap',
    priority: 'high',
    title: 'Expand Cloud Infrastructure Content',
    description: 'Your brand has low visibility for cloud infrastructure questions. Create comprehensive guides.',
    topicId: 'topic-1',
    actionableSteps: [
      'Create "Complete Guide to Cloud Infrastructure"',
      'Add schema markup for service pages',
      'Publish case studies with technical depth',
    ],
    expectedImpact: 'Increase visibility by 25% in 30 days',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'rec-2',
    type: 'structural_improvement',
    priority: 'medium',
    title: 'Implement llms.txt',
    description: 'Add llms.txt file to improve AI discoverability',
    actionableSteps: [
      'Create /llms.txt endpoint',
      'List key content pages',
      'Include topic taxonomy',
    ],
    expectedImpact: 'Improve AI answer inclusion rate',
    createdAt: new Date('2024-01-21'),
  },
];

