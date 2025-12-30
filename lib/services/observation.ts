import { Question, AIAnswerSnapshot, BrandMention } from '../models/question';

export class ObservationService {
  async sampleQuestions(topicId?: string, region?: string): Promise<Question[]> {
    // Mock: returns questions for sampling
    return [];
  }

  async captureAIAnswer(questionId: string): Promise<AIAnswerSnapshot> {
    // Mock: simulates AI answer capture
    return {
      questionId,
      timestamp: new Date(),
      answerText: 'Mock AI-generated answer...',
      brandMentions: [],
      sourceDomains: [],
    };
  }

  detectBrandMentions(answerText: string, brandIds: string[]): BrandMention[] {
    // Mock: detects brand mentions in answer
    return [];
  }

  inferPosition(mentions: BrandMention[]): number {
    // Returns position in answer ordering
    return 1;
  }

  tagSentiment(context: string): 'positive' | 'neutral' | 'negative' {
    // Mock: sentiment analysis
    return 'neutral';
  }
}

