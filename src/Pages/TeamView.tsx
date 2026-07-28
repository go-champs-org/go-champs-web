import React from 'react';
import { GameEntity } from '../Games/state';
import Banner from '../Teams/Banner';
import { tournamentBySlug } from '../Tournaments/selectors';
import { teamById } from '../Teams/selectors';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps, useLocation, useHistory } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { getGamesByFilter } from '../Games/effects';
import { getAggregatedPlayerStatsLogsByFilter } from '../AggregatedPlayerStats/effects';
import withTeam from './support/withTeam';
import { gameDates, gamesByDate, gamesLoading } from '../Games/selectors';
import {
  aggregatedPlayerStatLogs,
  aggregatedPlayerStatLogsLoading
} from '../AggregatedPlayerStats/selectors';
import { playersMap } from '../Players/selectors';
import ListByDate from '../Games/ListByDate';
import { Trans } from 'react-i18next';
import { ListLoading } from '../Games/List';
import Filters from '../AggregatedPlayerStats/Filters';
import AggregatedPlayerStatsTableViewer from '../AggregatedPlayerStats/AggregatedPlayerStatsTableViewer';
import LoadingTable from '../Shared/LoadingTable';
import useStatistics from '../Sports/useStatistics';
import { selectSport } from '../Sports/selectors';
import { Scope } from '../Sports/state';
import { playerStatThatIsVisible } from '../Tournaments/dataSelectors';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import { PlayersMap } from '../Players/state';
import { AggregatedPlayerStatsLogEntity } from '../AggregatedPlayerStats/state';

function RosterTab({
  tournament,
  players,
  aggregatedPlayerStatLogs,
  isLoadingAggregatedPlayerStatsLogs,
  visiblePlayerStats,
  playerViewBasePath,
  scope,
  onHeaderClick,
  onFilterChange
}: {
  tournament: TournamentEntity;
  players: PlayersMap;
  aggregatedPlayerStatLogs: AggregatedPlayerStatsLogEntity[];
  isLoadingAggregatedPlayerStatsLogs: boolean;
  visiblePlayerStats: PlayerStatEntity[];
  playerViewBasePath: string;
  scope: Scope;
  onHeaderClick: (sportKey: string) => void;
  onFilterChange: (scope: Scope) => void;
}) {
  return (
    <div className="column is-12">
      <div className="columns is-multiline">
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

function GamesTab({
  gameDates,
  gamesByDate,
  gamesLoading,
  baseUrl
}: {
  gameDates: string[];
  gamesByDate: Record<string, GameEntity[]>;
  gamesLoading: boolean;
  baseUrl: string;
}) {
  return (
    <div className="column is-12">
      {gamesLoading ? (
        <ListLoading />
      ) : (
        <ListByDate
          gamesByDate={gamesByDate}
          dates={gameDates}
          baseUrl={baseUrl}
        />
      )}
    </div>
  );
}

const SCOPE_URL_QUERY_PARAM = 'scope';
const SORT_URL_QUERY_PARAM = 'sort';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { teamId } = props.match.params;
  const tournament = tournamentBySlug(
    state.tournaments,
    props.match.params.tournamentSlug
  );

  return {
    gamesByDate: gamesByDate(state.games),
    gamesLoading: gamesLoading(state.games),
    gameDates: gameDates(state.games).reverse(),
    team: teamById(state.teams, teamId),
    tournament,
    aggregatedPlayerStatLogs: aggregatedPlayerStatLogs(
      state.aggregatedPlayerStatsLogs
    ),
    isLoadingAggregatedPlayerStatsLogs: aggregatedPlayerStatLogsLoading(
      state.aggregatedPlayerStatsLogs
    ),
    players: playersMap(state.players, state.teams),
    sport: selectSport(state.sports, tournament.sportSlug)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getGamesByFilter,
      getAggregatedPlayerStatsLogsByFilter
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TeamViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function TeamView({
  team,
  gameDates,
  gamesByDate,
  gamesLoading,
  match,
  aggregatedPlayerStatLogs,
  isLoadingAggregatedPlayerStatsLogs,
  players,
  sport,
  tournament
}: TeamViewProps) {
  const organizationSlug = match.params.organizationSlug;
  const tournamentSlug = match.params.tournamentSlug;
  const baseUrl = `/${organizationSlug}/${tournamentSlug}`;
  const location = useLocation();
  const history = useHistory();
  const activeTab = location.hash ? location.hash.substring(1) : 'roster';
  const playerViewBasePath = `/${organizationSlug}/${tournamentSlug}/Player/`;
  const onTabClick = (tab: string) => {
    history.push({
      hash: tab
    });
  };
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
    <div className="column is-12">
      <div className="columns is-multiline">
        <div className="column is-12">
          <Banner team={team} />
        </div>

        <div className="column is-12">
          <div className="tabs">
            <ul>
              <li className={activeTab === 'roster' ? 'is-active' : ''}>
                <a href="#roster" onClick={() => onTabClick('roster')}>
                  <Trans>roster</Trans>
                </a>
              </li>
              <li className={activeTab === 'games' ? 'is-active' : ''}>
                <a href="#games" onClick={() => onTabClick('games')}>
                  <Trans>games</Trans>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {activeTab === 'roster' ? (
          <RosterTab
            tournament={tournament}
            players={players}
            aggregatedPlayerStatLogs={aggregatedPlayerStatLogs}
            isLoadingAggregatedPlayerStatsLogs={
              isLoadingAggregatedPlayerStatsLogs
            }
            visiblePlayerStats={visiblePlayerStats}
            playerViewBasePath={playerViewBasePath}
            scope={scope}
            onHeaderClick={onHeaderClick}
            onFilterChange={onFilterChange}
          />
        ) : (
          <GamesTab
            gameDates={gameDates}
            gamesByDate={gamesByDate}
            gamesLoading={gamesLoading}
            baseUrl={baseUrl}
          />
        )}
      </div>
    </div>
  );
}

export default connector(withTeam(TeamView));
