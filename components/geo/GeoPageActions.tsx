'use client';

import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { buildShareUrl, copyToClipboard } from '@/lib/geo/share/shareLink';
import { showToast } from '@/lib/geo/share/toast';

// Simple SVG icons (no external dependency)
const CopyIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface GeoPageActionsProps {
  exportContext: {
    title: string;
    description?: string;
    items?: string[];
  };
  className?: string;
}

export function GeoPageActions({ exportContext, className }: GeoPageActionsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleCopyLink = async () => {
    const url = buildShareUrl(pathname, searchParams);
    const success = await copyToClipboard(url);
    if (success) {
      showToast('Link copied');
    } else {
      showToast('Failed to copy link');
    }
  };

  const defaultExportItems = [
    'PDF report',
    'CSV tables',
    'Executive summary',
  ];

  const exportItems = exportContext.items || defaultExportItems;

  return (
    <>
      <div className={`flex items-center gap-2 ${className || ''}`}>
        <button
          onClick={handleCopyLink}
          className="px-3 py-1.5 text-sm border rounded-md bg-background hover:bg-muted/50 transition-colors flex items-center gap-1.5"
          title="Copy link"
        >
          <CopyIcon />
          <span className="hidden sm:inline">Copy link</span>
        </button>
        <button
          onClick={() => setIsExportOpen(true)}
          className="px-3 py-1.5 text-sm border rounded-md bg-background hover:bg-muted/50 transition-colors flex items-center gap-1.5"
          title="Export"
        >
          <DownloadIcon />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Export Modal */}
      {isExportOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsExportOpen(false)}
        >
          <div 
            className="bg-background rounded-lg border shadow-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Export (Coming soon)</h2>
                <button
                  type="button"
                  onClick={() => setIsExportOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XIcon />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This is a demo stub. Export will generate a shareable report for <strong>{exportContext.title}</strong>.
                </p>

                {exportContext.description && (
                  <p className="text-sm text-muted-foreground">
                    {exportContext.description}
                  </p>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-medium">Planned export formats:</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {exportItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setIsExportOpen(false)}
                    className="px-4 py-2 text-sm border rounded-md bg-background hover:bg-muted/50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setIsExportOpen(false);
                      showToast('Feature request noted');
                    }}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Request feature
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

