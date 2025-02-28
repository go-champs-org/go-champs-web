import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps
} from 'react-router-dom';
import AccountHome from './Pages/AccountHome';
import About from './Pages/About';
import Home from './Pages/Home';
import Search from './Pages/Search';
import TournamentHome from './Pages/TournamentHome';
import NavTopToolbar from './Shared/UI/NavTopToolbar';
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
import { useTranslation } from 'react-i18next';
import FacebookSignUp from './Pages/FacebookSignUp';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import LanguageDropdown from './Shared/UI/LanguageDropdown';
import { REACT_APP_BUILD_NUMBER } from './Shared/env';
import TeamRosterInvites from './Pages/TeamRosterInvites';
import OrganizationView from './Pages/OrganizationView';

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <NavTopToolbar />

          <div className="hero is-fullheight-with-navbar">
            <section className="section">
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/About" component={About} />
                  <Route
                    exact
                    sensitive
                    path="/Account"
                    render={() => (
                      <AuthenticatedRoute>
                        <AccountHome />
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
                  <Route
                    exact
                    sensitive
                    path="/UseAsApp"
                    component={UseAsApp}
                  />
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
              </div>
            </section>

            <div className="hero-foot">
              <footer className="footer">
                <div className="content has-text-centered">
                  <div>
                    <LanguageDropdown />
                  </div>

                  <p>
                    <strong>Go Champs!</strong>
                    <span>{` ${t('with')} 🖤 `}</span>
                    <span>
                      {`${t('by')} Lair Júnior. ${t(
                        'theSourceCodeIsLicensed'
                      )} `}
                    </span>
                    <a
                      href="https://github.com/lairjr/go-champs-web/blob/master/LICENSE"
                      style={{ color: '#970c10' }}
                    >
                      MIT
                    </a>
                    <span>{`. ${t('theWebsiteContentIsLicensed')} `}</span>
                    <a
                      href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                      style={{ color: '#970c10' }}
                    >
                      CC BY NC SA 4.0
                    </a>
                    .
                  </p>

                  <p>
                    Build: <em>0.0.{REACT_APP_BUILD_NUMBER}</em>
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </DndProvider>
      </Router>
    </Provider>
  );
};

export default App;
