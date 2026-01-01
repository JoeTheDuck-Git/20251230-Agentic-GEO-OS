import { GeoQueryState, resolveSnapshot } from '@/lib/geo/query/geoQuery';
import { geoOverviewDemo } from '@/lib/demo/geo-os/geo-overview';
import { topicPerformanceDemo } from '@/lib/demo/geo-os/topic-performance';
import { sourcesDemo } from '@/lib/demo/geo-os/sources.demo';
import { executionBriefsDemo } from '@/lib/demo/geo-os/execution-briefs';
import { contentSpecsDemo } from '@/lib/demo/geo-os/content-specs';
import { opportunityAnalysisDemo } from '@/lib/demo/geo-os/opportunity-analysis';
import { actionableItemsDemo } from '@/lib/demo/geo-os/actionable-items';
import { measurementDemo } from '@/lib/demo/geo/measurement.demo';

/**
 * Formats ISO date string to readable format
 */
function formatGeneratedAt(isoString: string): string {
  try {
    const date = new Date(isoString);
    return `Generated: ${date.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}`;
  } catch {
    return `Generated: ${isoString}`;
  }
}

/**
 * Formats snapshot ID to readable label
 */
function formatSnapshotLabel(snapshotId: string, snapshotLabel?: string): string {
  if (snapshotLabel) {
    return snapshotLabel;
  }
  // Try to extract date from snapshot ID
  const match = snapshotId.match(/(\d{4}-\d{2}-\d{2})/);
  if (match) {
    try {
      const date = new Date(match[1]);
      return `Latest (${date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })})`;
    } catch {
      // Fall through
    }
  }
  return snapshotId === 'latest' ? 'Latest' : snapshotId;
}

/**
 * Gets meta for Intelligence pages (GEO Overview, Topic Performance, Sources, Market Voice)
 */
export function getIntelligenceMeta(geoQueryState: GeoQueryState) {
  const snapshot = resolveSnapshot(geoQueryState.snapshot);
  
  // Use sources demo as it has the most complete meta structure
  const snapshotLabel = formatSnapshotLabel(snapshot, sourcesDemo.snapshotLabel);
  const generatedAtLabel = sourcesDemo.generatedAt.startsWith('20')
    ? formatGeneratedAt(sourcesDemo.generatedAt)
    : `Generated: ${sourcesDemo.generatedAt}`;
  
  return {
    snapshotLabel,
    generatedAtLabel,
    dataSourceLabel: 'Data source: LLM Snapshot',
  };
}

/**
 * Gets meta for Topic Performance page
 */
export function getTopicPerformanceMeta(geoQueryState: GeoQueryState) {
  const snapshotLabel = formatSnapshotLabel(
    resolveSnapshot(geoQueryState.snapshot),
    topicPerformanceDemo.meta.snapshot
  );
  const generatedAtLabel = topicPerformanceDemo.meta.generatedAt.startsWith('20')
    ? formatGeneratedAt(topicPerformanceDemo.meta.generatedAt)
    : `Generated: ${topicPerformanceDemo.meta.generatedAt}`;
  
  return {
    snapshotLabel,
    generatedAtLabel,
    dataSourceLabel: 'Data source: LLM Snapshot',
  };
}

/**
 * Gets meta for Sources page
 */
export function getSourcesMeta(geoQueryState: GeoQueryState) {
  const snapshotLabel = formatSnapshotLabel(
    resolveSnapshot(geoQueryState.snapshot),
    sourcesDemo.snapshotLabel
  );
  const generatedAtLabel = sourcesDemo.generatedAt.startsWith('20')
    ? formatGeneratedAt(sourcesDemo.generatedAt)
    : `Generated: ${sourcesDemo.generatedAt}`;
  
  return {
    snapshotLabel,
    generatedAtLabel,
    dataSourceLabel: 'Data source: LLM Snapshot',
  };
}

/**
 * Gets meta for Alerts page (includes comparedToLabel)
 */
export function getAlertsMeta(geoQueryState: GeoQueryState) {
  const snapshot = resolveSnapshot(geoQueryState.snapshot);
  const snapshotLabel = formatSnapshotLabel(snapshot);
  
  // Use geo overview as base
  const generatedAtLabel = formatGeneratedAt(geoOverviewDemo.meta.generated_at);
  
  return {
    snapshotLabel,
    generatedAtLabel,
    comparedToLabel: 'Compared to: Previous snapshot (same filters)',
    dataSourceLabel: 'Data source: LLM Snapshot',
  };
}

/**
 * Gets meta for Opportunity Analysis page
 */
export function getOpportunityAnalysisMeta(geoQueryState: GeoQueryState) {
  const snapshotLabel = formatSnapshotLabel(
    resolveSnapshot(geoQueryState.snapshot),
    opportunityAnalysisDemo.meta.snapshot_id
  );
  const generatedAtLabel = formatGeneratedAt(opportunityAnalysisDemo.meta.generated_at);
  
  return {
    snapshotLabel,
    generatedAtLabel,
    dataSourceLabel: 'Data source: LLM Snapshot',
  };
}

/**
 * Gets meta for Actionable Items page
 */
export function getActionableItemsMeta(geoQueryState: GeoQueryState) {
  const snapshotLabel = formatSnapshotLabel(
    resolveSnapshot(geoQueryState.snapshot),
    actionableItemsDemo.meta.snapshot_id
  );
  const generatedAtLabel = formatGeneratedAt(actionableItemsDemo.meta.generated_at);
  
  return {
    snapshotLabel,
    generatedAtLabel,
    dataSourceLabel: 'Data source: LLM Snapshot',
  };
}

/**
 * Gets meta for Execution Briefs page
 */
export function getExecutionBriefsMeta(geoQueryState: GeoQueryState) {
  const snapshotLabel = formatSnapshotLabel(
    resolveSnapshot(geoQueryState.snapshot),
    executionBriefsDemo.meta.snapshot_id
  );
  const generatedAtLabel = formatGeneratedAt(executionBriefsDemo.meta.generated_at);
  
  return {
    snapshotLabel,
    generatedAtLabel,
    dataSourceLabel: 'Data source: Derived from GEO signals (demo)',
  };
}

/**
 * Gets meta for Content Specs page
 */
export function getContentSpecsMeta(geoQueryState: GeoQueryState) {
  const snapshotLabel = formatSnapshotLabel(
    resolveSnapshot(geoQueryState.snapshot),
    contentSpecsDemo.meta.snapshot_id
  );
  const generatedAtLabel = formatGeneratedAt(contentSpecsDemo.meta.generated_at);
  
  return {
    snapshotLabel,
    generatedAtLabel,
    dataSourceLabel: 'Data source: Derived from GEO signals (demo)',
  };
}

/**
 * Gets meta for Measurement pages
 */
export function getMeasurementMeta(geoQueryState: GeoQueryState) {
  const snapshotLabel = formatSnapshotLabel(resolveSnapshot(geoQueryState.snapshot));
  const generatedAtLabel = formatGeneratedAt(measurementDemo.meta.generatedAt);
  
  return {
    snapshotLabel,
    generatedAtLabel,
    dataSourceLabel: measurementDemo.meta.dataSourceLabel,
    comparedToLabel: `Compared to: ${measurementDemo.meta.baselineMode}`,
  };
}

/**
 * Gets meta for Market Voice page
 */
export function getMarketVoiceMeta(geoQueryState: GeoQueryState) {
  // Market Voice uses sources demo structure
  const snapshotLabel = formatSnapshotLabel(
    resolveSnapshot(geoQueryState.snapshot),
    sourcesDemo.snapshotLabel
  );
  const generatedAtLabel = sourcesDemo.generatedAt.startsWith('20')
    ? formatGeneratedAt(sourcesDemo.generatedAt)
    : `Generated: ${sourcesDemo.generatedAt}`;
  
  return {
    snapshotLabel,
    generatedAtLabel,
    dataSourceLabel: 'Data source: LLM Snapshot',
  };
}

