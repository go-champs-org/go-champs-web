import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import MiniCard from '../../Tournaments/MiniCard';
import RecentlyViewedOrganizationsSidebar from './RecentlyViewedOrganizationsSidebar';
import {
  ApiRecentlyView,
  ApiTournamentWithDependecies
} from '../../Shared/httpClient/apiTypes';
import usePinnedRecentlyViews from '../../Shared/hooks/usePinnedRecentlyViews';
import recentlyViewsHttpClient from '../../RecentlyViews/recentlyViewsHttpClient';
import searchHttpClient from '../../Search/searchHttpClient';
import ComponentLoader from '../../Shared/UI/ComponentLoader';
import { ResultShimmer } from '../../Search/Result';
import './HomeV2.scss';

const ListShimmer = (
  <div className="home-v2-grid">
    <ResultShimmer />
    <ResultShimmer />
    <ResultShimmer />
  </div>
);

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function HomeV2() {
  const { t } = useTranslation();

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<
    ApiTournamentWithDependecies[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [haveSearched, setHaveSearched] = useState(false);

  // Recently viewed tournaments state
  const [isLoadingTournaments, setIsLoadingTournaments] = useState(true);
  const [recentlyViews, setRecentlyViews] = useState<ApiRecentlyView[]>([]);

  const {
    recentlyViews: pinnedRecentlyViews,
    pinRecentlyView,
    removeRecentlyView
  } = usePinnedRecentlyViews(recentlyViews);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch recently viewed tournaments on mount
  useEffect(() => {
    recentlyViewsHttpClient.get().then(results => {
      setIsLoadingTournaments(false);
      setRecentlyViews(results);
    });
  }, [pinnedRecentlyViews]);

  // Handle search with debounce
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      setHaveSearched(true);
      searchHttpClient.getAll(debouncedSearchTerm).then(results => {
        setIsSearching(false);
        setSearchResults(results);
      });
    } else {
      setHaveSearched(false);
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const pinRecentlyViewClickHandler = (recentlyView: ApiRecentlyView) => {
    pinRecentlyView(recentlyView);

    const newRecentlyViews = recentlyViews.filter(
      apiRecentlyView =>
        apiRecentlyView.tournament.id !== recentlyView.tournament.id
    );
    setRecentlyViews(newRecentlyViews);
  };

  const removeRecentlyViewClickHandler = (recentlyView: ApiRecentlyView) => {
    removeRecentlyView(recentlyView);
  };

  const recentlyViewsWithNoPinned = recentlyViews.filter(
    result => !pinnedRecentlyViews[result.tournament.id]
  );

  const isSearchMode = searchTerm.length > 0;

  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main">
          {/* Banner Section */}
          <div className="home-v2-banner">
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8429375868019921"
              crossOrigin="anonymous"
            ></script>
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-8429375868019921"
              data-ad-slot="7176219418"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </div>

          {/* Sidebar and Main Content Container */}
          <div className="home-v2-layout">
            {/* Organizations Sidebar */}
            <aside className="home-v2-sidebar is-hidden-mobile">
              <RecentlyViewedOrganizationsSidebar />
            </aside>

            {/* Main Content */}
            <div className="home-v2-content">
              {/* Search Section */}
              <div className="home-v2-search-section">
                <CardV2 className="home-v2-search-card">
                  <div className="home-v2-search-content">
                    <div className="home-v2-search-left">
                      <div className="home-v2-title">
                        <Trans>onGoingTournaments</Trans>
                      </div>
                      <p className="home-v2-subtitle is-hidden-touch">
                        <Trans>checkTheMostUpToDataGameResults</Trans>
                      </p>
                    </div>
                    <div className="home-v2-search-right">
                      <div className="home-v2-search-input-wrapper">
                        <input
                          className="home-v2-search-input"
                          type="text"
                          placeholder={`${t('searchTournaments')}...`}
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                        />
                        <span className="home-v2-search-icon">
                          <i className="fas fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </CardV2>
              </div>

              {/* Tournaments Section */}
              <div className="home-v2-tournaments-section">
                {isSearchMode ? (
                  // Search Results
                  <ComponentLoader
                    canRender={!isSearching}
                    loader={ListShimmer}
                  >
                    {searchResults.length > 0 ? (
                      <div className="home-v2-grid">
                        {searchResults
                          .slice(0, 15)
                          .map((tournament: ApiTournamentWithDependecies) => (
                            <div key={tournament.id}>
                              <MiniCard tournament={tournament} />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="home-v2-empty-state">
                        <p>
                          {haveSearched
                            ? `${t('tournamentNotFound')}.`
                            : `${t('startTyping')}...`}
                        </p>
                      </div>
                    )}
                  </ComponentLoader>
                ) : (
                  // Pinned + Recently Viewed Tournaments
                  <ComponentLoader
                    canRender={!isLoadingTournaments}
                    loader={ListShimmer}
                  >
                    <div className="home-v2-grid">
                      {/* Pinned Tournaments */}
                      {Object.keys(pinnedRecentlyViews).length > 0 &&
                        Object.keys(pinnedRecentlyViews)
                          .slice(0, 15)
                          .map((id: string) => {
                            const recentlyView = pinnedRecentlyViews[id];
                            return (
                              <div key={recentlyView.tournament.id}>
                                <MiniCard
                                  tournament={recentlyView.tournament}
                                  togglePin={() =>
                                    removeRecentlyViewClickHandler(recentlyView)
                                  }
                                  isPinned={true}
                                />
                              </div>
                            );
                          })}

                      {/* Recently Viewed Tournaments (not pinned) */}
                      {recentlyViewsWithNoPinned.length > 0 &&
                        recentlyViewsWithNoPinned
                          .slice(
                            0,
                            Math.max(
                              0,
                              15 - Object.keys(pinnedRecentlyViews).length
                            )
                          )
                          .map((recentlyView: ApiRecentlyView) => (
                            <div key={recentlyView.tournament.id}>
                              <MiniCard
                                tournament={recentlyView.tournament}
                                togglePin={() =>
                                  pinRecentlyViewClickHandler(recentlyView)
                                }
                                isPinned={false}
                              />
                            </div>
                          ))}
                    </div>
                  </ComponentLoader>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

export default HomeV2;
