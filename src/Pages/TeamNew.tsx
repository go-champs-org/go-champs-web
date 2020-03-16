import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postTeam } from '../Teams/effects';
import { default as TeamForm } from '../Teams/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_TEAM, TeamEntity } from '../Teams/state';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { getTournamentBySlug } from '../Tournaments/effects';
import withTournament from './support/withTournament';
import { TournamentEntity } from '../Tournaments/state';
import { tournamentBySlug, tournamentLoading } from '../Tournaments/selectors';
import AdminMenu from '../Tournaments/AdminMenu';
import { postingTeam } from '../Teams/selectors';

interface OwnProps extends RouteComponentProps<RouteProps> {}

type StateProps = {
  isPostingTeam: boolean;
  tournament: TournamentEntity;
};

type DispatchProps = {
  postTeam: (
    team: TeamEntity,
    tournamentId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  const { tournamentSlug } = props.match.params;
  return {
    isPostingTeam: postingTeam(state.teams),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      postTeam
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
    postTeam: (team: TeamEntity) =>
      dispatchProps.postTeam(team, stateProps.tournament.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type TeamNewProps = ConnectedProps<typeof connector>;

const TeamNew: React.FC<TeamNewProps> = ({
  isPostingTeam,
  match,
  postTeam
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Teams`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">New Team</h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postTeam}
              initialValues={DEFAULT_TEAM}
              render={(props: FormRenderProps<TeamEntity>) => (
                <TeamForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPostingTeam}
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

export default connector(withTournament<TeamNewProps>(TeamNew));
