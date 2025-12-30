export type RecommendationType = 
  | 'content_gap'
  | 'structural_improvement'
  | 'authority_signal'
  | 'topic_expansion';

export type Recommendation = {
  id: string;
  type: RecommendationType;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  topicId?: string;
  questionId?: string;
  actionableSteps: string[];
  expectedImpact: string;
  createdAt: Date;
};

