export const GEO_QUERY_KEYS = ["brand", "region", "range", "model", "snapshot"] as const;
export type GeoQueryKey = (typeof GEO_QUERY_KEYS)[number];

/**
 * Picks only GEO query keys from params that exist and are non-empty
 */
export function pickGeoQuery(
  params: URLSearchParams | Record<string, string | undefined>
): Record<string, string> {
  const result: Record<string, string> = {};
  
  for (const key of GEO_QUERY_KEYS) {
    let value: string | null | undefined;
    
    if (params instanceof URLSearchParams) {
      value = params.get(key);
    } else {
      value = params[key];
    }
    
    if (value && value.trim() !== '') {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Merges geo query params into href, preserving existing params
 * @example
 * withGeoQuery("/intelligence/sources?mode=gaps", { brand: "acme", region: "US" })
 * => "/intelligence/sources?mode=gaps&brand=acme&region=US"
 */
export function withGeoQuery(
  href: string,
  geo: Record<string, string>
): string {
  const [base, existingQuery] = href.split('?');
  const existingParams = new URLSearchParams(existingQuery || '');
  
  // Merge geo params into existing params
  for (const [key, value] of Object.entries(geo)) {
    if (GEO_QUERY_KEYS.includes(key as GeoQueryKey)) {
      existingParams.set(key, value);
    }
  }
  
  const queryString = existingParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}

/**
 * Convenience wrapper: picks geo query from current search params and merges into href
 */
export function buildGeoHref(
  href: string,
  currentSearchParams: URLSearchParams
): string {
  const geo = pickGeoQuery(currentSearchParams);
  return withGeoQuery(href, geo);
}

