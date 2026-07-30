import React, { useEffect, useState } from 'react';
import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { ResultShimmer } from './Result';
import './Result.scss';
import searchHttpClient from './searchHttpClient';
import { Trans, useTranslation } from 'react-i18next';
import MiniCard from '../Tournaments/MiniCard';
import useDebounce from '../Shared/hooks/useDebounce';

const ListShimmer = (
  <div className="columns is-multiline">
    <ResultShimmer />
    <ResultShimmer />
    <ResultShimmer />
  </div>
);

const List: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ApiTournamentWithDependecies[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [haveSearched, setHaveSearched] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      setHaveSearched(true);
      searchHttpClient.getAll(debouncedSearchTerm).then(results => {
        // Set back to false since request finished
        setIsSearching(false);
        // Set results state
        setResults(results);
      });
    }
  }, [debouncedSearchTerm]);

  const { t } = useTranslation();

  return (
    <section className="search container">
      <div className="hero">
        <div className="hero-head">
          <div className="container">
            <h1 className="title">
              <Trans>searchTournaments</Trans>
            </h1>

            <div className="field">
              <div className="control">
                <input
                  className="input is-medium is-primary"
                  name="searchTearm"
                  type="text"
                  placeholder={`${t('searchTournaments')}...`}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-body">
          <div className="container">
            <ComponentLoader canRender={!isSearching} loader={ListShimmer}>
              {results.length > 0 ? (
                <div className="columns is-multiline">
                  {results.map((tournament: ApiTournamentWithDependecies) => (
                    <div className="column is-one-third-desktop is-half-tablet">
                      <MiniCard tournament={tournament} key={tournament.id} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="columns">
                  <p className="column has-text-centered">
                    <span className="is-size-3">
                      {haveSearched
                        ? `${t('tournamentNotFound')}.`
                        : `${t('startTyping')}...`}
                    </span>
                  </p>
                </div>
              )}
            </ComponentLoader>
          </div>
        </div>
      </div>
    </section>
  );
};

export default List;
