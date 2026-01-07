import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import recentlyViewsHttpClient from '../RecentlyViews/recentlyViewsHttpClient';
import { ResultShimmer } from './Result';
import { ApiRecentlyView } from '../Shared/httpClient/apiTypes';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { Link } from 'react-router-dom';
import usePinnedRecentlyViews from '../Shared/hooks/usePinnedRecentlyViews';
import MiniCard from '../Tournaments/MiniCard';

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

  const pinRecentlyViewClickHandler = (recentlyView: ApiRecentlyView) => {
    pinRecentlyView(recentlyView);

    const newRecentlyViews = recentlyViews.filter(
      apiRecentlyView =>
        apiRecentlyView.tournament.id !== recentlyView.tournament.id
    );
    setTournaments(newRecentlyViews);
  };

  const removeRecentlyViewClickHandler = (recentlyView: ApiRecentlyView) => {
    removeRecentlyView(recentlyView);
  };

  useEffect(() => {
    recentlyViewsHttpClient.get().then(results => {
      // Set back to false since request finished
      setIsLoading(false);
      // Set results state
      setTournaments(results);
    });

    return () => undefined;
  }, [pinnedRecentlyViews]);

  const recentlyViewsWithNoPinned = recentlyViews.filter(
    result => !pinnedRecentlyViews[result.tournament.id]
  );

  return (
    <section className="container">
      <div className="hero">
        <div className="hero-head">
          <div className="container">
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <h1 className="subtitle is-3 has-text-weight-bold">
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
                    <div className="column is-one-third-desktop is-half-tablet">
                      <MiniCard
                        tournament={recentlyView.tournament}
                        key={recentlyView.tournament.id}
                        togglePin={() =>
                          removeRecentlyViewClickHandler(recentlyView)
                        }
                        isPinned={true}
                      />
                    </div>
                  );
                })}

              <ComponentLoader canRender={!isLoading} loader={ListShimmer}>
                {recentlyViewsWithNoPinned.length > 0 ? (
                  recentlyViewsWithNoPinned.map(
                    (recentlyView: ApiRecentlyView) => (
                      <div className="column is-one-third-desktop is-half-tablet">
                        <MiniCard
                          tournament={recentlyView.tournament}
                          key={recentlyView.tournament.id}
                          togglePin={() =>
                            pinRecentlyViewClickHandler(recentlyView)
                          }
                          isPinned={false}
                        />
                      </div>
                    )
                  )
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
