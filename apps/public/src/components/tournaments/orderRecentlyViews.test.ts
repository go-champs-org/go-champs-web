import type { RecentlyViewEntity } from '@gochamps/api-client';
import {
  orderRecentlyViews,
  SERVER_RECENTLY_VIEWS_LIMIT,
  serverRecentlyViews
} from './orderRecentlyViews';

const recentlyView = (id: string): RecentlyViewEntity => ({
  tournamentId: id,
  tournamentName: `Tournament ${id}`,
  tournamentSlug: `tournament-${id}`,
  organizationName: 'Test Organization',
  organizationSlug: 'test-organization',
  organizationLogoUrl: '',
  views: 1
});

const ids = (views: RecentlyViewEntity[]) =>
  views.map(view => view.tournamentId);

describe('orderRecentlyViews', () => {
  it('keeps the API order when nothing is pinned', () => {
    const ordered = orderRecentlyViews([recentlyView('a'), recentlyView('b')], []);

    expect(ids(ordered)).toEqual(['a', 'b']);
  });

  it('moves pinned tournaments to the front', () => {
    const ordered = orderRecentlyViews(
      [recentlyView('a'), recentlyView('b'), recentlyView('c')],
      [recentlyView('c')]
    );

    expect(ids(ordered)).toEqual(['c', 'a', 'b']);
  });

  it('never lists a pinned tournament twice', () => {
    const ordered = orderRecentlyViews(
      [recentlyView('a'), recentlyView('b')],
      [recentlyView('b')]
    );

    expect(ids(ordered)).toEqual(['b', 'a']);
  });

  it('keeps a pin the API no longer returns', () => {
    const ordered = orderRecentlyViews([recentlyView('a')], [recentlyView('z')]);

    expect(ids(ordered)).toEqual(['z', 'a']);
  });

  it('caps the list at fifteen across both groups', () => {
    const ordered = orderRecentlyViews(
      Array.from({ length: 20 }, (_unused, index) =>
        recentlyView(String(index))
      ),
      [recentlyView('pinned')]
    );

    expect(ordered).toHaveLength(15);
    expect(ids(ordered)[0]).toBe('pinned');
  });
});

describe('serverRecentlyViews', () => {
  it('keeps enough for a full board even when every pin repeats a server entry', () => {
    const server = Array.from({ length: 75 }, (_, index) =>
      recentlyView(`t${index}`)
    );
    const pinned = server.slice(0, 15);

    expect(orderRecentlyViews(serverRecentlyViews(server), pinned)).toEqual(
      orderRecentlyViews(server, pinned)
    );
  });

  it('keeps enough when no pin repeats a server entry', () => {
    const server = Array.from({ length: 75 }, (_, index) =>
      recentlyView(`t${index}`)
    );
    const pinned = Array.from({ length: 3 }, (_, index) =>
      recentlyView(`p${index}`)
    );

    expect(orderRecentlyViews(serverRecentlyViews(server), pinned)).toEqual(
      orderRecentlyViews(server, pinned)
    );
  });

  it('caps the list the page ships', () => {
    const server = Array.from({ length: 75 }, (_, index) =>
      recentlyView(`t${index}`)
    );
    expect(serverRecentlyViews(server)).toHaveLength(SERVER_RECENTLY_VIEWS_LIMIT);
  });
});
