import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postDraw } from '../Draws/effects';
import { default as DrawForm } from '../Draws/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_DRAW, DrawEntity } from '../Draws/state';
import { StoreState } from '../store';
import AdminMenu from '../Tournaments/AdminMenu';
import withPhase from './support/withPhase';
import { PhaseEntity } from '../Phases/state';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { TeamEntity } from '../Teams/state';

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
  postDraw: (
    game: DrawEntity,
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
    postDraw: (game: DrawEntity) =>
      dispatchProps.postDraw(game, stateProps.phase.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type DrawNewProps = ConnectedProps<typeof connector>;

const DrawNew: React.FC<DrawNewProps> = ({
  organizationSlug,
  phase,
  postDraw,
  teams,
  tournamentSlug
}) => {
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">New Draw</h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postDraw}
              initialValues={DEFAULT_DRAW}
              render={(props: FormRenderProps<DrawEntity>) => (
                <DrawForm teams={teams} {...props} />
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

export default connector(withPhase<DrawNewProps>(DrawNew));
