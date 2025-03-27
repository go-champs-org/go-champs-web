import React from 'react';
import withPlayerStatsLogsForPlayer from './support/withPlayerStatsLogsForPlayer';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../store';
import { tournamentBySlug } from '../Tournaments/selectors';
import { playerById } from '../Players/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { getPlayerStatsLogsByFilter } from '../PlayerStatsLog/effects';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { playerId } = props.match.params;
  const tournament = tournamentBySlug(
    state.tournaments,
    props.match.params.tournamentSlug
  );

  return {
    player: playerById(state.players, state.teams, playerId),
    tournament
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getPlayerStatsLogsByFilter
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function PlayerView({ player }: PlayerViewProps) {
  return <div>Player View: {player.name}</div>;
}

export default connector(withPlayerStatsLogsForPlayer(PlayerView));
