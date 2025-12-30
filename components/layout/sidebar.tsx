'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  {
    group: 'Intelligence',
    items: [
      { label: 'GEO Overview', href: '/intelligence/geo-overview' },
      { label: 'Topic Performance', href: '/intelligence/topic-performance' },
      { label: 'Competitor Intelligence', href: '/intelligence/competitor-intelligence' },
      { label: 'Market Voice', href: '/intelligence/market-voice' },
    ],
  },
  {
    group: 'Decisions',
    items: [
      { label: 'Actionable Items', href: '/decisions/actionable-items' },
      { label: 'Opportunity Analysis', href: '/decisions/opportunity-analysis' },
    ],
  },
  {
    group: 'Execution Prep',
    items: [
      { label: 'Execution Briefs', href: '/execution-prep/execution-briefs' },
      { label: 'Content Planning', href: '/execution-prep/content-planning' },
      { label: 'Content Specs', href: '/execution-prep/content-specs' },
    ],
  },
  {
    group: 'Measurement',
    items: [
      { label: 'Content Performance', href: '/measurement/content-performance' },
      { label: 'Traffic & Engagement', href: '/measurement/traffic-engagement' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 border-r bg-background p-6">
      <div className="space-y-8">
        {navigation.map((section) => (
          <div key={section.group}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.group}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const isDisabled = 'disabled' in item && item.disabled;

                if (isDisabled) {
                  return (
                    <div
                      key={item.href}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50"
                    >
                      <span>{item.label}</span>
                      <span className="ml-auto text-xs">Coming soon</span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-muted font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

