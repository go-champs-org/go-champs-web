import React from 'react';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { tournamentBySlug } from '../Tournaments/selectors';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { gameById } from '../Games/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { getPlayerStatsLogsByFilter } from '../PlayerStatsLog/effects';
import { getGame } from '../Games/effects';
import { default as GameCard } from '../Games/Card';
import withPlayerStatsLogs from './support/withPlayerStatsLogs';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { gameId = '', tournamentSlug = '' } = props.match.params;

  const game = gameById(state.games, gameId);
  return {
    game,
    phase: phaseByIdOrDefault(state.phases, 'phase-id'),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getGame,
      getPlayerStatsLogsByFilter
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameEditAdvancedProps = ConnectedProps<typeof connector>;

function GameEditAdvanced({ game }: GameEditAdvancedProps): React.ReactElement {
  return (
    <div className="column">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <GameCard game={game} />
        </div>
      </div>
    </div>
  );
}

export default connector(
  withPlayerStatsLogs<GameEditAdvancedProps>(GameEditAdvanced)
);
