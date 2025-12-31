'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { contentSpecsDemo } from '@/lib/demo/geo-os/content-specs';
import { PatternChips } from '@/components/geo/PatternChips';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function ContentSpecsContent() {
  const data = contentSpecsDemo;
  const searchParams = useSearchParams();
  const specId = searchParams.get('spec');
  
  const [selectedSpecId, setSelectedSpecId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'confidence' | 'priority' | 'topic'>('newest');

  // Auto-select spec based on query parameter
  useEffect(() => {
    const fromBrief = searchParams.get('fromBrief');
    
    // Priority: spec > fromBrief > default
    if (specId) {
      const matchingSpec = data.content_specs.find(
        spec => spec.id === specId
      );
      if (matchingSpec) {
        setSelectedSpecId(matchingSpec.id);
        return;
      }
    }
    
    if (fromBrief) {
      const matchingSpec = data.content_specs.find(
        spec => spec.linkedBriefId === fromBrief
      );
      if (matchingSpec) {
        setSelectedSpecId(matchingSpec.id);
        return;
      } else {
        // No spec found, will show stub
        setSelectedSpecId(null);
        return;
      }
    }
    
    // Default to first spec (Cloud Infrastructure)
    if (data.content_specs.length > 0) {
      const cloudSpec = data.content_specs.find(s => s.title.includes('Cloud Infrastructure'));
      setSelectedSpecId(cloudSpec?.id || data.content_specs[0].id);
    }
  }, [specId, searchParams, data.content_specs]);

  const selectedSpec = data.content_specs.find(
    spec => spec.id === selectedSpecId
  );

  const fromBrief = searchParams.get('fromBrief');
  const hasMatchingSpec = fromBrief 
    ? data.content_specs.some(spec => spec.linkedBriefId === fromBrief)
    : true;
  
  // Get brief ID for stub (if needed)
  const briefForStub = fromBrief && !hasMatchingSpec ? fromBrief : null;

  // Filter and sort specs
  const filteredSpecs = data.content_specs
    .filter(spec => 
      spec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.primaryTopic.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime();
        case 'confidence':
          return b.confidence - a.confidence;
        case 'priority':
          const priorityOrder: Record<'high' | 'medium' | 'low', number> = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority as 'high' | 'medium' | 'low'] - priorityOrder[a.priority as 'high' | 'medium' | 'low'];
        case 'topic':
          return a.primaryTopic.localeCompare(b.primaryTopic);
        default:
          return 0;
      }
    });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'landing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'faq':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'blog':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleCopyJSON = () => {
    if (!selectedSpec) return;
    navigator.clipboard.writeText(JSON.stringify(selectedSpec, null, 2));
    // You could add a toast notification here
  };

  const handleExportMarkdown = () => {
    if (!selectedSpec) return;
    
    let markdown = `# ${selectedSpec.title}\n\n`;
    markdown += `**Type:** ${selectedSpec.type} | **Status:** ${selectedSpec.status} | **Priority:** ${selectedSpec.priority} | **Confidence:** ${selectedSpec.confidence}%\n\n`;
    markdown += `**Primary Topic:** ${selectedSpec.primaryTopic}\n`;
    markdown += `**Target Slug:** ${selectedSpec.targetSlug}\n`;
    markdown += `**Target Audience:** ${selectedSpec.audience}\n\n`;
    markdown += `**Linked Brief:** ${selectedSpec.linkedBriefId}\n\n`;
    
    markdown += `## Objective\n\n${selectedSpec.objective}\n\n`;
    
    markdown += `## Success Criteria\n\n`;
    selectedSpec.successCriteria.forEach(criteria => {
      markdown += `- ${criteria}\n`;
    });
    markdown += `\n`;
    
    markdown += `## Content Architecture\n\n`;
    markdown += `### Outline\n\n`;
    selectedSpec.outline.forEach(item => {
      markdown += `- ${item.heading}\n`;
      if ('bullets' in item && item.bullets && Array.isArray(item.bullets)) {
        item.bullets.forEach((bullet: string) => {
          markdown += `  - ${bullet}\n`;
        });
      }
    });
    markdown += `\n`;
    
    markdown += `### Required Coverage\n\n`;
    selectedSpec.coverageRequirements.forEach(req => {
      markdown += `- ${req}\n`;
    });
    markdown += `\n`;
    
    markdown += `### Constraints\n\n`;
    markdown += `**Must Do:**\n`;
    selectedSpec.constraints.mustDo.forEach(item => {
      markdown += `- ${item}\n`;
    });
    markdown += `\n**Must Not Do:**\n`;
    selectedSpec.constraints.mustNotDo.forEach(item => {
      markdown += `- ${item}\n`;
    });
    markdown += `\n`;
    
    markdown += `## Evidence & Claims\n\n`;
    markdown += `### Required Evidence Types\n\n`;
    selectedSpec.evidenceRequirements.forEach(req => {
      markdown += `- ${req}\n`;
    });
    markdown += `\n### Claims Checklist\n\n`;
    selectedSpec.claimsChecklist.forEach(claim => {
      markdown += `- [ ] ${claim.claim} (Risk: ${claim.risk})\n`;
    });
    markdown += `\n`;
    
    markdown += `## On-page SEO / AI Discoverability\n\n`;
    markdown += `### Schema Markup Recommendations\n\n`;
    selectedSpec.seoAiDiscoverability.schema.forEach(schema => {
      markdown += `- ${schema}\n`;
    });
    markdown += `\n### Internal Link Targets\n\n`;
    selectedSpec.seoAiDiscoverability.internalLinks.forEach(link => {
      markdown += `- ${link}\n`;
    });
    if (selectedSpec.seoAiDiscoverability.llmsTxtNote) {
      markdown += `\n**LLMs.txt Note:** ${selectedSpec.seoAiDiscoverability.llmsTxtNote}\n\n`;
    }
    
    markdown += `## CTA Blocks\n\n`;
    markdown += `**Primary CTA:** ${selectedSpec.ctaBlocks.primary.label} → ${selectedSpec.ctaBlocks.primary.href}\n`;
    if (selectedSpec.ctaBlocks.secondary) {
      markdown += `**Secondary CTA:** ${selectedSpec.ctaBlocks.secondary.label} → ${selectedSpec.ctaBlocks.secondary.href}\n`;
    }
    if (selectedSpec.ctaBlocks.toneNote) {
      markdown += `**Tone Note:** ${selectedSpec.ctaBlocks.toneNote}\n`;
    }
    
    navigator.clipboard.writeText(markdown);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Content Specs</h1>
        <p className="text-muted-foreground mt-2">
          Brief-to-spec handoff. Read-only — no content generation or publishing.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Generated by spec_agent • Validated by governance_agent • Snapshot: {data.meta.snapshot_id}
        </p>
      </div>

      {/* Banner */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Read-only view:</strong> Content specs are handoff artifacts. Execution happens outside GEO OS.
        </p>
      </div>

      {/* Top Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search specs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md text-sm"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 border rounded-md text-sm"
        >
          <option value="newest">Newest</option>
          <option value="confidence">Confidence (High to Low)</option>
          <option value="priority">Priority (High to Low)</option>
          <option value="topic">Topic (A–Z)</option>
        </select>
      </div>

      {/* List + Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Specs List */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-4">
            <h2 className="text-lg font-semibold mb-4">Specs ({filteredSpecs.length})</h2>
            <div className="space-y-2">
              {filteredSpecs.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecId(spec.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedSpecId === spec.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-background border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="font-medium text-sm mb-2">{spec.title}</div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded border ${getTypeColor(spec.type)}`}>
                      {spec.type}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(spec.status)}`}>
                      {spec.status}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(spec.priority)}`}>
                      {spec.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Confidence: {spec.confidence}%</span>
                    <span>brief-{spec.linkedBriefId}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Spec Details */}
        <div className="lg:col-span-2">
          {selectedSpec ? (
            <div className="rounded-lg border bg-card p-6 space-y-6">
              {/* Summary */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold">{selectedSpec.title}</h2>
                      {fromBrief && (
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 border border-blue-200">
                          From Brief: {fromBrief}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Generated by spec_agent • Validated by governance_agent • Snapshot: {selectedSpec.snapshotId}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(selectedSpec.type)}`}>
                      {selectedSpec.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(selectedSpec.status)}`}>
                      {selectedSpec.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(selectedSpec.priority)}`}>
                      {selectedSpec.priority}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span> {selectedSpec.type}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target URL/Slug:</span> {selectedSpec.targetSlug}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Primary Topic:</span> {selectedSpec.primaryTopic}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target Audience:</span> {selectedSpec.audience}
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/execution-prep/execution-briefs?brief=${selectedSpec.linkedBriefId}`}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    ← Back to Execution Brief
                  </Link>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold">Patterns</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground cursor-help">ℹ️</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Question patterns that this content should address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <PatternChips
                    patternIds={selectedSpec.patternsTop5}
                    topN={5}
                    showExamplesOnHover={true}
                    size="sm"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Confidence: {selectedSpec.confidence}%</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground cursor-help">ℹ️</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Spec confidence score based on data quality and governance validation</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              {/* Goals */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Goals</h3>
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-1">Objective</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedSpec.objective}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Success Criteria</h4>
                  <ul className="space-y-1">
                    {selectedSpec.successCriteria.map((criteria, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1">•</span>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Content Architecture */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Content Architecture</h3>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Outline</h4>
                  <ul className="space-y-1">
                    {selectedSpec.outline.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        <div className="font-medium">{item.heading}</div>
                        {'bullets' in item && item.bullets && (
                          <ul className="ml-4 mt-1 space-y-0.5">
                            {item.bullets.map((bullet: string, bIndex: number) => (
                              <li key={bIndex} className="text-xs">• {bullet}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Required Coverage</h4>
                  <ul className="space-y-1">
                    {selectedSpec.coverageRequirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2">Must Do</h4>
                    <ul className="space-y-1">
                      {selectedSpec.constraints.mustDo.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="mt-1 text-green-600">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-2">Must Not Do</h4>
                    <ul className="space-y-1">
                      {selectedSpec.constraints.mustNotDo.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="mt-1 text-red-600">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Evidence & Claims */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Evidence & Claims</h3>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Required Evidence Types</h4>
                  <ul className="space-y-1">
                    {selectedSpec.evidenceRequirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Claims Checklist</h4>
                  <ul className="space-y-2">
                    {selectedSpec.claimsChecklist.map((claim, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="mt-1">☐</span>
                        <div className="flex-1">
                          <span className="text-muted-foreground">{claim.claim}</span>
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                            claim.risk === 'high' ? 'bg-red-100 text-red-800' :
                            claim.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Risk: {claim.risk}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* On-page SEO / AI Discoverability */}
              <div>
                <h3 className="text-lg font-semibold mb-3">On-page SEO / AI Discoverability</h3>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Schema Markup Recommendations</h4>
                  <ul className="space-y-1">
                    {selectedSpec.seoAiDiscoverability.schema.map((schema, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1">•</span>
                        <span>{schema}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Internal Link Targets</h4>
                  <ul className="space-y-1">
                    {selectedSpec.seoAiDiscoverability.internalLinks.map((link, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1">•</span>
                        <span>{link}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedSpec.seoAiDiscoverability.llmsTxtNote && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">LLMs.txt Note</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedSpec.seoAiDiscoverability.llmsTxtNote}
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Blocks */}
              <div>
                <h3 className="text-lg font-semibold mb-3">CTA Blocks</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Primary CTA:</span> {selectedSpec.ctaBlocks.primary.label} → {selectedSpec.ctaBlocks.primary.href}
                  </div>
                  {selectedSpec.ctaBlocks.secondary && (
                    <div>
                      <span className="font-medium">Secondary CTA:</span> {selectedSpec.ctaBlocks.secondary.label} → {selectedSpec.ctaBlocks.secondary.href}
                    </div>
                  )}
                  {selectedSpec.ctaBlocks.toneNote && (
                    <div className="text-muted-foreground">
                      <span className="font-medium">Tone Note:</span> {selectedSpec.ctaBlocks.toneNote}
                    </div>
                  )}
                </div>
              </div>

              {/* Export / Handoff */}
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-3">Export / Handoff</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleCopyJSON}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    Copy Spec JSON
                  </button>
                  <button
                    onClick={handleExportMarkdown}
                    className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
                  >
                    Export as Markdown
                  </button>
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md text-sm cursor-not-allowed"
                  >
                    Open in Content OS
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  No publishing or scheduling occurs in GEO OS.
                </p>
              </div>

              {/* Boundary copy */}
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  Context only. No content is generated, scheduled, or published here.
                </p>
              </div>
            </div>
          ) : briefForStub ? (
            // Stub for missing spec
            <div className="rounded-lg border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">No Content Spec yet</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  This brief has no spec in the current snapshot.
                </p>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="text-sm font-semibold mb-3">Spec Preview (stub)</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Linked Brief ID:</span> {briefForStub}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Suggested Type:</span> blog
                    </div>
                    <div>
                      <span className="text-muted-foreground">Suggested Patterns:</span>
                      <div className="mt-1">
                        <PatternChips
                          patternIds={['pattern_definition', 'pattern_how_to', 'pattern_use_case']}
                          topN={3}
                          showExamplesOnHover={true}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stub Actions */}
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-semibold mb-3">Export Stub</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        const stubSpec = {
                          id: `stub-${briefForStub}`,
                          title: 'Content Spec (Stub)',
                          type: 'blog',
                          status: 'warning',
                          priority: 'medium',
                          confidence: 0,
                          primaryTopic: 'TBD',
                          targetSlug: '/tbd',
                          audience: 'TBD',
                          patternsTop5: ['pattern_definition', 'pattern_how_to', 'pattern_use_case'],
                          objective: 'TBD - Spec not yet generated',
                          successCriteria: [],
                          outline: [],
                          coverageRequirements: [],
                          constraints: { mustDo: [], mustNotDo: [] },
                          evidenceRequirements: [],
                          claimsChecklist: [],
                          seoAiDiscoverability: { schema: [], internalLinks: [] },
                          ctaBlocks: { primary: { label: 'TBD', href: '/tbd' } },
                          linkedBriefId: briefForStub,
                          generatedAt: new Date().toISOString(),
                          validatedAt: new Date().toISOString(),
                          snapshotId: 'stub',
                        };
                        navigator.clipboard.writeText(JSON.stringify(stubSpec, null, 2));
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      Copy Stub JSON
                    </button>
                    <button
                      onClick={() => {
                        const stubMarkdown = `# Content Spec (Stub)

**Linked Brief:** ${briefForStub}
**Type:** blog
**Status:** warning
**Priority:** medium
**Confidence:** 0%

## Objective

TBD - Spec not yet generated

## Success Criteria

(To be defined)

## Content Architecture

(To be defined)

## Evidence & Claims

(To be defined)

## On-page SEO / AI Discoverability

(To be defined)

## CTA Blocks

(To be defined)
`;
                        navigator.clipboard.writeText(stubMarkdown);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
                    >
                      Export Stub Markdown
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    No publishing or scheduling occurs in GEO OS.
                  </p>
                </div>
                
                {/* Back to Brief link */}
                <div className="pt-4 border-t">
                  <Link
                    href={`/execution-prep/execution-briefs?brief=${briefForStub}`}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    ← Back to Execution Brief
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground text-center">
                Select a spec from the list to view details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

