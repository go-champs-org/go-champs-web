import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RequestFilter } from '../Shared/httpClient/requestFilter';
import { StoreState } from '../store';
import { getTournamentsByFilter } from '../Tournaments/effects';
import { List } from '../Tournaments/List';
import { tournaments } from '../Tournaments/selectors';
import { TournamentEntity } from '../Tournaments/state';

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
  }, // You could also add the "delay" var to inputs array if you ... // Only re-call effect if value changes
  // ... need to be able to change that dynamically.
  [value, delay]);

  return debouncedValue;
};

interface SearchProps {
  getTournamentsByFilter: (where: RequestFilter) => {};
  tournaments: TournamentEntity[];
}

const Search: React.FC<SearchProps> = ({
  getTournamentsByFilter,
  tournaments
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getTournamentsByFilter({ name: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, getTournamentsByFilter]);

  return (
    <div>
      <section className="hero">
        <div className="hero-head">
          <div className="container">
            <h1 className="title">Busca de torneiro</h1>

            <div className="field">
              <div className="control">
                <input
                  className="input is-medium is-primary"
                  type="text"
                  placeholder="Procure torneios..."
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-body">
          <List deleteTournament={true} tournaments={tournaments} url="" />
        </div>
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getTournamentsByFilter
    },
    dispatch
  );

const mapStateToProps = (state: StoreState) => {
  return {
    tournaments: tournaments(state.tournaments)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
