import React from 'react';
import withPlayerStatsForPlayer from './support/withPlayerStatsForPlayer';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../store';
import { tournamentBySlug } from '../Tournaments/selectors';
import { playerById } from '../Players/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { getPlayerStatsLogsByFilter } from '../PlayerStatsLog/effects';
import { getAggregatedPlayerStatsLogsByFilter } from '../AggregatedPlayerStats/effects';
import Banner from '../Players/Banner';
import {
  AggregatedPlayerStatsViewerProps,
  Loading
} from '../Players/AggregatedStats';
import PlayerStatsLogHistory from '../Players/PlayerStatsLogHistory';
import { aggregatedPlayerStatsByPlayerId } from '../AggregatedPlayerStats/selectors';
import GenericAggregatedPlayerStatsViewer from '../AggregatedPlayerStats/GenericAggregatedPlayerStatsViewer';

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
    aggregatedPlayerStats: aggregatedPlayerStatsByPlayerId(
      state.aggregatedPlayerStatsLogs,
      playerId
    ),
    tournament
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getAggregatedPlayerStatsLogsByFilter,
      getPlayerStatsLogsByFilter
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const AGGREGATED_PLAYER_STATS_VIEWERS: {
  [key: string]: React.ComponentType<AggregatedPlayerStatsViewerProps>;
} = {
  basketball_5x5: React.lazy(() =>
    import('../Sports/Basketball5x5/AggregatedPlayerStatsViewer')
  )
};

function PlayerView({
  aggregatedPlayerStats,
  player,
  tournament
}: PlayerViewProps) {
  const AggregatedPlayerStatsViewer =
    AGGREGATED_PLAYER_STATS_VIEWERS[tournament.sportSlug] ||
    GenericAggregatedPlayerStatsViewer;

  return (
    <div className="column is-12">
      <div className="columns is-multiline">
        <div className="column is-12">
          <Banner player={player} />
        </div>

        <div className="column is-12">
          <React.Suspense fallback={<Loading />}>
            <AggregatedPlayerStatsViewer
              aggregatedPlayerStats={aggregatedPlayerStats}
            />
          </React.Suspense>
        </div>

        <div className="column is-12">
          <PlayerStatsLogHistory />
        </div>
      </div>
    </div>
  );
}

export default connector(withPlayerStatsForPlayer(PlayerView));
