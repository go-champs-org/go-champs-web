'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Avatar, ScopeFilter } from '@gochamps/ui';
import type { LeaderCard, LeaderRow } from '@/src/stats/statLeaders';
import type { StatScope } from '@/src/stats/rosterStats';

const CARD_HEADER =
  'bg-[color-mix(in_srgb,var(--color-primary)_40%,var(--color-surface))]';

function LeaderItem({ leader, position }: { leader: LeaderRow; position: number }) {
  const isFirst = position === 1;

  return (
    <li className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0">
      <span className="w-4 shrink-0 text-xs text-muted">{position}</span>
      <Avatar
        name={leader.playerName}
        logoUrl={leader.photoUrl}
        size={36}
        className="rounded-full text-xs"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-foreground">
          {leader.playerName}
        </span>
        <span className="truncate text-xs text-muted">{leader.teamName}</span>
      </div>
      <span
        className={`shrink-0 text-base font-bold tabular-nums ${isFirst ? 'text-accent-text' : 'text-foreground'}`}
      >
        {leader.value}
      </span>
    </li>
  );
}

export interface StatLeaderCardProps {
  card: LeaderCard;
  statsPath: string;
  seeAllLabel: string;
  scopeLabels: Record<StatScope, string>;
  scopeLegend: string;
  className?: string;
}

// The client island of a highlights card: switching between the total and
// the per-game ranking is local state, both rankings already came with the
// page. A card with a single scope has nothing to switch.
export function StatLeaderCard({
  card,
  statsPath,
  seeAllLabel,
  scopeLabels,
  scopeLegend,
  className = ''
}: StatLeaderCardProps) {
  const [activeScope, setActiveScope] = useState<StatScope>(card.scopes[0].scope);
  const current =
    card.scopes.find(cardScope => cardScope.scope === activeScope) || card.scopes[0];

  return (
    <section
      data-testid="stat-leader-card"
      className={`flex flex-col overflow-hidden rounded-xl bg-surface shadow-[0_2px_10px_var(--shadow-elevated)] ${className}`}
    >
      <div className={`${CARD_HEADER} flex items-center justify-between gap-2 px-4 py-2.5`}>
        <h3 className="truncate text-xs font-bold uppercase tracking-[0.5px] text-foreground">
          {card.title}
        </h3>
        {card.scopes.length > 1 && (
          <ScopeFilter
            scopes={card.scopes.map(cardScope => cardScope.scope)}
            scopeLabels={scopeLabels}
            legend={scopeLegend}
            activeScope={current.scope}
            onSelect={setActiveScope}
            testId="stat-leader-scope"
          />
        )}
      </div>
      <ol className="flex-1">
        {current.leaders.map((leader, index) => (
          <LeaderItem key={leader.playerId} leader={leader} position={index + 1} />
        ))}
      </ol>
      <Link
        href={`${statsPath}?stat=${encodeURIComponent(current.statKey)}`}
        className="border-t border-border py-2.5 text-center text-xs font-semibold text-foreground hover:text-accent-text hover:underline"
      >
        {seeAllLabel} →
      </Link>
    </section>
  );
}
