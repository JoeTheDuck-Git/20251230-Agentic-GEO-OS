'use client';

import { useState } from 'react';

export function Topbar() {
  const [selectedBrand] = useState('Acme Corp');
  const [selectedRegion] = useState('US');
  const [selectedTimeRange] = useState('Last 30 days');
  const [selectedSnapshot] = useState('2024-01-15 10:30 AM');

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-semibold">Agentic GEO OS</h1>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Brand:</span>
              <span className="font-medium">{selectedBrand}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Region:</span>
              <span className="font-medium">{selectedRegion}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Time Range:</span>
              <span className="font-medium">{selectedTimeRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Snapshot:</span>
              <span className="font-medium">{selectedSnapshot}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
            Read-only / No execution
          </div>
        </div>
      </div>
    </header>
  );
}

