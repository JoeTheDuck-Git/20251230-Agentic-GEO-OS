'use client';

import { ReactNode } from 'react';
import { GeoLink } from '@/components/geo/GeoLink';
import { AlertCircleIcon, FileXIcon } from '@/components/geo/icons/GeoIcons';

interface GeoEmptyStateAction {
  label: string;
  href: string;
  variant?: 'default' | 'secondary' | 'outline';
}

interface GeoEmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: GeoEmptyStateAction[];
  note?: string;
  className?: string;
}

const defaultIcon = <AlertCircleIcon className="h-12 w-12 text-muted-foreground" />;

const buttonVariants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-muted text-muted-foreground hover:bg-muted/80',
  outline: 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50',
};

export function GeoEmptyState({
  title,
  description,
  icon = defaultIcon,
  actions = [],
  note,
  className,
}: GeoEmptyStateProps) {
  return (
    <div className={`rounded-lg border bg-card p-12 text-center ${className || ''}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-muted-foreground">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground max-w-md">{description}</p>
          )}
        </div>
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {actions.map((action, idx) => (
              <GeoLink key={idx} href={action.href}>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${buttonVariants[action.variant || 'default']}`}
                >
                  {action.label}
                </button>
              </GeoLink>
            ))}
          </div>
        )}
        {note && (
          <p className="text-xs text-muted-foreground mt-4 max-w-md">{note}</p>
        )}
      </div>
    </div>
  );
}

// Export FileXIcon for use in pages
export { FileXIcon };

