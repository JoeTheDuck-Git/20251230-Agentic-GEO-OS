import { Sentiment } from './geo';

export type Question = {
  id: string;
  text: string;
  topicId: string;
  region: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AIAnswerSnapshot = {
  questionId: string;
  timestamp: Date;
  answerText: string;
  brandMentions: BrandMention[];
  sourceDomains: string[];
};

export type BrandMention = {
  brandId: string;
  position: number; // 1-N ordering
  context: string; // surrounding text
  sentiment: Sentiment;
};

