import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { gameById } from '../Games/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { getGame } from '../Games/effects';
import { connect, ConnectedProps } from 'react-redux';
import withGame from './support/withGame';
import { getTournamentBySlug } from '../Tournaments/effects';
import { default as PlayerStatLogView } from '../PlayerStatsLog/View';
import { playerStatLogBy } from '../PlayerStatsLog/selectors';
import { tournamentBySlug } from '../Tournaments/selectors';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { gameId = '' } = props.match.params;
  return {
    game: gameById(state.games, gameId),
    playerStatLogs: playerStatLogBy(),
    players: state.players.players,
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
      getTournamentBySlug
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameViewProps = ConnectedProps<typeof connector>;

function GameView({
  game,
  playerStatLogs,
  players,
  tournament
}: GameViewProps): React.ReactElement {
  return (
    <div className="column">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <div className="tile is-child box">
            <div className="columns is-vcentered is-mobile is-multiline">
              <div className="column is-6 has-text-left">
                <small>{game.datetime}</small>
              </div>

              <div className="column is-6 has-text-right">
                <small>{game.location}</small>
              </div>

              <div className="column is-5 has-text-right">
                <h2 className="title">{game.homeTeam.name}</h2>
              </div>

              <div className="column is-2 has-text-centered">
                <div className="columns is-vcentered is-gapless">
                  <div className="column is-5 has-text-centered">
                    <span className="title">{game.homeScore}</span>
                  </div>

                  <div className="column is-2">x</div>

                  <div className="column is-5 has-text-centered">
                    <span className="title">{game.awayScore}</span>
                  </div>
                </div>
              </div>

              <div className="column is-5 has-text-left">
                <h2 className="title">{game.awayTeam.name}</h2>
              </div>

              <div className="column is-12 has-text-centered">
                <small>{game.info}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-12 has-text-centered">
          <div className="tabs is-centered">
            <div className="columns is-multiline has-text-left">
              <div className="column is-12">
                <h2 className="subtitle">{game.homeTeam.name}</h2>

                <PlayerStatLogView
                  playerStatLogs={playerStatLogs}
                  players={players}
                  playersStats={tournament.playerStats}
                />
              </div>

              <div className="column is-12">
                <h2 className="subtitle">{game.awayTeam.name}</h2>

                <PlayerStatLogView
                  playerStatLogs={playerStatLogs}
                  players={players}
                  playersStats={tournament.playerStats}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(withGame<GameViewProps>(GameView));
