import React, { Fragment } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import List, { ListLoading } from '../Players/List';
import { ConnectedProps, connect } from 'react-redux';
import withTournament from './support/withTournament';
import { getTournamentBySlug } from '../Tournaments/effects';
import { deletePlayer } from '../Players/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { players, patchingPlayer } from '../Players/selectors';
import { StoreState } from '../store';
import { tournamentLoading } from '../Tournaments/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import ListHeader from '../Shared/UI/ListHeader';

const mapStateToProps = (state: StoreState) => ({
  isPatchingPlayer: patchingPlayer(state.players),
  players: players(state.players, state.teams),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deletePlayer,
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function PlayerList({
  deletePlayer,
  isPatchingPlayer,
  match,
  players,
  tournamentLoading
}: PlayerListProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const newUrl = `/${organizationSlug}/${tournamentSlug}/NewPlayer`;

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <ListHeader
            newUrl={newUrl}
            title="Players"
            isSavingOrder={isPatchingPlayer}
          />

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<ListLoading />}
            >
              <List
                deletePlayer={deletePlayer}
                organizationSlug={organizationSlug}
                players={players}
                tournamentSlug={tournamentSlug}
              />
            </ComponentLoader>
          </div>
        </div>
      </div>

      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
}

export default connector(withTournament<PlayerListProps>(PlayerList));
