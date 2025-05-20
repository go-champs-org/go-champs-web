import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { patchTeam } from '../Teams/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import { teamsLoading, teamById, patchingTeam } from '../Teams/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import { default as TeamForm, FormLoading } from '../Teams/Form';
import withTournament from './support/withTournament';
import { organizationBySlug } from '../Organizations/selectors';
import AdminMenu from '../Tournaments/AdminMenu';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { TeamEntity } from '../Teams/state';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { organizationSlug } = props.match.params;
  return {
    ...props,
    isPatchingTeam: patchingTeam(state.teams),
    organization: organizationBySlug(state.organizations, organizationSlug),
    teamsLoading: teamsLoading(state.teams),
    team: teamById(state.teams, props.match.params.teamId)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      patchTeam
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TeamEditProps = ConnectedProps<typeof connector>;

const TeamEdit: React.FC<TeamEditProps> = ({
  isPatchingTeam,
  match,
  team,
  teamsLoading,
  patchTeam
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Teams`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-6">
            <h2 className="subtitle">
              <Trans>editTeam</Trans>
            </h2>
          </div>

          <div className="column is-6 has-text-right">
            <Link
              to={`/${organizationSlug}/${tournamentSlug}/EditTeamRoster/${team.id}`}
            >
              <button className="button is-info is-outlined">
                <span className="icon">
                  <i className="fas fa-users"></i>
                </span>

                <span>
                  <Trans>roster</Trans>
                </span>
              </button>
            </Link>
          </div>

          <div className="column is-12">
            <ComponentLoader canRender={!teamsLoading} loader={<FormLoading />}>
              <Form
                onSubmit={patchTeam}
                initialValues={team}
                render={(props: FormRenderProps<TeamEntity>) => (
                  <TeamForm
                    {...props}
                    backUrl={backUrl}
                    isLoading={isPatchingTeam}
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
    </Fragment>
  );
};

export default connector(withTournament<TeamEditProps>(TeamEdit));
