import React, { Fragment } from 'react';
import arrayMutators from 'final-form-arrays';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postFixedPlayerStatsTable } from '../FixedPlayerStatsTables/effects';
import { default as FixedPlayerStatsTableForm } from '../FixedPlayerStatsTables/Form';
import { Form, FormRenderProps } from 'react-final-form';
import {
  DEFAULT_FIXED_PLAYER_STATS_TABLE,
  FixedPlayerStatsTableEntity
} from '../FixedPlayerStatsTables/state';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { getTournamentBySlug } from '../Tournaments/effects';
import withTournament from './support/withTournament';
import { TournamentEntity } from '../Tournaments/state';
import {
  tournamentBySlug,
  tournamentLoading,
  tournamentPlayerStatsForSelectInput
} from '../Tournaments/selectors';
import AdminMenu from '../Tournaments/AdminMenu';
import { postingFixedPlayerStatsTable } from '../FixedPlayerStatsTables/selectors';
import { Trans } from 'react-i18next';
import { playersForSelectInput } from '../Players/selectors';
import { Mutator } from 'final-form';

type StateProps = {
  isPostingFixedPlayerStatsTable: boolean;
  tournament: TournamentEntity;
};

type DispatchProps = {
  postFixedPlayerStatsTable: (
    fixedPlayerStatsTable: FixedPlayerStatsTableEntity,
    tournamentId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { tournamentSlug } = props.match.params;
  return {
    isPostingFixedPlayerStatsTable: postingFixedPlayerStatsTable(
      state.fixedPlayerStatsTables
    ),
    selectInputPlayers: playersForSelectInput(state.players, state.teams),
    selectInputPlayerStats: tournamentPlayerStatsForSelectInput(
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
      postFixedPlayerStatsTable
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
    postFixedPlayerStatsTable: (
      fixedPlayerStatsTable: FixedPlayerStatsTableEntity
    ) =>
      dispatchProps.postFixedPlayerStatsTable(
        fixedPlayerStatsTable,
        stateProps.tournament.id
      )
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type FixedPlayerStatsTableNewProps = ConnectedProps<typeof connector>;

const FixedPlayerStatsTableNew: React.FC<FixedPlayerStatsTableNewProps> = ({
  isPostingFixedPlayerStatsTable,
  match,
  selectInputPlayers,
  selectInputPlayerStats,
  postFixedPlayerStatsTable
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/FixedPlayerStatsTables`;
  console.log(selectInputPlayerStats);
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>newFixedPlayerStatsTable</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postFixedPlayerStatsTable}
              initialValues={DEFAULT_FIXED_PLAYER_STATS_TABLE}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<FixedPlayerStatsTableEntity>;
                }
              }
              render={(props: FormRenderProps<FixedPlayerStatsTableEntity>) => (
                <FixedPlayerStatsTableForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPostingFixedPlayerStatsTable}
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
  withTournament<FixedPlayerStatsTableNewProps>(FixedPlayerStatsTableNew)
);
