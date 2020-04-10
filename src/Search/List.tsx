import React, { useEffect, useState } from 'react';
import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import Result, { ResultShimmer } from './Result';
import './Result.scss';
import searchHttpClient from './searchHttpClient';

const ListShimmer = (
  <div className="columns is-multiline">
    <ResultShimmer />
    <ResultShimmer />
    <ResultShimmer />
  </div>
);

const useDebounce = (value: string, delay: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that will be called every time ...
    // ... useEffect is re-called. useEffect will only be re-called ...
    // ... if value changes (see the inputs array below).
    // This is how we prevent debouncedValue from changing if value is ...
    // ... changed within the delay period. Timeout gets cleared and restarted.
    // To put it in context, if the user is typing within our app's ...
    // ... search box, we don't want the debouncedValue to update until ...
    // ... they've stopped typing for more than 500ms.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // ... need to be able to change that dynamically. // You could also add the "delay" var to inputs array if you ... // Only re-call effect if value changes

  return debouncedValue;
};

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

  return (
    <section className="container">
      <div className="hero">
        <div className="hero-head">
          <div className="container">
            <h1 className="title">Busca de torneios</h1>

            <div className="field">
              <div className="control">
                <input
                  className="input is-medium is-primary"
                  name="searchTearm"
                  type="text"
                  placeholder="Procure torneios..."
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
                    <Result tournament={tournament} key={tournament.id} />
                  ))}
                </div>
              ) : (
                <div className="columns">
                  <p className="column has-text-centered">
                    <span className="is-size-3">
                      {haveSearched
                        ? 'Torneios não encontrados.'
                        : 'Digite para pesquisar...'}
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
