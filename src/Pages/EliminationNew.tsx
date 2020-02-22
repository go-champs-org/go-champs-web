import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postElimination } from '../Eliminations/effects';
import { default as EliminationForm } from '../Eliminations/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_ELIMINATION, EliminationEntity } from '../Eliminations/state';
import { StoreState } from '../store';
import AdminMenu from '../Tournaments/AdminMenu';
import arrayMutators from 'final-form-arrays';
import withPhase from './support/withPhase';
import { PhaseEntity } from '../Phases/state';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { TeamEntity } from '../Teams/state';
import { Mutator } from 'final-form';

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

type StateProps = {
  phase: PhaseEntity;
  teams: { [key: string]: TeamEntity };
};

type DispatchProps = {
  postElimination: (
    elimination: EliminationEntity,
    phaseId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    teams: state.teams.teams
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      postElimination
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
    postElimination: (elimination: EliminationEntity) =>
      dispatchProps.postElimination(elimination, stateProps.phase.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type EliminationNewProps = ConnectedProps<typeof connector>;

const EliminationNew: React.FC<EliminationNewProps> = ({
  organizationSlug,
  phase,
  postElimination,
  teams,
  tournamentSlug
}) => {
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">New elimination</h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postElimination}
              initialValues={DEFAULT_ELIMINATION}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<EliminationEntity>;
                }
              }
              render={(props: FormRenderProps<EliminationEntity>) => (
                <EliminationForm
                  teams={teams}
                  {...props}
                  push={props.form.mutators.push}
                />
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

export default connector(withPhase<EliminationNewProps>(EliminationNew));
