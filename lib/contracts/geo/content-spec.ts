// Note: Install zod first: npm install zod

import { z } from 'zod';

export const contentSpecSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['landing', 'blog', 'faq']),
  status: z.enum(['approved', 'warning']),
  priority: z.enum(['high', 'medium', 'low']),
  confidence: z.number().min(0).max(100),
  primaryTopic: z.string(),
  targetSlug: z.string(),
  audience: z.string(),
  patternsTop5: z.array(z.string()),
  objective: z.string(),
  successCriteria: z.array(z.string()),
  outline: z.array(z.object({
    heading: z.string(),
    bullets: z.array(z.string()).optional(),
  })),
  coverageRequirements: z.array(z.string()),
  constraints: z.object({
    mustDo: z.array(z.string()),
    mustNotDo: z.array(z.string()),
  }),
  evidenceRequirements: z.array(z.string()),
  claimsChecklist: z.array(z.object({
    claim: z.string(),
    risk: z.enum(['low', 'medium', 'high']),
  })),
  seoAiDiscoverability: z.object({
    schema: z.array(z.string()),
    internalLinks: z.array(z.string()),
    llmsTxtNote: z.string().optional(),
  }),
  ctaBlocks: z.object({
    primary: z.object({
      label: z.string(),
      href: z.string(),
    }),
    secondary: z.object({
      label: z.string(),
      href: z.string(),
    }).optional(),
    toneNote: z.string().optional(),
  }),
  linkedBriefId: z.string(),
  generatedAt: z.string(),
  validatedAt: z.string(),
  snapshotId: z.string(),
});

export const contentSpecsDemoSchema = z.object({
  meta: z.object({
    page: z.string(),
    generated_at: z.string(),
    snapshot_id: z.string(),
    source_agents: z.array(z.string()),
  }),
  content_specs: z.array(contentSpecSchema),
});

export type ContentSpec = z.infer<typeof contentSpecSchema>;
export type ContentSpecsDemo = z.infer<typeof contentSpecsDemoSchema>;

// Validation function (for dev only)
export function validateContentSpecsDemo(data: unknown): ContentSpecsDemo {
  if (process.env.NODE_ENV === 'development') {
    return contentSpecsDemoSchema.parse(data);
  }
  return data as ContentSpecsDemo;
}

