import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useLocation
} from 'react-router-dom';
import AccountHome from './Pages/AccountHome';
import About from './Pages/About';
import AboutV2 from './PagesV2/About/AboutV2';
import SignInV2 from './PagesV2/SignIn/SignInV2';
import Home from './Pages/Home';
import Search from './Pages/Search';
import TournamentHome from './Pages/TournamentHome';
import store from './store';
import OrganizationHome from './Pages/OrganizationHome';
import UseAsApp from './Pages/UseAsApp';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import AccountReset from './Pages/AccountReset';
import AuthenticatedRoute from './Accounts/AuthenticatedRoute';
import AccountRecovery from './Pages/AccountRecovery';
import { RouteProps } from './Pages/support/routerInterfaces';
import './Shared/translations/i18n';
import FacebookSignUp from './Pages/FacebookSignUp';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import PWAInstallPrompt from './Shared/UI/PWAInstallPrompt';
import TeamRosterInvites from './Pages/TeamRosterInvites';
import OrganizationView from './Pages/OrganizationView';
import { ThemeProvider } from './Theme';
import AccountHomeBillboard from './Pages/AccountHomeBillboard';
import V1Layout from './Shared/Layout/V1Layout';
import V2Layout from './Shared/Layout/V2Layout';

/**
 * LayoutWrapper conditionally applies V1 or V2 layout based on the current route.
 * V2 routes (ending with "V2") are self-contained with their own NavBar and Footer.
 * V1 routes use the legacy NavTopToolbar and footer structure.
 */
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const location = useLocation();
  const isV2Route =
    /V2$/.test(location.pathname) || location.pathname.startsWith('/PagesV2');

  if (isV2Route) {
    return <V2Layout>{children}</V2Layout>;
  }

  return <V1Layout>{children}</V1Layout>;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <DndProvider backend={HTML5Backend}>
            <LayoutWrapper>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/About" component={About} />
                <Route path="/AboutV2" component={AboutV2} />
                <Route
                  exact
                  sensitive
                  path="/Account"
                  render={() => (
                    <AuthenticatedRoute>
                      <AccountHomeBillboard />
                    </AuthenticatedRoute>
                  )}
                />
                <Route
                  exact
                  sensitive
                  path="/Account/*"
                  render={() => (
                    <AuthenticatedRoute>
                      <AccountHome />
                    </AuthenticatedRoute>
                  )}
                />
                <Route
                  exact
                  sensitive
                  path="/FacebookSignUp"
                  component={FacebookSignUp}
                />
                <Route
                  exact
                  sensitive
                  path="/FacebookSignUp*"
                  component={FacebookSignUp}
                />
                <Route
                  exact
                  sensitive
                  path="/Invite/:registrationInviteId"
                  render={(props: RouteComponentProps<RouteProps>) => (
                    <TeamRosterInvites {...props} />
                  )}
                />
                <Route
                  exact
                  sensitive
                  path="/PrivacyPolicy*"
                  component={PrivacyPolicy}
                />
                <Route exact sensitive path="/UseAsApp" component={UseAsApp} />
                <Route exact sensitive path="/SignInV2" component={SignInV2} />
                <Route exact sensitive path="/SignIn*" component={SignIn} />
                <Route exact sensitive path="/SignUp" component={SignUp} />
                <Route
                  exact
                  sensitive
                  path="/AccountReset"
                  component={AccountReset}
                />
                <Route
                  exact
                  sensitive
                  path="/AccountRecovery"
                  component={AccountRecovery}
                />
                <Route
                  exact
                  sensitive
                  path="/Organization/:organizationSlug"
                  render={(props: RouteComponentProps<RouteProps>) => (
                    <AuthenticatedRoute>
                      <OrganizationHome {...props} />
                    </AuthenticatedRoute>
                  )}
                />
                <Route
                  exact
                  sensitive
                  path="/Organization/:organizationSlug/*"
                  render={(props: RouteComponentProps<RouteProps>) => (
                    <AuthenticatedRoute>
                      <OrganizationHome {...props} />
                    </AuthenticatedRoute>
                  )}
                />
                <Route exact sensitive path="/Search" component={Search} />
                <Route
                  path="/:organizationSlug/:tournamentSlug/*"
                  component={TournamentHome}
                />
                <Route
                  path="/:organizationSlug/:tournamentSlug"
                  component={TournamentHome}
                />
                <Route
                  path={`/:organizationSlug`}
                  render={(props: RouteComponentProps<RouteProps>) => (
                    <OrganizationView {...props} />
                  )}
                />
              </Switch>
            </LayoutWrapper>
          </DndProvider>
          <PWAInstallPrompt />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
