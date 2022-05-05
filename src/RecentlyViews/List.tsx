import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import recentlyViewsHttpClient from '../RecentlyViews/recentlyViewsHttpClient';
import Result, { PinnedResult, ResultShimmer } from './Result';
import { ApiRecentlyView } from '../Shared/httpClient/apiTypes';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { Link } from 'react-router-dom';
import usePinnedRecentlyViews from '../Shared/hooks/usePinnedRecentlyViews';

const ListShimmer = (
  <div className="columns is-multiline">
    <ResultShimmer />
    <ResultShimmer />
    <ResultShimmer />
  </div>
);

const List: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyViews, setTournaments] = useState<ApiRecentlyView[]>([]);
  const {
    recentlyViews: pinnedRecentlyViews,
    pinRecentlyView,
    removeRecentlyView
  } = usePinnedRecentlyViews(recentlyViews);

  const pinRecentlyViewClickHandler = (recentlyView: ApiRecentlyView) => (
    event: React.MouseEvent
  ) => {
    event.preventDefault();

    pinRecentlyView(recentlyView);

    const newRecentlyViews = recentlyViews.filter(
      apiRecentlyView =>
        apiRecentlyView.tournament.id !== recentlyView.tournament.id
    );
    setTournaments(newRecentlyViews);
  };

  const removeRecentlyViewClickHandler = (recentlyView: ApiRecentlyView) => (
    event: React.MouseEvent
  ) => {
    event.preventDefault();

    removeRecentlyView(recentlyView);
  };

  useEffect(() => {
    recentlyViewsHttpClient.get().then(results => {
      // Set back to false since request finished
      setIsLoading(false);
      // Set results state
      const resultsWithNoTests = results.filter(
        (result: ApiRecentlyView) =>
          !result.tournament.slug.includes('test') &&
          !pinnedRecentlyViews[result.tournament.id]
      );
      setTournaments(resultsWithNoTests);
    });

    return () => undefined;
  }, [pinnedRecentlyViews]);

  return (
    <section className="container">
      <div className="hero">
        <div className="hero-head">
          <div className="container">
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <h1 className="title">
                    <Trans>tournaments</Trans>
                  </h1>
                </div>
              </div>

              <div className="level-right">
                <div className="level-item">
                  <Link to="/Search">
                    <button className="button is-rounded">
                      <span className="icon is-medium">
                        <i className="fas fa-search"></i>
                      </span>

                      <span>
                        <Trans>search</Trans>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="hero-body">
          <div className="container">
            <div className="columns is-multiline">
              {Object.keys(pinnedRecentlyViews).length > 0 &&
                Object.keys(pinnedRecentlyViews).map((id: string) => {
                  const recentlyView = pinnedRecentlyViews[id];
                  return (
                    <PinnedResult
                      removeRecentlyView={removeRecentlyViewClickHandler(
                        recentlyView
                      )}
                      tournament={recentlyView.tournament}
                      key={recentlyView.tournament.id}
                      views={recentlyView.views}
                    />
                  );
                })}

              <ComponentLoader canRender={!isLoading} loader={ListShimmer}>
                {recentlyViews.length > 0 ? (
                  recentlyViews.map((recentlyView: ApiRecentlyView) => (
                    <Result
                      pinRecentlyView={pinRecentlyViewClickHandler(
                        recentlyView
                      )}
                      tournament={recentlyView.tournament}
                      key={recentlyView.tournament.id}
                      views={recentlyView.views}
                    />
                  ))
                ) : (
                  <div></div>
                )}
              </ComponentLoader>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default List;
