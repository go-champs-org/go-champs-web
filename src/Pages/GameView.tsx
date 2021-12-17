import React from 'react';
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
  default as PlayerStatLogView,
  ViewLoading as PlayerStatLogLoading,
  PlayerStatsLogRenderEntity
} from '../PlayerStatsLog/View';
import { tournamentBySlug } from '../Tournaments/selectors';
import { default as GameCard } from '../Games/Card';
import { teamById } from '../Teams/selectors';
import {
  playerStatLogsByGameIdAndTeamId,
  playerStatLogsLoading
} from '../PlayerStatsLog/selectors';
import withPlayerStatsLogsForGame from './support/withPlayerStatsLogsForGame';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { playersByTeamIdMap, playersByTeamId } from '../Players/selectors';
import { TeamEntity } from '../Teams/state';
import { PlayersMap } from '../Players/state';
import { PlayerStatEntity } from '../Tournaments/state';
import Shimmer from '../Shared/UI/Shimmer';

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

interface BoxScoreProps {
  awayTeam: TeamEntity;
  awayPlayersMap: PlayersMap;
  awayPlayerStatsLogs: PlayerStatsLogRenderEntity[];
  homeTeam: TeamEntity;
  homePlayersMap: PlayersMap;
  homePlayerStatsLogs: PlayerStatsLogRenderEntity[];
  playerStats: PlayerStatEntity[];
}

function BoxScore({
  awayTeam,
  awayPlayersMap,
  awayPlayerStatsLogs,
  homeTeam,
  homePlayersMap,
  homePlayerStatsLogs,
  playerStats
}: BoxScoreProps) {
  return (
    <div className="columns is-multiline has-text-left">
      <div className="column is-12">
        <h2 className="subtitle">{homeTeam.name}</h2>

        <PlayerStatLogView
          playerStatLogs={homePlayerStatsLogs}
          players={homePlayersMap}
          playersStats={playerStats}
        />
      </div>

      <div className="column is-12">
        <h2 className="subtitle">{awayTeam.name}</h2>

        <PlayerStatLogView
          playerStatLogs={awayPlayerStatsLogs}
          players={awayPlayersMap}
          playersStats={playerStats}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { gameId = '' } = props.match.params;
  const game = gameById(state.games, gameId);
  const awayPlayers = playersByTeamId(
    state.players,
    state.teams,
    game.awayTeam.id
  );
  const awayPlayersMap = playersByTeamIdMap(
    state.players,
    state.teams,
    game.awayTeam.id
  );
  const awayTeam = teamById(state.teams, game.awayTeam.id);
  const awayPlayerStatsLogs = playerStatLogsByGameIdAndTeamId(
    state.playerStatsLogs,
    game.id,
    awayPlayers
  );
  const homeTeam = teamById(state.teams, game.homeTeam.id);
  const homePlayers = playersByTeamId(
    state.players,
    state.teams,
    game.homeTeam.id
  );
  const homePlayerStatsLogs = playerStatLogsByGameIdAndTeamId(
    state.playerStatsLogs,
    game.id,
    homePlayers
  );
  const homePlayersMap = playersByTeamIdMap(
    state.players,
    state.teams,
    game.homeTeam.id
  );
  return {
    awayPlayersMap,
    awayPlayerStatsLogs,
    awayTeam,
    game,
    isLoadingPlayerStatsLogs: playerStatLogsLoading(state.playerStatsLogs),
    homePlayersMap,
    homePlayerStatsLogs,
    homeTeam,
    phase: phaseByIdOrDefault(state.phases, game.phaseId),
    tournament: tournamentBySlug(
      state.tournaments,
      props.match.params.tournamentSlug
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
  awayPlayersMap,
  awayPlayerStatsLogs,
  awayTeam,
  isLoadingPlayerStatsLogs,
  game,
  homePlayersMap,
  homePlayerStatsLogs,
  homeTeam,
  tournament
}: GameViewProps): React.ReactElement {
  return (
    <div className="column">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <GameCard game={game} />
        </div>

        <div className="column is-12 has-text-centered">
          <div className="tabs is-centered">
            {isLoadingPlayerStatsLogs ? (
              <BoxScoreLoading />
            ) : (
              <BoxScore
                awayPlayerStatsLogs={awayPlayerStatsLogs}
                awayPlayersMap={awayPlayersMap}
                awayTeam={awayTeam}
                homePlayerStatsLogs={homePlayerStatsLogs}
                homePlayersMap={homePlayersMap}
                homeTeam={homeTeam}
                playerStats={tournament.playerStats}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(withPlayerStatsLogsForGame<GameViewProps>(GameView));
