import type { RecentlyViewEntity } from '@gochamps/api-client';

const MAX_TOURNAMENTS = 15;

// The board shows 15; up to 15 pins can each hide a server entry, so 30 always fills it.
export const SERVER_RECENTLY_VIEWS_LIMIT = MAX_TOURNAMENTS * 2;

export const serverRecentlyViews = (
  recentlyViews: RecentlyViewEntity[]
): RecentlyViewEntity[] => recentlyViews.slice(0, SERVER_RECENTLY_VIEWS_LIMIT);

/**
 * Pinned tournaments head the board and the API order carries the rest. A pin
 * the API no longer returns still shows, and the cap applies to both groups
 * together.
 */
export const orderRecentlyViews = (
  recentlyViews: RecentlyViewEntity[],
  pinnedRecentlyViews: RecentlyViewEntity[]
): RecentlyViewEntity[] => {
  const pinnedIds = new Set(
    pinnedRecentlyViews.map(recentlyView => recentlyView.tournamentId)
  );

  return [
    ...pinnedRecentlyViews,
    ...recentlyViews.filter(
      recentlyView => !pinnedIds.has(recentlyView.tournamentId)
    )
  ].slice(0, MAX_TOURNAMENTS);
};
