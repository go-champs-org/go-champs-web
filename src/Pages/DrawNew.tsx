import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postDraw } from '../Draws/effects';
import { default as DrawForm } from '../Draws/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_DRAW, DrawEntity } from '../Draws/state';
import { StoreState } from '../store';
import AdminMenu from '../Tournaments/AdminMenu';
import arrayMutators from 'final-form-arrays';
import withPhase from './support/withPhase';
import { PhaseEntity } from '../Phases/state';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { Mutator } from 'final-form';
import { SelectOptionType } from '../Shared/UI/Form/Select';
import { teamsForSelectInput } from '../Teams/selectors';
import { postingDraw } from '../Draws/selectors';

interface OwnProps {
  basePhaseManageUrl: string;
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

type StateProps = {
  isPostingDraw: boolean;
  phase: PhaseEntity;
  selectInputTeams: SelectOptionType[];
};

type DispatchProps = {
  postDraw: (
    draw: DrawEntity,
    phaseId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    isPostingDraw: postingDraw(state.draws),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    selectInputTeams: teamsForSelectInput(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      postDraw
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
    postDraw: (draw: DrawEntity) =>
      dispatchProps.postDraw(draw, stateProps.phase.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type DrawNewProps = ConnectedProps<typeof connector>;

const DrawNew: React.FC<DrawNewProps> = ({
  basePhaseManageUrl,
  isPostingDraw,
  organizationSlug,
  phase,
  postDraw,
  selectInputTeams,
  tournamentSlug
}) => {
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">New draw</h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postDraw}
              initialValues={DEFAULT_DRAW}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<DrawEntity>;
                }
              }
              render={(props: FormRenderProps<DrawEntity>) => (
                <DrawForm
                  {...props}
                  backUrl={`${basePhaseManageUrl}/Draws`}
                  isLoading={isPostingDraw}
                  push={props.form.mutators.push}
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

export default connector(withPhase<DrawNewProps>(DrawNew));
