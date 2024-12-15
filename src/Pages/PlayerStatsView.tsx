import React from 'react';
import { RouteComponentProps, useLocation, useHistory } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { getAggregatedPlayerStatsLogsByFilter } from '../AggregatedPlayerStats/effects';
import { tournamentBySlug } from '../Tournaments/selectors';
import { playersMap } from '../Players/selectors';
import withAggregatedPlayerStatsLogs, {
  SORT_URL_QUERY_PARAM
} from './support/withAggregatedPlayerStatsLog';
import {
  default as PlayerStatLogView,
  ViewLoading as PlayerStatLogLoading
} from '../PlayerStatsLog/View';
import {
  aggregatedPlayerStatLogs,
  aggregatedPlayerStatLogsLoading
} from '../AggregatedPlayerStats/selectors';
import { Trans } from 'react-i18next';
import { PlayerStatEntity } from '../Tournaments/state';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  return {
    aggregatedPlayerStatLogs: aggregatedPlayerStatLogs(
      state.aggregatedPlayerStatsLogs
    ),
    isLoadingAggregatedPlayerStatsLogs: aggregatedPlayerStatLogsLoading(
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
  isLoadingAggregatedPlayerStatsLogs,
  players,
  tournament
}: PlayerStatsViewProps) {
  const location = useLocation();
  const history = useHistory();

  const onHeaderClick = (playerStat: PlayerStatEntity) => {
    const urlSearch = new URLSearchParams(location.search);
    urlSearch.set(SORT_URL_QUERY_PARAM, playerStat.id);
    history.push({
      search: urlSearch.toString()
    });
  };

  return (
    <div className="column">
      <div className="columns is-multiline">
        <div className="column is-12">
          <span className="subtitle">
            <Trans>playerStats</Trans>
          </span>
        </div>

        <div className="column is-12">
          {isLoadingAggregatedPlayerStatsLogs ? (
            <PlayerStatLogLoading />
          ) : (
            <PlayerStatLogView
              onHeaderClick={onHeaderClick}
              players={players}
              playersStats={tournament.playerStats}
              playerStatLogs={aggregatedPlayerStatLogs}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default connector(
  withAggregatedPlayerStatsLogs<PlayerStatsViewProps>(PlayerStatsView)
);
