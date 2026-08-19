'use client';

import { useTranslations } from 'next-intl';
import type { RecentlyViewEntity } from '@gochamps/api-client';
import { TournamentGrid } from './TournamentGrid';
import { TournamentMiniCard } from './TournamentMiniCard';
import { usePinnedRecentlyViews } from './usePinnedRecentlyViews';

const MAX_TOURNAMENTS = 15;

interface RecentTournamentsProps {
  cmsUrl: string;
  recentlyViews: RecentlyViewEntity[];
}

export const RecentTournaments = ({
  cmsUrl,
  recentlyViews
}: RecentTournamentsProps) => {
  const t = useTranslations('home');
  const { pinnedRecentlyViews, pinRecentlyView, removeRecentlyView } =
    usePinnedRecentlyViews(recentlyViews);

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
