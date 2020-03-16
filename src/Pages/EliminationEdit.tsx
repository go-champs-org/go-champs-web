import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { patchElimination } from '../Eliminations/effects';
import { default as EliminationForm } from '../Eliminations/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { EliminationEntity } from '../Eliminations/state';
import { StoreState } from '../store';
import arrayMutators from 'final-form-arrays';
import AdminMenu from '../Tournaments/AdminMenu';
import withPhase from './support/withPhase';
import { phaseByIdOrDefault } from '../Phases/selectors';
import {
  eliminationById,
  patchingElimination
} from '../Eliminations/selectors';
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
  const { eliminationId = '' } = props.match.params;
  return {
    elimination: eliminationById(state.eliminations, eliminationId),
    isPacthingElimination: patchingElimination(state.eliminations),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    selectInputTeams: teamsForSelectInput(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      patchElimination
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type EliminationNewProps = ConnectedProps<typeof connector> & OwnProps;

const EliminationNew: React.FC<EliminationNewProps> = ({
  basePhaseManageUrl,
  isPacthingElimination,
  elimination,
  organizationSlug,
  phase,
  patchElimination,
  selectInputTeams,
  tournamentSlug
}) => {
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">Edit elimination</h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={patchElimination}
              initialValues={elimination}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<EliminationEntity>;
                }
              }
              render={(props: FormRenderProps<EliminationEntity>) => (
                <EliminationForm
                  {...props}
                  backUrl={`${basePhaseManageUrl}/Eliminations`}
                  isLoading={isPacthingElimination}
                  push={props.form.mutators.push}
                  selectInputTeams={selectInputTeams}
                  stats={phase.eliminationStats}
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

export default connector(withPhase<EliminationNewProps>(EliminationNew));
