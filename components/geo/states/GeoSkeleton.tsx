'use client';

import { cn } from '@/lib/utils';

interface GeoSkeletonProps {
  variant?: 'page' | 'card' | 'table' | 'detail';
  className?: string;
}

export function GeoSkeleton({ variant = 'page', className }: GeoSkeletonProps) {
  const baseClasses = 'rounded bg-muted animate-pulse';

  switch (variant) {
    case 'page':
      return (
        <div className={cn('space-y-6', className)}>
          <div className={cn(baseClasses, 'h-8 w-64')} />
          <div className={cn(baseClasses, 'h-4 w-96')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={cn(baseClasses, 'h-24')} />
            ))}
          </div>
          <div className={cn(baseClasses, 'h-64')} />
        </div>
      );

    case 'card':
      return (
        <div className={cn('rounded-lg border bg-card p-6 space-y-4', className)}>
          <div className={cn(baseClasses, 'h-6 w-48')} />
          <div className={cn(baseClasses, 'h-4 w-full')} />
          <div className={cn(baseClasses, 'h-4 w-3/4')} />
        </div>
      );

    case 'table':
      return (
        <div className={cn('rounded-lg border bg-card', className)}>
          <div className={cn(baseClasses, 'h-12 w-full')} />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={cn(baseClasses, 'h-16 w-full border-t')} />
          ))}
        </div>
      );

    case 'detail':
      return (
        <div className={cn('space-y-4', className)}>
          <div className={cn(baseClasses, 'h-8 w-64')} />
          <div className={cn(baseClasses, 'h-4 w-full')} />
          <div className={cn(baseClasses, 'h-4 w-5/6')} />
          <div className={cn(baseClasses, 'h-32 w-full')} />
        </div>
      );

    default:
      return <div className={cn(baseClasses, 'h-4 w-full', className)} />;
  }
}

