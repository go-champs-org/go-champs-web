import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { patchTeam } from '../Teams/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import { teamsLoading, teamById } from '../Teams/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import { default as TeamForm, FormLoading } from '../Teams/Form';
import withTournament from './support/withTournament';
import { organizationBySlug } from '../Organizations/selectors';
import AdminMenu from '../Tournaments/AdminMenu';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { TeamEntity } from '../Teams/state';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { organizationSlug } = props.match.params;
  return {
    ...props,
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
          <div className="column is-12">
            <h2 className="subtitle">Edit team</h2>
          </div>

          <div className="column is-12">
            <ComponentLoader canRender={!teamsLoading} loader={<FormLoading />}>
              <Form
                onSubmit={patchTeam}
                initialValues={team}
                render={(props: FormRenderProps<TeamEntity>) => (
                  <TeamForm {...props} backUrl={backUrl} />
                )}
              />
            </ComponentLoader>
          </div>
        </div>
      </div>

      <div className="is-divider-vertical"></div>

      <div className="column is-4">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector(withTournament<TeamEditProps>(TeamEdit));
