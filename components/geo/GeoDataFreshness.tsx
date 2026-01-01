'use client';

interface GeoDataFreshnessProps {
  snapshotLabel: string;        // e.g. "Latest (2024-01-15 10:30 AM)"
  generatedAtLabel: string;     // "Generated: 1/15/2024, 6:30 PM"
  comparedToLabel?: string;     // "Compared to: Previous snapshot"
  dataSourceLabel?: string;     // "Data source: Demo GA4" or "Data source: LLM Snapshot"
  note?: string;                // optional small note
  className?: string;
}

export function GeoDataFreshness({
  snapshotLabel,
  generatedAtLabel,
  comparedToLabel,
  dataSourceLabel,
  note,
  className,
}: GeoDataFreshnessProps) {
  const parts: string[] = [];
  
  if (snapshotLabel) {
    parts.push(`Snapshot: ${snapshotLabel}`);
  }
  
  if (generatedAtLabel) {
    parts.push(generatedAtLabel);
  }
  
  if (dataSourceLabel) {
    parts.push(dataSourceLabel);
  }
  
  if (comparedToLabel) {
    parts.push(comparedToLabel);
  }
  
  if (note) {
    parts.push(note);
  }

  return (
    <div className={`text-xs text-muted-foreground ${className || ''}`}>
      {parts.join(' • ')}
    </div>
  );
}

