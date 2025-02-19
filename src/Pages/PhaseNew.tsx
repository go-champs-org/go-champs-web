import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import arrayMutators from 'final-form-arrays';
import { Mutator } from 'final-form';
import { postPhase } from '../Phases/effects';
import { default as PhaseForm } from '../Phases/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_PHASE, PhaseEntity } from '../Phases/state';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { getTournamentBySlug } from '../Tournaments/effects';
import withTournament from './support/withTournament';
import { TournamentEntity } from '../Tournaments/state';
import {
  tournamentBySlug,
  tournamentLoading,
  tournamentTeamStatsForSelectInput
} from '../Tournaments/selectors';
import AdminMenu from '../Tournaments/AdminMenu';
import { postingPhase } from '../Phases/selectors';
import { Trans } from 'react-i18next';
import { SelectOptionType } from '../Shared/UI/Form/Select';

interface OwnProps extends RouteComponentProps<RouteProps> {}

type StateProps = {
  isPostingPhase: boolean;
  tournament: TournamentEntity;
  teamStatOptions: SelectOptionType[];
};

type DispatchProps = {
  postPhase: (
    phase: PhaseEntity,
    tournamentId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  const { tournamentSlug } = props.match.params;
  return {
    isPostingPhase: postingPhase(state.phases),
    teamStatOptions: tournamentTeamStatsForSelectInput(
      state.tournaments,
      tournamentSlug
    ),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      postPhase
    },
    dispatch
  );
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    postPhase: (phase: PhaseEntity) =>
      dispatchProps.postPhase(phase, stateProps.tournament.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type PhaseNewProps = ConnectedProps<typeof connector>;

const PhaseNew: React.FC<PhaseNewProps> = ({
  isPostingPhase,
  match,
  postPhase,
  teamStatOptions
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Phases`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>newPhase</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postPhase}
              initialValues={DEFAULT_PHASE}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<PhaseEntity>;
                }
              }
              render={(props: FormRenderProps<PhaseEntity>) => (
                <PhaseForm
                  {...props}
                  isLoading={isPostingPhase}
                  backUrl={backUrl}
                  push={props.form.mutators.push}
                  teamStatOptions={teamStatOptions}
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
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector<any>(withTournament<PhaseNewProps>(PhaseNew));
