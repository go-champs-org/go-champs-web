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
import PlayerList from './PlayerList';
import PhaseNew from './PhaseNew';
import PhaseEdit from './PhaseEdit';
import TeamList from './TeamList';
import TeamNew from './TeamNew';
import TeamEdit from './TeamEdit';
import PhaseLoader from './PhaseLoader';
import { organizationBySlug } from '../Organizations/selectors';
import AuthenticatedRoute from '../Accounts/AuthenticatedRoute';
import PlayerNew from './PlayerNew';
import PlayerEdit from './PlayerEdit';

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
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <PhaseEdit {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/EditPlayer/:playerId`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <PlayerEdit {...props} />
            </AuthenticatedRoute>
          )}
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
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <PhaseNew {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/NewPlayer`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <PlayerNew {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/NewTeam`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <TeamNew {...props} />
            </AuthenticatedRoute>
          )}
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
          path={`/:organizationSlug/:tournamentSlug/Players`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <PlayerList {...props} />
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
