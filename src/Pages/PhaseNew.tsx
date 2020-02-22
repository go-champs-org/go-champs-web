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
import { tournamentBySlug, tournamentLoading } from '../Tournaments/selectors';
import AdminMenu from '../Tournaments/AdminMenu';

interface OwnProps extends RouteComponentProps<RouteProps> {}

type StateProps = {
  tournament: TournamentEntity;
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

const PhaseNew: React.FC<PhaseNewProps> = ({ match, postPhase }) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">New Phase</h2>
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
                <PhaseForm {...props} push={props.form.mutators.push} />
              )}
            />
          </div>
        </div>
      </div>

      <div className="is-divider-vertical"></div>

      <div className="column is-4">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector(withTournament<PhaseNewProps>(PhaseNew));
