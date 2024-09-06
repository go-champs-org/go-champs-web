import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postPlayer } from '../Players/effects';
import { default as PlayerForm } from '../Players/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_PLAYER, PlayerEntity } from '../Players/state';
import { StoreState } from '../store';
import AdminMenu from '../Tournaments/AdminMenu';
import withPhase from './support/withPhase';
import { teamsForSelectInput } from '../Teams/selectors';
import { SelectOptionType } from '../Shared/UI/Form/Select';
import { postingPlayer } from '../Players/selectors';
import { Trans } from 'react-i18next';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import { tournamentBySlug } from '../Tournaments/selectors';
import { TournamentEntity } from '../Tournaments/state';

type StateProps = {
  isPostingPlayer: boolean;
  tournament: TournamentEntity;
  selectInputTeams: SelectOptionType[];
};

type DispatchProps = {
  postPlayer: (
    player: PlayerEntity,
    phaseId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { tournamentSlug } = props.match.params;
  return {
    isPostingPlayer: postingPlayer(state.players),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    selectInputTeams: teamsForSelectInput(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      postPlayer
    },
    dispatch
  );
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: any
) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    postPlayer: (player: PlayerEntity) =>
      dispatchProps.postPlayer(player, stateProps.tournament.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type PlayerNewProps = ConnectedProps<typeof connector>;

function PlayerNew({
  isPostingPlayer,
  match,
  phase,
  postPlayer,
  selectInputTeams
}: PlayerNewProps): React.ReactElement {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Players`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>newPlayer</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postPlayer}
              initialValues={DEFAULT_PLAYER}
              render={(props: FormRenderProps<PlayerEntity>) => (
                <PlayerForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPostingPlayer}
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
}

export default connector(withPhase<PlayerNewProps>(PlayerNew));
