import React from 'react';
import { Helmet } from 'react-helmet';
import { connect, ConnectedProps } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { StoreState } from '../store';
import { tournamentLoading, tournamentBySlug } from '../Tournaments/selectors';
import { getTournamentBySlug } from '../Tournaments/effects';
import PhaseNotFound from './PhaseNotFound';
import { RouteProps } from './support/routerInterfaces';
import withTournament from './support/withTournament';
import { Dispatch, bindActionCreators } from 'redux';
import TopLevel, { LoadingTopLevel } from '../Tournaments/Common/TopLevel';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import TournamentEdit from './TournamentEdit';
import PhaseList from './PhaseList';
import PhaseNew from './PhaseNew';
import PhaseEdit from './PhaseEdit';
import TeamList from './TeamList';
import TeamNew from './TeamNew';
import TeamEdit from './TeamEdit';
import PhaseLoader from './PhaseLoader';
import { organizationBySlug } from '../Organizations/selectors';
import AuthenticatedRoute from '../Accounts/AuthenticatedRoute';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const organizationSlug = props.match.params.organizationSlug || '';
  return {
    organization: organizationBySlug(state.organizations, organizationSlug),
    organizationSlug: organizationSlug,
    tournament: tournamentBySlug(
      state.tournaments,
      props.match.params.tournamentSlug
    ),
    tournamentLoading: tournamentLoading(state.tournaments),
    tournamentSlug: props.match.params.tournamentSlug || ''
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type TournamentHomeProps = ConnectedProps<typeof connector>;

const TournamentHome: React.FC<TournamentHomeProps> = ({
  organization,
  organizationSlug,
  tournament,
  tournamentLoading,
  tournamentSlug
}) => {
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <ComponentLoader
          canRender={!tournamentLoading}
          loader={<LoadingTopLevel />}
        >
          <TopLevel
            organization={organization}
            organizationSlug={organizationSlug}
            tournamentSlug={tournamentSlug}
            tournament={tournament}
          />
        </ComponentLoader>
      </header>

      <Switch>
        <Route
          path={`/:organizationSlug/:tournamentSlug/empty`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <PhaseNotFound {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Edit`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <TournamentEdit {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/EditPhase/:phaseId`}
          /* Need to wrap on authenticated route */
          component={PhaseEdit}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/EditTeam/:teamId`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <TeamEdit {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/NewPhase`}
          /* Need to wrap on authenticated route */
          render={(props: RouteComponentProps<RouteProps>) => (
            <PhaseNew {...props} />
          )}
          component={PhaseNew}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/NewTeam`}
          /* Need to wrap on authenticated route */
          component={TeamNew}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Phases`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <PhaseList {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Teams`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <TeamList {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Phase/:phaseId`}
          component={PhaseLoader}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <PhaseLoader {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/`}
          component={PhaseLoader}
        />
      </Switch>

      {tournament.name && (
        <Helmet>
          <title>Go Champs! | {tournament.name}</title>

          <meta name="description" content={tournament.name} />
        </Helmet>
      )}
    </div>
  );
};

export default connector(withTournament<TournamentHomeProps>(TournamentHome));
