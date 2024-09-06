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
import { gameById, patchingGame } from '../Games/selectors';
import { RouteComponentProps, Link } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { teamsForSelectInput } from '../Teams/selectors';
import { Trans } from 'react-i18next';
import { REACT_APP_SCOREBOARD_APP_URL } from '../Shared/env';
import BehindFeatureFlag from '../Shared/UI/BehindFeatureFlag';

interface OwnProps extends RouteComponentProps<RouteProps> {
  basePhaseManageUrl: string;
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  const { gameId = '' } = props.match.params;
  return {
    isGamePatching: patchingGame(state.games),
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
  basePhaseManageUrl,
  isGamePatching,
  game,
  organizationSlug,
  phase,
  patchGame,
  selectInputTeams,
  tournamentSlug
}) => {
  const scoreboardUrl = REACT_APP_SCOREBOARD_APP_URL;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-6">
            <h2 className="subtitle">
              <Trans>editGame</Trans>
            </h2>
          </div>

          <div className="column is-6 has-text-right">
            <BehindFeatureFlag>
              <a href={`${scoreboardUrl}scoreboard/control/${game.id}`} target='_blank' style={{paddingRight: '1rem'}}>
                <button className="button is-info is-outlined">
                  <span className="icon">
                    <i className="fas fa-clock"></i>
                  </span>

                  <span>
                    <Trans>Scoreboard</Trans>
                  </span>
                </button>
              </a>
            </BehindFeatureFlag>

            <Link to={`${basePhaseManageUrl}/EditGameAdvanced/${game.id}`}>
              <button className="button is-info is-outlined">
                <span className="icon">
                  <i className="fas fa-table"></i>
                </span>

                <span>
                  <Trans>statistics</Trans>
                </span>
              </button>
            </Link>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={patchGame}
              initialValues={game}
              render={(props: FormRenderProps<GameEntity>) => (
                <GameForm
                  {...props}
                  backUrl={`${basePhaseManageUrl}/Games`}
                  isLoading={isGamePatching}
                  selectInputTeams={selectInputTeams}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
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
