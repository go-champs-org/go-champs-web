import React, { Fragment } from 'react';
import arrayMutators from 'final-form-arrays';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { getTournamentBySlug, patchTournament } from '../Tournaments/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  tournamentBySlug,
  tournamentLoading,
  patchingTournament,
  tournamentPlayerStatsForSelectInput
} from '../Tournaments/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import { default as TournamentForm, FormLoading } from '../Tournaments/Form';
import withTournament from './support/withTournament';
import { TournamentEntity } from '../Tournaments/state';
import { organizationBySlug } from '../Organizations/selectors';
import { OrganizationEntity } from '../Organizations/state';
import AdminMenu from '../Tournaments/AdminMenu';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import Helmet from 'react-helmet';
import { Trans } from 'react-i18next';
import { Mutator } from 'final-form';
import { SelectOptionType } from '../Shared/UI/Form/Select';
import { getSports } from '../Sports/effects';
import { SportEntity } from '../Sports/state';

interface StateProps extends RouteComponentProps<RouteProps> {
  isPatchingTournament: boolean;
  isSportsLoading: boolean;
  organization: OrganizationEntity;
  selectInputPlayerStats: SelectOptionType[];
  sports: SportEntity[];
  tournament: TournamentEntity;
  tournamentLoading: boolean;
}

type DispatchProps = {
  getTournamentBySlug: (
    organizationSlug: string,
    tournamentSlug: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  getSports: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  patchTournament: (
    organizationId: string,
    tournament: TournamentEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { organizationSlug, tournamentSlug } = props.match.params;
  return {
    ...props,
    isPatchingTournament: patchingTournament(state.tournaments),
    isSportsLoading: false,
    organization: organizationBySlug(state.organizations, organizationSlug),
    selectInputPlayerStats: tournamentPlayerStatsForSelectInput(
      state.tournaments,
      tournamentSlug
    ),
    sports: [],
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      getSports,
      patchTournament
    },
    dispatch
  );
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    patchTournament: (tournament: TournamentEntity) =>
      dispatchProps.patchTournament(stateProps.organization.id, tournament)
  };
};
const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type TournamentEditProps = ConnectedProps<typeof connector>;

const TournamentEdit: React.FC<TournamentEditProps> = ({
  isPatchingTournament,
  isSportsLoading,
  match,
  getSports,
  tournament,
  tournamentLoading,
  selectInputPlayerStats,
  sports,
  patchTournament
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>editTournament</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<FormLoading />}
            >
              <Form
                onSubmit={patchTournament}
                initialValues={tournament}
                mutators={
                  (arrayMutators as unknown) as {
                    [key: string]: Mutator<TournamentEntity>;
                  }
                }
                render={(props: FormRenderProps<TournamentEntity>) => (
                  <TournamentForm
                    {...props}
                    backUrl={backUrl}
                    getSports={getSports}
                    isLoading={isPatchingTournament}
                    organizationSlug={organizationSlug}
                    push={props.form.mutators.push}
                    selectInputPlayerStats={selectInputPlayerStats}
                    sports={sports}
                    isSportsLoading={isSportsLoading}
                  />
                )}
              />
            </ComponentLoader>
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

      <Helmet>
        <title>Go Champs | Edit Tournament</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(withTournament<TournamentEditProps>(TournamentEdit));
