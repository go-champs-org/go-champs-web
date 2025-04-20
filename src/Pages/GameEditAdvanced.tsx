import React from 'react';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { tournamentBySlug } from '../Tournaments/selectors';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { gameById } from '../Games/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import {
  getPlayerStatsLogsByFilter,
  patchAndPostPlayerStatsLogs
} from '../PlayerStatsLog/effects';
import { getGame } from '../Games/effects';
import { default as GameCard } from '../Games/Card';
import withPlayerStatsLogsForGame from './support/withPlayerStatsLogsForGame';
import { default as PlayerStatLogForm } from '../PlayerStatsLog/Form';
import { playerStatLogsFormByPlayers } from '../PlayerStatsLog/selectors';
import arrayMutators from 'final-form-arrays';
import { teamById } from '../Teams/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import { PlayerStatsLogsForm } from '../PlayerStatsLog/state';
import { Mutator } from 'final-form';
import { playersByTeamId } from '../Players/selectors';
import { selectPlayerStatisticsByLevel } from '../Sports/selectors';
import { playerStatThatContainsInStatistic } from '../Tournaments/dataSelectors';
import { getTeamStatsLogsByFilter } from '../TeamStatsLog/effects';
import { statLogRendersByGameIdAndTeamId } from '../TeamStatsLog/selectors';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { gameId = '', tournamentSlug = '' } = props.match.params;

  const tournament = tournamentBySlug(state.tournaments, tournamentSlug);
  const game = gameById(state.games, gameId);
  const awayTeam = teamById(state.teams, game.awayTeam.id);
  const awayPlayers = playersByTeamId(
    state.players,
    state.teams,
    game.awayTeam.id
  );
  const awayTeamPlayerStatLogsFormData = playerStatLogsFormByPlayers(
    state.playerStatsLogs,
    game.id,
    game.phaseId,
    awayPlayers,
    awayTeam.id,
    tournament.id
  );
  const awayTeamStatsLog = statLogRendersByGameIdAndTeamId(
    state.teamStatsLogs,
    game.id,
    game.awayTeam.id
  );
  const homeTeam = teamById(state.teams, game.homeTeam.id);
  const homePlayers = playersByTeamId(
    state.players,
    state.teams,
    game.homeTeam.id
  );
  const homeTeamPlayerStatLogsFormData = playerStatLogsFormByPlayers(
    state.playerStatsLogs,
    game.id,
    game.phaseId,
    homePlayers,
    homeTeam.id,
    tournament.id
  );
  const homeTeamStatsLog = statLogRendersByGameIdAndTeamId(
    state.teamStatsLogs,
    game.id,
    game.homeTeam.id
  );

  return {
    awayTeam,
    awayTeamPlayerStatLogsFormData,
    awayTeamStatsLog,
    game,
    homeTeam,
    homeTeamPlayerStatLogsFormData,
    homeTeamStatsLog,
    phase: phaseByIdOrDefault(state.phases, game.phaseId),
    players: state.players.players,
    tournament,
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
      patchAndPostPlayerStatsLogs
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameEditAdvancedProps = ConnectedProps<typeof connector>;

function GameEditAdvanced({
  awayTeam,
  awayTeamPlayerStatLogsFormData,
  game,
  homeTeam,
  homeTeamPlayerStatLogsFormData,
  patchAndPostPlayerStatsLogs,
  players,
  tournament,
  statistics
}: GameEditAdvancedProps): React.ReactElement {
  const playerStats = statistics.length
    ? tournament.playerStats.filter(
        playerStatThatContainsInStatistic(statistics)
      )
    : tournament.playerStats;

  return (
    <div className="column">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <GameCard game={game} />
        </div>

        <div className="column is-12 has-text-centered">
          <div className="tabs is-centered">
            <div className="columns is-multiline has-text-left">
              <Form
                onSubmit={patchAndPostPlayerStatsLogs}
                initialValues={homeTeamPlayerStatLogsFormData}
                mutators={
                  (arrayMutators as unknown) as {
                    [key: string]: Mutator<PlayerStatsLogsForm>;
                  }
                }
                render={(props: FormRenderProps<PlayerStatsLogsForm>) => (
                  <PlayerStatLogForm
                    {...props}
                    game={game}
                    players={players}
                    playersStats={playerStats}
                    team={homeTeam}
                    tournament={tournament}
                  />
                )}
              />

              <Form
                onSubmit={patchAndPostPlayerStatsLogs}
                initialValues={awayTeamPlayerStatLogsFormData}
                mutators={
                  (arrayMutators as unknown) as {
                    [key: string]: Mutator<PlayerStatsLogsForm>;
                  }
                }
                render={(props: FormRenderProps<PlayerStatsLogsForm>) => (
                  <PlayerStatLogForm
                    {...props}
                    game={game}
                    players={players}
                    playersStats={tournament.playerStats}
                    team={awayTeam}
                    tournament={tournament}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(
  withPlayerStatsLogsForGame<GameEditAdvancedProps>(GameEditAdvanced)
);
