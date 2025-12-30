'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { contentPlanningDemo } from '@/lib/demo/geo-os/content-planning';
import { PatternChips } from '@/components/geo/PatternChips';

export default function ContentPlanningPage() {
  const data = contentPlanningDemo;
  const searchParams = useSearchParams();
  const briefId = searchParams.get('brief');
  
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showNotFoundNotice, setShowNotFoundNotice] = useState(false);

  // Auto-select plan based on ?brief parameter
  useEffect(() => {
    if (briefId) {
      const matchingPlan = data.content_plans.find(
        plan => plan.brief_id === briefId
      );
      if (matchingPlan) {
        setSelectedPlanId(matchingPlan.plan_id);
        setShowNotFoundNotice(false);
      } else {
        setShowNotFoundNotice(true);
        // Auto-hide notice after 5 seconds
        setTimeout(() => setShowNotFoundNotice(false), 5000);
        // Fall back to first plan if not found
        if (data.content_plans.length > 0) {
          setSelectedPlanId(data.content_plans[0].plan_id);
        }
      }
    } else if (data.content_plans.length > 0) {
      // Default to first plan if no parameter
      setSelectedPlanId(data.content_plans[0].plan_id);
    }
  }, [briefId, data.content_plans]);

  const selectedPlan = data.content_plans.find(
    plan => plan.plan_id === selectedPlanId
  );

  const getContentTypeColor = (type: string) => {
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

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Content Planning</h1>
        <p className="text-muted-foreground mt-2">
          Planning guidance derived from execution briefs. Context-only — no scheduling or task assignment.
        </p>
      </div>

      {/* Not found notice */}
      {showNotFoundNotice && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Plan not found for brief ID: {briefId}. Showing available plans.
          </p>
        </div>
      )}

      {/* List + Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Plan List */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-4">
            <h2 className="text-lg font-semibold mb-4">Content Plans</h2>
            <div className="space-y-2">
              {data.content_plans.map((plan) => (
                <button
                  key={plan.plan_id}
                  onClick={() => setSelectedPlanId(plan.plan_id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedPlanId === plan.plan_id
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-background border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">{plan.brief_title}</div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded border ${getContentTypeColor(plan.content_type)}`}>
                      {plan.content_type}
                    </span>
                    {plan.patternCoverage && (
                      <span className="text-xs text-muted-foreground">
                        Patterns: {plan.patternCoverage.patternsCount}
                      </span>
                    )}
                    {plan.governance.approved === false && (
                      <span className="text-xs text-orange-600">⚠</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="lg:col-span-2">
          {selectedPlan ? (
            <div className="rounded-lg border bg-card p-6 space-y-6">
              {/* Title and Governance */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedPlan.brief_title}</h2>
                    <p className="text-xs text-muted-foreground">
                      Source: Strategy Agent · Validated: Governance Agent
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getContentTypeColor(selectedPlan.content_type)}`}>
                      {selectedPlan.content_type}
                    </span>
                    {selectedPlan.governance.approved ? (
                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 border border-green-200">
                        Approved
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-800 border border-orange-200">
                        Warning
                      </span>
                    )}
                  </div>
                </div>
                {selectedPlan.governance.approved === false && selectedPlan.governance.notes && (
                  <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-xs text-orange-800">{selectedPlan.governance.notes}</p>
                  </div>
                )}
              </div>

              {/* Patterns */}
              {selectedPlan.patternCoverage && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Patterns</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-muted-foreground">
                      Patterns: {selectedPlan.patternCoverage.patternsCount}
                    </div>
                    <PatternChips
                      patternIds={selectedPlan.patternCoverage.topPatternIds}
                      topN={3}
                      showExamplesOnHover={true}
                      size="sm"
                    />
                  </div>
                </div>
              )}

              {/* Planning Guidance */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Planning Guidance</h3>
                <div className="space-y-3">
                  {selectedPlan.planning_guidance.focus && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Focus</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedPlan.planning_guidance.focus}
                      </p>
                    </div>
                  )}
                  {selectedPlan.planning_guidance.tone_notes && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Tone Notes</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedPlan.planning_guidance.tone_notes}
                      </p>
                    </div>
                  )}
                  {selectedPlan.planning_guidance.structure_notes && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Structure Notes</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedPlan.planning_guidance.structure_notes}
                      </p>
                    </div>
                  )}
                  {selectedPlan.planning_guidance.constraints && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Constraints</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedPlan.planning_guidance.constraints}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Link to Execution Brief */}
              <div className="pt-4 border-t">
                <Link
                  href={`/execution-prep/execution-briefs?brief=${selectedPlan.brief_id}`}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  View Execution Brief →
                </Link>
              </div>

              {/* Boundary copy */}
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  Planning guidance only. No content is scheduled, assigned, or published here.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground text-center">
                Select a plan from the list to view details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
