import { act, renderHook } from '@testing-library/react';
import type { RecentlyViewEntity } from '@gochamps/api-client';
import {
  PINNED_RECENTLY_VIEWS_KEY,
  usePinnedRecentlyViews
} from './usePinnedRecentlyViews';

const recentlyView = (
  tournamentId: string,
  views = 1
): RecentlyViewEntity => ({
  tournamentId,
  tournamentName: `Tournament ${tournamentId}`,
  tournamentSlug: `tournament-${tournamentId}`,
  organizationName: 'Test Organization',
  organizationSlug: 'test-organization',
  organizationLogoUrl: '',
  views
});

const storedIds = () =>
  (
    JSON.parse(
      localStorage.getItem(PINNED_RECENTLY_VIEWS_KEY) || '[]'
    ) as RecentlyViewEntity[]
  ).map(view => view.tournamentId);

describe('usePinnedRecentlyViews', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with nothing pinned', () => {
    const { result } = renderHook(() => usePinnedRecentlyViews([]));

    expect(result.current.pinnedRecentlyViews).toEqual([]);
  });

  it('pins a tournament and persists it', () => {
    const { result } = renderHook(() => usePinnedRecentlyViews([]));

    act(() => result.current.pinRecentlyView(recentlyView('t1')));

    expect(
      result.current.pinnedRecentlyViews.map(view => view.tournamentId)
    ).toEqual(['t1']);
    expect(storedIds()).toEqual(['t1']);
  });

  it('unpins a tournament and drops it from storage', () => {
    localStorage.setItem(
      PINNED_RECENTLY_VIEWS_KEY,
      JSON.stringify([recentlyView('t1'), recentlyView('t2')])
    );
    const { result } = renderHook(() => usePinnedRecentlyViews([]));

    act(() => result.current.removeRecentlyView(recentlyView('t1')));

    expect(
      result.current.pinnedRecentlyViews.map(view => view.tournamentId)
    ).toEqual(['t2']);
    expect(storedIds()).toEqual(['t2']);
  });

  it('refreshes stored entries with the data the API just returned', () => {
    localStorage.setItem(
      PINNED_RECENTLY_VIEWS_KEY,
      JSON.stringify([recentlyView('t1', 1)])
    );

    const { result } = renderHook(() =>
      usePinnedRecentlyViews([recentlyView('t1', 99)])
    );

    expect(result.current.pinnedRecentlyViews[0].views).toBe(99);
    expect(
      (
        JSON.parse(
          localStorage.getItem(PINNED_RECENTLY_VIEWS_KEY) || '[]'
        ) as RecentlyViewEntity[]
      )[0].views
    ).toBe(99);
  });

  it('survives corrupted storage', () => {
    localStorage.setItem(PINNED_RECENTLY_VIEWS_KEY, 'not json');

    const { result } = renderHook(() => usePinnedRecentlyViews([]));

    expect(result.current.pinnedRecentlyViews).toEqual([]);
  });
});
