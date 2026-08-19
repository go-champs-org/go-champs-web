'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { RecentlyViewEntity } from '@gochamps/api-client';
import { TournamentGrid, TournamentGridShimmer } from './TournamentGrid';
import { TournamentMiniCard } from './TournamentMiniCard';
import { usePinnedRecentlyViews } from './usePinnedRecentlyViews';

const MAX_TOURNAMENTS = 15;

interface RecentTournamentsProps {
  cmsUrl: string;
}

export const RecentTournaments = ({ cmsUrl }: RecentTournamentsProps) => {
  const t = useTranslations('home');
  const [recentlyViews, setRecentlyViews] = useState<RecentlyViewEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pinnedRecentlyViews, pinRecentlyView, removeRecentlyView } =
    usePinnedRecentlyViews(recentlyViews);

  useEffect(() => {
    let isCurrent = true;

    fetch('/api/recently-views')
      .then(response => (response.ok ? response.json() : []))
      .catch(() => [])
      .then((views: RecentlyViewEntity[]) => {
        if (!isCurrent) return;
        setRecentlyViews(views);
        setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  if (isLoading) {
    return <TournamentGridShimmer />;
  }

  const pinnedIds = new Set(
    pinnedRecentlyViews.map(recentlyView => recentlyView.tournamentId)
  );
  // Pinned tournaments head the list; the API order carries the rest, and the
  // cap applies to both together.
  const tournaments = [
    ...pinnedRecentlyViews,
    ...recentlyViews.filter(
      recentlyView => !pinnedIds.has(recentlyView.tournamentId)
    )
  ].slice(0, MAX_TOURNAMENTS);

  return (
    <TournamentGrid>
      {tournaments.map(recentlyView => {
        const isPinned = pinnedIds.has(recentlyView.tournamentId);

        return (
          <TournamentMiniCard
            key={recentlyView.tournamentId}
            name={recentlyView.tournamentName}
            organizationName={recentlyView.organizationName}
            organizationLogoUrl={recentlyView.organizationLogoUrl}
            href={`${cmsUrl}/${recentlyView.organizationSlug}/${recentlyView.tournamentSlug}`}
            isPinned={isPinned}
            pinLabel={isPinned ? t('unpin') : t('pin')}
            onTogglePin={() =>
              isPinned
                ? removeRecentlyView(recentlyView)
                : pinRecentlyView(recentlyView)
            }
          />
        );
      })}
    </TournamentGrid>
  );
};
