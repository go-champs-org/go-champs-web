import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import recentlyViewsHttpClient from '../RecentlyViews/recentlyViewsHttpClient';
import Result, { ResultShimmer } from './Result';
import { ApiRecentlyView } from '../Shared/httpClient/apiTypes';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { Link } from 'react-router-dom';

const ListShimmer = (
  <div className="columns is-multiline">
    <ResultShimmer />
    <ResultShimmer />
    <ResultShimmer />
  </div>
);

const List: React.FC = () => {
  const [tournaments, setTournaments] = useState<ApiRecentlyView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    recentlyViewsHttpClient.get().then((results) => {
      // Set back to false since request finished
      setIsLoading(false);
      // Set results state
      const resultsWithNoTests = results.filter(
        (result: ApiRecentlyView) => !result.tournament.slug.includes('test')
      );
      setTournaments(resultsWithNoTests);
    });

    return () => undefined;
  }, []);

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
            <ComponentLoader canRender={!isLoading} loader={ListShimmer}>
              {tournaments.length > 0 ? (
                <div className="columns is-multiline">
                  {tournaments.map((recentlyView: ApiRecentlyView) => (
                    <Result
                      tournament={recentlyView.tournament}
                      key={recentlyView.tournament.id}
                      views={recentlyView.views}
                    />
                  ))}
                </div>
              ) : (
                <div className="columns"></div>
              )}
            </ComponentLoader>
          </div>
        </div>
      </div>
    </section>
  );
};

export default List;
