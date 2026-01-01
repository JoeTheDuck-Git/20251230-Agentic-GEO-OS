import { ContentAsset } from '@/lib/demo/geo/measurement.demo';
import { GeoQueryState } from '@/lib/geo/query/geoQuery';

/**
 * Parses asset ID from URL search params
 */
export function parseAssetId(searchParams: URLSearchParams): string | null {
  return searchParams.get('asset');
}

/**
 * Returns the default asset ID (first asset, or most recent if sorted)
 */
export function defaultAssetId(assets: ContentAsset[]): string | null {
  if (assets.length === 0) return null;
  // Return first published asset, or first asset if none published
  const published = assets.find(a => a.status === 'Published (stub)');
  return published?.id || assets[0].id;
}

/**
 * Filters assets by geo query state (for future use when asset metadata includes brand/region)
 * Currently returns all assets in demo mode
 */
export function filterAssetsByQuery(
  assets: ContentAsset[],
  geoQueryState: GeoQueryState
): ContentAsset[] {
  // In demo mode, filtering is non-functional
  // When asset metadata includes brand/region/model tags, filter here
  return assets;
}

