import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { patchDraw } from '../Draws/effects';
import { default as DrawForm } from '../Draws/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DrawEntity } from '../Draws/state';
import { StoreState } from '../store';
import arrayMutators from 'final-form-arrays';
import AdminMenu from '../Tournaments/AdminMenu';
import withPhase from './support/withPhase';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { drawById } from '../Draws/selectors';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { Mutator } from 'final-form';
import { teamsForSelectInput } from '../Teams/selectors';

interface OwnProps extends RouteComponentProps<RouteProps> {
  basePhaseManageUrl: string;
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  const { drawId = '' } = props.match.params;
  return {
    draw: drawById(state.draws, drawId),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    selectInputTeams: teamsForSelectInput(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      patchDraw
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type DrawNewProps = ConnectedProps<typeof connector> & OwnProps;

const DrawNew: React.FC<DrawNewProps> = ({
  basePhaseManageUrl,
  draw,
  organizationSlug,
  phase,
  patchDraw,
  selectInputTeams,
  tournamentSlug
}) => {
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">Edit draw</h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={patchDraw}
              initialValues={draw}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<DrawEntity>;
                }
              }
              render={(props: FormRenderProps<DrawEntity>) => (
                <DrawForm
                  {...props}
                  backUrl={`${basePhaseManageUrl}/Draws`}
                  push={props.form.mutators.push}
                  selectInputTeams={selectInputTeams}
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

export default connector(withPhase<DrawNewProps>(DrawNew));
