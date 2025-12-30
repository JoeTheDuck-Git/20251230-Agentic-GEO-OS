export type DriverKey = 'reach' | 'position' | 'sentiment' | 'visibility' | 'top_slot_share';
export type GapKey = 'reach_gap' | 'position_gap' | 'sentiment_gap' | 'visibility_gap';

export const DRIVER_LABELS: Record<DriverKey, string> = {
  reach: 'Reach',
  position: 'Position',
  sentiment: 'Sentiment',
  visibility: 'Visibility',
  top_slot_share: 'Top Slot Share',
};

export const DRIVER_TOOLTIPS: Record<DriverKey, string> = {
  reach: '% of tracked questions where the brand is mentioned at least once in the AI answer.',
  position: 'Average rank when mentioned (lower is better): earlier placement in the AI answer.',
  sentiment: 'Tone of mentions in AI answers (positive/neutral/negative). Separate from market-voice sentiment.',
  visibility: 'Composite visibility driven by reach and position in AI answers for this topic.',
  top_slot_share: 'Share of mentions that appear in top-ranked slots (higher = more often near the top). Not the same as Avg Position.',
};

export const GAP_TOOLTIPS: Record<GapKey, string> = {
  reach_gap: 'Competitor is mentioned in a higher share of tracked AI answers for this topic.',
  position_gap: 'When mentioned, competitor appears earlier in the answer (lower average rank).',
  sentiment_gap: 'Competitor is described more positively (or less negatively) in AI answers for this topic.',
  visibility_gap: 'Overall visibility delta driven by reach and position in AI answers for this topic.',
};

export const CHIP_VARIANTS: Record<DriverKey, 'default' | 'secondary' | 'outline'> = {
  reach: 'default',
  position: 'secondary',
  sentiment: 'outline',
  visibility: 'default',
  top_slot_share: 'secondary',
};

// Helper functions
export function getDriverLabel(key: DriverKey): string {
  return DRIVER_LABELS[key];
}

export function getDriverTooltip(key: DriverKey): string {
  return DRIVER_TOOLTIPS[key];
}

export function getGapLabel(key: GapKey): string {
  // Convert "reach_gap" to "Reach gap"
  const driverKey = key.replace('_gap', '') as DriverKey;
  return `${DRIVER_LABELS[driverKey]} gap`;
}

export function getGapTooltip(key: GapKey): string {
  return GAP_TOOLTIPS[key];
}

