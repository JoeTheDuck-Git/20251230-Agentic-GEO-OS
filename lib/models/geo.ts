export type Visibility = {
  reach: number; // 0-100: brand mention coverage
  position: number; // 1-N: relative ordering in AI answers
};

export type Sentiment = 'positive' | 'neutral' | 'negative';

export type SentimentScore = {
  type: Sentiment;
  confidence: number; // 0-100
};

export type GEOScore = {
  visibility: Visibility;
  sentiment: SentimentScore;
  overall: number; // 0-100: computed score
};

export type Region = string; // e.g., "US", "UK", "JP"

export type TimeSnapshot = {
  timestamp: Date;
  score: GEOScore;
};

