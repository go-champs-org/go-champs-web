'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { RecentlyViewEntity } from '@gochamps/api-client';

export const PINNED_RECENTLY_VIEWS_KEY = 'pinnedRecentlyViews';

const readStoredPins = (): RecentlyViewEntity[] => {
  try {
    const stored = localStorage.getItem(PINNED_RECENTLY_VIEWS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? (parsed as RecentlyViewEntity[]) : [];
  } catch {
    // A hand-edited or half-written entry must not take the home page down.
    return [];
  }
};

const writeStoredPins = (pins: RecentlyViewEntity[]) => {
  localStorage.setItem(PINNED_RECENTLY_VIEWS_KEY, JSON.stringify(pins));
};

/**
 * Keeps the tournaments the visitor pinned on the home page. They live in
 * localStorage: the API's recently viewed list is global, so pinning is the
 * only per-visitor state the public app has.
 */
export const usePinnedRecentlyViews = (
  apiRecentlyViews: RecentlyViewEntity[]
) => {
  const [storedPins, setStoredPins] = useState<RecentlyViewEntity[]>([]);
  const lastPersisted = useRef<string | null>(null);

  useEffect(() => {
    setStoredPins(readStoredPins());
  }, []);

  // A pin can sit in storage for weeks; the API response is the fresher copy of
  // the same tournament, so it wins whenever it is present.
  const pinnedRecentlyViews = useMemo(
    () =>
      storedPins.map(
        pin =>
          apiRecentlyViews.find(
            recentlyView => recentlyView.tournamentId === pin.tournamentId
          ) || pin
      ),
    [storedPins, apiRecentlyViews]
  );

  useEffect(() => {
    if (pinnedRecentlyViews.length === 0) return;

    // Persist the refreshed copies so a visitor who comes back offline still
    // sees current names. Comparing against the last write keeps this effect
    // from re-running on every new array identity from the caller.
    const serialized = JSON.stringify(pinnedRecentlyViews);
    if (serialized === lastPersisted.current) return;

    lastPersisted.current = serialized;
    localStorage.setItem(PINNED_RECENTLY_VIEWS_KEY, serialized);
  }, [pinnedRecentlyViews]);

  const pinRecentlyView = (recentlyView: RecentlyViewEntity) => {
    const newPins = [...readStoredPins(), recentlyView];
    writeStoredPins(newPins);
    setStoredPins(newPins);
  };

  const removeRecentlyView = (recentlyView: RecentlyViewEntity) => {
    const newPins = readStoredPins().filter(
      pin => pin.tournamentId !== recentlyView.tournamentId
    );
    writeStoredPins(newPins);
    setStoredPins(newPins);
  };

  return { pinnedRecentlyViews, pinRecentlyView, removeRecentlyView };
};
