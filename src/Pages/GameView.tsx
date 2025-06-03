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
import { StatsLogRenderEntity } from '../PlayerStatsLog/View';
import { tournamentBySlug } from '../Tournaments/selectors';
import { default as GameCard } from '../Games/Card';
import GeneralBoxScore from '../Games/GeneralBoxScore';
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
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import Shimmer from '../Shared/UI/Shimmer';
import { selectPlayerStatisticsByLevel } from '../Sports/selectors';
import {
  playerStatThatContainsInStatistic,
  playerStatThatIsVisible
} from '../Tournaments/dataSelectors';
import './GameView.scss';
import LoadingTable from '../Shared/LoadingTable';
import { getTeamStatsLogsByFilter } from '../TeamStatsLog/effects';
import { statLogRendersByGameIdAndTeamId } from '../TeamStatsLog/selectors';

interface ViewPlayerProps {
  youTubeVideoCode: string;
}

function VideoPlayer({ youTubeVideoCode }: ViewPlayerProps) {
  return (
    <div className="panel">
      <iframe
        className="video-player"
        src={`https://www.youtube.com/embed/${youTubeVideoCode}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

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
        <LoadingTable />
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
        <LoadingTable />
      </div>
    </div>
  );
}

const BOX_SCORE_VIEWERS: {
  [key: string]: React.ComponentType<BoxScoreViewerProps>;
} = {
  basketball_5x5: React.lazy(() =>
    import('../Sports/Basketball5x5/GameBoxScoreViewer')
  )
};

export interface BoxScoreViewerProps {
  awayTeam: TeamEntity;
  awayPlayerStatsLogs: StatsLogRenderEntity[];
  awayTeamStatsLog: StatsLogRenderEntity;
  homeTeam: TeamEntity;
  homePlayerStatsLogs: StatsLogRenderEntity[];
  homeTeamStatsLog: StatsLogRenderEntity;
  playersMap: PlayersMap;
  playerStats: PlayerStatEntity[];
  playerViewBasePath: string;
  tournament: TournamentEntity;
}

function BoxScoreViewer({
  awayTeam,
  awayPlayerStatsLogs,
  awayTeamStatsLog,
  homeTeam,
  homePlayerStatsLogs,
  homeTeamStatsLog,
  playerStats,
  playersMap,
  playerViewBasePath,
  tournament
}: BoxScoreViewerProps) {
  if (BOX_SCORE_VIEWERS[tournament.sportSlug]) {
    const BoxScoreViewer = BOX_SCORE_VIEWERS[tournament.sportSlug];
    return (
      <React.Suspense fallback={<BoxScoreLoading />}>
        <BoxScoreViewer
          awayPlayerStatsLogs={awayPlayerStatsLogs}
          awayTeamStatsLog={awayTeamStatsLog}
          awayTeam={awayTeam}
          homePlayerStatsLogs={homePlayerStatsLogs}
          homeTeamStatsLog={homeTeamStatsLog}
          homeTeam={homeTeam}
          playersMap={playersMap}
          playerStats={playerStats}
          playerViewBasePath={playerViewBasePath}
          tournament={tournament}
        />
      </React.Suspense>
    );
  }

  return (
    <div className="columns is-multiline has-text-left">
      <GeneralBoxScore
        teamName={homeTeam.name}
        playerStats={playerStats}
        playerStatsLogs={homePlayerStatsLogs}
        playersMap={playersMap}
        playerViewBasePath={playerViewBasePath}
        tournament={tournament}
      />
      <GeneralBoxScore
        teamName={awayTeam.name}
        playerStats={playerStats}
        playerStatsLogs={awayPlayerStatsLogs}
        playersMap={playersMap}
        playerViewBasePath={playerViewBasePath}
        tournament={tournament}
      />
    </div>
  );
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { gameId = '', organizationSlug = '' } = props.match.params;
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
  const awayTeamStatsLog = statLogRendersByGameIdAndTeamId(
    state.teamStatsLogs,
    game.id,
    game.awayTeam.id
  );
  const homeTeam = teamById(state.teams, game.homeTeam.id);
  const homePlayerStatsLogs = playerStatLogsByGameIdAndTeamId(
    state.playerStatsLogs,
    game.id,
    game.homeTeam.id
  );
  const homeTeamStatsLog = statLogRendersByGameIdAndTeamId(
    state.teamStatsLogs,
    game.id,
    game.homeTeam.id
  );
  const allPlayersMap = playersMap(state.players, state.teams);
  return {
    awayPlayerStatsLogs,
    awayTeamStatsLog,
    awayTeam,
    game,
    isLoadingPlayerStatsLogs: playerStatLogsLoading(state.playerStatsLogs),
    homePlayerStatsLogs,
    homeTeamStatsLog,
    homeTeam,
    phase: phaseByIdOrDefault(state.phases, game.phaseId),
    playersMap: allPlayersMap,
    organizationSlug,
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
      getTeamStatsLogsByFilter,
      getTournamentBySlug
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameViewProps = ConnectedProps<typeof connector>;

function GameView({
  awayPlayerStatsLogs,
  awayTeamStatsLog,
  awayTeam,
  isLoadingPlayerStatsLogs,
  game,
  homePlayerStatsLogs,
  homeTeam,
  homeTeamStatsLog,
  tournament,
  playersMap,
  statistics,
  organizationSlug
}: GameViewProps): React.ReactElement {
  const hasPlayerStatsLogs =
    awayPlayerStatsLogs.length > 0 || homePlayerStatsLogs.length > 0;
  const playerStats = statistics.length
    ? tournament.playerStats.filter(
        playerStatThatContainsInStatistic(statistics)
      )
    : tournament.playerStats;
  const playerViewBasePath = `/${organizationSlug}/${tournament.slug}/Player/`;
  const visiblePlayerStats = playerStats.filter(playerStatThatIsVisible);

  const boxScore = hasPlayerStatsLogs ? (
    <BoxScoreViewer
      awayPlayerStatsLogs={awayPlayerStatsLogs}
      awayTeamStatsLog={awayTeamStatsLog}
      awayTeam={awayTeam}
      homePlayerStatsLogs={homePlayerStatsLogs}
      homeTeamStatsLog={homeTeamStatsLog}
      homeTeam={homeTeam}
      playerViewBasePath={playerViewBasePath}
      playersMap={playersMap}
      playerStats={visiblePlayerStats}
      tournament={tournament}
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

        {game.youTubeCode && (
          <div className="column is-12 has-text-centered">
            <VideoPlayer youTubeVideoCode={game.youTubeCode} />
          </div>
        )}

        <div className="column is-12 has-text-centered">
          <div>{isLoadingPlayerStatsLogs ? <BoxScoreLoading /> : boxScore}</div>
        </div>
      </div>
    </div>
  );
}

export default connector(withPlayerStatsLogsForGame<GameViewProps>(GameView));
