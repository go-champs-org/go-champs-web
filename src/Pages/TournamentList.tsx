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
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';

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
        <div className="column is-12">
          <h2 className="subtitle">Tournaments</h2>
        </div>

        <div className="column is-12">
          {tournamentsLoading ? (
            <ListLoading />
          ) : (
            <List
              deleteTournament={deleteTournament}
              organizationSlug={organizationSlug}
              tournaments={tournaments}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default connector(withTournaments(TournamentList));
