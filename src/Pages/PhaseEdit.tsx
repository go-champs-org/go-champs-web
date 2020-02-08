import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { getPhase, patchPhase } from '../Phases/effects';
import { default as PhaseForm } from '../Phases/Form';
import { Form } from 'react-final-form';
import { DEFAULT_PHASE, PhaseEntity } from '../Phases/state';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { getGamesByFilter } from '../Games/effects';
import AdminMenu from '../Tournaments/AdminMenu';
import { newWithPhase } from './support/withPhase';
import { phaseByIdOrDefault } from '../Phases/selectors';

interface OwnProps extends RouteComponentProps<RouteProps> {}

type StateProps = {
  phase: PhaseEntity;
};

type DispatchProps = {
  patchPhase: (
    phase: PhaseEntity,
    tournamentId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  const { phaseId } = props.match.params;
  return {
    phase: phaseByIdOrDefault(state.phases, phaseId)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getGamesByFilter,
      getPhase,
      patchPhase
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
    patchPhase: (phase: PhaseEntity) =>
      dispatchProps.patchPhase(phase, ownProps.match.params.phaseId || '')
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type PhaseNewProps = ConnectedProps<typeof connector>;

const PhaseNew: React.FC<PhaseNewProps> = ({ match, patchPhase, phase }) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">Edit Phase</h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={patchPhase}
              initialValues={phase}
              render={PhaseForm}
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

export default connector(newWithPhase<PhaseNewProps>(PhaseNew));
