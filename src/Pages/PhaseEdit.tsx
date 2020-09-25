import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { getPhase, patchPhase } from '../Phases/effects';
import { default as PhaseForm } from '../Phases/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { PhaseEntity } from '../Phases/state';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { getGamesByFilter } from '../Games/effects';
import AdminMenu from '../Tournaments/AdminMenu';
import withPhase from './support/withPhase';
import arrayMutators from 'final-form-arrays';
import { phaseByIdOrDefault, patchingPhase } from '../Phases/selectors';
import { Mutator } from 'final-form';
import { Trans } from 'react-i18next';

type StateProps = {
  isPatchingPhase: boolean;
  phase: PhaseEntity;
};

type DispatchProps = {
  patchPhase: (
    phase: PhaseEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { phaseId } = props.match.params;
  return {
    isPatchingPhase: patchingPhase(state.phases),
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
  ownProps: any
) => {
  const { phaseId = '' } = ownProps.match.params;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    phaseId
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type PhaseNewProps = ConnectedProps<typeof connector>;

const PhaseNew: React.FC<PhaseNewProps> = ({
  isPatchingPhase,
  match,
  patchPhase,
  phase
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Phases`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>editPhase</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={patchPhase}
              initialValues={phase}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<PhaseEntity>;
                }
              }
              render={(props: FormRenderProps<PhaseEntity>) => (
                <PhaseForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPatchingPhase}
                  push={props.form.mutators.push}
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

export default connector(withPhase<PhaseNewProps>(PhaseNew));
