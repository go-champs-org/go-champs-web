import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postOfficial } from '../Officials/effects';
import { default as OfficialForm } from '../Officials/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_OFFICIAL, OfficialEntity } from '../Officials/state';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { getTournamentBySlug } from '../Tournaments/effects';
import withTournament from './support/withTournament';
import { TournamentEntity } from '../Tournaments/state';
import { tournamentBySlug, tournamentLoading } from '../Tournaments/selectors';
import AdminMenu from '../Tournaments/AdminMenu';
import { postingOfficial } from '../Officials/selectors';
import { Trans } from 'react-i18next';

type StateProps = {
  isPostingOfficial: boolean;
  tournament: TournamentEntity;
};

type DispatchProps = {
  postOfficial: (
    official: OfficialEntity,
    tournamentId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { tournamentSlug } = props.match.params;
  return {
    isPostingOfficial: postingOfficial(state.officials),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      postOfficial
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
    postOfficial: (official: OfficialEntity) =>
      dispatchProps.postOfficial(official, stateProps.tournament.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type OfficialNewProps = ConnectedProps<typeof connector>;

const OfficialNew: React.FC<OfficialNewProps> = ({
  isPostingOfficial,
  match,
  postOfficial
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Officials`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>newOfficial</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postOfficial}
              initialValues={DEFAULT_OFFICIAL}
              render={(props: FormRenderProps<OfficialEntity>) => (
                <OfficialForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPostingOfficial}
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

export default connector(withTournament<OfficialNewProps>(OfficialNew));
