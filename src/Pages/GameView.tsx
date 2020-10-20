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
import { tournamentBySlug } from '../Tournaments/selectors';
import { default as GameCard } from '../Games/Card';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { gameId = '' } = props.match.params;
  return {
    game: gameById(state.games, gameId),
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
  players,
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
            <div className="columns is-multiline has-text-left">
              <div className="column is-12">
                <h2 className="subtitle">{game.homeTeam.name}</h2>

                {/* <PlayerStatLogView
                  playerStatLogs={playerStatLogs}
                  players={players}
                  playersStats={tournament.playerStats}
                /> */}
              </div>

              <div className="column is-12">
                <h2 className="subtitle">{game.awayTeam.name}</h2>

                {/* <PlayerStatLogView
                  playerStatLogs={playerStatLogs}
                  players={players}
                  playersStats={tournament.playerStats}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(withGame<GameViewProps>(GameView));
