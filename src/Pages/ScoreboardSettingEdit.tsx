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
import { default as ScoreboardSettingForm } from '../ScoreboardSettings/Form';
import {
  patchScoreboardSetting,
  postScoreboardSetting
} from '../ScoreboardSettings/effects';
import { ScoreboardSettingEntity } from '../ScoreboardSettings/state';
import { Form, FormRenderProps } from 'react-final-form';
import withTournament from './support/withTournament';
import { scoreboardSetting } from '../ScoreboardSettings/selectors';

interface StateProps extends RouteComponentProps<RouteProps> {
  scoreboardSetting: ScoreboardSettingEntity;
  tournament: TournamentEntity;
  tournamentLoading: boolean;
}

type DispatchProps = {
  getTournamentBySlug: (
    organizationSlug: string,
    tournamentSlug: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  patchScoreboardSetting: (
    scoreboardSetting: ScoreboardSettingEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  postScoreboardSetting: (
    scoreboardSetting: ScoreboardSettingEntity,
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
    scoreboardSetting: scoreboardSetting(state.scoreboardSettings),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      postScoreboardSetting,
      patchScoreboardSetting
    },
    dispatch
  );
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    patchScoreboardSetting: (scoreboardSetting: ScoreboardSettingEntity) =>
      dispatchProps.patchScoreboardSetting(scoreboardSetting),
    postScoreboardSetting: (scoreboardSetting: ScoreboardSettingEntity) =>
      dispatchProps.postScoreboardSetting(
        scoreboardSetting,
        stateProps.tournament.id
      )
  };
};
const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type ScoreboardSettingEditProps = ConnectedProps<typeof connector>;

function ScoreboardSettingEdit({
  scoreboardSetting,
  match,
  tournamentLoading,
  postScoreboardSetting,
  patchScoreboardSetting
}: ScoreboardSettingEditProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Manage`;

  const submitFunction = scoreboardSetting.id
    ? patchScoreboardSetting
    : postScoreboardSetting;

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>editScoreboardSettings</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <ComponentLoader
              canRender={!tournamentLoading}
              loader={<FormLoading />}
            >
              <Form
                onSubmit={submitFunction}
                initialValues={scoreboardSetting}
                render={(props: FormRenderProps<ScoreboardSettingEntity>) => (
                  <ScoreboardSettingForm
                    {...props}
                    backUrl={backUrl}
                    isLoading={tournamentLoading}
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
        <title>Go Champs! | Edit Scoreboard Settings</title>
      </Helmet>
    </Fragment>
  );
}

export default connector(
  withTournament<ScoreboardSettingEditProps>(ScoreboardSettingEdit)
);
