import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { FormLoading } from '../Tournaments/Form';
import AdminMenu from '../Tournaments/AdminMenu';
import Helmet from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { TournamentEntity } from '../Tournaments/state';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { StoreState } from '../store';
import { tournamentBySlug, tournamentLoading } from '../Tournaments/selectors';
import { getTournamentBySlug } from '../Tournaments/effects';
import { connect, ConnectedProps } from 'react-redux';
import { default as TournamentSettingForm } from '../TournamentSettings/Form';
import {
  patchTournamentSetting,
  postTournamentSetting
} from '../TournamentSettings/effects';
import { TournamentSettingEntity } from '../TournamentSettings/state';
import { Form, FormRenderProps } from 'react-final-form';
import withTournament from './support/withTournament';
import { tournamentSetting } from '../TournamentSettings/selectors';

interface StateProps extends RouteComponentProps<RouteProps> {
  tournamentSetting: TournamentSettingEntity;
  tournament: TournamentEntity;
  tournamentLoading: boolean;
}

type DispatchProps = {
  getTournamentBySlug: (
    organizationSlug: string,
    tournamentSlug: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  patchTournamentSetting: (
    tournamentSetting: TournamentSettingEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  postTournamentSetting: (
    tournamentSetting: TournamentSettingEntity,
    tournamentId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { tournamentSlug } = props.match.params;
  return {
    ...props,
    tournamentSetting: tournamentSetting(state.tournaments.tournamentSettings),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      postTournamentSetting,
      patchTournamentSetting
    },
    dispatch
  );
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    patchTournamentSetting: (tournamentSetting: TournamentSettingEntity) =>
      dispatchProps.patchTournamentSetting(tournamentSetting),
    postTournamentSetting: (tournamentSetting: TournamentSettingEntity) =>
      dispatchProps.postTournamentSetting(
        tournamentSetting,
        stateProps.tournament.id
      )
  };
};
const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type TournamentSettingEditProps = ConnectedProps<typeof connector>;

function TournamentSettingEdit({
  tournamentSetting,
  tournament,
  match,
  tournamentLoading,
  postTournamentSetting,
  patchTournamentSetting
}: TournamentSettingEditProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Manage`;

  const submitFunction = tournamentSetting.id
    ? patchTournamentSetting
    : postTournamentSetting;

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>editSettings</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<FormLoading />}
            >
              <Form
                onSubmit={submitFunction}
                initialValues={tournamentSetting}
                render={(props: FormRenderProps<TournamentSettingEntity>) => (
                  <TournamentSettingForm
                    {...props}
                    backUrl={backUrl}
                    isLoading={tournamentLoading}
                    organizationSetting={tournament.organizationSetting}
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
        <title>Go Champs | Edit Tournament Name Format Settings</title>
      </Helmet>
    </Fragment>
  );
}

export default connector(
  withTournament<TournamentSettingEditProps>(TournamentSettingEdit)
);
