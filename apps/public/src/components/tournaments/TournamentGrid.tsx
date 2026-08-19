'use client';

import type { ReactNode } from 'react';

export const TournamentGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
    {children}
  </div>
);

const TournamentCardShimmer = () => (
  <div className="flex animate-pulse flex-col rounded-xl border border-border bg-surface p-4">
    <div className="flex h-12 w-full items-center gap-2">
      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-border" />
      <div className="h-4 flex-1 rounded bg-border" />
    </div>
    <div className="my-4 h-4 w-2/3 rounded bg-border" />
  </div>
);

export const TournamentGridShimmer = () => (
  <TournamentGrid>
    <TournamentCardShimmer />
    <TournamentCardShimmer />
    <TournamentCardShimmer />
  </TournamentGrid>
);
