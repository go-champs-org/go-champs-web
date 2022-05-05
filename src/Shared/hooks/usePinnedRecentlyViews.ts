import { useEffect, useState } from 'react';
import { ApiRecentlyView } from '../httpClient/apiTypes';

const PINNED_TOURNAMENTS_KEY = 'pinnedRecentlyViews';

export interface PINNED_RECENTLY_VIEWS_MAP {
  [id: string]: ApiRecentlyView;
};

const toMap = (apiRecentlyViews: ApiRecentlyView[]): PINNED_RECENTLY_VIEWS_MAP => {
  return apiRecentlyViews.reduce((map, recentlyView) => {
    return {
      ...map,
      [recentlyView.tournament.id]: recentlyView,
    }
  }, {});
};

const usePinnedRecentlyViews = () => {
  const [recentlyViews, setRecentlyViews] = useState<PINNED_RECENTLY_VIEWS_MAP>({});

  const pinnedRecentlyViewsString =
    localStorage.getItem(PINNED_TOURNAMENTS_KEY) || '[]';
  const pinnedRecentlyViews = JSON.parse(
    pinnedRecentlyViewsString
  ) as ApiRecentlyView[];

  useEffect(() => {
    const pinnedRecentlyViewMap = toMap(pinnedRecentlyViews);
    setRecentlyViews(pinnedRecentlyViewMap);

    return () => undefined;
  }, []);

  const pinRecentlyView = (recentlyView: ApiRecentlyView) => {
    const newPinnedRecentlyViews = [...pinnedRecentlyViews, recentlyView];

    localStorage.setItem(
      PINNED_TOURNAMENTS_KEY,
      JSON.stringify(newPinnedRecentlyViews)
    );

    const newPinnedRecentlyViewMap = toMap(newPinnedRecentlyViews);
    setRecentlyViews(newPinnedRecentlyViewMap);
  };

  const removeRecentlyView = (recentlyView: ApiRecentlyView) => {
    const newPinnedRecentlyViews = pinnedRecentlyViews.filter(
      pinnedRecentlyView =>
        pinnedRecentlyView.tournament.id !== recentlyView.tournament.id
    );

    localStorage.setItem(
      PINNED_TOURNAMENTS_KEY,
      JSON.stringify(newPinnedRecentlyViews)
    );

    const newPinnedRecentlyViewMap = toMap(newPinnedRecentlyViews);
    setRecentlyViews(newPinnedRecentlyViewMap);
  };

  return {
    pinRecentlyView,
    removeRecentlyView,
    recentlyViews
  };
};

export default usePinnedRecentlyViews;
