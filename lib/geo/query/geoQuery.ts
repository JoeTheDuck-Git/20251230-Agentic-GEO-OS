export type GeoBrandKey = "acme" | "techrival" | "securenet";
export type GeoRegionKey = "US" | "EU" | "APAC";
export type GeoTimeRangeKey = "7d" | "30d" | "90d";
export type GeoModelKey = "gpt" | "gemini" | "claude";
export type GeoSnapshotKey = string; // e.g. "2024-01-15T10:30:00Z" or "latest"

export interface GeoQueryState {
  brand: GeoBrandKey;
  region: GeoRegionKey;
  timeRange: GeoTimeRangeKey;
  model: GeoModelKey;
  snapshot: GeoSnapshotKey;
}

export function defaultGeoQueryState(): GeoQueryState {
  return {
    brand: "acme",
    region: "US",
    timeRange: "30d",
    model: "gpt",
    snapshot: "latest",
  };
}

export function parseGeoQuery(searchParams: URLSearchParams): GeoQueryState {
  const defaultState = defaultGeoQueryState();
  
  return {
    brand: (searchParams.get("brand") as GeoBrandKey) || defaultState.brand,
    region: (searchParams.get("region") as GeoRegionKey) || defaultState.region,
    timeRange: (searchParams.get("range") as GeoTimeRangeKey) || defaultState.timeRange,
    model: (searchParams.get("model") as GeoModelKey) || defaultState.model,
    snapshot: searchParams.get("snapshot") || defaultState.snapshot,
  };
}

export function toGeoQueryString(state: GeoQueryState): string {
  const params = new URLSearchParams();
  
  if (state.brand !== defaultGeoQueryState().brand) {
    params.set("brand", state.brand);
  }
  if (state.region !== defaultGeoQueryState().region) {
    params.set("region", state.region);
  }
  if (state.timeRange !== defaultGeoQueryState().timeRange) {
    params.set("range", state.timeRange);
  }
  if (state.model !== defaultGeoQueryState().model) {
    params.set("model", state.model);
  }
  if (state.snapshot !== defaultGeoQueryState().snapshot) {
    params.set("snapshot", state.snapshot);
  }
  
  return params.toString();
}

// Helper to resolve "latest" snapshot to actual demo snapshot
export function resolveSnapshot(snapshot: GeoSnapshotKey): string {
  if (snapshot === "latest") {
    // In demo mode, return the latest snapshot from demo data
    return "2024-01-15 10:30 AM";
  }
  return snapshot;
}

