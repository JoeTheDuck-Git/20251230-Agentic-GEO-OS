'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { executionBriefsDemo } from '@/lib/demo/geo-os/execution-briefs';
import { contentSpecsDemo } from '@/lib/demo/geo-os/content-specs';
import { PatternChips } from '@/components/geo/PatternChips';

export default function ExecutionBriefsPage() {
  const data = executionBriefsDemo;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const fromItemId = searchParams.get('from');
  const briefId = searchParams.get('brief');
  
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [showNotFoundNotice, setShowNotFoundNotice] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState<string>('');
  const hasInitializedFromQuery = useRef(false);

  // Auto-select brief based on query parameters (priority: brief > from)
  useEffect(() => {
    // 只在首次載入時從查詢參數初始化，避免重複執行
    if (hasInitializedFromQuery.current) return;
    
    let found = false;
    
    // Priority: brief > from
    if (briefId) {
      const matchingBrief = data.execution_briefs.find(
        brief => brief.brief_id === briefId
      );
      if (matchingBrief) {
        setSelectedBriefId(matchingBrief.brief_id);
        setShowNotFoundNotice(false);
        found = true;
      } else {
        // Invalid brief ID
        setShowNotFoundNotice(true);
        setNotFoundMessage(`Brief not found in snapshot. Showing available briefs.`);
        setTimeout(() => setShowNotFoundNotice(false), 5000);
      }
    } else if (fromItemId) {
      const matchingBrief = data.execution_briefs.find(
        brief => brief.from_item_id === fromItemId
      );
      if (matchingBrief) {
        setSelectedBriefId(matchingBrief.brief_id);
        setShowNotFoundNotice(false);
        found = true;
      } else {
        setShowNotFoundNotice(true);
        setNotFoundMessage(`Brief not found for item ID: ${fromItemId}. Showing available briefs.`);
        setTimeout(() => setShowNotFoundNotice(false), 5000);
      }
    }
    
    // Fallback to first brief if no match found
    if (!found && data.execution_briefs.length > 0) {
      setSelectedBriefId(data.execution_briefs[0].brief_id);
    }
    
    // Mark as initialized to prevent re-running
    hasInitializedFromQuery.current = true;
  }, [briefId, fromItemId, data.execution_briefs]);

  const selectedBrief = data.execution_briefs.find(
    brief => brief.brief_id === selectedBriefId
  );

  // Check if spec exists for selected brief
  const hasSpec = selectedBrief 
    ? contentSpecsDemo.content_specs.some(spec => spec.linkedBriefId === selectedBrief.brief_id)
    : false;

  // Handle brief selection and update URL
  const handleBriefSelect = (briefId: string) => {
    setSelectedBriefId(briefId);
    
    // Update URL query parameter, preserve other params
    const params = new URLSearchParams(searchParams.toString());
    params.set('brief', briefId);
    // Remove 'from' parameter (if exists), since we're now using 'brief'
    params.delete('from');
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Execution Briefs</h1>
        <p className="text-muted-foreground mt-2">
          Execution-ready context derived from approved decision prompts. Read-only.
        </p>
      </div>

      {/* Not found notice */}
      {showNotFoundNotice && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            {notFoundMessage}
          </p>
        </div>
      )}

      {/* List + Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Brief List */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-4">
            <h2 className="text-lg font-semibold mb-4">Briefs</h2>
            <div className="space-y-2">
              {data.execution_briefs.map((brief) => (
                <button
                  key={brief.brief_id}
                  onClick={() => handleBriefSelect(brief.brief_id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedBriefId === brief.brief_id
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-background border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{brief.title}</div>
                      {brief.governance.approved === false && (
                        <span className="text-xs text-orange-600 mt-1 block">⚠ Warning</span>
                      )}
                    </div>
                    <Link
                      href={`/execution-prep/content-specs?fromBrief=${brief.brief_id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="ml-2 text-xs text-blue-600 hover:text-blue-700 hover:underline whitespace-nowrap"
                    >
                      Open Spec →
                    </Link>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="lg:col-span-2">
          {selectedBrief ? (
            <div className="rounded-lg border bg-card p-6 space-y-6">
              {/* Title and Governance */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedBrief.title}</h2>
                    <p className="text-xs text-muted-foreground">
                      Source: Strategy Agent · Validated: Governance Agent
                    </p>
                  </div>
                  {selectedBrief.governance.approved ? (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 border border-green-200">
                      Approved
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-800 border border-orange-200">
                      Warning
                    </span>
                  )}
                </div>
                {selectedBrief.governance.approved === false && selectedBrief.governance.notes && (
                  <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-xs text-orange-800">{selectedBrief.governance.notes}</p>
                  </div>
                )}
              </div>

              {/* Step A — Brief → Content Spec */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">
                      Step A — Brief → Content Spec
                    </h3>
                    <p className="text-xs text-blue-700 mb-3">
                      Convert this brief into an execution-ready spec for handoff. Read-only.
                    </p>
                  </div>
                  {hasSpec ? (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 border border-green-200">
                      Spec Ready
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-800 border border-orange-200">
                      Spec Missing
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/execution-prep/content-specs?fromBrief=${selectedBrief.brief_id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors font-medium"
                  >
                    Open Content Spec
                  </Link>
                  <Link
                    href="/execution-prep/content-specs"
                    className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-md text-sm hover:bg-blue-50 transition-colors"
                  >
                    View Specs Library
                  </Link>
                </div>
              </div>

              {/* Objective */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Objective</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedBrief.objective}
                </p>
              </div>

              {/* Target Audience */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Target Audience</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedBrief.target_audience}
                </p>
              </div>

              {/* Question Patterns */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Question Patterns</h3>
                <PatternChips
                  patternIds={selectedBrief.pattern_ids || []}
                  topN={6}
                  showExamplesOnHover={true}
                  size="sm"
                />
              </div>

              {/* Competitive Context */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Competitive Context</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedBrief.competitive_context}
                </p>
              </div>

              {/* Coverage Requirements */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Coverage Requirements</h3>
                <ul className="space-y-2">
                  {selectedBrief.coverage_requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tone Guidelines */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Tone Guidelines</h3>
                <ul className="space-y-2">
                  {selectedBrief.tone_guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1">•</span>
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Constraints */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                <p className="text-xs text-muted-foreground mb-3">Policy constraints (not tasks).</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2">Required Constraints</h4>
                    <ul className="space-y-1.5">
                      {selectedBrief.constraints.must_do.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="mt-1 text-green-600">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-2">Prohibited Constraints</h4>
                    <ul className="space-y-1.5">
                      {selectedBrief.constraints.must_not_do.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="mt-1 text-red-600">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/execution-prep/content-planning?brief=${selectedBrief.brief_id}`}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    View Content Planning →
                  </Link>
                  <Link
                    href="/decisions/actionable-items"
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                  >
                    Back to Actionable Items
                  </Link>
                </div>
              </div>

              {/* Boundary copy */}
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  Context only. No content is generated, scheduled, or published here.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground text-center">
                Select a brief from the list to view details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
