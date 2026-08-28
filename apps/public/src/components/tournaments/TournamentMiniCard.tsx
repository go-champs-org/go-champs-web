'use client';

import { FaThumbtack } from 'react-icons/fa';
import { Avatar } from '@gochamps/ui';

export interface TournamentMiniCardProps {
  name: string;
  organizationName: string;
  organizationLogoUrl: string;
  href: string;
  isPinned?: boolean;
  pinLabel?: string;
  onTogglePin?: () => void;
}

export function TournamentMiniCard({
  name,
  organizationName,
  organizationLogoUrl,
  href,
  isPinned = false,
  pinLabel,
  onTogglePin
}: TournamentMiniCardProps) {
  return (
    // A <button> inside an <a> is nested interactive content: invalid HTML,
    // and two overlapping controls for keyboard and screen-reader users. The
    // link covers the card through its ::after overlay instead.
    <div className="relative flex flex-col rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-[0_4px_16px_var(--shadow-elevated)]">
      <header className="flex h-12 w-full items-center font-semibold text-foreground">
        <Avatar name={organizationName} logoUrl={organizationLogoUrl} size={40} className="text-base" />
        <a
          href={href}
          className="ml-2 line-clamp-2 flex-1 after:absolute after:inset-0 after:content-['']"
        >
          {name}
        </a>
        {onTogglePin && (
          <button
            type="button"
            onClick={onTogglePin}
            className={`relative z-10 flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[0.65rem] font-semibold transition-opacity hover:opacity-90 ${
              isPinned
                ? 'bg-secondary text-neutral-900'
                : 'bg-primary text-foreground'
            }`}
          >
            <FaThumbtack className="h-3 w-3" aria-hidden="true" />
            <span>{pinLabel}</span>
          </button>
        )}
      </header>
      <span className="my-4 block w-full truncate font-semibold text-primary-dark">
        {organizationName}
      </span>
    </div>
  );
}
