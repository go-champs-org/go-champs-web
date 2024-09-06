import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { patchFixedPlayerStatsTable } from '../FixedPlayerStatsTables/effects';
import { default as FixedPlayerStatsTableForm } from '../FixedPlayerStatsTables/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { FixedPlayerStatsTableEntity } from '../FixedPlayerStatsTables/state';
import { StoreState } from '../store';
import arrayMutators from 'final-form-arrays';
import AdminMenu from '../Tournaments/AdminMenu';
import withPhase from './support/withPhase';
import {
  fixedPlayerStatsTableById,
  patchingFixedPlayerStatsTable
} from '../FixedPlayerStatsTables/selectors';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { Mutator } from 'final-form';
import { Trans } from 'react-i18next';
import { playersForSelectInput } from '../Players/selectors';
import {
  tournamentPlayerStatsForSelectInput,
  tournamentBySlug
} from '../Tournaments/selectors';
import { TournamentEntity } from '../Tournaments/state';
import { SelectOptionType } from '../Shared/UI/Form/Select';

interface OwnProps extends RouteComponentProps<RouteProps> {
  basePhaseManageUrl: string;
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

type StateProps = {
  fixedPlayerStatsTable: FixedPlayerStatsTableEntity;
  isPacthingFixedPlayerStatsTable: boolean;
  selectInputPlayers: SelectOptionType[];
  selectInputPlayerStats: SelectOptionType[];
  tournament: TournamentEntity;
};

type DispatchProps = {
  patchFixedPlayerStatsTable: (
    fixedPlayerStatsTable: FixedPlayerStatsTableEntity,
    tournamentId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  const {
    fixedPlayerStatsTableId = '',
    tournamentSlug = ''
  } = props.match.params;
  return {
    fixedPlayerStatsTable: fixedPlayerStatsTableById(
      state.fixedPlayerStatsTables,
      fixedPlayerStatsTableId
    ),
    isPacthingFixedPlayerStatsTable: patchingFixedPlayerStatsTable(
      state.fixedPlayerStatsTables
    ),
    selectInputPlayers: playersForSelectInput(state.players, state.teams),
    selectInputPlayerStats: tournamentPlayerStatsForSelectInput(
      state.tournaments,
      tournamentSlug
    ),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      patchFixedPlayerStatsTable
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
    patchFixedPlayerStatsTable: (
      fixedPlayerStatsTable: FixedPlayerStatsTableEntity
    ) =>
      dispatchProps.patchFixedPlayerStatsTable(
        fixedPlayerStatsTable,
        stateProps.tournament.id
      )
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type FixedPlayerStatsTableEditProps = ConnectedProps<typeof connector> &
  OwnProps;

const FixedPlayerStatsTableEdit: React.FC<FixedPlayerStatsTableEditProps> = ({
  isPacthingFixedPlayerStatsTable,
  fixedPlayerStatsTable,
  match,
  selectInputPlayers,
  selectInputPlayerStats,
  patchFixedPlayerStatsTable
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/FixedPlayerStatsTables`;

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>editFixedPlayerStatsTable</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={patchFixedPlayerStatsTable}
              initialValues={fixedPlayerStatsTable}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<FixedPlayerStatsTableEntity>;
                }
              }
              render={(props: FormRenderProps<FixedPlayerStatsTableEntity>) => (
                <FixedPlayerStatsTableForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPacthingFixedPlayerStatsTable}
                  push={props.form.mutators.push}
                  selectInputPlayerStats={selectInputPlayerStats}
                  selectInputPlayers={selectInputPlayers}
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

export default connector(
  withPhase<FixedPlayerStatsTableEditProps>(FixedPlayerStatsTableEdit)
);
