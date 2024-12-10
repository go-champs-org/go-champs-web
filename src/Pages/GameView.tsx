import React, { Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { gameById } from '../Games/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { getGame } from '../Games/effects';
import { connect, ConnectedProps } from 'react-redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { getPlayerStatsLogsByFilter } from '../PlayerStatsLog/effects';
import {
  ViewLoading as PlayerStatLogLoading,
  PlayerStatsLogRenderEntity
} from '../PlayerStatsLog/View';
import { tournamentBySlug } from '../Tournaments/selectors';
import { default as GameCard } from '../Games/Card';
import BoxScore from '../Games/BoxScore';
import { teamById } from '../Teams/selectors';
import {
  playerStatLogsByGameIdAndTeamId,
  playerStatLogsLoading
} from '../PlayerStatsLog/selectors';
import withPlayerStatsLogsForGame from './support/withPlayerStatsLogsForGame';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { playersMap } from '../Players/selectors';
import { TeamEntity } from '../Teams/state';
import { PlayersMap } from '../Players/state';
import { PlayerStatEntity } from '../Tournaments/state';
import Shimmer from '../Shared/UI/Shimmer';
import { selectPlayerStatisticsByLevel } from '../Sports/selectors';
import { playerStatThatContainsInStatistic } from '../Tournaments/dataSelectors';

function BoxScoreLoading() {
  return (
    <div className="columns is-multiline">
      <div className="column is-12 has-text left">
        <Shimmer>
          <div
            style={{
              height: '13px',
              marginTop: '13px',
              width: '250px'
            }}
          ></div>
        </Shimmer>
      </div>

      <div className="column is-12">
        <PlayerStatLogLoading />
      </div>

      <div className="column is-12">
        <Shimmer>
          <div
            style={{
              height: '13px',
              marginTop: '13px',
              width: '250px'
            }}
          ></div>
        </Shimmer>
      </div>

      <div className="column is-12">
        <PlayerStatLogLoading />
      </div>
    </div>
  );
}

interface BoxScoreViewerProps {
  awayTeam: TeamEntity;
  awayPlayerStatsLogs: PlayerStatsLogRenderEntity[];
  homeTeam: TeamEntity;
  homePlayerStatsLogs: PlayerStatsLogRenderEntity[];
  playersMap: PlayersMap;
  playerStats: PlayerStatEntity[];
}

function BoxScoreViewer({
  awayTeam,
  awayPlayerStatsLogs,
  homeTeam,
  homePlayerStatsLogs,
  playerStats,
  playersMap
}: BoxScoreViewerProps) {
  return (
    <div className="columns is-multiline has-text-left">
      <BoxScore
        teamName={homeTeam.name}
        playerStats={playerStats}
        playerStatsLogs={homePlayerStatsLogs}
        playersMap={playersMap}
      />
      <BoxScore
        teamName={awayTeam.name}
        playerStats={playerStats}
        playerStatsLogs={awayPlayerStatsLogs}
        playersMap={playersMap}
      />
    </div>
  );
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { gameId = '' } = props.match.params;
  const tournament = tournamentBySlug(
    state.tournaments,
    props.match.params.tournamentSlug
  );
  const game = gameById(state.games, gameId);
  const awayTeam = teamById(state.teams, game.awayTeam.id);
  const awayPlayerStatsLogs = playerStatLogsByGameIdAndTeamId(
    state.playerStatsLogs,
    game.id,
    game.awayTeam.id
  );
  const homeTeam = teamById(state.teams, game.homeTeam.id);
  const homePlayerStatsLogs = playerStatLogsByGameIdAndTeamId(
    state.playerStatsLogs,
    game.id,
    game.homeTeam.id
  );
  const allPlayersMap = playersMap(state.players, state.teams);
  return {
    awayPlayerStatsLogs,
    awayTeam,
    game,
    isLoadingPlayerStatsLogs: playerStatLogsLoading(state.playerStatsLogs),
    homePlayerStatsLogs,
    homeTeam,
    phase: phaseByIdOrDefault(state.phases, game.phaseId),
    playersMap: allPlayersMap,
    tournament: tournamentBySlug(
      state.tournaments,
      props.match.params.tournamentSlug
    ),
    statistics: selectPlayerStatisticsByLevel(
      state.sports,
      tournament.sportSlug,
      'game'
    )
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getGame,
      getPlayerStatsLogsByFilter,
      getTournamentBySlug
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameViewProps = ConnectedProps<typeof connector>;

function GameView({
  awayPlayerStatsLogs,
  awayTeam,
  isLoadingPlayerStatsLogs,
  game,
  homePlayerStatsLogs,
  homeTeam,
  tournament,
  playersMap,
  statistics
}: GameViewProps): React.ReactElement {
  const hasPlayerStatsLogs =
    awayPlayerStatsLogs.length > 0 || homePlayerStatsLogs.length > 0;
  const playerStats = statistics.length
    ? tournament.playerStats.filter(
        playerStatThatContainsInStatistic(statistics)
      )
    : tournament.playerStats;

  const boxScore = hasPlayerStatsLogs ? (
    <BoxScoreViewer
      awayPlayerStatsLogs={awayPlayerStatsLogs}
      awayTeam={awayTeam}
      homePlayerStatsLogs={homePlayerStatsLogs}
      homeTeam={homeTeam}
      playersMap={playersMap}
      playerStats={playerStats}
    />
  ) : (
    <Fragment />
  );

  return (
    <div className="column">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <GameCard game={game} />
        </div>

        <div className="column is-12 has-text-centered">
          <div className="tabs is-centered">
            {isLoadingPlayerStatsLogs ? <BoxScoreLoading /> : boxScore}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(withPlayerStatsLogsForGame<GameViewProps>(GameView));
