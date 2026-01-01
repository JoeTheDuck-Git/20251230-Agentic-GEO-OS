'use client';

import { useState } from 'react';
import Link from 'next/link';
import { marketVoiceNarrativesDemo } from '@/lib/demo/geo/market-voice-narratives.demo';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';
import { PatternChips } from '@/components/geo/PatternChips';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GeoLink } from '@/components/geo/GeoLink';
import { GeoJourneyHint } from '@/components/geo/GeoJourneyHint';
import { GeoDataFreshness } from '@/components/geo/GeoDataFreshness';
import { getMarketVoiceMeta } from '@/lib/geo/meta/geoMeta';
import { parseGeoQuery } from '@/lib/geo/query/geoQuery';
import { useSearchParams } from 'next/navigation';

type TabType = 'credited' | 'descriptors' | 'claims';

export default function MarketVoicePage() {
  const data = marketVoiceNarrativesDemo;
  const searchParams = useSearchParams();
  const geoQueryState = parseGeoQuery(searchParams);
  const freshnessMeta = getMarketVoiceMeta(geoQueryState);
  const [selectedTab, setSelectedTab] = useState<TabType>('credited');
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('TechRival');
  const [expandedClaims, setExpandedClaims] = useState<Set<string>>(new Set());

  const toggleClaim = (claimId: string) => {
    const newExpanded = new Set(expandedClaims);
    if (newExpanded.has(claimId)) {
      newExpanded.delete(claimId);
    } else {
      newExpanded.add(claimId);
    }
    setExpandedClaims(newExpanded);
  };

  const getStanceBadgeClass = (stance: string) => {
    switch (stance) {
      case 'supporting':
        return 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400';
      case 'challenging':
        return 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400';
      case 'mixed':
        return 'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  // Calculate summary metrics
  const topCreditedCount = data.creditedFor.length;
  const descriptorPolarityGap = {
    acme: {
      positive: data.descriptors.acme.positive.length,
      negative: data.descriptors.acme.negative.length,
    },
    rival: {
      positive: data.descriptors.rival.positive.length,
      negative: data.descriptors.rival.negative.length,
    },
  };
  const claimsCount = data.claims.length;

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Market Voice</h1>
          <p className="text-muted-foreground mt-2">
            Narrative mining: what competitors are credited for, language differences, and circulating claims. Read-only.
          </p>
          <div className="mt-3 flex items-center gap-4">
            <div className="text-xs text-muted-foreground">
              Brand: {data.meta.brand} • Competitor: {data.meta.competitor} • {data.meta.range} • Snapshot: {data.meta.snapshot}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-muted-foreground">Compare to:</label>
              <select
                value={selectedCompetitor}
                onChange={(e) => setSelectedCompetitor(e.target.value)}
                className="px-2 py-1 text-xs border rounded-md bg-background"
              >
                <option value="TechRival">TechRival</option>
                <option value="SecureNet">SecureNet</option>
                <option value="CloudTech">CloudTech</option>
              </select>
            </div>
          </div>
          <div className="mt-2">
            <GeoJourneyHint />
          </div>
        </div>

        <GeoGlobalFilters />

        {/* Data Freshness */}
        <GeoDataFreshness {...freshnessMeta} />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium text-muted-foreground mb-1">Top Credited Themes</div>
            <div className="text-2xl font-bold">{topCreditedCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Competitor themes tracked</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium text-muted-foreground mb-1">Descriptor Polarity Gap</div>
            <div className="text-2xl font-bold">
              {descriptorPolarityGap.acme.positive - descriptorPolarityGap.rival.positive > 0 ? '+' : ''}
              {descriptorPolarityGap.acme.positive - descriptorPolarityGap.rival.positive}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Acme: {descriptorPolarityGap.acme.positive} pos / {descriptorPolarityGap.acme.negative} neg • 
              Rival: {descriptorPolarityGap.rival.positive} pos / {descriptorPolarityGap.rival.negative} neg
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium text-muted-foreground mb-1">Claims Tracked</div>
            <div className="text-2xl font-bold">{claimsCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Supporting, challenging, mixed</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('credited')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedTab === 'credited'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Credited For
            </button>
            <button
              onClick={() => setSelectedTab('descriptors')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedTab === 'descriptors'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Descriptors
            </button>
            <button
              onClick={() => setSelectedTab('claims')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedTab === 'claims'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Claims & Counterclaims
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'credited' && (
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b bg-muted/50">
              <h3 className="text-lg font-semibold">Competitors Credited For</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Themes where competitors are frequently mentioned or credited in AI answers.
              </p>
            </div>
            <div className="divide-y">
              {data.creditedFor.map((item, index) => (
                <div key={index} className="p-4 hover:bg-muted/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{item.competitor}</span>
                        <span className="text-sm text-muted-foreground">credited for</span>
                        <span className="font-semibold">{item.theme}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Support: {item.support.sharePct}% of relevant answers
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Top domains:</span>
                        {item.support.topDomains.map((domain, idx) => (
                          <GeoLink
                            key={idx}
                            href={`/intelligence/sources?domain=${encodeURIComponent(domain)}`}
                            className="text-xs px-2 py-0.5 rounded border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            {domain}
                          </GeoLink>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Topics:</span>
                        {item.support.topTopics.map((topic, idx) => (
                          <GeoLink
                            key={idx}
                            href={`/intelligence/topic-performance?topic=${encodeURIComponent(topic)}`}
                            className="text-xs px-2 py-0.5 rounded border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            {topic}
                          </GeoLink>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Example questions:</span>
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                          {item.exampleQuestions.slice(0, 2).map((q, idx) => (
                            <li key={idx}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <GeoLink
                      href={`/intelligence/sources?domain=${encodeURIComponent(item.support.topDomains[0])}`}
                      className="ml-4 text-xs text-blue-600 hover:text-blue-700 hover:underline whitespace-nowrap"
                    >
                      Open Sources →
                    </GeoLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'descriptors' && (
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Descriptors: {data.meta.brand} vs {data.meta.competitor}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Acme Column */}
              <div>
                <h4 className="font-semibold mb-3">{data.meta.brand}</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-green-700 mb-2">Positive</div>
                    <div className="flex flex-wrap gap-1.5">
                      {data.descriptors.acme.positive.map((desc, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded border bg-green-50 text-green-700 border-green-200"
                        >
                          {desc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-2">Neutral</div>
                    <div className="flex flex-wrap gap-1.5">
                      {data.descriptors.acme.neutral.map((desc, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded border bg-muted/50 text-muted-foreground"
                        >
                          {desc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-700 mb-2">Negative</div>
                    <div className="flex flex-wrap gap-1.5">
                      {data.descriptors.acme.negative.map((desc, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded border bg-red-50 text-red-700 border-red-200"
                        >
                          {desc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rival Column */}
              <div>
                <h4 className="font-semibold mb-3">{data.meta.competitor}</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-green-700 mb-2">Positive</div>
                    <div className="flex flex-wrap gap-1.5">
                      {data.descriptors.rival.positive.map((desc, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded border bg-green-50 text-green-700 border-green-200"
                        >
                          {desc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-2">Neutral</div>
                    <div className="flex flex-wrap gap-1.5">
                      {data.descriptors.rival.neutral.map((desc, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded border bg-muted/50 text-muted-foreground"
                        >
                          {desc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-700 mb-2">Negative</div>
                    <div className="flex flex-wrap gap-1.5">
                      {data.descriptors.rival.negative.map((desc, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded border bg-red-50 text-red-700 border-red-200"
                        >
                          {desc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'claims' && (
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b bg-muted/50">
              <h3 className="text-lg font-semibold">Claims & Counterclaims</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Circulating claims about {data.meta.brand} and how they're supported or challenged in AI answers.
              </p>
            </div>
            <div className="divide-y">
              {data.claims.map((claim) => (
                <div key={claim.claimId} className="p-4 hover:bg-muted/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{claim.claim}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded border capitalize ${getStanceBadgeClass(claim.stance)}`}
                        >
                          {claim.stance}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Cited domains:</span>
                        {claim.citedDomains.map((domain, idx) => (
                          <GeoLink
                            key={idx}
                            href={`/intelligence/sources?domain=${encodeURIComponent(domain)}`}
                            className="text-xs px-2 py-0.5 rounded border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            {domain}
                          </GeoLink>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Patterns:</span>
                        <PatternChips patternIds={claim.patterns} topN={3} size="sm" />
                      </div>
                      {expandedClaims.has(claim.claimId) && (
                        <div className="mt-3 space-y-2 pl-4 border-l-2 border-muted">
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-1">Example questions:</div>
                            <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                              {claim.exampleQuestions.map((q, idx) => (
                                <li key={idx}>{q}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-1">Notes:</div>
                            <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                              {claim.notes.map((note, idx) => (
                                <li key={idx}>{note}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      <button
                        onClick={() => toggleClaim(claim.claimId)}
                        className="text-xs text-blue-600 hover:text-blue-700 hover:underline whitespace-nowrap"
                      >
                        {expandedClaims.has(claim.claimId) ? 'Collapse' : 'Expand'} ↓
                      </button>
                      <GeoLink
                        href={`/execution-prep/content-specs?fromClaim=${claim.claimId}`}
                        className="text-xs text-blue-600 hover:text-blue-700 hover:underline whitespace-nowrap"
                      >
                        Create Content Spec →
                      </GeoLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Boundary footnote */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Read-only narrative mining. Designed to support Content Spec creation. No execution actions available.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}
