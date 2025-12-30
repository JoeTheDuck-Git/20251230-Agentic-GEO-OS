import { GEOScore } from './geo';

export type Brand = {
  id: string;
  name: string;
  domain: string;
  isPrimary: boolean; // true for tracked brand, false for competitor
};

export type BrandComparison = {
  brandId: string;
  topicId: string;
  region: string;
  geoScore: GEOScore;
  rank: number; // relative to other brands
};

