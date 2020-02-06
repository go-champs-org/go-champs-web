import React, { Fragment } from 'react';
import withTournaments from './support/withTournaments';
import { StoreState } from '../store';
import {
  deleteTournament,
  getTournamentsByFilter
} from '../Tournaments/effects';
import { tournaments, tournamentsLoading } from '../Tournaments/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import List, { ListLoading } from '../Tournaments/List';
import { RouteComponentProps, Link } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import ComponentLoader from '../Shared/UI/ComponentLoader';

const mapStateToProps = (state: StoreState) => ({
  tournaments: tournaments(state.tournaments),
  tournamentsLoading: tournamentsLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteTournament,
      getTournamentsByFilter
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type TournamentListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const TournamentList: React.FC<TournamentListProps> = ({
  deleteTournament,
  match,
  tournaments,
  tournamentsLoading
}) => {
  const { organizationSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-10">
          <h2 className="subtitle">Tournaments</h2>
        </div>

        <div className="column is-2 has-text-right">
          <Link
            className="button is-text"
            to={`/Organization/${organizationSlug}/NewTournament`}
          >
            New
          </Link>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!tournamentsLoading}
            loader={<ListLoading />}
          >
            <List
              deleteTournament={deleteTournament}
              organizationSlug={organizationSlug}
              tournaments={tournaments}
            />
          </ComponentLoader>
        </div>
      </div>
    </Fragment>
  );
};

export default connector(withTournaments(TournamentList));
