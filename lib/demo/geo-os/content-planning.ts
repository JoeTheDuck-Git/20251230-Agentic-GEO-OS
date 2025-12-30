export const contentPlanningDemo = {
  meta: {
    page: 'content_planning',
    generated_at: '2025-12-30T11:10:00Z',
    snapshot_id: 'snap_demo_001',
    source_agents: ['strategy_agent', 'governance_agent'],
  },
  content_plans: [
    {
      plan_id: 'plan_001',
      brief_id: 'brief_ai_001',
      brief_title: 'Positioning: AI Answer Comparatives',
      content_type: 'landing',
      patternCoverage: {
        patternsCount: 8,
        topPatternIds: [
          'pattern_comparison',
          'pattern_recommendation',
          'pattern_pros_cons',
        ],
      },
      planning_guidance: {
        focus: 'Comparison framing and decision criteria',
        tone_notes: 'Keep neutral wording',
        structure_notes: 'Add FAQ-style headings',
      },
      governance: {
        approved: true,
        notes: undefined,
      },
    },
    {
      plan_id: 'plan_002',
      brief_id: 'brief_ai_002',
      brief_title: 'Coverage: FAQ Cluster for Recurring Questions',
      content_type: 'faq',
      patternCoverage: {
        patternsCount: 12,
        topPatternIds: [
          'pattern_definition',
          'pattern_how_to',
          'pattern_checklist',
        ],
      },
      planning_guidance: {
        focus: 'Draft core FAQs matching question phrasing',
        constraints: 'Ensure no competitor names in headings. Validate claims.',
      },
      governance: {
        approved: true,
        notes: undefined,
      },
    },
    {
      plan_id: 'plan_003',
      brief_id: 'brief_ai_003',
      brief_title: 'Trust: Reliability & Uptime Proof Points',
      content_type: 'blog',
      patternCoverage: {
        patternsCount: 5,
        topPatternIds: [
          'pattern_trust',
          'pattern_definition',
          'pattern_use_case',
        ],
      },
      planning_guidance: {
        focus: 'Collect verifiable sources and draft a reliability section',
        constraints: 'Avoid absolute claims. Include references.',
      },
      governance: {
        approved: false,
        notes: 'Requires verification of all claims. Review with governance team before execution.',
      },
    },
  ],
};
