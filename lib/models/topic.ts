import { GEOScore } from './geo';

export type Topic = {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: Date;
};

export type TopicPerformance = {
  topicId: string;
  brandId: string;
  region: string;
  geoScore: GEOScore;
  questionCount: number;
  avgPosition: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
};

