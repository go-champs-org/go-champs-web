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
 * What still needs writing: nothing for an empty list, and nothing when the
 * last write already holds this exact content — which is what keeps the effect
 * from firing on every new array identity the caller passes in.
 */
const pinsToPersist = (
  pins: RecentlyViewEntity[],
  lastPersisted: string | null
): string | null => {
  const serialized = JSON.stringify(pins);
  const isWorthWriting = pins.length > 0 && serialized !== lastPersisted;

  return isWorthWriting ? serialized : null;
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
    // Persist the refreshed copies so a visitor who comes back offline still
    // sees current names.
    const serialized = pinsToPersist(pinnedRecentlyViews, lastPersisted.current);
    if (!serialized) return;

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
