'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { OrganizationEntity } from '@gochamps/api-client';
import { initials } from './TournamentMiniCard';

const MAX_ORGANIZATIONS = 15;

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

interface OrganizationsSidebarProps {
  cmsUrl: string;
  organizations: OrganizationEntity[];
}

export const OrganizationsSidebar = ({
  cmsUrl,
  organizations
}: OrganizationsSidebarProps) => {
  const t = useTranslations('home');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-surface p-6">
      <button
        type="button"
        onClick={() => setIsExpanded(previous => !previous)}
        aria-expanded={isExpanded}
        className="flex w-full cursor-pointer items-center justify-between border-b border-border text-left md:cursor-default md:items-start"
      >
        <span className="text-sm font-bold text-foreground md:pb-2 md:text-xl">
          {t('organizations')}
        </span>
        <span className="p-2 text-muted md:hidden">
          <ChevronIcon isExpanded={isExpanded} />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 md:max-h-none md:overflow-visible md:opacity-100 ${
          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {organizations.length > 0 ? (
          <div className="flex flex-col">
            {organizations.slice(0, MAX_ORGANIZATIONS).map(organization => (
              <a
                key={organization.id}
                href={`${cmsUrl}/${organization.slug}`}
                className="flex items-center gap-2 border-b border-border px-3 py-2.5 text-foreground transition-colors last:border-b-0 hover:bg-primary/10 md:px-0 md:py-3"
              >
                <span className="h-8 w-8 flex-shrink-0">
                  {organization.logoUrl ? (
                    // Logos are arbitrary user-uploaded URLs, so they stay on a
                    // plain <img> — next/image would need every host
                    // allow-listed in next.config.js.
                    <img
                      src={organization.logoUrl}
                      alt={organization.name}
                      width={32}
                      height={32}
                      loading="lazy"
                      decoding="async"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-foreground">
                      {initials(organization.name)}
                    </span>
                  )}
                </span>
                <span className="flex-1 truncate text-[0.8125rem] font-medium md:text-sm">
                  {organization.name}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="px-3 py-6 text-center md:px-3.5 md:py-8">
            <p className="text-[0.8125rem] text-muted md:text-sm">
              {t('noOrganizationsViewedYet')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
