import React from 'react';
import withPlayerStatsLogsForPlayer from './support/withPlayerStatsLogsForPlayer';
import { ConnectedProps, connect } from 'react-redux';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../store';
import { Dispatch, bindActionCreators } from 'redux';
import { getPlayerStatsLogsByFilter } from '../PlayerStatsLog/effects';
import { tournamentBySlug } from '../Tournaments/selectors';
import { playersMap } from '../Players/selectors';
import {
  playerStatLogsLoading,
  playerStatLogs
} from '../PlayerStatsLog/selectors';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  return {
    isLoadingPlayerStatLogs: playerStatLogsLoading(state.playerStatsLogs),
    playerStatLogs: playerStatLogs(state.playerStatsLogs),
    players: playersMap(state.players, state.teams),
    tournament: tournamentBySlug(
      state.tournaments,
      props.match.params.tournamentSlug
    )
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

type PlayerEditAdvancedProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function PlayerEditAdvanced() {
  return <div>player edit advanced</div>;
}

export default connector(
  withPlayerStatsLogsForPlayer<PlayerEditAdvancedProps>(PlayerEditAdvanced)
);
