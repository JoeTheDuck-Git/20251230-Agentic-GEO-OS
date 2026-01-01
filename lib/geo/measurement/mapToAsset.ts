import { ContentAssetId } from '@/lib/demo/geo/measurement.demo';
import { measurementDemo } from '@/lib/demo/geo/measurement.demo';

/**
 * Maps a brief ID to a content asset ID
 */
export function assetIdFromBrief(briefId: string): ContentAssetId | null {
  const asset = measurementDemo.assets.find(
    a => a.createdFrom.briefId === briefId
  );
  return asset?.id || null;
}

/**
 * Maps a spec ID to a content asset ID
 */
export function assetIdFromSpec(specId: string): ContentAssetId | null {
  const asset = measurementDemo.assets.find(
    a => a.createdFrom.specId === specId
  );
  return asset?.id || null;
}

