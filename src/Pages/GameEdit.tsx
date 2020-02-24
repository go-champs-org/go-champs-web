import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { patchGame } from '../Games/effects';
import { default as GameForm } from '../Games/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { GameEntity } from '../Games/state';
import { StoreState } from '../store';
import AdminMenu from '../Tournaments/AdminMenu';
import withPhase from './support/withPhase';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { gameById } from '../Games/selectors';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { teamsForSelectInput } from '../Teams/selectors';

interface OwnProps extends RouteComponentProps<RouteProps> {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  const { gameId = '' } = props.match.params;
  return {
    game: gameById(state.games, gameId),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    selectInputTeams: teamsForSelectInput(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      patchGame
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameNewProps = ConnectedProps<typeof connector> & OwnProps;

const GameNew: React.FC<GameNewProps> = ({
  game,
  organizationSlug,
  phase,
  patchGame,
  selectInputTeams,
  tournamentSlug
}) => {
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">Edit Game</h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={patchGame}
              initialValues={game}
              render={(props: FormRenderProps<GameEntity>) => (
                <GameForm {...props} selectInputTeams={selectInputTeams} />
              )}
            />
          </div>
        </div>
      </div>

      <div className="is-divider-vertical"></div>

      <div className="column is-4">
        <AdminMenu
          organizationSlug={organizationSlug}
          phase={phase}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector(withPhase<GameNewProps>(GameNew));
