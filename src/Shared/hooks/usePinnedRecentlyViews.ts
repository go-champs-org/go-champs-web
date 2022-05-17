import { useEffect, useState } from 'react';
import { ApiRecentlyView } from '../httpClient/apiTypes';

const PINNED_TOURNAMENTS_KEY = 'pinnedRecentlyViews';

export interface PINNED_RECENTLY_VIEWS_MAP {
  [id: string]: ApiRecentlyView;
}

const retrievePinnedRecentlyView = () => {
  const pinnedRecentlyViewsString =
    localStorage.getItem(PINNED_TOURNAMENTS_KEY) || '[]';
  const pinnedRecentlyViews = JSON.parse(
    pinnedRecentlyViewsString
  ) as ApiRecentlyView[];

  return pinnedRecentlyViews;
};

const savePinnedRecentlyView = (newPinnedRecentlyViews: ApiRecentlyView[]) => {
  localStorage.setItem(
    PINNED_TOURNAMENTS_KEY,
    JSON.stringify(newPinnedRecentlyViews)
  );
};

const toMap = (
  pinnedRecentlyViews: ApiRecentlyView[]
): PINNED_RECENTLY_VIEWS_MAP => {
  return pinnedRecentlyViews.reduce((map, pinnedRecentlyView) => {
    return {
      ...map,
      [pinnedRecentlyView.tournament.id]: pinnedRecentlyView
    };
  }, {});
};

const toMergedMap = (
  pinnedRecentlyViews: ApiRecentlyView[],
  apiRecentelyViews: ApiRecentlyView[]
): PINNED_RECENTLY_VIEWS_MAP => {
  return pinnedRecentlyViews.reduce((map, pinnedRecentlyView) => {
    const apiRecentelyView = apiRecentelyViews.find(
      apiRecentelyView =>
        apiRecentelyView.tournament.id === pinnedRecentlyView.tournament.id
    );

    const newPinnedRecentlyView = apiRecentelyView || pinnedRecentlyView;

    return {
      ...map,
      [pinnedRecentlyView.tournament.id]: newPinnedRecentlyView
    };
  }, {});
};

const usePinnedRecentlyViews = (apiRecentlyViews: ApiRecentlyView[]) => {
  const [recentlyViews, setRecentlyViews] = useState<PINNED_RECENTLY_VIEWS_MAP>(
    {}
  );

  useEffect(() => {
    const pinnedRecentlyViews = retrievePinnedRecentlyView();
    const pinnedRecentlyViewMap = toMergedMap(
      pinnedRecentlyViews,
      apiRecentlyViews
    );

    setRecentlyViews(pinnedRecentlyViewMap);

    const newPinnedRecentlyViews = Object.keys(pinnedRecentlyViewMap).map(
      (id: string) => pinnedRecentlyViewMap[id]
    );
    savePinnedRecentlyView(newPinnedRecentlyViews);

    return () => undefined;
  }, []);

  const pinRecentlyView = (recentlyView: ApiRecentlyView) => {
    const pinnedRecentlyViews = retrievePinnedRecentlyView();
    const newPinnedRecentlyViews = [...pinnedRecentlyViews, recentlyView];

    savePinnedRecentlyView(newPinnedRecentlyViews);

    const newPinnedRecentlyViewMap = toMap(newPinnedRecentlyViews);
    setRecentlyViews(newPinnedRecentlyViewMap);
  };

  const removeRecentlyView = (recentlyView: ApiRecentlyView) => {
    const pinnedRecentlyViews = retrievePinnedRecentlyView();
    const newPinnedRecentlyViews = pinnedRecentlyViews.filter(
      pinnedRecentlyView =>
        pinnedRecentlyView.tournament.id !== recentlyView.tournament.id
    );

    savePinnedRecentlyView(newPinnedRecentlyViews);

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
