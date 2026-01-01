'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { sourcesDemo, SourceDomainRow, SourceDomainDetail, BrandKey, SourceBrandDataset } from '@/lib/demo/geo-os/sources.demo';
import Link from 'next/link';
import { SourceCategoryChips } from '@/components/geo/SourceCategoryChips';
import { CiteShareDelta } from '@/components/geo/CiteShareDelta';
import { useSearchParams, useRouter } from 'next/navigation';
import { GeoGlobalFilters } from '@/components/geo/GeoGlobalFilters';
import { GeoLink } from '@/components/geo/GeoLink';
import { GeoJourneyHint } from '@/components/geo/GeoJourneyHint';
import { GeoDataFreshness } from '@/components/geo/GeoDataFreshness';
import { getSourcesMeta } from '@/lib/geo/meta/geoMeta';
import { parseGeoQuery } from '@/lib/geo/query/geoQuery';
import { GeoEmptyState } from '@/components/geo/states/GeoEmptyState';
import { EMPTY_STATE_COPY } from '@/lib/geo/states/stateCopy';
import { FileXIcon } from '@/components/geo/states/GeoEmptyState';
import { GeoPageActions } from '@/components/geo/GeoPageActions';

type SortOption = 'share_desc' | 'count_desc' | 'topics_desc' | 'domain_asc';
type ViewMode = 'my' | 'competitor' | 'gaps';

type OverlapDomain = {
  domain: string;
  acmeSharePct: number;
  competitorSharePct: number;
  deltaPp: number;
  acmeCitations: number;
  competitorCitations: number;
  acmeTopics: number;
  competitorTopics: number;
  categories: string[];
};

function SourcesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const geoQueryState = parseGeoQuery(searchParams);
  const freshnessMeta = getSourcesMeta(geoQueryState);
  
  const modeFromUrl = searchParams.get('mode') as ViewMode | null;
  const compareToFromUrl = searchParams.get('compareTo') as BrandKey | null;
  
  const [viewMode, setViewMode] = useState<ViewMode>(modeFromUrl || 'my');
  const [selectedBrand, setSelectedBrand] = useState<BrandKey>(compareToFromUrl || 'techrival');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('share_desc');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [overlapSection, setOverlapSection] = useState<'shared' | 'competitorOnly' | 'acmeOnly'>('shared');

  // Get datasets
  const acmeData = sourcesDemo.brands.acme;
  const competitorData = sourcesDemo.brands[selectedBrand];

  // Compute overlap & gaps
  const overlapData = useMemo(() => {
    const acmeDomains = new Map(acmeData.domains.map(d => [d.domain, d]));
    const competitorDomains = new Map(competitorData.domains.map(d => [d.domain, d]));
    
    const allDomains = new Set([...acmeDomains.keys(), ...competitorDomains.keys()]);
    
    const shared: OverlapDomain[] = [];
    const competitorOnly: OverlapDomain[] = [];
    const acmeOnly: OverlapDomain[] = [];
    
    allDomains.forEach(domain => {
      const acme = acmeDomains.get(domain);
      const competitor = competitorDomains.get(domain);
      
      const acmeShare = acme?.citeSharePct || 0;
      const competitorShare = competitor?.citeSharePct || 0;
      
      const overlapDomain: OverlapDomain = {
        domain,
        acmeSharePct: acmeShare,
        competitorSharePct: competitorShare,
        deltaPp: acmeShare - competitorShare,
        acmeCitations: acme?.totalCitations || 0,
        competitorCitations: competitor?.totalCitations || 0,
        acmeTopics: acme?.topicsCovered || 0,
        competitorTopics: competitor?.topicsCovered || 0,
        categories: acme?.categories || competitor?.categories || [],
      };
      
      if (acme && competitor) {
        shared.push(overlapDomain);
      } else if (competitor) {
        competitorOnly.push(overlapDomain);
      } else if (acme) {
        acmeOnly.push(overlapDomain);
      }
    });
    
    // Sort
    shared.sort((a, b) => Math.max(b.acmeSharePct, b.competitorSharePct) - Math.max(a.acmeSharePct, a.competitorSharePct));
    competitorOnly.sort((a, b) => b.competitorSharePct - a.competitorSharePct);
    acmeOnly.sort((a, b) => b.acmeSharePct - a.acmeSharePct);
    
    return {
      shared: shared.slice(0, 12),
      competitorOnly: competitorOnly.slice(0, 12),
      acmeOnly: acmeOnly.slice(0, 12),
    };
  }, [acmeData, competitorData]);

  // Get current dataset based on mode
  const currentDataset: SourceBrandDataset = useMemo(() => {
    if (viewMode === 'my') return acmeData;
    if (viewMode === 'competitor') return competitorData;
    return acmeData; // gaps mode uses overlapData
  }, [viewMode, acmeData, competitorData]);

  // Filter and sort domains (for my/competitor modes)
  const filteredAndSortedDomains = useMemo(() => {
    if (viewMode === 'gaps') return [];
    
    let filtered = [...currentDataset.domains];

    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter((domain) =>
        domain.domain.toLowerCase().includes(searchLower)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'share_desc':
          return b.citeSharePct - a.citeSharePct;
        case 'count_desc':
          return b.totalCitations - a.totalCitations;
        case 'topics_desc':
          return b.topicsCovered - a.topicsCovered;
        case 'domain_asc':
          return a.domain.localeCompare(b.domain);
        default:
          return 0;
      }
    });

    return filtered;
  }, [currentDataset.domains, searchQuery, sortBy, viewMode]);

  // Get overlap list based on section
  const overlapList = useMemo(() => {
    switch (overlapSection) {
      case 'shared':
        return overlapData.shared;
      case 'competitorOnly':
        return overlapData.competitorOnly;
      case 'acmeOnly':
        return overlapData.acmeOnly;
    }
  }, [overlapSection, overlapData]);

  // Set default selected domain
  useEffect(() => {
    if (viewMode === 'gaps') {
      if (overlapList.length > 0 && !selectedDomain) {
        setSelectedDomain(overlapList[0].domain);
      }
    } else {
      if (filteredAndSortedDomains.length > 0 && !selectedDomain) {
        setSelectedDomain(filteredAndSortedDomains[0].domain);
      } else if (filteredAndSortedDomains.length > 0) {
        const currentSelected = filteredAndSortedDomains.find(
          (d) => d.domain === selectedDomain
        );
        if (!currentSelected) {
          setSelectedDomain(filteredAndSortedDomains[0].domain);
        }
      } else {
        setSelectedDomain(null);
      }
    }
  }, [filteredAndSortedDomains, overlapList, selectedDomain, viewMode]);

  // Update URL when mode/brand changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (viewMode !== 'my') params.set('mode', viewMode);
    if (viewMode === 'gaps' && selectedBrand !== 'techrival') {
      params.set('compareTo', selectedBrand);
    }
    const queryString = params.toString();
    router.replace(`/intelligence/sources${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [viewMode, selectedBrand, router]);

  const selectedDetail = useMemo(() => {
    if (!selectedDomain) return null;
    
    if (viewMode === 'gaps') {
      const overlap = overlapList.find(d => d.domain === selectedDomain);
      if (!overlap) return null;
      
      const acmeDetail = acmeData.detailsByDomain[selectedDomain];
      const competitorDetail = competitorData.detailsByDomain[selectedDomain];
      
      return {
        domain: selectedDomain,
        overlap,
        acmeDetail,
        competitorDetail,
      };
    }
    
    return currentDataset.detailsByDomain[selectedDomain] || null;
  }, [selectedDomain, viewMode, overlapList, currentDataset, acmeData, competitorData]);

  const currentMeta = viewMode === 'my' ? acmeData.meta : competitorData.meta;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Sources</h1>
            <p className="text-muted-foreground mt-2">
              Domains cited in AI answers. Read-only.
            </p>
            <div className="mt-3 text-xs text-muted-foreground">
              Region: {sourcesDemo.region} • {sourcesDemo.timeRangeLabel} • Snapshot: {sourcesDemo.snapshotLabel}
            </div>
            <div className="mt-2">
              <GeoJourneyHint />
            </div>
            {/* CTA group in header */}
            <div className="mt-3 flex items-center gap-3">
              <GeoLink
                href="/intelligence/content-gap-matrix"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
              >
                Open Gap Matrix →
              </GeoLink>
              <span className="text-xs text-muted-foreground">•</span>
              <GeoLink
                href="/decisions/opportunity-analysis"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
              >
                Open Opportunities →
              </GeoLink>
            </div>
          </div>
          <GeoPageActions
            exportContext={{
              title: 'Sources',
              description: 'Export includes domain lists, cite share metrics, and overlap analysis.',
            }}
          />
        </div>
      </div>

      <GeoGlobalFilters />

      {/* Data Freshness */}
      <GeoDataFreshness {...freshnessMeta} />

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 border-b">
        <button
          onClick={() => setViewMode('my')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            viewMode === 'my'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          My Brand
        </button>
        <button
          onClick={() => setViewMode('competitor')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            viewMode === 'competitor'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Competitor
        </button>
        <button
          onClick={() => setViewMode('gaps')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            viewMode === 'gaps'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Overlap & Gaps
        </button>
      </div>

      {/* Top Controls Row */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          {viewMode === 'gaps' ? (
            <>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-muted-foreground">Compare to:</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value as BrandKey)}
                  className="px-3 py-1.5 text-sm border rounded-md bg-background"
                >
                  <option value="techrival">TechRival</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-muted-foreground">Section:</label>
                <select
                  value={overlapSection}
                  onChange={(e) => setOverlapSection(e.target.value as any)}
                  className="px-3 py-1.5 text-sm border rounded-md bg-background"
                >
                  <option value="shared">Shared ({overlapData.shared.length})</option>
                  <option value="competitorOnly">Competitor Only ({overlapData.competitorOnly.length})</option>
                  <option value="acmeOnly">Acme Only ({overlapData.acmeOnly.length})</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-muted-foreground">Brand:</label>
                <select
                  value={viewMode === 'my' ? 'acme' : selectedBrand}
                  onChange={(e) => {
                    if (viewMode === 'my') {
                      setViewMode('competitor');
                      setSelectedBrand(e.target.value as BrandKey);
                    } else {
                      setSelectedBrand(e.target.value as BrandKey);
                    }
                  }}
                  className="px-3 py-1.5 text-sm border rounded-md bg-background"
                >
                  <option value="acme">Acme Corp</option>
                  <option value="techrival">TechRival</option>
                </select>
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-muted-foreground">Search:</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search domains..."
                  className="px-3 py-1.5 text-sm border rounded-md bg-background flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-muted-foreground">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 text-sm border rounded-md bg-background"
                >
                  <option value="share_desc">Cite Share (High to Low)</option>
                  <option value="count_desc">Citations (High to Low)</option>
                  <option value="topics_desc">Topics Covered (High to Low)</option>
                  <option value="domain_asc">Domain (A to Z)</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Domains List */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="text-lg font-semibold">
              {viewMode === 'gaps' 
                ? `${overlapSection === 'shared' ? 'Shared' : overlapSection === 'competitorOnly' ? 'Competitor Only' : 'Acme Only'} Domains (${overlapList.length})`
                : `Domains (${filteredAndSortedDomains.length})`
              }
            </h3>
            {viewMode === 'gaps' && (
              <p className="text-xs text-muted-foreground mt-1">Showing top 12</p>
            )}
          </div>
          {((viewMode === 'gaps' && overlapList.length === 0) || (viewMode !== 'gaps' && filteredAndSortedDomains.length === 0)) ? (
            <div className="p-6">
              <GeoEmptyState
                title={EMPTY_STATE_COPY.NO_SOURCES.TITLE}
                description={EMPTY_STATE_COPY.NO_SOURCES.DESC}
                icon={<FileXIcon className="h-12 w-12 text-muted-foreground" />}
                actions={[
                  { label: 'Switch to My Brand', href: '/intelligence/sources?mode=my', variant: 'default' },
                  { label: 'View Alerts', href: '/intelligence/alerts', variant: 'outline' },
                ]}
              />
            </div>
          ) : (
            <div className="divide-y max-h-[800px] overflow-y-auto">
              {viewMode === 'gaps' ? (
                overlapList.map((overlap) => (
                  <div
                    key={overlap.domain}
                    onClick={() => setSelectedDomain(overlap.domain)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedDomain === overlap.domain
                        ? 'bg-blue-50 border-l-4 border-l-blue-500'
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-medium text-sm">{overlap.domain}</span>
                        <SourceCategoryChips categories={overlap.categories as any} max={2} size="sm" />
                      </div>
                      <div className="flex flex-col items-end gap-1 ml-4 flex-shrink-0">
                        <div className="text-xs">
                          <span className="font-medium">Acme: {overlap.acmeSharePct.toFixed(1)}%</span>
                        </div>
                        <div className="text-xs">
                          <span className="font-medium">{competitorData.brandName}: {overlap.competitorSharePct.toFixed(1)}%</span>
                        </div>
                        <CiteShareDelta deltaPp={overlap.deltaPp} />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.max(overlap.acmeTopics, overlap.competitorTopics)} topics covered
                    </div>
                  </div>
                ))
              ) : (
                filteredAndSortedDomains.map((domain) => (
                  <div
                    key={domain.domain}
                    onClick={() => setSelectedDomain(domain.domain)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedDomain === domain.domain
                        ? 'bg-blue-50 border-l-4 border-l-blue-500'
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-medium text-sm">{domain.domain}</span>
                        <SourceCategoryChips categories={domain.categories} max={2} size="sm" />
                      </div>
                      <span className="text-sm font-bold ml-4 flex-shrink-0">
                        {domain.citeSharePct.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {domain.totalCitations} citations • {domain.topicsCovered} topics
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right: Domain Detail Panel */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="text-lg font-semibold">Domain Details</h3>
          </div>
          <div className="p-6 space-y-6 max-h-[800px] overflow-y-auto">
            {viewMode === 'gaps' && selectedDetail && 'overlap' in selectedDetail ? (
              // Overlap & Gaps detail view
              <>
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h4 className="font-semibold text-lg">{selectedDetail.domain}</h4>
                    <SourceCategoryChips categories={selectedDetail.overlap.categories as any} max={2} size="sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <div className="text-muted-foreground mb-1">Acme</div>
                      <div className="font-bold">{selectedDetail.overlap.acmeSharePct.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedDetail.overlap.acmeCitations} citations • {selectedDetail.overlap.acmeTopics} topics
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">{competitorData.brandName}</div>
                      <div className="font-bold">{selectedDetail.overlap.competitorSharePct.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedDetail.overlap.competitorCitations} citations • {selectedDetail.overlap.competitorTopics} topics
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded bg-muted/30">
                    <div className="text-sm font-medium mb-1">Delta (Acme − {competitorData.brandName})</div>
                    <CiteShareDelta deltaPp={selectedDetail.overlap.deltaPp} />
                  </div>
                </div>
                
                {selectedDetail.acmeDetail && (
                  <div>
                    <h5 className="font-medium mb-2">Acme Top Topics</h5>
                    <div className="space-y-2">
                      {selectedDetail.acmeDetail.topTopics.slice(0, 3).map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded text-sm">
                          <span>{topic.topic}</span>
                          <span className="font-medium">{topic.sharePct.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedDetail.competitorDetail && (
                  <div>
                    <h5 className="font-medium mb-2">{competitorData.brandName} Top Topics</h5>
                    <div className="space-y-2">
                      {selectedDetail.competitorDetail.topTopics.slice(0, 3).map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded text-sm">
                          <span>{topic.topic}</span>
                          <span className="font-medium">{topic.sharePct.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {(selectedDetail.acmeDetail || selectedDetail.competitorDetail) && (
                  <div>
                    <h5 className="font-medium mb-2">Example Questions</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {(selectedDetail.overlap.acmeSharePct >= selectedDetail.overlap.competitorSharePct
                        ? selectedDetail.acmeDetail?.exampleQuestions
                        : selectedDetail.competitorDetail?.exampleQuestions
                      )?.slice(0, 4).map((question, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            {question}
                            <span className="text-xs ml-2">
                              ({selectedDetail.overlap.acmeSharePct >= selectedDetail.overlap.competitorSharePct ? 'Acme' : competitorData.brandName})
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : selectedDetail && !('overlap' in selectedDetail) ? (
              // Regular detail view (My Brand / Competitor)
              <>
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h4 className="font-semibold text-lg">{selectedDetail.domain}</h4>
                    <SourceCategoryChips categories={selectedDetail.categories} max={2} size="sm" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Cite Share</div>
                      <div className="font-bold">{selectedDetail.citeSharePct.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Citations</div>
                      <div className="font-bold">{selectedDetail.totalCitations}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Topics Covered</div>
                      <div className="font-bold">{selectedDetail.topTopics.length}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Why it appears</h5>
                  <p className="text-sm text-muted-foreground">{selectedDetail.description}</p>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Top Topics</h5>
                  <div className="space-y-2">
                    {selectedDetail.topTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded text-sm"
                      >
                        <span>{topic.topic}</span>
                        <span className="font-medium">{topic.sharePct.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Example Questions</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {selectedDetail.exampleQuestions.map((question, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Example Snippets</h5>
                  <div className="space-y-3">
                    {selectedDetail.exampleSnippets.map((snippet, index) => (
                      <div key={index} className="p-3 border rounded bg-muted/30">
                        <div className="text-xs font-medium text-muted-foreground mb-1">
                          {snippet.question}
                        </div>
                        <div className="text-sm italic text-muted-foreground mt-2">
                          "{snippet.snippet}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Notes</h5>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {selectedDetail.notes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <p>Select a domain from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          Citations reflect sources referenced by AI answers in the selected snapshot. This does not verify the accuracy of the sources.
        </p>
      </div>
    </div>
  );
}

function SourcesLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function SourcesPage() {
  return (
    <Suspense fallback={<SourcesLoading />}>
      <SourcesContent />
    </Suspense>
  );
}
