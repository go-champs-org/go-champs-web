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
  aggregatedPlayerStatLogs,
  aggregatedPlayerStatLogsLoading
} from '../AggregatedPlayerStats/selectors';
import { Trans } from 'react-i18next';
import { PlayerStatEntity } from '../Tournaments/state';
import Filters from '../AggregatedPlayerStats/Filters';
import useStatistics from '../Sports/useStatistics';
import { selectSport } from '../Sports/selectors';
import { Scope } from '../Sports/state';
import { playerStatThatIsVisible } from '../Tournaments/dataSelectors';
import AggregatedPlayerStatsTableViewer from '../AggregatedPlayerStats/AggregatedPlayerStatsTableViewer';
import LoadingTable from '../Shared/LoadingTable';

const SCOPE_URL_QUERY_PARAM = 'scope';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const tournament = tournamentBySlug(
    state.tournaments,
    props.match.params.tournamentSlug
  );

  return {
    aggregatedPlayerStatLogs: aggregatedPlayerStatLogs(
      state.aggregatedPlayerStatsLogs
    ),
    isLoadingAggregatedPlayerStatsLogs: aggregatedPlayerStatLogsLoading(
      state.aggregatedPlayerStatsLogs
    ),
    players: playersMap(state.players, state.teams),
    tournament,
    sport: selectSport(state.sports, tournament.sportSlug)
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
  sport,
  tournament,
  match
}: PlayerStatsViewProps) {
  const { organizationSlug, tournamentSlug } = match.params;
  const location = useLocation();
  const history = useHistory();

  const playerViewBasePath = `/${organizationSlug}/${tournamentSlug}/Player/`;
  const scope =
    (new URLSearchParams(location.search).get(
      SCOPE_URL_QUERY_PARAM
    ) as Scope) || ('aggregate' as Scope);

  const onHeaderClick = (sportKey: string) => {
    const urlSearch = new URLSearchParams(location.search);
    urlSearch.set(SORT_URL_QUERY_PARAM, sportKey);
    history.push({
      search: urlSearch.toString()
    });
  };

  const onFilterChange = (scope: Scope) => {
    const urlSearch = new URLSearchParams(location.search);
    urlSearch.set(SCOPE_URL_QUERY_PARAM, scope);
    history.push({
      search: urlSearch.toString()
    });
  };

  const statistics = useStatistics(sport.playerStatistics, scope);
  const playerStats =
    statistics.length > 0
      ? tournament.playerStats.filter((stat: PlayerStatEntity) =>
          statistics.includes(stat.slug)
        )
      : tournament.playerStats;
  const visiblePlayerStats = playerStats.filter(playerStatThatIsVisible);

  return (
    <div className="column">
      <div className="columns is-multiline">
        <div className="column is-12">
          <span className="subtitle">
            <Trans>playerStats</Trans>
          </span>
        </div>

        <div className="column is-12">
          <Filters
            tournament={tournament}
            onStatisticsScopeFilterChange={onFilterChange}
          />
        </div>

        <div className="column is-12">
          {isLoadingAggregatedPlayerStatsLogs ? (
            <LoadingTable />
          ) : (
            <AggregatedPlayerStatsTableViewer
              onHeaderClick={onHeaderClick}
              players={players}
              playersStats={visiblePlayerStats}
              playerStatLogs={aggregatedPlayerStatLogs}
              playerViewBasePath={playerViewBasePath}
              scope={scope}
              tournament={tournament}
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
