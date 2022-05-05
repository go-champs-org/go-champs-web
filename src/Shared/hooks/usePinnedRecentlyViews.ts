import { useEffect, useState } from 'react';
import { ApiRecentlyView } from '../httpClient/apiTypes';

const PINNED_TOURNAMENTS_KEY = 'pinnedRecentlyViews';

const usePinnedRecentlyViews = () => {
  const [recentlyViews, setRecentlyViews] = useState<ApiRecentlyView[]>([]);

  const pinnedRecentlyViewsString =
    localStorage.getItem(PINNED_TOURNAMENTS_KEY) || '[]';
  const pinnedRecentlyViews = JSON.parse(
    pinnedRecentlyViewsString
  ) as ApiRecentlyView[];

  useEffect(() => {
    setRecentlyViews(pinnedRecentlyViews);

    return () => undefined;
  }, []);

  const pinRecentlyView = (recentlyView: ApiRecentlyView) => {
    const newPinnedRecentlyViews = [...pinnedRecentlyViews, recentlyView];

    localStorage.setItem(
      PINNED_TOURNAMENTS_KEY,
      JSON.stringify(newPinnedRecentlyViews)
    );

    setRecentlyViews(newPinnedRecentlyViews);
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

    setRecentlyViews(newPinnedRecentlyViews);
  };

  return {
    pinRecentlyView,
    removeRecentlyView,
    recentlyViews
  };
};

export default usePinnedRecentlyViews;
