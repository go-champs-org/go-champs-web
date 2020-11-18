import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { getAggregatedPlayerStatsLogsByFilter } from '../AggregatedPlayerStats/effects';
import { tournamentBySlug } from '../Tournaments/selectors';
import { playersMap } from '../Players/selectors';
import withAggregatedPlayerStatsLogs from './support/withAggregatedPlayerStatsLog';
import { default as PlayerStatLogView } from '../PlayerStatsLog/View';
import { aggregatedPlayerStatLogs } from '../AggregatedPlayerStats/selectors';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  return {
    aggregatedPlayerStatLogs: aggregatedPlayerStatLogs(
      state.aggregatedPlayerStatsLogs
    ),
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
      getAggregatedPlayerStatsLogsByFilter
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerStatsViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function PlayerStatsView({
  aggregatedPlayerStatLogs,
  players,
  tournament
}: PlayerStatsViewProps) {
  console.log(aggregatedPlayerStatLogs);
  return (
    <div className="column">
      <div className="columns is-multiline">
        <div className="column is-12">Player stats view</div>

        <div className="column is-12">
          <PlayerStatLogView
            players={players}
            playersStats={tournament.playerStats}
            playerStatLogs={aggregatedPlayerStatLogs}
          />
        </div>
      </div>
    </div>
  );
}

export default connector(
  withAggregatedPlayerStatsLogs<PlayerStatsViewProps>(PlayerStatsView)
);
